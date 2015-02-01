module Docks
  module Tags

    # Public: The tag attributes for `@access`.
    #
    # Specifies whether or not there is a restriction on access to this
    # symbol. The value assigned to this tag must be either `public` or
    # `private`. No default value is assumed.

    class Access < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@access` name for use in documentation, and will allow only a single
      # line of documentation to be included in the tag.

      def initialize
        @name = :access
        @multiline = false
        @access_types = Docks::Types::Access.constants.map do |const|
          Docks::Types::Access.const_get(const)
        end
      end


      # Public: cleans up the access type parsed from the documentation. If
      # the parsed access type is one of the constants in
      # `Docks::Types::Access`, it will be returned; otherwise, `nil` will be
      # returned.
      #
      # content - The parsed access type as a String.
      #
      # Returns the original content if it is a valid access type, `nil`
      # otherwise.

      def process(content)
        @access_types.include?(content) ? content : nil
      end
    end
  end
end
