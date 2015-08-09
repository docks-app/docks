var browserify = require("browserify"),
    browserify_bundler = require("./utilities/browserify_bundler"),
    config = require("./config"),
    bundler = browserify(config.source.scripts.main[0], config.plugins.browserify);

module.exports = function(gulp, plugins) {
  return browserify_bundler(bundler, gulp, plugins);
};
