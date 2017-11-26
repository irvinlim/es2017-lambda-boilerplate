module.exports = function() {
    var passed = 0;
    return (
        [].includes.call(
            {
                get '0'() {
                    passed = NaN;
                    return 'foo';
                },
                get '11'() {
                    passed += 1;
                    return 0;
                },
                get '19'() {
                    passed += 1;
                    return 'foo';
                },
                get '21'() {
                    passed = NaN;
                    return 'foo';
                },
                get length() {
                    passed += 1;
                    return 24;
                },
            },
            'foo',
            6
        ) === true && passed === 3
    );
};
