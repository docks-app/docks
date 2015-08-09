//        ___          ___         ___                   ___        _____        ___        _____
//       /  /\        /__/|       /  /\                 /  /\      /  /::\      /  /\      /  /::\
//      /  /:/_      |  |:|      /  /::\               /  /::\    /  /:/\:\    /  /:/_    /  /:/\:\
//     /  /:/ /\     |  |:|     /  /:/\:\___     ___  /  /:/\:\  /  /:/  \:\  /  /:/ /\  /  /:/  \:\
//    /  /:/ /:/_  __|__|:|    /  /:/~/:/__/\   /  /\/  /:/  \:\/__/:/ \__\:|/  /:/ /:/_/__/:/ \__\:|
//   /__/:/ /:/ /\/__/::::\___/__/:/ /:/\  \:\ /  /:/__/:/ \__\:\  \:\ /  /:/__/:/ /:/ /\  \:\ /  /:/
//   \  \:\/:/ /:/   ~\~~\::::|  \:\/:/  \  \:\  /:/\  \:\ /  /:/\  \:\  /:/\  \:\/:/ /:/\  \:\  /:/
//    \  \::/ /:/     |~~|:|~~ \  \::/    \  \:\/:/  \  \:\  /:/  \  \:\/:/  \  \::/ /:/  \  \:\/:/
//     \  \:\/:/      |  |:|    \  \:\     \  \::/    \  \:\/:/    \  \::/    \  \:\/:/    \  \::/
//      \  \::/       |  |:|     \  \:\     \__\/      \  \::/      \__\/      \  \::/      \__\/
//       \__\/        |__|/       \__\/                 \__\/                   \__\/


import UIEvents from "../../utilities/ui_events";
import Client from "../../utilities/client";
import Builder from "../../utilities/builder";
import { between, Matrix } from "../../utilities/numbers";
import { force_repaint } from "../../utilities/painting";

const classes = {
  root: "exploded",
  structure: "exploded__structure",
  content: "exploded__structure__content",
  source: "exploded__source",
  pane: "exploded__pane"
};

const states = {
  root: {
    initialized: `${classes.root}--is-being-initialized`
  },

  pane: {
    hovered: `${classes.pane}--is-hovered`,
    selected: `${classes.pane}--is-selected`
  }
};

const attrs = {
  id: "data-explosion-id",
  node: "data-explosion-node",
  range_attr: "data-explosion-attribute"
};

const events = {
  pane_selected: `${classes.root}:pane-selected`
};

const LAYER_GAP = 40;

var clone, initialize_panes, initialize_ranges, reset, start_dragging,
    rotate_by, update_panes, node_for_pane, main_class_for_node, Exploded;

//*
// Initializes the panes for an explosion. This does all of the required
// cloning, stores the resulting panes on the secrets object, and performs an
// initial rotation.
//
// @param {Object} self - The internal details of an `Exploded`.
// @private

initialize_panes = async function(self) {
  var { source, structure } = self;
  if(source.children[0].children.length < 1) { return; }

  reset(self);

  self.panes = clone(source.children[0], structure.children[0]);
  self.spread = 1;

  setTimeout(async function() {
    await UIEvents.transition(self.node, () => {
      self.node.classList.add(states.root.initialized);
      rotate_by(20, 5, self);
    });

    self.node.classList.remove(states.root.initialized);
  }, 400);
};

//*
// Initializes the ranges within an `Exploded` to perform their action. This
// function also contains the definitions of the possible actions for a range,
// the `attrs.range_attr` value that will give that behavior to a range, and
// the actual event handlers for when the range changes values.
//
// @param {Object} self - The internal details of an `Exploded`.
// @private

