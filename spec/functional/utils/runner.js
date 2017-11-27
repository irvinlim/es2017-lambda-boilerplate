const babel = require('babel-core');
const fs = require('fs');
const dockerLambda = require('docker-lambda');
const path = require('path');
const rimraf = require('rimraf');

function runTest(filename) {
    // Transform the input file.
    const readFilePath = path.join(__dirname, '../__fixtures__', filename);
    const { code } = babel.transformFileSync(readFilePath);

    // Write the file to a temporary directory.
    const writeFilePath = path.join(__dirname, '../__transpiled__', filename);
    const writeFileDir = path.dirname(writeFilePath);
    if (!fs.existsSync(writeFileDir)) {
        fs.mkdirSync(writeFileDir);
    }
    fs.writeFileSync(writeFilePath, code);

    // Construct the path of the transpiled script within the Docker container.
    const dockerFilePath = path.join('/var/task/__transpiled__', filename);

    // Run the Lambda function, taking in the transpiled script as the input.
    let result;

    try {
        // Run the Lambda in Docker.
        result = dockerLambda({
            // Use the Node.js 6.10.0 image.
            dockerImage: 'lambci/lambda:nodejs6.10',
            // Bind the parent directory as a volume to /var/task.
            taskDir: path.join(__dirname, '../'),
            // Specify the Lambda handler.
            handler: 'utils/handler.handler',
            // Pass an event to the Lambda function.
            event: {
                FunctionalTest: { Fixture: { ScriptPath: dockerFilePath } },
            },
        });
    } catch (err) {
        console.error('Error while executing Lambda function: ', err.message);
        result = false;
    }

    // Clean up the transpiled file.
    rimraf.sync(writeFileDir);

    return result;
}

module.exports = runTest;
