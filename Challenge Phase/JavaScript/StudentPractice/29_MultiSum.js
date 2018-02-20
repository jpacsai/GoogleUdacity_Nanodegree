/*
Multiple Of Sums
Write a function that takes an array of numbers as argument and returns a number respresents multipe 
of sums of every two next numbers in the array

Examples

multSum([1,2,3,4,5,6]); // 3 * 7 * 11= 231
multSum([1,2,5]) //  3 * 5 = 15

*/


function multSum(arr) {
    let sum = 1;
    for (let i = 0; i < arr.length; i+=2) {
     // if array length is odd, i+1 would be undefined so assign value 0 in that case
      if (arr[i+1] === undefined) {
        arr[i+1] = 0;
      }
      sum *= arr[i] + arr[i+1];
    }
    return sum;
  }