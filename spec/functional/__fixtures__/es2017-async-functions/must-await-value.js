module.exports = function() {
    async function a() {
        await Promise.resolve();
    }
    try {
        Function('(async function a(){ await; }())')();
    } catch (e) {
        return true;
    }
};
