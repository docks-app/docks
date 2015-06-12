require_relative "base_renderer.rb"
require_relative "common_features/helperable.rb"
require_relative "common_features/capturable.rb"

module Docks
  module Renderers
    class Haml < Base
      include Common::Helperable
      include Common::Capturable

      def initialize
        require "haml"
        super
      end

      def render(template, locals = {})
        old_buffer, @haml_buffer = @haml_buffer, nil

        content, layout, locals = normalize_content_and_locals(template, locals)
        return if content.nil?

        content = ::Haml::Engine.new(content).render(binding, locals)
        return content if layout.nil?

        ::Haml::Engine.new(layout).render(binding, locals) do |name|
          name.nil? ? content : @content_blocks[name]
        end
      ensure
        @haml_buffer = old_buffer
      end

      def capture(*args, &block)
        capture_haml(*args, &block)
      end
    end
  end
end
