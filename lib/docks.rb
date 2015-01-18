require "yaml"
require "pathname"
require "fileutils"
require "ostruct"

require "redcarpet"

Dir[File.join(File.dirname(__FILE__), "docks", "*.rb")].each { |file| require file }
Dir[File.join(File.dirname(__FILE__), "docks", "parsers/**/*.rb")].each { |file| require file }
Dir[File.join(File.dirname(__FILE__), "docks", "processors/**/*.rb")].each { |file| require file }
Dir[File.join(File.dirname(__FILE__), "docks", "post_processors/**/*.rb")].each { |file| require file }

require "docks/rails/engine.rb" if defined?(Rails)

module Docks
  CACHE_DIR = "docks_cache"
  GROUP_CACHE_FILE = "docks_cache_groups"
  CONFIG_FILE = "docks_config.yml"
end
