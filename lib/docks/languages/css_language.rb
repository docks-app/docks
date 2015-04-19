require_relative "base_language.rb"
require_relative "../parsers/css_parser.rb"

module Docks
  module Languages
    class CSS < Base
      def self.type; Docks::Types::Languages::STYLE end
      def self.extensions; "css" end

      def parser; Docks::Parsers::CSS.instance end
    end
  end
end
