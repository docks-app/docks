# @helper
# The name (or invocation to use for generating styleguide markup) for a helper
# function that generates this component. Make sure that if you are providing an
# invocation to generate the markup, you include all possible options so that
# the styleguide will be able to display adjustments to them correctly. If including
# only the name, make sure to either a) include an `@markup` tag within the same
# component showing the invocation, b) include a dedicated markup file in your
# source groups that does the same, or c) include a dedicated stub file in your
# source groups that provides the arguments to use in constructing the markup
# for the styleguide.
#
# Only one allowed.

module Docks
  module Tags
    class Helper < Base
      def initialize
        @name = :helper
      end

      def process(content)
        Docks::Processors::JoinWithLineBreaks.process(content)
      end
    end
  end
end
