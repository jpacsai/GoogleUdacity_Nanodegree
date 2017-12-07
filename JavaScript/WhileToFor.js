// Programming Quiz: Changing the Loop (4-4)

/*
Rewrite the following while loop as a for loop:

var x = 9;
while (x >= 1) {
  console.log("hello " + x);
  x = x - 1;
}

*/

for (var x = 9; x >= 1; x = x - 1) {
    console.log("hello " + x);
}