/*
Write a function that remove all repeated elements in array represents the argument of the function, 
the remaining elements should be in the same order as original one.

For example

removeCopies([5,8,4,8,3,2,1,5]); // [4,3,2,1]
removeCopies([1,6,"a",6,"b",7,8,"a",1]); // ["b",7,8]

*/

function removeCopies(arr) {
  var i = arr.length;
  var dupes = [];
  while (i--) {
      if (arr.indexOf(arr[i]) != i) {
        dupes.push(arr[i]);
      }
  }
  for (var j = 0; j < dupes.length; j++) {
    for (var k = 0; k < arr.length; k++) {
      if (dupes[j] === arr[k]) {
        arr.splice(k,1);
        k--;
      }
    }
  }
  return arr;
}