initialize_ranges = (() => {
  var actions, ranges, percentage_from_center, handlers, create_range_listener;

  actions = {
    gap: "pane-gap",
    perspective: "perspective"
  };

  ranges = {
    [actions.gap]: { min: 0.25, max: 2, default: 1 },
    [actions.perspective]: { min: 500, max: 4000, default: 2000 }
  };

  //*
  // Calculates the difference a value from 0-100 is from 50, then normalizes that
  // value for how close it is to the center. So, values close to 50 will be close,
  // to 0, while 0 and 100 will be -1 and 1, respectively.
  //
  // @param {Number} value - The number on a scale of 0-100.
  // @private
  // @returns Number

  percentage_from_center = (value) => {
    return ((parseInt(value, 10) / 100) - 0.5) / 0.5;
  };

  handlers = {

    //*
    // @name gap
    //
    // Updates the spread between panes. 50% on the range will generate a z-axis
    // distance between child/ parent panes of `LAYER_GAP`. Anything less than
    // 50% will reduce this gap, and anything greater than 50% will increase it.
    //
    // @param {Object} self - The internal details of an `Exploded`.
    // @param {Object} event - The `input` event on a range input.
    //
    // @private

    [actions.gap]: function(self, event) {
      var range = ranges[actions.gap],
          spread_from_center = percentage_from_center(event.target.value);

      if(spread_from_center < 0) {
        self.spread = range.default + (spread_from_center * (range.default - range.min));
      } else {
        self.spread = range.default + (spread_from_center * (range.max - range.default));
      }

      update_panes(self);
    },

    //*
    // @name perspective
    //
    // Updates the perspective of an `Exploded`. 50% on the range will generate
    // the default perspective, and values lower and higher will decrease and
    // increase that perspective, respectively.
    //
    // @param {Object} self - The internal details of an `Exploded`.
    // @param {Object} event - The `input` event on a range input.
    //
    // @private

    [actions.perspective]: function(self, event) {
      var range = ranges[actions.perspective],
          spread_from_center = percentage_from_center(event.target.value),
          perspective;

      if(spread_from_center > 0) {
        perspective = range.default - (spread_from_center * (range.default - range.min));
      } else {
        perspective = range.default - (spread_from_center * (range.max - range.default));
      }

      self.structure.style.perspective = `${perspective}px`;
    }
  };

  create_range_listener = (action) => {
    return (event) => { handlers[action](self, event); };
  };

  return function(self) {
    var range_node;

    for(let name of Object.keys(actions)) {
      let action = actions[name];
      range_node = self.node.querySelector(`[${attrs.range_attr}="${action}"]`);

      if(!range_node) { continue; }
      range_node.addEventListener("input", create_range_listener(action));
    }
  };
})();

//*
// Resets the internal state of an `Exploded`.
//
// @param {Object} self - The internal details of an `Exploded`.
// @private

reset = (self) => {
  self.rotation = { x: 0, y: 0, z: 0 };
  self.source.style.display = null;
  self.structure.children[0].innerHTML = "";
};

//*
// Creates the clone representations of the content of `from` into the container
// `to`. This is done by determining the position of each descendant of `from`
// relative to the `from` container itself, and then absolutely positioning an
// `exploded__pane` at the same relative position in `to`. In order to present
// a useful diagram, the DOM level of each node is captured and is used to stack
// the panes in the z-axis. Additionally, any overlap between siblings should
// be recorded and resolved by adding a small adjustment to the z-index
// stacking of those panes.
//
// @param {HTMLElement} from - The node containing the source DOM tree.
// @param {HTMLElement} to   - The node in which to create the cloned presentation.
//
// @private
//
// @returns Array
// An array of objects representing the cloned panes. Each object has a `node`,
// `level`, and `adjustment` property so that future translations can be done
// performantly.

