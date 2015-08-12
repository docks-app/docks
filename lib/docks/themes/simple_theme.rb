require_relative "base_theme.rb"

module Docks
  module Themes
    class Simple < Base
      def configure(config)
        config.paginate = false
      end
    end
  end
end
