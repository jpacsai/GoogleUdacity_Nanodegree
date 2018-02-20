/*
Write a function that takes two arrays of alphabetical letters as arguments 
(the letters are small or capital not both) and returns an array represents all 
letters in both arrays but sorted alphabetically from a-z or A-Z, the two arrays are already sorted, 
no need to sort them

Note:do not use sort() method!

For example:

sort(["a","d","x","z"],["b","g","j","s","t"]);  // ["a", "b", "d", "g", "j", "s", "t", "x", "z"]
sort(["A","X","Y","Z",],["B","F","G","Y","Z"]); //  ["A", "B", "F", "G", "X", "Y", "Y", "Z", "Z"]

*/

function sort(arrA, arrB) {
    let result = [];  // array to add letters to later
    let a = 0;  // variable to follow index of arrayA
    let b = 0;  // variable to follow index of arrayB
    for (let i = 0, t = arrA.length +arrB.length; i < t; i++) {  // iterate through both arrays
      if (arrA[a] <= arrB[b]) {  // if elements are equal or B is larger
        result.push(arrA[a]);  // add A to result array
        a++;
      }
      else if (arrA[a] > arrB[b]) { // if A is larger than B
        result.push(arrB[b]);  // add B
        b++;
      }
      else if (b === arrB.length && a < arrA.length) {  // if B has reached the end of arrayB and A is not yet
        result.push(arrA[a]);  // add A
        a++;
      }
      else if (a === arrA.length && b < arrB.length) {  // if A has reached the end of arrayA and B is not yet
        result.push(arrB[b]);  // add B
        b++;
      }
    }
    return result;
  }
