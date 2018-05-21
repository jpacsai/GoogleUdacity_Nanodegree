'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cats = [];

var catNames = [];

var activeCat = '';

var windowWidth = window.matchMedia('(min-width: 700px)');

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

function media(windowWidth) {
    if (windowWidth.matches) {
        // If media query matches
        document.body.insertBefore(menu, container);
        sideMenu = true;
    } else {
        if (sideMenu = true) {
            container.insertBefore(menu, main);
            sideMenu = false;
        }
    }
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
    if (adminMode === false) {
        var adminContainer = document.createElement('DIV');
        adminContainer.classList.add('admin-container');

        var adminForm = document.createElement('FORM');
        adminForm.classList.add('admin-form');

        var nameSpan = document.createElement('SPAN');
        nameSpan.classList.add('formSpan');
        nameSpan.textContent = 'Name';
        var inputName = document.createElement('INPUT');
        inputName.setAttribute("type", "text");
        inputName.setAttribute("name", "Cat name");
        var submitName = document.createElement('INPUT');
        submitName.setAttribute("submit", "submit");

        var urlSpan = document.createElement('SPAN');
        urlSpan.classList.add('formSpan');
        urlSpan.textContent = 'Url';
        var inputUrl = document.createElement('INPUT');
        inputUrl.setAttribute("type", "text");
        inputUrl.setAttribute("name", "Url");
        var submitUrl = document.createElement('INPUT');
        submitUrl.setAttribute("submit", "submit");

        var clickSpan = document.createElement('SPAN');
        clickSpan.classList.add('formSpan');
        clickSpan.textContent = 'Click';
        var inputClick = document.createElement('INPUT');
        inputClick.setAttribute("type", "text");
        inputClick.setAttribute("name", "Clicks");
        var submitClick = document.createElement('INPUT');
        submitClick.classList.add('submit-btn');
        submitClick.setAttribute("type", "submit");

        adminForm.append(nameSpan, inputName, urlSpan, inputUrl, clickSpan, inputClick, submitClick);
        adminContainer.append(adminForm);
        document.querySelector('.admin').appendChild(adminContainer);

        adminMode = true;
    }
}