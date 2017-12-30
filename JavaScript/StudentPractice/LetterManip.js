/*
Write a function that takes a string as an argument and return another string exactly as examples below.

letterManip("abcd");    // "A-Bb-Ccc-Dddd"
letterManip("HeLlo"); // "H-Ee-Lll-Llll-Ooooo"
letterManip("chAt");    // "C-Hh-Aaa-Tttt"

*/

function letterManip(letters) {
  var arr = letters.toLowerCase().split("");
  var newArr = [];
    for (var i = 0; i < letters.length; i++) {
      var letter = arr[i].repeat(i+1);
      newArr = newArr.concat(letter.charAt(0).toUpperCase() + letter.slice(1));
    }
  return newArr.join("-");
}