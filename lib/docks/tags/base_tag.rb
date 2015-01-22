require "singleton"

module Docks
  module Tags
    class Base
      include Singleton

      attr_reader :name

      def multiline?
        @multiline = true if @multiline.nil?
        @multiline
      end

      def type
        @type ||= Docks::Types::Tag::ONE_PER_BLOCK
        @type
      end

      def synonyms
        @synonyms ||= []
        @synonyms
      end

      def post_processors
        @post_processors ||= []
        @post_processors
      end

      def only_one_per_file_allowed?
        type == Docks::Types::Tag::ONE_PER_FILE
      end

      def multiple_allowed?
        multiple_per_line_allowed? || type == Docks::Types::Tag::MULTIPLE_PER_BLOCK
      end

      def multiple_per_line_allowed?
        type == Docks::Types::Tag::MULTIPLE_PER_LINE
      end

      def process(content)
        Docks::Processors::JoinWithBlanks.process(content)
      end
    end

    @@bundled_tags = nil

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
