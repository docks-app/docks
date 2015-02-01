module Docks
  module Languages
    class Less < Base
      def self.type; Docks::Types::Languages::STYLE end
      def self.parser; Docks::Parsers::Less end
      def self.extensions; "less" end
    end
  end
end
