module Docks
  module Parsers
    class Base
      include Singleton

      attr_reader :comment_symbol,
                  :pattern_comment_extractor,
                  :comment_extractor,
                  :comment_pattern

      def initialize
        @comment_symbol = "#"
        @pattern_comment_extractor = /(?:^\s*#\*\n)((?:^\s*?\-#[^\n]*\n)*(?:^\s*?\-#[^\n]*@page[^\n]*\n)(?:^\s*?\-#[^\n]*\n)*)/m
        @comment_extractor = /(?:^\s*#\*\n)((?:^\s*?\-#[^\n]*\n)+)\s*([^\n]*)$/m
        @comment_pattern = /^\s*#\s?\n?/m
      end

      def parse(file)
        symbols = []
        file_contents = File.exists?(file) ? File.read(file).gsub(/\r\n?/, "\n") : file

        # Get rid of the page block and, in the process, add the page block
        # to the set of parse results.
        lines_from_pattern_block = 0
        file_contents.sub!(pattern_comment_extractor) do |page_comment_block|
          start_line_number = $`.lines.count
          lines_from_pattern_block = start_line_number + page_comment_block.lines.count

          page_comment_block.sub!(/#{comment_symbol}\*\s*/, '')
          index_of_other_comment = page_comment_block.index("#{comment_symbol}*")
          replacement = index_of_other_comment.nil? ? '' : page_comment_block[index_of_other_comment..-1]
          parseable_block = index_of_other_comment.nil? ? page_comment_block : page_comment_block[0..index_of_other_comment - 1]

          lines_from_pattern_block -= replacement.lines.count

          symbol = parse_comment_block(parseable_block)
          symbol.source = OpenStruct.new(file: file, line_number: start_line_number)
          symbols << symbol

          replacement
        end

        # Scan through each symbols comment block and add it to the list of parsed symbols.
        last_match_position = 0
        while (match = file_contents.match(comment_extractor, last_match_position))
          symbol_details = {}
          symbol_details[:name], symbol_details[:symbol_type] = parse_result_details(match[:first_line])
          symbol = Containers.container_for(symbol_details[:symbol_type]).new(symbol_details)
          parse_comment_block(match[:comments], symbol)
          symbol.source = OpenStruct.new(file: file, line_number: lines_from_pattern_block + match.pre_match.lines.count + match[0].lines.count)
          symbols << symbol

          last_match_position = match.offset(0).last
        end

        symbols
      end

      def parse_comment_block(comment_block, symbol = Containers::Symbol.new)
        # TODO: ensure that pluralized tags are handled first
        if @tag_pattern.nil?
          supported_tags = Tags.supported_tags.sort! { |a, b| b.length <=> a.length }
          @tag_pattern = /(?:\s*@(?<tag>#{supported_tags.join("|")}) ?)?(?<text>.*)/
        end

        last_tag = nil

        comment_block.gsub(comment_pattern, "").strip.split("\n").each do |comment_line|
          line_details = comment_line.match(@tag_pattern)
          next if line_details.nil? || line_details[:text].nil?

          tag, text = line_details[:tag], line_details[:text]

          if tag.nil?
            if last_tag.nil?
              # No tag and no previous tag — must be description
              symbol[Tags::Description] ||= []
              symbol[Tags::Description] << text
            else
              # No tag, but has a previous tag — bundle with last tag. As discussed below,
              # multiple_allowed tags will be represented by an array of arrays, so append
              # this line to the last array within the main array. Otherwise, just append
              # the text to the main array.
              (symbol[last_tag].first.kind_of?(Array) ? symbol[last_tag].last : symbol[last_tag]) << text
            end
          else
            # New tag declaration
            tag = tag.to_sym
            tag_handler = Tags.tag_for(tag)
            multiline = tag_handler.multiline?
            last_tag = multiline ? tag : nil

            # If multiple tags are allowed, each one (the tag declaration, plus the following lines)
            # should be in an array inside the main array for that tag. Otherwise, the array
            # for the tag should only contain strings. If only one of that tag is available per tag,
            # overwrite the existing content. Non-multiline comments are always as minimally-Array-ed
            # as possible (if only one is allowed per file, the tag value will be the line. Otherwise,
            # it is added to a single-dimensional array).
            if tag_handler.multiple_allowed?
              symbol[tag] ||= []
              symbol[tag] << (multiline ? [text] : text)
            else
              symbol[tag] = multiline ? [text] : text
            end
          end
        end

        symbol
      end
    end
  end
end
