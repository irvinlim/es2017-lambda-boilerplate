# ![es2017-lambda-boilerplate](https://github.com/irvinlim/es2017-lambda-boilerplate/blob/master/docs/images/banner.png)

[![GitHub](https://img.shields.io/github/release/irvinlim/es2017-lambda-boilerplate.svg?style=flat-square)](https://github.com/irvinlim/es2017-lambda-boilerplate/releases)
[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](http://opensource.org/licenses/MIT)

## What is it?

This is a boilerplate for [AWS Lambda](https://aws.amazon.com/lambda/) Node.js 6.10.0 functions, which allows you to use the latest JavaScript [ES2017/ES8 features](https://hackernoon.com/es8-was-released-and-here-are-its-main-new-features-ee9c394adf66) within a Lambda function.

This boilerplate adds support for the following most commonly used JavaScript features that are not natively supported on AWS Lambda:

| Feature | Supported? |
|:--------|:----------:|
| **ES2016/ES7** | |
| [Exponentiation operator (`**`)](http://node.green/#ES2016-features-exponentiation------operator) | :white_check_mark: |
| [`Array.prototype.includes`](http://node.green/#ES2016-features-Array-prototype-includes) | :white_check_mark: |
| **ES2017/ES8** | |
| [`Object.values`](http://node.green/#ES2017-features-Object-static-methods-Object-values), [`Object.entries`](http://node.green/#ES2017-features-Object-static-methods-Object-entries) | :white_check_mark: |
| [Trailing commas in function syntax](http://node.green/#ES2017-features-trailing-commas-in-function-syntax) | :white_check_mark: |
| [`async`/`await`](http://node.green/#ES2017-features-async-functions) | :white_check_mark: |
| **ESNEXT** | |
| [Object rest/spread properties](http://node.green/#ESNEXT-candidate--stage-3--object-rest-spread-properties) | :white_check_mark: |

*Note: Only features which are not normally available on AWS Lambda Node.js 6.10.0 are listed. Most ES2015/ES6 features and earlier are supported.*

## Usage

Edit your Lambda function under `src/index.js`, and run:

```
npm run package
```

This will create an `artifact.zip` file which you can upload to AWS Lambda.

## Why?

### Latest ES2017 features

Even though Lambda supposedly supports Node.js 6.10.0, not all JavaScript features are supported. [www.whatdoeslambdasupport.com](http://www.whatdoeslambdasupport.com/) has a comprehensive list of what is supported and what are not.

If you are used to using features like `async`/`await` which have been around for a while now, you might find it tedious to build your own tooling to transpile all the latest ECMAScript features that you have been using all along.

That's why I built this boilerplate - using `async`/`await` was really important to me when making use of the AWS SDK on Lambda, like as follows:

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

The usage of `async`/`await` reduces all the cruft involved when using either normal AWS SDK callbacks or chaining Promises.

### Internet connectivity handling

I was also bitten badly by the fact that placing a Lambda function in a VPC requires a NAT gateway in order for the Lambda function to have outbound Internet connectivity, and I was trying to use the bundled AWS SDK to perform operations on the AWS API.

Not knowing that using the SDK requires Internet connectivity (I assumed that the SDK could call the IPv4 link-local address for the metadata server `http://169.254.169.254` for API calls, and thus required for it to be placed in a VPC), I was stuck for a good couple of hours to find out why my Lambda functions consistently hit the 30s timeout I had set.

This boilerplate performs a quick Internet connectivity test (up to 1000ms) to help you guard and debug against this problem, terminating the execution instead of timing out only after the full duration of the Lambda execution time. 

Set the `INTERNET_CONNECTIVITY_TEST` constant to `true` in order to use this feature, otherwise it will not invoke the Internet connectivity test.

## Acknowledgements

This boilerplate was inspired from this [post](http://jessesnet.com/development-notes/2016/nodejs-es7-aws-lambda/) by Jesse Cascio.

## License

MIT
