let cats = [];

let catNames = [];

let activeCat = '';

let windowWidth = window.matchMedia('(min-width: 900px)');

let sideMenu = false;

let menu;
let container;
let main;

let adminMode = false;

const formFields = ['name', 'url', 'click'];
document.addEventListener("DOMContentLoaded", function engine(){
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
    class Cat {
        constructor (id, name, url) {
            this.id = id;
            this.name = name;
            this.url = url;
            this.click = 0;
            cats.push(this);
        }
    }

    let cecile = new Cat('cecile', 'Cecile', 'images/cat1.jpg');
    let bertalan = new Cat('bertalan', 'Bertalan', 'images/cat2.jpg');
    let liuka = new Cat('liuka', 'Liuka', 'images/cat3.jpg');
    let mirtill = new Cat('mirtill', 'Mirtill', 'images/cat4.jpg');
    let misi = new Cat('misi', 'Misi', 'images/cat5.jpg');
    let johnny = new Cat('johnny', 'Johnny', 'images/cat6.jpg');
    let guinness = new Cat('guinness', 'Guinness', 'images/cat7.jpg');
    let mici = new Cat('mici', 'Mici', 'images/cat8.jpg');
}

// creates cat nem list for menu
function catNameList() {
    catNames = Array.from(document.getElementsByClassName('cat-list-element'));
}

// add event listener to menu button
function buttonListener() {
    document.querySelector('.drop-btn').onclick = function() {
        buttonVisible();
    }
    document.querySelector('.admin-btn').onclick = function() {
        admin();
        nameFresh();
        urlFresh();
        clickFresh();
    }
    document.querySelector('#submit').onclick = function(e) {
        e.preventDefault();
        submit();
        clearHtml();
        renderCat();
        listFresh();
    }
}

// add event listener to each name in the list 
function nameListener() {
    for (let i in catNames) {    
        catNames[i].onclick = function(event) {
            showCard();
            catSelector(event);
            listSelector(event);
            clickListener();
            nameFresh();
            urlFresh();
            clickFresh();
        };
    }
}

// add selected cat to html
function catSelector(event) {
    // find object of selected cat and set it as active cat
    activeCat = cats.find(x => x.name === event.target.textContent);
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
    document.querySelector('.cat').onclick = function() {
        // increment click count
        activeCat.click++;
        // display click value
        displayClick();
        clickFresh();
    };
}

function submit() {
    activeCat.name = document.getElementById('name').value;
    activeCat.click = document.getElementById('click').value;
}

// create list of names from cat objects
function createList() {
    let d = document.createDocumentFragment();
    for (let c in cats) {
        let li = document.createElement('LI');
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
        let kittyContainer = document.createElement('SECTION');
        kittyContainer.id = activeCat.id;
        kittyContainer.classList.add('kittyContainer', activeCat.name);

        let kittyHeader = document.createElement('H3');
        kittyHeader.classList.add('instruction');
        //kittyHeader.setAttribute('style', 'white-space: pre;');
        kittyHeader.textContent = 'Click on ' + activeCat.name + '!';
        //kittyHeader.textContent += activeCat.name + '!';

        let catImage = document.createElement('IMG');
        catImage.classList.add('cat');
        catImage.src = activeCat.url;

        let counter = document.createElement('DIV');
        counter.classList.add('counter');
        counter.textContent = 'Clicks: ';

        let clickCounter = document.createElement('SPAN');
        clickCounter.classList.add('click-count');
        clickCounter.textContent = activeCat.click;

        counter.appendChild(clickCounter);

        kittyContainer.append(kittyHeader, catImage, counter);

        const parent = document.querySelector('.cat-container');
        parent.appendChild(kittyContainer);
};

// clear container of previous cat 
function clearHtml() {
    document.querySelector('.cat-container').innerHTML = '';
}

// highlight selected cat's name in dropdown list
function highlightList(event) {
    // remove previous highlight
    for (let c in catNames) {
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
    if (windowWidth.matches) { // If media query matches
        main.insertBefore(menu, container);
        sideMenu = true;
    }
    else {
        if (sideMenu = true) {
            main.insertBefore(menu, container);
            sideMenu = false;
        }
    }
}

function nameFresh() {
    if (activeCat !== "") {
        document.getElementById('name').value= activeCat.name;
    }
}

function urlFresh() {
    if (activeCat !== "") {
        document.getElementById('url').value= activeCat.url;
    }
}

function clickFresh() {
    if (activeCat !== "") {
        document.getElementById('click').value= activeCat.click;
    }
}

function listFresh() {
    document.querySelector('.cat-select').textContent = activeCat.name;
    document.querySelector('.selected-cat').textContent = activeCat.name;
}