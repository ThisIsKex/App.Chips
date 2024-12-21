terraform {
  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "aws" {
  region  = "eu-central-1"
  profile = "terraform"
}

resource "random_string" "bucket_suffix" {
  length  = 6 # You can adjust the length of the random string as needed
  special = false
  upper   = false
  numeric = true
}

resource "aws_s3_bucket" "terraform_state_bucket" {
  bucket = "${var.project}-terraform-state-${random_string.bucket_suffix.result}"
}

resource "aws_dynamodb_table" "terraform_state_lock_table-" {
  name         = "${var.project}-terraform-state-lock-table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}
