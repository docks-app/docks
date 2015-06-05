require_relative "base_language.rb"
require_relative "../parsers/javascript_parser.rb"
require_relative "../symbol_sources/jquery_symbol_source.rb"
require_relative "../symbol_sources/mdn_symbol_source.rb"

module Docks
  module Languages
    class JavaScript < Base
      def self.type; Docks::Types::Languages::SCRIPT end
      def self.extensions; %w(js) end
      def self.symbol_sources; [SymbolSources::JQuery, SymbolSources::MDN] end

      def parser; Docks::Parsers::JavaScript.instance end

      def signature_for(symbol)
        return unless [Types::Symbol::MIXIN, Types::Symbol::FUNCTION, Types::Symbol::FACTORY, Types::Symbol::CLASS].include?(symbol.symbol_type)
        params = symbol.fetch(:params, []).map do |param|
          text = ""
          text << "[" if param.optional
          text << param.name
          text << " = #{param.default}" if param.default
          text << "]" if param.optional
          text
        end

        "function #{symbol.name}(#{params.join(", ")}) { /* ... */ }"
      end
    end
  end
end
