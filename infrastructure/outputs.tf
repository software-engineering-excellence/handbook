output "url" {
  value = "${format("https://%s", "${aws_cloudfront_distribution.software-engineering-excellence.domain_name}")}"
}

output "username" {
  value = "${var.lambda_variables.username}"
}

output "password" {
  value = "${var.lambda_variables.password}"
}
