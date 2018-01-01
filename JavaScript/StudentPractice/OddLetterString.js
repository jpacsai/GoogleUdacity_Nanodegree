/*
Concatenating mid characters in array of words

Write a function that takes an array of words as an argument and returns a string represents every middle characters 
in odd number letters words


For example:

midChars(["Happy","New","Year","All","Friends"]); // pele

*/

function oddLetterString(words) {
    oddWord = "";
    for (i = 0; i < words.length; i++) {
      if (words[i].length % 2 !== 0) {
        oddWord += words[i].charAt(Math.floor(words[i].length/2));
      }
    }
    return oddWord;
  }