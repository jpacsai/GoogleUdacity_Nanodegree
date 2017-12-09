// Programming Quiz: Laugh it Off 2 (5-2)

/*
Write a function called laugh() that takes one parameter, 
num that represents the number of "ha"s to return.

- make sure your the final character is an exclamation mark ("!")

*/

function laugh(num) {
    var laugh = "";
    for (var i = 1; i <= num; i++) {
        laugh += "ha";
    }
    return laugh + "!";
}

console.log(laugh(5));