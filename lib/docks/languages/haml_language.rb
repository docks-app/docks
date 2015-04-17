require File.expand_path("../base_language.rb", __FILE__)
require File.expand_path("../markup_language.rb", __FILE__)
require File.expand_path("../../renderers/erb_renderer.rb", __FILE__)

module Docks
  module Languages
    class Haml < Base
      include MarkupLanguage

      def self.type; Docks::Types::Languages::MARKUP end
      def self.parser; Docks::Parsers::Haml end
      def self.extensions; "haml" end

      def helper_markup_for(helper_name, arguments)
        functionize_helper(helper_name, arguments, start_with: "= ")
      end

      def renderer
        Docks::Renderers::Haml.instance
      end
    end
  end
end
