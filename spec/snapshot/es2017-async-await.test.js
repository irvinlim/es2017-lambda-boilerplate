const { transform } = require('./utils');

it('async named function', () => {
    const code = transform(`
async function f() {
    return true;
}
`);
    expect(code).toMatchSnapshot();
});

it('async function expression', () => {
    const code = transform(`
var f = async function() {
    return true;
}
`);
    expect(code).toMatchSnapshot();
});

it('async arrow function', () => {
    const code = transform(`
var f = async () => {
    return true;
}
`);
    expect(code).toMatchSnapshot();
});

it('return await primitive', () => {
    const code = transform(`
async function f() {
    return await 123;
}
`);
    expect(code).toMatchSnapshot();
});

it('return await function call', () => {
    const code = transform(`
async function f() {
    return await g();
}
`);
    expect(code).toMatchSnapshot();
});

it('return await Promise', () => {
    const code = transform(`
async function f() {
    return await Promise.resolve(1);
}
`);
    expect(code).toMatchSnapshot();
});

it('variable assignment await primitive', () => {
    const code = transform(`
async function f() {
    var x = await 123;
    return x;
}
`);
    expect(code).toMatchSnapshot();
});

it('variable assignment await function call', () => {
    const code = transform(`
async function f() {
    var x = await g();
    return x;
}
`);
    expect(code).toMatchSnapshot();
});

it('variable assignment await Promise', () => {
    const code = transform(`
async function f() {
    var x = await Promise.resolve(1);
    return x;
}
`);
    expect(code).toMatchSnapshot();
});
