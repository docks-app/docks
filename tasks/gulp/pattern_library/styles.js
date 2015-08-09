var destinations = require("../config").destination,
    browser_sync = require("browser-sync");

module.exports = function(gulp, plugins) {
  return function() {
    return gulp.src(destinations.styles + "/*.css")
      .pipe(gulp.dest(destinations.pattern_library.styles))
      .pipe(browser_sync.stream());
  };
};
