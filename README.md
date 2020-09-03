CA Facemasks

-   Stored in Amazon S3

-   Compressed via gzip before uploading to S3
    "postbuild": "gzip build/static/js/_.js && gzip build/static/css/_.css"

-   Served from CloudFront CDN

-   DNS provided by Route 53

-   Utilizes DynamoDB database
