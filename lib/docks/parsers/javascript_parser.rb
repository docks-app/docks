require_relative "base_parser.rb"

module Docks
  module Parsers
    class JavaScript < Base
      def initialize
        @comment_pattern = /(?:\/\/|\/\*|\*\/?)/
        @first_non_code_line_pattern = /[\w\$]/
        setup_regexes
      end

      def symbol_details_from_first_line(first_code_line)
        first_code_line.strip!

        type = case first_code_line
          when /^class/ then Docks::Types::Symbol::CLASS
          when /(?:function|=>)/ then Docks::Types::Symbol::FUNCTION
          else Docks::Types::Symbol::VARIABLE
        end

        clean_first_line = first_code_line.split(/[=:,\(]/).first.split(/[\.\s]/).last.strip
        bracket_check = clean_first_line.split(/['"]/)

        name = bracket_check.length > 1 ? bracket_check[-2] : clean_first_line

        { name: name, symbol_type: type }
      end
    end
  end
end
