BASE_CLASS = "tab-list"

CLASSES =
  BASE: BASE_CLASS
  TAB: "#{BASE_CLASS}__tab"
  PANEL: "#{BASE_CLASS}__panel"

VARIANTS =
  BASE: MANAGES_URL: "#{CLASSES.BASE}--manages-url"

STATES =
  TAB: ACTIVE: "#{CLASSES.TAB}--is-active"
  PANEL: ACTIVE: "#{CLASSES.PANEL}--is-active"

tab_click = (event) ->
  event.preventDefault()
  tablist = Tablist.for(this)
  tablist?.activate_tab($(event.currentTarget).closest(".#{CLASSES.TAB}")[0])

panel_for_tab = (tab) ->
  return unless tab
  document.getElementById(tab.getAttribute("href").replace("#", ""))

$ ->
  $(document).on("click", ".#{CLASSES.TAB}", tab_click)

Tablist = (node) ->
  active_tab = node.querySelector(".#{STATES.TAB.ACTIVE}")
  active_panel = panel_for_tab(active_tab)
  this_manages_url = node.classList.contains(VARIANTS.BASE.MANAGES_URL)

  activate_tab = (tab = active_tab) ->
    return unless tab

    panel = panel_for_tab(tab)
    tab.classList.add(STATES.TAB.ACTIVE)
    panel?.classList.add(STATES.PANEL.ACTIVE)

    unless tab == active_tab
      active_tab?.classList.remove(STATES.TAB.ACTIVE)
      active_tab = tab

      active_panel?.classList.remove(STATES.PANEL.ACTIVE)
      active_panel = panel

      window.location.hash = "#tab--#{active_tab.id}" if this_manages_url

  tablist =
    activate_tab: activate_tab

  if this_manages_url
    tablist.activate_tab(window.location.hash && document.querySelector(window.location.hash.replace("tab--", "")))
  else
    tablist.activate_tab()

  tablist

Tablist.CLASSES = CLASSES
Tablist.STATES  = STATES

window.Docks.Tablist = Tablist
Lemon.make(Tablist, with_cache: true)
