function clock(){
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
  
    if (hours <= 9) {
      hours = '0' + hours;
    }
    if (minutes <= 9) {
      minutes = '0' + minutes;
    }
  
    var clockFace = hours + ':' + minutes;
    
    document.getElementById('time').innerHTML = clockFace;
    
    setTimeout(function() {
    clock();
  }, 1000);
    
}
  
clock();