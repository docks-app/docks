Helpers =
  base_class: (klass, full = false) ->
    if full then klass.split("--")[0].split("__")[0] else klass.split("--")[0]

  is_in_iframe: ->
    window.parent != window

window.Docks.Helpers = Helpers
