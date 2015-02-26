each_node_for_base_class = (Obj, selector, callback) ->


Lemon =
  KEYCODES:
    LEFT: 37
    UP: 38
    RIGHT: 39
    DOWN: 40
    ENTER: 13
    SPACE: 32

  delay: (func) ->
    setTimeout func, 0

  listen_for: (events, options = {}) ->
    events = events.split(" ") if typeof events == "string"
    events.forEach (event) ->
      options.on.addEventListener event, options.with

  stop_listening_for: (events, options = {}) ->
    events = events.split(" ") if typeof events == "string"
    events.forEach (event) ->
      options.on.removeEventListener event, options.with

  arrayify: (obj) ->
    args = []
    for i in [1...arguments.length]
      args.push(arguments[i])

    [].slice.apply(obj, args)

  curry: ->
    fn = arguments[0]
    args = Lemon.arrayify(arguments, 1)

    ->
      fn.apply(null, args.concat(Lemon.arrayify(arguments)))

  mix: (mixin, options = {}) ->
    return unless options.into
    mixin.call(options.into)
    options.into

  make: (Obj, options = {}) ->
    options.selector ?= ".#{Obj.CLASSES.BASE}"

    if options.with_cache
      Obj.for = (node) ->
        $(node).closest(options.selector).data(Obj.CLASSES.BASE)

    $ ->
      $(options.selector).each ->
        obj = Obj(this)
        return unless obj

        $(this).data(Obj.CLASSES.BASE, obj) if options.with_cache
        Lemon.mix(options.mixin, into: obj) if options.mixin
        options.callback(obj) if options.callback

window.Lemon = Lemon

