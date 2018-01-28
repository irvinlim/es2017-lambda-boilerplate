const { transform } = require('./utils');

it('object spread properties', () => {
    const code = transform('var x = { a: 1, b: 2 }; var y = { a: 3, ...x };');
    expect(code).toMatchSnapshot();
});

it('object rest properties', () => {
    const code = transform(
        'var x = { a: 1, b: 2 }; var { a, ...rest } = x; console.log(rest.b);'
    );
    expect(code).toMatchSnapshot();
});
