BASE_CLASS = "popover"

CLASSES =
  BASE: BASE_CLASS
  CONTAINER: "#{BASE_CLASS}__container"
  CONTENT_WRAPPER: "#{BASE_CLASS}__content-wrapper"
  CONTENT: "#{BASE_CLASS}__content"
  TOOLTIP: "#{BASE_CLASS}__tooltip"
  PANE: "#{BASE_CLASS}__pane"

STATES =
  BASE:
    ACTIVE: "#{CLASSES.BASE}--is-active"
    POSITIONED_BELOW: "#{CLASSES.BASE}--is-positioned-beneath"
    POSITIONED_ABOVE: "#{CLASSES.BASE}--is-positioned-above"
  CONTAINER:
    ACTIVE: "#{CLASSES.CONTAINER}--contains-active-popover"
    DEACTIVATING: "#{CLASSES.CONTAINER}--is-deactivating"

VARIANTS =
  BASE:
    ALIGN_TO_EDGE: "#{CLASSES.BASE}--align-to-edge"
    FULL_WIDTH: "#{CLASSES.BASE}--full-width"

EVENTS =
  ACTIVATED: "#{CLASSES.BASE}:activated"
  DEACTIVATED: "#{CLASSES.BASE}:deactivated"

ATTRS =
  PREFERRED_POSITION: "data-popover-preferred-position"
  HORIZONTALLY_RELATIVE_TO: "data-popover-horizontally-relative-to-closest"
  ACTIVATE_FROM: "data-popover-activate-from"
  CSS_CACHE:
    MAX_HEIGHT: "data-popover-css-max-height"
    MAX_WIDTH: "data-popover-css-max-width"
    VERTICAL_MARGIN: "data-popover-css-vertical-margin"
    HORIZONTAL_MARGIN: "data-popover-css-horizontal-margin"

POSITIONS =
  TOP: "top"
  BOTTOM: "bottom"

TOOLTIP_SIZE = 5



# PUBLIC API AND HANDLERS

Popover = (node) ->
  existingObject = Popover.for(node)
  return existingObject if existingObject

  activator = $(node).siblings(":not(#{CLASSES.BASE})")[0]
  cachePopoverCSSProperties(node)
  a11yPopovers(node, activator)

  popoverManipulator =
    activate: ->
      activate(node)
      return

    deactivate: ->
      deactivate(node)
      return

    toggle: ->
      toggle(node)
      return

    reposition: ->
      positionPopover()
      return

  $(node).data(CLASSES.BASE, popoverManipulator)
  popoverManipulator

Popover.for = (node) ->
  $(node).closest(".#{CLASSES.BASE}").data(CLASSES.BASE)

Popover.send = (method, args...) ->
  if args.length
    secrets[method]?.apply(null, args)
  else
    secrets[method]

Popover.CLASSES = CLASSES
Popover.EVENTS = EVENTS
Popover.STATES = STATES
Popover.VARIANTS = VARIANTS
Popover.ATTRS = ATTRS

window.Docks.Popover = Popover



# INITIALIZERS

popoverIndex = 1

joinToExistingIDs = (id, node) ->
  currentID = node.id
  node.id = "#{id}#{if currentID.length then " " else ""}#{currentID}"

a11yPopovers = (popover, activator) ->
  # Define initial accessibility concerns
  popoverID = "#{CLASSES.BASE}--#{popoverIndex++}"
  activatorID = popoverID.replace(CLASSES.BASE, "#{CLASSES.BASE}-activator")

  $(popover).attr
    "id": joinToExistingIDs(popoverID, popover)
    "aria-labelledby": activatorID
    "aria-expanded": "false"

  popover.style.display = "none"

  $(activator).attr
    "id": joinToExistingIDs(activatorID, activator)
    "aria-expanded": "false"
    "aria-haspopup": "true"
    "aria-owns": popoverID
    "aria-controls": popoverID

