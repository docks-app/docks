//                   ___       ___          ___          ___          ___
//      ___         /  /\     /  /\        /  /\        /__/\        /  /\
//     /  /\       /  /:/_   /  /::\      /  /::\      |  |::\      /  /:/_
//    /  /:/      /  /:/ /\ /  /:/\:\    /  /:/\:\     |  |:|:\    /  /:/ /\
//   /__/::\     /  /:/ /://  /:/~/:/   /  /:/~/::\  __|__|:|\:\  /  /:/ /:/_
//   \__\/\:\__ /__/:/ /://__/:/ /:/___/__/:/ /:/\:\/__/::::| \:\/__/:/ /:/ /\
//      \  \:\/\\  \:\/:/ \  \:\/:::::/\  \:\/:/__\/\  \:\~~\__\/\  \:\/:/ /:/
//       \__\::/ \  \::/   \  \::/~~~~  \  \::/      \  \:\       \  \::/ /:/
//       /__/:/   \  \:\    \  \:\       \  \:\       \  \:\       \  \:\/:/
//       \__\/     \  \:\    \  \:\       \  \:\       \  \:\       \  \::/
//                  \__\/     \__\/        \__\/        \__\/        \__\/
//

import Events from "../../utilities/events";
import Cache from "../../utilities/dom_cache";
import { decode_html_entities } from "../../utilities/markup";

//*
// The name of classes relevant to `Iframe` and `Communicator`.
// @object

const classes = {
  root: "iframe",
  content: "iframe__content"
};

//*
// The name of attributes relevant to `Iframe` and `Communicator`.
// @object

const attrs = {
  id: "data-iframe-id"
};

//*
// The possible positions of an [`Iframe`](@link) — either the parent (on the
// main page) or the child (embedded inside an `iframe`).
//
// @object
// @private

const positions = {
  parent: "parent",
  child: "child"
};

//*
// A set of events registered with [`Events`](@link) that relate specifically
// to features managed by the core `Iframe`.
//
// @object
// @private

const iframe_events = [
  "markup_request",
  "markup_request",
  "height_change",
  "markup_change",
  "class_change",
  "height_request",
  "event_handler"
];

var Iframe, iframes, Communicator,
    create_self, add_event_listeners, move_markup_to_iframe;

iframes = [];

Events.register(...iframe_events);

//*
// A mechanism for communicating between a given component and one or more
// [`Iframe`s](@link Iframe).
//
// @factoryk

Communicator = () => {
  var private_iframes = [], private_iframe,
      actions = {}, communicator;

  communicator = {

    //*
    // Trigger an event with the provided data to all attached iframes.
    //
    // @method
    //
    // @param {String} type - The type of event to trigger. Do not pass a string
    // literal — instead, pass an event defined on [`Events.types`](@link).
    //
    // @param {*} data - Any piece of data that can be stringified by
    // `JSON.stringify`.

    trigger(type, data) {
      for(private_iframe of private_iframes) {
        private_iframe.trigger(type, data);
      }
    },

    //*
    // Add a listener for when an `Iframe` is triggered with the passed `event`.
    //
    // @method
    //
    // @param {String} type - The type of event to listen for. Do not pass a
    // string literal — instead, pass an event defined on
    // [`Events.types`](@link).
    //
    // @param {Function} action - The callback to run when the event is
    // triggered.
    //
    // @param {Object} action.data - The data that was passed along to the
    // [`Iframe#trigger`](@link) that generated this event.

    on(event, action) {
      actions[event] = actions[event] || [];
      actions[event].push(action);
    },

    //*
    // Receives the data for an event and clals all associated event handlers.
    // This is primarily provided so that the `Iframe` can call this method for
    // all listeners that have been registered with it.
    //
    // @method
    //
    // @param {Object} event - All of the data associated with the event.

    receive(event) {
      var event_actions = actions[event.type],
          action;

      if(!event_actions) { return; }
      for(action of actions) { action(event); }
    },

    //*
    // An object that wraps all of the registering functionality.
    //
    // @property
    // @object

    register: {

      //*
      // Registers this `Communicator` with the passed ID or `iframe` node.
      //
      // @method
      //
      // @param {String | HTMLElement} id - The `iframe` to register with. If
      // a `String` is passed, it should match some `iframe`'s `data-iframe-id`
      // attribute. Otherwise, you should pass the actual `iframe` node to
      // register with.
      //
      // @returns Boolean - Returns `true` if the registration was successful,
      // and false otherwise.

      with_iframe(id) {
        var iframe = Iframe.for(id),
            registered = (!!iframe && iframe.register(communicator));

        if(registered) { private_iframes.push(iframe); }
        return registered;
      },

      //*
      // Registers this `Communicator` with the `iframe` whose `data-iframe-id`
      // matches that of the passed node.
      //
      // @method
      //
      // @param {HTMLElement} node - The node to match to an `iframe`.
      //
      // @returns Boolean - Returns `true` if the registration was successful,
      // and false otherwise.

      from_node(node) {
        return this.with_iframe(node.getAttribute(attrs.id));
      },

      //*
      // Registers this `Communicator` with all `iframe`s on the page.
      //
      // @method
      //
      // @returns Boolean - Returns `true` if there are `iframe`s on the page,
      // and false otherwise.

      with_all() {
        var iframe;
        for(iframe of iframes) { this.with_iframe(iframe); }
        return iframe.length > 0;
      }
    }
  };

  return communicator;
};

