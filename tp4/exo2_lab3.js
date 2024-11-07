function mean(scores) {
    const total = scores.reduce((acc, score) => acc + score, 0);
    return total / scores.length;
}

// Export the function for use in other files
module.exports = { mean };
