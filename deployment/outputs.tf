output "api_gateway_url" {
  value = aws_apigatewayv2_api.http_api.api_endpoint
}

output "CDN" {
  value = aws_cloudfront_origin_access_identity.frontend_identity.id
}
