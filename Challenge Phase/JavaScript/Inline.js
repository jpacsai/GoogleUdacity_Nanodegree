// Programming Quiz: Inline Functions (5-6)

/*
Call the emotions() function so that it prints the output you see below,
but instead of passing the laugh() function as an argument, pass 
an inline function expression instead.

*/

function emotions(myString, myFunc) {
    console.log("I am " + myString + ", " + myFunc(2));
}



emotions("happy", function laugh(num) {
    var laugh = "";
    for (var i = 1; i <= num; i++) {
        laugh += "ha";
    }
    return laugh + "!";
})