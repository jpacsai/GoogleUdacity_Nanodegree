let controller = {
    
    setAttendance() {
        model.attendance = JSON.parse(localStorage.attendance);
    },

    localStorage() {
        if (!localStorage.attendance) {
            console.log('Creating attendance records...');
            function getRandom() {
                return (Math.random() >= 0.5);
            }
    
            var nameColumns = $('tbody .name-col'),
                attendance = {};
    
            nameColumns.each(function() {
                var name = this.innerText;
                attendance[name] = [];
    
                for (var i = 0; i <= 11; i++) {
                    attendance[name].push(getRandom());
                }
            });
    
            localStorage.attendance = JSON.stringify(attendance);
        }
    },
    
    countMissing() {
        model.$allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    },

    update() {
        model.$allCheckboxes.on('click', function() {
            var studentRows = $('tbody .student'),
                newAttendance = {};
    
            studentRows.each(function() {
                var name = $(this).children('.name-col').text(),
                    $allCheckboxes = $(this).children('td').children('input');
    
                newAttendance[name] = [];
    
                $allCheckboxes.each(function() {
                    newAttendance[name].push($(this).prop('checked'));
                });
            });
    
            this.countMissing();
            localStorage.attendance = JSON.stringify(newAttendance);
        }.bind(this));
    }
}