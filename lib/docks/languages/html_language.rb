require_relative "base_language.rb"

module Docks
  module Languages
    class HTML < Base
      def self.type; Docks::Types::Languages::MARKUP end
      def self.extensions; "html" end

      # def parser; Docks::Parsers::CSS.instance end
    end
  end
end
