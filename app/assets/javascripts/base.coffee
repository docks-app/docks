plugins = {}

Docks =
  register_plugin: (klass, selector) ->
    plugins[selector] = klass

# REMOVE
class Docks
  @plugins = plugins

  @registerPlugin: (klass, selector) ->
    plugins[selector] = klass

  @baseClass = (klass, full = false) ->
    if full then klass.split('--')[0].split('__')[0] else klass.split('--')[0]

window.Docks = Docks
