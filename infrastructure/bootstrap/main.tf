# This is the main bootstrap script. It creates a user account for CI/CD access
# in the user's configured AWS account.

# Define the specific versions of providers we use.
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.15.0"
    }
  }
}

# Configure the AWS provider.
provider "aws" {
  region     = "ap-southeast-1"
}

variable "principal_arns" {
  type        = list(string)
  description = "ARNs of accounts, groups, or users with the ability to assume this role."
  default     = [
    # Tobias Buschel's user on his AWS account.
    "arn:aws:iam::105586452504:user/Software-Engineering-Exellence",
    # Dave Kerr's user on his AWS account.
    "arn:aws:iam::705383350627:user/software-engineering-excellence-dave"
  ]
}

# A policy which allows a role to be assumed by the ARNs of the cross-account
# administrators.
data "aws_iam_policy_document" "cross_account_assume_role_policy" {
  statement {
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = var.principal_arns
    }

    actions = ["sts:AssumeRole"]
  }
}

# This is the role which cross-account administrators will assume to manage
# the software-engineering-excellence resources.
resource "aws_iam_role" "software_engineering_excellence_administrator" {
  name               = "software_engineering_excellence_administrator"
  assume_role_policy = data.aws_iam_policy_document.cross_account_assume_role_policy.json
}

# Now create a policy document with specific access to:
# 1. The S3 bucket which holds Terraform State.
# 2. The DynamoDB table which holds Terraform State locks.
# 3. The S3 bucket which holds the static site.
# 4. The CloudFront distribution for the static site.
# 5. The Lambda@Edge function which provides auth/default page for the static site.
resource "aws_iam_policy" "software-engineering-excellence-administration" {
  policy = file("software-engineering-excellence-administration.json")
}

resource "aws_iam_role_policy_attachment" "administrator-policy-attachment" {
  role       = aws_iam_role.software_engineering_excellence_administrator.name
  policy_arn = aws_iam_policy.software-engineering-excellence-administration.arn
}