//*
// Caches all of the internal details for an [`Iframe`](@link).
//
// @private
// @param {HTMLElement} node - The node backing the `Iframe`. This can be either
// an actual `iframe` (in the case of the parent) or the wrapping element of
// a demo that is actually in the `iframe`.
//
// @returns Object - The private, internal details of the `Iframe`.

create_self = (node) => {
  var self = {
    node,
    id: node.getAttribute(attrs.id),
    ready: false,
    listeners: [],
    message_queue: [],
    message(data) { this.message_target.postMessage(JSON.stringify(data), "*"); },
    queue(data) { this.message_queue.push(data); }
  };

  if(node.tagName.toLowerCase() === "iframe") {
    Object.assign(self, { position: positions.parent, message_target: node.contentWindow });
  } else {
    Object.assign(self, { position: positions.child, message_target: window.parent });
  }

  return self;
};

//*
// Sets up all required event listeners for an [`Iframe`](@link), including the
// listener for `postMessage` and listeners on the relevant `iframe` for the
// `load` event (as a hook to run the first set of events).
//
// @private
// @param {Object} self - The internal details of an [`Iframe`](@link).

add_event_listeners = (self) => {
  self.node.addEventListener("load", () => {
    var queued_message;

    self.ready = true;
    for(queued_message of self.message_queue) { self.message(queued_message); }
    self.message_queue = [];
  });

  window.addEventListener("message", (event) => {
    var data, listener;

    if(typeof event.data !== "string") { return; }

    data = JSON.parse(event.data);
    if(data.id !== self.id) { return; }

    for(listener of self.listeners) { listener.receive(data); }
  });
};

//*
// Moves the markup for for an iframe into the actual iframe. This looks for the
// `iframe__content` sibling node of the iframe, takes its inner HTML, decodes
// the escaped entities, and writes the entirety of the resulting string (which
// includes the HTML element and all children) to the iframe's window.
//
// @private
// @param {Object} self - The internal details of an [`Iframe`](@link).

move_markup_to_iframe = (self) => {
  var iframe = self.node,
      iframe_content = iframe.parentNode.querySelector(`.${classes.content}`),
      iframe_window = iframe.contentWindow;

  if(!(iframe_content && iframe_window)) { return; }

  iframe_window.document.open();
  iframe_window.document.write(decode_html_entities(iframe_content.innerHTML));
  iframe_window.document.close();
};

//*
// The object that manages communication between the parent page and a
// document embedded in an `iframe`. Essentially, components can register on
// either side of the coin with the `Iframe` for that side. They can then
// send messages, which get triggered on the other side, and can listen for
// events sent from the other side. The registering and sending/ listening is
// all handled by [`Communicator`](@link); the `Iframe` simply manages the
// the passing of events between the two sides and the calling of event
// handlers in listeners that have been registered.
//
// @factory
//
// @param {HTMLElement} node - The actual `iframe` node (if in the parent) or
// the wrapper node (if in the child) that will act as the root for the
// `Iframe`.

Iframe = (node) => {
  var self = create_self(node);
  move_markup_to_iframe(self);
  add_event_listeners(self);

  return {

    //*
    // Trigger a particular event, such that it gets sent to the other side of
    // the `iframe` bridge. If the `iframe` has not yet loaded, the message
    // will be queued for when the `iframe` communication is available.
    //
    // @method
    //
    // @param {String} type - The type of event to trigger. Do not pass a string
    // literal; instead, pass an event defined on [`Events.types`](@link).
    //
    // @param {*} [data = {}] - The data to pass to the corresponding `Iframe`.
    // This can be anything that can be stringified with `JSON.stringify`.

    trigger(type, data = {}) {
      data = Object.assign({}, { type, id: self.id }, data);
      data = JSON.parse(JSON.stringify(data));
      return self.ready ? self.message(data) : self.queue(data);
    },

    //*
    // Registers a listener object with this `Iframe` that will be notified when
    // events are recived from the other side of the `iframe` bridge.
    //
    // @method
    //
    // @param {Communicator} listener - The object that will receive events.
    //
    // @returns Boolean - Returns `true` if the register call was successful
    // (that is, the listener has the required signature and is not already
    // registered), `false` otherwise.

    register(listener) {
      if(self.listeners.includes(listener)) { return false; }
      self.listeners.push(listener);
      return true;
    }
  };
};

//*
// Returns the [`Iframe`](@link) object associated with the passed node, or
// the iframe whose ID matches the passed identifier.
//
// @method
// @static
//
// @Param {String | HTMLElement} iframe - If a `String` is passed, the
// [`Iframe`](@link) for an `iframe` whose `data-iframe-id` matches the string.
// If an `HTMLElement` is passed, the [`Iframe`](@link) object that was created
// for that node.
//
// @returns {Iframe | Boolean} - If no matching `Iframe` is found, `false` will
// be returned.

Iframe.for = (iframe) => {
  if(typeof iframe === "string") {
    iframe = document.querySelector(`.${classes.base}[${attrs.id}='${iframe}']`);
  }

  if(!iframe) { return false; }
  return Cache(iframe).get(classes.root);
};

//*
// Initializes the `Iframe` component.
//
// @method
// @static
//
// @param {HTMLElement} [context = document] - The context in which to search
// for DOM nodes that should be used as the root of an `Iframe` component.

Iframe.init = (context = document) => {
  var iframe_nodes = Array.from(context.querySelectorAll(`.${classes.root}`));
  for(let iframe of iframe_nodes) { Iframe(iframe); }
};

export { Communicator, classes, attrs };
export default Iframe;
