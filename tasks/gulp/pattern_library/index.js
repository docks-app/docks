var config = require("../config");

module.exports = function(gulp, plugins) {
  return plugins.shell.task(config.plugins.docks.command);
};
