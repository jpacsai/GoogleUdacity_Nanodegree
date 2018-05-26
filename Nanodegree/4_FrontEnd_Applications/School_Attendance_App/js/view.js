let view = {
    
    // Check boxes, based on attendace records
    check() {
        $.each(model.attendance, function(name, days) {
            var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
                dayChecks = $(studentRow).children('.attend-col').children('input');
    
            dayChecks.each(function(i) {
                $(this).prop('checked', days[i]);
            });
        });
    }
}