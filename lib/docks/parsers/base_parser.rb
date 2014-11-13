module Docks
  module Parsers
    class Base
      # Public: Removes the optional 'Page' documentation block from
      # the file contents. An optional block can be passed to the method
      # to perform additional operations on the 'Page' documentation block.
      #
      # file_contents - The full contents of the file.
      #
      # Yields the 'Page' documentation section to the optional block.
      #
      # Returns the passed string, with the page block removed.

      def self.clean_page_comment(file_contents, &block)
        file_contents.sub(self.page_comment_extractor) do |page_comment_block|
          page_comment_block.sub!(/#{self.comment_symbol}\*\s*\n?/, '')

          if (index_of_other_comment = page_comment_block.index("#{self.comment_symbol}*")).nil?
            ''
          else
            yield(page_comment_block[0..index_of_other_comment]) if block_given?
            page_comment_block[index_of_other_comment..-1]
          end
        end
      end



      # Public: Identifies the name and type of the parse result that is being parsed.
      #
      # first_code_line - The first line of actual code following a documentation
      #                   comment block (should be the last matching group returned
      #                   by #comment_extractor)
      #
      # Returns a touple of the name and type, both as Strings.

      def self.parse_result_details(first_code_line)
        return nil, nil
      end
    end
  end
end
