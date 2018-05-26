let view = {

    // create list of names from cat objects
    createList() {
        let d = document.createDocumentFragment();
        for (let c in model.cats) {
            let li = document.createElement('LI');
            li.classList.add('cat-list-element');
            li.textContent = model.cats[c].name;
            d.appendChild(li);
        }
        document.querySelector('.name-list').appendChild(d);
    },

    // remove hidden class from container
    showCard() {
        model.container.classList.remove('hidden');
    },

    // add active cat object to html
    renderCat() {
        // clear container of previous cat
        document.querySelector('.cat-container').innerHTML = '';
    
        let kittyContainer = document.createElement('SECTION');
        kittyContainer.id = model.activeCat.id;
        kittyContainer.classList.add('kittyContainer', model.activeCat.name);
    
        let kittyHeader = document.createElement('H3');
        kittyHeader.classList.add('instruction');
        kittyHeader.textContent = 'Click on ' + model.activeCat.name + '!';
    
        let catImage = document.createElement('IMG');
        catImage.classList.add('cat');
        catImage.src = model.activeCat.url;
    
        let counter = document.createElement('DIV');
        counter.classList.add('counter');
        counter.textContent = 'Clicks: ';
    
        let clickCounter = document.createElement('SPAN');
        clickCounter.classList.add('click-count');
        clickCounter.textContent = model.activeCat.click;
    
        counter.appendChild(clickCounter);
    
        kittyContainer.append(kittyHeader, catImage, counter);
    
        const parent = document.querySelector('.cat-container');
        parent.appendChild(kittyContainer);
    },

    // highlight selected cat's name in dropdown list
    highlightList(event) {
        // remove previous highlight
        for (let c in model.catNames) {
            if (model.catNames[c].classList.contains('selected-cat') === true) {
                model.catNames[c].classList.remove('selected-cat');
            }
        };
        event.target.classList.add('selected-cat'); // highlight name
    },

    // set selected cat's name in header
    setName(event) {
        document.querySelector('.cat-select').textContent = event.target.textContent;
    },

    // hide drop-down list after selection
    hideList() {
        document.querySelector('.cat-list').classList.remove('cat-list-visible'); 
    },

    // update click value on screen
    displayClick() {
        document.querySelector('.click-count').textContent = model.activeCat.click;
    },

    // hide/unhide catlist
    buttonVisible() {
        document.querySelector('.cat-list').classList.toggle("cat-list-visible");
    },

    // hide/unhide admin form
    admin() {
        document.querySelector('.admin-form').classList.toggle('hidden');
    },

    // watching window width
    media() {
        if (model.windowWidth.matches) { // If media query matches 
            // move menu on the side
            model.main.insertBefore(model.menu, model.container);
            model.sideMenu = true;
        }
        // move menu back if not
        else if (model.sideMenu = true) {
            model.main.insertBefore(model.menu, model.container);
            model.sideMenu = false;
        }
    },

    // update active cat's property values if changed by admin form
    updateAdmin() {
        if (model.activeCat !== "") {
            document.getElementById('name').value = model.activeCat.name;
            document.getElementById('url').value = model.activeCat.url;
            this.clickFresh(); // update click value in admin form
        }
    },

    // update click value in admin form
    clickFresh() {
        document.getElementById('click').value = model.activeCat.click;
    },

    // update cat name in menu list if changed by admin form
    listFresh() {
        document.querySelector('.cat-select').textContent = model.activeCat.name;
        document.querySelector('.selected-cat').textContent = model.activeCat.name;
    },

    // check for empty fields in admin form
    // if the input field is empty fill it back with active cat's relevant property value
    checkForm() {
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
}