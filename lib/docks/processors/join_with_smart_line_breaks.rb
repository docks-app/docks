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
      #   JoinWithSmartLineBreaks.process(['One paragraph that', 'spans two lines.', 'And another!'])
      #   # => "One paragraph that spans two lines.\n\nAnd another!"
      #
      #   JoinWithSmartLineBreaks.process(['One paragraph', '```html', '<p>A code block</p>', '```', 'another paragraph.'])
      #   # => "One paragraph.\n\n```html\n<p>A code block</p>\n```\n\nanother paragraph"
      #
      # Returns the processed string.

      def self.process(content, join = "\n\n")
        return content unless content.kind_of?(Array)

        text = ''
        in_code_block = false

        content.each do |line|
          if line.start_with?('```')
            if in_code_block
              in_code_block = false
              text << "\n#{line}#{join}"
            else
              in_code_block = true
              text << "#{join}#{line}"
            end
          elsif in_code_block
            text << "\n#{line}"
          elsif text == ''
            text = line
          else
            first_char = line[0, 1]
            text << (first_char =~ /[A-Za-z]/ && first_char == first_char.upcase ? "#{join}#{line}" : " #{line}")
          end
        end

        text.strip!
        text.length > 0 ? text : nil
      end
    end
  end
end
