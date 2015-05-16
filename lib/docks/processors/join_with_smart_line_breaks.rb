module Docks
  module Processors
    # TESTS TO ADD: symbols at the start of the line
    class JoinWithSmartLineBreaks < Base
      CODE_BLOCK_INDICATOR = "```"
      LIST_ITEM_INDICATOR = /^(?:\*|\-|\d+\.)/
      HEADING_INDICATOR = /^#+/
      HEADING_UNDERLINE_INDICATOR = /^[=\-]+/

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
        in_list = false
        at_start_of_paragraph = true

        content.each_with_index do |line, index|
          stripped_line = line.strip

          if stripped_line.start_with?(CODE_BLOCK_INDICATOR)
            # Either the start or end of a code block
            if in_code_block
              in_code_block = false
              at_start_of_paragraph = true

              text << "\n#{line}#{join}"
            else
              in_code_block = true
              text << "#{join}#{line}"
            end

          elsif in_code_block || (in_list && stripped_line =~ LIST_ITEM_INDICATOR)
            # Either:
            # 1. In a code block — just keep appending lines, or
            # 2. Last item was a list item and this item is directly below it,
            #    so just add that line below.
            text << "\n#{line}"

          elsif stripped_line.length == 0
            # Empty line — new paragraph
            at_start_of_paragraph = true

            text << join

          elsif stripped_line =~ LIST_ITEM_INDICATOR && at_start_of_paragraph
            # Line that looks like a list item and we're ready for a new paragraph
            in_list = true
            at_start_of_paragraph = false

            text << line

          elsif stripped_line =~ HEADING_INDICATOR
            # Starts and ends a "## Header"-style heading
            at_start_of_paragraph = true
            text << "\n#{line}\n"

          elsif stripped_line =~ HEADING_UNDERLINE_INDICATOR
            # Ends a "Header\n======"-style heading
            at_start_of_paragraph = true
            text << "#{line}#{join}"

          elsif content[index + 1] && content[index + 1].strip =~ HEADING_UNDERLINE_INDICATOR
            # Start of a "Header\n======"-style heading
            text << "\n#{line}\n"

          elsif at_start_of_paragraph
            # New line at the start of a regular paragraph
            at_start_of_paragraph = false
            in_list = false

            text << line

          else
            # Line that isn't at the start of a paragraph — pin it to the previous line.
            text << " #{stripped_line}"
          end
        end

        text.strip!
        text.gsub!(/\n{3,}/, "\n\n")
        text.length > 0 ? text : nil
      end
    end
  end
end
