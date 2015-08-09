BASE_CLASS = "details-sheet"

CLASSES =
  BASE: BASE_CLASS
  OVERLAY: "#{BASE_CLASS}__overlay"
  CLOSER: "#{BASE_CLASS}__close"
  NAME: "#{BASE_CLASS}__name"
  TYPE: "#{BASE_CLASS}__type"
  DESCRIPTION: "#{BASE_CLASS}__description"
  PRECLUDES: "#{BASE_CLASS}__precludes"
  ACTIVATE_WITH: "#{BASE_CLASS}__activate-with"
  SET_BY: "#{BASE_CLASS}__set-by"

STATES =
  BASE: ACTIVE: "#{CLASSES.BASE}--is-active"
  OVERLAY: ACTIVE: "#{CLASSES.OVERLAY}--is-active"


create_comma_string = (items, options = {}) ->
  connector = options.connector || "and"
  string = ""

  for item, index in items
    new_string = "<code>#{item}</code>"
    new_string = ", #{new_string}" if index > 0 && index < items.length - 1
    new_string = ", #{connector} #{new_string}" if index > 0 && index == items.length - 1 && items.length > 2
    new_string = " #{connector} #{new_string}" if index > 0 && index == items.length - 1 && items.length == 2
    string += new_string

  string

sheet = undefined

fill_in_details = (details) ->
  sheet.name.innerHTML = details.name
  node.innerHTML = details.type for node in sheet.type

  sheet.description.innerHTML = details.description
  sheet.description.parentNode.style.display = if details.description.length then "" else "none"

  for complex_attr in ["precludes", "activate_with", "set_by"]
    sheet[complex_attr].innerHTML = create_comma_string(details[complex_attr])
    sheet[complex_attr].parentNode.style.display = if details[complex_attr].length then "" else "none"

show_sheet = ->
  sheet.base.classList.add(STATES.BASE.ACTIVE)
  sheet.overlay.classList.add(STATES.OVERLAY.ACTIVE)

hide_sheet = ->
  sheet.base.classList.remove(STATES.BASE.ACTIVE)
  sheet.overlay.classList.remove(STATES.OVERLAY.ACTIVE)


$ ->
  node = document.querySelector(".#{CLASSES.BASE}")
  return unless node

  sheet =
    base: node
    overlay: node.nextElementSibling
    name: node.querySelector(".#{CLASSES.NAME}")
    type: node.querySelectorAll(".#{CLASSES.TYPE}")
    description: node.querySelector(".#{CLASSES.DESCRIPTION}")
    precludes: node.querySelector(".#{CLASSES.PRECLUDES}")
    activate_with: node.querySelector(".#{CLASSES.ACTIVATE_WITH}")
    set_by: node.querySelector(".#{CLASSES.SET_BY}")

$(document).on("click touchend", ".#{CLASSES.OVERLAY}", hide_sheet)

DetailsSheet =
  present: (details) ->
    return unless sheet
    fill_in_details(details)
    show_sheet()

  receive: (event) ->
    return unless event.type == Docks.EVENTS.INFO_REQUEST

    @present(event.details)

Lemon.mix(Docks.Iframe.Mixins.Registerable, into: DetailsSheet)
$ -> Docks.Iframe.register_with_all_iframes(DetailsSheet)

window.Docks.DetailsSheet = DetailsSheet
