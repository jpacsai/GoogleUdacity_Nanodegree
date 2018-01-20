/*
Write a function that takes two arguments the first represents an array of numbers and the 
second is a number, if sum of two elements in array is equal to the the number(the second argument), 
remove the two elements and replace them by the sum.

For example

reduce([1,2,3],3); // [3,3]
reduce([8,12,16,20,4],20) // [20,20,20] // sum inserted in place of the number of the first index
reduce([14,8,6,8,3,5],16) // [14,16,6,3,5]
reduce([1,6,9,8],25);  // return the array [1,6,9,8] as no sum

*/

function reduce(arr,num) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 1; j < arr.length; j++) {
        if (i != j && arr[i] + arr[j] === num) {
          arr[i] = num;
          arr.splice(j,1);
        }
      }
    }
    return arr;
}