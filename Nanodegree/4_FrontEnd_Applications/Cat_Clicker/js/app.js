document.addEventListener("DOMContentLoaded", function(){
    let clickCount = 0;
    const cat = document.querySelector('.cat');
    const countDisplay = document.querySelector('.click-count');
    cat.onclick = function(){
        clickCount++;
        console.log(clickCount);
        countDisplay.textContent = clickCount;
    };
});