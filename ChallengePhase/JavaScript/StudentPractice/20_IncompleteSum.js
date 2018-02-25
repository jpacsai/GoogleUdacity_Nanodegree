/*
Write a function that takes an array of numbers as argument and return the sum of the largest 
and smallest numbers and all numbers in between except other numbers found in the array

For example

incompleteSum([2,3,5])   // 11
incompleteSum([3,6,2,1,4]); // 12
incompleteSum([1,3,5,10]); //47

*/

function incompleteSum(arr) {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    let sum = min+max;
    for (let i = min+1; i < max; i++) {
      if (arr.indexOf(i) === -1) {
        sum += i;
      }
    }
    return sum;
  }