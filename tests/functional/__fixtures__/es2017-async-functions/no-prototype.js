module.exports = function() {
    async function a() {}
    return !a.hasOwnProperty('prototype');
};
