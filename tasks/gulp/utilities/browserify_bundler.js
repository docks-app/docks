var babelify = require("babelify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    config = require("../config"),
    browser_sync = require("browser-sync"),
    handle_errors = require("../utilities/handle_errors"),
    path = require("path");

module.exports = function(bundler, gulp, plugins) {
  bundler.transform(babelify.configure(config.plugins.babel));

  return function() {
    return bundler.bundle()
      .on("error", handle_errors)
      .pipe(source(path.basename(config.source.scripts.main[0])))
      .pipe(buffer())
      .pipe(plugins.sourcemaps.init({ loadMaps: true }))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(config.destination.scripts))
      .pipe(browser_sync.stream());
  };
};
