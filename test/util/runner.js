const dockerLambda = require('docker-lambda');
const fs = require('fs');
const path = require('path');

function run(event) {
    // Run the Lambda function.
    let result;

    try {
        // Run the Lambda in Docker.
        result = dockerLambda({
            // Bind the build directory as a volume to /var/task.
            taskDir: path.join(__dirname, '../dist'),
            // Pass an event to the Lambda function.
            event,
        });
    } catch (err) {
        // Throw errors back to test runner.
        console.error('Error while executing Lambda function: ', err.message);
        throw err;
    }

    return result;
}

module.exports = run;
