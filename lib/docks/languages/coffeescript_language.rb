require_relative "base_language.rb"
require_relative "../parsers/coffeescript_parser.rb"

module Docks
  module Languages
    class CoffeeScript < Base
      def self.type; Docks::Types::Languages::SCRIPT end
      def self.extensions; ["coffee", "coffeescript"] end

      def parser; Docks::Parsers::CoffeeScript.instance end

      def friendly_presentation(symbol)
        symbol_type, name = symbol[:symbol_type], symbol[:name]

        case symbol_type
          when Docks::Types::Symbol::MIXIN, Docks::Types::Symbol::FUNCTION
            presentation = "#{name} ="
            presentation << " (#{(symbol[:param]).map { |param| "#{param[:name]}#{" = #{param[:default]}" if param[:default]}" }.join(", ")})" if symbol[:param] && symbol[:param].length
            "#{presentation} -> # ..."

          else name
        end
      end
    end
  end
end
