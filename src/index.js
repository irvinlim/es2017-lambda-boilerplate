/**
 * Index for AWS Lambda function. The main source code should go under `main.js`.
 * Generated with [es2017-lambda-boilerplate](https://github.com/irvinlim/es2017-lambda-boilerplate).
 */

import internetConnectivityTest from './util/internetConnectivityTest';
import lambdaMain from './main';

// Helps to guard against timeouts when Lambda is placed in a VPC without a NAT gateway,
// which means that it does not have an outbound Internet connection.
// Set to 'false' if your Lambda function does not need use the SDK methods or require Internet connectivity.
const INTERNET_CONNECTIVITY_TEST = true;

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
