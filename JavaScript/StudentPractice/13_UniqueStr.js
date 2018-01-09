function uniqueStr(...str) {
    var newStr = str.join("").split("");
    console.log(newStr);
    for (var i = 0; i < newStr.length-1; i++ ) {
      for (var j = 1; j < newStr.length; j++) {
        console.log(newStr[i] + " " + newStr[j]);
        if (newStr[i] === newStr[j]) {
         console.log(newStr[i] + " = " + newStr[j] ); 
        }
      }
      j++;
    }
    //nsole.log(newStr);
  }
  
  uniqueStr("abcd","ahkd");