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
end

require File.join(File.dirname(__FILE__), "docks", "types.rb")
require File.join(File.dirname(__FILE__), "docks", "configuration.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "*.rb")].each { |file| require file }

require File.join(File.dirname(__FILE__), "docks", "parsers/base_parser.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "parsers/*.rb")].each { |file| require file }

require File.join(File.dirname(__FILE__), "docks", "processors/base_processor.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "processors/*.rb")].each { |file| require file }

require File.join(File.dirname(__FILE__), "docks", "post_processors/base_post_processor.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "post_processors/**/*.rb")].each { |file| require file }

Dir[File.join(File.dirname(__FILE__), "docks", "renderers/*.rb")].each { |file| require file }

require File.join(File.dirname(__FILE__), "docks", "languages/base_language.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "languages/*.rb")].each { |file| require file }

require File.join(File.dirname(__FILE__), "docks", "tags/base_tag.rb")
Dir[File.join(File.dirname(__FILE__), "docks", "tags/*.rb")].each { |file| require file }

Dir[File.join(File.dirname(__FILE__), "docks", "containers/*.rb")].each { |file| require file }

require "docks/rails/engine.rb" if defined?(Rails)
