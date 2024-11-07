const { mean } = require('./exo2_lab3');

test('calculates average of scores', () => {
    expect(mean([90, 80, 70, 60])).toBe(75);
});
