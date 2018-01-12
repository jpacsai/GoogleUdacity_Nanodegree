function removeCopies(arr) {
    var i = arr.length;
    var dupes = [];
    while (i--) {
      if (arr.indexOf(arr[i]) != i) {
        dupes.push(arr[i]);
      }
    }
  var newArr = arr.filter(function(value){return value != arr[i];});
  console.log(newArr);  
  return arr;
}



removeCopies([1,6,"a",6,"b",7,8,"a",1]);