module Docks
  module Languages
    class CSS < Base
      def self.type; Docks::Types::Languages::STYLE end
      def self.parser; Docks::Parsers::CSS end
      def self.extensions; "css" end
    end
  end
end
