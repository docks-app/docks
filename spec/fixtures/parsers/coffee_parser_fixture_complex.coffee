#*
# @page Bigfoot

# The best footnote plugin around.

#*
# Groups the ID and HREF of a superscript/ anchor tag pair in data attributes.
# This resolves the issue of the href and backlink id being separated between the two elements.

# @param {jQuery} $footnoteAnchors   - Anchors that link to footnotes.
# @param {Array}  footnoteLinks ([]) - An array on which the new anchors will be pushed.

# @returns {undefined}

cleanFootnoteLinks = ($footnoteAnchors, footnoteLinks = []) ->
  $parent = undefined
  $supChild = undefined
  linkHREF = undefined
  linkID = undefined

  # Problem: backlink ID might point to containing superscript of the fn link
  # Solution: Check if there is a superscript and move the href/ ID up to it.
  # The combined id/ href of the sup/a pair are stored in sup using data attributes
  $footnoteAnchors.each ->
    $this = $(this)
    linkHREF = "#" + ($this.attr("href")).split("#")[1] # just the fragment ID
    $parent = $this.closest(settings.anchorParentTagname)
    $child = $this.find(settings.anchorParentTagname)

defaults =
  #*
  # Determines what action will be taken on the original footnote markup: `"hide"` (using `display: none;`), `"delete"`, or `"ignore"` (leaves the original content in place). This action will also be taken on any elements containing the footnote if they are now empty.
  #
  # @access public
  # @default "hide"
  actionOriginalFN    : "hide"

  #*
  # Specifies a function to call on a footnote popover that is being instantiated (before it is added to the DOM). The function will be passed two arguments: `$popover`, which is a jQuery object containing the new popover element, and `$button`, the button that was cblicked to instantiate the popover. This option can be useful for adding additional classes or styling information before a popover appears.
  #
  # @default function() {}
  activateCallback    : () -> return

#*
# Footnote button/ content initializer (run on doc.ready).
# Finds the likely footnote links and then uses their target to find the content.
#
# @returns {undefined}

footnoteInit = ->
  # Get all of the possible footnote links
  footnoteButtonSearchQuery = if settings.scope
                  "#{settings.scope} a[href*=\"#\"]"
                else
                  "a[href*=\"#\"]"

  # Filter down to links that:
  # - have an HREF referencing a footnote, OR
  # - have a rel attribute of footnote
  # - aren't a descendant of a footnote (prevents backlinks)
  $footnoteAnchors = $(footnoteButtonSearchQuery).filter ->
    $this = $(this)
    relAttr = $this.attr "rel"
    relAttr = "" if relAttr == "null" || !relAttr?
    "#{$this.attr "href"}#{relAttr}".match(settings.anchorPattern) && $this.closest("[class*=#{settings.footnoteParentClass}]:not(a):not(#{settings.anchorParentTagname})").length < 1

      #*
      # Removes any links from the footnote back to the footnote link as these don't make sense when the footnote is shown inline
      #
      # @param {String} footnoteHTML - The string version of the new footnote.
      # @param {String} backlinkID   - The ID of the footnote link (that is to be removed from the footnote HTML).
      #
      # @returns {String} - The new HTML string with the relevant links taken out.

      removeBackLinks = (footnoteHTML, backlinkID) ->
        # First, though, take care of multiple ID's by getting rid of spaces
        backlinkID = backlinkID.trim().replace(/\s+/g, "|")
                                      .replace(/(.*)/g, "($1)") if backlinkID.indexOf(' ') >= 0
