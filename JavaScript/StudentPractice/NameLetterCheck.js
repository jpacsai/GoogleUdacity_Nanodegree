/*
check if your name characters present in a given string

Write a function that takes a a string as an argument represents your name 
that checks if all your name characters presents in this string

 "hello all my great friends";
For example:

check("karl"); // false
check("sally"); // true

*/

function nameLetters(name,strng) {
    for (var i = 0; i < name.length; i++) {
      if (strng.search(name.charAt(i)) == -1) {
        return false;
      }
      else {
        strng = strng.replace(name.charAt(i)," ");
      }
    }
    return true;
  }
  
  
nameLetters("sally","hello all my great friends");