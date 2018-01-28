const { transform } = require('./utils');

it('expression with primitives', () => {
    const code = transform('2 ** 10');
    expect(code).toMatchSnapshot();
});

it('expression with variables', () => {
    const code = transform('var x = 2; var y = x ** 10;');
    expect(code).toMatchSnapshot();
});

it('exponentiation assignment', () => {
    const code = transform('var x = 2; x **= 10;');
    expect(code).toMatchSnapshot();
});
