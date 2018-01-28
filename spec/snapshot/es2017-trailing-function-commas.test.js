const { transform } = require('./utils');

// Trailing commas in function expression signature

it('variable assignment with function primitive', () => {
    const code = transform(`
var f = function(
    a,
    b,
    c,
) { return a + b + c; }
`);
    expect(code).toMatchSnapshot();
});

it('named function', () => {
    const code = transform(`
function f(
    a,
    b,
    c,
) { return a + b + c; }
`);
    expect(code).toMatchSnapshot();
});

it('IIFE', () => {
    const code = transform(`
(function(
    a,
    b,
    c,
) { return a + b + c; })();
`);
    expect(code).toMatchSnapshot();
});

it('named IIFE', () => {
    const code = transform(`
(function f(
    a,
    b,
    c,
) { return a + b + c; })();
`);
    expect(code).toMatchSnapshot();
});

it('array primitive declaration with function primitive', () => {
    const code = transform(`
var arr = [function(
    a,
    b,
    c,
) { return a + b + c; }];
`);
    expect(code).toMatchSnapshot();
});

it('array primitive declaration with named function primitive', () => {
    const code = transform(`
var arr = [function f(
    a,
    b,
    c,
) { return a + b + c; }];
`);
    expect(code).toMatchSnapshot();
});

it('Array() constructor declaration with function primitive', () => {
    const code = transform(`
var arr = Array(function(
    a,
    b,
    c,
) { return a + b + c; });
`);
    expect(code).toMatchSnapshot();
});

it('Array() constructor declaration with named function primitive', () => {
    const code = transform(`
var arr = Array(function f(
    a,
    b,
    c,
) { return a + b + c; });
`);
    expect(code).toMatchSnapshot();
});

it('object primitive declaration with function primitive', () => {
    const code = transform(`
var arr = { x: function(
    a,
    b,
    c,
) { return a + b + c; }};
`);
    expect(code).toMatchSnapshot();
});

it('object primitive declaration with named function primitive', () => {
    const code = transform(`
var arr = { x : function f(
    a,
    b,
    c,
) { return a + b + c; }};
`);
    expect(code).toMatchSnapshot();
});

it('object primitive declaration with named function shorthand', () => {
    const code = transform(`
var arr = { f(
    a,
    b,
    c,
) { return a + b + c; }};
`);
    expect(code).toMatchSnapshot();
});

// Trailing commas in arrow function signature

it('variable assignment with arrow function primitive', () => {
    const code = transform(`
var f = (
    a,
    b,
    c,
) => { return a + b + c; }
`);
    expect(code).toMatchSnapshot();
});

it('arrow function IIFE', () => {
    const code = transform(`
((
    a,
    b,
    c,
) => { return a + b + c; })();
`);
    expect(code).toMatchSnapshot();
});

it('array primitive declaration with arrow function primitive', () => {
    const code = transform(`
var arr = [(
    a,
    b,
    c,
) => { return a + b + c; }];
`);
    expect(code).toMatchSnapshot();
});

it('Array() constructor declaration with function primitive', () => {
    const code = transform(`
var arr = Array((
    a,
    b,
    c,
) => { return a + b + c; });
`);
    expect(code).toMatchSnapshot();
});

it('object primitive declaration with arrow function primitive', () => {
    const code = transform(`
var arr = { x: (
    a,
    b,
    c,
) => { return a + b + c; }};
`);
    expect(code).toMatchSnapshot();
});

// Trailing commas in function call

it('function call expression', () => {
    const code = transform(`
function f(a, b) { return a + b; }
var x = f(
    1,
    2,
);
`);
    expect(code).toMatchSnapshot();
});

it('IIFE call', () => {
    const code = transform(`
(function f(a, b) { return a + b; })(
    1,
    2,
);
`);
    expect(code).toMatchSnapshot();
});
