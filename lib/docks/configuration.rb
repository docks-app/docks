require "singleton"
require "pathname"

require_relative "cache.rb"
require_relative "templates.rb"
require_relative "tags.rb"
require_relative "symbol_sources.rb"
require_relative "naming.rb"

module Docks
  class Configuration
    include Singleton

    ROOT_DEPENDENT_PATHS = [
      :sources,
      :destination,
      :compiled_assets,
      :cache_location,
      :library_assets,
      :helpers
    ]

    # Key details — these are required
    attr_accessor :sources, :destination

    # Locations
    attr_accessor :root, :cache_location, :library_assets, :asset_folders

    # Random assortment of other stuff
    attr_accessor :github_repo, :mount_at, :helpers, :compiled_assets,
                  :naming_convention, :pattern_id

    # Stateful stuff
    attr_reader :configured

    def initialize
      reset
    end

    def root=(new_root)
      @root = new_root.kind_of?(Pathname) ? new_root : Pathname.new(new_root)
    end

    def templates=(special_templates)
      Templates.register(special_templates)
    end

    def asset_folders=(new_asset_folders)
      new_asset_folders.each do |type, dir|
        @asset_folders.send("#{type}=".to_sym, dir)
      end

      @asset_folders
    end

    def naming_convention=(new_naming_convention)
      Docks::Naming.convention = new_naming_convention
    end

    def naming_convention
      Docks::Naming.convention
    end

    def github_repo
      return nil if @github_repo.nil? || @github_repo.empty?
      "https://github.com/#{@github_repo.split("/")[-2..-1].join("/")}"
    end

    def pattern_id(*args)
      Docks.pattern_id(*args)
    end

    def pattern_id=(block)
      Docks.pattern_id = block
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

    def custom_symbol_sources
      yield SymbolSources
    end

    def custom_parsers
      yield Parser
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
      @compiled_assets = []
      @github_repo = nil

      rails = defined?(::Rails)

      @root = rails ? ::Rails.root : Pathname.pwd
      @cache_location = rails ? "tmp/cache/#{Docks::Cache::DIR}" : ".#{Docks::Cache::DIR}"

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
