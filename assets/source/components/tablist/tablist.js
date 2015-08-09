import QueryString from "~utilities/query_string";
import Builder from "~utilities/builder";
import Cache from "~utilities/dom_cache";

const classes = {
  root: "tablist",
  tab: "tablist__tab",
  panel: "tablist__panel"
};

const variants = {
  root: { manages_url: "tablist--manages-url" }
};

const states = {
  tab: { active: "tablist__tab--is-active" },
  panel: { active: "tablist__panel--is-active" }
};

var Tablist, tab_click, panel_for_tab, tab_for_panel, tablist_for_node, a11y,
    apply_activation_markup, remove_activation_markup, panel_containing_node;

//*
// Manages a click on a tab by finding the associated `Tablist` and activating
// the tab that was clicked on.
//
// @param {Object} event - The `click` event.
// @private

tab_click = (event) => {
  var tablist;

  event.preventDefault();

  tablist = Tablist.for(event.target);
  if(!tablist) { return; }
  tablist.activate_tab($(event.currentTarget).closest(`.${classes.tab}`)[0]);
};

//*
// Finds the tab panel associated with the passed tab. The association is based
// on the ID of the tab panel matching the `href` of the tab.
//
// @param {HTMLElement} tab - The tab for which you want the associated panel.
// @private
//
// @returns {HTMLElement | null} The associated tab panel or, if no matching
// panel was found, `null`.

panel_for_tab = (tab) => {
  return tab && document.getElementById(tab.getAttribute("href").replace("#", ""));
};

//*
// Finds the tab associated with the passed panel. The association is based
// on the ID of the tab panel matching the `href` of the tab.
//
// @param {HTMLElement} tab - The tab for which you want the associated panel.
// @private
//
// @returns {HTMLElement | null} The associated tab or, if no matching panel
// was found, `null`.

tab_for_panel = (panel) => {
  return panel && document.querySelector(`.${classes.tab}[href='#${panel.id}']`);
};

//*
// Writes all of the required accessibility markup to the tablist and its
// subcomponents. This includes IDs for the tablist and its tabs/ panels,
// roles for the same, and the `aria-` associations between tabs and their
// corresponding panels.
//
// @param {HTMLElement} tablist - The root node of the tablist.
// @private

a11y = (() => {
  var current_ids, id_for;

  current_ids = {
    [classes.root]: 1,
    [classes.tab]: 1,
    [classes.panel]: 1
  };

  id_for = (node) => {
    var type = node.className.split(" ")[0];
    return `${type}--${current_ids[type]++}`;
  };

  return (tablist) => {
    var panel, tab_id, panel_id, tab;

    tablist.id = tablist.id || id_for(tablist);
    tablist.setAttribute("role", "tablist");

    for(tab of Array.from(tablist.querySelectorAll(`.${classes.tab}`))) {
      panel = panel_for_tab(tab);
      if(!panel) { continue; }

      tab_id = tab.id || id_for(tab);
      panel_id = panel.id || id_for(panel);

      tab.id = tab_id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", panel_id);
      tab.setAttribute("href", `#${panel_id}`);

      panel.id = panel_id;
      panel.setAttribute("role", "tab-panel");
      panel.setAttribute("aria-labelledby", tab_id);
      panel.setAttribute("aria-hidden", !panel.classList.contains(states.panel.active));
    }
  };
})();

apply_activation_markup = (node) => {
  if(!node) { return; }

  if(node.classList.contains(classes.tab)) {
    node.classList.add(states.tab.active);
  } else {
    node.classList.add(states.panel.active);
  }
};

remove_activation_markup = (node) => {
  if(!node) { return; }

  if(node.classList.contains(classes.tab)) {
    node.classList.remove(states.tab.active);
  } else {
    node.classList.remove(states.panel.active);
  }
};

panel_containing_node = (node) => {
  return $(node).closest(`.${classes.panel}`)[0];
};

tablist_for_node = (node) => {
  if(node.classList.contains(classes.panel)) {
    node = tab_for_panel(node);
  }

  return $(node).closest(`.${classes.root}`)[0];
};

//*
// The constructor around a `Tablist` component. This constructor returns a very
// small API: only an `activate_tab` method is exposed, which will activate the
// passed tab in the tablist. This constructor will also ensure that all the
// aria properties and associations are hooked up correctly.

Tablist = (root) => {
  var active_tab = root.querySelector(`.${states.tab.active}`),
      active_panel = panel_for_tab(active_tab),
      saved_tab, api, self;

  a11y(root);

  self = {
    root,
    id: root.id,
    active_panel: panel_for_tab(active_tab),
    manages_url: root.classList.contains(variants.root.manages_url)
  };

  api = {
    //*
    // Activates the passed tab, deactivating the currently-active tab, if there
    // is one (and it is not the passed tab).
    //
    // @param {HTMLElement} tab - The tab to activate.

    activate_tab(tab) { this.active_tab = tab; },

    get active_tab() { return active_tab; },
    set active_tab(tab) {
      var panel = panel_for_tab(tab);

      apply_activation_markup(tab);
      apply_activation_markup(panel);

      if(!tab || tab === active_tab) { return; }

      remove_activation_markup(active_tab);
      remove_activation_markup(active_panel);

      active_tab = tab;
      active_panel = panel;

      if(this.manages_url && QueryString.get(this.id) !== tab.id) {
        QueryString.set(this.id, tab.id);
      }
    },

    get active_panel() { return active_panel; },
    set active_panel(panel) {
      this.active_tab = panel_for_tab(panel);
    }
  };

  if(self.manages_url) {
    saved_tab = QueryString.get(self.id);
    if(saved_tab) { api.active_tab = document.getElementById(saved_tab); }
  } else {
    api.active_tab = active_tab;
  }

  return api;
};

Tablist.for = (node) => {
  var tablist_node = $(node).closest(`.${classes.root}`)[0],
      containing_panel;

  if(!tablist_node) {
    containing_panel = node.classList.contains(classes.panel) ? node : panel_containing_node(node);
    if(!containing_panel) { return false; }
    tablist_node = tablist_for_node(containing_panel);
  }

  if(!tablist_node) { return false; }
  return Cache(tablist_node).get(classes.root);
};

Tablist.init = () => {
  Builder.build_and_cache(Tablist, { name: classes.root });
  $(document).on("click", `.${classes.tab}`, tab_click);
};

Tablist.activate_panel_containing = (node) => {
  var panel = $(node).closest(`.${classes.panel}`)[0],
      tablist = Tablist.for(panel);

  if(tablist) { tablist.active_tab = tab_for_panel(panel); }
  return !!tablist;
};

Tablist.is_in_active_panel = (node) => {
  var panel = panel_containing_node(node);
  return !!panel && panel.classList.contains(states.panel.active);
};

export default Tablist;
