require "singleton"

module Docks
  module Themes
    class Base
      include Singleton

      attr_reader :scripts, :styles

      def initialize
        @scripts = []
        @styles = []
      end

      def setup(builder); end

      def configure(config); end
    end
  end
end