clone = (() => {
  var explosion_id = 0,
      destination, pane_count, widths,
      clone_level, original_offset, panes,
      prepare_for_cloning, append_clone, append_all_clones,
      clone_node, find_overlaps, stack_siblings;

  //*
  // Resets the internal information used to perform explosions.
  //
  // @private

  prepare_for_cloning = () => {
    explosion_id += 1;
    pane_count = 0;
    clone_level = 0;
    panes = [];
    destination = null;
    original_offset = null;

    widths = {
      min: Infinity,
      max: 0
    };
  };

  //*
  // Appends a new pane with the provided dimensions to the `to` node.
  //
  // @param {Object} dims - The dimensions of the cloned node. Should have
  //                        `width`, `height`, `left`, `top`, `level`, and
  //                        `adjustment` properties.
  // @param {HTMLElement} to - The node in which to append the new pane.
  //
  // @private
  // @returns HTMLElement - The cloned node.

  append_clone = (dims, to) => {
    var parent_width = destination.offsetWidth,
        parent_height = destination.offsetHeight,
        node = $(`<div class='${classes.pane}' style='height: ${dims.height}px; width: ${dims.width}px; top: ${dims.top}px; left: ${dims.left}px; transform-origin: ${(parent_width / 2) - dims.left}px ${(parent_height / 2) - dims.top}px ${LAYER_GAP}px;' />`)[0];

    to.appendChild(node);
    return node;
  };

  //*
  // Appends all of the required panes to the `to` node passed to
  // [`clone`](@link).
  //
  // @private

  append_all_clones = () => {
    var fragment = document.createDocumentFragment(), pane;

    for(pane of panes) {
      pane.clone = append_clone(pane, fragment);
      pane.clone.setAttribute(attrs.node, pane.id);
      pane.clone.style.zIndex = (LAYER_GAP * pane.level) + (pane.adjustment || 0);
      pane.node.setAttribute(attrs.id, pane.id);
    }

    destination.appendChild(fragment);
  };

  //*
  // Generates the details required to clone a node as a pane. These include
  // its dimensions, its ID, the node it is cloning, its level, and whether or
  // not it is actually visible. These are added to the closured `panes` array
  // so that they can be easily accessed by other methods.
  //
  // @param {HTMLElement} node - The source node to clone.
  // @private

  clone_node = (node) => {
    var node_offsets = node.getBoundingClientRect(),
        pane, child;

    original_offset = original_offset || node.parentNode.getBoundingClientRect();
    pane_count += 1;

    // If we have a visible node
    if((node_offsets.height + node_offsets.width) > 2) {
      pane = {
        height: node_offsets.height,
        width: node_offsets.width,
        top: node_offsets.top - original_offset.top,
        left: node_offsets.left - original_offset.left,
        level: clone_level,
        node: node,
        id: `${explosion_id}-${pane_count}`
      };

      panes.push(pane);

      widths.min = Math.min(pane.left, widths.min);
      widths.max = Math.max(pane.left + pane.width, widths.max);
    }

    clone_level += 1;
    for(child of Array.from(node.children)) { clone_node(child); }
    clone_level -= 1;
  };

  //*
  // Finds pairs of nodes whose dimensions overlap one another.
  //
  // @param {Array} siblings - The set of nodes to check for overlap.
  // @private
  // @returns Array - An array of arrays that each contain a set of two
  // overlapping nodes.

  find_overlaps = (siblings) => {
    var overlaps = [],
        sibling_count = siblings.length,
        index, sibling,
        other_index, other,
        within_other,
        other_within, custom_between;

    custom_between = (...args) => { return between(...args, { include_min: true }); };

    for(index = 0; index < sibling_count; index++) {
      sibling = siblings[index];

      for(other_index = index + 1; other_index < sibling_count; other_index++) {
        other = siblings[other_index];

        other_within = custom_between(other.left, sibling.left, sibling.left + sibling.width) &&
          custom_between(other.top, sibling.top, sibling.top + sibling.height);

        within_other = custom_between(sibling.left, other.left, other.left + other.width) &&
          custom_between(sibling.top, other.top, other.top + other.height);

        if(other_within || within_other) { overlaps.push([sibling, other]); }
      }
    }

    return overlaps;
  };

  //*
  // Creates the necessary adjustments to provide z-space between siblings that
  // would otherwise overlap one another (that is, on the same level with some
  // overlapping coordinates). These adjustments are added directly to the
  // objects in the closured `panes` array.
  //
  // @private

  stack_siblings = () => {
    var levels = [],
        overlaps, pane, level, overlap;

    for(pane of panes) {
      levels[pane.level] = levels[pane.level] || [];
      levels[pane.level].push(pane);
    }

    for(level of levels) {
      overlaps = find_overlaps(level);

      for(overlap of overlaps) {
        overlap[0].adjustment = -LAYER_GAP / 8;
        overlap[1].adjustment = LAYER_GAP / 8;
      }
    }
  };

  return (from, to) => {
    var clone_results = [],
        child, pane;

    prepare_for_cloning();
    destination = to;

    for(child of Array.from(from.children)) { clone_node(child); }
    stack_siblings();
    append_all_clones();

    to.style.maxWidth = `${widths.max - widths.min}px`;
    to.style.height = `${from.offsetHeight}px`;
    from.parentNode.style.display = "none";

    for(pane in panes) {
      clone_results.push({
        node: pane.clone,
        level: pane.level,
        adjustment: pane.adjustment || 0
      });
    }

    return clone_results;
  };
})();

