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