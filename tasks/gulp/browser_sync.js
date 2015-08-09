var config = require("./config").plugins.browser_sync,
    browser_sync = require("browser-sync");

module.exports = function(gulp) {
  return function() {
    browser_sync.init(config);
  };
};
