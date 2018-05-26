let controller = {

    // instantiate cat objects
    instantiateCats() {
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
    },

    // get variable values from DOM
    setVariables() {
        model.container = document.querySelector('.container');
        model.menu = document.querySelector('.menu');
        model.main = document.querySelector('main');
    },

    // create cat name list for menu
    catNameList() {
        model.catNames = Array.from(document.getElementsByClassName('cat-list-element'));
    },

    // event listeners for buttons
    listener() {
        // menu button
        document.querySelector('.drop-btn').onclick = function() {
            view.buttonVisible();
        }
        // admin button
        document.querySelector('.admin-btn').onclick = function() {
            view.admin(); // hide/unhide admin form
            view.updateAdmin() // update active cat's property values
        }
        // submit button
        document.querySelector('#submit').onclick = function(e) {
            e.preventDefault();
            if (model.activeCat !== '') {
                //let self = controller;
                view.checkForm(); // check for empty fields in admin form
                this.submit(); // update active cat object values
                view.renderCat(); // add selected cat to html
                view.listFresh(); // update cat name in menu list
                this.clickListener(); // add event listener to cat's rerendered picture
            }
        }.bind(this);
    
        // name list in the menu
        for (let i in model.catNames) {    
            model.catNames[i].onclick = function(event) {
                view.showCard(); // unhide card if hidden
                this.catSelector(event); // add selected cat to html 
                this.listSelector(event); // style list when clicked
                this.clickListener(); // add event listener to active cat's picture
                view.updateAdmin(); // update active cat's property values if changed by admin form
            }.bind(this);
        }
    },

    // add selected cat to html
    catSelector(event) {
        // find the object of the selected cat and set it as active cat
        model.activeCat = model.cats.find(x => x.name === event.target.textContent);
        view.renderCat(); // add selected cat to html
    },

    // add new styling to list when clicked
    listSelector(event) {
        view.highlightList(event); // highlight selected cat's name in dropdown list
        view.setName(event); // set selected cat's name in header
        view.hideList(); // hide drop-down list after selection (in mobile view)
    },

    // add event listener to cat's picture
    clickListener() {
        document.querySelector('.cat').onclick = function() {
            model.activeCat.click++; // increment click count
            view.displayClick(); // update click value on screen
            view.clickFresh(); // update click value in admin form
        };
    },

    // update active cat object values
    submit() {
        model.activeCat.name = document.getElementById('name').value;
        model.activeCat.url = document.getElementById('url').value;
        model.activeCat.click = document.getElementById('click').value;
    }
}