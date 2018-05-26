document.addEventListener("DOMContentLoaded", function engine(){
    controller.localStorage();
    controller.setAttendance();
    view.check();
    controller.update();
    controller.countMissing();
});