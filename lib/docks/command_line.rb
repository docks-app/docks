require "optparse"
require "fileutils"
require "ostruct"
require File.join(File.dirname(__FILE__), "version.rb")

module Docks
  class CommandLine
    attr_reader :arguments

    def initialize(arguments)
      @arguments = arguments
    end

    def init
      options = { config_type: "yaml", template_language: "erb", script_language: "javascript", style_preprocessor: "scss" }

      OptionParser.new do |opt|
        opt.banner = "Usage: docks init [options]"

        opt.on("--config TYPE", %w(yaml json ruby), "The type of config file to generate (yaml, json, or ruby; default is yaml)") { |type| options[:config_type] = type }
        opt.on("--template LANGUAGE", %w(erb haml), "The language of markup templates to generate (erb or haml; default is erb).") { |language| options[:template_language] = language }
        opt.on("--scripts LANGUAGE", %w(javascript coffeescript), "The scripting language to generate helpers for (javascript or coffeescript; default is javascript).") { |language| options[:script_language] = language }
        opt.on("--styles PREPROCESSOR", %w(scss less), "The CSS preprocessor to generate style helpers for (scss or less; default is scss).") { |language| options[:style_preprocessor] = language }
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
      config = arguments[0] || "docks_config.*"

      OptionParser.new do |option|
        option.on_tail("-h", "--help", "Show this message again.") { puts option; exit }
        option.on_tail("-v", "--version", "Show the version of docks that's running.") { puts "docks #{Docks::VERSION}"; exit }
        option.on("--config FILE", "Path to the configuration file. If no such file is provided, it will default to 'docks_config.yml'.") { |config_file| config = config_file }

        begin
          option.parse!(arguments)
        rescue => e
        end
      end

      Docks.configure_with(config)
      Docks.parse
      Docks.build
    end
  end
end
