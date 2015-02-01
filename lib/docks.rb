require "yaml"
require "pathname"
require "fileutils"
require "ostruct"
require "singleton"

require "redcarpet"

require File.join(File.dirname(__FILE__), "docks", "types.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "*.rb")].each { |file| require file }

require File.join(File.dirname(__FILE__), "docks", "parsers/base_parser.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "parsers/*.rb")].each { |file| require file }

require File.join(File.dirname(__FILE__), "docks", "processors/base_processor.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "processors/*.rb")].each { |file| require file }

require File.join(File.dirname(__FILE__), "docks", "post_processors/base_post_processor.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "post_processors/**/*.rb")].each { |file| require file }

require File.join(File.dirname(__FILE__), "docks", "languages/base_language.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "languages/*.rb")].each { |file| require file }

require File.join(File.dirname(__FILE__), "docks", "tags/base_tag.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "tags/*.rb")].each { |file| require file }

require "docks/rails/engine.rb" if defined?(Rails)

module Docks
  CACHE_DIR = "docks_cache"
  GROUP_CACHE_FILE = "docks_cache_groups"
  CONFIG_FILE = "docks_config.yml"
end
