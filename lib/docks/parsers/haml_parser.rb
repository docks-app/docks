module Docks
  module Parsers
    class Haml < Docks::Parsers::Base
      # Public: Returns the symbol used to identify comments.
      def self.comment_symbol; "\-#" end

      # Public: Returns the RegExp used to extract the 'Page' portion of
      # a file's documentation.
      def self.page_comment_extractor; /(?:^\s*\-#\*\n)((?:^\s*?\-#[^\n]*\n)*(?:^\s*?\-#[^\n]*@page[^\n]*\n)(?:^\s*?\-#[^\n]*\n)*)/m end

      # Public: Returns the RegExp used to extract a documentation comment
      # block.
      def self.comment_extractor; /(?:^\s*\-#\*\n)((?:^\s*?\-#[^\n]*\n)+)\s*([^\n]*)$/m end

      # Public: Returns the RegExp used to identify a commented line within
      # the comment block.
      def self.comment_pattern; /^\s*\-#\s?\n?/m end



      # Public: Identifies the name and type of the parse result that is being parsed.
      #
      # first_code_line - The first line of actual code following a documentation
      #                   comment block (should be the last matching group returned
      #                   by #comment_extractor)
      #
      # Examples
      #
      #   Docks::Parsers::Haml.parse_result_details('  %div.tab-list__tab')
      #   # => 'component', 'tab-list__tab'
      #
      # Returns a touple of the name and type, both as Strings.

      def self.parse_result_details(first_code_line)
        first_code_line.strip!

        type = Docks::Types::Symbol::COMPONENT
        name = first_code_line.match(/^\s*(?:[^\.]*\.)([\-_a-zA-Z]*)/).captures.first

        return name, type
      end
    end
  end
end
