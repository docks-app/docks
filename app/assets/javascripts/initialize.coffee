$ ->
  # Resizable and Class Changers
  # $classChangers = $(".#{Docks.CLASS_CHANGER}")
  # classChangers = new Docks.ClassChangers($classChangers) if $classChangers.length

  pluginObjects = {}
  for selector, klass of Docks.plugins
    $pluginEls = $(selector)
    pluginObjects[selector] = new klass($pluginEls) if $pluginEls.length

  # $(".function__signature").each (index, block) ->
  #   code = block.children[0]
  #   code.innerHTML = hljs.highlight("scss", code.innerHTML).value

  # Lemon.make(Docks.Iframe, selector: ".#{Docks.Demo.CLASSES.BASE} .#{Docks.Resizable.CLASSES.CONTENT}", with_cache: true)
  # Lemon.make(Docks.Resizable, with_cache: true)

  # $(".#{Docks.CLASS_DEMO}, .#{Docks.RESIZABLE_CONTENT}").each ->
  #   iframe = new Docks.Iframe $(this)
  #   iframe.register(classChangers) if classChangers?
  #   for selector, plugin of pluginObjects
  #     if plugin?
  #       iframe.register(plugin)
  #       plugin.registerDemoActions && plugin.registerDemoActions()

  # $(".#{Docks.RESIZABLE}").each ->
  #   resizable = new Docks.Resizable $(this)

  # classChangers.applyInitialClasses() if classChangers?
