import Modal from "~components/modal";
import { Communicator } from "~components/iframe";
import Keycodes from "~utilities/keycodes";
import Pattern from "~utilities/pattern";
import Builder from "~utilities/builder";
import Events from "~utilities/events";
import { naming_convention } from "~utilities/naming_convention";

const classes = {
  root: "toggle",
  info: "toggle__info",
  container: "toggle__container"
};

const states = {
  root: {
    locked: "toggle--is-locked",
    active: "toggle--is-active",
    partially_active: "toggle--is-partially-active"
  }
};

const attrs = {
  name: "data-variation-name"
};

var Toggle, Toggles,
    handle_keypress, info_click, toggle_click, update_toggle_state;

//*
// Listens and responds to keypress events while focused on a toggle. If either
// space or enter are pressed, the toggle will be toggled as if it had been
// clicked on. This allows for keyboard-only navigation and manipulation of
// toggles.
//
// @param {Object} event - The `keypress` event.
// @private

handle_keypress = (event) => {
  if(![Keycodes.ENTER, Keycodes.SPACE].include(event.which)) { return; }
  event.preventDefault();
  update_toggle_state(event.target);
};

//*
// Listens for clicks on the information icon in the toggle and activates the
// modal to present details on that variation.
//
// @param {Object} event - The `click` event.
// @private

info_click = (event) => {
  var variation_name;

  // Prevent the click event from propagating to the toggle.
  event.stopImmediatePropagation();
  event.preventDefault();

  variation_name = $(event.target).closest(`.${classes.root}`)[0].getAttribute(attrs.name);
  Modal.present(Pattern.find(variation_name, { search_all: true }));
};

//*
// Listens for click events on a toggle and updates the state of the toggle
// appropriately.
//
// @param {Object} event - The `click` event.
// @private

toggle_click = (event) => {
  event.preventDefault();
  update_toggle_state(event.target);
};

//*
// Updates the status of the passed changer. If the `add` attribute of the
// `option` argument is defined, a truthy value will activate the changer
// and a falsey one will deactivate it. Otherwise, the changer will simply
// have its state toggled.
//
// @private
//
// @param {HTMLElement, Toggle, String} toggle - The whose state should be
// updated. Anything that can be resolved to a `Toggle` via `Toggle.for`
// can be used here, including a `Toggle`, the `HTMLElement` that is the root
// of the toggle, or a `String` that is the name of a toggle.
//
// @param {Object} [options = {}] - The options to use for this update. Currently,
// only the `add` option is read to determine whether the toggle should be
// activated or deactivated. If no `options` argument is passed, the `toggle`
// will simply be toggled.

update_toggle_state = (toggle, options = {}) => {
  var toggle_node, all_toggles, variation, add, currently_active,
      activate_with, activate_with_toggle, preclude;

  toggle = Toggle.for(toggle);
  if(toggle.locked) { return; }
  toggle_node = toggle.root;
  toggle.lock();

  all_toggles = Toggles.for(toggle_node);
  variation = Pattern.for(toggle_node.getAttribute(attrs.name), { search_all: true });
  add = (options.add ? !!options.add : !toggle.active);

  // Update the state of all variations that should be activated with the
  // current toggle.
  for(activate_with of ((variation && variation.activate_with) || [])) {
    if(naming_convention.is_component(variation)) { continue; }

    activate_with_toggle = Toggle.for(activate_with);

    if(activate_with_toggle) {
      currently_active = activate_with_toggle.active;
      if((currently_active && !add) || (!currently_active && add)) {
        update_toggle_state(activate_with_toggle, { add: add });
      }
    } else {
      all_toggles.trigger({
        add,
        details: {
          for: naming_convention.component_name(activate_with),
          name: activate_with
        }
      });
    }
  }

  // TODO: something about filters.
  if(add) {
    toggle.activate();

    // Deactivates any currently active variations that are precluded from being
    // active with the current variation.
    for(preclude of ((variation && variation.precludes) || [])) {
      preclude = Toggle.for(preclude);
      if(preclude && preclude.active) { update_toggle_state(preclude, { add: false }); }
    }
  } else {
    toggle.deactivate();
  }

  toggle.unlock();
  all_toggles.trigger({ add, details: variation });
};

//*
// A constructor around a single `Toggle`. The returned object gives the ability
// to update the toggle's state, locking or unlocking the toggle from further
// changes, and getting the current state of the toggle.
//
// @param {HTMLElement} root - The root node of a toggle.
// @return {Toggle}

Toggle = (root) => {
  if(!root) { return null; }
  if(root instanceof Toggle) { return root; }

  return {
    root,
    lock() { root.classList.add(states.root.locked); },
    unlock() { root.classList.remove(states.root.locked); },
    activate() { root.classList.add(states.root.active); },
    deactivate() { root.classList.remove(states.root.active); },
    get is_locked() { return root.classList.contains(states.root.locked); },
    get is_active() {
      return root.classList.contains(states.root.active) ||
        root.classList.contains(states.root.partially_active);
    },
    constructor: Toggle
  };
};

//*
// Gets the toggle for the passed variation.
//
// @param {Toggle, String, HTMLElement} variation - The source of the desired
// `Toggle` — either as the HTMLElement that roots the toggle, a `Toggle` (which
// is returned as-is) or a `String` that is the name of a toggle.
//
// @return {Toggle}

Toggle.for = (variation) => {
  if(variation instanceof Toggle) {
    return variation;
  } else if(typeof variation === "string") {
    return Toggle(document.querySelector(`[${attrs.name}='${variation.name}']`));
  } else {
    return Toggle($(variation).closest(`.${classes.root}`)[0]);
  }
};

Toggles = (root) => {
  var communicator = Communicator();
  communicator.register.from_node(root);

  return {
    trigger(...args) { communicator.trigger(Events.types.class_change, ...args); }
  };
};

Toggles.init = () => {
  $(document)
    .on("keypress", `.${classes.root}`, handle_keypress)
    .on("click", `.${classes.info}`, info_click)
    .on("click", `.${classes.root}`, toggle_click);

  Builder.build(Toggles, { name: classes.container, cache: true });
};

export default Toggles;
