BASE_CLASS = "resizable"

CLASSES =
  BASE: BASE_CLASS
  HANDLE: "#{BASE_CLASS}__handle"
  CONTAINER: "#{BASE_CLASS}__container"
  SIZE_BUTTON: "#{BASE_CLASS}__size-button"
  WIDTH_INDICATOR: "#{BASE_CLASS}__width-indicator"
  PX_WIDTH_INDICATOR: "#{BASE_CLASS}__width-indicator__px"
  EM_WIDTH_INDICATOR: "#{BASE_CLASS}__width-indicator__em"

STATES =
  BASE:
    TRANSITIONING: "#{CLASSES.BASE}--is-transitioning-width"

  WIDTH_INDICATOR:
    VISIBLE: "#{CLASSES.WIDTH_INDICATOR}--is-visible"

  SIZE_BUTTON:
    HIDDEN: "#{CLASSES.SIZE_BUTTON}--is-hidden"
    ACTIVE: "#{CLASSES.SIZE_BUTTON}--is-active"

ATTRS =
  SIZE_BUTTON_WIDTH: "data-size-button-width"

SHOW_WIDTH_DURATION = 2500
HANDLE_KEY_RESIZE_INCREMENT = 2
HANDLE_KEY_RESIZE_SHIFT_INCREMENT = 10

RESIZABLE_SIZE_RELATIONSHIPS =
  small:  320
  medium: 768
  large:  960

attach_media_listener_to_size_button = (button, size_adjustment = 0) ->
  size = button.getAttribute(ATTRS.SIZE_BUTTON_WIDTH)
  return unless (respond_width = RESIZABLE_SIZE_RELATIONSHIPS[size])

  listener = (mq) ->
    button.classList[if mq.matches then "remove" else "add"](STATES.SIZE_BUTTON.HIDDEN)

  media_query = window.matchMedia("(min-width: #{respond_width + size_adjustment}px)")
  listener(media_query)
  media_query.addListener(listener)

click_size_button = (event) ->
  button = $(event.target).closest(".#{CLASSES.SIZE_BUTTON}")[0]
  Resizable.for(button).set_width(RESIZABLE_SIZE_RELATIONSHIPS[button.getAttribute(ATTRS.SIZE_BUTTON_WIDTH)], set_by: button)

next_unhidden_size_button = (button) ->
  sibling = button.nextElementSibling
  while sibling
    return sibling unless sibling.classList.contains(STATES.SIZE_BUTTON.HIDDEN)
    sibling = sibling.nextElementSibling

  children = button.parentNode.children
  for child in children
    return child unless child.classList.contains(STATES.SIZE_BUTTON.HIDDEN)

  return

previous_unhidden_size_button = (button) ->
  sibling = button.previousElementSibling
  while sibling
    return sibling unless sibling.classList.contains(STATES.SIZE_BUTTON.HIDDEN)
    sibling = sibling.previousElementSibling

  children = button.parentNode.children
  for i in [(children.length - 1)..0]
    child = children[i]
    return child unless child.classList.contains(STATES.SIZE_BUTTON.HIDDEN)

  return

key_on_size_button = (event) ->
  respond_to = [
    Lemon.KEYCODES.LEFT,
    Lemon.KEYCODES.RIGHT,
    Lemon.KEYCODES.UP,
    Lemon.KEYCODES.DOWN,
    Lemon.KEYCODES.ENTER,
    Lemon.KEYCODES.SPACE
  ]

  return unless event.which in respond_to
  event.preventDefault()

  if event.which in [Lemon.KEYCODES.ENTER, Lemon.KEYCODES.SPACE]
    click_size_button(event)
    return

  next = event.which in [Lemon.KEYCODES.DOWN, Lemon.KEYCODES.RIGHT]
  button = $(event.target).closest(".#{CLASSES.SIZE_BUTTON}")[0]
  new_button = if next then next_unhidden_size_button(button) else previous_unhidden_size_button(button)

  Resizable.for(button)?.focus_size_button(new_button)

key_on_handle = (event) ->
  respond_to = [
    Lemon.KEYCODES.LEFT,
    Lemon.KEYCODES.RIGHT,
    Lemon.KEYCODES.UP,
    Lemon.KEYCODES.DOWN
  ]

  return unless event.which in respond_to
  event.preventDefault()

  width_change = if event.shiftKey then HANDLE_KEY_RESIZE_SHIFT_INCREMENT else HANDLE_KEY_RESIZE_INCREMENT
  width_change = width_change * -1 if event.which in [Lemon.KEYCODES.LEFT, Lemon.KEYCODES.DOWN]

  Resizable.for(event.target)?.set_width(delta: width_change)

handle_drag_move = (context, event) ->
  event.preventDefault()
  x = if event.touches then event.touches[0].x else event.pageX
  delta = x - context.start_x
  context.set_width(context.start_width + 2*delta)

start_dragging_handle = (context) ->
  context.iframe.style.pointerEvents = "none"
  handle_drag_move_handler = Lemon.curry(handle_drag_move, context)

  drag_end_cleanup = ->
    Lemon.stop_listening_for("mousemove touchmove", on: document.body, with: handle_drag_move_handler)
    Lemon.stop_listening_for("mouseup touchend", on: document.body, with: drag_end_cleanup)
    context.iframe.style.pointerEvents = null

  Lemon.listen_for("mousemove touchmove", on: document.body, with: handle_drag_move_handler)
  Lemon.listen_for("mouseup touchend", on: document.body, with: drag_end_cleanup)

