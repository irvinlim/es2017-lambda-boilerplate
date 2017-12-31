/**
 * Simple script that deploys the zipped package to AWS Lambda using the AWS SDK.
 *
 * Alternatively, you can use AWS CodeBuild + AWS CloudFormation to deploy the
 * function whenever you push to your repository.
 */

import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';
import print from './utils/print';

const errorExit = msg => {
    print.error(msg);
    return process.exit(1);
};

(async function() {
    // Fetches AWS credentials and Lambda details from the .env file.
    dotenv.config();

    // Validate if required environment variables are provided.
    const requiredEnv = [
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY',
        'AWS_REGION',
        'LAMBDA_FUNCTION_NAME',
    ];

    for (let env of requiredEnv) {
        if (!process.env[env]) {
            errorExit(`Missing environment variable: ${env}`);
        }
    }

    const {
        AWS_REGION: region,
        AWS_ACCESS_KEY_ID: accessKeyId,
        AWS_SECRET_ACCESS_KEY: secretAccessKey,
        LAMBDA_FUNCTION_NAME: functionName,
    } = process.env;

    // Update the AWS credentials and region.
    AWS.config.update({ region, accessKeyId, secretAccessKey });

    const artifactZipPath = path.join(__dirname, '../artifact.zip');
    let artifactZipBuf;

    try {
        artifactZipBuf = await fs.readFile(artifactZipPath);
    } catch (err) {
        errorExit(err.message);
    }

    const Lambda = new AWS.Lambda();
    const params = {
        FunctionName: functionName,
        ZipFile: artifactZipBuf,
    };

    // Update the Lambda function code.
    try {
        await Lambda.updateFunctionCode(params).promise();
    } catch (err) {
        errorExit(err.message);
    }

    print.success('Successfully uploaded to AWS Lambda!');
})();
