var path = require("path"),
    config = require("../config");

module.exports = function(gulp, plugins) {
  return function() {
    // TODO
    return gulp.src(path.join(config.destination.styles, "!(min).css"))
      .pipe(plugins.rename({ suffix: ".min" }))
      .pipe(plugins.minifyCss())
      .pipe(gulp.dest(config.destination.styles))
      .pipe(plugins.filesize());
  };
};
