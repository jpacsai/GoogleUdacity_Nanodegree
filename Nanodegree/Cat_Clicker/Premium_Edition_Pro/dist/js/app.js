'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var model = {
    windowWidth: window.matchMedia('(min-width: 900px)'),
    sideMenu: false,
    cats: [],
    catNames: [],
    activeCat: '',
    main: '',
    container: '',
    menu: ''
};
document.addEventListener("DOMContentLoaded", function engine() {
    setVariables();

    media();
    model.windowWidth.addListener(media);

    instantiateCats();
    createList();
    catNameList();
    listener();
});

// get variable values from DOM
function setVariables() {
    model.container = document.querySelector('.container');
    model.menu = document.querySelector('.menu');
    model.main = document.querySelector('main');
}

// instantiate cat objects
function instantiateCats() {
    var Cat = function Cat(id, name, url) {
        _classCallCheck(this, Cat);

        this.id = id;
        this.name = name;
        this.url = url;
        this.click = 0;
        model.cats.push(this);
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

// create cat name list for menu
function catNameList() {
    model.catNames = Array.from(document.getElementsByClassName('cat-list-element'));
}

// event listeners to buttons
function listener() {
    // menu button
    document.querySelector('.drop-btn').onclick = function () {
        buttonVisible();
    };
    // admin button
    document.querySelector('.admin-btn').onclick = function () {
        admin(); // hide/unhide admin form
        updateAdmin(); // update active cat's property values
    };
    // submit button
    document.querySelector('#submit').onclick = function (e) {
        e.preventDefault();
        if (model.activeCat !== '') {
            checkForm(); // check for empty fields in admin form
            submit(); // update active cat object values
            renderCat(); // add selected cat to html
            listFresh(); // update cat name in menu list
            clickListener();
        }
    };

    // name list in the menu
    for (var i in model.catNames) {
        model.catNames[i].onclick = function (event) {
            showCard(); // unhide card if hidden
            catSelector(event); // add selected cat to html 
            listSelector(event); // style list when clicked
            clickListener(); // add event listener to active cat's picture
            updateAdmin(); // update active cat's property values if changed by admin form
        };
    }
}

// add selected cat to html
function catSelector(event) {
    // find the object of the selected cat and set it as active cat
    model.activeCat = model.cats.find(function (x) {
        return x.name === event.target.textContent;
    });
    renderCat(); // add selected cat to html
}

// style list when clicked
function listSelector(event) {
    highlightList(event); // highlight selected cat's name in dropdown list
    setName(event); // set selected cat's name in header
    hideList(); // hide drop-down list after selection (in mobile view)
}

// add event listener to cat's picture
function clickListener() {
    document.querySelector('.cat').onclick = function () {
        model.activeCat.click++; // increment click count
        displayClick(); // update click value on screen
        clickFresh(); // update click value in admin form
    };
}

// update active cat object values
function submit() {
    model.activeCat.name = document.getElementById('name').value;
    model.activeCat.url = document.getElementById('url').value;
    model.activeCat.click = document.getElementById('click').value;
}
// create list of names from cat objects
function createList() {
    var d = document.createDocumentFragment();
    for (var c in model.cats) {
        var li = document.createElement('LI');
        li.classList.add('cat-list-element');
        li.textContent = model.cats[c].name;
        d.appendChild(li);
    }
    document.querySelector('.name-list').appendChild(d);
}

// remove hidden class from container
function showCard() {
    model.container.classList.remove('hidden');
}

// add active cat object to html
function renderCat() {
    // clear container of previous cat
    document.querySelector('.cat-container').innerHTML = '';

    var kittyContainer = document.createElement('SECTION');
    kittyContainer.id = model.activeCat.id;
    kittyContainer.classList.add('kittyContainer', model.activeCat.name);

    var kittyHeader = document.createElement('H3');
    kittyHeader.classList.add('instruction');
    kittyHeader.textContent = 'Click on ' + model.activeCat.name + '!';

    var catImage = document.createElement('IMG');
    catImage.classList.add('cat');
    catImage.src = model.activeCat.url;

    var counter = document.createElement('DIV');
    counter.classList.add('counter');
    counter.textContent = 'Clicks: ';

    var clickCounter = document.createElement('SPAN');
    clickCounter.classList.add('click-count');
    clickCounter.textContent = model.activeCat.click;

    counter.appendChild(clickCounter);

    kittyContainer.append(kittyHeader, catImage, counter);

    var parent = document.querySelector('.cat-container');
    parent.appendChild(kittyContainer);
};

// highlight selected cat's name in dropdown list
function highlightList(event) {
    // remove previous highlight
    for (var c in model.catNames) {
        if (model.catNames[c].classList.contains('selected-cat') === true) {
            model.catNames[c].classList.remove('selected-cat');
        }
    };
    event.target.classList.add('selected-cat'); // highlight name
}

// set selected cat's name in header
function setName(event) {
    document.querySelector('.cat-select').textContent = event.target.textContent;
}

// hide drop-down list after selection
function hideList() {
    document.querySelector('.cat-list').classList.remove('cat-list-visible');
}

// update click value on screen
function displayClick() {
    document.querySelector('.click-count').textContent = model.activeCat.click;
}

// hide/unhide catlist
function buttonVisible() {
    document.querySelector('.cat-list').classList.toggle("cat-list-visible");
}

// hide/unhide admin form
function admin() {
    document.querySelector('.admin-form').classList.toggle('hidden');
}

// watching window width
function media() {
    if (model.windowWidth.matches) {
        // If media query matches 
        // move menu on the side
        model.main.insertBefore(model.menu, model.container);
        model.sideMenu = true;
    } else {
        // move menu back if not
        if (model.sideMenu = true) {
            model.main.insertBefore(model.menu, model.container);
            model.sideMenu = false;
        }
    }
}

// update active cat's property values if changed by admin form
function updateAdmin() {
    if (model.activeCat !== "") {
        document.getElementById('name').value = model.activeCat.name;
        document.getElementById('url').value = model.activeCat.url;
        clickFresh();
    }
}

function clickFresh() {
    document.getElementById('click').value = model.activeCat.click;
}

// update cat name in menu list if changed by admin form
function listFresh() {
    document.querySelector('.cat-select').textContent = model.activeCat.name;
    document.querySelector('.selected-cat').textContent = model.activeCat.name;
}

// check for empty fields in admin form
// if the input field is empty fill it back with active cat's relevant property value
function checkForm() {
    if (document.getElementById('name').value === '') {
        document.getElementById('name').value = model.activeCat.name;
    }
    if (document.getElementById('url').value === '') {
        document.getElementById('url').value = model.activeCat.url;
    }
    if (document.getElementById('click').value === '') {
        document.getElementById('click').value = model.activeCat.click;
    }
}