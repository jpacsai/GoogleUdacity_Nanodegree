'use strict';

document.addEventListener("DOMContentLoaded", function () {
    var clickCount = 0;
    var cat = document.querySelector('.cat');
    var countDisplay = document.querySelector('.click-count');
    cat.onclick = function () {
        clickCount++;
        console.log(clickCount);
        countDisplay.textContent = clickCount;
    };
});