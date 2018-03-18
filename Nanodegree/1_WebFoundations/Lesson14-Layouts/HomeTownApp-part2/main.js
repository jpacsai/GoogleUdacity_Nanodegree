$(document).ready(function() {
    menu.addEventListener('click', function(e) {
        drawer.classList.toggle('open');
        e.stopPropagation();
      });
});