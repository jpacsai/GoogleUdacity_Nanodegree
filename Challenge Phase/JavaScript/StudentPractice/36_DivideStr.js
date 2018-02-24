/*
Write a function takes a string as a first argument and returns an array of strings that represents 
splitting of the original string by a number(second argument), if one or more character is 
whitespace remove it

For example

divideString("hi there",2); // ["hi", "t", "he","re"]

divideString("i love solving problems too much",3); 
//["il", "ove", "so", "lvi", "ng", "pro", "ble", "ms","too","mu","ch"]

*/


// no method solution

function divideString(str,num) {
    let out = [];  // empty array to add slices of string later
    if (num < 1) {  // test if argument is less than 1
      return out;  // return an empty array in that case
    }
    let count = 0;  // declare a counter
    for (let i = 0; i < str.length; i+=num) {  // iterate through string
      let temp = "";  // empty variable to add slices to later, this is set back to empty in each loop
      while (count < i+num) {  // loop to add characters to temporary string, this will be the "slice"
        if (str[count] === undefined) { // if reached the end of string and character would be undefined, stop looping
          break;
        }
        temp += str[count];  // add characters to temporary string
        count++;
      }
      out.push(temp.replace(/\s/g,""));  // filter out spaces
    }
    return out;
  }