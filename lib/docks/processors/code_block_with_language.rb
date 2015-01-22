module Docks
  module Processors
    class CodeBlockWithLanguage < Base
      # Public: Processes the passed content by splitting it on commas,
      # spaces, and pipes (and removing associated whitespace).
      #
      # content - An Array or String representing the parsed result.
      #
      # Examples
      #
      #   CodeBlockWithLanguage.process([ 'html',
      #                                   '<div class="foo">Bar</div>',
      #                                   '<div class="bar">Baz</div>' ])
      #   # => {language: 'html', code: "<div class=\"foo\">Bar</div>\n<div class=\"foo\">Bar</div>"}
      #
      # Returns a Hash containing the language and code block.

      def self.process(content)
        result = {}
        return result unless content.kind_of?(Array)

        code = []

        content.each do |line|
          if result[:language].nil?
            result[:language] = if Docks::Language.extensions.include?(line.strip)
              line.strip
            else
              code << line
              Docks::Language.default_language
            end
          else
            code << line
          end
        end

        result[:code] = JoinWithLineBreaks.process(code)
        result
      end
    end
  end
end
