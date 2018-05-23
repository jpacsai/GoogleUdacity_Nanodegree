document.addEventListener("DOMContentLoaded", function engine(){
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
    class Cat {
        constructor (id, name, url) {
            this.id = id;
            this.name = name;
            this.url = url;
            this.click = 0;
            model.cats.push(this);
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

// create cat name list for menu
function catNameList() {
    model.catNames = Array.from(document.getElementsByClassName('cat-list-element'));
}

// event listeners to buttons
function listener() {
    // menu button
    document.querySelector('.drop-btn').onclick = function() {
        buttonVisible();
    }
    // admin button
    document.querySelector('.admin-btn').onclick = function() {
        admin(); // hide/unhide admin form
        updateAdmin() // update active cat's property values
    }
    // submit button
    document.querySelector('#submit').onclick = function(e) {
        e.preventDefault();
        if (model.activeCat !== '') {
            checkForm(); // check for empty fields in admin form
            submit(); // update active cat object values
            renderCat(); // add selected cat to html
            listFresh(); // update cat name in menu list
            clickListener();
        }
    }

    // name list in the menu
    for (let i in model.catNames) {    
        model.catNames[i].onclick = function(event) {
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
    model.activeCat = model.cats.find(x => x.name === event.target.textContent);
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
    document.querySelector('.cat').onclick = function() {
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