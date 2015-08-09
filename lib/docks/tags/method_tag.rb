require_relative "member_tag.rb"

module Docks
  module Tags
    class Method < Member
      def initialize
        @name = :method
        @multiline = false
        @multiple_allowed = false
      end

      def process(symbol)
        symbol[@name] = true
        Containers::Function.from_symbol(symbol)
      end
    end
  end
end
