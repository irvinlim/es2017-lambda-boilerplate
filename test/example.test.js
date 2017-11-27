/**
 * Example test using Jest/Jasmine.
 *
 * Use run() to run your Lambda function within docker-lambda.
 */

import run from './util/runner';

it('should fetch a valid repo from GitHub API successfully', function() {
    const event = {
        type: 'rest-api-example',
        data: {
            user: 'irvinlim',
            repo: 'es2017-lambda-boilerplate',
        },
    };

    const result = run(event);

    expect(result.owner.login).toEqual('irvinlim');
});

it('should successfully call AWS SDK', function() {
    const event = {
        type: 'aws-sdk-example',
    };

    const result = run(event);

    expect(typeof result).toEqual('object');
    expect(Array.isArray(result.Reservations)).toEqual(true);
});
