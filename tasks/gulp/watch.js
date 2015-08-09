var sources = require("./config").source;

module.exports = function(gulp) {
  return function() {
    gulp.watch(sources.styles.all, ["pattern_library_styles"]);
    gulp.watch(sources.scripts.all, ["pattern_library_scripts"]);
    gulp.watch(sources.templates.all, ["pattern_library"]);
  };
};
