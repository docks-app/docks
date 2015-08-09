var config = require("./config"),
    browser_sync = require("browser-sync"),
    handle_errors = require("./utilities/handle_errors");

module.exports = function(gulp, plugins) {
  return function() {
    return gulp.src(config.source.styles.main)
      .pipe(plugins.cssGlobbing(config.plugins.css_globbing))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass(config.plugins.sass))
      .on("error", handle_errors)
      .pipe(plugins.autoprefixer(config.plugins.autoprefixer))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(config.destination.styles))
      .pipe(browser_sync.stream());
  };
};
