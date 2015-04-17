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
      end

      def render(template, locals = {})
        first_pass = @output.length < 1
        final_output, @output = @output, ""

        content, locals = normalize_content_and_locals(template, locals)
        return if content.nil?

        cache_locals(locals) { content = ::ERB.new(content, nil, nil, "@output").result(binding) }

        @output = first_pass ? "" : final_output
        content
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
