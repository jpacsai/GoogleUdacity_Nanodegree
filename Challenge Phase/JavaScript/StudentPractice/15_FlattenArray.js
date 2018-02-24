/*
Write a function that takes an array of any level of nesting , 
the function return an array represents the original array but the flattened version of it.

For example

flatten([1,5,6,[2,5,[10,12,15,[]],3,8],6,7); // [1,5,6,2,5,10,12,15,3,8,6,7]

*/


// numbers only
function flatten(arr){ 
    return arr.toString().replace(/,/g," ").replace(/\s\s/g," ").split(" ").map(function(a){return Number(a);});
  }
  
  
  console.log(flatten([1,5,6,[2,5,[10,12,[]],3,8],6,7]));