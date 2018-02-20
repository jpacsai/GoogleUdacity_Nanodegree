/*
write a function that takes two arguments,the first represents a flattened array and the second 
is a number

the function should covert the the array to a Two dimensional one, every array inside have a 
length equal to the number that passed as argument if there are still excess elements

For example

grouping([1,2,3,4,5,6],3);  // [[1,2,3],[4,5,6]]
grouping([6,8,10,15,4],2) //  [[6,8],[10,15],[4]]
grouping([12,8,15,20,38,40,60],7) // [[12,8,15,20,38,40,60]]
grouping([1,2],4)   // [[1,2]]

*/

function grouping(arr, size) {
    var item = Math.ceil(arr.length / size);
    var newArr = [];
    var counter = 0;
    for (var i = 0; i < item; i++) {
      newArr.push([]);
      for (var j = 0; j < size; j++) {
        newArr[i].push(arr[counter]);
        counter++;
        if (counter === arr.length) {
          return newArr;
        }
      }
    }
}


// shorter but slower version

function grouping(arr, size) {
    const item = Math.ceil(arr.length / size),
    newArr = [];
    for (let i = 0; i < item; i++) {
      newArr.push(arr.slice(i * size, (i + 1) * size));
    }
    return newArr;
}