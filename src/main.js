/**
 * Feel free to modify your Lambda function here!
 */

import request from 'jsonrequest';

const lambda = async (event, context) => {
    const { user, repo } = event;

    // Make a REST API call to the GitHub API.
    const options = {
        url: `https://api.github.com/repos/${user}/${repo}`,
        headers: { 'User-Agent': 'AWS Lambda' },
    };

    // Await the Promise.
    return await request(options);
};

module.exports = lambda;
