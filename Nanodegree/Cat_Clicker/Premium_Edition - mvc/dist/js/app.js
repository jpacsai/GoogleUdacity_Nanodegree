'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cats = [];

var catNames = [];

var activeCat = '';
function create() {
    var kittyContainer = document.createElement('SECTION');
    kittyContainer.id = this.id;
    kittyContainer.classList.add('kittyContainer', this.name);

    var kittyHeader = document.createElement('H3');
    kittyHeader.classList.add('instruction');
    kittyHeader.setAttribute('style', 'white-space: pre;');
    kittyHeader.textContent = 'Click on\r\n';
    kittyHeader.textContent += this.name + '!';

    var catImage = document.createElement('IMG');
    catImage.classList.add('cat');
    catImage.src = this.url;

    var counter = document.createElement('DIV');
    counter.classList.add('counter');
    counter.textContent = 'Clicks: ';

    var clickCounter = document.createElement('SPAN');
    clickCounter.classList.add('click-count');
    clickCounter.textContent = this.click;

    counter.appendChild(clickCounter);

    kittyContainer.append(kittyHeader, catImage, counter);

    var parent = document.querySelector('.cat-container');
    parent.appendChild(kittyContainer);
};

// create list of names from cat objects
function createList(cats) {
    var d = document.createDocumentFragment();
    for (var c in cats) {
        var li = document.createElement('LI');
        li.classList.add('cat-list-element');
        li.textContent = cats[c].name;
        d.appendChild(li);
    }
    document.querySelector('.name-list').appendChild(d);
}

function clearHtml() {
    document.querySelector('.cat-container').innerHTML = '';
}

// highlight selected cat's name in dropdown list
function highlightList(event) {
    // remove previous highlight
    for (var c in catNames) {
        if (catNames[c].classList.contains('selected-cat') === true) {
            catNames[c].classList.remove('selected-cat');
        }
    };
    // highligth name
    event.target.classList.add('selected-cat');
}

// set selected cat's name in header
function setName(event) {
    document.querySelector('.cat-select').textContent = event.target.textContent;
}

// hide drop-down list after selection
function hideList() {
    document.querySelector('.cat-list').classList.remove('cat-list-visible');
}

function displayClick(event) {
    event.target.parentNode.lastChild.lastChild.textContent = obj.click;
}
function instantiateCats() {
    var Cat = function Cat(id, name, url) {
        _classCallCheck(this, Cat);

        this.id = id;
        this.name = name;
        this.url = url;
        this.click = 0;
        cats.push(this);
    };

    var cecile = new Cat('cecile', 'Cecile', 'images/cat1.jpg');
    var bertalan = new Cat('bertalan', 'Bertalan', 'images/cat2.jpg');
    var liuka = new Cat('liuka', 'Liuka', 'images/cat3.jpg');
    var mirtill = new Cat('mirtill', 'Mirtill', 'images/cat4.jpg');
    var misi = new Cat('misi', 'Misi', 'images/cat5.jpg');
    var johnny = new Cat('johnny', 'Johnny', 'images/cat6.jpg');
    var bella = new Cat('bella', 'Bella', 'images/cat7.jpg');
    var mici = new Cat('mici', 'Mici', 'images/cat8.jpg');
}

// add event listener for each name in the list  
for (var i in catNames) {
    catNames[i].onclick = function (event) {
        catSelector(event, cats);
        listSelector(event);
    };
}

// add selected cat to html
function catSelector(event, cats) {
    // find object of selected cat and set it as active cat
    activeCat = cats.find(function (x) {
        return x.name === event.target.textContent;
    });
    // clear container of previous cat
    clearHtml();
    // add selected cat to html
    activeCat.create();
}

function createNameList() {
    catNames = Array.from(document.getElementsByClassName('cat-list-element'));
}

// style list when clicked
function listSelector(event) {
    // highlight selected cat's name in dropdown list
    highlightList(event);
    // set selected cat's name in header
    setName(event);
    // hide drop-down list after selection
    hideList();
}

// add event listener for cat's picture
document.querySelector('.cat').onclick = function (event) {
    // increment click count
    activeCat.click++;
    // display click value
    displayClick(event);
};