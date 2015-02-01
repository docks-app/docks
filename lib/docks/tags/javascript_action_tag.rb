module Docks
  module Tags

    # Public: The tag attributes for `@javascript_action`.
    #
    # This tag is only useful in the context of variations with "select"
    # demo_type that are detached from the base class (that is, where you are
    # providing a separate documentation block just for that variation rather
    # than including it as a `state` or `variant` tag on the base component;
    # when doing an inline `variation`/ `component`, include this argument as
    # part of the options parentheses). This action will be run instead of
    # just adding/ removing the class when the select button is activated/
    # deactivated. This can be useful when a given variation has markup
    # implications other than *just* the class.
    #
    # When writing this action, write only the operations required to activate
    # that variation. `this` will be bound to the component for which the
    # variation is being activated/ deactivated. The action required to
    # deactivate the component will be inferred from this action. For example,
    # this javascript action: `$(this).addClass("button--is-
    # disabled").attr("disabled", true)` will execute as
    # `$(this).removeClass("button--is-disabled").attr("disabled", false)`
    # when the variation is being deactivated.

    class JavascriptAction < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@javascript_action` name for use in documentation, and will allow only
      # a single line of documentation to be included in the tag.

      def initialize
        @name = :javascript_action
        @multiline = false
      end
    end
  end
end
