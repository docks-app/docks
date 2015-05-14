require_relative "base_parser.rb"

module Docks
  module Parsers
    class ERB < Base

      def initialize
        @comment_symbol = "<%#"
        @page_comment_extractor = /\s*<%#\*(.*@(?:page|pattern).*?)%>/m
        @comment_extractor = /(?:\s*<%#\*\n)(.*?)%>\s*([^\n]*)/m
        @comment_pattern = /^ +/m
      end


      # Public: Identifies the name and type of the parse result that is being parsed.
      #
      # first_code_line - The first line of actual code following a documentation
      #                   comment block (should be the last matching group returned
      #                   by #comment_extractor)
      #
      # Examples
      #
      #   Docks::Parsers::ERB.instance.parse_result_details('  <div class="tab-list__tab">')
      #   # => 'component', 'tab-list__tab'
      #
      # Returns a tuple of the name and type, both as Strings.

      def parse_result_details(first_code_line)
        first_code_line.strip!

        type = Docks::Types::Symbol::COMPONENT
        name = first_code_line.match(/class\s*=\s*['"]([^\s'"]*)/).captures.first
        return name, type
      end
    end
  end
end
