//!  --------------------- task 1 ---------------------
let var1 = 5;
let var2 = 2;
console.log("var1 : "+var1);
console.log("var2 : "+var2);
[var1, var2] = [var2, var1];
console.log("var1 : "+var1);
console.log("var2 : "+var2);

//!  --------------------- task 2 ---------------------
const numbers = [1, 2, 3];
const letters = ["a", "b", "c"];
const foods = ["mango", "pecan pie"];

console.log("\n1st array of numbers ==> "+numbers);
console.log("2nd array of letters ==> "+letters);
console.log("3rd array of food ==> "+foods);

const concatenate_array = [...numbers, ...letters, ...foods];
console.log("4th array of concatenate array ==> "+concatenate_array);

//!  --------------------- task 3 ---------------------
var s = "Hello-world";
const array_s = [...s];
console.log("\nthe word : "+s+" ===> "+array_s);

//!  --------------------- task 4 ---------------------
//? fn(1,2,3,'A','B','C') ==> args = [3,'A','B','C']
//? fn(1,2) ==> args = []
//? x = ['a','b','c','d'] --> fn(...x) ==> args = ['c','d']