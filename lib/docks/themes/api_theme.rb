require_relative "base_theme.rb"

module Docks
  module Themes
    class API < Base
      HELPERS = [File.expand_path("../../helpers/ui_helper.rb", __FILE__)]

      def configure(config)
        config.paginate = :pattern
        config.add_view_helpers(HELPERS)
      end
    end
  end
end
