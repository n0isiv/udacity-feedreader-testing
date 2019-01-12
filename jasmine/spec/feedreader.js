/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the
       * page?
       */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /**
       * Test that all url feeds have a url.
       */
      it("have a url", function() {
        allFeeds.forEach(feed => {
          expect(feed.url).toBeDefined();
          expect(feed.url).not.toBe("");
        });
      });

      /**
       * Test that all url feeds have a name.
       */
      it("have a name", function() {
        allFeeds.forEach(feed => {
          expect(feed.name).toBeDefined();
          expect(feed.name).not.toBe("");
        });
      });
    });

    describe("The menu", function() {
      beforeEach(function(done) {
        // ensure that menu is closed before running tests
        $("body").addClass("menu-hidden");

        done();
      });
      /**
       * Test that the menu is closed by default.
       */
      it("is closed by default", function() {
        expect($("body").hasClass("menu-hidden")).toBe(true);
      });

      /**
       * Test that the menu is open after the user clicked on the menu icon.
       */
      it("is opened after click on the menu icon", function() {
        // simulate menu icon click
        $(".menu-icon-link").click();
        // check if menu is open
        expect($("body").hasClass("menu-hidden")).not.toBe(true);

        // simulate menu icon click
        $(".menu-icon-link").click();
        // check if menu is closed
        expect($("body").hasClass("menu-hidden")).toBe(true);
      });
    });

    describe("Initial Entries", function() {
      beforeEach(function(done) {
        // call the done function when the feed has been loaded
        loadFeed(0, done);
      });

      it("have been loaded", function() {
        expect($(".feed").children(".entry-link").length).toBeGreaterThan(0);
      });
    });

    describe("New Feed Selection", function() {
      beforeEach(function(done) {
        // initialize content
        loadFeed(0, done);
      });

      it("updated the content", function(done) {
        const htmlBeforeUpdate = $(".feed")
          .children(".entry-link")
          .html();

        loadFeed(1, function() {
          const htmlAfterUpdate = $(".feed")
            .children(".entry-link")
            .html();

          expect(htmlAfterUpdate).not.toBe(htmlBeforeUpdate);
          done();
        });
      });
    });
  })()
);
