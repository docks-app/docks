require_relative "base_language.rb"
require_relative "common_types/markup_language.rb"

require_relative "../renderers/erb_renderer.rb"

module Docks
  module Languages
    class ERB < Base
      include Common::Markup

      def self.type; Docks::Types::Languages::MARKUP end
      def self.extensions; %w(erb) end

      def helper_markup_for(helper_name, arguments)
        functionize_helper(helper_name, arguments, start_with: "<%= ", end_with: " %>")
      end

      def renderer; Docks::Renderers::ERB.new end
    end
  end
end
