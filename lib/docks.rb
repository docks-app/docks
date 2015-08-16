require "yaml"
require "json"
require "pathname"
require "fileutils"
require "ostruct"
require "singleton"

require "redcarpet"
require "active_support/inflector"

module Docks
  ASSETS_DIR = "pattern_library_assets"
  CONFIG_FILE = "docks_config.*"
end

require File.join(File.dirname(__FILE__), "docks", "types.rb")
require File.join(File.dirname(__FILE__), "docks", "configuration.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "*.rb")].each { |file| require file }

require File.join(File.dirname(__FILE__), "docks", "parsers/base_parser.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "parsers/*.rb")].each { |file| require file }

Dir[File.join(File.dirname(__FILE__), "docks", "renderers/*.rb")].each { |file| require file }

Dir[File.join(File.dirname(__FILE__), "docks", "themes/*.rb")].each { |file| require file }

require File.join(File.dirname(__FILE__), "docks", "languages/base_language.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "languages/*.rb")].each { |file| require file }

require File.join(File.dirname(__FILE__), "docks", "tags/base_tag.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "tags/*.rb")].each { |file| require file }

Dir[File.join(File.dirname(__FILE__), "docks", "containers/*.rb")].each { |file| require file }

require File.join(File.dirname(__FILE__), "docks", "descriptor.rb")

Dir[File.join(File.dirname(__FILE__), "docks", "helpers.rb")].each { |file| require file }
