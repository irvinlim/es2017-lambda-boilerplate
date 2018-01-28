/**
 * Runs integration tests for each ES2017/ES2016 feature that
 * is purportedly supported by the boilerplate.
 * The difference between this and the specification tests is
 * that while specification tests ensure that the Babel config
 * is correct, integration tests ensure that the rest of the
 * Javascript boilerplate code for the Lambda is working as expected
 * and does not crash/fail to transpile.
 *
 * NOTE: You should remove this in your actual production code.
 * This is only for testing the boilerplate.
 */

import run from './util/runner';

it('should call Object.entries correctly', function() {
    const event = {
        type: 'integration-test-example',
        data: {
            function: 'Object.entries',
            value: {
                hello: 'world',
                number: 100,
                isTrue: true,
            },
        },
    };

    const result = run(event);

    expect(result).toEqual([
        ['hello', 'world'],
        ['number', 100],
        ['isTrue', true],
    ]);
});

it('should call Object.values correctly', function() {
    const event = {
        type: 'integration-test-example',
        data: {
            function: 'Object.values',
            value: {
                hello: 'world',
                number: 100,
                isTrue: true,
            },
        },
    };

    const result = run(event);

    expect(result).toEqual(['world', 100, true]);
});

it('should call Array.prototype.includes correctly', function() {
    const event = {
        type: 'integration-test-example',
        data: {
            function: 'Array.prototype.includes',
            value: [1, 5, 70, 3, 54],
            value2: 3,
        },
    };

    const result = run(event);

    expect(result).toEqual(true);
});

it('should call Exponentiation correctly', function() {
    const event = {
        type: 'integration-test-example',
        data: {
            function: 'Exponentiation',
            value: 2,
            value2: 10,
        },
    };

    const result = run(event);

    expect(result).toEqual(1024);
});

it('should call Object spread properties correctly', function() {
    const event = {
        type: 'integration-test-example',
        data: {
            function: 'Object spread properties',
            value: {
                hello: 'world',
            },
        },
    };

    const result = run(event);

    expect(result).toEqual({ hello: 'world' });
});

it('should call Object rest properties correctly', function() {
    const event = {
        type: 'integration-test-example',
        data: {
            function: 'Object rest properties',
            value: {
                child: 'first',
                otherChild: 'second',
            },
        },
    };

    const result = run(event);

    expect(result).toEqual({ otherChild: 'second' });
});
