module Docks
  module Parsers
    class Base
      include Singleton

      attr_reader :comment_symbol,
                  :page_comment_extractor,
                  :comment_extractor,
                  :comment_pattern

      def initialize
        @comment_symbol = "#"
        @page_comment_extractor = /(?:^\s*#\*\n)((?:^\s*?\-#[^\n]*\n)*(?:^\s*?\-#[^\n]*@page[^\n]*\n)(?:^\s*?\-#[^\n]*\n)*)/m
        @comment_extractor = /(?:^\s*#\*\n)((?:^\s*?\-#[^\n]*\n)+)\s*([^\n]*)$/m
        @comment_pattern = /^\s*#\s?\n?/m
      end



      # Public: Parses out all blocks from the passed file contents.
      #
      # file_contents - A String of the text to be parsed.
      #
      # Returns a an Array of Hashes that each represent the parsed result for
      # each comment block.

      def parse(file_contents)
        docs = []

        # Get rid of the page block and, in the process, add the page block
        # to the set of parse results.
        file_contents.sub!(page_comment_extractor) do |page_comment_block|
          page_comment_block.sub!(/#{comment_symbol}\*\s*/, '')
          index_of_other_comment = page_comment_block.index("#{comment_symbol}*")
          replacement = index_of_other_comment.nil? ? '' : page_comment_block[index_of_other_comment..-1]
          parseable_block = index_of_other_comment.nil? ? page_comment_block : page_comment_block[0..index_of_other_comment - 1]

          page_parse_result = { symbol_type: Docks::Types::Symbol::PAGE }
          docs << parse_comment_block(parseable_block, page_parse_result)

          replacement
        end

        # Scan through each docs comment block and add it to the list of parsed docs.
        file_contents.scan(comment_extractor).each do |m|
          parse_result = {}
          parse_result[:name], parse_result[:symbol_type] = parse_result_details(m[1])
          docs << parse_comment_block(m[0], parse_result)
        end

        docs
      end



      # Public: Parses the tags and associated content out of a comment block.
      #
      # comment_block - A String representing a single comment block. All comment
      #                 symbols should be stripped out before being passed here.
      # docs          - A Hash in which to place the tags (keys) and content (values).
      #                 Defaults to a new Hash.
      #
      # Returns a Hash with the tags and their associated content for the block.

      def parse_comment_block(comment_block, docs = {})
        @tag_pattern ||= /(?:\s*@(?<tag>#{Docks::Tag.supported_tags.join("|")}))?\s?(?<text>.*)/

        last_tag = nil

        comment_block.gsub(comment_pattern, "").strip.split("\n").each do |comment_line|
          line_details = comment_line.match(@tag_pattern)
          next if line_details.nil? || line_details[:text].nil?

          tag, text = line_details[:tag], line_details[:text]

          if tag.nil?
            if last_tag.nil?
              # No tag and no previous tag — must be description
              docs[:description] ||= []
              docs[:description] << text
            else
              # No tag, but has a previous tag — bundle with last tag. As discussed below,
              # multiple_allowed tags will be represented by an array of arrays, so append
              # this line to the last array within the main array. Otherwise, just append
              # the text to the main array.
              (docs[last_tag].first.kind_of?(Array) ? docs[last_tag].last : docs[last_tag]) << text
            end
          else
            # New tag declaration
            tag = tag.to_sym
            tag_handler = Docks::Tag.tag_for(tag)
            multiline = tag_handler.multiline?
            last_tag = multiline ? tag : nil

            # If multiple tags are allowed, each one (the tag declaration, plus the following lines)
            # should be in an array inside the main array for that tag. Otherwise, the array
            # for the tag should only contain strings. If only one of that tag is available per tag,
            # overwrite the existing content. Non-multiline comments are always as minimally-Array-ed
            # as possible (if only one is allowed per file, the tag value will be the line. Otherwise,
            # it is added to a single-dimensional array).
            if tag_handler.only_one_per_file_allowed?
              docs[tag] = multiline ? [text] : text
            else
              docs[tag] ||= []
              if !multiline
                docs[tag] << text
              else
                docs[tag] << (tag_handler.multiple_allowed? ? [text] : text)
              end
            end
          end
        end

        docs
      end
    end
  end
end
