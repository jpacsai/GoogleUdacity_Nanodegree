/*
Write a function that takes 3 arrays of numbers as arguments and returns true or false according 
to the following

true if the first and seconds array has the same elements in the same indexes so they should be 
the same length and the third array can have a bigger length but still have the same elements 
in the same indexes of the first and second one

false if not

For examples

checkArr([1,2,3],[1,2,3],[1,2,3]) // true
checkArr([1,2,3],[1,2,3],[1,2,3,4,5,6]) // true
checkArr([1,2,3],[1,3,3],[1,2,3,4,5,6]) // false
checkArr([1,2,3],[1,2,3],[1,2])  // false

*/

function checkArr(arr1,arr2,arr3) {
  
    // check if the first two array's length are the same
    if (arr1.length == arr2.length) {
      
      // if the first two array's length are the same, iterate through arrays 
      for (let i = 0; i < arr1.length; i++) {
        
        // check if arr1 and arr2 has the same elements at the same index 
        // or arr2 and arr3 has the same elements at the same index, if not return false
        if (arr1[i] != arr2[i] || arr2[i] != arr3[i]) {
          return false;
        }
      }
      return true;
    }
    // if the first two array's length are not the same, return false
    return false;
}