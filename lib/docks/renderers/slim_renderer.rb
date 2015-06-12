require_relative "base_renderer.rb"
require_relative "common_features/helperable.rb"
require_relative "common_features/capturable.rb"

module Docks
  module Renderers
    class Slim < Base
      include Common::Helperable
      include Common::Capturable

      def initialize
        require "slim"
        super
      end

      def render(template, locals = {})
        content, layout, locals = normalize_content_and_locals(template, locals)
        return if content.nil?

        content = ::Slim::Template.new { content }.render(self, locals)
        return content if layout.nil?

        ::Slim::Template.new { layout }.render(self, locals) do |name|
          name.nil? ? content : @content_blocks[name]
        end
      end

      def capture(*args, &block)
        yield *args
      end
    end
  end
end
