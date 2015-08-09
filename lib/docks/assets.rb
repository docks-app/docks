module Docks
  module Assets
    def self.path_for(*asset_path)
      path = assets_path + File.join(*asset_path)

      if File.exists?(path)
        path
      else
        raise NoAssetError, "No asset matching '#{File.join(*asset_path)}' was found in the asset folders."
      end
    end

    def self.scripts
      Dir[assets_path + "scripts/*.js"]
    end

    def self.styles
      Dir[assets_path + "styles/*.css"]
    end

    private

    def self.assets_path
      @assets_path ||= Pathname.new(File.expand_path("../../../assets", __FILE__))
    end
  end
end
