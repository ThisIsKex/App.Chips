output "terraform_state_bucket" {
  value = aws_s3_bucket.terraform_state_bucket.bucket
}

output "bucket_suffix" {
  value = random_string.bucket_suffix.result
}