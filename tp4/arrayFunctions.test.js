const { first, last, joinStrings, chunk } = require('./arrayFunctions');

test('gets first n elements', () => {
    expect(first([1, 2, 3, 4], 2)).toEqual([1, 2]);
    expect(first([1, 2, 3, 4], 0)).toEqual([]);
    expect(first([1, 2, 3, 4])).toBe(1);
});

test('gets last n elements', () => {
    expect(last([1, 2, 3, 4], 2)).toEqual([3, 4]);
    expect(last([1, 2, 3, 4], 0)).toEqual([]);
    expect(last([1, 2, 3, 4])).toBe(4);
});

test('concatenates array elements into string', () => {
    expect(joinStrings(["Red", "Green", "White", "Black"])).toBe("RedGreenWhiteBlack");
});

test('chunks array into sub-arrays of size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
});
