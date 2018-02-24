/*
Orange containers

We have number of containers , every container contains a number of oranges, 
this number can be even or odd, the seller needs to populate the containers 
on the table but in a certain pattern, he needs to sort them from left to right 
in a ascending order but every two even number oranges containers should have 
one odd in between, odd containers also should be arranged in ascending pattern, 
if there are no more containers of one type, the seller would continue populating 
the containers of the type still present in ascending way till there are no more containers.

Write a function that populates the containers in ascending pattern depending 
on the number of oranges taking in consideration the type of this number even or odd.

for example, the final result can be like this

[0,3,12,7,22,13,28,17,42,53,50,54,72,76]

*/

function sortOranges(nums){
    var arr = nums.sort(function(a,b){return a-b;});
    var even = [];
    var odd = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] % 2) {
        odd.push(arr[i]);
      }
      else {
        even.push(arr[i]);
      }
    }
    var container = [];
    for (var j = 0; j < Math.max(even.length,odd.length); j++) {
      container.push(even[j],odd[j]);
    }
    return container.filter(function(n){return n !== undefined;});
  }