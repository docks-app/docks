defaults =
  #*
  # Determines what action will be taken on the original footnote markup: `"hide"` (using `display: none;`), `"delete"`, or `"ignore"` (leaves the original content in place). This action will also be taken on any elements containing the footnote if they are now empty.
  #
  # @access public
  # @author Chris Sauve
  # @since 0.0.1
  # @returns {String}
  # @default "hide"
  actionOriginalFN    : "hide"

  #*
  # Specifies a function to call on a footnote popover that is being instantiated (before it is added to the DOM). The function will be passed two arguments: `$popover`, which is a jQuery object containing the new popover element, and `$button`, the button that was cblicked to instantiate the popover. This option can be useful for adding additional classes or styling information before a popover appears.
  #
  # @access public
  # @author Chris Sauve
  # @since 0.0.1
  # @type {Function}
  # @default function() {}
  activateCallback    : () -> return
