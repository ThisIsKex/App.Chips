terraform {
  backend "s3" {
    bucket         = "appchips-terraform-state-bvym40"
    dynamodb_table = "appchips-terraform-state-lock-table"
    key            = "backend.tfstate"
    region         = "eu-central-1"
    profile        = "terraform"
  }
}
