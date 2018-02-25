/*
Write a function that takes two arrays of numbers as arguments and returns only one array 
represents all the numbers that are not common between the two arrays excluding the numbers 
that is divisible by any number that is common between the two arrays(> 1)

note, no repeated element in the final array and the elements should be in the same order 
in their original arrays
lets jump to examples

filter([1,2,3],[1,2,4]); // [3] as 4 is divisible by 2( the common number)
filter([1,6,2,5,5,8,3,7,8],[2,6,4,4,9,1]) // [5, 3, 7, 9]
the numbers that are not common between the two arrays are 5,5,8,3,7,8,4,4,9 but 8 and 4 
are divisible by 2 which is a common number so they are excluded and the result would be [5,3,7,9]

*/

function filter(arr1,arr2) {

    //copy arguments
    
    let arrCopy1 = arr1.slice();
    let arrCopy2 = arr2.slice();
  
    //find duplicates between two arrays
    
    let dupes = [];  
    for (let i = 0; i < arrCopy1.length; i++) {
      for (let j = 0; j < arrCopy2.length; j++) {
        if (arrCopy1[i] === arrCopy2[j]) {
          dupes.push(arrCopy1[i]);
          arrCopy1.splice(i,1);
          arrCopy2.splice(j,1);
          i--;
          j--;
          break;
        }
      }
    }
  
    //check if array elements are divisible by duplicates
    
    let arr = arrCopy1.concat(arrCopy2);
    for (let k = 0; k < arr.length; k++) {
      for (let m = 0; m < dupes.length; m++) {
        if (arr[k] % dupes[m] === 0 && dupes[m] > 1) {
          arr.splice(k,1);
          k--;
          break;
        }
      }
    }
    
    // remove any duplicates from final array
    
    let n = arr.length;
      while (n--) {
        if (arr.indexOf(arr[n]) != n) {
          arr.splice(n,1);
        }
      }
    return arr;
  }