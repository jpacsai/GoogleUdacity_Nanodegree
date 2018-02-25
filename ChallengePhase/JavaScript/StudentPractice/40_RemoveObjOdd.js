/*
Write a function that takes an object with array of numbers values as argument, 
the function should remove all odd numbers if existed in any array

removeOdd({a:[1,2,-5,7],b:[3,-7,2,10],c:[6,4,4,2],d:[1,17,21,1,0]})
// {a:[2],b:[2,10],c:[6,4,4,2],d:[0]}

*/

function removeOdd(obj) {
    let i;
    for (i in obj) {  // loop through object keys 
      for (let j = 0; j < obj[i].length; j++) {    // loop through values
        if (obj[i][j] % 2) {   // if element is odd, remove
          obj[i].splice(j,1);
          j--;
        }
      }
    }
    return obj;
}