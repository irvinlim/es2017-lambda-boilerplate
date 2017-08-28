/**
 * Main AWS Lambda function source code.
 * The following is written using ES2017/ES8, and should be transpiled to ES6 before uploading to AWS Lambda.
 */

// The SDK is automatically available on Lambda and does not need to be uploaded through node_modules.
const AWS = require('aws-sdk');

// Utility function to test for Internet connectivity.
const internetConnectivityTest = require('./util/internetConnectivityTest');

// Helps to guard against timeouts when Lambda is placed in a VPC without a NAT gateway,
// which means that it does not have an outbound Internet connection.
// Set to 'false' if your Lambda function does not need use the SDK methods or require Internet connectivity.
const INTERNET_CONNECTIVITY_TEST = true;

/** 
 * Main method for Lambda goes here. async/await works!
 */
const lambdaMain = async (event, context) => {
    // Example SDK call.
    return await new AWS.EC2().describeInstances().promise();
};

/**
 * Wrapper to pass errors or return results to callback().
 */
exports.handler = async (event, context, callback) => {
    // Tests for Internet connectivity.
    if (INTERNET_CONNECTIVITY_TEST) {
        const isConnected = await internetConnectivityTest();

        if (!isConnected) {
            const errorMessage =
                'No Internet connectivity from Lambda. ' +
                'If you do not require to use the AWS SDK or Internet connection, ' +
                'you may set INTERNET_CONNECTIVITY_TEST to false.';

            context.fail(errorMessage);
            return callback(errorMessage);
        }
    }

    // Wrap the main method in a try/catch block.
    // Prevents UncaughtPromiseRejection.
    try {
        // Invoke main method.
        const result = await lambdaMain(event, context);

        // Return result to the caller.
        callback(null, result);
    } catch (err) {
        // Throws an error to the caller.
        callback(err);
    }
};
