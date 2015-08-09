import Resizable from "./resizable";
import Builder from "~utilities/builder";
import Keycodes from "~utilities/keycodes";

var SizeButtons,
    SizeRelationships, click_size_button, next_unhidden_size_button,
    previous_unhidden_size_button, key_on_size_button;

const classes = {
  root: "resizable__size-button",
  container: "resizable__size-buttons"
};

const states = {
  root: {
    hidden: "resizable__size-button--is-hidden",
    active: "resizable__size-button--is-active"
  }
};

const attrs = {
  button_size: "data-resizable-size-button-size",
  size_to: "data-resizable-size-to"
};

SizeRelationships = {
  SMALL: 320,
  MEDIUM: 768,
  LARGE: 960
};

// Attaches media queries for each of the size buttons to conditionally hide/
// show them depending on whether or not the size they want to generate is within
// the available space.
//
// @param {HTMLElement} button - The size button. It should have an
//                              `attrs.button_size` attribute, which determines
//                              what size they should make the component.
// @param {Number} size_adjustment - The difference in width between the viewport
//                                   and the space available to the component.
//
// @private

// attach_media_listener_to_size_button = (button, size_adjustment = 0) => {
//   var size = button.getAttribute(attrs.button_size),
//       respond_width = SizeRelationships[size.toUpperCase()],
//       listener, media_query;

//   if(!respond_width) { return; }
//   button.setAttribute(attrs.size_to, respond_width);

//   listener = (mq) => {
//     button.classList[mq.matches ? "remove" : "add"](states.size_button.hidden);
//   };

//   media_query = window.matchMedia(`(min-width: ${respond_width + size_adjustment}px)`);
//   media_query.addListener(listener);
//   listener(media_query);
// };

//*
// Captures a click even on a size button and sends the appropriate `set_width`
// method call to the associated `Resizable` component.
//
// @param {Object} event - The click event.
// @private

click_size_button = (event) => {
  var button = $(event.target).closest(`.${classes.root}`);
  SizeButtons.for(button).active_button = button;
};

//*
// Finds the next visible size button after the passed `button`. This is used
// for cycling through these buttons with the keyboard. This will cycle through
// all buttons in the list, wrapping around to the first buttons if no following
// buttons are visible. As a result, this method might return the same `button`
// that was passed (if it is the only visible size button).
//
// @param {HTMLElement} button - The current button (that the user is moving off
//                              of with the keyboard).
//
// @private
// @returns HTMLElement - The next visible size button within the `button`'s set.

next_unhidden_size_button = (button) => {
  var sibling = button.nextElementSibling;

  while(sibling) {
    if(!sibling.classList.contains(states.size_button.hidden)) { return sibling; }
    sibling = sibling.nextElementSibling;
  }

  for(sibling of Array.from(button.parentNode.children)) {
    if(sibling === button) { break; }
    if(!sibling.classList.contains(states.size_button.hidden)) { return sibling; }
  }

  return null;
};

//*
// Finds the previous visible size button after the passed `button`. This is used
// for cycling through these buttons with the keyboard. This will cycle through
// all buttons in the list, wrapping around to the last buttons if no previous
// buttons are visible. As a result, this method might return the same `button`
// that was passed (if it is the only visible size button).
//
// @param {HTMLElement} button - The current button (that the user is moving off
//                              of with the keyboard).
//
// @private
// @returns HTMLElement - The previous visible size button within the `button`'s
//                       set.

previous_unhidden_size_button = (button) => {
  var sibling = button.previousElementSibling;

  while(sibling) {
    if(!sibling.classList.contains(states.size_button.hidden)) { return sibling; }
    sibling = sibling.previousElementSibling;
  }

  for(sibling of Array.from(button.parentNode.children).reverse()) {
    if(sibling === button) { break; }
    if(!sibling.classList.contains(states.size_button.hidden)) { return sibling; }
  }

  return null;
};

//*
// Handles key presses on a size button. If the key is enter or space, the
// size button will be activated. If the key is an arrow key, this function will
// move focus to the correct sibling size button.
//
// @param {Object} event - The `keypress` event.
// @private

key_on_size_button = (event) => {
  var button, new_button;

  if(Keycodes.ACTIVATE.includes(event.which)) {
    event.preventDefault();
    click_size_button(event);
  }

  if(Keycodes.ARROWS.includes(event.which)) {
    event.preventDefault();
    button = $(event.target).closest(`.${classes.size_button}`)[0];
    new_button = Keycodes.NEXT.includes(event.which) ?
      next_unhidden_size_button(button) :
      previous_unhidden_size_button(button);

    if(new_button) {
      SizeButtons.for(button).focused_button = new_button;
    }
  }
};

//*
// @factory

SizeButtons = (buttons) => {
  var api,
      associations, active_button, a11y, activate_button, focus_button,
      activate_active_button, deactivate_active_button, size, a_button;

  buttons = Array.from(buttons.children);
  associations = {};
  for(a_button of buttons) {
    size = SizeRelationships[a_button.getAttribute(attrs.button_size)];
    associations[size] = a_button;
  }

  a11y = {
    focus(button) {
      button.setAttribute("tabindex", "0");
      button.focus();
    },

    blur(button) {
      button.setAttribute("tabindex", "-1");
    },

    select(button) {
      this.focus(button);
      button.setAttribute("aria-selected", "true");
    },

    deselect(button) {
      this.blur(button);
      button.setAttribute("aria-selected", "false");
    }
  };

  deactivate_active_button = () => {
    if(!active_button) { return; }

    a11y.deslect(active_button);
    active_button.classList.remove(states.root.active);
  };

  activate_button = (button) => {
    if(!buttons.includes(button) || active_button === button) { return active_button; }

    deactivate_active_button();
    active_button = button;
    Resizable.for(button).set_width(parseInt(button.getAttribute(attrs.size_button), 10), { animated: true });
    activate_active_button();
    return active_button;
  };

  focus_button = (button) => {
    a11y.focus(button);
    return button;
  };

  activate_active_button = () => {
    if(!active_button) { return; }

    a11y.select(active_button);
    active_button.classList.add(states.root.active);
  };

  api = {
    set active_button(button) { return activate_button(button); },
    get active_button() { return active_button; },
    set focused_button(button) { return focus_button(button); },

    try_size(new_size) {
      deactivate_active_button();
      active_button = associations[new_size];
      activate_active_button();
    }
  };

  return api;
};

SizeButtons.init = () => {
  Builder.build_and_cache(SizeButtons, { name: classes.container });

  $(document)
    .on("click", `.${classes.root}`, click_size_button)
    .on("keydown", `.${classes.root}`, key_on_size_button);
};

export default SizeButtons;
