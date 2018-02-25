/*
Write a function that takes an object with alphabetical letter or numerical keys as argument, 
the function should sort the keys but still every key should point to the same value after sorting

For example

sortOb({d:"John", t:"Mark", a:"Antony"}) // {a:"Antony",d:"John",t:"Mark"}
sortOb({3:"Go to work",1:"wake up", 2:"Breakfast"}) // {1:"Wake up", 2:"Breakfast",3:"Go to work"}

*/

function sortOb(obj) {
    // get object key values in a new array, sort them
    let keys = Object.keys(obj).sort();
    let newObj = {};  // blank object to add back key value pairs later
  
    // loop through key value array
    for (let i = 0, t = keys.length; i < t; i++) {
      // add key value pairs to blank object in the sorted order
      newObj[keys[i]] = obj[keys[i]];
    }
    return newObj;
}