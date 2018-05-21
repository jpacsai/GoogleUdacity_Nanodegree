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
    if (adminMode === false) {
        let adminContainer = document.createElement('DIV');
        adminContainer.classList.add('admin-container');

        let adminForm = document.createElement('FORM');
        adminForm.classList.add('admin-form');

        let nameSpan = document.createElement('SPAN');
        nameSpan.classList.add('formSpan');
        nameSpan.textContent = 'Name';
        let inputName = document.createElement('INPUT');
        inputName.setAttribute("type", "text");
        inputName.setAttribute("name", "Cat name");
        let submitName = document.createElement('INPUT');
        submitName.setAttribute("submit", "submit");

        let urlSpan = document.createElement('SPAN');
        urlSpan.classList.add('formSpan');
        urlSpan.textContent = 'Url';
        let inputUrl = document.createElement('INPUT');
        inputUrl.setAttribute("type", "text");
        inputUrl.setAttribute("name", "Url");
        let submitUrl = document.createElement('INPUT');
        submitUrl.setAttribute("submit", "submit");

        let clickSpan = document.createElement('SPAN');
        clickSpan.classList.add('formSpan');
        clickSpan.textContent = 'Click';
        let inputClick = document.createElement('INPUT');
        inputClick.setAttribute("type", "text");
        inputClick.setAttribute("name", "Clicks");
        let submitClick = document.createElement('INPUT');
        submitClick.classList.add('submit-btn');
        submitClick.setAttribute("type", "submit");
        
        adminForm.append(nameSpan, inputName, urlSpan, inputUrl, clickSpan, inputClick, submitClick);
        adminContainer.append(adminForm);
        document.querySelector('.admin').appendChild(adminContainer);

        adminMode = true;
    }
}