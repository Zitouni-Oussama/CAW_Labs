const fs = require('fs');

const file_name = process.argv[2];
const data = process.argv[3]

if (!file_name) {
    console.log("error");
}

fs.writeFileSync(file_name,data,console.log("The file has been saved!"))