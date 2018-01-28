const { transform } = require('./utils');

it('object literal', () => {
    const code = transform('Object.entries({ a: 1, b: 2 });');
    expect(code).toMatchSnapshot();
});

it('object variable', () => {
    const code = transform('var obj = { a: 1, b: 2 }; Object.entries(obj);');
    expect(code).toMatchSnapshot();
});
