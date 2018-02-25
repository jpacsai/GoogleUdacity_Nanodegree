/*
Sum of two largest numbers in array

Write a function that takes an array of numbers as argument and returns a number represent the sum of the two largest numbers in it.

Examples:

sum([5,12,4,2,36]); // 48
sum([60,70,80,90,100,200] ); //300
Note: assume array elements are positive numbers

*/

// With .sort

function sum(arr) {
    return arr.sort(function (a,b){return a-b;}).slice(-2).reduce(function (total, num) {return total + num;});
}


// Non-sort method

function sum(arr) {
    var largest = Math.max(...arr);
    arr.splice(arr.indexOf(largest),1);
    return largest + Math.max(...arr);
}