cachePopoverCSSProperties = (popover) ->
  styles = window.getComputedStyle(popover)

  popover.setAttribute(ATTRS.CSS_CACHE.VERTICAL_MARGIN, calculatePixelDimension(styles.marginTop, popover) || 0)
  popover.setAttribute(ATTRS.CSS_CACHE.HORIZONTAL_MARGIN, calculatePixelDimension(styles.marginLeft, popover) || 0)

  contentWrapper = $(popover).children(".#{CLASSES.CONTENT_WRAPPER}")[0]
  contentWrapperStyles = window.getComputedStyle(contentWrapper)
  popover.setAttribute(ATTRS.CSS_CACHE.MAX_HEIGHT, calculatePixelDimension(contentWrapperStyles.maxHeight, contentWrapper) || 10000)
  popover.setAttribute(ATTRS.CSS_CACHE.MAX_WIDTH, calculatePixelDimension(contentWrapperStyles.maxWidth, contentWrapper) || 10000)

  popover.style.maxWidth = "none" unless popover.classList.contains(VARIANTS.BASE.FULL_WIDTH)
  popover.style.marginLeft = popover.style.marginRight = "0px"



# MEASUREMENT CONVERTERS

baseFontSize = do ->
  fontSize = undefined

  ->
    return fontSize if fontSize?

    $el = $("<div>M</div>").appendTo("body")
    $el.css
      display: "inline-block"
      padding: "0"
      lineHeight: "1"
      position: "absolute"
      visibility: "hidden"
      fontSize: "1em"

    size = $el.height()
    $el.remove()
    fontSize

calculatePixelDimension = (dim, node) ->
  # No value set, make it non-restricting
  return false if dim == "none"

  float = parseFloat(dim)
  return float * baseFontSize() if dim.indexOf("rem") >= 0
  return float * parseFloat(window.getComputedStyle(node).fontSize) if dim.indexOf("em") >= 0
  return float / 100 if dim.indexOf("%") >= 0

  # Set in px
  float



# CHANGING STATE

activeCache = {}

activate = (popover) ->
  return if popover == activeCache.popover?.base
  deactivate() if activeCache.popover

  tooltip = popover.querySelector(".#{CLASSES.TOOLTIP}")
  activator = popover.nextElementSibling || popover.previousElementSibling

  relativeTo = popover.getAttribute(ATTRS.HORIZONTALLY_RELATIVE_TO)
  activateFrom = popover.getAttribute(ATTRS.ACTIVATE_FROM)

  activeCache =
    container: popover.parentNode
    activator: activator
    source: if activateFrom then activator.querySelector(activateFrom) else activator
    relativeTo: $(popover).closest(relativeTo)[0] if relativeTo
    preferredPosition: popover.getAttribute(ATTRS.PREFERRED_POSITION) || POSITIONS.BOTTOM
    horizontallyPosition: !popover.classList.contains(VARIANTS.BASE.FULL_WIDTH)
    positionAgainstEdge: popover.classList.contains(VARIANTS.BASE.ALIGN_TO_EDGE)
    popover:
      base: popover
      container: popover.parentNode
      content: popover.querySelector(".#{CLASSES.CONTENT}")
      contentWrapper: popover.querySelector(".#{CLASSES.CONTENT_WRAPPER}")
      tooltip: tooltip
      panes: Array::slice.call(popover.querySelectorAll(".#{CLASSES.PANE}"))
    styles:
      horizontalMargin: parseInt(popover.getAttribute(ATTRS.CSS_CACHE.HORIZONTAL_MARGIN))
      verticalMargin: parseInt(popover.getAttribute(ATTRS.CSS_CACHE.VERTICAL_MARGIN))
      maxHeight: parseInt(popover.getAttribute(ATTRS.CSS_CACHE.MAX_HEIGHT))
      maxWidth: parseFloat(popover.getAttribute(ATTRS.CSS_CACHE.MAX_WIDTH))

  ended = false
  $(popover).one "transitionend webkitTransitionEnd", ->
    return if ended
    ended = true
    $(popover).trigger(EVENTS.ACTIVATED)

  attachActiveEventListeners(popover)
  applyActivationMarkup()
  positionPopover()

applyActivationMarkup = ->
  popover = activeCache.popover.base
  popover.style.backfaceVisibility = "hidden"
  popover.style.display = ""
  popover.setAttribute("aria-expanded", "true")
  activeCache.activator.setAttribute("aria-expanded", "true")

  popover.offsetHeight # force repaint
  popover.classList.add(STATES.BASE.ACTIVE)
  activeCache.popover.container.classList.add(STATES.CONTAINER.ACTIVE)
  return

