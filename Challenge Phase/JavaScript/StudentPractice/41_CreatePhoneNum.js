/*
Write a function that takes an array of numbers (integers) from 0-9 and returns a string 
of those numbers in the form of a random phone number in every call , 
the results are imaginary phone numbers (keys, number)

For example

createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])//  "(123) 456-0887"
createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])// "(432) 544-7219"

*/

function createPhoneNumber(arr) {
    let num = [];
    for (let i = 0; i < arr.length; i++) {
      num[i] = Math.floor(Math.random() * 10);
    }
    return ("(" + num[0] + num[1] + num[2] + ")" + " " + num[3] + num[4] + num[5] + "-" + num[6] + num[7] + num[8] + num[9]);
}