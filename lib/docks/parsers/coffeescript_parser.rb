module Docks
  module Parsers
    class CoffeeScript < Base

      def initialize
        @comment_symbol = "#"
        @page_comment_extractor = /(?:^\s*#\*\n)((?:^\s*?#[^\n]*\n)*(?:^\s*?#[^\n]*@(?:page|pattern)[^\n]*\n)(?:^\s*?#[^\n]*\n)*)/m
        @comment_extractor = /(?:^\s*#\*\n)((?:^\s*?#[^\n]*\n)+)\s*([^\n]*)$/m
        @comment_pattern = /^\s*#\s?\n?/m
      end



      # Public: Identifies the name and type of the parse result that is being parsed.
      #
      # first_code_line - The first line of actual code following a documentation
      #                   comment block (should be the last matching group returned
      #                   by #comment_extractor)
      #
      # Examples
      #
      #   Docks::Parsers::CoffeeScript.instance.parse_result_details(" class Tab")
      #   # => "class", "Tab"
      #
      #   Docks::Parsers::CoffeeScript.instance.parse_result_details("activateTab = (tab) =>")
      #   # => "activateTab", "function"
      #
      #   Docks::Parsers::CoffeeScript.instance.parse_result_details("nextTab = $(tab).next()")
      #   # => "nextTab", "variable"
      #
      # Returns a touple of the name and type, both as Strings.

      def parse_result_details(first_code_line)
        first_code_line.strip!

        type = case first_code_line
          when /^class/ then Docks::Types::Symbol::CLASS
          when /^.*?[\-\=]\>/ then Docks::Types::Symbol::FUNCTION
          else Docks::Types::Symbol::VARIABLE
        end

        name = first_code_line.match(/^\s*(?:class)?\s*([^\s\(\:\<\=\-]*)/).captures.first
        return name, type
      end
    end
  end
end
