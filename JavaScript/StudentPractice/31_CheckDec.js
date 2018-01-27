/*

Write a function that takes an array of numbers and checks if all numbers in array has the same 
first decimal number, returns true and false

For example

checkDecimal([5.5 , 2.53 , 9.5 , 5.59 , 6.5 , 5.57]) // true
checkDecimal([2.25 , 3.30 , 2.28 , 3.2]) // false

*/

function checkDecimal(arr) {
    
    // multiply the first element of the array by ten, so the number can turned into an integer which gets rid of the 
    // floating point, then get the last digit (with the remainder of dividing it by ten -> modulo)

    const dec = Math.abs(parseInt(arr[0]* 10) % 10);
    for (let i = 1, n = arr.length; i < n; i++) {

     // if array element is different than the number calculated before return false

      if (Math.abs((parseInt(arr[i] * 10) % 10)) !== dec) {
          return false;
      }   
    }
    return true;
  }