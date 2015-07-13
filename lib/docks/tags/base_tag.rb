require_relative "../processors.rb"

module Docks
  module Tags

    # Public: The base tag from which bundled and custom tags can inherit.

    class Base
      include Singleton
      include Processors

      attr_reader :name

      def multiline?
        @multiline = true if @multiline.nil?
        @multiline
      end

      def multiple_allowed?
        @multiple_allowed = false if @multiple_allowed.nil?
        @multiple_allowed
      end

      def type
        @type ||= Docks::Types::Tags::ONE_PER_BLOCK
      end

      def parseable?
        @parseable = true if @parseable.nil?
        @parseable
      end

      def synonyms
        @synonyms ||= []
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
