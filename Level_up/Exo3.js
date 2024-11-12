const arr1 = [4,5,5,2,2,4,3,1,5,2];
const newArr = array => [...new Set(array)];
console.log("the old array of numbers : "+arr1);
console.log("the new array of numbers : "+newArr(arr1));

//!  --------------------- task2  ---------------------
const arr2 = ['a','b','c','d','e','f','g'];
const getRidof = (tab, ...val) => tab.filter(item => !val.includes(item));
console.log("\nthe old array of characters : "+arr2);
console.log("the new array of characters : "+getRidof(arr2,'b','e','x'));