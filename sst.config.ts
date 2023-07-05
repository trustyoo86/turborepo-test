import { SSTConfig } from 'sst';
import { NextjsSite, Bucket } from 'sst/constructs';

import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import cloudfront, { ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

// const stage = process.env.STAGE || 'prod';
declare let myBucket: s3.Bucket;

let stage = '';

export default {
  config(_input) {
    stage = _input.stage as string;
    return {
      name: `${_input.stage}-turbo-test-app`,
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      let myBucket;

      if (stage === 'prod') {
        myBucket = s3.Bucket.fromBucketName(
          stack,
          'Bucket',
          'prod-turbo-test-app-site-nexttests3bucket0345157b-isc6kckdmz0c',
        );
      } else {
        myBucket = s3.Bucket.fromBucketName(
          stack,
          'Bucket',
          'dev-sst-app-bucket',
        );
      }

      const site = new NextjsSite(stack, 'next-test', {
        path: './apps/sst-app',
        cdk: {
          distribution: {
            additionalBehaviors: {
              '_next/data/*': {
                origin: new origins.S3Origin(myBucket),
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cachePolicy: new cloudfront.CachePolicy(
                  stack,
                  'dataCachePolicy',
                  {
                    queryStringBehavior:
                      cloudfront.CacheQueryStringBehavior.all(),
                    headerBehavior:
                      cloudfront.CacheHeaderBehavior.allowList('User-Agent'),
                    defaultTtl: cdk.Duration.minutes(30),
                    minTtl: cdk.Duration.seconds(1),
                    maxTtl: cdk.Duration.seconds(1),
                  },
                ),
              },
            },
          },
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
