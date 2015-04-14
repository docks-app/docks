require "singleton"

module Docks
  class Configuration
    include Singleton

    @root = nil
    attr_accessor :src_files, :files, :destination, :partials_dir, :config_file,
                  :cache_dir, :github_repo, :root, :templates, :include_assets

    def custom_parsers
      yield Docks::Parser
    end

    def custom_languages
      yield Docks::Language
    end

    def custom_tags
      yield Docks::Tag
    end

    def custom_templates
      yield Docks::Template
    end

    def mount_at
      "/pattern-library"
    end
  end

  @@configured = false
  @@configuration = Configuration.instance

  def self.configuration
    @@configuration
  end

  def self.configured
    @@configured
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
    end

    if File.extname(configurer) =~ /rb/
      self.class_eval(File.read(configurer))
    else
      language = Docks::Language.language_for(configurer)
      configure_with(language.load_stub(configurer)) unless language.nil?
    end
  end

  def self.configure
    pre_configuration
    yield @@configuration if block_given?
    post_configuration
  end

  def self.pre_configuration
    return if @@configured

    Tag.register_bundled_tags
    Process.register_bundled_post_processors
    Language.register_bundled_languages
  end

  def self.post_configuration
    @@configured = true

    rails = defined?(::Rails)

    configuration.root ||= (rails ? ::Rails.root.to_s : Dir.pwd)
    configuration.cache_dir ||= (rails ? File.join(configuration.root, "tmp", Docks::CACHE_DIR) : File.join(configuration.root, ".#{Docks::CACHE_DIR}"))
    configuration.partials_dir ||= File.join(configuration.root, "pattern_library_assets", "templates")
    Docks::Template.fallback = (rails ? :pattern : File.join(configuration.partials_dir, "pattern"))

    if custom_templates = configuration.templates
      custom_templates.each do |match, template|
        Docks::Template.register(template, for: Regexp.new(match))
      end
    end

    if configuration.src_files.kind_of?(Array) && !configuration.src_files.empty?
      configuration.src_files.map! { |file| File.join(configuration.root, file) }
      configuration.files = Docks::Group.group_files_by_type(configuration.src_files)
    end
  end
end