$(document).on "click",   ".#{CLASSES.SIZE_BUTTON}", click_size_button
$(document).on "keydown", ".#{CLASSES.SIZE_BUTTON}", key_on_size_button
$(document).on "keydown", ".#{CLASSES.HANDLE}",      key_on_handle

Resizable = (node) ->
  iframe = node.querySelector(".#{Docks.Iframe.CLASSES.BASE}")

  width_indicator = node.querySelector(".#{CLASSES.WIDTH_INDICATOR}")
  show_width_timeout = undefined

  handle = node.querySelector(".#{CLASSES.HANDLE}")
  size_buttons = Lemon.arrayify(node.querySelectorAll(".#{CLASSES.SIZE_BUTTON}"))
  active_size_button = undefined

  container = node.parentNode
  container_styles = window.getComputedStyle(container)
  container_side_padding = parseInt(container_styles.paddingLeft) + parseInt(container_styles.paddingRight)

  width_taken_by_side_components = handle.offsetWidth
  max_width = iframe.offsetWidth
  min_width = parseInt(window.getComputedStyle(node).minWidth) - width_taken_by_side_components

  set_height = (height) -> iframe.style.height = "#{height}px"

  show_width = (width = iframe.offsetWidth) ->
    if show_width_timeout?
      clearTimeout(show_width_timeout)
    else
      width_indicator.classList.add(STATES.WIDTH_INDICATOR.VISIBLE)

    show_width_timeout = setTimeout ->
      width_indicator.classList.remove(STATES.WIDTH_INDICATOR.VISIBLE)
      show_width_timeout = undefined
    , SHOW_WIDTH_DURATION

    width_indicator.querySelector(".#{CLASSES.PX_WIDTH_INDICATOR}").textContent = width
    width_indicator.querySelector(".#{CLASSES.EM_WIDTH_INDICATOR}").textContent = (width/16).toFixed(2)

  handle_host_resize = (event) ->
    max_width = container.offsetWidth - container_side_padding - width_taken_by_side_components

    if (resizable_width = node.offsetWidth) == container.offsetWidth - container_side_padding
      if active_size_button?
        node.style.width = null
        active_size_button.classList.remove(STATES.SIZE_BUTTON.ACTIVE)
        active_size_button = undefined

      show_width()

  set_width = (width, options = {}) ->

    if typeof width == "object"
      options = width
      width = node.offsetWidth - width_taken_by_side_components + width.delta

    if options.set_by
      activate_size_button(options.set_by)
      $(node).transitionEnd -> node.classList.remove(STATES.BASE.TRANSITIONING)
      node.classList.add(STATES.BASE.TRANSITIONING)
    else if active_size_button?
      active_size_button.classList.remove(STATES.SIZE_BUTTON.ACTIVE)
      active_size_button = undefined

    if width?
      width = Math.max(Math.min(width, max_width), min_width)
      node.style.width = "#{width + width_taken_by_side_components}px"
      show_width(width)
    else
      node.style.width = null
      show_width(container.offsetWidth - container_side_padding - width_taken_by_side_components)

  focus_size_button = (button) ->
    active_size_button?.setAttribute("tabindex", "-1")
    button.setAttribute("tabindex", "0")
    button.focus()

  activate_size_button = (button) ->
    button.setAttribute("tabindex", "0")
    button.setAttribute("aria-selected", "true")
    button.classList.add(STATES.SIZE_BUTTON.ACTIVE)

    if active_size_button?
      active_size_button.setAttribute("tabindex", "-1")
      active_size_button.setAttribute("aria-selected", "false")
      active_size_button.classList.remove(STATES.SIZE_BUTTON.ACTIVE)

    active_size_button = button

  initialize_handle_resize = (event) ->
    context =
      start_x: if event.touches then event.touches[0].x else event.pageX
      start_width: iframe.offsetWidth
      max_width: container.offsetWidth - container_side_padding
      set_width: set_width
      iframe: iframe

    start_dragging_handle(context)

  receive = (event) ->
    switch event.type
      when Docks.EVENTS.HEIGHT_CHANGE, Docks.EVENTS.HEIGHT_REQUEST
        set_height(event.height)

  $(window).on "resize", handle_host_resize
  $(handle).on "mousedown touchstart", initialize_handle_resize

  resizable =
    receive: (event) -> receive(event)
    set_width: (width, options = {}) -> set_width(width, options)
    focus_size_button: (button) -> focus_size_button(button)

  Lemon.mix(Docks.Iframe.Mixins.Registerable, into: resizable)
  Docks.Iframe.register_with_iframe_id(resizable, node.getAttribute(Docks.Iframe.ATTRS.ID))

  show_width()
  size_buttons.forEach (button) ->
    attach_media_listener_to_size_button(button, width_taken_by_side_components + container_side_padding)

  resizable

Resizable.CLASSES = CLASSES

Lemon.make(Resizable, with_cache: true)
