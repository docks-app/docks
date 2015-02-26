CLASSES =
  HIGHLIGHT: "filter__highlight"

ATTRS =
  FILTERS: "data-filters"

puts = ->
  console.log(arguments...)

highlight_characters = (value, text) ->
  return text unless value.length

  [start_tag, end_tag] = ["<span class='#{CLASSES.HIGHLIGHT}'>", "</span>"]
  [value_index, value_char] = [0, value[0]]
  last_index = 0
  new_text = ""
  old_text = text

  for char, index in old_text
    if char.toLowerCase() == value_char.toLowerCase()
      new_text += "#{old_text[last_index...index]}#{start_tag}#{char}#{end_tag}"
      last_index = index + 1
      value_index += 1
      value_char = value[value_index]

      break unless value_char?

  new_text += old_text[last_index..-1]
  new_text



Filter = (node) ->
  filter_selectors = node.getAttribute(ATTRS.FILTERS).split(/\s*,\s*/)
  lists_to_filter = Array::map.call filter_selectors, (selector) ->
    window.Docks.List.for(document.querySelector(selector))

  $(node).on "input", ->
    value = node.value.split("")
    match_regex = new RegExp(value.join(".*?"), "i")

    highlight_function = Lemon.curry(highlight_characters, value)
    list.filter_to_match(match_regex, highlight_function) for list in lists_to_filter
    return

Lemon.make(Filter, selector: "[#{ATTRS.FILTERS}]")
