variable "region" {
  type = string
  description = "AWS Region"
  default = "ap-southeast-1"
}

variable "s3_bucket_name" {
  type = string
  description = "AWS S3 Bucket name for static web hosting"
  default = "software-engineering-excellence"
}

resource "random_password" "password" {
  length = 16
  special = true
}

variable "lambda_variables" {
  type        = map
  description = "Configuration for the Lambda Function - Credentials for Basic Authentication and the default page. Pass a map composed of 'username', 'password' and 'default_page'."
  default = {
    username = "see"
    password = "$${random_password.password.result}"
    default_page = "index.html"
  }
}
