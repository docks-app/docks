# CONSTANTS

BASE_CLASS = "code-block"

CLASSES =
  BASE: BASE_CLASS
  HEADER: "#{BASE_CLASS}__header"
  CODE: "#{BASE_CLASS}__code"
  HIDER: "#{BASE_CLASS}__hide-button"
  SELECT: "#{BASE_CLASS}__demo-selector"
  CODE_CONTAINER: "#{BASE_CLASS}__code-container"

VARIANTS =
  BASE:
    WITH_DEMO: "#{CLASSES.BASE}--with-demo"

  CODE:
    MAIN: "#{CLASSES.CODE}--main"
    HELPER: "#{CLASSES.CODE}--helper"

STATES = BASE: HIDDEN: "#{CLASSES.BASE}--is-hidden"

ATTRS =
  LANGUAGE: "data-code-block-language"
  CACHED_MAX_HEIGHT: "data-cached-max-height"

INDENTATION_SIZE = 2



# CLASS HELPER FUNCTIONS

#*
# Decodes HTML entities into their regulat string values.
#
# @symbol_type mixin
# @param {String} str - The encoded string.
# @returns {String} The decoded string.

decode_html_entities = (str) ->
  element = document.createElement('div')
  element.innerHTML = str.trim()
  if element.childNodes.length == 0 then "" else (element.childNodes[0].nodeValue || element.innerHTML)

#*
# Cleans a string of code and updates the string with syntax highlighting markup.
#
# @param {String} code - The raw code.
# @param {String} language_code ("html") - The language of the passed code. This
# is used by the syntax highlighter to pick the appropriate highlighter.
# @returns {String} The cleaned and syntax highlighted string.

clean_and_highlight_code = (code, language_code = "html") ->
  return unless code?
  code = decode_html_entities(code)

  code = code.replace(/(^\n|\n$)/, '')
             .replace(/\n^\s*\n/gm, "\n")

  if language_code == "html"
    indent_count = -INDENTATION_SIZE
    indented_code = []
    for code_line in code.split("\n")
      code_line = code_line.trim()

      [start_tag, end_tag] = [/^<[^\/]/.test(code_line), /^<\//.test(code_line)]
      indent_count += INDENTATION_SIZE if start_tag

      indent_count = Math.max(indent_count, 0)
      code_line = "#{if indent_count != 0 then Array(indent_count + 1).join(" ") else ""}#{code_line.trim()}"

      indent_count -= INDENTATION_SIZE if end_tag
      indent_count -= INDENTATION_SIZE if !end_tag && /<\//.test(code_line)

      indented_code.push(code_line)

    code = indented_code.join("\n")

  highlighted_code = hljs.highlight(language_code, code).value

  # Kills any leading spaces from each line
  leading_spaces = highlighted_code.match(/^\s*/)
  if leading_spaces
    leading_spaces = leading_spaces[0].length
    highlighted_code = highlighted_code.replace(new RegExp("^\\s{#{leading_spaces}}", 'gm'), '')

  # Indends helper code correctly
  if language_code == "erb"
    indent_count = /^[^\s]+\s*[^\s]*\s*/.exec(code)?[0]?.length
    return unless indent_count
    # highlighted_code = highlighted_code.split(/\n\s*/).join("<br>#{Array(indent_count + 1).join(" ")}")
    highlighted_code = highlighted_code.split(/\n/).join("<br>")

  highlighted_code.trim()

set_code = (code, container) ->
  return unless code?

  if typeof code != "string"
    container = code
    code = container.node.innerHTML

  container.markup = code
  highlighted_code = clean_and_highlight_code(code, container.language)
  container.node.innerHTML = highlighted_code

update_helper_code = (cache, current_markup, change) ->
  return unless current_markup?
  return unless change.details.set_by?

  add = change.add
  change = change.details

  helper_param = undefined
  code = current_markup

  change.set_by.forEach (set_by) ->
    return unless set_by?
    constant = ""
    helper_param = set_by

    helper_param = helper_param.replace /\s*\(([^\)]*)\)/, (match, match_constant) ->
      constant = match_constant
      ""

    helper_param = helper_param.trim()
    helper_matcher = ":?\"?#{helper_param.replace(":", "").replace("?", "\\?")}\"?:?\\s*(?:=>\\s*)?"

    if constant
      # If a value was actually declared for the set_by, find the current constant
      # and replace it as needed

      # key: VALUE, :key => VALUE, "key" => VALUE, :"key" => VALUE
      code = code.replace new RegExp("(#{helper_matcher})([a-zA-Z\\-_:]*)"), (match, param_portion, constant_portion) ->
        cache[helper_param] ?= [constant_portion]

        if change.method == "add"
          cache[helper_param].push(constant)
          "#{param_portion}#{constant}"
        else
          constants_for_param = cache[helper_param]
          return match unless constants_for_param?

          if (index = constants_for_param.indexOf(constant)) >= 0
            constants_for_param.splice(index, 1)

          replace_value = constants_for_param[constants_for_param.length - 1]
          "#{param_portion}#{replace_value}"

    else
      # No constant declared, assume it is true/ false
      code = code.replace new RegExp("(#{helper_matcher})(true|false)"), (match, param_portion, boolean_portion) ->
        "#{param_portion}#{if add then "true" else "false"}"

  code

cache_css_max_height = (code_container) ->
  code_container.setAttribute(ATTRS.CACHED_MAX_HEIGHT, parseInt(window.getComputedStyle(code_container).maxHeight))

