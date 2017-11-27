/**
 * Feel free to modify your Lambda function here!
 */

import AWS from 'aws-sdk';
import request from 'jsonrequest';

const router = (event, context) => {
    switch (event.type) {
        case 'rest-api-example':
            return restApiExample(event.data, context);
        case 'aws-sdk-example':
            return awsSdkExample(event.data, context);
    }
};

const restApiExample = async (data, context) => {
    const { user, repo } = data;

    // Make a REST API call to the GitHub API.
    const options = {
        url: `https://api.github.com/repos/${user}/${repo}`,
        headers: { 'User-Agent': 'AWS Lambda' },
    };

    // Await the Promise.
    return await request(options);
};

const awsSdkExample = async (data, context) => {
    const EC2 = new AWS.EC2();

    // Sample EC2 call.
    return await EC2.describeInstances().promise();
};

module.exports = router;
