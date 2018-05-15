/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* The test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are not empty', function() {
            expect(allFeeds.every(f => f.hasOwnProperty('url') === true && f.url !== '')).toBe(true);
        });

        /* The test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name property and not empty', function() {
            expect(allFeeds.every(f => f.hasOwnProperty('name') === true && f.name !== '')).toBe(true);
        });
    });

    describe('The menu', function() {
        /* The test ensures the menu element is
         * hidden by default by checking if it has the accurate class.
         */
        let e = document.getElementsByTagName('body')[0];
        let menuIcon = document.querySelector('.menu-icon-link');

        it('menu is hidden by default', function() {
            expect(e.classList.contains('menu-hidden')).toBe(true);
        });

         /* The test ensures the menu changes
          * visibility when the menu icon is clicked. 
          * It checks the classList of the element after one click
          * and checks again after the second click.
          */
        it ('menu changes visibility when the menu icon is clicked', function() {
            menuIcon.click();
            let state1 = e.classList.contains('menu-hidden');
            menuIcon.click();
            let state2 = e.classList.contains('menu-hidden');
            expect(state1 === true && state2 === false).toBe(true);
        });

    });

    describe('Initial Entries', function() {
        /* The test ensures when the loadFeed function is called
         * and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function(){
                done();
            });
        });

        it('there is at least a single .entry element within the .feed container', function(done) {
            expect(document.querySelector('.feed').children.length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        /* The test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * It checks the innerHTML of the element afer the first,
         * then again after the second load,
         * finally compares them.
         */
        let oldFeed;
        let newFeed;
        beforeEach(function(done) {
            loadFeed(0, function(){
                oldFeed = document.querySelector('.feed').innerHTML;
                loadFeed(1, function() {
					newFeed = document.querySelector('.feed').innerHTML;
					done();
				});
            });
        });

        it ('when new feed is loaded, content changes', function(done) {
            expect(oldFeed !== newFeed).toBe(true);
            done();
        });
    });
}());
