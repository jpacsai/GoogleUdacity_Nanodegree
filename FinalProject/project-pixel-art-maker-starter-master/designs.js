// Select color input
//$(".color").

// Select size input
var row;
var col;
var t = $("table");
var r = $("tr");
var trow = $("<tr></tr>");
var tdetail = $("<td></td>");

// When size is submitted by the user, call makeGrid()

$("input[type=submit]").click(function(){
    row = $("#input_height").val();
    col = $("#input_width").val();
    makeGrid(row);
    
});

var appTr = $("#pixel_canvas").append("<tr></tr>");;
var appTdt = $("tr").each(append("<tr></tr>"));

function makeGrid(row) {
    for (var rowt = 1; t <= rowt; t++) {
        for (var tdt = 1; tdt <= col; tdt++) {
            
        }
    }
    alert("you");
}
