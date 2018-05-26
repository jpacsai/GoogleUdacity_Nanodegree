document.addEventListener("DOMContentLoaded", function engine(){
    /* Create an initial
    * attendance record if one is not found
    * within localStorage.
    */
    controller.localStorage();
    controller.setAttendance();
    view.check();
    controller.update();
    controller.countMissing();
});