document.addEventListener("DOMContentLoaded", function(){

    class Cat {
        constructor (id, name, url) {
            this.id = id;
            this.name = name;
            this.url = url;
            this.click = 0;
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
        };
        
        clicker(event) {
            this.click++;
        }
    }

    (function instantiateCats() {
        let cecile = new Cat('cecile', 'Cecile', 'images/cat1.jpg');
        let bertalan = new Cat('bertalan', 'Bertalan', 'images/cat2.jpg');
        let cats = [cecile, bertalan];

        createList(cats);

        let catNames = Array.from(document.getElementsByClassName('cat-list-element'));
        
        for (let i in catNames) {
            catNames[i].onclick = function(event) {
                catSelector(event, cats);
            };
        }
    })();
    
    function createList(cats) {
        var d = document.createDocumentFragment();
        for (let c in cats) {
            let li = document.createElement('LI');
            li.classList.add('cat-list-element');
            li.textContent = cats[c].name;
            d.appendChild(li);
        }
        document.querySelector('.name-list').appendChild(d);
    }

    function catSelector(event, cats) {
        document.querySelector('.cat-container').innerHTML = '';
        let element = event.target.textContent;
        let obj = cats.find(x => x.name === element);
        obj.create();
        
        document.querySelector('.cat').onclick = function(event) {
            obj.clicker();
            event.target.parentNode.lastChild.lastChild.textContent = obj.click;
        };
    }
});