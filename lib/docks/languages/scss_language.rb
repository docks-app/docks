module Docks
  module Languages
    class SCSS < Base
      def self.type; Docks::Types::Languages::STYLE end
      def self.parser; Docks::Parsers::SCSS end
      def self.extensions; "scss" end
    end
  end
end
