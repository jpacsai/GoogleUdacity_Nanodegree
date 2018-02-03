/*
Write a function that takes an array of numbers as arguments and returns an array of numbers 
represents the original array but sorted by the sum of every two opposite elements in the array, 
the least sum
put the two elements toward the middle of the array , the bigger should be toward the extremities,

Every two opposite elements means that if one is at index i the opposite should be at index 
(length-1-i) so element at index 0 is the opposite of element at index 6 in 7 elements array.

For example

sortSum([1,5,4,6]); // [5,1,6,4]
sortSum([2,14,6,5,8,17,3]); // [14,6,2,5,3,8,17]

*/

function sortSum(arr) {
    let result = [];  // this will be our final array
  
    const middle = Math.floor(arr.length/2);  // calculate middle index
    if (arr.length % 2) {  // if array length is odd, add the middle element to final array
      result.push(arr[middle]);
    }
  
    let sortArr = [];  // array to add value pairs
    for (let i = 0; i < middle; i++) {
      sortArr.push([]);
      sortArr[i].push(arr[i],arr[arr.length-1-i]);  // adding value pairs, one from the beginning and one from end
    }
    
    // bubble sort the value pairs from smallest to largest
    let j = 1;
    while (j < sortArr.length) {
      if ((sortArr[j][0] + sortArr[j][1]) < (sortArr[j-1][0] + sortArr[j-1][1])) {
        let temp = sortArr[j];
        sortArr.splice(j,1);
        sortArr.splice(j-1,0,temp);
      }
      else {
        j++;
      }
    }
    
    // add back the value pairs to array, adding one element at the beginning and one at end, working our way from the middle out
    for (let k = 0; k < middle; k++) {
      result.unshift(sortArr[k][0]);
      result.push(sortArr[k][1]);
    }
    return result;
}