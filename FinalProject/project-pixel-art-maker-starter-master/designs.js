// Select color input


// Select size input
var row;
var col;
var color;
var t = $("#pixel_canvas");
var trow = $("<tr></tr>");
var tdetail = $("<td></td>");
var color = document.getElementById("colorPicker");
var currentVal = color.value;

// When size is submitted by the user, call makeGrid()

$("input[type=button]").click(function(){
    row = $("#input_height").val();
    col = $("#input_width").val();
    clearGrid();
    makeGrid(); 
    alert(currentVal);
});



function makeGrid() {
    for (var x = 1; x <= row; x++) {
        t.append("<tr></tr>");
        for (var y = 1; y <= col; y++) {
            $("tr").last().append("<td></td>");
        }
    }
}

function clearGrid() {
    t.find("tr","td").remove();
}