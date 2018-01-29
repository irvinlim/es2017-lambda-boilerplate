# es2017-lambda-boilerplate

![es2017-lambda-boilerplate](https://github.com/irvinlim/es2017-lambda-boilerplate/blob/master/docs/images/banner.png)

[![Travis CI](https://img.shields.io/travis/irvinlim/es2017-lambda-boilerplate/master.svg)](https://travis-ci.org/irvinlim/es2017-lambda-boilerplate) ![](https://codebuild.ap-southeast-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiNlhFcld3M3VSMFM0MEkzUlBMQk1FdDU1c1RGc2dnVlpNaDdFZHlzSnQydDVJNm9RVFhxbXA3NkYxK3QwUVd4eVZyUTRiejZ1UGhRTFJYMTJJSzNLT2ZBPSIsIml2UGFyYW1ldGVyU3BlYyI6ImRFMWxLcHo2LzJmb3YycGEiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master) [![David](https://img.shields.io/david/irvinlim/es2017-lambda-boilerplate.svg)](https://david-dm.org/irvinlim/es2017-lambda-boilerplate) [![David](https://img.shields.io/david/dev/irvinlim/es2017-lambda-boilerplate.svg)](https://david-dm.org/irvinlim/es2017-lambda-boilerplate?type=dev) [![Greenkeeper badge](https://badges.greenkeeper.io/irvinlim/es2017-lambda-boilerplate.svg)](https://greenkeeper.io/) [![GitHub](https://img.shields.io/github/release/irvinlim/es2017-lambda-boilerplate.svg)](https://github.com/irvinlim/es2017-lambda-boilerplate/releases) [![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg)](http://opensource.org/licenses/MIT)

This is a boilerplate for [AWS Lambda](https://aws.amazon.com/lambda/) Node.js 6.10.0 functions, which allows you to use the latest JavaScript [ES2016](http://2ality.com/2016/01/ecmascript-2016.html), [ES2017](http://2ality.com/2016/02/ecmascript-2017.html) and [ES2018](http://2ality.com/2017/02/ecmascript-2018.html) features. The boilerplate also allows you to test your function in a Docker container (thanks to [docker-lambda](https://github.com/lambci/docker-lambda)), and also includes common configurations for CI/CD, for both [Travis CI](https://travis-ci.org/) and [AWS CodeBuild](https://aws.amazon.com/codebuild/) + [AWS CloudFormation](https://aws.amazon.com/cloudformation/).

## Latest JavaScript features

This boilerplate adds support for the following most commonly used JavaScript features that are not natively supported on Node.js 6.10:

| Feature                                                                                                                                                                                |     Supported?     |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------: |
| **ES2016/ES7**                                                                                                                                                                         |                    |
| [Exponentiation operator (`**`)](http://node.green/#ES2016-features-exponentiation------operator)                                                                                      | :white_check_mark: |
| [`Array.prototype.includes`](http://node.green/#ES2016-features-Array-prototype-includes)                                                                                              | :white_check_mark: |
| **ES2017/ES8**                                                                                                                                                                         |                    |
| [`Object.values`](http://node.green/#ES2017-features-Object-static-methods-Object-values), [`Object.entries`](http://node.green/#ES2017-features-Object-static-methods-Object-entries) | :white_check_mark: |
| [Trailing commas in function syntax](http://node.green/#ES2017-features-trailing-commas-in-function-syntax)                                                                            | :white_check_mark: |
| [`async`/`await`](http://node.green/#ES2017-features-async-functions)                                                                                                                  | :white_check_mark: |
| **ES2018/ES9**                                                                                                                                                                         |                    |
| [Object rest/spread properties](http://node.green/#ES2018-features-object-rest-spread-properties)                                                                                      | :white_check_mark: |

_Note: Most ES2015/ES6 are earlier features are supported._

## Usage

Edit your Lambda function under `src/main.js`, and run:

```sh
npm run build
```

This will transpile your functions down to ES5 using Babel, so that it can be executed using the Node.js 6.10.0 runtime.

For convenience, the following command will create an `artifact.zip` file which you can upload to AWS Lambda:

```sh
npm run package
```

## Testing

You can run automated tests for your Lambda function inside of a Docker container using [docker-lambda](https://github.com/lambci/docker-lambda):

```sh
npm run test
```

All files in the `test/` directory which end with `.test.js` will be interpreted as a test suite. A sample unit test is provided under [test/example.test.js](https://github.com/irvinlim/es2017-lambda-boilerplate/blob/master/test/example.test.js) to get you started.

The test runner used is [Jest](https://github.com/facebook/jest) (with [Jasmine](https://jasmine.github.io)). Using docker-lambda also requires Docker to be installed on your host; see the [docs for docker-lambda](https://github.com/lambci/docker-lambda) for more instructions.

### Specification tests

In order to ensure that the Babel configuration works and is following the spec, the boilerplate also runs several automated tests to catch any Babel misconfigurations.

* **Functional testing**: Runs the relevant spec tests from [Test262](https://github.com/tc39/test262) (actual tests taken from [node.green](http://node.green/)) on [docker-lambda](https://github.com/lambci/docker-lambda) to mock the AWS Lambda environment
* **Snapshot testing**: Unit testing strategy by storing snapshots of Babel-transformed source code and running unit tests against them

You can find the spec tests under `spec/functional` and `spec/snapshot` respectively.

If you are not going to modify `.babelrc`, you can choose to skip these tests by omitting the `npm run spec` script in `.travis.yml`. This will help to speed up your builds by a bit.

## Deployment

### Deployment using the AWS SDK

You can automatically deploy to AWS Lambda locally or through CI (e.g. Travis CI) using the AWS SDK, as long as you provide an access key for an IAM user that has write access to AWS Lambda. A single NPM script allows you to deploy using this method:

```sh
npm run deploy
```

See [Environment variables](#environment-variables) for the list of environment variables that are required for SDK deployment.

### Deployment through CloudFormation + CodeBuild

Instead of depending on external tools like Travis CI, you can also choose to use [AWS CloudFormation](https://aws.amazon.com/cloudformation/) to bootstrap the relevant AWS resources, integrated with [AWS CodeBuild](https://aws.amazon.com/codebuild/) and [AWS CodePipeline](https://aws.amazon.com/codepipeline/). Alternatively, deployment via [AWS CodeStar](https://aws.amazon.com/codestar/) may also be supported out of the box.

To modify the build process, you can update the CodeBuild configuration file at [`buildspec.yml`](https://github.com/irvinlim/es2017-lambda-boilerplate/blob/master/buildspec.yml). To modify the properties of the resultant Lambda function, you can update the CloudFormation configuration file at [`samTemplate.yml`](https://github.com/irvinlim/es2017-lambda-boilerplate/blob/master/samTemplate.yml).

If you are new to AWS CI/CD tools, you can follow the official [AWS tutorial](http://docs.aws.amazon.com/lambda/latest/dg/build-pipeline.html) to set up a build pipeline using CodePipeline. Take note of the following:

* Set up a S3 bucket for uploading CodeBuild artifacts to.
    * If the CodeBuild build fails, you may need to set the `S3_BUCKET` environment variable within CodeBuild directly.
* Ensure that the IAM roles have the necessary permissions to access required resources, including the S3 bucket.
* The CloudFormation template filename under CodePipeline settings should be `template.yml`.

## Using the AWS SDK

You can write Lambda functions that make use of the [AWS SDK](https://github.com/aws/aws-sdk-js) by simply `import`-ing `aws-sdk`. The package is installed globally within the AWS Lambda environment, so you don't need to add it to your `package.json`.

Also make sure that your function has Internet connectivity (i.e. not within a VPC without a NAT gateway). The `internetConnectivityTest.js` utility is included to help to debug such problems early when deploying to AWS Lambda.

### Environment variables

If you plan to use the AWS SDK, either for deployment (using `npm run deploy`), or within your function itself, you need to pass the following environment variables:

* `AWS_ACCESS_KEY_ID`: IAM user access key ID
* `AWS_SECRET_ACCESS_KEY`: IAM user secret access key
* `AWS_REGION`: AWS region where the Lambda function resides in (_required for SDK deployment only_)
* `LAMBDA_FUNCTION_NAME`: Name or ARN of the Lambda function (_required for SDK deployment only_)

This will work if you store it in a `.env` file in the root of the project (see [dotenv](https://github.com/motdotla/dotenv)), or if you define it within Travis CI itself (see [Travis CI docs](https://docs.travis-ci.com/user/environment-variables/)).

### IAM user permissions

The minimum permissions required for the IAM user for SDK deployment are:

* [`lambda:UpdateFunctionCode`](https://docs.aws.amazon.com/lambda/latest/dg/API_UpdateFunctionCode.html)

Remember to add more permissions as required if you need to access the SDK in your function.

## Why?

### Reduce callback hell with `async`/`await`

The highest version of Node.js supported on AWS Lambda is 6.10.0, which supports only features up to ES2015/ES6. Newer features in ES2017, such as `async`/`await`, are incredibly useful when performing network requests, such as when used with the [AWS SDK](https://github.com/aws/aws-sdk-js):

```js
const EC2 = new AWS.EC2();
const Route53 = new AWS.Route53();

// Get instance by ID.
const instances = await EC2.describeInstances({ InstanceIds: 'i-abcdef01' }).promise();

// Get public IP address.
const publicIpAddress = instances.Reservations[0].Instances[0].PublicIpAddress;

// Do something else with the IP address...
await Route53.changeResourceRecordSets({
    // ...
}).promise();
```

### Run automated tests locally/through CI

Instead of testing your Lambda function by uploading to AWS Lambda every single time, running automated tests in conjunction with CI is a better option. By using Docker to mock the AWS Lambda environment locally, you can write test cases to verify the correctness of your function, given an input (the [Lambda event](http://docs.aws.amazon.com/lambda/latest/dg/eventsources.html)):

```js
import run from './util/runner';

it('should work', function() {
    // Sample event from SNS.
    const event = {
        Records: [
            {
                EventVersion: '1.0',
                EventSource: 'aws:sns',
                Sns: {
                    MessageId: '95df01b4-ee98-5cb9-9903-4c221d41eb5e',
                    Message: 'Hello from SNS!',
                    ...
                },
            },
        ],
    };

    // Run the Lambda function against this event.
    const result = run(event);

    expect(result).toEqual(true);
});
```

This strategy also does not utilise your AWS Lambda invocation credits - meaning you are free to run as many tests as often as you like!

## Acknowledgements

This boilerplate was first inspired from this [post](http://jessesnet.com/development-notes/2016/nodejs-es7-aws-lambda/) by Jesse Cascio.

## License

MIT
