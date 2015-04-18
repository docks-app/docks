require File.expand_path("../base_renderer.rb", __FILE__)
require File.expand_path("../store_helpers.rb", __FILE__)

module Docks
  module Renderers
    class ERB < Base
      include StoreHelpers

      def initialize
        require "erb"

        super
        @locals = []
        @output = ""
        @content_blocks = Hash.new
      end

      def render(template, locals = {})
        first_pass = @output.length < 1
        final_output, @output = @output, ""

        content, layout, locals = normalize_content_and_locals(template, locals)
        return if content.nil?

        cache_locals(locals) do
          content = ::ERB.new(content, nil, nil, "@output").result(get_binding)

          if layout
            content = ::ERB.new(layout, nil, nil, "@output").result(get_binding do |name|
              name.nil? ? content : @content_blocks[name]
            end
            )
          end
        end

        @output = first_pass ? "" : final_output
        content
      end

      def get_binding
        binding
      end

      def content_for(name, &block)
        if block_given?
          @content_blocks[name] = capture(&block)
        else
          @content_blocks[name]
        end
      end

      def content_for?(name, &block)
        !@content_blocks[name].nil?
      end

      def capture(&block)
        old_output, @output = @output, ""
        yield
        content = @output
        @output = old_output
        content
      end

      def concat(content)
        @output << content
      end

      def method_missing(meth, *arguments, &block)
        @locals.last[meth.to_sym] unless @locals.empty?
      end

      private

      def cache_locals(locals)
        @locals << locals
        result = yield
        @locals.pop
        result
      end

      def clean
        super
        @locals = []
      end
    end
  end
end
