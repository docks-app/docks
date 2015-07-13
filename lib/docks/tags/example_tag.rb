module Docks
  module Tags
    class Example < Base
      def initialize
        @name = :example
        @multiple_allowed = true
      end

      def process(symbol)
        symbol.update(@name) do |examples|
          examples.map do |example|
            example = code_block_with_language_and_description(example)
            example[:language] ||= Docks::Languages.extension_for_file(Docks.current_file)
            OpenStruct.new(example)
          end
        end
      end
    end
  end
end
