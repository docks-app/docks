require_relative "member_tag.rb"

module Docks
  module Tags
    class Property < Member
      def initialize
        @name = :property
        @multiline = false
        @multiple_allowed = false
      end

      def process(symbol)
        symbol[@name] = true
        Containers::Variable.from_symbol(symbol)
      end
    end
  end
end
