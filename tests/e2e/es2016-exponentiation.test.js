const runTest = require('./utils/runner');
const path = filename => `es2016-exponentiation/${filename}.js`;

it('basic support', function() {
    expect(runTest(path('basic-support'))).toEqual(true);
});

it('assignment', function() {
    expect(runTest(path('assignment'))).toEqual(true);
});

it('early syntax error for unary negation without parens', function() {
    expect(runTest(path('unary-negation-without-parens'))).toEqual(true);
});
