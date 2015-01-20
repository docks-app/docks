module Docks
  module Languages
    class Haml < Base
      def self.type; Docks::Types::Languages::MARKUP end
      def self.parser; Docks::Parsers::Haml end
      def self.extensions; "haml" end
    end
  end
end
