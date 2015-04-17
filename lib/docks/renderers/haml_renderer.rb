require File.expand_path("../base_renderer.rb", __FILE__)
require File.expand_path("../store_helpers.rb", __FILE__)

module Docks
  module Renderers
    class Haml < Base
      include StoreHelpers

      def initialize
        require "haml"

        super
        @locals = []
      end

      def render(template, locals = {})
        content, locals = normalize_content_and_locals(template, locals)
        return if content.nil?

        ::Haml::Engine.new(content).render(binding, locals)
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
