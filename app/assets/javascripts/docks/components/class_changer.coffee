# TODO: class changers don't update helper markup
# Make it so that joint demos correctly present the helper markup

BASE_CLASS = "class-changer"

CLASSES =
  BASE: BASE_CLASS
  CONTAINER: "#{BASE_CLASS}__container"
  INFO: "#{BASE_CLASS}__info"

STATES =
  BASE:
    ACTIVE: "#{CLASSES.BASE}--is-active"
    PARTIALLY_ACTIVE: "#{CLASSES.BASE}--is-partially-active"
    LOCKED: "#{CLASSES.BASE}--is-locked"

ATTRS =
  NAME: "data-name"
  TYPE: "data-type"
  DESCRIPTION: "data-description"
  BASE_CLASS: "data-base-class"
  ACTIVATE_WITH: "data-activate-with"
  PRECLUDES: "data-precludes"
  SET_BY: "data-set-by"
  DEFAULT: "data-default-on"
  FILTER_TO: "data-filter-to"
  JAVASCRIPT_ACTION: "data-javascript-action"

Variation = (changer) ->
  obj = Variation.base_variation_with_details
    base_class: changer.getAttribute(ATTRS.BASE_CLASS)
    variant_class: changer.getAttribute(ATTRS.NAME)
    activate_with: activate_with.split(", ") if (activate_with = changer.getAttribute(ATTRS.ACTIVATE_WITH)).length
    precludes: precludes.split(", ") if (precludes = changer.getAttribute(ATTRS.PRECLUDES)).length
    set_by: set_by.split(", ") if (set_by = changer.getAttribute(ATTRS.SET_BY)).length
    filter_to: changer.getAttribute(ATTRS.FILTER_TO)
    js_action: changer.getAttribute(ATTRS.JAVASCRIPT_ACTION)
    description: changer.getAttribute(ATTRS.DESCRIPTION)
    type: changer.getAttribute(ATTRS.TYPE)

  obj.details_only = ->
    Variation.base_variation_with_details(this)

  obj.activate = ->
    changer.classList.add(STATES.BASE.ACTIVE)

  obj.deactivate = ->
    changer.classList.remove(STATES.BASE.ACTIVE)

  Object.defineProperty(obj, "is_active", configurable: true, get: -> Variation.is_active(changer))
  obj

Variation.is_active = (changer) ->
  changer.classList.contains(STATES.BASE.ACTIVE) || changer.classList.contains(STATES.BASE.PARTIALLY_ACTIVE)

Variation.is_locked = (changer) ->
  changer.classList.contains(STATES.BASE.LOCKED)

Variation.mark_as_being_locked = (changer) ->
  changer.classList.add(STATES.BASE.LOCKED)

Variation.mark_as_being_unlocked = (changer) ->
  changer.classList.remove(STATES.BASE.LOCKED)

Variation.base_variation_with_details = (options) ->
  variant_class: options.variant_class
  base_class: options.base_class
  activate_with: options.activate_with || []
  precludes: options.precludes || []
  set_by: options.set_by || []
  filter_to: options.filter_to || ""
  js_action: options.js_action || ""
  description: options.description || ""
  type: options.type || "state"

changer_keypress = (event) ->
  respond_to = [
    Lemon.KEYCODES.ENTER
    Lemon.KEYCODES.SPACE
  ]

  return unless event.which in respond_to

  event.preventDefault()
  set_changer_status(this)

changer_info_click = (event) ->
  event.stopImmediatePropagation()
  event.preventDefault()
  Docks.DetailsSheet.present(Variation($(this).closest(".#{CLASSES.BASE}")[0]).details_only())

changer_click = (event) ->
  event.preventDefault()
  set_changer_status(this)

