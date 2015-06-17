require "optparse"
require "fileutils"
require "ostruct"
require_relative "version.rb"

module Docks
  class CommandLine
    attr_reader :arguments

    def initialize(arguments)
      @arguments = arguments
    end

    def init
      options = {
        config_type: "yaml",
        template_language: "erb",
        script_language: "javascript",
        style_preprocessor: "scss"
      }

      OptionParser.new do |opt|
        opt.banner = "Usage: docks init [options]"

        opt.on("--config TYPE", %w(yaml json ruby), "The type of config file to generate (yaml, json, or ruby; default is yaml)") { |type| options[:config_type] = type }
        opt.on("--template LANGUAGE", %w(erb haml), "The language of markup templates to generate (erb or haml; default is erb).") { |language| options[:template_language] = language }
        opt.on("--scripts LANGUAGE", %w(javascript coffeescript), "The scripting language to generate helpers for (javascript or coffeescript; default is javascript).") { |language| options[:script_language] = language }
        opt.on("--styles PREPROCESSOR", %w(scss sass less stylus), "The CSS preprocessor to generate style helpers for (scss, sass, stylus or less; default is scss).") { |language| options[:style_preprocessor] = language }
        opt.on_tail("-h", "--help", "Show this message again.") { puts opt; exit }

        begin
          opt.parse!(arguments)
        rescue => e
        end

        Builder.setup(options)
      end
    end

    def run
      return init if arguments[0] == "init"
      config = "docks_config.*"
      options = {
        clear_cache: false
      }

      OptionParser.new do |opt|
        opt.on("--config FILE", "Path to the configuration file. If no such file is provided, it will default to a file named 'docks_config' in your current directory.") { |config_file| config = config_file }
        opt.on("--clear-cache", "Discard the cache of previous parse results before running.") { |clear_cache| options[:clear_cache] = clear_cache }
        opt.on_tail("-h", "--help", "Show this message again.") { puts opt; exit }
        opt.on_tail("-v", "--version", "Show the version of docks that's running.") { puts "docks #{Docks::VERSION}"; exit }

        begin
          opt.parse!(arguments)
        rescue => e
        end
      end

      Docks.configure_with(config)
      Docks.parse(options)
      Docks.build
    end
  end
end