//*
// Attaches the events required to handle touches and clicks on the exploded
// structure. If the click ends before the user drags the `DRAG_THRESHOLD`
// distance, the action will be treated as a click and the pane on which the
// user clicked will be selected. If the user drags more than the threshold,
// the entire structure will be rotated according to the distance dragged.
//
// @param {Object} self - The internal details of an `Exploded`.
// @param {Object} event - The initial `mousedown`/ `touchdown` event.
//
// @private
// @returns Object - The listener object with a `remove` method that allows the
//                   drag to be cleanly cancelled.

start_dragging = (self, start_event) => {
  var old_coordinates = UIEvents.coordinates(start_event),
      drag_threshold_met = false,
      drag, drag_end;

  start_event.preventDefault();

  drag = (event) => {
    var new_coordinates = UIEvents.coordinates(event);
    event.preventDefault();

    if(drag_threshold_met) {
      document.body.style.pointerEvents = "none";
      rotate_by((new_coordinates.x - old_coordinates.x) / 2, (new_coordinates.y - old_coordinates.y) / 2, self);
    } else {
      drag_threshold_met = UIEvents.coordinates.distance_between(old_coordinates, new_coordinates) > UIEvents.DRAG_THRESHOLD;
    }
  };

  drag_end = (event) => {
    if(!drag_threshold_met && event.target.classList.contains(classes.pane)) {
      self.select_pane(event.target);
    }

    // TODO: Maybe move to helper?
    document.body.style.pointerEvents = null;
  };

  return UIEvents.add_drag_listeners(drag, drag_end);
};

//*
// Rotates the panes of an `Exploded` by the passed x and y degrees.
//
// @param {Number} x - The degrees in the x-axis to rotate the panes.
// @param {Number} y - The degrees in the x-axis to rotate the panes. Note that
//                     this will be reversed so that the rotation feels natural.
// @param {Object} self - The internal details of an `Exploded`.
//
// @private

rotate_by = (x, y, self) => {
  self.rotation.x = Math.max(Math.min(90, (self.rotation.x + x) % 360), -90);
  self.rotation.y = Math.max(Math.min(90, (self.rotation.y + y) % 360), -90);
  update_panes(self);
};

//*
// Applies the current rotation to all panes within an `Exploded`. It will also
// make sure that the z-translation of each pane is correct given its level in
// the original source tree and its stacking order against its siblings.
//
// @param {Object} self - The internal details of an `Exploded`.
// @private

update_panes = (self) => {
  var { x, y } = self.rotation,
      identity_matrix = Matrix(),
      rotation_matrix = identity_matrix.rotate(-y, x, 0),
      updates = [],
      transform = Client.name_for("transform"),
      z_translate, pane;

  for(pane of self.panes) {
    if(!pane.node) { continue; }

    z_translate = ((pane.level * LAYER_GAP) + pane.adjustment) * self.spread;
    updates.push({
      node: pane.node,
      transform: rotation_matrix.translate(0, 0, z_translate).toString()
    });
  }

  requestAnimationFrame(() => {
    var update;

    for(update of updates) {
      update.node.style[transform] = update.transform;
    }
  });
};

//*
// Returns the original node (from the source content) that corresponds to the
// passed pane.
//
// @param {HTMLElement} pane - The exploded pane for which a corresponding source
//                            node should be found.
// @private
// @returns {HTMLElement | undefined} - The corresponding node or, if none exists,
//                                      undefined.

node_for_pane = (pane) => {
  var node_id = pane.getAttribute(attrs.node);
  if(!node_id) { throw new Error(`The passed node must have an "${attrs.node}" attribute.`); }
  return document.querySelector(`[${attrs.id}='${node_id}']`);
};

// TODO: get this out of here.

