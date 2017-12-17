// Select color input
//$(".color").

// Select size input
var row;
var col;
var t = $("#pixel_canvas");
var trow = $("<tr></tr>");
var tdetail = $("<td></td>");



// When size is submitted by the user, call makeGrid()

$("input[type=button]").click(function(){
    row = $("#input_height").val();
    col = $("#input_width").val();
    makeGrid(); 
});


function makeGrid() {
    for (var x = 1; x <= row; x++) {
        t.append("<tr></tr>");
        for (var y = 1; y <= col; y++) {
            $("tr").append("<td></td>");
        }
    }
}