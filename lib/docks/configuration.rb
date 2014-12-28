require 'utils/singleton.rb'

module Docks
  class Configuration < SingletonClass
    cattr_accessor :mount_at
    @@mount_at = '/pattern-library'
    @@root = nil

    cattr_accessor :src_files, :dest_dir, :partials_dir,
                   :custom_templates, :cache_dir
    @@cache_dir = defined?(Rails) ? "#{::Rails.root}/tmp/docks_cache" : '.docks_cache'
  end

  @@configured = false
  @@configuration = Configuration

  def self.configuration
    @@configuration
  end

  def self.configure
    yield @@configuration
    @@configured = true
  end
end
