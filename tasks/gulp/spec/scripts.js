var karma = require("karma"),
    path = require("path");

module.exports = function(gulp, plugins) {
  return function(done) {
    karma.server.start({
      configFile: path.resolve(__dirname, "../../../karma.conf.js"),
      singleRun: true
    }, done);
  };
};
