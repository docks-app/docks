var path = require("path"),
    config = require("../config");

module.exports = function(gulp, plugins) {
  return function() {
    // TODO
    return gulp.src(path.join(config.destination.scripts, "*.js"))
      .pipe(plugins.rename({ suffix: ".min" }))
      .pipe(plugins.uglify())
      .pipe(gulp.dest(config.destination.scripts))
      .pipe(plugins.filesize());
  };
};
