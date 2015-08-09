// TODO

const DRAG_THRESHOLD = 5;

var UIEvents, coordinates;

coordinates = (event) => {
  var touches = event.touches;

  return {
    x: touches ? touches[0].x : event.pageX,
    y: touches ? touches[0].y : event.pageY
  };
};

coordinates.distance_between = (before, after) => {
  var delta_x = Math.abs(after.x - before.x),
      delta_y = Math.abs(after.y - before.y);

  return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
};

UIEvents = {
  get transition_end() {
    var transitions, transition, element, event_name;

    transitions = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "otransitionend",
      transition: "transitionend"
    };

    element = document.createElement("div");
    event_name = null;

    for(transition in transitions) {
      if(element.style[transition] !== undefined) {
        event_name = transitions[transition];
        break;
      }
    }

    Object.defineProperty(UIEvents, "transition_end", { value: event_name });
    return event_name;
  },

  drag: {
    get start() { return "mousedown"; },
    get move() { return "mousemove"; },
    get end() { return "mouseup"; }
  },

  transition(node, callback) {
    return new Promise((resolve) => {
      var transition_end = this.transition_end;

      if(transition_end) {
        node.addEventListener(transition_end, resolve);
        callback();
      } else {
        resolve();
      }
    });
  },

  add_drag_listeners(move_handler, end_handler) {
    var { move, end } = this.drag;

    document.addEventListener(move, move_handler);
    document.addEventListener(end, end_handler);

    return {
      remove() {
        document.removeEventListener(move, move_handler);
        document.removeEventListener(end, end_handler);
      }
    };
  },

  coordinates,
  DRAG_THRESHOLD
};

export default UIEvents;
