BASE_CLASS = "list"

CLASSES =
  BASE: BASE_CLASS
  SUBLIST: "#{BASE_CLASS}__sublist"
  ITEM: "#{BASE_CLASS}__item"
  ITEM_CONTAINER: "#{BASE_CLASS}__item__container"
  HEADING: "#{BASE_CLASS}__heading"
  TOGGLE_INDICATOR: "#{BASE_CLASS}__toggle-indicator"

STATES =
  SUBLIST:
    TOGGLED: "#{CLASSES.SUBLIST}--is-toggled-on"
    HIDDEN: "#{CLASSES.SUBLIST}--is-hidden"

  ITEM:
    HIDDEN: "#{CLASSES.ITEM}--is-hidden"
    FIRST_VISIBLE: "#{CLASSES.ITEM}--is-first-visible-item"

VARIANTS =
  SUBLIST: TOGGLEABLE: "#{CLASSES.SUBLIST}--toggleable"

TOGGLE_INDICATOR_MARKUP = "<div class='#{CLASSES.TOGGLE_INDICATOR}'></div>"




forward_toggle_click = (event) -> List.for(event.target).toggle_sublist(event.target)

$(document).on("click", ".#{VARIANTS.SUBLIST.TOGGLEABLE} .#{CLASSES.HEADING}", forward_toggle_click)



create_toggle_indicators_for = (list) ->
  $(list).find(".#{VARIANTS.SUBLIST.TOGGLEABLE} > .#{CLASSES.HEADING}").each (index, toggler) ->
    $(toggler).append(TOGGLE_INDICATOR_MARKUP)


show_and_hide_sublist = (sublist) ->
  show_and_hide_sublist(sub_sublist) for sub_sublist in sublist.sublists

  all_items_hidden = sublist.items.length == 0 || sublist.items.every (item) ->
    item.hidden

  all_sublists_hidden = sublist.sublists.length == 0 || sublist.sublists.every (sub_sublist) ->
    sub_sublist.hidden

  sublist.hidden = all_items_hidden && all_sublists_hidden

  class_list = sublist.node.classList
  if sublist.hidden
    class_list.add(STATES.SUBLIST.HIDDEN)
  else
    class_list.remove(STATES.SUBLIST.HIDDEN)
    class_list.add(STATES.SUBLIST.TOGGLED) if class_list.contains(VARIANTS.SUBLIST.TOGGLEABLE)

filter_items = (sublist, regex, highlight_function) ->
  filter_items(sub_sublist, regex, highlight_function) for sub_sublist in sublist.sublists

  found_unhidden_item = false
  for item in sublist.items
    if regex.test(item.content)
      found_unhidden_item = true
      item.node.classList[if found_unhidden_item then "remove" else "add"](STATES.ITEM.FIRST_VISIBLE)
      item.node.innerHTML = highlight_function(item.content)

      if item.hidden
        item.node.classList.remove(STATES.ITEM.HIDDEN)
        item.hidden = false

    else
      unless item.hidden
        item.hidden = true
        item.node.classList.add(STATES.ITEM.HIDDEN)

list_mini_constructors =
  item: (node) ->
    node: node
    hidden: false
    content: node.textContent.trim()

  sublist: (node) ->
    $item_container = $(node).children(".#{CLASSES.ITEM_CONTAINER}")

    node: node
    hidden: false
    sublists: Array::map.call $item_container.children(".#{CLASSES.SUBLIST}"), (item) ->
      list_mini_constructors.sublist(item)
    items: Array::map.call $item_container.children(".#{CLASSES.ITEM}"), (item) ->
      list_mini_constructors.item(item)


List = (node) ->
  create_toggle_indicators_for(node)

  sublists = Array::map.call $(node).children(".#{CLASSES.SUBLIST}"), (sublist) ->
    list_mini_constructors.sublist(sublist)

  filter_to_match = (regex, highlight_function) ->
    for sublist in sublists
      filter_items(sublist, regex, highlight_function)
      show_and_hide_sublist(sublist)

  list =
    filter_to_match: filter_to_match

    toggle_sublist: (sublist) ->
      $(sublist).closest(".#{CLASSES.SUBLIST}").toggleClass(STATES.SUBLIST.TOGGLED)

  list

List.CLASSES = CLASSES

Lemon.make(List, with_cache: true)
window.Docks.List = List
