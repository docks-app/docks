module Docks
  module Languages
    class ERB < Base
      def self.type; Docks::Types::Languages::MARKUP end
      def self.parser; Docks::Parsers::ERB end
      def self.extensions; "erb" end
    end
  end
end
