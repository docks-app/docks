var config = require("../config");

module.exports = function(gulp, plugins) {
  return function() {
    return gulp.src(config.source.scripts.all)
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslint.failOnError());
  };
};
