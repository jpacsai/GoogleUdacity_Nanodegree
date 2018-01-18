/*
Write a function that takes a string as an argument and returns a string represents pairing of 
every letter of the original string with the second next letter in alphabetical system, 
if one letter in the original string is y or Y,z or Z , the letter that should be added 
would be a or A,b or B respectively

For example

secNextChar("aft"); // acfhtv
secNextChar("XyZ") // XZyaZB

*/

function secNextChar(s) {
    let newStr = "";
    for (let i = 0; i < s.length; i++) {
      let add;
      switch (s[i]) {
        case "y":
            add = "a";
            break;
        case "Y":
            add = "A";
            break;
        case "z":
            add = "b";
            break;
        case "Z":
            add = "B";
            break;
        default:
            add = String.fromCharCode(s.charCodeAt(i)+2);
      }
      newStr += s[i] + add;
    }
    return newStr;
}