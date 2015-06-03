require_relative "base_language.rb"
require_relative "../parsers/coffeescript_parser.rb"

module Docks
  module Languages
    class CoffeeScript < Base
      def self.type; Docks::Types::Languages::SCRIPT end
      def self.extensions; %w(coffee coffeescript) end

      def parser; Docks::Parsers::CoffeeScript.instance end

      def signature_for(symbol)
        is_class = symbol.symbol_type == Types::Symbol::CLASS
        return unless is_class || [Types::Symbol::MIXIN, Types::Symbol::FUNCTION, Types::Symbol::FACTORY].include?(symbol.symbol_type)
        params = symbol.fetch(:params, [])

        presentation = is_class ? "class #{symbol.name}\n  constructor: " : "#{symbol.name} = "
        presentation << "(#{params.map { |param| "#{param.name}#{" = #{param.default}" if param.default}" }.join(", ")}) " unless params.empty?
        "#{presentation}-> # ..."
      end
    end
  end
end
