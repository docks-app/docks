require "singleton"
require "pathname"

module Docks
  class Configuration
    include Singleton

    ROOT_DEPENDENT_PATHS = [:sources, :destination, :include_assets, :cache_location, :library_assets]

    # Key details — these are required
    attr_accessor :sources, :destination, :include_assets

    # Locations
    attr_accessor :root, :cache_location, :library_assets

    # Random assortment of other stuff
    attr_accessor :github_repo, :mount_at

    # Stateful stuff
    attr_reader :configured


    def initialize
      reset
    end

    def root=(new_root)
      @root = new_root.kind_of?(Pathname) ? new_root : Pathname.new(new_root)
    end

    def templates=(special_templates)
      if fallback = special_templates.delete(:default) || special_templates.delete(:fallback)
        Template.fallback = fallback
      end

      if demo = special_templates.delete(:demo)
        Template.demo = demo
      end

      special_templates.each do |match, template|
        Template.register(template, for: Regexp.new(match.to_s))
      end
    end

   def finalize
    @configured = true
   end




    def custom_parsers
      yield Parser
    end

    def custom_languages
      yield Language
    end

    def custom_tags
      yield Tag
    end

    def custom_templates
      yield Template
    end



    ROOT_DEPENDENT_PATHS.each do |path|
      define_method(path) do
        paths = instance_variable_get("@#{path.to_s}".to_sym)

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
      @cache_location = rails ? "tmp/#{Docks::CACHE_DIR}" : ".#{Docks::CACHE_DIR}"

      # These options only apply for static site generation — Rails handles
      # these details when it's being used
      @library_assets = Docks::ASSETS_DIR
      @destination = "public"

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


  @@configuration = Configuration.instance

  def self.config
    @@configuration
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
      language = Language.language_for(configurer)
      configure_with(language.load_stub(configurer)) unless language.nil?
    end
  end

  def self.configure
    pre_configuration unless @@configuration.configured
    yield @@configuration if block_given?
    post_configuration
  end

  private

  def self.pre_configuration
    Tag.register_bundled_tags
    Process.register_bundled_post_processors
    Language.register_bundled_languages
  end

  def self.post_configuration
    @@configuration.finalize
  end
end
