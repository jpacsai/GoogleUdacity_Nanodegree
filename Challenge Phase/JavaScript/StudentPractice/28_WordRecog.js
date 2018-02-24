/*
Write a function that takes two arguments the first is an array of words and the second is a word and 
returns array of words containing all words that includes all letters of the second argument in the 
same order of letters, your program should be able recognize the word in a mess of letters

For example

wordRecog(["true","trea","track","utre"],"true") //["true"]
wordRecog(["drows","words","wtorssds","downward"],"word")// ["words","wtorssds"]

*/

function wordRecog(arr, word) {
    let res = [];
    const len = word.length;
    // iterate through array words
    for (let i = 0; i < arr.length; i++) {
      // variable to follow index number in array word
      let k = 0;
      // iterate through characters of argument word
      for (let j = 0; j < len; j++) {
        // iterate through array's word characters
        while (k < arr[i].length) {
          // check if array word character matches argument word's character
          if (arr[i][k] === word[j]) {
            // if it's the last character of the argument word
            if (j === len-1) {
              res.push(arr[i]);
              break;
            }
            else {
              k++;
              break;
            }
          }
          else {
            k++;
          }
        }
      }
    }
    return res;
}
  