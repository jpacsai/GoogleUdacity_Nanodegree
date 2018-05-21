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
    };
}




    
