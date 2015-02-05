module Docks
  module Parsers
    class SCSS < Base

      def initialize
        @comment_symbol = "\/\/"
        @page_comment_extractor = /(?:^\s*\/\/\*\n)((?:^\s*?\/\/[^\n]*\n)*(?:^\s*?\/\/[^\n]*@page[^\n]*\n)(?:^\s*?\/\/[^\n]*\n)*)/m
        @comment_extractor = /(?:^\s*\/\/\*\n)((?:^\s*?\/\/[^\n]*\n)+)\s*((?:@\w*\s*|\$|%|\.|#|\&[\.#(?:\-\-)])[\w\-_]*)/m
        @comment_pattern = /^ *\/\/ ?/m
      end



      # Public: Identifies the name and type of the parse result that is being parsed.
      #
      # first_code_line - The first line of actual code following a documentation
      #                   comment block (should be the last matching group returned
      #                   by #comment_extractor)
      #
      # Examples
      #
      #   Docks::Parsers::SCSS.instance.parse_result_details("@mixin clearfix() {")
      #   # => "clearfix", "mixin"
      #
      #   Docks::Parsers::SCSS.instance.parse_result_details("&--is-active {")
      #   # => "--is-active", "state"
      #
      #   Docks::Parsers::SCSS.instance.parse_result_details("%full-width { width: 100% }")
      #   # => "full-width", "placeholder"
      #
      # Returns a touple of the name and type, both as Strings.

      def parse_result_details(first_code_line)
        first_code_line.strip!

        type = case first_code_line
          when /^@function/ then Docks::Types::Symbol::FUNCTION
          when /^@mixin/ then Docks::Types::Symbol::MIXIN
          when /^%/ then Docks::Types::Symbol::PLACEHOLDER
          when /^\$/ then Docks::Types::Symbol::VARIABLE
          when /(\.|\-\-)?(?:is|js)\-/ then Docks::Types::Symbol::STATE
          when /\-\-(?:[a-zA-Z][\-_]?)*/ then Docks::Types::Symbol::VARIANT
          else Docks::Types::Symbol::COMPONENT
        end

        name = first_code_line.match(/^@?(?:(?:function|mixin)\s*)?&?[\$%\.#]?\s*([^\s\(\:]*)/).captures.first
        return name, type
      end
    end
  end
end
