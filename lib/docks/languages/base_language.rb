require_relative "../languages.rb"

module Docks
  module Languages
    class Base
      include Singleton

      def self.type; nil end
      def self.extensions; nil end
      def self.symbol_sources; nil end

      def load_stub(file); nil end
      def parser; nil end
      def renderer; nil end
      def friendly_presentation(symbol); symbol[:name] end
    end
  end
end
