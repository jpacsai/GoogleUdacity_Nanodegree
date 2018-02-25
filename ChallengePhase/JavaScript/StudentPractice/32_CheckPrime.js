/*
Write a function that takes a number as an argument and return true or false depending on if the number 
is prime number or not
returns true ===> if the number is prime
returns false ===> if the number is not prime

For Example

checkPrime(13); // true
checkPrime(4);  // false

*/

function checkPrime(num) {
    if (num > 1) {
      for (let i = 2; i < num; i++) {
        if (num % i === 0) {
          return false;
        }
      }
      return true;
    }
    else {
      return false;
    }
}