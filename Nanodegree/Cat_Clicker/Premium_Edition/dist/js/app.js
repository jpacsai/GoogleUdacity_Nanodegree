'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* TO-DO: 
 - [ ] hide / unhide cat name list by click on the button
 - [x] display selected name next to button
 - [x] add more cats
 - [x] highlight selected cat in list
*/

document.addEventListener("DOMContentLoaded", function () {
    var Cat = function () {
        function Cat(id, name, url) {
            _classCallCheck(this, Cat);

            this.id = id;
            this.name = name;
            this.url = url;
            this.click = 0;
        }

        _createClass(Cat, [{
            key: 'create',
            value: function create() {
                var kittyContainer = document.createElement('SECTION');
                kittyContainer.id = this.id;
                kittyContainer.classList.add('kittyContainer', this.name);

                var kittyHeader = document.createElement('H3');
                kittyHeader.classList.add('instruction');
                kittyHeader.setAttribute('style', 'white-space: pre;');
                kittyHeader.textContent = 'Click on\r\n';
                kittyHeader.textContent += this.name + '!';

                var catImage = document.createElement('IMG');
                catImage.classList.add('cat');
                catImage.src = this.url;

                var counter = document.createElement('DIV');
                counter.classList.add('counter');
                counter.textContent = 'Clicks: ';

                var clickCounter = document.createElement('SPAN');
                clickCounter.classList.add('click-count');
                clickCounter.textContent = this.click;

                counter.appendChild(clickCounter);

                kittyContainer.append(kittyHeader, catImage, counter);

                var parent = document.querySelector('.cat-container');
                parent.appendChild(kittyContainer);
            }
        }, {
            key: 'clicker',
            value: function clicker(event) {
                this.click++;
            }
        }]);

        return Cat;
    }();

    (function instantiateCats() {
        var cecile = new Cat('cecile', 'Cecile', 'images/cat1.jpg');
        var bertalan = new Cat('bertalan', 'Bertalan', 'images/cat2.jpg');
        var liuka = new Cat('liuka', 'Liuka', 'images/cat3.jpg');
        var mirtill = new Cat('mirtill', 'Mirtill', 'images/cat4.jpg');
        var misi = new Cat('misi', 'Misi', 'images/cat5.jpg');
        var johnny = new Cat('johnny', 'Johnny', 'images/cat6.jpg');
        var bella = new Cat('bella', 'Bella', 'images/cat7.jpg');
        var mici = new Cat('mici', 'Mici', 'images/cat8.jpg');

        var cats = [cecile, bertalan, liuka, mirtill, misi, johnny, bella, mici];

        createList(cats);

        var catNames = Array.from(document.getElementsByClassName('cat-list-element'));

        for (var i in catNames) {
            catNames[i].onclick = function (event) {
                catSelector(event, cats);
            };
        }
    })();

    function createList(cats) {
        var d = document.createDocumentFragment();
        for (var c in cats) {
            var li = document.createElement('LI');
            li.classList.add('cat-list-element');
            li.textContent = cats[c].name;
            d.appendChild(li);
        }
        document.querySelector('.name-list').appendChild(d);
    }

    function catSelector(event, cats) {
        document.querySelector('.cat-container').innerHTML = '';
        var element = event.target.textContent;
        var obj = cats.find(function (x) {
            return x.name === element;
        });
        obj.create();

        var all = Array.from(document.getElementsByClassName('cat-list-element'));
        for (var a in all) {
            if (all[a].classList.contains('selected-cat') === true) {
                all[a].classList.remove('selected-cat');
            }
        };
        event.target.classList.add('selected-cat');

        document.querySelector('.cat-select').textContent = event.target.textContent;

        document.querySelector('.cat').onclick = function (event) {
            obj.clicker();
            event.target.parentNode.lastChild.lastChild.textContent = obj.click;
        };
    }
});