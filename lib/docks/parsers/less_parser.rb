require_relative "sass_parser.rb"

module Docks
  module Parsers
    class Less < Sass
      def symbol_details_from_first_line(first_code_line)
        first_code_line.strip!

        type = case first_code_line
          when /^.[^\(]*\(/ then Docks::Types::Symbol::MIXIN
          when /^@/ then Docks::Types::Symbol::VARIABLE
          when /(\.|\-\-)?(?:is|js)\-/ then Docks::Types::Symbol::STATE
          when /\-\-(?:[a-zA-Z][\-_]?)*/ then Docks::Types::Symbol::VARIANT
          else Docks::Types::Symbol::COMPONENT
        end

        name = first_code_line.match(/^\s*&?[\.#]?\s*(@?[^\s\(\:]*)/).captures.first
        { name: name, symbol_type: type }
      end
    end
  end
end
