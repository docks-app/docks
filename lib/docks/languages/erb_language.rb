require_relative "base_language.rb"
require_relative "common_types/markup_language.rb"

require_relative "../renderers/erb_renderer.rb"
require_relative "../parsers/erb_parser.rb"

module Docks
  module Languages
    class ERB < Base
      include Common::Markup

      def self.type; Docks::Types::Languages::MARKUP end
      def self.extensions; "erb" end

      def helper_markup_for(helper_name, arguments)
        functionize_helper(helper_name, arguments, start_with: "<%= ", end_with: " %>")
      end

      def parser; Docks::Parsers::ERB.instance end
      def renderer; Docks::Renderers::ERB.instance end
    end
  end
end
