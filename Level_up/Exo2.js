//!  --------------------- function 1 ---------------------
var arr = [3, 5, 8];
console.log("Array arr : " + arr);

var plus_one = arr.map(n => n + 1);
console.log("\nAdd 1 to array arr : " + plus_one);

//!  --------------------- function 2 ---------------------
var dob = arr.map(n => n * 2);
console.log("\nDouble of array arr : " + dob);

//!  --------------------- function 3 ---------------------
var obj = {
    numbers: {
        a: 12,
        b: 2
    }
}

var {a, b} = obj.numbers;
console.log("\nthe value of first number : "+a);
console.log("the value of second number : "+b);

//!  --------------------- function 4 ---------------------
const add = (a, b) => {
    a = a === 0 ? 0 : a || 10;
    b = b === 0 ? 0 : b || 10;

    return a+b;
}
console.log("\na : "+a+" + b : "+b+" = "+add(a,b));