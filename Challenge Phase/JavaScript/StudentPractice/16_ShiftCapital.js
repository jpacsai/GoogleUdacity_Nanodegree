/*
Shift Capital
Write a function that takes two arguments, one represents a string that contains a capital letter 
that can be anywhere in the string , the second argument is a number represent number of 
shifts of the capital letter in the string when the function is called, if the index that 
the capital letter should be shifted to is not present , continue shifting from the beginning

For example

shiftCapital(Udacity,4) // daciUty
shiftCapital(leaRning,4) // Rleaning
shiftCapital(frienDs,6) // frienDs
shiftCapital(frienDs,3)  // frDiens

*/

function check(arr) {
    var middle = Math.floor(arr.length/2);
    return arr.slice(0,middle).join("") === arr.slice( - middle).sort().join("");
}