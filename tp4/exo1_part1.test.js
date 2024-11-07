const exf = require('./exo1_lab3')

test('prints string correct number of times', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    exf("echo", 5);
    expect(consoleSpy).toHaveBeenCalledTimes(5);
    expect(consoleSpy).toHaveBeenCalledWith("echo");
    consoleSpy.mockRestore(); // Reset console to its original state
});