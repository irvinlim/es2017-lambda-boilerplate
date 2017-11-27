module.exports = function() {
    async function a() {
        await Promise.resolve();
    }
    try {
        Function('(async function a(b = await Promise.resolve()){}())')();
    } catch (e) {
        return true;
    }
};
