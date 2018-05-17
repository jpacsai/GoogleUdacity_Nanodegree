document.addEventListener("DOMContentLoaded", function(){
    // cat class
    class Cat {
        constructor (id, name, url) {
            this.id = id;
            this.name = name;
            this.url = url;
            this.click = 0;
        }

        // add cat to html
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
        
        // increment click counter
        clicker(event) {
            this.click++;
        }
    }

    // instantiate cats
    (function instantiateCats() {
        let cecile = new Cat('cecile', 'Cecile', 'images/cat1.jpg');
        let bertalan = new Cat('bertalan', 'Bertalan', 'images/cat2.jpg');
        let liuka = new Cat('liuka', 'Liuka', 'images/cat3.jpg');
        let mirtill = new Cat('mirtill', 'Mirtill', 'images/cat4.jpg');
        let misi = new Cat('misi', 'Misi', 'images/cat5.jpg');
        let johnny = new Cat('johnny', 'Johnny', 'images/cat6.jpg');
        let bella = new Cat('bella', 'Bella', 'images/cat7.jpg');
        let mici = new Cat('mici', 'Mici', 'images/cat8.jpg');

        let cats = [cecile, bertalan, liuka, mirtill, misi, johnny, bella, mici];

        // create list of names from cat objects
        createList(cats);

        let catNames = Array.from(document.getElementsByClassName('cat-list-element'));
        
        // add event listener for each name in the list
        for (let i in catNames) {
            catNames[i].onclick = function(event) {
                catSelector(event, cats);
            };
        }
    })();
    
    // add list of cat names to html
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

    // add selected cat to html
    function catSelector(event, cats) {
        // clear container of previous cat
        document.querySelector('.cat-container').innerHTML = '';
        // set instruction text with selected cat's name
        let element = event.target.textContent;
        // find object of selected cat
        let obj = cats.find(x => x.name === element);
        // add selected cat to html
        obj.create();

        // highlight selected cat's name in dropdown list
        let all = Array.from(document.getElementsByClassName('cat-list-element'));
        // remove previous highlight
        for (let a in all) {
            if (all[a].classList.contains('selected-cat') === true) {
                all[a].classList.remove('selected-cat');
            }
        };
        // highligth name
        event.target.classList.add('selected-cat');

        // set selected cat's name in header
        document.querySelector('.cat-select').textContent = event.target.textContent;

        // hide drop-down list after selection
        document.querySelector('.cat-list').classList.remove('cat-list-visible'); 

        // add event listener for cat's picture
        document.querySelector('.cat').onclick = function(event) {
            // increment click count
            obj.clicker();
            // display click value
            event.target.parentNode.lastChild.lastChild.textContent = obj.click;
        };
    }

    // toggle visibilty of drop down list
    document.querySelector('.drop-btn').onclick = function() {
        document.querySelector('.cat-list').classList.toggle("cat-list-visible");
    };
});