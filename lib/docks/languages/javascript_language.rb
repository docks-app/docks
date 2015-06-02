require_relative "base_language.rb"
require_relative "../parsers/javascript_parser.rb"

module Docks
  module Languages
    class JavaScript < Base
      def self.type; Docks::Types::Languages::SCRIPT end
      def self.extensions; ["js"] end

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
