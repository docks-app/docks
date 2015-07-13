Docks = -> {}

if typeof define == "function" && define.amd
  define("docks", [], Docks)
else if typeof module == "object" && module.exports
  module.exports = Docks()
else
  @Docks = Docks()
