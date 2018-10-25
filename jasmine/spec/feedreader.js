/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* First test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have defined URLs, and URLs are not empty.', () => {
            allFeeds.forEach(i => {
                let url = i.url;
                expect(url).toBeDefined();
                expect(url.length).not.toBe(0);
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have defined names, and names are not empty.', () => {
            allFeeds.forEach(i => {
                let name = i.name;
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            });
        });
    });


    /*test suite named "The menu" */
    describe('The menu', () => {

        /* test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('element is hidden by default.', () => {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('should become visible when clicked, and then hide when clicked again.', () => {
            let clickIcon = () => {
                $('.icon-list').click();
            };
            expect($('body').hasClass('menu-hidden')).toBe(true);
            clickIcon();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            clickIcon();
        });
    });


    /* test suite named "Initial Entries" */
    describe('Initial Entries:', () => {

        /* test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        beforeEach(done => {
            loadFeed(0, () => {
                done();
            });
        });

        it('After loadFeed is called and finishes, the .feed container should have at least one .entry element.', done => {

            expect($('.feed').find('.entry').length !== 0).toBe(true);
            done();
        });
    });

    /*test suite named "New Feed Selection" */
    describe('New Feed Selection:', () => {

        /*test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
        let feed0, feed1;

        beforeEach(done => {
            loadFeed(0, () => {
                feed0 = $('.feed').html();
                loadFeed(1, () => {
                    feed1 = $('.feed').html();
                    done();
                });
                done();
            });
        });

        it('when new feed is loaded, content should actually change.', done => {
            expect(feed0 === feed1).toBe(false);
            done();
        });
    });
}());
