require_relative "base_language.rb"
require_relative "common_types/markup_language.rb"

require_relative "../renderers/slim_renderer.rb"

module Docks
  module Languages
    class Slim < Base
      include Common::Markup

      def self.type; Docks::Types::Languages::MARKUP end
      def self.extensions; "slim" end

      def helper_markup_for(helper_name, arguments)
        functionize_helper(helper_name, arguments, start_with: "== ")
      end

      def renderer; Docks::Renderers::Slim.new end
    end
  end
end
