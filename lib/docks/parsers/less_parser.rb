require File.expand_path("../scss_parser.rb", __FILE__)

module Docks
  module Parsers
    class Less < SCSS

      def initialize
        super
      end


      # Public: Identifies the name and type of the parse result that is being parsed.
      #
      # first_code_line - The first line of actual code following a documentation
      #                   comment block (should be the last matching group returned
      #                   by #comment_extractor)
      #
      # Examples
      #
      #   Docks::Parsers::Less.instance.parse_result_details(".clearfix() {")
      #   # => "clearfix", "mixin"
      #
      #   Docks::Parsers::Less.instance.parse_result_details("&--is-active {")
      #   # => "--is-active", "state"
      #
      # Returns a tuple of the name and type, both as Strings.

      def parse_result_details(first_code_line)
        first_code_line.strip!

        type = case first_code_line
          when /^.[^\(]*\(/ then Docks::Types::Symbol::MIXIN
          when /^@/ then Docks::Types::Symbol::VARIABLE
          when /(\.|\-\-)?(?:is|js)\-/ then Docks::Types::Symbol::STATE
          when /\-\-(?:[a-zA-Z][\-_]?)*/ then Docks::Types::Symbol::VARIANT
          else Docks::Types::Symbol::COMPONENT
        end

        name = first_code_line.match(/^\s*&?[@\.#]?\s*([^\s\(\:]*)/).captures.first
        return name, type
      end
    end
  end
end
