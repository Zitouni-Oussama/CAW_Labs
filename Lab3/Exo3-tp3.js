const fs = require('fs');

file_Name = process.argv[2];

if (!file_Name) {
    file_Name = "C:/Users/lenovo/OneDrive/Bureau/license/M1/CAW/TP/test-node/exo3.txt";
}

const data = fs.readFileSync(file_Name,"utf8");

console.log(data);