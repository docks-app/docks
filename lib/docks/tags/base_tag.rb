module Docks
  module Tags

    # Public: The base tag from which bundled and custom tags can inherit.

    class Base
      include Singleton

      # Public: gets the primary tag name (as a Symbol).
      attr_reader :name


      # Public: Indicates whether or not the tag should accept multiple lines
      # of content. If `false`, only the first line will be appended to the
      # array of parse results, and the description can appear after this tag.
      # Otherwise, each line after the tag opens until another tag starts (or
      # the documentation block ends) will be appended to a nested array of
      # results.
      #
      # Returns a Boolean whether the tag accepts multiline content.

      def multiline?
        @multiline = true if @multiline.nil?
        @multiline
      end


      # Public: Indicates the type of tag, which will govern how many parse
      # results can be pulled out of a single documentation block. The type
      # should be a constant under Docks::Types::Tag.
      #
      # Returns a constant from Docks::Types::Tag.

      def type
        @type ||= Docks::Types::Tag::ONE_PER_BLOCK
        @type
      end


      # Public: Lists all tag names that are synonymous with `@name`.
      # Returns an Array of Symbols.

      def synonyms
        @synonyms ||= []
        @synonyms
      end


      # Public: Lists all post-processors that this tag needs to be run when
      # it is included in the parse results for a given file.
      #
      # Returns an Array of post-processor objects, each of which should
      # conform to Docks::PostProcessors::Base.

      def post_processors
        @post_processors ||= []
        @post_processors
      end


      # Public: Indicates whether this tag is only allowed once per file.
      # Returns a Boolean.

      def only_one_per_file_allowed?
        type == Docks::Types::Tag::ONE_PER_FILE
      end


      # Public: Indicates whether this tag can be used more than once in a
      # given block. To see whether the tag can include more than one result
      # on a given *line*, use `#multiple_per_line_allowed?`.
      #
      # Returns a Boolean.

      def multiple_allowed?
        multiple_per_line_allowed? || type == Docks::Types::Tag::MULTIPLE_PER_BLOCK
      end


      # Public: Indicates whether this tag can be used more than once on a
      # given line.
      #
      # Returns a Boolean.

      def multiple_per_line_allowed?
        type == Docks::Types::Tag::MULTIPLE_PER_LINE
      end


      # Public: Takes in the content that was derived from parsing one or more
      # lines denoted by this tag and return the final representation of the
      # parse result as it will appear to the pattern library views.
      #
      # content - A String or Array of Strings that were parsed for the tag.
      # an Array of Strings represents each line of a tag's parse result when
      # that tag allows for multiline content (see `#multiline`) — a single
      # String is passed when the tag does not allowe multiline content.

      def process(content)
        content
      end
    end


    @@bundled_tags = nil

    # Public: Collects all fully implemented tags that are bundled as part of
    # Docks (this excludes Docks::Tags::Base, which is meant to be extended
    # and is not an actual tag).
    #
    # Returns an Array of Classes.

    def self.bundled_tags
      if @@bundled_tags.nil?
        bundled = constants.select do |const|
          klass = const_get(const)
          Class === klass && !(klass.eql?(Base))
        end

        @@bundled_tags = bundled.map { |const| const_get(const) }
      end

      @@bundled_tags
    end
  end
end
