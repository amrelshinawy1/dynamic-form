resource "aws_s3_bucket" "backend" {
  bucket        = "${var.project_name}-backend"
  force_destroy = "false"
  acl           = "private"
}

resource "aws_s3_bucket_public_access_block" "backend" {
  bucket = aws_s3_bucket.backend.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
