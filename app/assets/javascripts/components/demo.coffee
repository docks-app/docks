# TODO: integrate better iframe resizing
# see: https://github.com/davidjbradshaw/iframe-resizer/tree/master/test

BASE_CLASS = "demo"

CLASSES =
  BASE: BASE_CLASS
  CONTENT: "#{BASE_CLASS}__content"
  SECTION: "#{BASE_CLASS}__section"
  INFO: "#{BASE_CLASS}__info"

STATES =
  SECTION: ACTIVE: "#{CLASSES.SECTION}--is-info-shown"

HEIGHT_CHANGE_WATCH_DURATION = 1000

MINIMUM_HEIGHT = 160

clear_info_indicators = ->
  $(".#{STATE_DEMO_SECTION_ACTIVE}").removeClass(STATE_DEMO_SECTION_ACTIVE)

allocate_minimum_height = (node) ->
  demo_sections = node.querySelectorAll(".#{CLASSES.SECTION}")

  for demo_section in demo_sections
    demo_section.style.minHeight = "#{MINIMUM_HEIGHT / demo_sections.length}px"

Demo = (node) ->
  markup_source = document.querySelector(".#{CLASSES.CONTENT}")
  demo_handlers = window.parent.Docks.demo_handlers || {}
  height = 0
  actions = {}
  allocate_minimum_height(node)


  context =
    body: document.body
    document: document

  # register_event_handler: (data) ->
  #   $(document).on data.event, data.selector, demo_handlers

  demo =
    receive: (event) ->
      handlers = actions[event.type]
      handlers ?= demo_handlers[event.type]

      if handlers?
        handlers.forEach (action) ->
          action.call(demo, event)

  register_demo_action = (type, action) ->
    actions[type] ?= []
    actions[type].push(action)
    return

  send_markup = (event = {}) ->
    markup_source = $("##{CLASSES.SECTION}--#{event.demo} .#{CLASSES.CONTENT}")[0] if event.demo

    demo.send
      type: Docks.EVENTS.MARKUP_REQUEST
      html: markup_source.innerHTML

  height_update = (only_increase = false) ->

    new_height = node.offsetHeight
    return if new_height == height
    return if only_increase && new_height < height

    height = new_height

    demo.send
      type: Docks.EVENTS.HEIGHT_CHANGE
      height: height

  apply_class_change = (event) ->
    details = event.details

    $matches = $(".#{CLASSES.CONTENT} .#{details.base_class}")
    $matches = $matches.filter(details.filter_to) if details.filter_to

    markup_change_in_source = false
    minimum_one_class_change = false

    # Some height changes may occur over time. Watch for transitions
    # and send height again on each transitionend event
    transition_height_updater = Lemon.curry(height_update)
    document.addEventListener("transitionend", transition_height_updater)
    document.addEventListener("webkitTransitionEnd", transition_height_updater)

    $matches.each (index, match) ->
      apply_class = true

      current_class = match.getAttribute("class")
      for preclude in details.precludes
        if current_class.indexOf(preclude) >= 0
          apply_class = false
          break

      return unless apply_class
      minimum_one_class_change = true

      if (action = details.js_action).length
        unless event.add
          action = action.replace(/addClass/g, "removeClass")
                         .replace(/(true|false)/, (match) -> if match == "true" then "false" else "true")
        eval(action)

      else
        match.classList[if event.add then "add" else "remove"](details.variant_class)

      markup_change_in_source = $(match).closest(markup_source).length > 0 unless markup_change_in_source
      return

    send_markup() if markup_change_in_source

    if minimum_one_class_change
      demo.send(event)
      transition_height_updater()

    setTimeout ->
      document.removeEventListener("transitionend", transition_height_updater)
      document.removeEventListener("webkitTransitionEnd", transition_height_updater)
    , HEIGHT_CHANGE_WATCH_DURATION

  info_click = (event) ->
    demo.send
      type: Docks.EVENTS.INFO_REQUEST
      details: Docks.Variation($(event.target).closest(".#{CLASSES.SECTION}")[0]).details_only()


  # register_demo_action(Docks.EVENTS.EVENT_HANDLER, )
  register_demo_action(Docks.EVENTS.INFO_CLEAR, clear_info_indicators)
  register_demo_action(Docks.EVENTS.HEIGHT_REQUEST, height_update)
  register_demo_action(Docks.EVENTS.MARKUP_REQUEST, send_markup)
  register_demo_action(Docks.EVENTS.CLASS_CHANGE, apply_class_change)

  window.addEventListener("resize", height_update)
  $(document).on("click", ".#{CLASSES.INFO}", info_click)

  Lemon.mix(Docks.Iframe.Mixins.Registerable, into: demo)
  Docks.Iframe.register_with_iframe_id(demo, node.getAttribute(Docks.Iframe.ATTRS.ID))

  height_update()

  demo

Demo.CLASSES = CLASSES

window.Docks.Demo = Demo
Lemon.make(Demo, with_cache: true)

# class Demo
#   constructor: (@$element) ->
#     @$_markupSource = $(".#{CLASS_DEMO_CONTENT}").first()
#     @_height = 0
#     @_actions = {}

#     @body = $('body')
#     @document = document

#     $(window).on 'resize', @_heightChange
#     $(document).on 'click', ".#{CLASS_DEMO_INFO}", @_requestInfo

#     @_registerDemoAction Docks.EVENT_TYPE_EVENT_HANDLER,   @_registerEventHandler

#   _registerDemoAction: (type, action) ->
#     @_actions[type] ?= []
#     @_actions[type].push(action)

#   _registerEventHandler: (data) ->
#     id = "#{data.event}#{data.selector}"
#     $(document).on id, data.selector, window.parent.Docks.demoHandlers[id].bind(@)


#   _requestInfo: (event) =>
#     $(".#{STATE_DEMO_SECTION_ACTIVE}").removeClass(STATE_DEMO_SECTION_ACTIVE)
#     $section = $(event.target).closest(".#{CLASS_DEMO_SECTION}").addClass(STATE_DEMO_SECTION_ACTIVE)

#     @message
#       type: Docks.EVENT_TYPE_INFO_REQUEST
#       infoDetails: Docks.ClassChangers.elementToInfoObject($section)


# window.Docks.Demo = Demo

# window.Docks.CLASS_DEMO = CLASS_DEMO
# window.Docks.CLASS_DEMO_INFO = CLASS_DEMO_INFO
