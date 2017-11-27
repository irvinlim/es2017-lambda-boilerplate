module.exports = function() {
    return [
        Int8Array,
        Uint8Array,
        Uint8ClampedArray,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
    ].every(function(TypedArray) {
        return (
            new TypedArray([1, 2, 3]).includes(1) &&
            !new TypedArray([1, 2, 3]).includes(4) &&
            !new TypedArray([1, 2, 3]).includes(1, 1)
        );
    });
};