attachActiveEventListeners = (popover) ->
  $(popover).on("wheel", ".#{CLASSES.PANE}", popoverPaneScroll)

toggle = (popover) ->
  if activeCache.popover?.base != popover then activate(popover) else deactivate()

deactivate = (popover) ->
  return unless activeCache.popover
  return if popover && popover != activeCache.popover.base

  oldPopover = activeCache.popover.base
  oldContent = activeCache.popover.content
  oldContainer = activeCache.popover.container

  $(oldPopover).one "transitionend webkitTransitionEnd", do ->
    # Fixes a Chrome bug where transitionend and webkitTransitionEnd
    # events both fired
    ended = false

    ->
      return if ended
      ended = true
      oldContainer.classList.remove(STATES.CONTAINER.DEACTIVATING)
      oldPopover.style.display = "none"
      oldPopover.style.backfaceVisibility = ""
      oldContent.style.width = ""
      $(oldPopover).trigger(EVENTS.DEACTIVATED)

  applyDeactivationMarkup()
  detachActiveEventListeners(oldPopover)

  # delete so we keep the reference to activeCache in secrets
  delete activeCache[key] for key of activeCache

applyDeactivationMarkup = ->
  popover = activeCache.popover
  popover.container.classList.add(STATES.CONTAINER.DEACTIVATING)
  popover.container.classList.remove(STATES.CONTAINER.ACTIVE)
  popover.base.classList.remove(STATES.BASE.ACTIVE)
  popover.base.setAttribute("aria-expanded", "false")
  activeCache.activator.setAttribute("aria-expanded", "false")

detachActiveEventListeners = (popover) ->
  $(popover).off("wheel", ".#{CLASSES.PANE}", popoverPaneScroll)



# SIZING AND POSITIONING

positionPopover = (event) ->
  return unless activeCache.popover

  resize = !event?.type || event.type == "resize"
  newStyles =
    base: {}
    wrapper: {}
    content: {}
    tooltip: {}

  rect = spaceDetailsForActivePopover()
  determineVerticalPositioning({ rect: rect }, newStyles)

  # Horizontal repositioning only needs to happen on resize
  if resize && activeCache.horizontallyPosition
    offsets = calculateHorizontalOffsets()
    left = rect.leftRelative <= 0.5
    width = calculateMaxWidth(rect.relativeToWidth)
    newStyles.content.width = width

    context =
      offsets: offsets
      width: width
      left: left
      rect: rect

    if activeCache.positionAgainstEdge
      horizontallyPositionWithEdgeAlignment(context, newStyles)
    else
      horizontallyPositionWithCenterAlignment(context, newStyles)

    tooltipPosition = (rect.width / 2) + offsets.leftFromContainerToActivator + offsets.leftFromActivatorToSource - newStyles.base.left
    newStyles.tooltip.left = tooltipPosition

    popoverStyles = activeCache.popover.base.style
    transformOriginY = newStyles.base.transformOrigin.split(" ")[1..-1].join(" ")
    activeCache.styles.transformOriginX = "#{Math.round(tooltipPosition)}px"
    newStyles.base.transformOrigin = "#{activeCache.styles.transformOriginX} #{transformOriginY}"

  requestAnimationFrame ->
    popover = activeCache.popover
    $(popover.base).css(newStyles.base)
    $(popover.content).css(newStyles.content)
    $(popover.contentWrapper).css(newStyles.wrapper)
    $(popover.tooltip).css(newStyles.tooltip)

    if resize
      # Safari and IE need an explicit height for the content, otherwise the flexbox
      # will set non-fixed panes to be a height of 0. This **must** be done after
      # the content's width is set since width dictates the height.
      popover.content.style.height = calculateTotalPaneSize() + 2

    # $.css doesn't apply the transformOrigin in IE for some reason :/
    popover.base.style.transformOrigin = newStyles.base.transformOrigin

