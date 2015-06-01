require_relative "../processors.rb"

module Docks
  module Tags

    # Public: The base tag from which bundled and custom tags can inherit.

    class Base
      include Singleton
      include Processors

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
      # should be a constant under Docks::Types::Tags.
      #
      # Returns a constant from Docks::Types::Tags.

      def type
        @type ||= Docks::Types::Tags::ONE_PER_BLOCK
      end

      def parseable?
        @parseable = true if @parseable.nil?
        @parseable
      end


      # Public: Lists all tag names that are synonymous with `@name`.
      # Returns an Array of Symbols.

      def synonyms
        @synonyms ||= []
      end


      # Public: Indicates whether this tag is only allowed once per file.
      # Returns a Boolean.

      def only_one_per_file_allowed?
        type == Docks::Types::Tags::ONE_PER_FILE
      end


      # Public: Indicates whether this tag can be used more than once in a
      # given block. To see whether the tag can include more than one result
      # on a given *line*, use `#multiple_per_line_allowed?`.
      #
      # Returns a Boolean.

      def multiple_allowed?
        multiple_per_line_allowed? || type == Docks::Types::Tags::MULTIPLE_PER_BLOCK
      end


      # Public: Indicates whether this tag can be used more than once on a
      # given line.
      #
      # Returns a Boolean.

      def multiple_per_line_allowed?
        type == Docks::Types::Tags::MULTIPLE_PER_LINE
      end

      def process(symbol); symbol end

      def setup_post_processors; end

      protected

      def after_each_pattern(hook = nil, &block)
        Process.register_pattern_processor(hook, &block)
      end

      def after_all(hook = nil, &block)
        Process.register_pattern_library_processor(hook, &block)
      end
    end
  end
end
