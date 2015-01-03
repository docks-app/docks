require File.join(File.dirname(__FILE__), "utils", "singleton.rb")

module Docks
  class Configuration < SingletonClass
    cattr_accessor :mount_at
    @@mount_at = '/pattern-library'
    @@root = nil

    cattr_accessor :src_files, :files, :dest_dir, :partials_dir,
                   :config_file, :custom_templates, :cache_dir, :root
  end

  @@configured = false
  @@configuration = Configuration

  def self.configuration
    @@configuration
  end

  def self.configure_with(options)
    return unless options.kind_of?(Hash)
    configure do |config|
      options.each do |key, val|
        key = "#{key}=".to_sym
        config.send(key, val) config.respond_to?(key)
      end
    end
  end

  def self.configure
    pre_configuration
    yield @@configuration if block_given?
    post_configuration
    @@configured = true
  end

  def self.pre_configuration
    return if @@configured

    rails = defined?(::Rails)
    configuration.root = rails ? ::Rails.root.to_s : Dir.pwd if configuration.root.nil?

    if configuration.cache_dir.nil?
      configuration.cache_dir = rails ? File.join(configuration.root, "tmp", Docks::CACHE_DIR) : File.join(configuration.root, ".#{Docks::CACHE_DIR}")
    end

    if configuration.config_file.nil?
      config_file = rails ? File.join(configuration.root, "config", Docks::CONFIG_FILE) : File.join(configuration.root, Docks::CONFIG_FILE)
      configuration.config_file = config_file if File.exists?(config_file)
    end
  end

  def self.post_configuration
    return if !configuration.src_files.kind_of?(Array) || configuration.src_files.empty?
    configuration.src_files.map { |file| File.join(configuration.root, file) }
    configuration.files = Docks::Group.group_files_by_type(configuration.src_files)
  end
end