//*
// Gets the main class name for a given node.
//
// @param {HTMLElement} node - The node to retrieve the main class name for.
//
// @private
// @returns String

main_class_for_node = (node) => {
  return node.getAttribute("class").split(" ")[0];
};

//*
// The constructor around an explosion.
//
// @factory
//
// @param {HTMLElement} node - The base explosion node.
//
// @returns Object - The API for manipulating this explosion, including methods
//                   to update the markup to demonstrate, selecting particular
//                   panes or all panes for particular components, and adding
//                   callbacks to pane selection.

Exploded = (node) => {
  var self, api,
      set_markup, select_pane, select_component, on;

  self = {
    node: node,
    // TODO: write a simpler method for finding all occurances of a class
    structure: node.querySelector(`.${classes.structure}`),
    source: node.querySelector(`.${classes.source}`)
  };

  //*
  // Clears the existing explosion and re-initalizes the component with the new
  // markup.
  //
  // @method
  //
  // @param {String} markup - The new markup to demonstrate.

  set_markup = (markup) => {
    self.source.children[0].innerHTML = markup;
    force_repaint(node);
    initialize_panes(self);
  };

  //*
  // Selects a given pane and emits the selected event. This event can be
  // picked up by other components so that they can display useful information
  // related to this pane. See [`on_pane_select`](@link Exploded#on_pane_select) for details
  // on attaching listeners to pane selection.
  //
  // @method
  //
  // @param {HTMLElement} pane - The selected pane.

  select_pane = (pane) => {
    var panes = Array.isArray(pane) ? pane : [pane],
        event, related_node;

    requestAnimationFrame(() => {
      for(pane of self.panes) { pane.node.classList.remove(states.pane.selected); }
      for(pane of panes) { pane.classList.add(states.pane.selected); }
    });

    if(!panes.length) { return; }
    pane = panes[0];
    related_node = node_for_pane(pane);

    // The event provides the selected pane, the related (source) node, and
    // the class of the node for easy component identification.
    // TODO: clean this up, kill $
    event = $.Event(events.pane_selected, {
      node: related_node,
      pane: pane,
      component: main_class_for_node(related_node)
    });

    $(node).trigger(event);
  };

  //*
  // Selects the pane that corresponds to the provided component.
  //
  // @method
  //
  // @param {String} component - The class name of the component to select.

  select_component = (component) => {
    var panes = [],
        components = self.source.querySelectorAll(`.${component}`),
        explosion_id, pane, event;

    for(component of components) {
      explosion_id = component.getAttribute(attrs.id);
      pane = node.querySelector(`[${attrs.node}="${explosion_id}"]`);
      if(pane) { panes.push(pane); }
    }

    select_pane(panes);

    // Event won't get triggered by select_pane. Do it here instead.
    if(components.length && !panes.length) {
      event = $.Event(events.pane_selected, {
        node: components[0],
        component: components[0].getAttribute("class").split(" ")[0]
      });

      $(node).trigger(event);
    }
  };

  //*
  // A helper method to attach an event listener to the `Exploded`.
  //
  // @method
  //
  // @param {String} event - The event to listen for.
  // @param {Function} callback - The callback function.
  // @param {Object} callback.event
  // The event object. Most importantly, the `detail` property of this object
  // contains the source `node`, the selected `pane`, and the name of the
  // `component` that was selected.
  //
  // @returns Object - An object that allows you to easily remove the listener
  //                   with the `#remove` method.

  on = (event, callback) => {
    var $node = $(node);
    $node.on(event, callback);

    return {
      remove() { $node.off(event, callback); }
    };
  };

  api = { select_pane, select_component, set_markup, on };
  Object.assign(self, api);

  initialize_panes(self);
  initialize_ranges(self);

  self.structure.querySelector(`.${classes.content}`).addEventListener(UIEvents.drag.start, (event) => {
    start_dragging(self, event);
  });

  return api;
};

//*
// Initializes the `Exploded` component.
//
// @method
// @static
//
// @param {HTMLElement} [context = document] - The context in which to search
// for DOM nodes that should be used as the root of an `Exploded` component.

Exploded.init = () => {
  Builder.build_and_cache(Exploded, { name: classes.root });
};

export { classes, states, attrs, events };
export default Exploded;
