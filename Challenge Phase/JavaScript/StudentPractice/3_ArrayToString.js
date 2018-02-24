/*
Write a function that takes an array as a parameter and return string that represents two words, 
one represent evey first character in every word in array and the second represent 
every last characters in array words concatenated together with is in between

For example

[“Umbrella”,“drum”, “aka”, “cartz”, “ini”, “toon”, “young”];

Output: Udacity is amazing.

*/

function stringCreator(arr) {
    var firstWord = "";
    var secondWord = "";
    for (var i = 0; i < arr.length; i++) {
      firstWord = firstWord.concat(arr[i].charAt(0));
      secondWord = secondWord.concat(arr[i].charAt(arr[i].length-1));
    }
    return firstWord + " is " + secondWord;
}