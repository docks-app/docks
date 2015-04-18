require File.expand_path("../base_renderer.rb", __FILE__)
require File.expand_path("../store_helpers.rb", __FILE__)

module Docks
  module Renderers
    class Haml < Base
      include StoreHelpers

      def initialize
        require "haml"

        self.class.send(:include, ::Haml::Helpers)
        init_haml_helpers

        super
        @locals = []
        @in_render = false
        @content_blocks = Hash.new
      end

      def render(template, locals = {})
        old_buffer, @haml_buffer = @haml_buffer, nil

        content, layout, locals = normalize_content_and_locals(template, locals)
        return if content.nil?

        content = ::Haml::Engine.new(content).render(binding, locals)

        if layout
          content = ::Haml::Engine.new(layout).render(binding, locals) do |name|
            name.nil? ? content : @content_blocks[name]
          end
        end

        @haml_buffer = old_buffer
        content
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
        capture_haml(&block)
      end

      def concat(content)
        content
      end

      def method_missing(meth, *arguments)
        nil
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
