import dockerLambda from 'docker-lambda';
import dotenv from 'dotenv';
import path from 'path';

// Read environment variables from .env file.
dotenv.config();

function run(event) {
    // Run the Lambda function.
    let result;

    try {
        // Run the Lambda in Docker.
        result = dockerLambda({
            // Use the Node.js 6.10.0 image.
            dockerImage: 'lambci/lambda:nodejs6.10',
            // Bind the build directory as a volume to /var/task.
            taskDir: path.join(__dirname, '../dist'),
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
    } catch (err) {
        // Throw errors back to test runner.
        const { errorMessage } = JSON.parse(err.stdout);
        const error = new Error(errorMessage);
        throw error;
    }

    return result;
}

module.exports = run;
