require "singleton"
require "pathname"

require_relative "cache.rb"
require_relative "templates.rb"
require_relative "tags.rb"
require_relative "symbol_sources.rb"
require_relative "naming_conventions.rb"
require_relative "themes.rb"

module Docks
  class Configuration
    include Singleton

    ROOT_DEPENDENT_PATHS = [
      :sources,
      :destination,
      :cache_location,
      :templates,
      :helpers
    ]

    # Key details — these are required
    attr_accessor :sources, :destination, :theme

    # Locations
    attr_accessor :root, :cache_location, :templates, :asset_folders

    # Random assortment of other stuff
    attr_accessor :github_repo, :mount_at, :helpers, :compiled_assets,
                  :naming_convention, :pattern_id, :paginate, :use_theme_assets

    # Stateful stuff
    attr_reader :configured

    def initialize
      restore_defaults
    end

    def root=(new_root)
      @root = new_root.kind_of?(Pathname) ? new_root : Pathname.new(new_root)
    end

    def asset_folders=(new_asset_folders)
      new_asset_folders.each do |type, dir|
        @asset_folders.send("#{type}=".to_sym, dir)
      end

      @asset_folders
    end

    def naming_convention=(new_naming_convention)
      @naming_convention = NamingConventions.for(new_naming_convention)
      @naming_convention
    end

    def theme=(new_theme)
      @theme = Themes.for(new_theme)
      @theme
    end

    def github_repo
      return nil if @github_repo.nil? || @github_repo.empty?
      "https://github.com/#{@github_repo.split("/")[-2..-1].join("/")}"
    end

    def paginate?
      !!@paginate
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

    def custom_templates=(custom_templates)
      Templates.register(custom_templates)
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

    def restore_defaults
      @configured = false
      @sources = [
        "styles/**/*.{css,scss,sass,less,styl}",
        "scripts/**/*.{js,coffee,coffeescript}"
      ]
      @compiled_assets = []
      @github_repo = ""
      @paginate = :pattern
      @naming_convention = NamingConventions::BEM.instance
      @helpers = []

      @theme = Themes.for("API")
      @use_theme_assets = true

      @root = Pathname.pwd
      @cache_location = ".#{Docks::Cache::DIR}"

      @templates = "#{Docks::ASSETS_DIR}/templates"
      @custom_templates = {
        fallback: "pattern",
        demo: "demo"
      }

      @destination = "public"
      @asset_folders = OpenStruct.new(scripts: "scripts", styles: "styles")

      @mount_at = "pattern-library"
    end

    private

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
    unless block_given?
      return configure_with(CONFIG_FILE)
    end

    pre_configuration unless @configuration.configured
    yield @configuration
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