set_changer_status = (changer, options = {}) ->
  return if Variation.is_locked(changer)
  Variation.mark_as_being_locked(changer)
  variation = Variation(changer)
  add = if options.add? then options.add else !variation.is_active
  class_changers = ClassChangers.for(changer)

  variation.activate_with.forEach (activate_too) ->
    return if activate_too == variation.base_class
    activate_too_node = $(changer).siblings("[#{ATTRS.NAME}=#{activate_too}]")[0]

    if activate_too_node
      currently_active = Variation.is_active(activate_too_node)
      return if currently_active && add
      return if !current_active && !add
      set_changer_status(activate_too_node, add: true)

    else
      # SOMETHING
      class_changers.send
        type: Docks.EVENTS.CLASS_CHANGE
        add: true
        details: Variation.base_variation_with_details(base_class: variation.base_class, name: activate_too)

  if add
    variation.precludes.forEach (preclude) ->
      preclude = $(changer).siblings("[#{ATTRS.NAME}=#{preclude}]")[0]

      if preclude
        return unless Variation.is_active(preclude)

        set_changer_status(preclude, add: false)

  # SOMETHING ABOUT FILTERS
  variation[if add then "activate" else "deactivate"]()

  Variation.mark_as_being_unlocked(changer)

  class_changers.send
    type: Docks.EVENTS.CLASS_CHANGE
    add: add
    details: variation.details_only()


$(document).on("click", ".#{CLASSES.INFO}", changer_info_click)
$(document).on("click", ".#{CLASSES.BASE}", changer_click)
$(document).on("keypress", ".#{CLASSES.BASE}", changer_keypress)

ClassChangers = (node) ->
  enable = (klasses...) ->
  disable = (klasses...) ->
  activate = (klasses...) ->
  deactivate = (klasses...) ->

  class_changers =
    enable: enable
    disable: disable
    activate: activate
    deactivate: deactivate

  Lemon.mix(Docks.Iframe.Mixins.Registerable, into: class_changers)
  Docks.Iframe.register_with_iframe_id(class_changers, node.getAttribute(Docks.Iframe.ATTRS.ID))

  class_changers

ClassChangers.CLASSES = CLASSES

Lemon.make(ClassChangers, with_cache: true, selector: ".#{CLASSES.CONTAINER}")

window.Docks.Variation = Variation




# class ClassChangers
#   constructor: (@$classChangers) ->
#     @$classChangers.find(".#{CLASS_CHANGER_INFO}").on "click.#{CLASS_CHANGER_INFO}", @_classChangeInfo

#     $(document).on "click.#{CLASS_CHANGER_EXPLAIN_CLOSE}", ".#{CLASS_CHANGER_EXPLAIN_CLOSE}", @_closeInfoBox

#   disable: (selector) ->
#     $applyTo = if selector? then @$classChangers.filter("[data-base-class=#{selector}]") else @$classChangers
#     $applyTo.addClass(STATE_CLASS_CHANGER_DISABLED).removeClass("#{STATE_CLASS_CHANGER_ACTIVE} #{STATE_CLASS_CHANGER_PARTIALLY_ACTIVE}")

#   enable: (selector) ->
#     if selector?
#       @$classChangers.filter("[data-base-class=#{selector}]").removeClass(STATE_CLASS_CHANGER_DISABLED)
#     else
#       @$classChangers.removeClass(STATE_CLASS_CHANGER_DISABLED)

#   select: (classChanger, partiallySelected = false) ->
#     $classChanger = @$classChangers.filter("[data-name=#{classChanger}]")
#     if partiallySelected
#       $classChanger.removeClass(STATE_CLASS_CHANGER_ACTIVE).addClass(STATE_CLASS_CHANGER_PARTIALLY_ACTIVE)
#     else
#       $classChanger.removeClass(STATE_CLASS_CHANGER_PARTIALLY_ACTIVE).addClass(STATE_CLASS_CHANGER_ACTIVE)

#   deselectAll: (selector) ->
#     @$classChangers.filter("[data-base-class=#{selector}]")
#                    .removeClass("#{STATE_CLASS_CHANGER_ACTIVE} #{STATE_CLASS_CHANGER_PARTIALLY_ACTIVE}")



#   receive: (data) ->
#     if data.type == Docks.EVENT_TYPE_INFO_REQUEST
#       @infoRequest data.infoDetails, $("[#{Docks.ATTR_IFRAME_ID}=#{data.id}]").closest('.resizable__container').next()


