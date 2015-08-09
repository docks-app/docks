var destinations = require("../config").destination,
    browser_sync = require("browser-sync");

module.exports = function(gulp, plugins) {
  return function() {
    return gulp.src(destinations.scripts + "/*.js")
      .pipe(gulp.dest(destinations.pattern_library.scripts))
      .pipe(browser_sync.stream());
  };
};
