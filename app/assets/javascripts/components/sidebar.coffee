BASE_CLASS = "sidebar"

CLASSES =
  BASE: BASE_CLASS
  TOGGLER: "#{BASE_CLASS}__toggler"

STATES =
  BASE: ACTIVE: "#{CLASSES.BASE}--is-active"

sidebar_node = undefined

show = -> sidebar_node.classList.add(STATES.BASE.ACTIVE)
hide = -> sidebar_node.classList.remove(STATES.BASE.ACTIVE)
toggle = -> if Sidebar.is_active then hide() else show()

$ ->
  sidebar_node = document.querySelector(".#{CLASSES.BASE}")
  $(document).on("click", check_for_sidebar_state_change) if sidebar_node

check_for_sidebar_state_change = (event) ->
  $target = $(event.target)
  if $target.closest(".#{CLASSES.TOGGLER}").length
    toggle()
  else if Sidebar.is_active && !$(event.target).closest(".#{CLASSES.BASE}").length
    hide()

  return

Sidebar =
  show: show
  hide: hide
  toggle: toggle

Object.defineProperty Sidebar, "is_active", get: ->
  sidebar_node?.classList.contains(STATES.BASE.ACTIVE)

Docks.Sidebar = Sidebar
