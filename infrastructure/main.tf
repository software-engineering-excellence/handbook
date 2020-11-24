# Define the specific versions of providers we use.
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.15.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.0.0"
    }
    template = {
      source  = "hashicorp/archive"
      version = "~> 2.0.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0.0"
    }
  }
}

# The provider for the S3 bucket, edge distribution etc.
provider "aws" {
  profile = "software-engineering-excellence"
  region     = "ap-southeast-1"
}

# The Lambda function for CloudFront _has_ to be in us-east-1 as it is a
# Lambda@Edge function. So setup a provider specifically for us-east-1.
provider "aws" {
  alias      = "us-east-1"
  profile = "software-engineering-excellence"
  region     = "us-east-1"
}

# Remote state for Terraform. Note that this is currently in a bucket used by
# Dave _only_ for Terraform state for projects, the account that performs
# operations with Terraform will need access to the specific state file used
# here. This is setup as part of the 'bootstrap' process.
terraform {
  backend "s3" {
    bucket         = "dwmkerr-terraform-state"
    key            = "software-engineering-excellence.tfstate"
    region         = "ap-southeast-1"
    encrypt        = true
    dynamodb_table = "dwmkerr-terraform-state"

    # Backends cannot have variables for roles - as this is specific to my
    # account anyway I don't mind too much that we hard code the role which
    # must be assumed here.
    profile = "software-engineering-excellence"
  }
}

# The S3 bucket for the website.
resource "aws_s3_bucket" "software-engineering-excellence" {
  bucket = var.s3_bucket_name
  acl    = "private"

  policy = <<EOF
{
  "Id": "PolicyForCloudFrontPrivateContent",
  "Statement": [
    {
      "Action": "s3:GetObject",
      "Effect": "Allow",
      "Principal": {
        "AWS": "${aws_cloudfront_origin_access_identity.software-engineering-excellence.iam_arn}"
      },
      "Resource": "arn:aws:s3:::${var.s3_bucket_name}/*",
      "Sid": "Grant a CloudFront Origin Identity access to support private content"
    }
  ],
  "Version": "2012-10-17"
}
EOF
}

# The CloudFront Identity and Distribution.
resource "aws_cloudfront_origin_access_identity" "software-engineering-excellence" {}
resource "aws_cloudfront_distribution" "software-engineering-excellence" {
  origin {
    domain_name = aws_s3_bucket.software-engineering-excellence.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.software-engineering-excellence.id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.software-engineering-excellence.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Basic Auth and Default Page"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.software-engineering-excellence.id}"
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    forwarded_values {
      query_string = true

      cookies {
        forward = "all"
      }
    }

    lambda_function_association {
      event_type   = "viewer-request"
      lambda_arn   = aws_lambda_function.auth-and-default-page.qualified_arn
      include_body = false
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

# We have to create and use an IAM role that can be assumed by the two service principals -
# lambda.amazonaws.com and edgelambda.amazonaws.com.
# See: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-permissions.html
resource "aws_iam_role" "lambda" {
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com",
          "edgelambda.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "lambda_logging" {
  name        = "lambda_logging"
  path        = "/"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}

# This is to optionally manage the CloudWatch Log Group for the Lambda Function.
# If skipping this resource configuration, also add "logs:CreateLogGroup" to the IAM policy below.
resource "aws_cloudwatch_log_group" "auth-and-default-page" {
  # Put the log group in the same region as the Lambda@Edge function.
  provider = aws.us-east-1

  # Note that as this a Lambda@Edge function we have the region in the name.
  name              = "/aws/lambda/us-east-1.auth-and-default-page"
  retention_in_days = 14
}

data "archive_file" "auth-and-default-page" {
  type = "zip"
  output_path = "templates/auth-and-default-page.zip"

  source {
    content = templatefile("templates/auth-and-default-page.js", var.lambda_variables)
    filename = "auth-and-default-page.js"
  }
}

resource "aws_lambda_function" "auth-and-default-page" {
  # We have to create Lamda@Edge functions in us-east-1 currently.
  provider = aws.us-east-1

  filename         = "templates/auth-and-default-page.zip"
  function_name    = "auth-and-default-page"
  role             = aws_iam_role.lambda.arn
  handler          = "auth-and-default-page.handler"
  source_code_hash = data.archive_file.auth-and-default-page.output_base64sha256
  runtime          = "nodejs12.x"
  description      = "Add Basic Auth and a Default Page"
  publish          = true

  depends_on = [
    aws_iam_role_policy_attachment.lambda_logs,
    aws_cloudwatch_log_group.auth-and-default-page,
  ]
}
