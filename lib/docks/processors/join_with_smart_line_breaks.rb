module Docks
  module Processors
    # TESTS TO ADD: symbols at the start of the line
    class JoinWithSmartLineBreaks < Base
      # Public: Processes the passed content by joining it with line breaks as required.
      # to create markdown-parsable paragraphs and code blocks.
      #
      # content - An Array representing the parsed result.
      # join    - The string with which to join two different paragraphs together.
      #
      # Examples
      #
      #   JoinWithSmartLineBreaks.process(["One paragraph that", "spans two lines.", "And another!"])
      #   # => "One paragraph that spans two lines.\n\nAnd another!"
      #
      #   JoinWithSmartLineBreaks.process(["One paragraph", "```html", "<p>A code block</p>", "```", "another paragraph."])
      #   # => "One paragraph.\n\n```html\n<p>A code block</p>\n```\n\nanother paragraph"
      #
      # Returns the processed string.

      def self.process(content, join = "\n\n")
        return content unless content.kind_of?(Array)

        text = ""
        in_code_block = false
        in_paragraph = false

        content.each do |line|
          stripped_line = line.strip

          if line.start_with?("```")
            in_paragraph = false

            if in_code_block
              in_code_block = false
              text << "\n#{line}#{join}"
            else
              in_code_block = true
              text << "#{join}#{line}"
            end

          elsif in_code_block
            text << "\n#{line}"
          elsif text.length == 0 && stripped_line.length > 0
            text = line
            in_paragraph = true
          elsif stripped_line.length == 0
            text << join
            in_paragraph = false
          else
            first_char = stripped_line[0, 1]

            new_line_chunk = if !in_paragraph
              line
            elsif first_char =~ /[A-Za-z]/ && first_char == first_char.upcase
              "#{join}#{line}"
            else
              " #{stripped_line}"
            end

            in_paragraph = true
            text << new_line_chunk
          end
        end

        text.strip!
        text.length > 0 ? text : nil
      end
    end
  end
end
