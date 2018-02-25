// Programming Quiz: Build A Triangle (5-3)

/*
Create a function called buildTriangle() that will accept an input 
(the triangle at its widest width) and will return the string representation of a triangle.

- creates a line of * for a given length

*/

function makeLine(length) {
    var line = "";
    for (var j = 1; j <= length; j++) {
        line += "* ";
    }
    return line + "\n";
}

function buildTriangle(max) {
	var triangle = ""
    for (var length = 1; length <= max ; length ++) {
        triangle += makeLine(length);
    }
return triangle;
}