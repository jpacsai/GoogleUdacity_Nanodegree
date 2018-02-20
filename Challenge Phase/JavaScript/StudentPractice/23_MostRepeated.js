/*
Write a function that takes a string as an argument and returns the most repeated character in 
this string(just one), if most repeated characters are more than one(repeated by the same number) 
return null

For example

mostRepeated("hello")  // l

mostRepeated("Hi javaScript masters"); // a

mostRepeated("Udacity");  // null

*/



//performance experiment    --> slow :(

function mostRepeated(str){
    let s = str.slice().split(""); 
    let i = s.length;
    while (i--) {
      if (s.indexOf(s[i]) != i || s[i] == " ") {
          s.splice(i,1);
      }
    }
    let reps = [];
    let len = s.length;
    for (let j = 0; j < len; j++) {
      let counter = 0;
      for (let k = 0; k < str.length; k++) {
         if (s[j] === str[k]) {
           counter++;
         }
      }
      reps.push(counter);
    }
    let max = 0;
    for (let m = 0; m < len; m++) {
      if (reps[m] > max) {
        max = reps[m];
      }
    }
    let counter = 0;
    for (let n = 0; n < len; n++) {
      if (max === reps[n]) {
        counter++;
        if (counter > 1) {
          return null;
        }
      }
    }
    for (let p = 0; p < len; p++) {
      if (reps[p] === max) {
        return s[p];
      }
    }
  }