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
    let bella = new Cat('bella', 'Bella', 'images/cat7.jpg');
    let mici = new Cat('mici', 'Mici', 'images/cat8.jpg');
}

// add event listener for each name in the list  
for (let i in catNames) {    
    catNames[i].onclick = function(event) {
        catSelector(event, cats);
        listSelector(event);
    };
}

// add selected cat to html
function catSelector(event, cats) {
    // find object of selected cat and set it as active cat
    activeCat = cats.find(x => x.name === event.target.textContent);
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
    document.querySelector('.cat').onclick = function(event) {
        // increment click count
        activeCat.click++;
        // display click value
        displayClick(event);
    };