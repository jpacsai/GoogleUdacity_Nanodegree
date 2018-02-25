// Variables
var row;
var col;

var t = $("#pixel_canvas");
var trow = "<tr></tr>";
var tdetail = "<td class='canv'></td>";


// When size is submitted by the user, call makeGrid()
$("input[type=button]").click(function(){
    row = $("#input_height").val();
    col = $("#input_width").val();
    clearGrid();
    makeGrid(); 
});

// Removes previous grid to start over
function clearGrid() {
    t.find("tr","td").remove();
}

// Creates grid & paint function
function makeGrid() {
    for (var x = 1; x <= row; x++) {
        t.append(trow);
        for (var y = 1; y <= col; y++) {
            $("tr").last().append(tdetail);
        }
    }
    $("td").mousedown(function() {
        var color = $("#colorPicker").val();
        $(this).css("background-color", color);
      });
}
