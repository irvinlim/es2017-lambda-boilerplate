const babel = require('babel-core');
const path = require('path');
const fs = require('fs');

// Read the base .babelrc config file.
const babelrc = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../../.babelrc'))
);

// Filter out any unwanted plugins for unit testing.
babelrc.plugins = babelrc.plugins.filter(plugin => {
    // Filter out the add-header-comment plugin.
    if (Array.isArray(plugin) && plugin[0] === 'add-header-comment') {
        return false;
    }

    return true;
});

module.exports = {
    /**
     * Performs a Babel transform using the Babel API.
     * Uses a .babelrc configuration file extended from the main file.
     * @param {string} input The input code that should be transpiled by Babel.
     * @return {string} The output code that is transpiled by Babel.
     */
    transform(input) {
        const babelOptions = Object.assign({ babelrc: false }, babelrc);
        return babel.transform(input, babelOptions).code;
    },
};
