document.addEventListener("DOMContentLoaded", function(){
    class Cat {
        constructor (id, name, url) {
            this.id = id;
            this.name = name;
            this.url = url;
            this.click = 0;
            this.create();
        }

        create() {
            let kittyContainer = document.createElement('SECTION');
            kittyContainer.id = this.id;
            kittyContainer.classList.add('kittyContainer', this.name);

            let kittyHeader = document.createElement('H3');
            kittyHeader.classList.add('instruction');
            kittyHeader.setAttribute('style', 'white-space: pre;');
            kittyHeader.textContent = 'Click on\r\n';
            kittyHeader.textContent += this.name + '!';

            let catImage = document.createElement('IMG');
            catImage.classList.add('cat');
            catImage.src = this.url;

            let counter = document.createElement('DIV');
            counter.classList.add('counter');
            counter.textContent = 'Clicks: ';

            let clickCounter = document.createElement('SPAN');
            clickCounter.classList.add('click-count');
            clickCounter.textContent = this.click;

            counter.appendChild(clickCounter);

            kittyContainer.append(kittyHeader, catImage, counter);

            const parent = document.querySelector('.cat-container');
            parent.appendChild(kittyContainer);
        }

        clicker() {
            this.click++;
        }
    }

    let cecile = new Cat('cecile', 'Cecile', 'images/cat.jpg');
    let bertalan = new Cat('bertalan', 'Bertalan', 'images/cat2.jpg');

    let cats = Array.from(document.getElementsByClassName('cat'));

    for (let c in cats) {
        cats[c].onclick = function(event) {
            catClicked(event);
        };
    }

    function catClicked(event){
        let element = event.target.parentElement;
        let obj = eval(element.id);
        obj.clicker();
        element.lastChild.lastChild.textContent = obj.click;
        
    };

});