horizontallyPositionWithEdgeAlignment = (context, styles) ->
  {offsets, width, rect, left} = context

  oppositeSideSpace = rect[if left then "right" else "left"] + (rect.width / 2) - activeCache.styles.horizontalMargin

  popoverPosition = if left then 0 else rect.width - width
  popoverPosition += offsets.leftFromContainerToActivator

  styles.base.left = if width > oppositeSideSpace
    if left
      popoverPosition - (width - oppositeSideSpace) - offsets.leftFromActivatorToSource
    else
      popoverPosition + (width - oppositeSideSpace)
  else
    if left
      popoverPosition - offsets.leftFromActivatorToSource
    else
      popoverPosition - offsets.rightFromActivatorToSource

  styles.base.left += offsets.leftFromActivatorToSource

horizontallyPositionWithCenterAlignment = (context, styles) ->
  {offsets, width, rect, left} = context

  spaceNeededPerSide = (width * 0.5) + activeCache.styles.horizontalMargin

  styles.base.left = if left && rect.left < spaceNeededPerSide
    (rect.width / 2) + activeCache.styles.horizontalMargin - rect.left
  else if !left && rect.right < spaceNeededPerSide
    (rect.width / 2) - width + rect.right - activeCache.styles.horizontalMargin
  else
    (rect.width / 2) - (width / 2)

  styles.base.left = styles.base.left + offsets.leftFromContainerToActivator + offsets.leftFromActivatorToSource

calculateHorizontalOffsets = ->
  activatorRect = activeCache.activator.getBoundingClientRect()
  sourceIsActivator = activeCache.source == activeCache.activator
  sourceRect = if sourceIsActivator then activatorRect else activeCache.source.getBoundingClientRect()

  leftFromContainerToActivator: activatorRect.left - activeCache.container.getBoundingClientRect().left
  leftFromActivatorToSource: sourceRect.left - activatorRect.left
  rightFromActivatorToSource: sourceRect.right - activatorRect.right

spaceDetailsForActivePopover = ->
  rect = activeCache.source.getBoundingClientRect()
  topSpace = rect.top + (0.5 * rect.height)
  leftSpace = rect.left + (0.5 * rect.width)
  relativeToWidth = window.innerWidth

  if activeCache.relativeTo
    relativeTo = activeCache.relativeTo.getBoundingClientRect()
    relativeToWidth = relativeTo.width
    leftSpace -= relativeTo.left

  height: rect.height
  width: rect.width
  top: topSpace
  bottom: window.innerHeight - topSpace
  left: leftSpace
  leftRelative: leftSpace / relativeToWidth
  right: relativeToWidth - leftSpace
  relativeToWidth: relativeToWidth

calculateTotalPaneSize = do ->
  reduction = (totalHeight, pane) -> totalHeight + pane.scrollHeight

  -> activeCache.popover.panes.reduce(reduction, 0)

calculateMaxWidth = (relativeToWidth) ->
  unless activeCache.styles.contentWidth
    content = activeCache.popover.content
    content.style.whiteSpace = "nowrap"
    activeCache.styles.contentWidth = content.offsetWidth + 2
    content.style.whiteSpace = ""

  # Adjust for percentage-based max width
  maxRelativeWidth = relativeToWidth - (2 * activeCache.styles.horizontalMargin)
  Math.min(maxRelativeWidth, activeCache.styles.maxWidth, activeCache.styles.contentWidth)

determineVerticalPositioning = (context, styles) ->
  actualHeight = activeCache.popover.base.offsetHeight + 2 * activeCache.styles.verticalMargin
  spaceAvailable = context.rect

  position = if activeCache.preferredPosition == POSITIONS.BOTTOM
    if spaceAvailable.bottom > spaceAvailable.top ||
       (spaceAvailable.bottom - spaceAvailable.height / 2) > actualHeight
      POSITIONS.BOTTOM
    else
      POSITIONS.TOP
  else
    if spaceAvailable.top > spaceAvailable.bottom ||
       (spaceAvailable.top - spaceAvailable.height / 2) > actualHeight
      POSITIONS.TOP
    else
      POSITIONS.BOTTOM

  positionedAbove = position == POSITIONS.TOP
  defaultHorizontalTranslation = if activeCache.horizontallyPosition then 0 else "50%"
  styles.base.transformOrigin = if positionedAbove
    "#{activeCache.styles.transformOriginX || defaultHorizontalTranslation} calc(100% + #{TOOLTIP_SIZE}px)"
  else
    "#{activeCache.styles.transformOriginX || defaultHorizontalTranslation} -#{TOOLTIP_SIZE}px"

  if position != activeCache.position
    activeCache.position = position
    activeCache.popover.base.classList[if positionedAbove then "remove" else "add"](STATES.BASE.POSITIONED_BELOW)
    activeCache.popover.base.classList[if positionedAbove then "add" else "remove"](STATES.BASE.POSITIONED_ABOVE)

  maxHeightOnScreen = spaceAvailable[position] - (spaceAvailable.height / 2) - (2 * activeCache.styles.verticalMargin)
  styles.content.maxHeight = Math.min(maxHeightOnScreen, activeCache.styles.maxHeight)



