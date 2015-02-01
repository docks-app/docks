module Docks
  module Tags

    # Public: The tag attributes for `@demo_type`.
    #
    # This tag is only useful in specifying how variations are presented in
    # the pattern library (which, in turn, governs whether they are always
    # visible or toggleable by users of the pattern library). This tag should
    # only be used for states and variants that are not, themselves, specified
    # as tags (which should use the parenthetical options to specify a demo
    # type).

    class DemoType < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@demo_type` name for use in documentation, and will allow only a
      # single line of documentation to be included in the tag.

      def initialize
        @name = :demo_type
        @multiline = false
      end


      # Public: cleans up the access type parsed from the documentation. If
      # the parsed demo type is one of the constants in `Docks::Types::Demo`,
      # it will be returned; otherwise, the default demo type will be
      # returned.
      #
      # See `Docks::Processors::EnsureValidDemoType` for examples.
      #
      # content - The parsed demo type as a String.
      #
      # Returns the original content if it is a valid demo type, or the
      # default demo type otherwise.

      def process(content)
        Docks::Processors::EnsureValidDemoType.process(content)
      end
    end
  end
end
