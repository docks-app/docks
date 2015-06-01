module Docks
  module Tags

    # Public: The tag attributes for `@example`.
    #
    # This tag allows you to specify one or more clarifying examples related
    # to the current symbol. Where usage of a function, mixin, or component is
    # non-obvious, it can be extremely helpful to present such examples.

    class Example < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@example` name for use in documentation, allows multiple lines per
      # tag, and allows multiple instances of this tag per block.

      def initialize
        @name = :example
        @type = Docks::Types::Tags::MULTIPLE_PER_BLOCK
      end

      def process(symbol)
        symbol.update(@name) do |examples|
          examples.map do |example|
            example = code_block_with_language_and_description(example)
            example[:language] ||= Docks::Languages.extension_for_file(Docks::Parser.current_file)
            OpenStruct.new(example)
          end
        end
      end
    end
  end
end
