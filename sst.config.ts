import { SSTConfig } from 'sst';
import { NextjsSite, Bucket, BucketProps } from 'sst/constructs';

import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import cloudfront, { ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Distribution } from 'aws-cdk-lib/aws-cloudfront';
import dotenv from 'dotenv';

// const stage = process.env.STAGE || 'prod';
declare let myBucket: s3.Bucket;

const target = process.env.APP;

if (!target) {
  throw new Error('app is not defined.');
}

interface TBuildOptions extends dotenv.DotenvParseOutput {
  BUILD_TARGET: string;
  S3_BUCKET: string;
  SST_ID: string;
  DISTRIBUTION_ID: string;
}

export default {
  config(_input) {
    const stage = _input.stage;
    const environment = dotenv.config({
      path: `./envs/${target}/.${stage}.env`,
    }).parsed as TBuildOptions;

    const { SST_ID } = environment;

    return {
      name: SST_ID,
      region: 'ap-northeast-2',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      console.log('stage', stack.stage);
      const stage = stack.stage;
      const environment = dotenv.config({
        path: `./envs/${target}/.${stage}.env`,
      }).parsed as TBuildOptions;
      console.log('environment', environment);

      const { S3_BUCKET, BUILD_TARGET, SST_ID, DISTRIBUTION_ID } = environment;

      // bucket name
      const appBucket = s3.Bucket.fromBucketName(stack, 'Bucket', S3_BUCKET);
      const cachePolicy = new cloudfront.CachePolicy(stack, 'dataCachePolicy', {
        // query string
        queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
        // cookie
        cookieBehavior: cloudfront.CacheCookieBehavior.allowList(
          'Authorization',
          'refreshToken',
          'userId',
        ),
        // header
        headerBehavior: cloudfront.CacheHeaderBehavior.allowList('User-Agent'),
        // ttl options
        defaultTtl: cdk.Duration.minutes(30),
        minTtl: cdk.Duration.seconds(1),
        maxTtl: cdk.Duration.seconds(1),
      });
      const behaviorOptions = {
        origin: new origins.S3Origin(appBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        // cache policy
        cachePolicy,
        compress: true,
      };

      // site stack
      const site = new NextjsSite(stack, `${stage}-${SST_ID}`, {
        path: BUILD_TARGET,
        cdk: {
          // @ts-ignore
          bucket: appBucket,
          distribution: {
            additionalBehaviors: {
              '_next/data/*': behaviorOptions,
            },
            defaultBehavior: {
              cachePolicy,
              compress: true,
            },
          },
        },
        environment,
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
