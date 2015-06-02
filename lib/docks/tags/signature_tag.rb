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
          (pattern.functions + pattern.mixins + pattern.factories + pattern.classes).each do |needs_signature|
            next unless (source = needs_signature.source)
            language = Languages.language_for(source.file)
            next unless language

            needs_signature.signature ||= language.signature_for(needs_signature)
            needs_signature.fetch(:methods, []).each { |meth| meth.signature ||= language.signature_for(meth) }
          end
        end
      end
    end
  end
end
