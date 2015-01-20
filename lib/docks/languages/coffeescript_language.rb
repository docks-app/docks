module Docks
  module Languages
    class CoffeeScript < Base
      def self.type; Docks::Types::Languages::SCRIPT end
      def self.parser; Docks::Parsers::CoffeeScript end
      def self.extensions; ["coffee", "coffeescript"] end
    end
  end
end
