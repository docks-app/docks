require_relative "base_language.rb"
require_relative "../parsers/less_parser.rb"

module Docks
  module Languages
    class Less < Base
      def self.type; Docks::Types::Languages::STYLE end
      def self.extensions; %w(less) end

      def signature_for(symbol)
        return unless symbol.kind_of?(Containers::Mixin)

        directive = clean_presentation(symbol.name, ".")
        params = symbol.fetch(:param, []).map do |param|
          name, default = param.name, param.default
          param_string = clean_presentation(name)
          param_string << ": #{default}" if default
          param_string
        end

        "#{directive}(#{params.join(", ")}) { /* ... */ }"
      end

      def parser; Docks::Parsers::Less.instance end

      protected

      def clean_presentation(symbol, prefix = "@")
        "#{prefix unless symbol.start_with?(prefix)}#{symbol}"
      end
    end
  end
end
