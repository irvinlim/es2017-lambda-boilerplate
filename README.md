# ![es2017-lambda-boilerplate](https://github.com/irvinlim/es2017-lambda-boilerplate/blob/master/docs/images/banner.png)

[![Travis CI](https://img.shields.io/travis/irvinlim/es2017-lambda-boilerplate.svg?style=flat-square)](https://travis-ci.org/irvinlim/es2017-lambda-boilerplate) [![GitHub](https://img.shields.io/github/release/irvinlim/es2017-lambda-boilerplate.svg?style=flat-square)](https://github.com/irvinlim/es2017-lambda-boilerplate/releases) [![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](http://opensource.org/licenses/MIT)

This is a boilerplate for [AWS Lambda](https://aws.amazon.com/lambda/) Node.js 6.10.0 functions, which allows you to use the latest JavaScript [ES2017/ES8 features](https://hackernoon.com/es8-was-released-and-here-are-its-main-new-features-ee9c394adf66) within a Lambda function.

This boilerplate adds support for the following most commonly used JavaScript features that are not natively supported on AWS Lambda:

| Feature                                                                                                                                                                                |     Supported?     |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------: |
| **ES2016/ES7**                                                                                                                                                                         |                    |
| [Exponentiation operator (`**`)](http://node.green/#ES2016-features-exponentiation------operator)                                                                                      | :white_check_mark: |
| [`Array.prototype.includes`](http://node.green/#ES2016-features-Array-prototype-includes)                                                                                              | :white_check_mark: |
| **ES2017/ES8**                                                                                                                                                                         |                    |
| [`Object.values`](http://node.green/#ES2017-features-Object-static-methods-Object-values), [`Object.entries`](http://node.green/#ES2017-features-Object-static-methods-Object-entries) | :white_check_mark: |
| [Trailing commas in function syntax](http://node.green/#ES2017-features-trailing-commas-in-function-syntax)                                                                            | :white_check_mark: |
| [`async`/`await`](http://node.green/#ES2017-features-async-functions)                                                                                                                  | :white_check_mark: |
| **ESNEXT**                                                                                                                                                                             |                    |
| [Object rest/spread properties](http://node.green/#ESNEXT-candidate--stage-3--object-rest-spread-properties)                                                                           | :white_check_mark: |

_Note: Only features which are not normally available on AWS Lambda Node.js 6.10.0 are listed. Most ES2015/ES6 features and earlier are supported._

## Usage

Edit your Lambda function under `src/main.js`, and run:

```js
npm run package
```

This will create an `artifact.zip` file which you can upload to AWS Lambda.

## Testing

You can run automated tests for your Lambda function inside of a Docker container using [docker-lambda](https://github.com/lambci/docker-lambda):

```js
npm run test
```

The test runner used is [Jest](https://github.com/facebook/jest) (with [Jasmine](https://jasmine.github.io)). All files in the `test/` directory which end with `.test.js` will be interpreted as a test suite.

This also requires Docker to be installed on your host; see the [docs for docker-lambda](https://github.com/lambci/docker-lambda) for more instructions.

### Specification tests

In order to ensure that the Babel configuration works and is following the spec, the boilerplate also runs several automated tests to catch any Babel misconfigurations.

* **Functional testing**: Runs the relevant spec tests from [Test262](https://github.com/tc39/test262) (actual tests taken from [node.green](http://node.green/)) on [docker-lambda](https://github.com/lambci/docker-lambda) to mock the AWS Lambda environment
* **Snapshot testing**: Unit testing strategy by storing snapshots of Babel-transformed source code and running unit tests against them

You can find the spec tests under `spec/functional` and `spec/snapshot` respectively.

If you are not going to modify `.babelrc`, you can choose to skip these tests by omitting the `npm run spec` script in `.travis.yml`. This will help to speed up your builds by a bit.

## Why?

### Latest ES2017 features

Even though Lambda supposedly supports Node.js 6.10.0, not all JavaScript features are supported. [www.whatdoeslambdasupport.com](http://www.whatdoeslambdasupport.com/) has a comprehensive list of what is supported and what are not.

This boilerplate adds support for the most commonly used features that are not available on Node 6.10.0 or AWS Lambda, such as `async`/`await` when used with the [AWS SDK](https://github.com/aws/aws-sdk-js):

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
