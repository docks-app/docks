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

      def process(symbol)
        symbol.update(@name) { |demo_type| ensure_valid_demo_type(demo_type) }
      end
    end
  end
end
