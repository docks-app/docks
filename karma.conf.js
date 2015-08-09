var karma_configuration = require("./tasks/gulp/config").plugins.karma;

module.exports = function(config) {
  karma_configuration.logLevel = config.LOG_INFO;
  config.set(karma_configuration);
};
