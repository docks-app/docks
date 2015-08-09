import SizeButtons from "./size_buttons";

import { Communicator } from "~components/iframe";
import Events from "~utilities/events";
import UIEvents from "~utilities/ui_events";
import Keycodes from "~utilities/keycodes";
import Builder from "~utilities/builder";

const classes = {
  root: "resizable",
  handle: "resizable__handle",
  container: "resizable__size-button",
  width_indicator: "resizable__width-indicator",
  px_indicator: "resizable__width-indicator__px",
  em_indicator: "resizable__width-indicator__em"
};

const states = {
  root: { transitioning: "resizable--is-transitioning-width" },
  size_button: {
    hidden: "resizable__size-button--is-hidden",
    active: "resizable__size-button--is-active"
  },
  width_indicator: { visible: "resizable__width-indicator--is-visible" }
};

const SHOW_WIDTH_DURATION = 2500;

var Resizable,
    key_on_handle, handle_drag_move, start_dragging_handle;

//*
// Handles key presses on the resizable handle. If the key is an arrow key,
// the resizable component will be resized appropriately. If the shift key is
// being pressed at the same time, the resizing will be accelerated.
//
// @param {Object} event - The `keypress` event.
// @private

key_on_handle = (event) => {
  var width_change;

  if(!Keycodes.ARROWS.includes(event.which)) { return; }
  event.preventDefault();

  width_change = event.shiftKey ? 10 : 2;
  if([Keycodes.LEFT, Keycodes.DOWN].includes(event.which)) {
    width_change = width_change * -1;
  }

  Resizable.for(event.target).set_width({ delta: width_change });
};

//*
// Handles a drag movement while holding onto a resizable handle. As the user
// drags, the associated resizable component will resize.
//
// @param {Object} context - The context for the current drag.
// @param {Object} event   - The `mousemove`/ `touchmove` event.
//
// @private

handle_drag_move = (context, event) => {
  var x = UIEvents.coordinates(event).x,
      delta = x - context.start_x;

  event.preventDefault();
  context.set_width(context.start_width + 2 * delta);
};

//*
// Initializes the required events/ attributes to perform a drag on a resizable
// handle. This function also removes all pointer events on the resizable to
// prevent unnecessary clicks/ hovers/ selects.
//
// @param {Object} context - The context for the current drag.

start_dragging_handle = (context) => {
  var drag_move, drag_end, listeners;

  context.iframe.style.pointerEvents = "none";

  drag_move = (event) => { handle_drag_move(context, event); };
  drag_end = () => {
    listeners.remove();
    context.iframe.style.pointerEvents = null;
  };

  listeners = UIEvents.add_drag_listeners(drag_move, drag_end);
};

//*
// The constructor around a `Resizable` component. This component manages many
// things, including: the intialization of resizing by dragging on the
// `Resizable`'s handle, responding to changes in the viewport size, and
// responding to changes in the height of the contained `iframe`.
//
// @param {HTMLElement} node - The root node for the `Resizable`
//
// @factory

Resizable = (root) => {
  var api,
      structure, set_width, show_width, size_buttons, handle_host_resize,
      min_width, max_width, container_side_padding, width_taken_by_side_components,
      communicator, respond_to_height, set_height, initialize_handle_resize,
      container_styles;

  size_buttons = SizeButtons.within(root)[0];

  communicator = Communicator();
  communicator.register.from_node(root);

  respond_to_height = (event) => { set_height(event.height); };
  communicator.on(Events.types.height_change, respond_to_height);
  communicator.on(Events.types.height_request, respond_to_height);

  structure = {
    root,
    iframe: root.querySelector("iframe"),
    handle: root.querySelector(`.${classes.handle}`),
    container: root.parentNode,
    width_indicator: root.querySelector(`.${classes.width_indicator}`)
  };

  container_styles = window.getComputedStyle(structure.container);
  container_side_padding = parseInt(container_styles.paddingLeft, 10) + parseInt(container_styles.paddingRight, 10);

  width_taken_by_side_components = structure.handle.offsetWidth;
  max_width = structure.iframe.offsetWidth;
  min_width = parseInt(window.getComputedStyle(root).minWidth, 10) - width_taken_by_side_components;

  //*
  // Checks whether or not a resize of the viewport has caused the resizable
  // width to be greater than it is allowed to be. If so, it will deactivate
  // the size button that caused that width to be active (if applicable), and
  // will resize the `Resizable` and display the width.
  //
  // @param {Object} event - The `resize` event on the `window`.
  // @private

  handle_host_resize = () => {
    max_width = structure.container.offsetWidth - container_side_padding - width_taken_by_side_components;
    show_width();
  };

  //*
  // Sets the height of the `Resizable`. This is done directly on the contained
  // `iframe`.
  //
  // @param {Number} height - The new height of the contained `iframe`.
  // @private

  set_height = (height) => {
    structure.iframe.style.height = `${height}px`;
  };

  //*
  // Shows the current width of the contained `iframe`. This involves a few
  // things: the width is converted to `em` and both the `px` and `em` widths
  // are displayed in the width indicator, the visible state is added to the
  // width indicator, and a timeout is set up to remove the visible state (so
  // that the indicator is hidden after a small delay).
  //
  // @param {Number} width (iframe.offsetWidth) - The width to display.
  // @private

  show_width = (() => {
    var show_width_timeout;

    return () => {
      var width = structure.iframe.offsetWidth;

      structure.width_indicator.querySelector(`.${classes.px_indicator}`).textContent = width;
      structure.width_indicator.querySelector(`.${classes.em_indicator}`).textContent = (width / 16).toFixed(2);

      if(show_width_timeout) {
        clearTimeout(show_width_timeout);
      } else {
        structure.width_indicator.classList.add(states.width_indicator.visible);
      }

      show_width_timeout = setTimeout(() => {
        structure.width_indicator.classList.remove(states.width_indicator.visible);
        show_width_timeout = null;
      }, SHOW_WIDTH_DURATION);
    };
  })();

  set_width = (width, options = {}) => {
    if(typeof width === "object") {
      options = width;
      width = root.offsetWidth - width_taken_by_side_components + (options.delta || 0);
    }

    if(options.animated) {
      root.classList.add(states.root.transitioning);
      UIEvents.transition(root, () => { root.classList.remove(states.root.transitioning); });
    }

    if(width) {
      width = Math.max(Math.min(width, max_width), min_width);
      root.style.width = `${width + width_taken_by_side_components}px`;
    } else {
      root.style.width = null;
    }

    show_width();

    size_buttons.try_size(width);
    return width;
  };

  //*
  // Listens for the start of a drag on the `Resizable` component's handle and
  // passes the associated context to `start_dragging_handle` so that the drag
  // events can be properly attached.
  //
  // @param {Object} event - The `mousedown`/ `touchstart` event.
  // @private

  initialize_handle_resize = (event) => {
    var context = {
      start_x: UIEvents.coordinates(event).x,
      start_width: structure.iframe.offsetWidth,
      max_width: structure.container.offsetWidth - container_side_padding,
      set_width: set_width,
      iframe: structure.iframe
    };

    start_dragging_handle(context);
  };

  show_width();

  $(window).on("resize", handle_host_resize);
  $(structure.handle).on(UIEvents.drag.start, initialize_handle_resize);

  api = { set_width };
  return api;
};

Resizable.init = () => {
  SizeButtons.init();
  Builder.build_and_cache(Resizable, { name: classes.root });

  $(document).on("keydown", `.${classes.handle}`, key_on_handle);
};

export default Resizable;
