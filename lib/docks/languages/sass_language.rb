require_relative "base_language.rb"
require_relative "../parsers/sass_parser.rb"
require_relative "../symbol_sources/sass_symbol_source.rb"

module Docks
  module Languages
    class Sass < Base
      def self.type; Docks::Types::Languages::STYLE end
      def self.extensions; %w(scss sass) end
      def self.symbol_sources; SymbolSources::Sass end

      def signature_for(symbol)
        return unless [Types::Symbol::FUNCTION, Types::Symbol::MIXIN].include?(symbol.symbol_type)
        directive = "@#{symbol.symbol_type == Types::Symbol::FUNCTION ? "function" : "mixin"} #{symbol.name}"

        params = symbol.fetch(:params, []).map do |param|
          name, default = param.name, param.default
          param_string = variable_presentation(name)
          param_string << ": #{default}" if default
          param_string
        end

        "#{directive}(#{params.join(", ")}) { /* ... */ }"
      end

      def parser; Docks::Parsers::Sass.instance end

      protected

      def variable_presentation(symbol, type = :variable)
        prefix = type == :variable ? "$" : "%"
        "#{prefix unless symbol.start_with?(prefix)}#{symbol}"
      end
    end
  end
end
