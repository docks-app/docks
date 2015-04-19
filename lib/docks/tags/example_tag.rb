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


      # Public: cleans up the examples parsed from documentation. The example
      # tag is composed of two parts, the first of which is optional. On the
      # same line as the tag, you can provide a language code that will be
      # used to provide syntax highlighting for the example and, optionally, a
      # one-line description separated from the language by a hyphen. If no
      # language is provided, the language will be assumed to be the same as
      # the language of the file currently being parsed. On subsequent lines,
      # provide the code you want to be shown as an example. Make sure to
      # indent the code one extra space (so that the first character of non-
      # indented lines lines up with the first character of the example tag).
      #
      # See `Docks::Processors::CodeBlockWithLanguageAndDescription` for
      # examples.
      #
      # content - An Array of Strings representing the lines of the tag.
      #
      # Returns a Hash with the code, language, and description of the example.

      def process(content)
        content = Docks::Processors::CodeBlockWithLanguageAndDescription.process(content)
        content[:language] ||= Docks::Language.extension_for_file(Docks::Parser.current_file)
        content
      end
    end
  end
end
