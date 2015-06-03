require_relative "base_parser.rb"

module Docks
  module Parsers
    class Sass < Base

      def initialize
        @comment_pattern = /(?:\/\/|\/\*|\*\/?)/
        @first_non_code_line_pattern = /[=+\.#\w\[&@]/
        setup_regexes
      end

      def symbol_details_from_first_line(first_code_line)
        first_code_line = first_code_line.strip

        type = case first_code_line
          when /^@function/ then Docks::Types::Symbol::FUNCTION
          when /^@mixin/, /^=/ then Docks::Types::Symbol::MIXIN
          when /^%/ then Docks::Types::Symbol::PLACEHOLDER
          when /^\$/ then Docks::Types::Symbol::VARIABLE
          when /(\.|\-\-)?(?:is|js)\-/ then Docks::Types::Symbol::STATE
          when /\-\-(?:[a-zA-Z][\-_]?)*/ then Docks::Types::Symbol::VARIANT
          else Docks::Types::Symbol::COMPONENT
        end

        name = first_code_line.match(/^=?@?(?:(?:function|mixin)\s*)?&?[\$%\.#]?\s*([^\s\(\:]*)/).captures.first
        { name: name, symbol_type: type }
      end
    end
  end
end
