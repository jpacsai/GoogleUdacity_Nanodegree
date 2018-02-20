/*
Add Negatives
Write a function that takes an array of elements of any data type and return a number represents sum of 
(multiplication result of all non negative numbers with 0 included and sum of all negative numbers)

For example

AddNeg([1,"5",NaN,2,3,-5,4,-6,7,8,-9]);// (1*2*3*4*7*8)+(-5-6-9) = 1324
AddNeg([-1,-5,-3,4,-1,6,true]) // (4*6) + (-1-5-3-1) // 14
AddNeg([0,-2,3,-1]) // -3

*/

function AddNeg(arr) {
    let poz = 1;
    let neg = 0;
    for (let i = 0; i < arr.length; i++) {
      if (Number.isInteger(arr[i])) {
        arr[i] >= 0 ? poz *= arr[i] : neg += arr[i];
      }
    }
    return poz + neg;
}
  