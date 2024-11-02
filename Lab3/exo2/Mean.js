function mean(array) {
    var res = 0
    for (let index = 0; index < array.length; index++) {
            res = res + array[index];
    }
    return res/array.length
};

module.exports = mean;