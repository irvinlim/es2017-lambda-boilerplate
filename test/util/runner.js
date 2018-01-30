import { formatLogForConsole, formatLogForError, getSysLogLines } from './logs';

import dockerLambda from 'docker-lambda';
import dotenv from 'dotenv';
import path from 'path';

// Read environment variables from .env file.
dotenv.config();

function run(event) {
    // Run the Lambda in Docker.
    const result = dockerLambda({
        // Use the Node.js 6.10.0 image.
        dockerImage: 'lambci/lambda:nodejs6.10',

        // Bind the build directory as a volume to /var/task.
        taskDir: path.join(__dirname, '../dist'),

        // Capture both stderr and stdout, instead of catching Errors.
        returnSpawnResult: true,

        // Pass an event to the Lambda function.
        event,

        // Pass AWS credentials from environment.
        // NOTE: Jest needs the environment variable values explicitly,
        // see https://github.com/facebook/jest/issues/5362.
        dockerArgs: [
            '-e',
            `AWS_ACCESS_KEY_ID=${process.env.AWS_ACCESS_KEY_ID}`,
            '-e',
            `AWS_SECRET_ACCESS_KEY=${process.env.AWS_SECRET_ACCESS_KEY}`,
        ],
    });

    // Catch Lambda errors, based on spawn status codes/errors.
    if (result.error || result.status !== 0) {
        // Throw errors back to test runner.
        const { errorMessage } = JSON.parse(result.stdout);

        // Format error message to be displayed in test runner.
        const combinedErrorMsg = formatLogForError(errorMessage, result.stderr);

        throw new Error(combinedErrorMsg);
    }

    // Capture any console.log occurrences by inspecting the syslog.
    const logs = getSysLogLines(result.stderr);

    // Display all messages in a single block in the test runner.
    if (logs.length) {
        console.log(formatLogForConsole(logs));
    }

    return JSON.parse(result.stdout);
}

module.exports = run;
