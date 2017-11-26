const dockerLambda = require('docker-lambda');
const path = require('path');

function runTest(filename) {
    // Construct script path within the Docker container.
    const scriptPath = path.join('/var/task/__fixtures__/', filename);

    // Store the result of the execution.
    let result;

    try {
        // Run the Lambda in Docker.
        result = dockerLambda({
            // Bind the parent directory as a volume to /var/task.
            taskDir: path.join(__dirname, '../'),
            // Specify the Lambda handler.
            handler: 'utils/handler.handler',
            // Pass an event to the Lambda function.
            event: { EndToEndTest: { Fixture: { ScriptPath: scriptPath } } },
        });
    } catch (err) {
        console.error('Error while executing Lambda function: ', err.message);
        return false;
    }

    return result === true;
}

module.exports = runTest;
