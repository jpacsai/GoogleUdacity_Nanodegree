// Variables
var row;
var col;

var t = $("#pixel_canvas");
var trow = "<tr></tr>";
var tdetail = "<td class='canv'></td>";

var color = $("#colorPicker").val();


// When size is submitted by the user, call makeGrid()
$("input[type=button]").click(function(){
    row = $("#input_height").val();
    col = $("#input_width").val();
    clearGrid();
    makeGrid(); 
});

function clearGrid() {
    t.find("tr","td").remove();
}

function makeGrid() {
    for (var x = 1; x <= row; x++) {
        t.append(trow);
        for (var y = 1; y <= col; y++) {
            $("tr").last().append(tdetail);
        }
    }
}

// Get color value on change
$("#colorPicker").change(function() {
    color = $(this).val();
});

// Paint function
$(".canv").mousedown(function() {
    $( this ).css( "background-color", color );
  });
