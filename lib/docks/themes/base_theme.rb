require "singleton"

module Docks
  module Themes
    class Base
      include Singleton

      def configure(config)
      end
    end
  end
end
