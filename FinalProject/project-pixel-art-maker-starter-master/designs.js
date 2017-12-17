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

$("input[type=button]").click(function(){
    row = $("#input_height").val();
    col = $("#input_width").val();
    makeGrid(row); 
});

function makeGrid(row) {
    for (var rowt = 1; t <= rowt; t++) {
        for (var tdt = 1; tdt <= col; tdt++) {
            t.append()
        }
    }
    
    
}
