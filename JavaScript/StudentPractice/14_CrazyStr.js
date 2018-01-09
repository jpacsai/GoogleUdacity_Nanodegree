/*
Crazy String
Write a function that takes a string as an argument and returns another string exactly like the examples below

strManip("abcd")    // AbAc-BcBd-CdC-DD
strManip("hello")  // HeHl-ElEl-LlLo-LoL-OO
strManip("hi")    // HiH-II
strManip("A")    // AA
strManip("cAt") // CaCt-AtA-TT

*/

function strManip(str) {
    var newStr = str.split("");
    var result = [];
    for (var i = 0; i < str.length; i++) {
        result.push(newStr[i].toUpperCase(),newStr[i+1],newStr[i].toUpperCase(),newStr[i+2],"-");		
    }
    return result.filter(function(n){return n !== undefined;}).join("").slice(0,-1);
}

