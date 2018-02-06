/*
Write a function that can take two or more strings as arguments and returns a string represent 
them all , all characters should be in same order in the original string but no duplication 
in the returned string

For example

uniqueStr("abcd","ahkd") // abcdhk
uniqueStr("rbanr","fzyrc") // rbanfzyc
uniqueStr("every","day","a problem") // evrydapoblm

*/

function uniqueStr(...str) {
    var newStr = str.join("").split("");
    console.log(newStr);
    for (var i = 0; i < newStr.length-1; i++ ) {
      for (var j = 1; j < newStr.length; j++) {
        console.log(newStr[i] + " " + newStr[j]);
        if (newStr[i] === newStr[j]) {
         console.log(newStr[i] + " = " + newStr[j] ); 
        }
      }
      j++;
    }
    //nsole.log(newStr);
  }
  
  uniqueStr("abcd","ahkd");