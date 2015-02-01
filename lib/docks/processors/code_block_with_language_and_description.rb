module Docks
  module Processors
    class CodeBlockWithLanguageAndDescription < Base
      # Public: Processes the passed content by splitting it on commas,
      # spaces, and pipes (and removing associated whitespace).
      #
      # content - An Array or String representing the parsed result.
      #
      # Examples
      #
      #   CodeBlockWithLanguage.process([ "html - The markup.",
      #                                   "<div class="foo">Bar</div>",
      #                                   "<div class="bar">Baz</div>" ])
      #   # => {language: "html", description: "The markup", code: "<div class=\"foo\">Bar</div>\n<div class=\"foo\">Bar</div>"}
      #
      #   CodeBlockWithLanguage.process([ "<div class="foo">Bar</div>",
      #                                   "<div class="bar">Baz</div>" ])
      #   # => {code: "<div class=\"foo\">Bar</div>\n<div class=\"foo\">Bar</div>"}
      #
      # Returns a Hash containing the language, description, and code block.

      def self.process(content)
        result = {}
        possible_line_details = content.first.strip.split(/\s*\-\s*/, 2)

        if Docks::Language.extensions.include?(possible_line_details.first)
          result[:language] = possible_line_details.first
          result[:description] = possible_line_details[1]
          content.shift
        end

        result[:code] = JoinWithLineBreaks.process(content)
        result
      end
    end
  end
end
