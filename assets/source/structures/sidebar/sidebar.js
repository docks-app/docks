const classes = {
  base: "sidebar",
  toggler: "sidebar__toggler"
};

const states = {
  base: { active: `${classes.base}--is-active` }
};

var Sidebar, root, show, hide, toggle, check_for_sidebar_state_change;

//*
// Reveals the sidebar.

show = () => {
  root.classList.add(states.base.active);
  setTimeout(() => { document.addEventListener("click", check_for_sidebar_state_change); }, 0);
};

//*
// Hides the sidebar.

hide = () => {
  document.removeEventListener("click", check_for_sidebar_state_change);
  root.classList.remove(states.base.active);
};

//*
// Toggles the visibility of the sidebar.

toggle = () => {
  return Sidebar.is_active ? hide() : show();
};

//*
// Captures all clicks when the sidebar is active and checks whether or not the
// sidebar should change its visibility. If the sidebar is clicked on, it should
// remain open — otherwise, it should close.
//
// @param {Object} event - The `click` event on the `document`.
// @private

check_for_sidebar_state_change = (event) => {
  if(!$(event.target).closest(`.${classes.base}`).length) { hide(); }
};

//*
// The global sidebar object. Use this method for manually updating the state of
// the sidebar; however, note that click events on the toggler and when the
// sidebar is open are handled automatically by the component itself.

Sidebar = {
  show,
  hide,
  toggle,

  get is_active() {
    return root.classList.contains(states.base.active);
  },

  init() {
    root = document.querySelector(`.${classes.base}`);
    if(!root) { return; }

    document.querySelector(`.${classes.toggler}`).addEventListener("click", toggle);
  }
};

export default Sidebar;
