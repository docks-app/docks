module Docks
  module Tags

    # Public: The tag attributes for `@active`.
    #
    # This is a directive related solely to the appearance of the pattern
    # library. No value is required — the presence of this tag (unless it is
    # set explicitly to `false`) will automatically activate this variation
    # when someone hits the pattern library page (if the variation is a
    # `select`-style variation — see `Docks::Tags::Variant`,
    # `Docks::Tags::State`, and `Docks::Tags::DemoType` for details.

    class Active < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@active` name for use in documentation, and will allow only a single
      # line of documentation to be included in the tag.

      def initialize
        @name = :active
        @multiline = false
      end


      # Public: Proccesses the parsed documentation into a boolean indicating
      # whether or not the symbol should be active by default.
      #
      # See `Docks::Processors::StringyBoolean` for examples.
      #
      # content - The line parsed from the documentation.
      #
      # Returns a Boolean.

      def process(content)
        Docks::Processors::StringyBoolean(content)
      end
    end
  end
end