# EVENT HANDLERS

popoverFocus = do ->
  lastCallAt = 0
  lastPopoverContainer = null

  (event) ->
    $target = $(event.target)
    return if $target.closest(".#{CLASSES.BASE}").length

    $popoverContainer = $target.closest(".#{CLASSES.CONTAINER}")

    if $popoverContainer.length

      # manual throttling only if the same popover is triggered multiple times in a row
      currentPopoverContainer = $popoverContainer[0]
      now = Date.now()
      if lastPopoverContainer == currentPopoverContainer && (now - lastCallAt) < 300
        return
      lastCallAt = now
      lastPopoverContainer = currentPopoverContainer

      event.preventDefault()
      node = $popoverContainer.children(".#{CLASSES.BASE}")[0]
      if event.type == 'focusin'
        activate(node)
      else
        toggle(node)

    else
      deactivate()

popoverKeydown = (event) ->
  return if $(event.target).closest(".#{CLASSES.BASE}").length
  popover = $(event.currentTarget).children(".#{CLASSES.BASE}")[0]

  if event.which in [Shopify.Keycodes.ENTER, Shopify.Keycodes.SPACE]
    toggle(popover)
    event.preventDefault()

  else if event.which == Shopify.Keycodes.ESCAPE
    deactivate()
    event.preventDefault()

  return

popoverPaneScroll = (event) ->
  pane = event.currentTarget
  delta = event.originalEvent.deltaY
  up = delta < 0

  [height, scrollHeight, scrollTop] = [
    pane.offsetHeight
    pane.scrollHeight
    pane.scrollTop
  ]

  prevent = ->
    event.stopPropagation()
    event.preventDefault()

  scrollingDownPastBottom = !up && delta > scrollHeight - height - scrollTop
  scrollingUpPastTop = up && -delta > scrollTop

  if scrollingDownPastBottom
    pane.scrollTop = scrollHeight
    prevent()

  if scrollingUpPastTop
    pane.scrollTop = 0
    prevent()

  return



# Store app private methods in a secret object so we can access them
# on Popover.send(method)

secrets =
  activeCache: activeCache

  joinToExistingIDs: joinToExistingIDs
  a11yPopovers: a11yPopovers
  cachePopoverCSSProperties: cachePopoverCSSProperties

  baseFontSize: baseFontSize
  calculatePixelDimension: calculatePixelDimension

  activate: activate
  applyActivationMarkup: applyActivationMarkup
  attachActiveEventListeners: attachActiveEventListeners
  toggle: toggle
  deactivate: deactivate
  applyDeactivationMarkup: applyDeactivationMarkup
  detachActiveEventListeners: detachActiveEventListeners

  positionPopover: positionPopover
  horizontallyPositionWithCenterAlignment: horizontallyPositionWithCenterAlignment
  horizontallyPositionWithEdgeAlignment: horizontallyPositionWithEdgeAlignment
  calculateHorizontalOffsets: calculateHorizontalOffsets
  spaceDetailsForActivePopover: spaceDetailsForActivePopover
  calculateMaxWidth: calculateMaxWidth
  determineVerticalPositioning: determineVerticalPositioning

  popoverFocus: popoverFocus
  popoverKeydown: popoverKeydown
  popoverPaneScroll: popoverPaneScroll

Lemon.make(Popover)

$(document).on("click focusin", popoverFocus)
$(document).on("keydown", ".#{CLASSES.CONTAINER}", popoverKeydown)
$(window).on("resize scroll", positionPopover)
