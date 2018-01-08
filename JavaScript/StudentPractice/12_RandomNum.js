/*
A big random number
Write a function that takes an array of two elements (numbers < 10) as argument, 
and returns a number composed of all the numbers between the two numbers with 
minimum and maximum numbers inclusives randomly every time you call the function, 
numbers that composes our returned number should be different( no repeated numbers) 
and number of these numbers should be the same with the numbers in all range between 
the maximum and minimum number in array, with minimum and maximum inclusive, 
the array is not sorted so no strict places for maximum or minimum number in it

Example

randomNum([1,5]);  // 45132
randomNum([5,1]);  // 31452
randomNum([0,9]);  // 7429850136
randomNum([0,9]);  // 5682910347

*/

function randomNum(range) {
    var newRange = range.sort();
    var arr = [];
    while (newRange[0] <= newRange[1]) {
      arr.push(newRange[0]++);
    }
    if (range[0] === 0) {arr.shift();}
    var length = arr.length;
    var random = [];
    for (var i = 1; i <= length; i++) {
      var num = arr[Math.floor(Math.random() * (arr.length))];
      arr.splice(arr.indexOf(num),1);
      random.push(num);
    }
    if (range[0] === 0) {random.splice(Math.floor(Math.random() * (length-1)) + 1,0,0);}
    return Number(random.join(""));
}