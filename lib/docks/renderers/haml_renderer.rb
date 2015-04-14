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

      def method_missing(meth, *arguments)
        if helper_module = module_with_helper(meth)
          # Allow access to instance methods
          helper_module.extend helper_module
          begin
            helper_module.send(meth, *arguments)
          rescue NoMethodError => error
            if error.name == :render
              render(*error.args)
            else
              method_missing(error.name.to_sym, *error.args)
            end
          end

        else
          nil
        end
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