#   infoRequest: (info, $source) ->
#     $infoContainer = $source.closest(".#{CLASS_CHANGER_CONTAINER}").find(".#{CLASS_CHANGER_EXPLAIN}")
#     return unless $infoContainer.length

    # $infoContainer.find('.class-changer__explain__type').text(info.type)
    # $infoContainer.find('.class-changer__explain__description').html(info.description)
    # $infoContainer.find('.class-changer__explain__precludes__items').html(info.precludes).parent().css('display', "#{if info.precludes.length then 'block' else 'none'}")
    # $infoContainer.find('.class-changer__explain__activate-with__items').html(info.activateWith)
    # $infoContainer.find('.class-changer__explain__set-by__items').html(info.setBy).parent().css('display', "#{if info.setBy.length then 'block' else 'none'}")
    # $infoContainer.find('.class-changer__explain__name > code').text(info.name)

#     $(".#{STATE_CLASS_CHANGER_INFO_ACTIVE}").removeClass(STATE_CLASS_CHANGER_INFO_ACTIVE)
#     if $source.hasClass(CLASS_CHANGER_INFO)
#       $source.addClass(STATE_CLASS_CHANGER_INFO_ACTIVE)
#       @_clearInfoIndicators()

#     height = "#{$infoContainer.children().outerHeight()}px"
#     $infoContainer.css('height', height)
#     transition = !$infoContainer.hasClass("#{CLASS_CHANGER_EXPLAIN}--is-active")

#     $infoContainer.addClass("#{CLASS_CHANGER_EXPLAIN}--is-active")

#     if transition
#       $infoContainer.transitionEnd -> $infoContainer.css('height', 'auto')

#   _classChangeInfo: (event) =>
#     event.stopImmediatePropagation()
#     $this = $(event.target)

#     details = ClassChangers.elementToInfoObject($this.closest(".#{CLASS_CHANGER}"))
#     @infoRequest details, $this

#   _closeInfoBox: (event) =>
#     event.stopImmediatePropagation()
#     $this = $(event.target).closest(".class-changer__explain")
#     $this.css('height', $this.outerHeight())
#     Lemon.delay -> $this.css('height', 0)
#     $this.removeClass("#{CLASS_CHANGER_EXPLAIN}--is-active")
#     $(".#{STATE_CLASS_CHANGER_INFO_ACTIVE}").removeClass(STATE_CLASS_CHANGER_INFO_ACTIVE)
#     @_clearInfoIndicators()


#   _clearInfoIndicators: ->
#     @message
#       type: Docks.EVENT_TYPE_INFO_CLEAR

#   applyInitialClasses: ->
#     @$classChangers.each (index, classChanger) =>
#       $classChanger = $(classChanger)
#       if $classChanger.attr(ATTR_CLASS_CHANGER_DEFAULT) == 'true'
#         @_changeChangerState $classChanger, MESSAGE_METHOD_ADD

# ClassChangers.elementToInfoObject = ($el) ->
#   details = {}

#   details.name = $el.attr(ATTR_CLASS_CHANGER_NAME)
#   details.type = $el.attr(ATTR_CLASS_CHANGER_TYPE)
#   details.description = $el.attr(ATTR_CLASS_CHANGER_DESCRIPTION)

#   details.precludes = createCommaString($el, ATTR_CLASS_CHANGER_PRECLUDES, 'or')
#   details.activateWith = createCommaString($el, ATTR_CLASS_CHANGER_ACTIVATE_WITH, 'and')
#   details.setBy = createCommaString($el, ATTR_CLASS_CHANGER_SET_BY, 'and')

#   details

# ClassChangers.elementToDetails = ($el) ->
#   {
#     baseClass: $el.attr(ATTR_CLASS_CHANGER_BASE_CLASS)
#     variantClass: $el.attr(ATTR_CLASS_CHANGER_NAME)
#     activateWith: $el.attr(ATTR_CLASS_CHANGER_ACTIVATE_WITH)
#     precludes: $el.attr(ATTR_CLASS_CHANGER_PRECLUDES).split(', ')
#     setBy: $el.attr(ATTR_CLASS_CHANGER_SET_BY).split(', ')
#     filterTo: $el.attr(ATTR_CLASS_FILTER_TO)
#     jsAction: $el.attr(ATTR_CLASS_CHANGER_JS_ACTION)
#   }

