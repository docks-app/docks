require_relative "base_parser.rb"

module Docks
  module Parsers
    class CSS < Base

      def initialize
        @comment_symbol = "\/\*"
        @pattern_comment_extractor = /\s*\/\*\*(.*@(?:page|pattern).*?)\*\//m
        @comment_extractor = /\s*\/\*\*(?<comments>.*?)\*\/\s*(?<first_line>[^\n]*)/m
        @comment_pattern = /(^ *\/?\*? ?|\s*\*\/$)/m
      end


      # Public: Identifies the name and type of the parse result that is being parsed.
      #
      # first_code_line - The first line of actual code following a documentation
      #                   comment block (should be the last matching group returned
      #                   by #comment_extractor)
      #
      # Examples
      #
      #   Docks::Parsers::CSS.instance.parse_result_details(".is-active {")
      #   # => "is-active", "state"
      #
      #   Docks::Parsers::CSS.instance.parse_result_details(".tab-bar {")
      #   # => "tab-bar", "component"
      #
      # Returns a tuple of the name and type, both as Strings.

      def parse_result_details(first_code_line)
        first_code_line.strip!

        type = case first_code_line
          when /(\.|\-\-)?(?:is|js)\-/ then Docks::Types::Symbol::STATE
          when /\-\-(?:[a-zA-Z][\-_]?)*/ then Docks::Types::Symbol::VARIANT
          else Docks::Types::Symbol::COMPONENT
        end

        name = first_code_line.match(/^\s*[\.#]([^\s\:\.#]*)/).captures.first
        return name, type
      end
    end
  end
end
