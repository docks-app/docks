require "docks"

module Docks
  class Engine < Rails::Engine
    isolate_namespace Docks
    engine_name :docks

    config.assets.precompile += %w(pattern.css pattern.js demo.css demo.js)

    initializer :assets, group: :all do |app|
      Docks::Engine.default_root_path(app.root)
    end

    config.after_initialize do |app|
      Docks::Engine.prepend_routes(app)
    end

    def self.default_root_path(root)
      Docks.config.root ||= root
    end

    def self.prepend_routes(app)
      mount_at = Docks.config.mount_at
      return if app.routes.recognize_path(mount_at)[:action] != "routing_error" rescue nil

      app.routes.prepend do
        mount Docks::Engine => mount_at, as: "docks"
      end
    end
  end
end
