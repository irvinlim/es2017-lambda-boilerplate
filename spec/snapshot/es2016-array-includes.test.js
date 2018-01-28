const { transform } = require('./utils');

it('array literal expression', () => {
    const code = transform('[1, 2, 3].includes(1)');
    expect(code).toMatchSnapshot();
});

it('Array() constructor literal expression', () => {
    const code = transform('Array(1, 2, 3).includes(1)');
    expect(code).toMatchSnapshot();
});
