

Boilerplate code for a project that is React typescript, server side rendered (SSR), served by an .ejs index file. 

This boilerplate use inteded to be used as an AWS Lambda function, managed by AWS codestar and built by AWS codebuild, together with aws-serverless-express.

It also uses AWS Api Gateway as a proxy to allow the express app to do it's thing.

To use, edit two variables with your information: 
STATICS_URL in webpack/server.config.js
YOUR_S3_PUBLIC_BUCKET in buildspec.yml

For best experience, use https://console.aws.amazon.com/codestar/home
