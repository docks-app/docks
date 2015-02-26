BASE_CLASS = "x-ray"

CLASSES =
  BASE: BASE_CLASS

STATES =
  BASE: ACTIVE: "#{CLASSES.BASE}--is-active"

HELPERS =
  ACTIVE: "#{CLASSES.BASE}__helpers--x-ray-is-active"

ATTRS =
  TRIGGERS_XRAY: "data-xray-trigger"


Xray = (node) ->
  exploded = Docks.Exploded.for(node.querySelector(".#{Docks.Exploded.CLASSES.BASE}"))
  button = node.querySelector("button")

  xray =
    toggle: ->
      node.classList.toggle(STATES.BASE.ACTIVE)
      document.body.classList.toggle(HELPERS.ACTIVE)
      # window.scrollTo(0, 0)

    receive: (event) ->
      if event.type == Docks.EVENTS.MARKUP_REQUEST
        exploded.set_markup(event.html)

  button.addEventListener("click", xray.toggle)
  $(document).on "click", "[#{ATTRS.TRIGGERS_XRAY}]", (event) ->
    iframe = Docks.Iframe.for_id(event.target.getAttribute(ATTRS.TRIGGERS_XRAY))
    iframe.send(type: Docks.EVENTS.MARKUP_REQUEST)
    xray.toggle()

  Lemon.mix(Docks.Iframe.Mixins.Registerable, into: xray)
  Docks.Iframe.register_with_all_iframes(xray)

  xray

Xray.CLASSES = CLASSES

Lemon.make(Xray)
