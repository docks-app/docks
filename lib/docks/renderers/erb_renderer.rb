require_relative "base_renderer.rb"
require_relative "common_features/helperable.rb"
require_relative "common_features/capturable.rb"

module Docks
  module Renderers
    class ERB < Base
      include Common::Helperable
      include Common::Capturable

      def initialize
        require "erb"

        super
        @locals = []
        @output = ""
      end

      def render(template, locals = {})
        first_pass = @output.length < 1
        final_output, @output = @output, ""

        content, layout, locals = normalize_content_and_locals(template, locals)
        return if content.nil?

        @locals << locals
        content = ::ERB.new(content, nil, nil, "@output").result(get_binding)
        return content if layout.nil?

        ::ERB.new(layout, nil, nil, "@output").result(get_binding { |name| name.nil? ? content : @content_blocks[name] })

      ensure
        @locals.pop
        @output = first_pass ? "" : final_output
      end

      def get_binding
        binding
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
        super if @locals.empty?
        @locals.last.fetch(meth)
      rescue KeyError
        super
      end

      private

      def clean
        super
        @locals = []
      end
    end
  end
end
