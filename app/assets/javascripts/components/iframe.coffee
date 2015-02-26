# CONSTANTS

CLASSES = BASE: "iframe"

ATTRS = ID: "data-iframe-id"

POSITIONS =
  PARENT: "parent"
  CHILD: "child"

EVENTS =
  MARKUP_REQUEST: "mr"
  HEIGHT_CHANGE:  "hc"
  MARKUP_CHANGE:  "mc"
  INFO_REQUEST:   "ir"
  INFO_CLEAR:     "ic"
  CLASS_CHANGE:   "cc"
  HEIGHT_REQUEST: "hr"
  EVENT_HANDLER:  "eh"



iframes = []

# CONSTRUCTOR

Iframe = (node) ->
  id = node.getAttribute(ATTRS.ID)
  ready = false
  listeners = []
  message_queue = []

  [position, message_target] = if node.tagName.toLowerCase() == "iframe"
    [POSITIONS.PARENT, node.contentWindow]
  else
    ready = true
    [POSITIONS.CHILD, window.parent]

  node.addEventListener "load", ->
    ready = true
    message_queue.forEach (queued_message) -> message(queued_message)
    message_queue = []

  window.addEventListener "message", (event) ->
    if typeof event.data == "string"
      data = JSON.parse(event.data)
      return unless data.id == id

      listeners.forEach (listener) ->
        listener.receive && listener.receive(data)
        return

  message = (data) -> message_target.postMessage(JSON.stringify(data), "*")

  iframe =
    send: (data) ->
      # Duplicate so that each iframe can add its own ID
      data = JSON.parse(JSON.stringify(data))
      data.id ?= id

      if ready then message(data) else message_queue.push(data)

    register: (listener) ->
      return unless listener.registerable
      listeners.push(listener)
      listener.register_with(this)

  iframes.push(iframe)

  iframe



# CLASS PUBLIC INTERFACE

Iframe.ATTRS   = ATTRS
Iframe.CLASSES = CLASSES

Iframe.register_with_iframe_id = (obj, id) ->
  return unless obj.registerable
  iframe = document.querySelector(".#{CLASSES.BASE}[#{ATTRS.ID}=#{id}]")
  return unless iframe?
  obj.registered = true
  Iframe.for(iframe)?.register(obj)

Iframe.register_with_all_iframes = (obj) ->
  return unless obj.registerable
  iframe.register(obj) for iframe in iframes
  obj.registered = true

Iframe.for_id = (iframe_id) ->
  Iframe.for(document.querySelector(".#{CLASSES.BASE}[#{ATTRS.ID}=#{iframe_id}]"))



# MIXINS

Iframe.Mixins =
  Registerable: ->
    private_iframes = []

    @registerable = true

    @send = (data) ->
      private_iframes.forEach (iframe) -> iframe.send(data)

    @register_with = (iframe) ->
      private_iframes.push(iframe)

    @receive ?= ->



# SETUP

window.Docks.EVENTS = EVENTS
window.Docks.Iframe = Iframe

Lemon.make(Iframe, with_cache: true)
