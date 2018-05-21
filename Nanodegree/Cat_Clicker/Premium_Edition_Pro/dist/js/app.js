'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cats = [];

var catNames = [];

var activeCat = '';

var windowWidth = window.matchMedia('(min-width: 900px)');

var sideMenu = false;

var menu = void 0;
var container = void 0;
var main = void 0;

var adminMode = false;
document.addEventListener("DOMContentLoaded", function engine() {
    setVariables();

    media(windowWidth);
    windowWidth.addListener(media);

    instantiateCats();
    createList();
    catNameList();
    buttonListener();
    nameListener();
});

function setVariables() {
    container = document.querySelector('.container');
    menu = document.querySelector('.menu');
    main = document.querySelector('main');
}

// instantiate cat objects
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
    var guinness = new Cat('guinness', 'Guinness', 'images/cat7.jpg');
    var mici = new Cat('mici', 'Mici', 'images/cat8.jpg');
}

// creates cat nem list for menu
function catNameList() {
    catNames = Array.from(document.getElementsByClassName('cat-list-element'));
}

// add event listener to menu button
function buttonListener() {
    document.querySelector('.drop-btn').onclick = function () {
        buttonVisible();
    };
    document.querySelector('.admin-btn').onclick = function () {
        admin();
    };
}

// add event listener to each name in the list 
function nameListener() {
    for (var i in catNames) {
        catNames[i].onclick = function (event) {
            showCard();
            catSelector(event);
            listSelector(event);
            clickListener();
        };
    }
}

// add selected cat to html
function catSelector(event) {
    // find object of selected cat and set it as active cat
    activeCat = cats.find(function (x) {
        return x.name === event.target.textContent;
    });
    // clear container of previous cat
    clearHtml();
    // add selected cat to html
    renderCat();
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

// add event listener to cat's picture
function clickListener() {
    document.querySelector('.cat').onclick = function () {
        // increment click count
        activeCat.click++;
        // display click value
        displayClick();
    };
}

// create list of names from cat objects
function createList() {
    var d = document.createDocumentFragment();
    for (var c in cats) {
        var li = document.createElement('LI');
        li.classList.add('cat-list-element');
        li.textContent = cats[c].name;
        d.appendChild(li);
    }
    document.querySelector('.name-list').appendChild(d);
}

function showCard() {
    container.classList.remove('hidden');
}

// add active cat object to html
function renderCat() {
    var kittyContainer = document.createElement('SECTION');
    kittyContainer.id = activeCat.id;
    kittyContainer.classList.add('kittyContainer', activeCat.name);

    var kittyHeader = document.createElement('H3');
    kittyHeader.classList.add('instruction');
    //kittyHeader.setAttribute('style', 'white-space: pre;');
    kittyHeader.textContent = 'Click on ' + activeCat.name + '!';
    //kittyHeader.textContent += activeCat.name + '!';

    var catImage = document.createElement('IMG');
    catImage.classList.add('cat');
    catImage.src = activeCat.url;

    var counter = document.createElement('DIV');
    counter.classList.add('counter');
    counter.textContent = 'Clicks: ';

    var clickCounter = document.createElement('SPAN');
    clickCounter.classList.add('click-count');
    clickCounter.textContent = activeCat.click;

    counter.appendChild(clickCounter);

    kittyContainer.append(kittyHeader, catImage, counter);

    var parent = document.querySelector('.cat-container');
    parent.appendChild(kittyContainer);
};

// clear container of previous cat 
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
    // highlight name
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

function displayClick() {
    document.querySelector('.click-count').textContent = activeCat.click;
}

function buttonVisible() {
    document.querySelector('.cat-list').classList.toggle("cat-list-visible");
}

function admin() {
    document.querySelector('.admin-form').classList.toggle('hidden');
}

function media(windowWidth) {
    if (windowWidth.matches) {
        // If media query matches
        main.insertBefore(menu, container);
        sideMenu = true;
    } else {
        if (sideMenu = true) {
            main.insertBefore(menu, container);
            sideMenu = false;
        }
    }
}