hide_without_transition = (index, code_container) ->
  $code_container = $(code_container)
  $code_container.css
    transition: "none"
    maxHeight: "0px"

  code_container.offsetHeight
  $code_container.css(transition: "")



# CLASS EVENT HANDLERS

select_change = (event) ->
  CodeBlock.for(this)?.send
    type: Docks.EVENTS.MARKUP_REQUEST
    demo: event.target.value

toggle_code_block_visibility = (event) -> CodeBlock.for(this)?.toggle()

scroll = (event) ->
  container = event.currentTarget
  scroll_top = container.scrollTop
  scroll_height = container.scrollHeight
  height = container.offsetHeight
  delta = if event.type == "DOMMouseScroll" then event.originalEvent.detail * -40 else event.originalEvent.wheelDelta
  up = delta > 0

  return if Math.abs(scroll_height - height) <= 2

  prevent = ->
    event.stopPropagation()
    event.preventDefault()
    event.returnValue = false
    false

  if !up && -delta > scroll_height - height - scroll_top
    # Scrolling down, but this will take us past the bottom.
    container.scrollTop = scroll_height
    prevent()

  if up && delta > scroll_top
    # Scrolling up, but this will take us past the top.
    container.scrollTop = 0
    prevent()

select_code = (event) ->
  target = event.target

  setTimeout ->
    if window.getSelection && document.createRange
      range = document.createRange()
      range.selectNodeContents(target)
      selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)

    else if document.body.createTextRange
      range = document.body.createTextRange()
      range.moveToElementText(target)
      range.select()

  , 0

$(document).on("click", ".#{CLASSES.HIDER}", toggle_code_block_visibility)
$(document).on("focusin", ".#{CLASSES.CODE}", select_code)
$(document).on("change", ".#{Docks.Select.CLASSES.BASE}", select_change)



# CONSTRUCTOR

CodeBlock = (node) ->
  code_caches =
    main: do ->
      main_code = node.querySelector(".#{VARIANTS.CODE.MAIN}")

      node: main_code.querySelector("code")
      language: main_code.getAttribute(ATTRS.LANGUAGE) || "html"
      markup: undefined

    helper: do ->
      if (helper_code = node.querySelector(".#{VARIANTS.CODE.HELPER}"))
        node: helper_code.querySelector("code")
        language: helper_code.getAttribute(ATTRS.LANGUAGE) || "erb"
        markup: undefined
      else
        undefined

  helper_values = {}

  # Prevents the rare issue where there would be a code container within another one.
  code_containers = $(node).find(".#{CLASSES.CODE_CONTAINER}").filter (index, element) ->
    $(element).closest(".#{CLASSES.BASE}")[0] == node
  # code_containers.on("DOMMouseScroll mousewheel", scroll)
  code_containers = code_containers.toArray()

  cache_css_max_height(code_container) for code_container in code_containers

  hide_button = node.querySelector(".#{CLASSES.HIDER}")
  instance_update_helper_code = Lemon.curry(update_helper_code, helper_values)

  toggle = ->
    if node.classList.contains(STATES.BASE.HIDDEN)
      node.classList.remove(STATES.BASE.HIDDEN)
      hide_button.textContent = "Hide"

      active_code_container = undefined
      for code_container in code_containers
        if $(code_container).closest(".#{Docks.Tablist.STATES.PANEL.ACTIVE}").length
          active_code_container = code_container
          break

      height_cleanup = ->
        active_code_container.removeEventListener("transitionend", height_cleanup)
        code_container.style.maxHeight = null for code_container in code_containers

      active_code_container.addEventListener("transitionend", height_cleanup)

      code_container.style.maxHeight = "#{Math.min(code_container.children[0].scrollHeight + 20, code_container.getAttribute(ATTRS.CACHED_MAX_HEIGHT))}px" for code_container in code_containers
    else
      node.classList.add(STATES.BASE.HIDDEN)
      hide_button.textContent = "Show"
      code_container.style.maxHeight = "#{Math.min(code_container.children[0].scrollHeight + 20, code_container.getAttribute(ATTRS.CACHED_MAX_HEIGHT))}px" for code_container in code_containers
      Lemon.delay ->
        code_container.style.maxHeight = "0px" for code_container in code_containers

  code_block =
    receive: (event) ->
      switch event.type
        when Docks.EVENTS.MARKUP_REQUEST, Docks.EVENTS.MARKUP_CHANGE
          set_code(event.html, code_caches.main)

        when Docks.EVENTS.CLASS_CHANGE
          set_code(instance_update_helper_code(code_caches.helper.markup, event), code_caches.helper) if code_caches.helper?

      return

    toggle: toggle

  Lemon.mix(Docks.Iframe.Mixins.Registerable, into: code_block)
  Docks.Iframe.register_with_iframe_id(code_block, node.getAttribute(Docks.Iframe.ATTRS.ID))

  set_code(code_caches.helper)
  set_code(code_caches.main)

  code_block.send(type: Docks.EVENTS.MARKUP_REQUEST) if code_block.registered

  code_block



# CLASS PUBLIC INTERFACE

CodeBlock.CLASSES = CLASSES
CodeBlock.STATES  = STATES



# SETUP

Lemon.make(CodeBlock, with_cache: true)
window.Docks.CodeBlock = CodeBlock
$ -> $(".#{STATES.BASE.HIDDEN} .#{CLASSES.CODE_CONTAINER}").each(hide_without_transition)
