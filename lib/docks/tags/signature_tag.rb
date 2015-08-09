module Docks
  module Tags
    class Signature < Base
      def initialize
        @name = :signature
      end

      def process(symbol)
        symbol.update(@name) { |signature| signature.join("\n") }
      end

      def setup_post_processors
        after_each_pattern(:late) do |pattern|
          pattern.symbols.each { |symbol| add_signature(symbol) }
        end
      end

      private

      SYMBOL_TYPES_WITH_SIGNATURES = %w(class factory function mixin)

      def add_signature(symbol)
        return unless source = symbol.source
        language = Languages.language_for(source.file)
        return unless language

        if !symbol.signature && SYMBOL_TYPES_WITH_SIGNATURES.include?(symbol.symbol_type)
          symbol.signature = language.signature_for(symbol)
        end

        symbol.methods.each { |method| add_signature(method) }
      end
    end
  end
end
