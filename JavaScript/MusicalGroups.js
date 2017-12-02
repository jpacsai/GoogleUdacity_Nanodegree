// Programming Quiz: Musical Groups (3-3)

/* 
Write a series of conditional statements that:

prints "not a group" if musicians is less than or equal to 0
prints "solo" if musicians is equal to 1
prints "duet" if musicians is equal to 2
prints "trio" if musicians is equal to 3
prints "quartet" if musicians is equal to 4
prints "this is a large group" if musicians is greater than 4

*/

// change the value of `musicians` to test your conditional statements

var musicians = 0;

if (musicians == 1) {
    console.log("solo");
} else if (musicians == 2) {
    console.log("duet");
} else if (musicians == 3) {
    console.log("trio");
} else if (musicians == 4) {
    console.log("quartet");
} else if (musicians > 4) {
    console.log("this is a large group");
} else {
    console.log("not a group");
}

