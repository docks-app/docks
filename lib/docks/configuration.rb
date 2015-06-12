require "singleton"
require "pathname"

require_relative "cache.rb"
require_relative "templates.rb"

module Docks
  class Configuration
    include Singleton

    ROOT_DEPENDENT_PATHS = [:sources, :destination, :include_assets, :cache_location, :library_assets, :helpers]

    # Key details — these are required
    attr_accessor :sources, :destination, :include_assets

    # Locations
    attr_accessor :root, :cache_location, :library_assets, :asset_folders

    # Random assortment of other stuff
    attr_accessor :github_repo, :mount_at, :helpers

    # Stateful stuff
    attr_reader :configured

    def initialize
      reset
    end

    # Updates the root directory against which `ROOT_DEPENDENT_PATHS` are
    # evaluated.
    #
    # new_root - A Pathname or string representing the root path.
    #
    # Returns nothing.

    def root=(new_root)
      @root = new_root.kind_of?(Pathname) ? new_root : Pathname.new(new_root)
    end

    # Adds custom templates. The keys of the passed Hash will be treated as a
    # pattern to match in order to use the template represented by the
    # associated value. If the passed Hash has `default` or `fallback` keys,
    # that template will be used as the fallback template. If a `demo` key
    # exists, that template will be used as the template for component demos.
    #
    # special_templates - A Hash representing the custom templates to use.
    #
    # Returns nothing.

    def templates=(special_templates)
      if fallback = special_templates.delete("default") || special_templates.delete("fallback")
        Templates.fallback_template = fallback
      end

      if demo = special_templates.delete("demo")
        Templates.demo_template = demo
      end

      special_templates.each do |match, template|
        Templates.register(template, for: Regexp.new(match.to_s))
      end
    end

    def asset_folders=(new_asset_folders)
      new_asset_folders.each do |type, dir|
        @asset_folders.send("#{type}=".to_sym, dir)
      end

      @asset_folders
    end

    def finalize
      @configured = true
    end

    def custom_languages
      yield Languages
    end

    def custom_tags
      yield Tags
    end

    def custom_templates
      yield Templates
    end

    ROOT_DEPENDENT_PATHS.each do |path|
      define_method(path) do
        paths = instance_variable_get("@#{path.to_s}".to_sym)
        return if paths.nil?

        if paths.kind_of?(Array)
          paths.map { |a_path| make_path_absolute(a_path) }
        else
          make_path_absolute(paths)
        end
      end
    end

    private

    def reset
      @configured = false
      @sources = []
      @include_assets = []
      @github_repo = nil

      rails = defined?(::Rails)

      @root = rails ? ::Rails.root : Pathname.pwd
      @cache_location = rails ? "tmp/#{Docks::Cache::DIR}" : ".#{Docks::Cache::DIR}"

      # These options only apply for static site generation — Rails handles
      # these details when it's being used
      @library_assets = Docks::ASSETS_DIR
      @destination = "public"
      @asset_folders = OpenStruct.new Hash[%w(scripts styles templates images).map { |asset| [asset, asset] }]

      @mount_at = "pattern-library"
    end

    def make_path_absolute(path)
      pathname = path.kind_of?(Pathname) ? path : Pathname.new(path)
      if pathname.absolute?
        pathname
      else
        @root + pathname
      end
    end
  end


  @configuration = Configuration.instance

  def self.config
    @configuration
  end

  def self.configure_with(configurer)
    if configurer.kind_of?(Hash)
      configure do |config|
        configurer.each do |key, val|
          key = "#{key}=".to_sym
          config.send(key, val) if config.respond_to?(key)
        end
      end

      return
    end

    configurer = Dir[configurer].first

    unless File.exists?(configurer)
      Messenger.error("No configuration file could be found.")
      exit
    end

    if File.extname(configurer) =~ /rb/
      self.class_eval(File.read(configurer))
    else
      Languages.register_bundled_languages
      language = Languages.language_for(configurer)
      configure_with(language.load_stub(configurer)) unless language.nil?
    end
  end

  def self.configure
    pre_configuration unless @configuration.configured
    yield @configuration if block_given?
    post_configuration
  end

  private

  def self.pre_configuration
    Tags.register_bundled_tags
    Languages.register_bundled_languages
  end

  def self.post_configuration
    @configuration.finalize
  end
end
