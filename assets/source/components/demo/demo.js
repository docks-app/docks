import Events from "../../utilities/events";
import UIEvents from "../../utilities/ui_events";
import { Communicator } from "../iframe";

//*
// The name of classes relevant to `Demo`.
// @object

const classes = {
  root: "demo",
  section: "demo__section",
  content: "content"
};

var Demo, create_self, set_correct_background_color, allocate_minimum_height;

//*
// The delay after a change in markup to keep track of height changes and
// communicate them to the attached [`Iframe`](@link).
//
// @type Number
// @value 1000

const HEIGHT_CHANGE_WATCH_DURATION = 1000;

//*
// Updates the background color of the parent for the demo to match the
// background color of the last section. This is necessary because, during the
// transition from a larger size to a smaller size, not doing this would show
// white below all of the demo sections regardless of their color.
//
// @private
// @param {HTMLElement} node - The base `Demo` node.

set_correct_background_color = (node) => {
  var parent = node.parentNode,
      sections = node.querySelectorAll(`.${classes.section}`),
      last_section = sections[sections.length - 1];

  parent.style.backgroundColor = window.getComputedStyle(last_section).backgroundColor;
};

//*
// Spreads the minimum height of the total demo between the sections that are
// present. This is important because the resizable demo will show the full
// minimum width, so if there are colored sections that don't completely fill
// the minimum width, there will be an awkward white patch below the sections.
//
// @private
// @param {HTMLElement} node - The base `Demo` node.

allocate_minimum_height = (node) => {
  var min_height = parseInt(window.getComputedStyle(node).minHeight, 10),
      demo_sections = node.querySelectorAll(`.${classes.section}`), demo_section;

  for(demo_section of demo_sections) {
    demo_section.style.minHeight = `${min_height / demo_sections.length}px`;
  }
};

//*
// Caches all of the internal details for an [`Demo`](@link).
//
// @private
// @param {HTMLElement} node - The node backing the `Demo`.
// @returns Object - The private, internal details of the `Demo`.

create_self = (node) => {
  return {
    markup_source: document.querySelector(`.${classes.content}`),
    demo_handlers: window.parent.demo_handlers || {},
    parent: node.parentNode,
    height: 0,
    actions: {},
    context: {
      body: document.body,
      document: document
    }
  };
};

//*
// The constructor for a new `Demo`. This will sign the demo up for all the
// required events and will do the required initialization work.
//
// @param {HTMLElement} node - The base `Demo` node.
//
// @factory

Demo = (node) => {
  var self = create_self(node),
      communicator = Communicator(),
      send_markup, height_update, apply_class_change;

  //*
  // Sends the markup for the current "main" section.
  //
  // @param {Object} [event = {}] - The (optional) event that specifies the demo
  // to send markup for.
  //
  // @method
  // @private

  send_markup = (event = {}) => {
    if(event.demo) {
      self.markup_source = document.querySelector(`#${classes.section}--${event.demo} .${classes.content}`);
    }

    communicator.trigger(Events.types.markup_request, {
      html: self.markup_source.innerHTML
    });
  };

  //*
  // Sends the height for the demo as a whole, and sets that height on the
  // demo's container. The height is set on the container after a delay to
  // ensure that there is no patch of unstyled background color underneath a
  // demo that is shrinking.
  //
  // @method
  // @private

  height_update = () => {
    var new_height = node.offsetHeight;
    if(new_height === self.height) { return; }

    self.height = new_height;
    setTimeout(() => {
      self.parent.style.minHeight = `${new_height}px`;
    }, HEIGHT_CHANGE_WATCH_DURATION);

    communicator.trigger(Events.types.height_change, { height: new_height });
  };

  //*
  // Applies a class change to the demo. This class change will avoid adding
  // classes to components that have a class procluded from the new class, will
  // filter to the passed filter, and will perform the optional JavaScript
  // action instead of a simple class addition/ removal. If appropriate, the
  // component will then return the class change event, send a markup change
  // event, and send a height update event.
  //
  // @param {Object} event - The class change event.
  // @private
  //

  apply_class_change = (event) => {
    var details = event.details,
        markup_change_in_source = false,
        minimum_one_class_change = false,
        matches = node.querySelectorAll(`.${classes.content} .${details.for}`),
        bail_early, class_list, action, match, preclude;

    if(details.filter_to) {
      // Check on matches
      matches = matches.filter((a_match) => a_match.matches(details.filter_to));
    }

    // Some height changes may occur over time. Watch for transitions
    // and send height again on each transitionend event
    //
    // TODO: integrate better iframe resizing
    // see: https://github.com/davidjbradshaw/iframe-resizer/tree/master/test

    document.addEventListener(UIEvents.transition_end, height_update);

    for(match of matches) {
      bail_early = false;
      class_list = match.classList;
      action = null;

      for(preclude of details.preclude) {
        if(class_list.contains(preclude)) {
          bail_early = true;
          break;
        }
      }

      if(bail_early) { continue; }

      minimum_one_class_change = true;

      action = details.javascript_action;
      if(action) {
        if(!event.add) {
          action = action.replace(/addClass/g, "removeClass")
           .replace(/classList\.add/g, "classList.remove")
           .replace(/(true|false)/, { true: "false", false: "true" });
        }

        eval(action);
      } else {
        class_list[event.add ? "add" : "remove"](details.name);
      }

      // Only update markup in source when the markup source is above in the
      // DOM tree.
      markup_change_in_source = markup_change_in_source ||
        $(match).closest(self.markup_source).length > 0;
    }

    if(markup_change_in_source) { send_markup(); }

    if(minimum_one_class_change) {
      // Pass along the class change event
      communicator.trigger(event.type, event);
      height_update();
    }

    setTimeout(() => {
      document.removeEventListener(UIEvents.transition_end, height_update);
    }, HEIGHT_CHANGE_WATCH_DURATION);
  };

  communicator.register.from_node(node);
  communicator.on(Events.types.height_request, height_update);
  communicator.on(Events.types.markup_request, send_markup);
  communicator.on(Events.types.class_change, apply_class_change);

  window.addEventListener("resize", height_update);
  setInterval(height_update, HEIGHT_CHANGE_WATCH_DURATION);

  height_update();
  allocate_minimum_height(node);
  set_correct_background_color(node);

  return {};
};

//*
// Initializes the `Demo` component.
//
// @method
// @static
//
// @param {HTMLElement} [context = document] - The context in which to search
// for DOM nodes that should be used as the root of an `Demo` component.

Demo.init = (context = document) => {
  var demo, demos = Array.from(context.querySelectorAll(`.${classes.root}`));
  for(demo of demos) { Demo(demo); }
};

export default Demo;
