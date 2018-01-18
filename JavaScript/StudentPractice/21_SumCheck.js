/*
write a function that takes an array of numbers as arguments and returns true or false depending 
on the following:

true if sum of two numbers in the array results a number also represented in it
false if there is no two elements do this
For example

check([1,2,3]); // true as 1+2 =3
check([5,4,6,8,3])  // true as 5+3 =8 all of them represented in the array
check([1,2,4])   // false
check([12,10,16,3,20]) // false 


*/

function check(arr) {
    let l = arr.length;
    for (let i = 0; i < l-1; i++) {
      for (let j = 1; j < l; j++) {
        if (arr.includes(arr[i] + arr[j]) && i != j) {
          return true;
        }
      }
    }
    return false;
}