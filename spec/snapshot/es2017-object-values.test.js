const { transform } = require('./utils');

it('object literal', () => {
    const code = transform('Object.values({ a: 1, b: 2 });');
    expect(code).toMatchSnapshot();
});

it('object variable', () => {
    const code = transform('var obj = { a: 1, b: 2 }; Object.values(obj);');
    expect(code).toMatchSnapshot();
});
