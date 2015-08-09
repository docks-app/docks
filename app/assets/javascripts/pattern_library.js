(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
//        ___                     ___                 ___          ___
//       /  /\        ___        /  /\        ___    /  /\        /  /\
//      /  /::\      /__/\      /  /::\      /  /\  /  /::\      /  /::\
//     /  /:/\:\     \  \:\    /  /:/\:\    /  /:/ /  /:/\:\    /  /:/\:\
//    /  /:/~/::\     \  \:\  /  /:/~/::\  /  /:/ /  /:/~/::\  /  /:/~/:/
//   /__/:/ /:/\:\___  \__\:\/__/:/ /:/\:\/  /::\/__/:/ /:/\:\/__/:/ /:/___
//   \  \:\/:/__\/__/\ |  |:|\  \:\/:/__\/__/:/\:\  \:\/:/__\/\  \:\/:::::/
//    \  \::/    \  \:\|  |:| \  \::/    \__\/  \:\  \::/      \  \::/~~~~
//     \  \:\     \  \:\__|:|  \  \:\         \  \:\  \:\       \  \:\
//      \  \:\     \__\::::/    \  \:\         \__\/\  \:\       \  \:\
//       \__\/         ~~~~      \__\/               \__\/        \__\/

//*
// The name of classes relevant to `Avatar`.
// @object

var classes = {
  root: "avatar",
  image: "avatar__image"
};

//*
// The name of states relevant to `Avatar`.
// @object

var states = {
  image: { visible: classes.image + "--is-visible" }
};

//*
// The name of attributes relevant to `Avatar`.
// @object

var attrs = {
  profile_name: "data-profile-name",
  service: "data-service"
};

//*
// The minimum time, in milliseconds, before the background images for avatars
// should be faded into view. This is done to prevent any sudden visual changes
// immediately after page load.
//
// @value 200
// @private
// @type Number

var MIN_TIME_TO_LOAD = 200;

//*
// Fades the image into view smoothly. To prevent sudden appearance of images
// immediately after page load, this function stores the time when it was
// initialized and waits at least `MIN_TIME_TO_LOAD` after that before applying
// the required classes.
//
// @private
// @param {DOMElement} image - The image to reveal.
// @returns nothing

var show_image = (function () {
  var start = Date.now();

  return function (image) {
    setTimeout(function () {
      image.classList.add(states.image.visible);
    }, Math.max(0, MIN_TIME_TO_LOAD - (Date.now() - start)));
  };
})();

//*
// The constructor around an avatar DOM node. This constructor will check for the
// service from which the avatar image should be fetched and do its best to grab
// that image.
//
// Because there is no way to interact with an `Avatar`, there is no public
// interface for this component.
//
// @factory
//
// @param {DOMElement} node - The top level of the avatar component.
// @returns nothing

function Avatar(node) {
  var profile_name = node.getAttribute(attrs.profile_name),
      image = node.querySelector("." + classes.image),
      service = node.getAttribute(attrs.service);

  switch (service) {
    case "github":
      $.getJSON("https://api.github.com/users/" + profile_name, function (data) {
        image.style.backgroundImage = "url(" + data.avatar_url + ")";
        show_image(image);
      });
      break;

    case "twitter":
    case "email":
      image.style.backgroundImage = "url(http://avatars.io/" + service + "/" + profile_name + ")";
      show_image(image);
      break;
  }
}

//*
// Initializes the `Avatar` component.
//
// @method
// @static
//
// @param {HTMLElement} [context = document] - The context in which to search
// for DOM nodes that should be used as the root of an `Avatar` component.

Avatar.init = function () {
  var context = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];

  var avatars = _Array$from(context.querySelectorAll("." + classes.root));
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(avatars), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var avatar = _step.value;
      Avatar(avatar);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

exports.classes = classes;
exports.states = states;
exports.attrs = attrs;
exports["default"] = Avatar;

// Lemon.make(Avatar)

},{"babel-runtime/core-js/array/from":16,"babel-runtime/core-js/get-iterator":17}],2:[function(require,module,exports){
"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _Object$defineProperties = require("babel-runtime/core-js/object/define-properties")["default"];

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

// See: http://updates.html5rocks.com/2015/04/cut-and-copy-commands

//        ___          ___        _____        ___
//       /  /\        /  /\      /  /::\      /  /\
//      /  /:/       /  /::\    /  /:/\:\    /  /:/_
//     /  /:/       /  /:/\:\  /  /:/  \:\  /  /:/ /\
//    /  /:/  ___  /  /:/  \:\/__/:/ \__\:|/  /:/ /:/_
//   /__/:/  /  /\/__/:/ \__\:\  \:\ /  /:/__/:/ /:/ /\
//   \  \:\ /  /:/\  \:\ /  /:/\  \:\  /:/\  \:\/:/ /:/
//    \  \:\  /:/  \  \:\  /:/  \  \:\/:/  \  \::/ /:/
//     \  \:\/:/    \  \:\/:/    \  \::/    \  \:\/:/
//      \  \::/      \  \::/      \__\/      \  \::/
//       \__\/        \__\/                   \__\/

var _scroll_container = require("../scroll_container");

var _scroll_container2 = _interopRequireDefault(_scroll_container);

var _utilitiesEvents = require("../../utilities/events");

var _utilitiesEvents2 = _interopRequireDefault(_utilitiesEvents);

var _utilitiesUi_events = require("../../utilities/ui_events");

var _utilitiesUi_events2 = _interopRequireDefault(_utilitiesUi_events);

var _utilitiesRange = require("../../utilities/range");

var _utilitiesRange2 = _interopRequireDefault(_utilitiesRange);

var _iframe = require("../iframe");

var _select = require("../select");

var _utilitiesMarkup = require("../../utilities/markup");

var _utilitiesPainting = require("../../utilities/painting");

var classes = {
  root: "code-block",
  header: "code-block__header",
  code: "code-block__code",
  select: "code-block__demo-selector",
  code_container: "code-block__code-container",
  toggler: "code-block__toggler",
  content: "code-block__content",
  iframe: "code-block__iframe",
  demo_content: "code-block__demo__content"
};

var variants = {
  root: { with_demo: classes.root + "--with-demo" }
};

var states = {
  root: { hidden: classes.root + "--is-hidden" }
};

var attrs = {
  language: "data-code-block-language",
  cached_max_height: "data-cached-max-height"
};

var CodeBlock;

//*
// Cleans a string of code and updates the string with syntax highlighting
// markup.
//
// @param {String} code - The raw code.
//
// @param {Object} [options = {}] - The options for the highlighting operation.
//
// @param {String} [options.language_code = "html"]
// The language of the passed code. This is used by the syntax highlighter to
// pick the appropriate highlighter.
//
// @param {Boolean} [options.collapse_newlines = false]
// Whether or not to combine multiple consecutive newlines into a single newline.
//
// @private
// @returns String - The cleaned and syntax-highlighted string.

function clean_and_highlight_code(code) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var language_code = options.language_code;

  code = (0, _utilitiesMarkup.clean)(code, options);
  if (!language_code || language_code === "html") {
    code = (0, _utilitiesMarkup.indent)(code);
  }
  return (0, _utilitiesMarkup.highlight)(code, options);
}

//*
// Updates helper code (that is, a template language that generates markup) for
// changes in classes that have corresponding attributes in the helper markup.
// It does this by searching through the helper markup for the symbol that sets
// a given class (the `setter`), and then assigns that a value depending on the
// nature of the change.
//
// - If there is no `constant` for the change, the value of the `setter` is
// assumed to be `true` if the class is active and `false` otherwise.
//
// - If there is a `constant`, this value is used when a class is added. The
// cache is required to store values for when a `setter` with a constant is
// removed — the value of the `setter` is then returned to the previous
// `constant`, which is stored in the cache.
//
// @param {String} code   - The raw code.
// @param {Object} change - The details about the class change. This should
//                          include whether the class was added or removed and
//                          all of the `setters` for the corresponding variation.
// @param {Object} cache  - The cache of previous constant values.
//
// @private
// @returns String - The helper code with the relevant attributes updated.

function update_helper(code, change, cache) {
  var add = !!change.add,
      helper_param,
      constant,
      helper_matcher,
      regex,
      constants_for_param,
      index,
      replace_value;

  function constant_replacer(match, param_portion, constant_portion) {
    cache[helper_param] = cache[helper_param] || [constant_portion];

    if (change.method === "add") {
      cache[helper_param].push(constant);
      return "" + param_portion + constant;
    } else {
      constants_for_param = cache[helper_param];
      if (!constants_for_param) {
        return match;
      }

      index = constants_for_param.indexOf(constant);
      if (index >= 0) {
        constants_for_param.splice(index, 1);
      }

      replace_value = constants_for_param[constants_for_param.length - 1];
      return "" + param_portion + replace_value;
    }
  }

  function boolean_replacer(match, param_portion) {
    return "" + param_portion + (add ? "true" : "false");
  }

  if (!change.set_by) {
    return code;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(change.set_by), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var set_by = _step.value;

      constant = set_by.constant || "";
      helper_param = set_by.setter;
      helper_matcher = ":?\"?" + helper_param.replace(":", "").replace("?", "\\?") + "\"?:?\\s*(?:=>\\s*)?";

      if (constant) {
        // If a value was actually declared for the set_by, find the current constant
        // and replace it as needed
        // key: VALUE, :key => VALUE, "key" => VALUE, :"key" => VALUE

        regex = new RegExp("(" + helper_matcher + ")([a-zA-Z\\-_:]*)");
        code = code.replace(regex, constant_replacer);
      } else {
        // No constant declared, assume it is true/ false
        regex = new RegExp("(" + helper_matcher + ")(true|false)");
        code = code.replace(regex, boolean_replacer);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return code;
}

//*
// Handles a click on the contained `button` that toggles the visibility of the
// code block.
//
// @private
// @param {Object} event - The `click` event on the select.

function toggle_code_block_visibility(event) {
  var code_block = CodeBlock["for"](event.target);
  if (code_block) {
    return;
  }
  code_block.toggle();
}

//*
// Handles a focus on the code area of a code block by selecting all of the
// text within the code block.
//
// @private
// @param {Object} event - The `focusin` event on the code.

function select_code() {
  (0, _utilitiesRange2["default"])(this).select_all();
}

$(document).on("click", "." + classes.toggler, toggle_code_block_visibility);
$(document).on("click", "." + classes.code, select_code);

//*
// Hides a code block.
//
// @param {Object} self - The internal details of a [`CodeBlock`](@link).
// @param {Object} options ({}) - The options for how the code block should be
// hidden. Currently, only the `without_transition` (which hides automatically
// rather than scaling the height of the code block) option is supported.
//
// @private

function hide(self) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var node = self.node;
  var toggler = self.toggler;
  var content = self.content;
  var without_transition = options.without_transition;

  var scroll_container = _scroll_container2["default"]["for"](node);
  if (scroll_container) {
    scroll_container.maintain_current_height();
  }

  node.classList.add(states.root.hidden);
  if (toggler) {
    toggler.querySelector("span").textContent = "Show";
  }

  content.style.transition = "none";

  if (!without_transition) {
    content.style.height = Math.min(content.scrollHeight, parseInt(content.getAttribute(attrs.cached_max_height), 10)) + "px";
    (0, _utilitiesPainting.force_repaint)(content);
    content.style.transition = null;
  }

  (0, _utilitiesPainting.force_repaint)(content);
  content.style.height = "0px";

  if (without_transition) {
    (0, _utilitiesPainting.force_repaint)(content);
    content.style.transition = null;
  }

  self.is_hidden = true;
}

//*
// Shows a code block.
//
// @param {Object} self - The internal details of a [`CodeBlock`](@link).
//
// @private

function show(self) {
  var node, toggler, content;
  return _regeneratorRuntime.async(function show$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        node = self.node;
        toggler = self.toggler;
        content = self.content;

        node.classList.remove(states.root.hidden);
        self.is_hidden = false;
        if (toggler) {
          toggler.querySelector("span").textContent = "Hide";
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_utilitiesUi_events2["default"].transition(content, function () {
          content.style.height = Math.min(content.scrollHeight, parseInt(content.getAttribute(attrs.cached_max_height), 10)) + "px";
        }));

      case 8:

        content.style.height = null;

      case 9:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
}

//*
// Caches the max height of the main content area of a code block. This is done
// so that the transition from hidden to shown caps out at the `max-height`
// specified in CSS.
//
// In order to allow the code areas to scroll, an appropriate max-height is also
// set on them.
//
// @param {Object} self - The internal details of a [`CodeBlock`](@link).
//
// @private

function cache_content_height(self) {
  var node = self.node;
  var content = self.content;

  var max_height = parseInt(window.getComputedStyle(content).maxHeight, 10);

  content.setAttribute(attrs.cached_max_height, max_height);

  var header = node.querySelector("." + classes.header),
      header_height = header ? header.offsetHeight : 0,
      max_code_height = max_height - header_height + "px";

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _getIterator(_Array$from(node.querySelectorAll("." + classes.code_container))), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var code_container = _step2.value;

      code_container.style.maxHeight = max_code_height;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

//*
// Does all of the necessary work to manage the two-way communication between
// a code block connected to an `iframe` and that `iframe`. This includes
// listening for changes to markup of the associated demo and triggering an
// intial markup request to get the most up-to-date representation possible.
//
// @param {Object} self - The internal details of a [`CodeBlock`](@link).
//
// @private

function hook_up_iframe_communication(self) {
  var communicator = (0, _iframe.Communicator)(),
      registered = communicator.register.from_node(self.node);

  if (!registered) {
    return false;
  }

  function handle_markup_change(event) {
    if (!event.html || !self.code_caches.markup) {
      return;
    }
    self.code_caches.markup.code = event.html;
  }

  function handle_class_change(event) {
    if (!self.code_caches.helper) {
      return;
    }
    if (event.details.add === undefined) {
      event.details.add = event.add;
    }
    self.code_caches.helper.update(event.details);
  }

  communicator.on(_utilitiesEvents2["default"].types.markup_request, handle_markup_change);
  communicator.on(_utilitiesEvents2["default"].types.markup_change, handle_markup_change);
  communicator.on(_utilitiesEvents2["default"].types.class_change, handle_class_change);

  communicator.trigger(_utilitiesEvents2["default"].types.markup_request);
  return communicator;
}

function attach_event_listeners(self) {
  var select = self.node.querySelector("." + _select.classes.root);

  if (select && self.communicator) {
    select.addEventListener("change", function (event) {
      self.communicator.trigger(_utilitiesEvents2["default"].types.markup_request, {
        demo: event.target.value
      });
    });
  }
}

//*
// An API for cacheing, updating, and highlighting code within a code block.
//
// @param {HTMLElement} node - The main code block.
//
// @private
// @factory

var CodeCaches = (function () {
  var languages = {
    markup: ["html"],
    helper: ["erb", "haml", "slim"]
  };

  function CodeCache(node) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var language = node.getAttribute(attrs.language) || "html",
        dom_code = node.querySelector("code"),
        code = dom_code.innerHTML,
        helper_cache = null;

    var code_cache = _Object$defineProperties({
      language: language,
      highlight: function highlight() {
        this.code = code;
      }
    }, {
      code: {
        get: function get() {
          return code;
        },
        set: function set(new_code) {
          code = new_code;
          dom_code.innerHTML = clean_and_highlight_code(new_code, {
            language_code: language,
            collapse_newlines: options.generated_from_helper
          });
        },
        configurable: true,
        enumerable: true
      }
    });

    code_cache.highlight();

    if (languages.helper.include(language)) {
      helper_cache = {};

      Object.defineProperty(code_cache, "update", {
        value: function value(change) {
          this.code = update_helper(this.code, change, helper_cache);
        }
      });
    }

    return code_cache;
  }

  return function (node) {
    var code_nodes = _Array$from(node.querySelectorAll("." + classes.code)),
        code_caches = code_nodes.map(function (code_node) {
      return CodeCache(code_node, { generated_from_helper: code_nodes.length > 1 });
    });

    var api = _Object$defineProperties({

      length: code_caches.length
    }, {
      markup: {
        get: function get() {
          return code_caches.filter(function (code_cache) {
            return languages.markup.include(code_cache.language);
          })[0];
        },
        configurable: true,
        enumerable: true
      },
      helper: {
        get: function get() {
          return code_caches.filter(function (code_cache) {
            return languages.helper.include(code_cache.language);
          })[0];
        },
        configurable: true,
        enumerable: true
      }
    });

    for (var i = 0; i < code_caches.length; i++) {
      _Object$defineProperty(api, i, { value: code_caches[i] });
    }

    return api;
  };
})();

//*
// The constructor around a code block.
//
// @factory
// @public
//
// @param {HTMLElement} node - The node with the `code-block` root class.

CodeBlock = function (node) {
  var self = {
    node: node,
    is_hidden: node.classList.contains(states.root.hidden),
    toggler: node.querySelector("." + classes.toggler),
    content: node.querySelector("." + classes.content),
    code_caches: CodeCaches(node),
    communicator: hook_up_iframe_communication(self)
  };

  attach_event_listeners(self);

  if (self.is_hidden) {
    hide(self, { without_transition: true });
  }
  if (self.toggler) {
    cache_content_height(self);
  }

  //*
  // Toggles the code block.
  //
  // @method

  var toggle = function toggle() {
    return self.is_hidden ? show(self) : hide(self);
  };
  var code_block = { toggle: toggle };

  return code_block;
};

exports.classes = classes;
exports.states = states;
exports.variants = variants;
exports.attrs = attrs;
exports["default"] = CodeBlock;

},{"../../utilities/events":10,"../../utilities/markup":11,"../../utilities/painting":12,"../../utilities/range":13,"../../utilities/ui_events":14,"../iframe":5,"../scroll_container":6,"../select":7,"babel-runtime/core-js/array/from":16,"babel-runtime/core-js/get-iterator":17,"babel-runtime/core-js/object/define-properties":20,"babel-runtime/core-js/object/define-property":21,"babel-runtime/helpers/interop-require-default":26,"babel-runtime/regenerator":75}],3:[function(require,module,exports){
"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilitiesEvents = require("../../utilities/events");

var _utilitiesEvents2 = _interopRequireDefault(_utilitiesEvents);

var _utilitiesUi_events = require("../../utilities/ui_events");

var _utilitiesUi_events2 = _interopRequireDefault(_utilitiesUi_events);

var _iframe = require("../iframe");

//*
// The name of classes relevant to `Demo`.
// @object

var classes = {
  root: "demo",
  section: "demo__section",
  content: "content"
};

//*
// The delay after a change in markup to keep track of height changes and
// communicate them to the attached [`Iframe`](@link).
//
// @type Number
// @value 1000

var HEIGHT_CHANGE_WATCH_DURATION = 1000;

//*
// Updates the background color of the parent for the demo to match the
// background color of the last section. This is necessary because, during the
// transition from a larger size to a smaller size, not doing this would show
// white below all of the demo sections regardless of their color.
//
// @private
// @param {HTMLElement} node - The base `Demo` node.

function set_correct_background_color(node) {
  var parent = node.parentNode,
      sections = node.querySelectorAll("." + classes.section),
      last_section = sections[sections.length - 1];

  parent.style.backgroundColor = window.getComputedStyle(last_section).backgroundColor;
}

//*
// Spreads the minimum height of the total demo between the sections that are
// present. This is important because the resizable demo will show the full
// minimum width, so if there are colored sections that don't completely fill
// the minimum width, there will be an awkward white patch below the sections.
//
// @private
// @param {HTMLElement} node - The base `Demo` node.

function allocate_minimum_height(node) {
  var min_height = parseInt(window.getComputedStyle(node).minHeight),
      demo_sections = node.querySelectorAll("." + classes.section);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(demo_sections), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var demo_section = _step.value;

      demo_section.style.minHeight = min_height / demo_sections.length + "px";
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

//*
// Caches all of the internal details for an [`Demo`](@link).
//
// @private
// @param {HTMLElement} node - The node backing the `Demo`.
// @returns Object - The private, internal details of the `Demo`.

function create_self(node) {
  return {
    markup_source: document.querySelector(".#{CLASSES.CONTENT}"),
    demo_handlers: window.parent.Docks.demo_handlers || {},
    parent: node.parentNode,
    height: 0,
    actions: {},
    context: {
      body: document.body,
      document: document
    }
  };
}

//*
// The constructor for a new `Demo`. This will sign the demo up for all the
// required events and will do the required initialization work.
//
// @param {HTMLElement} node - The base `Demo` node.
//
// @factory

function Demo(node) {
  var self = create_self(node),
      communicator = (0, _iframe.Communicator)();

  //*
  // Sends the markup for the current "main" section.
  //
  // @param {Object} [event = {}] - The (optional) event that specifies the demo
  // to send markup for.
  //
  // @method
  // @private

  function send_markup() {
    var event = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    if (event.demo) {
      self.markup_source = document.querySelector("#" + classes.section + "--" + event.demo + " ." + classes.content);
    }

    communicator.trigger(_utilitiesEvents2["default"].types.markup_request, {
      html: self.markup_source.innerHTML
    });
  }

  //*
  // Sends the height for the demo as a whole, and sets that height on the
  // demo's container. The height is set on the container after a delay to
  // ensure that there is no patch of unstyled background color underneath a
  // demo that is shrinking.
  //
  // @method
  // @private

  function height_update() {
    var new_height = node.offsetHeight;
    if (new_height === self.height) {
      return;
    }

    self.height = new_height;
    setTimeout(function () {
      self.parent.style.minHeight = new_height + "px";
    }, HEIGHT_CHANGE_WATCH_DURATION);

    communicator.trigger(_utilitiesEvents2["default"].types.height_change, { height: new_height });
  }

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

  function apply_class_change(event) {
    var details = event.details,
        markup_change_in_source = false,
        minimum_one_class_change = false,
        matches = node.querySelectorAll("." + classes.content + " ." + details["for"]);

    if (details.filter_to) {
      // Check on matches
      matches = matches.filter(function (match) {
        return match.matches(details.filter_to);
      });
    }

    // Some height changes may occur over time. Watch for transitions
    // and send height again on each transitionend event
    //
    // TODO: integrate better iframe resizing
    // see: https://github.com/davidjbradshaw/iframe-resizer/tree/master/test

    document.addEventListener(_utilitiesUi_events2["default"].transition_end, height_update);

    var bail_early, class_list, action;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(matches), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var match = _step2.value;

        bail_early = false;
        class_list = match.classList;
        action = null;

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _getIterator(details.preclude), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var preclude = _step3.value;

            if (class_list.contains(preclude)) {
              bail_early = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        if (bail_early) {
          continue;
        }

        minimum_one_class_change = true;

        action = details.javascript_action;
        if (action) {
          if (!event.add) {
            action = action.replace(/addClass/g, "removeClass").replace(/classList\.add/g, "classList.remove").replace(/(true|false)/, { "true": "false", "false": "true" });
          }

          eval(action);
        } else {
          class_list[event.add ? "add" : "remove"](details.name);
        }

        // Only update markup in source when the markup source is above in the
        // DOM tree.
        markup_change_in_source = markup_change_in_source || $(match).closest(self.markup_source).length > 0;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    if (markup_change_in_source) {
      send_markup();
    }

    if (minimum_one_class_change) {
      // Pass along the class change event
      communicator.trigger(event.type, event);
      height_update();
    }

    setTimeout(function () {
      document.removeEventListener(_utilitiesUi_events2["default"].transition_end, height_update);
    }, HEIGHT_CHANGE_WATCH_DURATION);
  }

  communicator.register.from_node(node);
  communicator.on(_utilitiesEvents2["default"].types.height_request, height_update);
  communicator.on(_utilitiesEvents2["default"].types.markup_request, send_markup);
  communicator.on(_utilitiesEvents2["default"].types.class_change, apply_class_change);

  window.addEventListener("resize", height_update);
  setInterval(height_update, HEIGHT_CHANGE_WATCH_DURATION);

  height_update();
  allocate_minimum_height(node);
  set_correct_background_color(node);

  return {};
}

//*
// Initializes the `Demo` component.
//
// @method
// @static
//
// @param {HTMLElement} [context = document] - The context in which to search
// for DOM nodes that should be used as the root of an `Demo` component.

Demo.init = function () {
  var context = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];

  var demos = _Array$from(context.querySelectorAll("." + classes.root));
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _getIterator(demos), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var demo = _step4.value;
      Demo(demo);
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }
};

exports["default"] = Demo;
module.exports = exports["default"];

},{"../../utilities/events":10,"../../utilities/ui_events":14,"../iframe":5,"babel-runtime/core-js/array/from":16,"babel-runtime/core-js/get-iterator":17,"babel-runtime/helpers/interop-require-default":26}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var classes = {
  root: "field",
  input: "field__input",
  label: "label"
};

var states = {
  root: { focused: classes.root + "--is-focused" },
  label: { focused: classes.label + "--is-focused" }
};

var Field = {
  init: function init() {
    $(document).on("focusin focusout", "." + classes.input, function (event) {
      var method = event.type === "focusin" ? "add" : "remove",
          label = document.querySelector("[for=" + event.target.id + "]");

      event.target.parentNode.classList[method](states.root.focused);
      label.classList[method](states.label.focused);
    });
  }
};

exports["default"] = Field;
module.exports = exports["default"];

},{}],5:[function(require,module,exports){
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

"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilitiesEvents = require("../../utilities/events");

var _utilitiesEvents2 = _interopRequireDefault(_utilitiesEvents);

var _utilitiesDom_cache = require("../../utilities/dom_cache");

var _utilitiesDom_cache2 = _interopRequireDefault(_utilitiesDom_cache);

var _utilitiesMarkup = require("../../utilities/markup");

//*
// The name of classes relevant to `Iframe` and `Communicator`.
// @object

var classes = {
  root: "iframe",
  content: "iframe__content"
};

//*
// The name of attributes relevant to `Iframe` and `Communicator`.
// @object

var attrs = {
  id: "data-iframe-id"
};

//*
// The possible positions of an [`Iframe`](@link) — either the parent (on the
// main page) or the child (embedded inside an `iframe`).
//
// @object
// @private

var positions = {
  parent: "parent",
  child: "child"
};

//*
// A set of events registered with [`Events`](@link) that relate specifically
// to features managed by the core `Iframe`.
//
// @object
// @private

var iframe_events = ["markup_request", "markup_request", "height_change", "markup_change", "class_change", "height_request", "event_handler"];

_utilitiesEvents2["default"].register.apply(_utilitiesEvents2["default"], iframe_events);

var iframes = [];
var Iframe, Communicator;

//*
// A mechanism for communicating between a given component and one or more
// [`Iframe`s](@link Iframe).
//
// @factoryk

exports.Communicator = Communicator = function () {
  var private_iframes = [],
      actions = {};

  var communicator = {

    //*
    // Trigger an event with the provided data to all attached iframes.
    //
    // @method
    //
    // @param {String} type - The type of event to trigger. Do not pass a string
    // literal — instead, pass an event defined on [`Events.types`](@link).
    //
    // @param {*} data - Any piece of data that can be stringified by
    // `JSON.stringify`.

    trigger: function trigger(type, data) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(private_iframes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var private_iframe = _step.value;

          private_iframe.trigger(type, data);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    },

    //*
    // Add a listener for when an `Iframe` is triggered with the passed `event`.
    //
    // @method
    //
    // @param {String} type - The type of event to listen for. Do not pass a
    // string literal — instead, pass an event defined on
    // [`Events.types`](@link).
    //
    // @param {Function} action - The callback to run when the event is
    // triggered.
    //
    // @param {Object} action.data - The data that was passed along to the
    // [`Iframe#trigger`](@link) that generated this event.

    on: function on(event, action) {
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

    receive: function receive(event) {
      var event_actions = actions[event.type];
      if (!event_actions) {
        return;
      }
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _getIterator(actions), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var action = _step2.value;
          action(event);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
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

      with_iframe: function with_iframe(id) {
        var iframe = Iframe["for"](id),
            registered = !!iframe && iframe.register(communicator);

        if (registered) {
          private_iframes.push(iframe);
        }
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

      from_node: function from_node(node) {
        return this.with_iframe(node.getAttribute(attrs.id));
      },

      //*
      // Registers this `Communicator` with all `iframe`s on the page.
      //
      // @method
      //
      // @returns Boolean - Returns `true` if there are `iframe`s on the page,
      // and false otherwise.

      with_all: function with_all() {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _getIterator(iframes), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var iframe = _step3.value;
            this.with_iframe(iframe);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

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

function create_self(node) {
  var self = {
    node: node,
    id: node.getAttribute(attrs.id),
    ready: false,
    listeners: [],
    message_queue: [],
    message: function message(data) {
      this.message_target.postMessage(JSON.stringify(data), "*");
    },
    queue: function queue(data) {
      this.message_queue.push(data);
    }
  };

  if (node.tagName.toLowerCase() === "iframe") {
    _Object$assign(self, { position: positions.parent, message_target: node.contentWindow });
  } else {
    _Object$assign(self, { position: positions.child, message_target: window.parent });
  }

  return self;
}

//*
// Sets up all required event listeners for an [`Iframe`](@link), including the
// listener for `postMessage` and listeners on the relevant `iframe` for the
// `load` event (as a hook to run the first set of events).
//
// @private
// @param {Object} self - The internal details of an [`Iframe`](@link).

function add_event_listeners(self) {
  self.node.addEventListener("load", function () {
    self.ready = true;
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = _getIterator(self.message_queue), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var queued_message = _step4.value;
        self.message(queued_message);
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
          _iterator4["return"]();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    self.message_queue = [];
  });

  window.addEventListener("message", function (event) {
    if (typeof event.data !== "string") {
      return;
    }

    var data = JSON.parse(event.data);
    if (data.id !== self.id) {
      return;
    }

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = _getIterator(self.listeners), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var listener = _step5.value;
        listener.receive(data);
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
          _iterator5["return"]();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
  });
}

//*
// Moves the markup for for an iframe into the actual iframe. This looks for the
// `iframe__content` sibling node of the iframe, takes its inner HTML, decodes
// the escaped entities, and writes the entirety of the resulting string (which
// includes the HTML element and all children) to the iframe's window.
//
// @private
// @param {Object} self - The internal details of an [`Iframe`](@link).

function move_markup_to_iframe(self) {
  var iframe = self.node,
      iframe_content = iframe.parentNode.querySelector("." + classes.content),
      iframe_window = iframe.contentWindow;

  if (!(iframe_content && iframe_window)) {
    return;
  }

  iframe_window.document.open();
  iframe_window.document.write((0, _utilitiesMarkup.decode_html_entities)(iframe_content.innerHTML));
  iframe_window.document.close();
}

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

Iframe = function (node) {
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

    trigger: function trigger(type) {
      var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      data = _Object$assign({}, { type: type, id: self.id }, data);
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

    register: function register(listener) {
      if (self.listeners.includes(listener)) {
        return false;
      }
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

Iframe["for"] = function (iframe) {
  if (typeof iframe === "string") {
    iframe = document.querySelector("." + classes.base + "[" + attrs.id + "='" + iframe + "']");
  }

  if (!iframe) {
    return false;
  }
  return (0, _utilitiesDom_cache2["default"])(iframe).get(classes.root);
};

//*
// Initializes the `Iframe` component.
//
// @method
// @static
//
// @param {HTMLElement} [context = document] - The context in which to search
// for DOM nodes that should be used as the root of an `Iframe` component.

Iframe.init = function () {
  var context = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];

  var iframe_nodes = _Array$from(context.querySelectorAll("." + classes.root));
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = _getIterator(iframe_nodes), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var iframe = _step6.value;
      Iframe(iframe);
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
        _iterator6["return"]();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }
};

exports.Communicator = Communicator;
exports.classes = classes;
exports.attrs = attrs;
exports["default"] = Iframe;

},{"../../utilities/dom_cache":9,"../../utilities/events":10,"../../utilities/markup":11,"babel-runtime/core-js/array/from":16,"babel-runtime/core-js/get-iterator":17,"babel-runtime/core-js/object/assign":18,"babel-runtime/helpers/interop-require-default":26}],6:[function(require,module,exports){
"use strict";

},{}],7:[function(require,module,exports){
"use strict";

},{}],8:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _componentsAvatar = require("./components/avatar");

var _componentsAvatar2 = _interopRequireDefault(_componentsAvatar);

var _componentsCode_block = require("./components/code_block");

var _componentsCode_block2 = _interopRequireDefault(_componentsCode_block);

var _componentsDemo = require("./components/demo");

var _componentsDemo2 = _interopRequireDefault(_componentsDemo);

var _componentsField = require("./components/field");

var _componentsField2 = _interopRequireDefault(_componentsField);

var _componentsIframe = require("./components/iframe");

var _componentsIframe2 = _interopRequireDefault(_componentsIframe);

_componentsAvatar2["default"].init();
_componentsIframe2["default"].init();
_componentsDemo2["default"].init();
_componentsCode_block2["default"].init();
_componentsField2["default"].init();

},{"./components/avatar":1,"./components/code_block":2,"./components/demo":3,"./components/field":4,"./components/iframe":5,"babel-runtime/helpers/interop-require-default":26}],9:[function(require,module,exports){
//        ___          ___          ___          ___          ___
//       /  /\        /  /\        /  /\        /__/\        /  /\
//      /  /:/       /  /::\      /  /:/        \  \:\      /  /:/_
//     /  /:/       /  /:/\:\    /  /:/          \__\:\    /  /:/ /\
//    /  /:/  ___  /  /:/~/::\  /  /:/  ___  ___ /  /::\  /  /:/ /:/_
//   /__/:/  /  /\/__/:/ /:/\:\/__/:/  /  /\/__/\  /:/\:\/__/:/ /:/ /\
//   \  \:\ /  /:/\  \:\/:/__\/\  \:\ /  /:/\  \:\/:/__\/\  \:\/:/ /:/
//    \  \:\  /:/  \  \::/      \  \:\  /:/  \  \::/      \  \::/ /:/
//     \  \:\/:/    \  \:\       \  \:\/:/    \  \:\       \  \:\/:/
//      \  \::/      \  \:\       \  \::/      \  \:\       \  \::/
//       \__\/        \__\/        \__\/        \__\/        \__\/

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Cache() {}

exports["default"] = Cache;
module.exports = exports["default"];

},{}],10:[function(require,module,exports){
//        ___                      ___          ___                   ___
//       /  /\         ___        /  /\        /__/\         ___     /  /\
//      /  /:/_       /__/\      /  /:/_       \  \:\       /  /\   /  /:/_
//     /  /:/ /\      \  \:\    /  /:/ /\       \  \:\     /  /:/  /  /:/ /\
//    /  /:/ /:/_      \  \:\  /  /:/ /:/_  _____\__\:\   /  /:/  /  /:/ /::\
//   /__/:/ /:/ /\ ___  \__\:\/__/:/ /:/ /\/__/::::::::\ /  /::\ /__/:/ /:/\:\
//   \  \:\/:/ /://__/\ |  |:|\  \:\/:/ /:/\  \:\~~\~~\//__/:/\:\\  \:\/:/~/:/
//    \  \::/ /:/ \  \:\|  |:| \  \::/ /:/  \  \:\  ~~~ \__\/  \:\\  \::/ /:/
//     \  \:\/:/   \  \:\__|:|  \  \:\/:/    \  \:\          \  \:\\__\/ /:/
//      \  \::/     \__\::::/    \  \::/      \  \:\          \__\/  /__/:/
//       \__\/          ~~~~      \__\/        \__\/                 \__\/

"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Events = {
  register: function register() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _len = arguments.length, events = Array(_len), _key = 0; _key < _len; _key++) {
        events[_key] = arguments[_key];
      }

      for (var _iterator = _getIterator(events), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var event = _step.value;

        this.types[event] = event;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },

  types: {}
};

exports["default"] = Events;
module.exports = exports["default"];

},{"babel-runtime/core-js/get-iterator":17}],11:[function(require,module,exports){
//        ___          ___          ___          ___          ___          ___
//       /__/\        /  /\        /  /\        /__/|        /__/\        /  /\
//      |  |::\      /  /::\      /  /::\      |  |:|        \  \:\      /  /::\
//      |  |:|:\    /  /:/\:\    /  /:/\:\     |  |:|         \  \:\    /  /:/\:\
//    __|__|:|\:\  /  /:/~/::\  /  /:/~/:/   __|  |:|     ___  \  \:\  /  /:/~/:/
//   /__/::::| \:\/__/:/ /:/\:\/__/:/ /:/___/__/\_|:|____/__/\  \__\:\/__/:/ /:/
//   \  \:\~~\__\/\  \:\/:/__\/\  \:\/:::::/\  \:\/:::::/\  \:\ /  /:/\  \:\/:/
//    \  \:\       \  \::/      \  \::/~~~~  \  \::/~~~~  \  \:\  /:/  \  \::/
//     \  \:\       \  \:\       \  \:\       \  \:\       \  \:\/:/    \  \:\
//      \  \:\       \  \:\       \  \:\       \  \:\       \  \::/      \  \:\
//       \__\/        \__\/        \__\/        \__\/        \__\/        \__\/

"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vendorHljs = require("../../vendor/hljs");

var _vendorHljs2 = _interopRequireDefault(_vendorHljs);

var start_tag_test = /^<[^\/]/;

//*
// The size of manually re-indented code.
//
// @private
// @type Number
// @value 2

var end_tag_test = /^<\//;
var contains_end_tag = /<\//;
var INDENTATION_SIZE = 2;

function decode_html_entities(string) {
  var element = document.createElement("div");
  element.innerHTML = string.trim();

  return element.childNodes.length === 0 ? "" : element.childNodes[0].nodeValue || element.innerHTML;
}

//*
// Indents HTML markup by finding opening and closing HTML tags.
//
// @param {String} code - The randomly-escaped HTML string.
// @returns {String} The indented string.

function indent(markup) {
  var indent_count = -INDENTATION_SIZE,
      indented_markup = [],
      markup_lines = markup.split("\n"),
      start_tag,
      end_tag;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(markup_lines), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var markup_line = _step.value;

      markup_line = markup_line.trim();
      start_tag = start_tag_test.test(markup_line);
      end_tag = end_tag_test.test(markup_line);

      if (start_tag) {
        indent_count += INDENTATION_SIZE;
      }
      indent_count = Math.max(indent_count, 0);

      if (indent_count > 0) {
        markup_line = "" + Array(indent_count + 1).join(" ") + markup_line;
      }

      indented_markup.push(markup_line);
      if (end_tag) {
        indent_count -= INDENTATION_SIZE;
      }
      if (!end_tag && contains_end_tag.test(markup_line)) {
        indent_count -= INDENTATION_SIZE;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return indented_markup.join("\n");
}

function clean(code) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (!code) {
    return "";
  }

  code = decode_html_entities(code);
  code = code.trim();
  if (options.collapse_newlines) {
    code = code.replace(/\n^\s*\n/mg, "\n");
  }

  // Kills any leading spaces from each line
  var leading_spaces = code.match(/^\s*/);
  if (leading_spaces) {
    code = code.replace(new RegExp("^\\s{" + leading_spaces[0].length + "}", "gm"), "");
  }

  return code;
}

function highlight(code) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return _vendorHljs2["default"].highlight(options.language_code || "html", code).value;
}

exports.decode_html_entities = decode_html_entities;
exports.indent = indent;
exports.clean = clean;
exports.highlight = highlight;

},{"../../vendor/hljs":15,"babel-runtime/core-js/get-iterator":17,"babel-runtime/helpers/interop-require-default":26}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function force_repaint() {
  var node = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];

  return node.offsetHeight && node.offsetWidth;
}

exports.force_repaint = force_repaint;

},{}],13:[function(require,module,exports){
"use strict";

},{}],14:[function(require,module,exports){
// TODO

"use strict";

var _Object$defineProperties = require("babel-runtime/core-js/object/define-properties")["default"];

var _Promise = require("babel-runtime/core-js/promise")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
var UIEvents = _Object$defineProperties({

  drag: _Object$defineProperties({}, {
    start: {
      get: function get() {
        return "mousedown";
      },
      configurable: true,
      enumerable: true
    },
    move: {
      get: function get() {
        return "mousemove";
      },
      configurable: true,
      enumerable: true
    },
    end: {
      get: function get() {
        return "mouseup";
      },
      configurable: true,
      enumerable: true
    }
  }),

  transition: function transition(node, callback) {
    var _this = this;

    return new _Promise(function (resolve) {
      var transition_end = _this.transition_end;

      if (transition_end) {
        node.addEventListener(transition_end, resolve);
        callback();
      } else {
        resolve();
      }
    });
  }
}, {
  transition_end: {
    get: function get() {
      var transitions = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend",
        transition: "transitionend"
      };

      var element = document.createElement("div"),
          event_name = null;

      for (var transition in transitions) {
        if (element.style[transition] !== undefined) {
          event_name = transitions[transition];
          break;
        }
      }

      Object.defineProperty(UIEvents, "transition_end", { value: event_name });
      return event_name;
    },
    configurable: true,
    enumerable: true
  }
});

exports["default"] = UIEvents;
module.exports = exports["default"];

},{"babel-runtime/core-js/object/define-properties":20,"babel-runtime/core-js/promise":23}],15:[function(require,module,exports){
"use strict";

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

!(function (e) {
  "undefined" != typeof exports ? e(exports) : (window.hljs = e({}), "function" == typeof define && define.amd && define([], function () {
    return window.hljs;
  }));
})(function (e) {
  function n(e) {
    return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
  }function t(e) {
    return e.nodeName.toLowerCase();
  }function r(e, n) {
    var t = e && e.exec(n);return t && 0 == t.index;
  }function a(e) {
    var n = (e.className + " " + (e.parentNode ? e.parentNode.className : "")).split(/\s+/);return (n = n.map(function (e) {
      return e.replace(/^lang(uage)?-/, "");
    }), n.filter(function (e) {
      return N(e) || /no(-?)highlight/.test(e);
    })[0]);
  }function o(e, n) {
    var t = {};for (var r in e) t[r] = e[r];if (n) for (var r in n) t[r] = n[r];return t;
  }function i(e) {
    var n = [];return ((function r(e, a) {
      for (var o = e.firstChild; o; o = o.nextSibling) 3 == o.nodeType ? a += o.nodeValue.length : 1 == o.nodeType && (n.push({ event: "start", offset: a, node: o }), a = r(o, a), t(o).match(/br|hr|img|input/) || n.push({ event: "stop", offset: a, node: o }));return a;
    })(e, 0), n);
  }function c(e, r, a) {
    function o() {
      return e.length && r.length ? e[0].offset != r[0].offset ? e[0].offset < r[0].offset ? e : r : "start" == r[0].event ? e : r : e.length ? e : r;
    }function i(e) {
      function r(e) {
        return " " + e.nodeName + '="' + n(e.value) + '"';
      }l += "<" + t(e) + Array.prototype.map.call(e.attributes, r).join("") + ">";
    }function c(e) {
      l += "</" + t(e) + ">";
    }function u(e) {
      ("start" == e.event ? i : c)(e.node);
    }for (var s = 0, l = "", f = []; e.length || r.length;) {
      var g = o();if ((l += n(a.substr(s, g[0].offset - s)), s = g[0].offset, g == e)) {
        f.reverse().forEach(c);do u(g.splice(0, 1)[0]), g = o(); while (g == e && g.length && g[0].offset == s);f.reverse().forEach(i);
      } else "start" == g[0].event ? f.push(g[0].node) : f.pop(), u(g.splice(0, 1)[0]);
    }return l + n(a.substr(s));
  }function u(e) {
    function n(e) {
      return e && e.source || e;
    }function t(t, r) {
      return RegExp(n(t), "m" + (e.cI ? "i" : "") + (r ? "g" : ""));
    }function r(a, i) {
      if (!a.compiled) {
        if ((a.compiled = !0, a.k = a.k || a.bK, a.k)) {
          var c = {},
              u = function u(n, t) {
            e.cI && (t = t.toLowerCase()), t.split(" ").forEach(function (e) {
              var t = e.split("|");c[t[0]] = [n, t[1] ? Number(t[1]) : 1];
            });
          };"string" == typeof a.k ? u("keyword", a.k) : _Object$keys(a.k).forEach(function (e) {
            u(e, a.k[e]);
          }), a.k = c;
        }a.lR = t(a.l || /\b[A-Za-z0-9_]+\b/, !0), i && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), a.bR = t(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = t(a.e)), a.tE = n(a.e) || "", a.eW && i.tE && (a.tE += (a.e ? "|" : "") + i.tE)), a.i && (a.iR = t(a.i)), void 0 === a.r && (a.r = 1), a.c || (a.c = []);var s = [];a.c.forEach(function (e) {
          e.v ? e.v.forEach(function (n) {
            s.push(o(e, n));
          }) : s.push("self" == e ? a : e);
        }), a.c = s, a.c.forEach(function (e) {
          r(e, a);
        }), a.starts && r(a.starts, i);var l = a.c.map(function (e) {
          return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b;
        }).concat([a.tE, a.i]).map(n).filter(Boolean);a.t = l.length ? t(l.join("|"), !0) : { exec: function exec() {
            return null;
          } };
      }
    }r(e);
  }function s(e, t, a, o) {
    function i(e, n) {
      for (var t = 0; t < n.c.length; t++) if (r(n.c[t].bR, e)) return n.c[t];
    }function c(_x, _x2) {
      var _again = true;

      _function: while (_again) {
        var e = _x,
            n = _x2;
        _again = false;
        if (r(e.eR, n)) {
          return e;
        } else {
          if (e.eW) {
            _x = e.parent;
            _x2 = n;
            _again = true;
            continue _function;
          } else {
            return void 0;
          }
        }
      }
    }function f(e, n) {
      return !a && r(n.iR, e);
    }function g(e, n) {
      var t = x.cI ? n[0].toLowerCase() : n[0];return e.k.hasOwnProperty(t) && e.k[t];
    }function p(e, n, t, r) {
      var a = r ? "" : E.classPrefix,
          o = '<span class="' + a,
          i = t ? "" : "</span>";return (o += e + '">', o + n + i);
    }function d() {
      if (!w.k) return n(y);var e = "",
          t = 0;w.lR.lastIndex = 0;for (var r = w.lR.exec(y); r;) {
        e += n(y.substr(t, r.index - t));var a = g(w, r);a ? (B += a[1], e += p(a[0], n(r[0]))) : e += n(r[0]), t = w.lR.lastIndex, r = w.lR.exec(y);
      }return e + n(y.substr(t));
    }function h() {
      if (w.sL && !R[w.sL]) return n(y);var e = w.sL ? s(w.sL, y, !0, L[w.sL]) : l(y);return (w.r > 0 && (B += e.r), "continuous" == w.subLanguageMode && (L[w.sL] = e.top), p(e.language, e.value, !1, !0));
    }function v() {
      return void 0 !== w.sL ? h() : d();
    }function b(e, t) {
      var r = e.cN ? p(e.cN, "", !0) : "";e.rB ? (M += r, y = "") : e.eB ? (M += n(t) + r, y = "") : (M += r, y = t), w = _Object$create(e, { parent: { value: w } });
    }function m(e, t) {
      if ((y += e, void 0 === t)) return (M += v(), 0);var r = i(t, w);if (r) return (M += v(), b(r, t), r.rB ? 0 : t.length);var a = c(w, t);if (a) {
        var o = w;o.rE || o.eE || (y += t), M += v();do w.cN && (M += "</span>"), B += w.r, w = w.parent; while (w != a.parent);return (o.eE && (M += n(t)), y = "", a.starts && b(a.starts, ""), o.rE ? 0 : t.length);
      }if (f(t, w)) throw new Error('Illegal lexeme "' + t + '" for mode "' + (w.cN || "<unnamed>") + '"');return (y += t, t.length || 1);
    }var x = N(e);if (!x) throw new Error('Unknown language: "' + e + '"');u(x);for (var w = o || x, L = {}, M = "", k = w; k != x; k = k.parent) k.cN && (M = p(k.cN, "", !0) + M);var y = "",
        B = 0;try {
      for (var C, j, I = 0;;) {
        if ((w.t.lastIndex = I, C = w.t.exec(t), !C)) break;j = m(t.substr(I, C.index - I), C[0]), I = C.index + j;
      }m(t.substr(I));for (var k = w; k.parent; k = k.parent) k.cN && (M += "</span>");return { r: B, value: M, language: e, top: w };
    } catch (A) {
      if (-1 != A.message.indexOf("Illegal")) return { r: 0, value: n(t) };throw A;
    }
  }function l(e, t) {
    t = t || E.languages || _Object$keys(R);var r = { r: 0, value: n(e) },
        a = r;return (t.forEach(function (n) {
      if (N(n)) {
        var t = s(n, e, !1);t.language = n, t.r > a.r && (a = t), t.r > r.r && (a = r, r = t);
      }
    }), a.language && (r.second_best = a), r);
  }function f(e) {
    return (E.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function (e, n) {
      return n.replace(/\t/g, E.tabReplace);
    })), E.useBR && (e = e.replace(/\n/g, "<br>")), e);
  }function g(e, n, t) {
    var r = n ? x[n] : t,
        a = [e.trim()];return (e.match(/(\s|^)hljs(\s|$)/) || a.push("hljs"), r && a.push(r), a.join(" ").trim());
  }function p(e) {
    var n = a(e);if (!/no(-?)highlight/.test(n)) {
      var t;E.useBR ? (t = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), t.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : t = e;var r = t.textContent,
          o = n ? s(n, r, !0) : l(r),
          u = i(t);if (u.length) {
        var p = document.createElementNS("http://www.w3.org/1999/xhtml", "div");p.innerHTML = o.value, o.value = c(u, i(p), r);
      }o.value = f(o.value), e.innerHTML = o.value, e.className = g(e.className, n, o.language), e.result = { language: o.language, re: o.r }, o.second_best && (e.second_best = { language: o.second_best.language, re: o.second_best.r });
    }
  }function d(e) {
    E = o(E, e);
  }function h() {
    if (!h.called) {
      h.called = !0;var e = document.querySelectorAll("pre code");Array.prototype.forEach.call(e, p);
    }
  }function v() {
    addEventListener("DOMContentLoaded", h, !1), addEventListener("load", h, !1);
  }function b(n, t) {
    var r = R[n] = t(e);r.aliases && r.aliases.forEach(function (e) {
      x[e] = n;
    });
  }function m() {
    return _Object$keys(R);
  }function N(e) {
    return R[e] || R[x[e]];
  }var E = { classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: void 0 },
      R = {},
      x = {};return (e.highlight = s, e.highlightAuto = l, e.fixMarkup = f, e.highlightBlock = p, e.configure = d, e.initHighlighting = h, e.initHighlightingOnLoad = v, e.registerLanguage = b, e.listLanguages = m, e.getLanguage = N, e.inherit = o, e.IR = "[a-zA-Z][a-zA-Z0-9_]*", e.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = { b: "\\\\[\\s\\S]", r: 0 }, e.ASM = { cN: "string", b: "'", e: "'", i: "\\n", c: [e.BE] }, e.QSM = { cN: "string", b: '"', e: '"', i: "\\n", c: [e.BE] }, e.PWM = { b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/ }, e.CLCM = { cN: "comment", b: "//", e: "$", c: [e.PWM] }, e.CBCM = { cN: "comment", b: "/\\*", e: "\\*/", c: [e.PWM] }, e.HCM = { cN: "comment", b: "#", e: "$", c: [e.PWM] }, e.NM = { cN: "number", b: e.NR, r: 0 }, e.CNM = { cN: "number", b: e.CNR, r: 0 }, e.BNM = { cN: "number", b: e.BNR, r: 0 }, e.CSSNM = { cN: "number", b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?", r: 0 }, e.RM = { cN: "regexp", b: /\//, e: /\/[gimuy]*/, i: /\n/, c: [e.BE, { b: /\[/, e: /\]/, r: 0, c: [e.BE] }] }, e.TM = { cN: "title", b: e.IR, r: 0 }, e.UTM = { cN: "title", b: e.UIR, r: 0 }, e);
});hljs.registerLanguage("coffeescript", function (e) {
  var c = { keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not", literal: "true false null undefined yes no on off", reserved: "case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf", built_in: "npm require console print module global window document" },
      n = "[A-Za-z$_][0-9A-Za-z$_]*",
      t = { cN: "subst", b: /#\{/, e: /}/, k: c },
      r = [e.BNM, e.inherit(e.CNM, { starts: { e: "(\\s*/)?", r: 0 } }), { cN: "string", v: [{ b: /'''/, e: /'''/, c: [e.BE] }, { b: /'/, e: /'/, c: [e.BE] }, { b: /"""/, e: /"""/, c: [e.BE, t] }, { b: /"/, e: /"/, c: [e.BE, t] }] }, { cN: "regexp", v: [{ b: "///", e: "///", c: [t, e.HCM] }, { b: "//[gim]*", r: 0 }, { b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/ }] }, { cN: "property", b: "@" + n }, { b: "`", e: "`", eB: !0, eE: !0, sL: "javascript" }];t.c = r;var i = e.inherit(e.TM, { b: n }),
      s = "(\\(.*\\))?\\s*\\B[-=]>",
      o = { cN: "params", b: "\\([^\\(]", rB: !0, c: [{ b: /\(/, e: /\)/, k: c, c: ["self"].concat(r) }] };return { aliases: ["coffee", "cson", "iced"], k: c, i: /\/\*/, c: r.concat([{ cN: "comment", b: "###", e: "###", c: [e.PWM] }, e.HCM, { cN: "function", b: "^\\s*" + n + "\\s*=\\s*" + s, e: "[-=]>", rB: !0, c: [i, o] }, { b: /[:\(,=]\s*/, r: 0, c: [{ cN: "function", b: s, e: "[-=]>", rB: !0, c: [o] }] }, { cN: "class", bK: "class", e: "$", i: /[:="\[\]]/, c: [{ bK: "extends", eW: !0, i: /[:="\[\]]/, c: [i] }, i] }, { cN: "attribute", b: n + ":", e: ":", rB: !0, rE: !0, r: 0 }]) };
});hljs.registerLanguage("xml", function () {
  var t = "[A-Za-z0-9\\._:-]+",
      e = { b: /<\?(php)?(?!\w)/, e: /\?>/, sL: "php", subLanguageMode: "continuous" },
      c = { eW: !0, i: /</, r: 0, c: [e, { cN: "attribute", b: t, r: 0 }, { b: "=", r: 0, c: [{ cN: "value", c: [e], v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }, { b: /[^\s\/>]+/ }] }] }] };return { aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"], cI: !0, c: [{ cN: "doctype", b: "<!DOCTYPE", e: ">", r: 10, c: [{ b: "\\[", e: "\\]" }] }, { cN: "comment", b: "<!--", e: "-->", r: 10 }, { cN: "cdata", b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10 }, { cN: "tag", b: "<style(?=\\s|>|$)", e: ">", k: { title: "style" }, c: [c], starts: { e: "</style>", rE: !0, sL: "css" } }, { cN: "tag", b: "<script(?=\\s|>|$)", e: ">", k: { title: "script" }, c: [c], starts: { e: "</script>", rE: !0, sL: "javascript" } }, e, { cN: "pi", b: /<\?\w+/, e: /\?>/, r: 10 }, { cN: "tag", b: "</?", e: "/?>", c: [{ cN: "title", b: /[^ \/><\n\t]+/, r: 0 }, c] }] };
});hljs.registerLanguage("haml", function () {
  return { cI: !0, c: [{ cN: "doctype", b: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$", r: 10 }, { cN: "comment", b: "^\\s*(!=#|=#|-#|/).*$", r: 0 }, { b: "^\\s*(-|=|!=)(?!#)", starts: { e: "\\n", sL: "ruby" } }, { cN: "tag", b: "^\\s*%", c: [{ cN: "title", b: "\\w+" }, { cN: "value", b: "[#\\.]\\w+" }, { b: "{\\s*", e: "\\s*}", eE: !0, c: [{ b: ":\\w+\\s*=>", e: ",\\s+", rB: !0, eW: !0, c: [{ cN: "symbol", b: ":\\w+" }, { cN: "string", b: '"', e: '"' }, { cN: "string", b: "'", e: "'" }, { b: "\\w+", r: 0 }] }] }, { b: "\\(\\s*", e: "\\s*\\)", eE: !0, c: [{ b: "\\w+\\s*=", e: "\\s+", rB: !0, eW: !0, c: [{ cN: "attribute", b: "\\w+", r: 0 }, { cN: "string", b: '"', e: '"' }, { cN: "string", b: "'", e: "'" }, { b: "\\w+", r: 0 }] }] }] }, { cN: "bullet", b: "^\\s*[=~]\\s*", r: 0 }, { b: "#{", starts: { e: "}", sL: "ruby" } }] };
});hljs.registerLanguage("ruby", function (e) {
  var b = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
      r = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
      c = { cN: "yardoctag", b: "@[A-Za-z]+" },
      a = { cN: "value", b: "#<", e: ">" },
      s = { cN: "comment", v: [{ b: "#", e: "$", c: [c] }, { b: "^\\=begin", e: "^\\=end", c: [c], r: 10 }, { b: "^__END__", e: "\\n$" }] },
      n = { cN: "subst", b: "#\\{", e: "}", k: r },
      t = { cN: "string", c: [e.BE, n], v: [{ b: /'/, e: /'/ }, { b: /"/, e: /"/ }, { b: /`/, e: /`/ }, { b: "%[qQwWx]?\\(", e: "\\)" }, { b: "%[qQwWx]?\\[", e: "\\]" }, { b: "%[qQwWx]?{", e: "}" }, { b: "%[qQwWx]?<", e: ">" }, { b: "%[qQwWx]?/", e: "/" }, { b: "%[qQwWx]?%", e: "%" }, { b: "%[qQwWx]?-", e: "-" }, { b: "%[qQwWx]?\\|", e: "\\|" }, { b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/ }] },
      i = { cN: "params", b: "\\(", e: "\\)", k: r },
      d = [t, a, s, { cN: "class", bK: "class module", e: "$|;", i: /=/, c: [e.inherit(e.TM, { b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?" }), { cN: "inheritance", b: "<\\s*", c: [{ cN: "parent", b: "(" + e.IR + "::)?" + e.IR }] }, s] }, { cN: "function", bK: "def", e: " |$|;", r: 0, c: [e.inherit(e.TM, { b: b }), i, s] }, { cN: "constant", b: "(::)?(\\b[A-Z]\\w*(::)?)+", r: 0 }, { cN: "symbol", b: e.UIR + "(\\!|\\?)?:", r: 0 }, { cN: "symbol", b: ":", c: [t, { b: b }], r: 0 }, { cN: "number", b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b", r: 0 }, { cN: "variable", b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))" }, { b: "(" + e.RSR + ")\\s*", c: [a, s, { cN: "regexp", c: [e.BE, n], i: /\n/, v: [{ b: "/", e: "/[a-z]*" }, { b: "%r{", e: "}[a-z]*" }, { b: "%r\\(", e: "\\)[a-z]*" }, { b: "%r!", e: "![a-z]*" }, { b: "%r\\[", e: "\\][a-z]*" }] }], r: 0 }];n.c = d, i.c = d;var l = "[>?]>",
      u = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
      N = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
      o = [{ b: /^\s*=>/, cN: "status", starts: { e: "$", c: d } }, { cN: "prompt", b: "^(" + l + "|" + u + "|" + N + ")", starts: { e: "$", c: d } }];return { aliases: ["rb", "gemspec", "podspec", "thor", "irb"], k: r, c: [s].concat(o).concat(d) };
});hljs.registerLanguage("javascript", function (r) {
  return { aliases: ["js"], k: { keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class", literal: "true false null undefined NaN Infinity", built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document" }, c: [{ cN: "pi", r: 10, v: [{ b: /^\s*('|")use strict('|")/ }, { b: /^\s*('|")use asm('|")/ }] }, r.ASM, r.QSM, r.CLCM, r.CBCM, r.CNM, { b: "(" + r.RSR + "|\\b(case|return|throw)\\b)\\s*", k: "return throw case", c: [r.CLCM, r.CBCM, r.RM, { b: /</, e: />;/, r: 0, sL: "xml" }], r: 0 }, { cN: "function", bK: "function", e: /\{/, eE: !0, c: [r.inherit(r.TM, { b: /[A-Za-z$_][0-9A-Za-z$_]*/ }), { cN: "params", b: /\(/, e: /\)/, c: [r.CLCM, r.CBCM], i: /["'\(]/ }], i: /\[|%/ }, { b: /\$[(.]/ }, { b: "\\." + r.IR, r: 0 }] };
});hljs.registerLanguage("erb", function () {
  return { sL: "xml", subLanguageMode: "continuous", c: [{ cN: "comment", b: "<%#", e: "%>" }, { b: "<%[%=-]?", e: "[%-]?%>", sL: "ruby", eB: !0, eE: !0 }] };
});hljs.registerLanguage("scss", function (e) {
  {
    var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
        i = { cN: "variable", b: "(\\$" + t + ")\\b" },
        r = { cN: "function", b: t + "\\(", rB: !0, eE: !0, e: "\\(" },
        o = { cN: "hexcolor", b: "#[0-9A-Fa-f]+" };({ cN: "attribute", b: "[A-Z\\_\\.\\-]+", e: ":", eE: !0, i: "[^\\s]", starts: { cN: "value", eW: !0, eE: !0, c: [r, o, e.CSSNM, e.QSM, e.ASM, e.CBCM, { cN: "important", b: "!important" }] } });
  }return { cI: !0, i: "[=/|']", c: [e.CLCM, e.CBCM, r, { cN: "id", b: "\\#[A-Za-z0-9_-]+", r: 0 }, { cN: "class", b: "\\.[A-Za-z0-9_-]+", r: 0 }, { cN: "attr_selector", b: "\\[", e: "\\]", i: "$" }, { cN: "tag", b: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b", r: 0 }, { cN: "pseudo", b: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)" }, { cN: "pseudo", b: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)" }, i, { cN: "attribute", b: "\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b", i: "[^\\s]" }, { cN: "value", b: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b" }, { cN: "value", b: ":", e: ";", c: [r, i, o, e.CSSNM, e.QSM, e.ASM, { cN: "important", b: "!important" }] }, { cN: "at_rule", b: "@", e: "[{;]", k: "mixin include extend for if else each while charset import debug media page content font-face namespace warn", c: [r, i, e.QSM, e.ASM, o, e.CSSNM, { cN: "preprocessor", b: "\\s[A-Za-z0-9_.-]+", r: 0 }] }] };
});hljs.registerLanguage("css", function (e) {
  var c = "[a-zA-Z-][a-zA-Z0-9_-]*",
      a = { cN: "function", b: c + "\\(", rB: !0, eE: !0, e: "\\(" };return { cI: !0, i: "[=/|']", c: [e.CBCM, { cN: "id", b: "\\#[A-Za-z0-9_-]+" }, { cN: "class", b: "\\.[A-Za-z0-9_-]+", r: 0 }, { cN: "attr_selector", b: "\\[", e: "\\]", i: "$" }, { cN: "pseudo", b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+" }, { cN: "at_rule", b: "@(font-face|page)", l: "[a-z-]+", k: "font-face page" }, { cN: "at_rule", b: "@", e: "[{;]", c: [{ cN: "keyword", b: /\S+/ }, { b: /\s/, eW: !0, eE: !0, r: 0, c: [a, e.ASM, e.QSM, e.CSSNM] }] }, { cN: "tag", b: c, r: 0 }, { cN: "rules", b: "{", e: "}", i: "[^\\s]", r: 0, c: [e.CBCM, { cN: "rule", b: "[^\\s]", rB: !0, e: ";", eW: !0, c: [{ cN: "attribute", b: "[A-Z\\_\\.\\-]+", e: ":", eE: !0, i: "[^\\s]", starts: { cN: "value", eW: !0, eE: !0, c: [a, e.CSSNM, e.QSM, e.ASM, e.CBCM, { cN: "hexcolor", b: "#[0-9A-Fa-f]+" }, { cN: "important", b: "!important" }] } }] }] }] };
});hljs.registerLanguage("handlebars", function () {
  var e = "each in with if else unless bindattr action collection debugger log outlet template unbound view yield";return { aliases: ["hbs", "html.hbs", "html.handlebars"], cI: !0, sL: "xml", subLanguageMode: "continuous", c: [{ cN: "expression", b: "{{", e: "}}", c: [{ cN: "begin-block", b: "#[a-zA-Z- .]+", k: e }, { cN: "string", b: '"', e: '"' }, { cN: "end-block", b: "\\/[a-zA-Z- .]+", k: e }, { cN: "variable", b: "[a-zA-Z-.]+", k: e }] }] };
});

},{"babel-runtime/core-js/object/create":19,"babel-runtime/core-js/object/keys":22}],16:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":27}],17:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":28}],18:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":29}],19:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":30}],20:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-properties"), __esModule: true };
},{"core-js/library/fn/object/define-properties":31}],21:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":32}],22:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":33}],23:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":34}],24:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":35}],25:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":36}],26:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],27:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/$').core.Array.from;
},{"../../modules/$":52,"../../modules/es6.array.from":66,"../../modules/es6.string.iterator":72}],28:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
require('../modules/core.iter-helpers');
module.exports = require('../modules/$').core.getIterator;
},{"../modules/$":52,"../modules/core.iter-helpers":65,"../modules/es6.string.iterator":72,"../modules/web.dom.iterable":74}],29:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$').core.Object.assign;
},{"../../modules/$":52,"../../modules/es6.object.assign":68}],30:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function create(P, D){
  return $.create(P, D);
};
},{"../../modules/$":52}],31:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperties(T, D){
  return $.setDescs(T, D);
};
},{"../../modules/$":52}],32:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":52}],33:[function(require,module,exports){
require('../../modules/es6.object.statics-accept-primitives');
module.exports = require('../../modules/$').core.Object.keys;
},{"../../modules/$":52,"../../modules/es6.object.statics-accept-primitives":69}],34:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/$').core.Promise;
},{"../modules/$":52,"../modules/es6.object.to-string":70,"../modules/es6.promise":71,"../modules/es6.string.iterator":72,"../modules/web.dom.iterable":74}],35:[function(require,module,exports){
require('../../modules/es6.symbol');
module.exports = require('../../modules/$').core.Symbol;
},{"../../modules/$":52,"../../modules/es6.symbol":73}],36:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/$.wks')('iterator');
},{"../../modules/$.wks":64,"../../modules/es6.string.iterator":72,"../../modules/web.dom.iterable":74}],37:[function(require,module,exports){
var $ = require('./$');
function assert(condition, msg1, msg2){
  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
}
assert.def = $.assertDefined;
assert.fn = function(it){
  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
  return it;
};
assert.obj = function(it){
  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
assert.inst = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
module.exports = assert;
},{"./$":52}],38:[function(require,module,exports){
var $        = require('./$')
  , enumKeys = require('./$.enum-keys');
// 19.1.2.1 Object.assign(target, source, ...)
/* eslint-disable no-unused-vars */
module.exports = Object.assign || function assign(target, source){
/* eslint-enable no-unused-vars */
  var T = Object($.assertDefined(target))
    , l = arguments.length
    , i = 1;
  while(l > i){
    var S      = $.ES5Object(arguments[i++])
      , keys   = enumKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)T[key = keys[j++]] = S[key];
  }
  return T;
};
},{"./$":52,"./$.enum-keys":43}],39:[function(require,module,exports){
var $        = require('./$')
  , TAG      = require('./$.wks')('toStringTag')
  , toString = {}.toString;
function cof(it){
  return toString.call(it).slice(8, -1);
}
cof.classof = function(it){
  var O, T;
  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
};
cof.set = function(it, tag, stat){
  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
};
module.exports = cof;
},{"./$":52,"./$.wks":64}],40:[function(require,module,exports){
// Optional / simple context binding
var assertFunction = require('./$.assert').fn;
module.exports = function(fn, that, length){
  assertFunction(fn);
  if(~length && that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  } return function(/* ...args */){
      return fn.apply(that, arguments);
    };
};
},{"./$.assert":37}],41:[function(require,module,exports){
var $          = require('./$')
  , global     = $.g
  , core       = $.core
  , isFunction = $.isFunction;
function ctx(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
}
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
function $def(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , isProto  = type & $def.P
    , target   = isGlobal ? global : type & $def.S
        ? global[name] : (global[name] || {}).prototype
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    if(isGlobal && !isFunction(target[key]))exp = source[key];
    // bind timers to global for call from export context
    else if(type & $def.B && own)exp = ctx(out, global);
    // wrap global constructors for prevent change them in library
    else if(type & $def.W && target[key] == out)!function(C){
      exp = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      exp.prototype = C.prototype;
    }(out);
    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
    // export
    exports[key] = exp;
    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
  }
}
module.exports = $def;
},{"./$":52}],42:[function(require,module,exports){
var $        = require('./$')
  , document = $.g.document
  , isObject = $.isObject
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$":52}],43:[function(require,module,exports){
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getDesc    = $.getDesc
    , getSymbols = $.getSymbols;
  if(getSymbols)$.each.call(getSymbols(it), function(key){
    if(getDesc(it, key).enumerable)keys.push(key);
  });
  return keys;
};
},{"./$":52}],44:[function(require,module,exports){
var ctx  = require('./$.ctx')
  , get  = require('./$.iter').get
  , call = require('./$.iter-call');
module.exports = function(iterable, entries, fn, that){
  var iterator = get(iterable)
    , f        = ctx(fn, that, entries ? 2 : 1)
    , step;
  while(!(step = iterator.next()).done){
    if(call(iterator, f, step.value, entries) === false){
      return call.close(iterator);
    }
  }
};
},{"./$.ctx":40,"./$.iter":51,"./$.iter-call":48}],45:[function(require,module,exports){
module.exports = function($){
  $.FW   = false;
  $.path = $.core;
  return $;
};
},{}],46:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var $ = require('./$')
  , toString = {}.toString
  , getNames = $.getNames;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

function getWindowNames(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
}

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames($.toObject(it));
};
},{"./$":52}],47:[function(require,module,exports){
// Fast apply
// http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
  } return              fn.apply(that, args);
};
},{}],48:[function(require,module,exports){
var assertObject = require('./$.assert').obj;
function close(iterator){
  var ret = iterator['return'];
  if(ret !== undefined)assertObject(ret.call(iterator));
}
function call(iterator, fn, value, entries){
  try {
    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
  } catch(e){
    close(iterator);
    throw e;
  }
}
call.close = close;
module.exports = call;
},{"./$.assert":37}],49:[function(require,module,exports){
var $def            = require('./$.def')
  , $redef          = require('./$.redef')
  , $               = require('./$')
  , cof             = require('./$.cof')
  , $iter           = require('./$.iter')
  , SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , FF_ITERATOR     = '@@iterator'
  , KEYS            = 'keys'
  , VALUES          = 'values'
  , Iterators       = $iter.Iterators;
module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
  $iter.create(Constructor, NAME, next);
  function createMethod(kind){
    function $$(that){
      return new Constructor(that, kind);
    }
    switch(kind){
      case KEYS: return function keys(){ return $$(this); };
      case VALUES: return function values(){ return $$(this); };
    } return function entries(){ return $$(this); };
  }
  var TAG      = NAME + ' Iterator'
    , proto    = Base.prototype
    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , _default = _native || createMethod(DEFAULT)
    , methods, key;
  // Fix native
  if(_native){
    var IteratorPrototype = $.getProto(_default.call(new Base));
    // Set @@toStringTag to native iterators
    cof.set(IteratorPrototype, TAG, true);
    // FF fix
    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
  }
  // Define iterator
  if($.FW || FORCE)$iter.set(proto, _default);
  // Plug for library
  Iterators[NAME] = _default;
  Iterators[TAG]  = $.that;
  if(DEFAULT){
    methods = {
      keys:    IS_SET            ? _default : createMethod(KEYS),
      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
      entries: DEFAULT != VALUES ? _default : createMethod('entries')
    };
    if(FORCE)for(key in methods){
      if(!(key in proto))$redef(proto, key, methods[key]);
    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
  }
};
},{"./$":52,"./$.cof":39,"./$.def":41,"./$.iter":51,"./$.redef":55,"./$.wks":64}],50:[function(require,module,exports){
var SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , SAFE_CLOSING    = false;
try {
  var riter = [7][SYMBOL_ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }
module.exports = function(exec){
  if(!SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[SYMBOL_ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[SYMBOL_ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":64}],51:[function(require,module,exports){
'use strict';
var $                 = require('./$')
  , cof               = require('./$.cof')
  , classof           = cof.classof
  , assert            = require('./$.assert')
  , assertObject      = assert.obj
  , SYMBOL_ITERATOR   = require('./$.wks')('iterator')
  , FF_ITERATOR       = '@@iterator'
  , Iterators         = require('./$.shared')('iterators')
  , IteratorPrototype = {};
// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
setIterator(IteratorPrototype, $.that);
function setIterator(O, value){
  $.hide(O, SYMBOL_ITERATOR, value);
  // Add iterator for FF iterator protocol
  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
}

module.exports = {
  // Safari has buggy iterators w/o `next`
  BUGGY: 'keys' in [] && !('next' in [].keys()),
  Iterators: Iterators,
  step: function(done, value){
    return {value: value, done: !!done};
  },
  is: function(it){
    var O      = Object(it)
      , Symbol = $.g.Symbol;
    return (Symbol && Symbol.iterator || FF_ITERATOR) in O
      || SYMBOL_ITERATOR in O
      || $.has(Iterators, classof(O));
  },
  get: function(it){
    var Symbol = $.g.Symbol
      , getIter;
    if(it != undefined){
      getIter = it[Symbol && Symbol.iterator || FF_ITERATOR]
        || it[SYMBOL_ITERATOR]
        || Iterators[classof(it)];
    }
    assert($.isFunction(getIter), it, ' is not iterable!');
    return assertObject(getIter.call(it));
  },
  set: setIterator,
  create: function(Constructor, NAME, next, proto){
    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
    cof.set(Constructor, NAME + ' Iterator');
  }
};
},{"./$":52,"./$.assert":37,"./$.cof":39,"./$.shared":58,"./$.wks":64}],52:[function(require,module,exports){
'use strict';
var global = typeof self != 'undefined' ? self : Function('return this')()
  , core   = {}
  , defineProperty = Object.defineProperty
  , hasOwnProperty = {}.hasOwnProperty
  , ceil  = Math.ceil
  , floor = Math.floor
  , max   = Math.max
  , min   = Math.min;
// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
var DESC = !!function(){
  try {
    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
  } catch(e){ /* empty */ }
}();
var hide = createDefiner(1);
// 7.1.4 ToInteger
function toInteger(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
}
function desc(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
}
function simpleSet(object, key, value){
  object[key] = value;
  return object;
}
function createDefiner(bitmap){
  return DESC ? function(object, key, value){
    return $.setDesc(object, key, desc(bitmap, value));
  } : simpleSet;
}

function isObject(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
}
function isFunction(it){
  return typeof it == 'function';
}
function assertDefined(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
}

var $ = module.exports = require('./$.fw')({
  g: global,
  core: core,
  html: global.document && document.documentElement,
  // http://jsperf.com/core-js-isobject
  isObject:   isObject,
  isFunction: isFunction,
  that: function(){
    return this;
  },
  // 7.1.4 ToInteger
  toInteger: toInteger,
  // 7.1.15 ToLength
  toLength: function(it){
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  },
  toIndex: function(index, length){
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  },
  has: function(it, key){
    return hasOwnProperty.call(it, key);
  },
  create:     Object.create,
  getProto:   Object.getPrototypeOf,
  DESC:       DESC,
  desc:       desc,
  getDesc:    Object.getOwnPropertyDescriptor,
  setDesc:    defineProperty,
  setDescs:   Object.defineProperties,
  getKeys:    Object.keys,
  getNames:   Object.getOwnPropertyNames,
  getSymbols: Object.getOwnPropertySymbols,
  assertDefined: assertDefined,
  // Dummy, fix for not array-like ES3 string in es5 module
  ES5Object: Object,
  toObject: function(it){
    return $.ES5Object(assertDefined(it));
  },
  hide: hide,
  def: createDefiner(0),
  set: global.Symbol ? simpleSet : hide,
  each: [].forEach
});
/* eslint-disable no-undef */
if(typeof __e != 'undefined')__e = core;
if(typeof __g != 'undefined')__g = global;
},{"./$.fw":45}],53:[function(require,module,exports){
var $ = require('./$');
module.exports = function(object, el){
  var O      = $.toObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":52}],54:[function(require,module,exports){
var $redef = require('./$.redef');
module.exports = function(target, src){
  for(var key in src)$redef(target, key, src[key]);
  return target;
};
},{"./$.redef":55}],55:[function(require,module,exports){
module.exports = require('./$').hide;
},{"./$":52}],56:[function(require,module,exports){
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],57:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var $      = require('./$')
  , assert = require('./$.assert');
function check(O, proto){
  assert.obj(O);
  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
}
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
    ? function(buggy, set){
        try {
          set = require('./$.ctx')(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
          set({}, []);
        } catch(e){ buggy = true; }
        return function setPrototypeOf(O, proto){
          check(O, proto);
          if(buggy)O.__proto__ = proto;
          else set(O, proto);
          return O;
        };
      }()
    : undefined),
  check: check
};
},{"./$":52,"./$.assert":37,"./$.ctx":40}],58:[function(require,module,exports){
var $      = require('./$')
  , SHARED = '__core-js_shared__'
  , store  = $.g[SHARED] || ($.g[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$":52}],59:[function(require,module,exports){
var $       = require('./$')
  , SPECIES = require('./$.wks')('species');
module.exports = function(C){
  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
    configurable: true,
    get: $.that
  });
};
},{"./$":52,"./$.wks":64}],60:[function(require,module,exports){
// true  -> String#at
// false -> String#codePointAt
var $ = require('./$');
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String($.assertDefined(that))
      , i = $.toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l
      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$":52}],61:[function(require,module,exports){
'use strict';
var $      = require('./$')
  , ctx    = require('./$.ctx')
  , cof    = require('./$.cof')
  , invoke = require('./$.invoke')
  , cel    = require('./$.dom-create')
  , global             = $.g
  , isFunction         = $.isFunction
  , html               = $.html
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
function run(){
  var id = +this;
  if($.has(queue, id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
}
function listner(event){
  run.call(event.data);
}
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!isFunction(setTask) || !isFunction(clearTask)){
  setTask = function(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(isFunction(fn) ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(cof(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Modern browsers, skip implementation for WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is object
  } else if(global.addEventListener && isFunction(global.postMessage) && !global.importScripts){
    defer = function(id){
      global.postMessage(id, '*');
    };
    global.addEventListener('message', listner, false);
  // WebWorkers
  } else if(isFunction(MessageChannel)){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$":52,"./$.cof":39,"./$.ctx":40,"./$.dom-create":42,"./$.invoke":47}],62:[function(require,module,exports){
var sid = 0;
function uid(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
}
uid.safe = require('./$').g.Symbol || uid;
module.exports = uid;
},{"./$":52}],63:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],64:[function(require,module,exports){
var global = require('./$').g
  , store  = require('./$.shared')('wks');
module.exports = function(name){
  return store[name] || (store[name] =
    global.Symbol && global.Symbol[name] || require('./$.uid').safe('Symbol.' + name));
};
},{"./$":52,"./$.shared":58,"./$.uid":62}],65:[function(require,module,exports){
var core  = require('./$').core
  , $iter = require('./$.iter');
core.isIterable  = $iter.is;
core.getIterator = $iter.get;
},{"./$":52,"./$.iter":51}],66:[function(require,module,exports){
var $     = require('./$')
  , ctx   = require('./$.ctx')
  , $def  = require('./$.def')
  , $iter = require('./$.iter')
  , call  = require('./$.iter-call');
$def($def.S + $def.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = Object($.assertDefined(arrayLike))
      , mapfn   = arguments[1]
      , mapping = mapfn !== undefined
      , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
      , index   = 0
      , length, result, step, iterator;
    if($iter.is(O)){
      iterator = $iter.get(O);
      // strange IE quirks mode bug -> use typeof instead of isFunction
      result   = new (typeof this == 'function' ? this : Array);
      for(; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
      }
    } else {
      // strange IE quirks mode bug -> use typeof instead of isFunction
      result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
      for(; length > index; index++){
        result[index] = mapping ? f(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});
},{"./$":52,"./$.ctx":40,"./$.def":41,"./$.iter":51,"./$.iter-call":48,"./$.iter-detect":50}],67:[function(require,module,exports){
var $          = require('./$')
  , setUnscope = require('./$.unscope')
  , ITER       = require('./$.uid').safe('iter')
  , $iter      = require('./$.iter')
  , step       = $iter.step
  , Iterators  = $iter.Iterators;

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , kind  = iter.k
    , index = iter.i++;
  if(!O || index >= O.length){
    iter.o = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

setUnscope('keys');
setUnscope('values');
setUnscope('entries');
},{"./$":52,"./$.iter":51,"./$.iter-define":49,"./$.uid":62,"./$.unscope":63}],68:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $def = require('./$.def');
$def($def.S, 'Object', {assign: require('./$.assign')});
},{"./$.assign":38,"./$.def":41}],69:[function(require,module,exports){
var $        = require('./$')
  , $def     = require('./$.def')
  , isObject = $.isObject
  , toObject = $.toObject;
$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
, function(KEY, ID){
  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
    , forced = 0
    , method = {};
  method[KEY] = ID == 0 ? function freeze(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 1 ? function seal(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 2 ? function preventExtensions(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 3 ? function isFrozen(it){
    return isObject(it) ? fn(it) : true;
  } : ID == 4 ? function isSealed(it){
    return isObject(it) ? fn(it) : true;
  } : ID == 5 ? function isExtensible(it){
    return isObject(it) ? fn(it) : false;
  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
    return fn(toObject(it), key);
  } : ID == 7 ? function getPrototypeOf(it){
    return fn(Object($.assertDefined(it)));
  } : ID == 8 ? function keys(it){
    return fn(toObject(it));
  } : require('./$.get-names').get;
  try {
    fn('z');
  } catch(e){
    forced = 1;
  }
  $def($def.S + $def.F * forced, 'Object', method);
});
},{"./$":52,"./$.def":41,"./$.get-names":46}],70:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , tmp = {};
tmp[require('./$.wks')('toStringTag')] = 'z';
if(require('./$').FW && cof(tmp) != 'z'){
  require('./$.redef')(Object.prototype, 'toString', function toString(){
    return '[object ' + cof.classof(this) + ']';
  }, true);
}
},{"./$":52,"./$.cof":39,"./$.redef":55,"./$.wks":64}],71:[function(require,module,exports){
'use strict';
var $        = require('./$')
  , ctx      = require('./$.ctx')
  , cof      = require('./$.cof')
  , $def     = require('./$.def')
  , assert   = require('./$.assert')
  , forOf    = require('./$.for-of')
  , setProto = require('./$.set-proto').set
  , same     = require('./$.same')
  , species  = require('./$.species')
  , SPECIES  = require('./$.wks')('species')
  , RECORD   = require('./$.uid').safe('record')
  , PROMISE  = 'Promise'
  , global   = $.g
  , process  = global.process
  , isNode   = cof(process) == 'process'
  , asap     = process && process.nextTick || require('./$.task').set
  , P        = global[PROMISE]
  , isFunction     = $.isFunction
  , isObject       = $.isObject
  , assertFunction = assert.fn
  , assertObject   = assert.obj
  , Wrapper;

function testResolve(sub){
  var test = new P(function(){});
  if(sub)test.constructor = Object;
  return P.resolve(test) === test;
}

var useNative = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = isFunction(P) && isFunction(P.resolve) && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && $.DESC){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
function isPromise(it){
  return isObject(it) && (useNative ? cof.classof(it) == 'Promise' : RECORD in it);
}
function sameConstructor(a, b){
  // library wrapper special case
  if(!$.FW && a === P && b === Wrapper)return true;
  return same(a, b);
}
function getConstructor(C){
  var S = assertObject(C)[SPECIES];
  return S != undefined ? S : C;
}
function isThenable(it){
  var then;
  if(isObject(it))then = it.then;
  return isFunction(then) ? then : false;
}
function notify(record){
  var chain = record.c;
  // strange IE + webpack dev server bug - use .call(global)
  if(chain.length)asap.call(global, function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    function run(react){
      var cb = ok ? react.ok : react.fail
        , ret, then;
      try {
        if(cb){
          if(!ok)record.h = true;
          ret = cb === true ? value : cb(value);
          if(ret === react.P){
            react.rej(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(ret)){
            then.call(ret, react.res, react.rej);
          } else react.res(ret);
        } else react.rej(value);
      } catch(err){
        react.rej(err);
      }
    }
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
  });
}
function isUnhandled(promise){
  var record = promise[RECORD]
    , chain  = record.a || record.c
    , i      = 0
    , react;
  if(record.h)return false;
  while(chain.length > i){
    react = chain[i++];
    if(react.fail || !isUnhandled(react.P))return false;
  } return true;
}
function $reject(value){
  var record = this
    , promise;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  setTimeout(function(){
    // strange IE + webpack dev server bug - use .call(global)
    asap.call(global, function(){
      if(isUnhandled(promise = record.p)){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(global.console && console.error){
          console.error('Unhandled promise rejection', value);
        }
      }
      record.a = undefined;
    });
  }, 1);
  notify(record);
}
function $resolve(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(then = isThenable(value)){
      // strange IE + webpack dev server bug - use .call(global)
      asap.call(global, function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
}

// constructor polyfill
if(!useNative){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    assertFunction(executor);
    var record = {
      p: assert.inst(this, P, PROMISE),       // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false                                // <- handled rejection
    };
    $.hide(this, RECORD, record);
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.mix')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var S = assertObject(assertObject(this).constructor)[SPECIES];
      var react = {
        ok:   isFunction(onFulfilled) ? onFulfilled : true,
        fail: isFunction(onRejected)  ? onRejected  : false
      };
      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
        react.res = assertFunction(res);
        react.rej = assertFunction(rej);
      });
      var record = this[RECORD];
      record.c.push(react);
      if(record.a)record.a.push(react);
      if(record.s)notify(record);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

// export
$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
cof.set(P, PROMISE);
species(P);
species(Wrapper = $.core[PROMISE]);

// statics
$def($def.S + $def.F * !useNative, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    return new (getConstructor(this))(function(res, rej){ rej(r); });
  }
});
$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    return isPromise(x) && sameConstructor(x.constructor, this)
      ? x : new this(function(res){ res(x); });
  }
});
$def($def.S + $def.F * !(useNative && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C      = getConstructor(this)
      , values = [];
    return new C(function(res, rej){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        C.resolve(promise).then(function(value){
          results[index] = value;
          --remaining || res(results);
        }, rej);
      });
      else res(results);
    });
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C = getConstructor(this);
    return new C(function(res, rej){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(res, rej);
      });
    });
  }
});
},{"./$":52,"./$.assert":37,"./$.cof":39,"./$.ctx":40,"./$.def":41,"./$.for-of":44,"./$.iter-detect":50,"./$.mix":54,"./$.same":56,"./$.set-proto":57,"./$.species":59,"./$.task":61,"./$.uid":62,"./$.wks":64}],72:[function(require,module,exports){
var set   = require('./$').set
  , $at   = require('./$.string-at')(true)
  , ITER  = require('./$.uid').safe('iter')
  , $iter = require('./$.iter')
  , step  = $iter.step;

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  set(this, ITER, {o: String(iterated), i: 0});
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , index = iter.i
    , point;
  if(index >= O.length)return step(1);
  point = $at(O, index);
  iter.i += point.length;
  return step(0, point);
});
},{"./$":52,"./$.iter":51,"./$.iter-define":49,"./$.string-at":60,"./$.uid":62}],73:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $        = require('./$')
  , setTag   = require('./$.cof').set
  , uid      = require('./$.uid')
  , shared   = require('./$.shared')
  , $def     = require('./$.def')
  , $redef   = require('./$.redef')
  , keyOf    = require('./$.keyof')
  , enumKeys = require('./$.enum-keys')
  , assertObject = require('./$.assert').obj
  , ObjectProto = Object.prototype
  , DESC     = $.DESC
  , has      = $.has
  , $create  = $.create
  , getDesc  = $.getDesc
  , setDesc  = $.setDesc
  , desc     = $.desc
  , $names   = require('./$.get-names')
  , getNames = $names.get
  , toObject = $.toObject
  , $Symbol  = $.g.Symbol
  , setter   = false
  , TAG      = uid('tag')
  , HIDDEN   = uid('hidden')
  , _propertyIsEnumerable = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols = shared('symbols')
  , useNative = $.isFunction($Symbol);

var setSymbolDesc = DESC ? function(){ // fallback for old Android
  try {
    return $create(setDesc({}, HIDDEN, {
      get: function(){
        return setDesc(this, HIDDEN, {value: false})[HIDDEN];
      }
    }))[HIDDEN] || setDesc;
  } catch(e){
    return function(it, key, D){
      var protoDesc = getDesc(ObjectProto, key);
      if(protoDesc)delete ObjectProto[key];
      setDesc(it, key, D);
      if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
    };
  }
}() : setDesc;

function wrap(tag){
  var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
  DESC && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, desc(1, value));
    }
  });
  return sym;
}

function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = $create(D, {enumerable: desc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
}
function defineProperties(it, P){
  assertObject(it);
  var keys = enumKeys(P = toObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)defineProperty(it, key = keys[i++], P[key]);
  return it;
}
function create(it, P){
  return P === undefined ? $create(it) : defineProperties($create(it), P);
}
function propertyIsEnumerable(key){
  var E = _propertyIsEnumerable.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
}
function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
}
function getOwnPropertyNames(it){
  var names  = getNames(toObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
}
function getOwnPropertySymbols(it){
  var names  = getNames(toObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
}

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments[0]));
  };
  $redef($Symbol.prototype, 'toString', function(){
    return this[TAG];
  });

  $.create     = create;
  $.setDesc    = defineProperty;
  $.getDesc    = getOwnPropertyDescriptor;
  $.setDescs   = defineProperties;
  $.getNames   = $names.get = getOwnPropertyNames;
  $.getSymbols = getOwnPropertySymbols;

  if($.DESC && $.FW)$redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
    'species,split,toPrimitive,toStringTag,unscopables'
  ).split(','), function(it){
    var sym = require('./$.wks')(it);
    symbolStatics[it] = useNative ? sym : wrap(sym);
  }
);

setter = true;

$def($def.G + $def.W, {Symbol: $Symbol});

$def($def.S, 'Symbol', symbolStatics);

$def($def.S + $def.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: getOwnPropertySymbols
});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setTag($.g.JSON, 'JSON', true);
},{"./$":52,"./$.assert":37,"./$.cof":39,"./$.def":41,"./$.enum-keys":43,"./$.get-names":46,"./$.keyof":53,"./$.redef":55,"./$.shared":58,"./$.uid":62,"./$.wks":64}],74:[function(require,module,exports){
require('./es6.array.iterator');
var $           = require('./$')
  , Iterators   = require('./$.iter').Iterators
  , ITERATOR    = require('./$.wks')('iterator')
  , ArrayValues = Iterators.Array
  , NL          = $.g.NodeList
  , HTC         = $.g.HTMLCollection
  , NLProto     = NL && NL.prototype
  , HTCProto    = HTC && HTC.prototype;
if($.FW){
  if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
  if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
}
Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;
},{"./$":52,"./$.iter":51,"./$.wks":64,"./es6.array.iterator":67}],75:[function(require,module,exports){
(function (global){
// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  delete g.regeneratorRuntime;
}

module.exports = { "default": module.exports, __esModule: true };

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./runtime":76}],76:[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

"use strict";

var _Symbol = require("babel-runtime/core-js/symbol")["default"];

var _Symbol$iterator = require("babel-runtime/core-js/symbol/iterator")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Promise = require("babel-runtime/core-js/promise")["default"];

!(function (global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol = typeof _Symbol === "function" && _Symbol$iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = _Object$create((outerFn || Generator).prototype);

    generator._invoke = makeInvokeMethod(innerFn, self || null, new Context(tryLocsList || []));

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    genFun.__proto__ = GeneratorFunctionPrototype;
    genFun.prototype = _Object$create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function (arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    // This invoke function is written in a style that assumes some
    // calling function (or Promise) will handle exceptions.
    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument ? _Promise.resolve(value.arg).then(invokeNext, invokeThrow) : _Promise.resolve(value).then(function (unwrapped) {
        // When a yielded Promise is resolved, its final value becomes
        // the .value of the Promise<{value,done}> result for the
        // current iteration. If the Promise is rejected, however, the
        // result for this iteration will be rejected with the same
        // reason. Note that rejections of yielded Promises are not
        // thrown back into the generator function, as is the case
        // when an awaited Promise is rejected. This difference in
        // behavior between yield and await is important, because it
        // allows the consumer to decide what to do with the yielded
        // rejection (swallow it and continue, manually .throw it back
        // into the generator, abandon iteration, whatever). With
        // await, by contrast, there is no opportunity to examine the
        // rejection reason outside the generator function, so the
        // only option is to throw it from the await expression, and
        // let the generator function handle the exception.
        result.value = unwrapped;
        return result;
      });
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      var enqueueResult =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(function () {
        return invoke(method, arg);
      }) : new _Promise(function (resolve) {
        resolve(invoke(method, arg));
      });

      // Avoid propagating enqueueResult failures to Promises returned by
      // later invocations of the iterator.
      previousPromise = enqueueResult["catch"](function (ignored) {});

      return enqueueResult;
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }
        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
// Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":77,"babel-runtime/core-js/object/create":19,"babel-runtime/core-js/promise":23,"babel-runtime/core-js/symbol":24,"babel-runtime/core-js/symbol/iterator":25}],77:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[8]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYXR0ZXJuX2xpYnJhcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfQXJyYXkkZnJvbSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbVwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfZ2V0SXRlcmF0b3IgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgJCA9IHt9O1xuXG4vLyAgICAgICAgX19fICAgICAgICAgICAgICAgICAgICAgX19fICAgICAgICAgICAgICAgICBfX18gICAgICAgICAgX19fXG4vLyAgICAgICAvICAvXFwgICAgICAgIF9fXyAgICAgICAgLyAgL1xcICAgICAgICBfX18gICAgLyAgL1xcICAgICAgICAvICAvXFxcbi8vICAgICAgLyAgLzo6XFwgICAgICAvX18vXFwgICAgICAvICAvOjpcXCAgICAgIC8gIC9cXCAgLyAgLzo6XFwgICAgICAvICAvOjpcXFxuLy8gICAgIC8gIC86L1xcOlxcICAgICBcXCAgXFw6XFwgICAgLyAgLzovXFw6XFwgICAgLyAgLzovIC8gIC86L1xcOlxcICAgIC8gIC86L1xcOlxcXG4vLyAgICAvICAvOi9+Lzo6XFwgICAgIFxcICBcXDpcXCAgLyAgLzovfi86OlxcICAvICAvOi8gLyAgLzovfi86OlxcICAvICAvOi9+LzovXG4vLyAgIC9fXy86LyAvOi9cXDpcXF9fXyAgXFxfX1xcOlxcL19fLzovIC86L1xcOlxcLyAgLzo6XFwvX18vOi8gLzovXFw6XFwvX18vOi8gLzovX19fXG4vLyAgIFxcICBcXDpcXC86L19fXFwvX18vXFwgfCAgfDp8XFwgIFxcOlxcLzovX19cXC9fXy86L1xcOlxcICBcXDpcXC86L19fXFwvXFwgIFxcOlxcLzo6Ojo6L1xuLy8gICAgXFwgIFxcOjovICAgIFxcICBcXDpcXHwgIHw6fCBcXCAgXFw6Oi8gICAgXFxfX1xcLyAgXFw6XFwgIFxcOjovICAgICAgXFwgIFxcOjovfn5+flxuLy8gICAgIFxcICBcXDpcXCAgICAgXFwgIFxcOlxcX198OnwgIFxcICBcXDpcXCAgICAgICAgIFxcICBcXDpcXCAgXFw6XFwgICAgICAgXFwgIFxcOlxcXG4vLyAgICAgIFxcICBcXDpcXCAgICAgXFxfX1xcOjo6Oi8gICAgXFwgIFxcOlxcICAgICAgICAgXFxfX1xcL1xcICBcXDpcXCAgICAgICBcXCAgXFw6XFxcbi8vICAgICAgIFxcX19cXC8gICAgICAgICB+fn5+ICAgICAgXFxfX1xcLyAgICAgICAgICAgICAgIFxcX19cXC8gICAgICAgIFxcX19cXC9cblxuLy8qXG4vLyBUaGUgbmFtZSBvZiBjbGFzc2VzIHJlbGV2YW50IHRvIGBBdmF0YXJgLlxuLy8gQG9iamVjdFxuXG52YXIgY2xhc3NlcyA9IHtcbiAgcm9vdDogXCJhdmF0YXJcIixcbiAgaW1hZ2U6IFwiYXZhdGFyX19pbWFnZVwiXG59O1xuXG4vLypcbi8vIFRoZSBuYW1lIG9mIHN0YXRlcyByZWxldmFudCB0byBgQXZhdGFyYC5cbi8vIEBvYmplY3RcblxudmFyIHN0YXRlcyA9IHtcbiAgaW1hZ2U6IHsgdmlzaWJsZTogY2xhc3Nlcy5pbWFnZSArIFwiLS1pcy12aXNpYmxlXCIgfVxufTtcblxuLy8qXG4vLyBUaGUgbmFtZSBvZiBhdHRyaWJ1dGVzIHJlbGV2YW50IHRvIGBBdmF0YXJgLlxuLy8gQG9iamVjdFxuXG52YXIgYXR0cnMgPSB7XG4gIHByb2ZpbGVfbmFtZTogXCJkYXRhLXByb2ZpbGUtbmFtZVwiLFxuICBzZXJ2aWNlOiBcImRhdGEtc2VydmljZVwiXG59O1xuXG4vLypcbi8vIFRoZSBtaW5pbXVtIHRpbWUsIGluIG1pbGxpc2Vjb25kcywgYmVmb3JlIHRoZSBiYWNrZ3JvdW5kIGltYWdlcyBmb3IgYXZhdGFyc1xuLy8gc2hvdWxkIGJlIGZhZGVkIGludG8gdmlldy4gVGhpcyBpcyBkb25lIHRvIHByZXZlbnQgYW55IHN1ZGRlbiB2aXN1YWwgY2hhbmdlc1xuLy8gaW1tZWRpYXRlbHkgYWZ0ZXIgcGFnZSBsb2FkLlxuLy9cbi8vIEB2YWx1ZSAyMDBcbi8vIEBwcml2YXRlXG4vLyBAdHlwZSBOdW1iZXJcblxudmFyIE1JTl9USU1FX1RPX0xPQUQgPSAyMDA7XG5cbi8vKlxuLy8gRmFkZXMgdGhlIGltYWdlIGludG8gdmlldyBzbW9vdGhseS4gVG8gcHJldmVudCBzdWRkZW4gYXBwZWFyYW5jZSBvZiBpbWFnZXNcbi8vIGltbWVkaWF0ZWx5IGFmdGVyIHBhZ2UgbG9hZCwgdGhpcyBmdW5jdGlvbiBzdG9yZXMgdGhlIHRpbWUgd2hlbiBpdCB3YXNcbi8vIGluaXRpYWxpemVkIGFuZCB3YWl0cyBhdCBsZWFzdCBgTUlOX1RJTUVfVE9fTE9BRGAgYWZ0ZXIgdGhhdCBiZWZvcmUgYXBwbHlpbmdcbi8vIHRoZSByZXF1aXJlZCBjbGFzc2VzLlxuLy9cbi8vIEBwcml2YXRlXG4vLyBAcGFyYW0ge0RPTUVsZW1lbnR9IGltYWdlIC0gVGhlIGltYWdlIHRvIHJldmVhbC5cbi8vIEByZXR1cm5zIG5vdGhpbmdcblxudmFyIHNob3dfaW1hZ2UgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhcnQgPSBEYXRlLm5vdygpO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoaW1hZ2UpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoc3RhdGVzLmltYWdlLnZpc2libGUpO1xuICAgIH0sIE1hdGgubWF4KDAsIE1JTl9USU1FX1RPX0xPQUQgLSAoRGF0ZS5ub3coKSAtIHN0YXJ0KSkpO1xuICB9O1xufSkoKTtcblxuLy8qXG4vLyBUaGUgY29uc3RydWN0b3IgYXJvdW5kIGFuIGF2YXRhciBET00gbm9kZS4gVGhpcyBjb25zdHJ1Y3RvciB3aWxsIGNoZWNrIGZvciB0aGVcbi8vIHNlcnZpY2UgZnJvbSB3aGljaCB0aGUgYXZhdGFyIGltYWdlIHNob3VsZCBiZSBmZXRjaGVkIGFuZCBkbyBpdHMgYmVzdCB0byBncmFiXG4vLyB0aGF0IGltYWdlLlxuLy9cbi8vIEJlY2F1c2UgdGhlcmUgaXMgbm8gd2F5IHRvIGludGVyYWN0IHdpdGggYW4gYEF2YXRhcmAsIHRoZXJlIGlzIG5vIHB1YmxpY1xuLy8gaW50ZXJmYWNlIGZvciB0aGlzIGNvbXBvbmVudC5cbi8vXG4vLyBAZmFjdG9yeVxuLy9cbi8vIEBwYXJhbSB7RE9NRWxlbWVudH0gbm9kZSAtIFRoZSB0b3AgbGV2ZWwgb2YgdGhlIGF2YXRhciBjb21wb25lbnQuXG4vLyBAcmV0dXJucyBub3RoaW5nXG5cbmZ1bmN0aW9uIEF2YXRhcihub2RlKSB7XG4gIHZhciBwcm9maWxlX25hbWUgPSBub2RlLmdldEF0dHJpYnV0ZShhdHRycy5wcm9maWxlX25hbWUpLFxuICAgICAgaW1hZ2UgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBjbGFzc2VzLmltYWdlKSxcbiAgICAgIHNlcnZpY2UgPSBub2RlLmdldEF0dHJpYnV0ZShhdHRycy5zZXJ2aWNlKTtcblxuICBzd2l0Y2ggKHNlcnZpY2UpIHtcbiAgICBjYXNlIFwiZ2l0aHViXCI6XG4gICAgICAkLmdldEpTT04oXCJodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzL1wiICsgcHJvZmlsZV9uYW1lLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpbWFnZS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcIiArIGRhdGEuYXZhdGFyX3VybCArIFwiKVwiO1xuICAgICAgICBzaG93X2ltYWdlKGltYWdlKTtcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFwidHdpdHRlclwiOlxuICAgIGNhc2UgXCJlbWFpbFwiOlxuICAgICAgaW1hZ2Uuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoaHR0cDovL2F2YXRhcnMuaW8vXCIgKyBzZXJ2aWNlICsgXCIvXCIgKyBwcm9maWxlX25hbWUgKyBcIilcIjtcbiAgICAgIHNob3dfaW1hZ2UoaW1hZ2UpO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuLy8qXG4vLyBJbml0aWFsaXplcyB0aGUgYEF2YXRhcmAgY29tcG9uZW50LlxuLy9cbi8vIEBtZXRob2Rcbi8vIEBzdGF0aWNcbi8vXG4vLyBAcGFyYW0ge0hUTUxFbGVtZW50fSBbY29udGV4dCA9IGRvY3VtZW50XSAtIFRoZSBjb250ZXh0IGluIHdoaWNoIHRvIHNlYXJjaFxuLy8gZm9yIERPTSBub2RlcyB0aGF0IHNob3VsZCBiZSB1c2VkIGFzIHRoZSByb290IG9mIGFuIGBBdmF0YXJgIGNvbXBvbmVudC5cblxuQXZhdGFyLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjb250ZXh0ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQgOiBhcmd1bWVudHNbMF07XG5cbiAgdmFyIGF2YXRhcnMgPSBfQXJyYXkkZnJvbShjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIgKyBjbGFzc2VzLnJvb3QpKTtcbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2dldEl0ZXJhdG9yKGF2YXRhcnMpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICB2YXIgYXZhdGFyID0gX3N0ZXAudmFsdWU7XG4gICAgICBBdmF0YXIoYXZhdGFyKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICBfaXRlcmF0b3JbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0cy5jbGFzc2VzID0gY2xhc3NlcztcbmV4cG9ydHMuc3RhdGVzID0gc3RhdGVzO1xuZXhwb3J0cy5hdHRycyA9IGF0dHJzO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBBdmF0YXI7XG5cbi8vIExlbW9uLm1ha2UoQXZhdGFyKVxuXG59LHtcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tXCI6MTYsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCI6MTd9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2dldEl0ZXJhdG9yID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX3JlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9BcnJheSRmcm9tID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9PYmplY3QkZGVmaW5lUHJvcGVydGllcyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9PYmplY3QkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG4vLyBTZWU6IGh0dHA6Ly91cGRhdGVzLmh0bWw1cm9ja3MuY29tLzIwMTUvMDQvY3V0LWFuZC1jb3B5LWNvbW1hbmRzXG5cbi8vICAgICAgICBfX18gICAgICAgICAgX19fICAgICAgICBfX19fXyAgICAgICAgX19fXG4vLyAgICAgICAvICAvXFwgICAgICAgIC8gIC9cXCAgICAgIC8gIC86OlxcICAgICAgLyAgL1xcXG4vLyAgICAgIC8gIC86LyAgICAgICAvICAvOjpcXCAgICAvICAvOi9cXDpcXCAgICAvICAvOi9fXG4vLyAgICAgLyAgLzovICAgICAgIC8gIC86L1xcOlxcICAvICAvOi8gIFxcOlxcICAvICAvOi8gL1xcXG4vLyAgICAvICAvOi8gIF9fXyAgLyAgLzovICBcXDpcXC9fXy86LyBcXF9fXFw6fC8gIC86LyAvOi9fXG4vLyAgIC9fXy86LyAgLyAgL1xcL19fLzovIFxcX19cXDpcXCAgXFw6XFwgLyAgLzovX18vOi8gLzovIC9cXFxuLy8gICBcXCAgXFw6XFwgLyAgLzovXFwgIFxcOlxcIC8gIC86L1xcICBcXDpcXCAgLzovXFwgIFxcOlxcLzovIC86L1xuLy8gICAgXFwgIFxcOlxcICAvOi8gIFxcICBcXDpcXCAgLzovICBcXCAgXFw6XFwvOi8gIFxcICBcXDo6LyAvOi9cbi8vICAgICBcXCAgXFw6XFwvOi8gICAgXFwgIFxcOlxcLzovICAgIFxcICBcXDo6LyAgICBcXCAgXFw6XFwvOi9cbi8vICAgICAgXFwgIFxcOjovICAgICAgXFwgIFxcOjovICAgICAgXFxfX1xcLyAgICAgIFxcICBcXDo6L1xuLy8gICAgICAgXFxfX1xcLyAgICAgICAgXFxfX1xcLyAgICAgICAgICAgICAgICAgICBcXF9fXFwvXG5cbnZhciBfc2Nyb2xsX2NvbnRhaW5lciA9IHJlcXVpcmUoXCIuLi9zY3JvbGxfY29udGFpbmVyXCIpO1xuXG52YXIgX3Njcm9sbF9jb250YWluZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2Nyb2xsX2NvbnRhaW5lcik7XG5cbnZhciBfdXRpbGl0aWVzRXZlbnRzID0gcmVxdWlyZShcIi4uLy4uL3V0aWxpdGllcy9ldmVudHNcIik7XG5cbnZhciBfdXRpbGl0aWVzRXZlbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxpdGllc0V2ZW50cyk7XG5cbnZhciBfdXRpbGl0aWVzVWlfZXZlbnRzID0gcmVxdWlyZShcIi4uLy4uL3V0aWxpdGllcy91aV9ldmVudHNcIik7XG5cbnZhciBfdXRpbGl0aWVzVWlfZXZlbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxpdGllc1VpX2V2ZW50cyk7XG5cbnZhciBfdXRpbGl0aWVzUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vdXRpbGl0aWVzL3JhbmdlXCIpO1xuXG52YXIgX3V0aWxpdGllc1JhbmdlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxpdGllc1JhbmdlKTtcblxudmFyIF9pZnJhbWUgPSByZXF1aXJlKFwiLi4vaWZyYW1lXCIpO1xuXG52YXIgX3NlbGVjdCA9IHJlcXVpcmUoXCIuLi9zZWxlY3RcIik7XG5cbnZhciBfdXRpbGl0aWVzTWFya3VwID0gcmVxdWlyZShcIi4uLy4uL3V0aWxpdGllcy9tYXJrdXBcIik7XG5cbnZhciBfdXRpbGl0aWVzUGFpbnRpbmcgPSByZXF1aXJlKFwiLi4vLi4vdXRpbGl0aWVzL3BhaW50aW5nXCIpO1xuXG52YXIgJCA9IHt9O1xuXG52YXIgY2xhc3NlcyA9IHtcbiAgcm9vdDogXCJjb2RlLWJsb2NrXCIsXG4gIGhlYWRlcjogXCJjb2RlLWJsb2NrX19oZWFkZXJcIixcbiAgY29kZTogXCJjb2RlLWJsb2NrX19jb2RlXCIsXG4gIHNlbGVjdDogXCJjb2RlLWJsb2NrX19kZW1vLXNlbGVjdG9yXCIsXG4gIGNvZGVfY29udGFpbmVyOiBcImNvZGUtYmxvY2tfX2NvZGUtY29udGFpbmVyXCIsXG4gIHRvZ2dsZXI6IFwiY29kZS1ibG9ja19fdG9nZ2xlclwiLFxuICBjb250ZW50OiBcImNvZGUtYmxvY2tfX2NvbnRlbnRcIixcbiAgaWZyYW1lOiBcImNvZGUtYmxvY2tfX2lmcmFtZVwiLFxuICBkZW1vX2NvbnRlbnQ6IFwiY29kZS1ibG9ja19fZGVtb19fY29udGVudFwiXG59O1xuXG52YXIgdmFyaWFudHMgPSB7XG4gIHJvb3Q6IHsgd2l0aF9kZW1vOiBjbGFzc2VzLnJvb3QgKyBcIi0td2l0aC1kZW1vXCIgfVxufTtcblxudmFyIHN0YXRlcyA9IHtcbiAgcm9vdDogeyBoaWRkZW46IGNsYXNzZXMucm9vdCArIFwiLS1pcy1oaWRkZW5cIiB9XG59O1xuXG52YXIgYXR0cnMgPSB7XG4gIGxhbmd1YWdlOiBcImRhdGEtY29kZS1ibG9jay1sYW5ndWFnZVwiLFxuICBjYWNoZWRfbWF4X2hlaWdodDogXCJkYXRhLWNhY2hlZC1tYXgtaGVpZ2h0XCJcbn07XG5cbnZhciBDb2RlQmxvY2s7XG5cbi8vKlxuLy8gQ2xlYW5zIGEgc3RyaW5nIG9mIGNvZGUgYW5kIHVwZGF0ZXMgdGhlIHN0cmluZyB3aXRoIHN5bnRheCBoaWdobGlnaHRpbmdcbi8vIG1hcmt1cC5cbi8vXG4vLyBAcGFyYW0ge1N0cmluZ30gY29kZSAtIFRoZSByYXcgY29kZS5cbi8vXG4vLyBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMgPSB7fV0gLSBUaGUgb3B0aW9ucyBmb3IgdGhlIGhpZ2hsaWdodGluZyBvcGVyYXRpb24uXG4vL1xuLy8gQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmxhbmd1YWdlX2NvZGUgPSBcImh0bWxcIl1cbi8vIFRoZSBsYW5ndWFnZSBvZiB0aGUgcGFzc2VkIGNvZGUuIFRoaXMgaXMgdXNlZCBieSB0aGUgc3ludGF4IGhpZ2hsaWdodGVyIHRvXG4vLyBwaWNrIHRoZSBhcHByb3ByaWF0ZSBoaWdobGlnaHRlci5cbi8vXG4vLyBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNvbGxhcHNlX25ld2xpbmVzID0gZmFsc2VdXG4vLyBXaGV0aGVyIG9yIG5vdCB0byBjb21iaW5lIG11bHRpcGxlIGNvbnNlY3V0aXZlIG5ld2xpbmVzIGludG8gYSBzaW5nbGUgbmV3bGluZS5cbi8vXG4vLyBAcHJpdmF0ZVxuLy8gQHJldHVybnMgU3RyaW5nIC0gVGhlIGNsZWFuZWQgYW5kIHN5bnRheC1oaWdobGlnaHRlZCBzdHJpbmcuXG5cbmZ1bmN0aW9uIGNsZWFuX2FuZF9oaWdobGlnaHRfY29kZShjb2RlKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG4gIHZhciBsYW5ndWFnZV9jb2RlID0gb3B0aW9ucy5sYW5ndWFnZV9jb2RlO1xuXG4gIGNvZGUgPSAoMCwgX3V0aWxpdGllc01hcmt1cC5jbGVhbikoY29kZSwgb3B0aW9ucyk7XG4gIGlmICghbGFuZ3VhZ2VfY29kZSB8fCBsYW5ndWFnZV9jb2RlID09PSBcImh0bWxcIikge1xuICAgIGNvZGUgPSAoMCwgX3V0aWxpdGllc01hcmt1cC5pbmRlbnQpKGNvZGUpO1xuICB9XG4gIHJldHVybiAoMCwgX3V0aWxpdGllc01hcmt1cC5oaWdobGlnaHQpKGNvZGUsIG9wdGlvbnMpO1xufVxuXG4vLypcbi8vIFVwZGF0ZXMgaGVscGVyIGNvZGUgKHRoYXQgaXMsIGEgdGVtcGxhdGUgbGFuZ3VhZ2UgdGhhdCBnZW5lcmF0ZXMgbWFya3VwKSBmb3Jcbi8vIGNoYW5nZXMgaW4gY2xhc3NlcyB0aGF0IGhhdmUgY29ycmVzcG9uZGluZyBhdHRyaWJ1dGVzIGluIHRoZSBoZWxwZXIgbWFya3VwLlxuLy8gSXQgZG9lcyB0aGlzIGJ5IHNlYXJjaGluZyB0aHJvdWdoIHRoZSBoZWxwZXIgbWFya3VwIGZvciB0aGUgc3ltYm9sIHRoYXQgc2V0c1xuLy8gYSBnaXZlbiBjbGFzcyAodGhlIGBzZXR0ZXJgKSwgYW5kIHRoZW4gYXNzaWducyB0aGF0IGEgdmFsdWUgZGVwZW5kaW5nIG9uIHRoZVxuLy8gbmF0dXJlIG9mIHRoZSBjaGFuZ2UuXG4vL1xuLy8gLSBJZiB0aGVyZSBpcyBubyBgY29uc3RhbnRgIGZvciB0aGUgY2hhbmdlLCB0aGUgdmFsdWUgb2YgdGhlIGBzZXR0ZXJgIGlzXG4vLyBhc3N1bWVkIHRvIGJlIGB0cnVlYCBpZiB0aGUgY2xhc3MgaXMgYWN0aXZlIGFuZCBgZmFsc2VgIG90aGVyd2lzZS5cbi8vXG4vLyAtIElmIHRoZXJlIGlzIGEgYGNvbnN0YW50YCwgdGhpcyB2YWx1ZSBpcyB1c2VkIHdoZW4gYSBjbGFzcyBpcyBhZGRlZC4gVGhlXG4vLyBjYWNoZSBpcyByZXF1aXJlZCB0byBzdG9yZSB2YWx1ZXMgZm9yIHdoZW4gYSBgc2V0dGVyYCB3aXRoIGEgY29uc3RhbnQgaXNcbi8vIHJlbW92ZWQg4oCUwqB0aGUgdmFsdWUgb2YgdGhlIGBzZXR0ZXJgIGlzIHRoZW4gcmV0dXJuZWQgdG8gdGhlIHByZXZpb3VzXG4vLyBgY29uc3RhbnRgLCB3aGljaCBpcyBzdG9yZWQgaW4gdGhlIGNhY2hlLlxuLy9cbi8vIEBwYXJhbSB7U3RyaW5nfSBjb2RlICAgLSBUaGUgcmF3IGNvZGUuXG4vLyBAcGFyYW0ge09iamVjdH0gY2hhbmdlIC0gVGhlIGRldGFpbHMgYWJvdXQgdGhlIGNsYXNzIGNoYW5nZS4gVGhpcyBzaG91bGRcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlIHdoZXRoZXIgdGhlIGNsYXNzIHdhcyBhZGRlZCBvciByZW1vdmVkIGFuZFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgIGFsbCBvZiB0aGUgYHNldHRlcnNgIGZvciB0aGUgY29ycmVzcG9uZGluZyB2YXJpYXRpb24uXG4vLyBAcGFyYW0ge09iamVjdH0gY2FjaGUgIC0gVGhlIGNhY2hlIG9mIHByZXZpb3VzIGNvbnN0YW50IHZhbHVlcy5cbi8vXG4vLyBAcHJpdmF0ZVxuLy8gQHJldHVybnMgU3RyaW5nIC0gVGhlIGhlbHBlciBjb2RlIHdpdGggdGhlIHJlbGV2YW50IGF0dHJpYnV0ZXMgdXBkYXRlZC5cblxuZnVuY3Rpb24gdXBkYXRlX2hlbHBlcihjb2RlLCBjaGFuZ2UsIGNhY2hlKSB7XG4gIHZhciBhZGQgPSAhIWNoYW5nZS5hZGQsXG4gICAgICBoZWxwZXJfcGFyYW0sXG4gICAgICBjb25zdGFudCxcbiAgICAgIGhlbHBlcl9tYXRjaGVyLFxuICAgICAgcmVnZXgsXG4gICAgICBjb25zdGFudHNfZm9yX3BhcmFtLFxuICAgICAgaW5kZXgsXG4gICAgICByZXBsYWNlX3ZhbHVlO1xuXG4gIGZ1bmN0aW9uIGNvbnN0YW50X3JlcGxhY2VyKG1hdGNoLCBwYXJhbV9wb3J0aW9uLCBjb25zdGFudF9wb3J0aW9uKSB7XG4gICAgY2FjaGVbaGVscGVyX3BhcmFtXSA9IGNhY2hlW2hlbHBlcl9wYXJhbV0gfHwgW2NvbnN0YW50X3BvcnRpb25dO1xuXG4gICAgaWYgKGNoYW5nZS5tZXRob2QgPT09IFwiYWRkXCIpIHtcbiAgICAgIGNhY2hlW2hlbHBlcl9wYXJhbV0ucHVzaChjb25zdGFudCk7XG4gICAgICByZXR1cm4gXCJcIiArIHBhcmFtX3BvcnRpb24gKyBjb25zdGFudDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3RhbnRzX2Zvcl9wYXJhbSA9IGNhY2hlW2hlbHBlcl9wYXJhbV07XG4gICAgICBpZiAoIWNvbnN0YW50c19mb3JfcGFyYW0pIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgfVxuXG4gICAgICBpbmRleCA9IGNvbnN0YW50c19mb3JfcGFyYW0uaW5kZXhPZihjb25zdGFudCk7XG4gICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICBjb25zdGFudHNfZm9yX3BhcmFtLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG5cbiAgICAgIHJlcGxhY2VfdmFsdWUgPSBjb25zdGFudHNfZm9yX3BhcmFtW2NvbnN0YW50c19mb3JfcGFyYW0ubGVuZ3RoIC0gMV07XG4gICAgICByZXR1cm4gXCJcIiArIHBhcmFtX3BvcnRpb24gKyByZXBsYWNlX3ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJvb2xlYW5fcmVwbGFjZXIobWF0Y2gsIHBhcmFtX3BvcnRpb24pIHtcbiAgICByZXR1cm4gXCJcIiArIHBhcmFtX3BvcnRpb24gKyAoYWRkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xuICB9XG5cbiAgaWYgKCFjaGFuZ2Uuc2V0X2J5KSB7XG4gICAgcmV0dXJuIGNvZGU7XG4gIH1cblxuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBfZ2V0SXRlcmF0b3IoY2hhbmdlLnNldF9ieSksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgIHZhciBzZXRfYnkgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgY29uc3RhbnQgPSBzZXRfYnkuY29uc3RhbnQgfHwgXCJcIjtcbiAgICAgIGhlbHBlcl9wYXJhbSA9IHNldF9ieS5zZXR0ZXI7XG4gICAgICBoZWxwZXJfbWF0Y2hlciA9IFwiOj9cXFwiP1wiICsgaGVscGVyX3BhcmFtLnJlcGxhY2UoXCI6XCIsIFwiXCIpLnJlcGxhY2UoXCI/XCIsIFwiXFxcXD9cIikgKyBcIlxcXCI/Oj9cXFxccyooPzo9PlxcXFxzKik/XCI7XG5cbiAgICAgIGlmIChjb25zdGFudCkge1xuICAgICAgICAvLyBJZiBhIHZhbHVlIHdhcyBhY3R1YWxseSBkZWNsYXJlZCBmb3IgdGhlIHNldF9ieSwgZmluZCB0aGUgY3VycmVudCBjb25zdGFudFxuICAgICAgICAvLyBhbmQgcmVwbGFjZSBpdCBhcyBuZWVkZWRcbiAgICAgICAgLy8ga2V5OiBWQUxVRSwgOmtleSA9PiBWQUxVRSwgXCJrZXlcIiA9PiBWQUxVRSwgOlwia2V5XCIgPT4gVkFMVUVcblxuICAgICAgICByZWdleCA9IG5ldyBSZWdFeHAoXCIoXCIgKyBoZWxwZXJfbWF0Y2hlciArIFwiKShbYS16QS1aXFxcXC1fOl0qKVwiKTtcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZWdleCwgY29uc3RhbnRfcmVwbGFjZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTm8gY29uc3RhbnQgZGVjbGFyZWQsIGFzc3VtZSBpdCBpcyB0cnVlLyBmYWxzZVxuICAgICAgICByZWdleCA9IG5ldyBSZWdFeHAoXCIoXCIgKyBoZWxwZXJfbWF0Y2hlciArIFwiKSh0cnVlfGZhbHNlKVwiKTtcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZWdleCwgYm9vbGVhbl9yZXBsYWNlcik7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29kZTtcbn1cblxuLy8qXG4vLyBIYW5kbGVzIGEgY2xpY2sgb24gdGhlIGNvbnRhaW5lZCBgYnV0dG9uYCB0aGF0IHRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlXG4vLyBjb2RlIGJsb2NrLlxuLy9cbi8vIEBwcml2YXRlXG4vLyBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBUaGUgYGNsaWNrYCBldmVudCBvbiB0aGUgc2VsZWN0LlxuXG5mdW5jdGlvbiB0b2dnbGVfY29kZV9ibG9ja192aXNpYmlsaXR5KGV2ZW50KSB7XG4gIHZhciBjb2RlX2Jsb2NrID0gQ29kZUJsb2NrW1wiZm9yXCJdKGV2ZW50LnRhcmdldCk7XG4gIGlmIChjb2RlX2Jsb2NrKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvZGVfYmxvY2sudG9nZ2xlKCk7XG59XG5cbi8vKlxuLy8gSGFuZGxlcyBhIGZvY3VzIG9uIHRoZSBjb2RlIGFyZWEgb2YgYSBjb2RlIGJsb2NrIGJ5IHNlbGVjdGluZyBhbGwgb2YgdGhlXG4vLyB0ZXh0IHdpdGhpbiB0aGUgY29kZSBibG9jay5cbi8vXG4vLyBAcHJpdmF0ZVxuLy8gQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gVGhlIGBmb2N1c2luYCBldmVudCBvbiB0aGUgY29kZS5cblxuZnVuY3Rpb24gc2VsZWN0X2NvZGUoKSB7XG4gICgwLCBfdXRpbGl0aWVzUmFuZ2UyW1wiZGVmYXVsdFwiXSkodGhpcykuc2VsZWN0X2FsbCgpO1xufVxuXG4kKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLlwiICsgY2xhc3Nlcy50b2dnbGVyLCB0b2dnbGVfY29kZV9ibG9ja192aXNpYmlsaXR5KTtcbiQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuXCIgKyBjbGFzc2VzLmNvZGUsIHNlbGVjdF9jb2RlKTtcblxuLy8qXG4vLyBIaWRlcyBhIGNvZGUgYmxvY2suXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhIFtgQ29kZUJsb2NrYF0oQGxpbmspLlxuLy8gQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgKHt9KSAtIFRoZSBvcHRpb25zIGZvciBob3cgdGhlIGNvZGUgYmxvY2sgc2hvdWxkIGJlXG4vLyBoaWRkZW4uIEN1cnJlbnRseSwgb25seSB0aGUgYHdpdGhvdXRfdHJhbnNpdGlvbmAgKHdoaWNoIGhpZGVzIGF1dG9tYXRpY2FsbHlcbi8vIHJhdGhlciB0aGFuIHNjYWxpbmcgdGhlIGhlaWdodCBvZiB0aGUgY29kZSBibG9jaykgb3B0aW9uIGlzIHN1cHBvcnRlZC5cbi8vXG4vLyBAcHJpdmF0ZVxuXG5mdW5jdGlvbiBoaWRlKHNlbGYpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcbiAgdmFyIG5vZGUgPSBzZWxmLm5vZGU7XG4gIHZhciB0b2dnbGVyID0gc2VsZi50b2dnbGVyO1xuICB2YXIgY29udGVudCA9IHNlbGYuY29udGVudDtcbiAgdmFyIHdpdGhvdXRfdHJhbnNpdGlvbiA9IG9wdGlvbnMud2l0aG91dF90cmFuc2l0aW9uO1xuXG4gIHZhciBzY3JvbGxfY29udGFpbmVyID0gX3Njcm9sbF9jb250YWluZXIyW1wiZGVmYXVsdFwiXVtcImZvclwiXShub2RlKTtcbiAgaWYgKHNjcm9sbF9jb250YWluZXIpIHtcbiAgICBzY3JvbGxfY29udGFpbmVyLm1haW50YWluX2N1cnJlbnRfaGVpZ2h0KCk7XG4gIH1cblxuICBub2RlLmNsYXNzTGlzdC5hZGQoc3RhdGVzLnJvb3QuaGlkZGVuKTtcbiAgaWYgKHRvZ2dsZXIpIHtcbiAgICB0b2dnbGVyLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpLnRleHRDb250ZW50ID0gXCJTaG93XCI7XG4gIH1cblxuICBjb250ZW50LnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcblxuICBpZiAoIXdpdGhvdXRfdHJhbnNpdGlvbikge1xuICAgIGNvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5taW4oY29udGVudC5zY3JvbGxIZWlnaHQsIHBhcnNlSW50KGNvbnRlbnQuZ2V0QXR0cmlidXRlKGF0dHJzLmNhY2hlZF9tYXhfaGVpZ2h0KSwgMTApKSArIFwicHhcIjtcbiAgICAoMCwgX3V0aWxpdGllc1BhaW50aW5nLmZvcmNlX3JlcGFpbnQpKGNvbnRlbnQpO1xuICAgIGNvbnRlbnQuc3R5bGUudHJhbnNpdGlvbiA9IG51bGw7XG4gIH1cblxuICAoMCwgX3V0aWxpdGllc1BhaW50aW5nLmZvcmNlX3JlcGFpbnQpKGNvbnRlbnQpO1xuICBjb250ZW50LnN0eWxlLmhlaWdodCA9IFwiMHB4XCI7XG5cbiAgaWYgKHdpdGhvdXRfdHJhbnNpdGlvbikge1xuICAgICgwLCBfdXRpbGl0aWVzUGFpbnRpbmcuZm9yY2VfcmVwYWludCkoY29udGVudCk7XG4gICAgY29udGVudC5zdHlsZS50cmFuc2l0aW9uID0gbnVsbDtcbiAgfVxuXG4gIHNlbGYuaXNfaGlkZGVuID0gdHJ1ZTtcbn1cblxuLy8qXG4vLyBTaG93cyBhIGNvZGUgYmxvY2suXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhIFtgQ29kZUJsb2NrYF0oQGxpbmspLlxuLy9cbi8vIEBwcml2YXRlXG5cbmZ1bmN0aW9uIHNob3coc2VsZikge1xuICB2YXIgbm9kZSwgdG9nZ2xlciwgY29udGVudDtcbiAgcmV0dXJuIF9yZWdlbmVyYXRvclJ1bnRpbWUuYXN5bmMoZnVuY3Rpb24gc2hvdyQoY29udGV4dCQxJDApIHtcbiAgICB3aGlsZSAoMSkgc3dpdGNoIChjb250ZXh0JDEkMC5wcmV2ID0gY29udGV4dCQxJDAubmV4dCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBub2RlID0gc2VsZi5ub2RlO1xuICAgICAgICB0b2dnbGVyID0gc2VsZi50b2dnbGVyO1xuICAgICAgICBjb250ZW50ID0gc2VsZi5jb250ZW50O1xuXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZShzdGF0ZXMucm9vdC5oaWRkZW4pO1xuICAgICAgICBzZWxmLmlzX2hpZGRlbiA9IGZhbHNlO1xuICAgICAgICBpZiAodG9nZ2xlcikge1xuICAgICAgICAgIHRvZ2dsZXIucXVlcnlTZWxlY3RvcihcInNwYW5cIikudGV4dENvbnRlbnQgPSBcIkhpZGVcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQkMSQwLm5leHQgPSA4O1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yUnVudGltZS5hd3JhcChfdXRpbGl0aWVzVWlfZXZlbnRzMltcImRlZmF1bHRcIl0udHJhbnNpdGlvbihjb250ZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29udGVudC5zdHlsZS5oZWlnaHQgPSBNYXRoLm1pbihjb250ZW50LnNjcm9sbEhlaWdodCwgcGFyc2VJbnQoY29udGVudC5nZXRBdHRyaWJ1dGUoYXR0cnMuY2FjaGVkX21heF9oZWlnaHQpLCAxMCkpICsgXCJweFwiO1xuICAgICAgICB9KSk7XG5cbiAgICAgIGNhc2UgODpcblxuICAgICAgICBjb250ZW50LnN0eWxlLmhlaWdodCA9IG51bGw7XG5cbiAgICAgIGNhc2UgOTpcbiAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgcmV0dXJuIGNvbnRleHQkMSQwLnN0b3AoKTtcbiAgICB9XG4gIH0sIG51bGwsIHRoaXMpO1xufVxuXG4vLypcbi8vIENhY2hlcyB0aGUgbWF4IGhlaWdodCBvZiB0aGUgbWFpbiBjb250ZW50IGFyZWEgb2YgYSBjb2RlIGJsb2NrLiBUaGlzIGlzIGRvbmVcbi8vIHNvIHRoYXQgdGhlIHRyYW5zaXRpb24gZnJvbSBoaWRkZW4gdG8gc2hvd24gY2FwcyBvdXQgYXQgdGhlIGBtYXgtaGVpZ2h0YFxuLy8gc3BlY2lmaWVkIGluIENTUy5cbi8vXG4vLyBJbiBvcmRlciB0byBhbGxvdyB0aGUgY29kZSBhcmVhcyB0byBzY3JvbGwsIGFuIGFwcHJvcHJpYXRlIG1heC1oZWlnaHQgaXMgYWxzb1xuLy8gc2V0IG9uIHRoZW0uXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhIFtgQ29kZUJsb2NrYF0oQGxpbmspLlxuLy9cbi8vIEBwcml2YXRlXG5cbmZ1bmN0aW9uIGNhY2hlX2NvbnRlbnRfaGVpZ2h0KHNlbGYpIHtcbiAgdmFyIG5vZGUgPSBzZWxmLm5vZGU7XG4gIHZhciBjb250ZW50ID0gc2VsZi5jb250ZW50O1xuXG4gIHZhciBtYXhfaGVpZ2h0ID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUoY29udGVudCkubWF4SGVpZ2h0LCAxMCk7XG5cbiAgY29udGVudC5zZXRBdHRyaWJ1dGUoYXR0cnMuY2FjaGVkX21heF9oZWlnaHQsIG1heF9oZWlnaHQpO1xuXG4gIHZhciBoZWFkZXIgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBjbGFzc2VzLmhlYWRlciksXG4gICAgICBoZWFkZXJfaGVpZ2h0ID0gaGVhZGVyID8gaGVhZGVyLm9mZnNldEhlaWdodCA6IDAsXG4gICAgICBtYXhfY29kZV9oZWlnaHQgPSBtYXhfaGVpZ2h0IC0gaGVhZGVyX2hlaWdodCArIFwicHhcIjtcblxuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gX2dldEl0ZXJhdG9yKF9BcnJheSRmcm9tKG5vZGUucXVlcnlTZWxlY3RvckFsbChcIi5cIiArIGNsYXNzZXMuY29kZV9jb250YWluZXIpKSksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgdmFyIGNvZGVfY29udGFpbmVyID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICBjb2RlX2NvbnRhaW5lci5zdHlsZS5tYXhIZWlnaHQgPSBtYXhfY29kZV9oZWlnaHQ7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyW1wicmV0dXJuXCJdKSB7XG4gICAgICAgIF9pdGVyYXRvcjJbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vKlxuLy8gRG9lcyBhbGwgb2YgdGhlIG5lY2Vzc2FyeSB3b3JrIHRvIG1hbmFnZSB0aGUgdHdvLXdheSBjb21tdW5pY2F0aW9uIGJldHdlZW5cbi8vIGEgY29kZSBibG9jayBjb25uZWN0ZWQgdG8gYW4gYGlmcmFtZWAgYW5kIHRoYXQgYGlmcmFtZWAuIFRoaXMgaW5jbHVkZXNcbi8vIGxpc3RlbmluZyBmb3IgY2hhbmdlcyB0byBtYXJrdXAgb2YgdGhlIGFzc29jaWF0ZWQgZGVtbyBhbmQgdHJpZ2dlcmluZyBhblxuLy8gaW50aWFsIG1hcmt1cCByZXF1ZXN0IHRvIGdldCB0aGUgbW9zdCB1cC10by1kYXRlIHJlcHJlc2VudGF0aW9uIHBvc3NpYmxlLlxuLy9cbi8vIEBwYXJhbSB7T2JqZWN0fSBzZWxmIC0gVGhlIGludGVybmFsIGRldGFpbHMgb2YgYSBbYENvZGVCbG9ja2BdKEBsaW5rKS5cbi8vXG4vLyBAcHJpdmF0ZVxuXG5mdW5jdGlvbiBob29rX3VwX2lmcmFtZV9jb21tdW5pY2F0aW9uKHNlbGYpIHtcbiAgdmFyIGNvbW11bmljYXRvciA9ICgwLCBfaWZyYW1lLkNvbW11bmljYXRvcikoKSxcbiAgICAgIHJlZ2lzdGVyZWQgPSBjb21tdW5pY2F0b3IucmVnaXN0ZXIuZnJvbV9ub2RlKHNlbGYubm9kZSk7XG5cbiAgaWYgKCFyZWdpc3RlcmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlX21hcmt1cF9jaGFuZ2UoZXZlbnQpIHtcbiAgICBpZiAoIWV2ZW50Lmh0bWwgfHwgIXNlbGYuY29kZV9jYWNoZXMubWFya3VwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNlbGYuY29kZV9jYWNoZXMubWFya3VwLmNvZGUgPSBldmVudC5odG1sO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlX2NsYXNzX2NoYW5nZShldmVudCkge1xuICAgIGlmICghc2VsZi5jb2RlX2NhY2hlcy5oZWxwZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGV2ZW50LmRldGFpbHMuYWRkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGV2ZW50LmRldGFpbHMuYWRkID0gZXZlbnQuYWRkO1xuICAgIH1cbiAgICBzZWxmLmNvZGVfY2FjaGVzLmhlbHBlci51cGRhdGUoZXZlbnQuZGV0YWlscyk7XG4gIH1cblxuICBjb21tdW5pY2F0b3Iub24oX3V0aWxpdGllc0V2ZW50czJbXCJkZWZhdWx0XCJdLnR5cGVzLm1hcmt1cF9yZXF1ZXN0LCBoYW5kbGVfbWFya3VwX2NoYW5nZSk7XG4gIGNvbW11bmljYXRvci5vbihfdXRpbGl0aWVzRXZlbnRzMltcImRlZmF1bHRcIl0udHlwZXMubWFya3VwX2NoYW5nZSwgaGFuZGxlX21hcmt1cF9jaGFuZ2UpO1xuICBjb21tdW5pY2F0b3Iub24oX3V0aWxpdGllc0V2ZW50czJbXCJkZWZhdWx0XCJdLnR5cGVzLmNsYXNzX2NoYW5nZSwgaGFuZGxlX2NsYXNzX2NoYW5nZSk7XG5cbiAgY29tbXVuaWNhdG9yLnRyaWdnZXIoX3V0aWxpdGllc0V2ZW50czJbXCJkZWZhdWx0XCJdLnR5cGVzLm1hcmt1cF9yZXF1ZXN0KTtcbiAgcmV0dXJuIGNvbW11bmljYXRvcjtcbn1cblxuZnVuY3Rpb24gYXR0YWNoX2V2ZW50X2xpc3RlbmVycyhzZWxmKSB7XG4gIHZhciBzZWxlY3QgPSBzZWxmLm5vZGUucXVlcnlTZWxlY3RvcihcIi5cIiArIF9zZWxlY3QuY2xhc3Nlcy5yb290KTtcblxuICBpZiAoc2VsZWN0ICYmIHNlbGYuY29tbXVuaWNhdG9yKSB7XG4gICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBzZWxmLmNvbW11bmljYXRvci50cmlnZ2VyKF91dGlsaXRpZXNFdmVudHMyW1wiZGVmYXVsdFwiXS50eXBlcy5tYXJrdXBfcmVxdWVzdCwge1xuICAgICAgICBkZW1vOiBldmVudC50YXJnZXQudmFsdWVcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbi8vKlxuLy8gQW4gQVBJIGZvciBjYWNoZWluZywgdXBkYXRpbmcsIGFuZCBoaWdobGlnaHRpbmcgY29kZSB3aXRoaW4gYSBjb2RlIGJsb2NrLlxuLy9cbi8vIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgLSBUaGUgbWFpbiBjb2RlIGJsb2NrLlxuLy9cbi8vIEBwcml2YXRlXG4vLyBAZmFjdG9yeVxuXG52YXIgQ29kZUNhY2hlcyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBsYW5ndWFnZXMgPSB7XG4gICAgbWFya3VwOiBbXCJodG1sXCJdLFxuICAgIGhlbHBlcjogW1wiZXJiXCIsIFwiaGFtbFwiLCBcInNsaW1cIl1cbiAgfTtcblxuICBmdW5jdGlvbiBDb2RlQ2FjaGUobm9kZSkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgICB2YXIgbGFuZ3VhZ2UgPSBub2RlLmdldEF0dHJpYnV0ZShhdHRycy5sYW5ndWFnZSkgfHwgXCJodG1sXCIsXG4gICAgICAgIGRvbV9jb2RlID0gbm9kZS5xdWVyeVNlbGVjdG9yKFwiY29kZVwiKSxcbiAgICAgICAgY29kZSA9IGRvbV9jb2RlLmlubmVySFRNTCxcbiAgICAgICAgaGVscGVyX2NhY2hlID0gbnVsbDtcblxuICAgIHZhciBjb2RlX2NhY2hlID0gX09iamVjdCRkZWZpbmVQcm9wZXJ0aWVzKHtcbiAgICAgIGxhbmd1YWdlOiBsYW5ndWFnZSxcbiAgICAgIGhpZ2hsaWdodDogZnVuY3Rpb24gaGlnaGxpZ2h0KCkge1xuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGNvZGU6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIGNvZGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gc2V0KG5ld19jb2RlKSB7XG4gICAgICAgICAgY29kZSA9IG5ld19jb2RlO1xuICAgICAgICAgIGRvbV9jb2RlLmlubmVySFRNTCA9IGNsZWFuX2FuZF9oaWdobGlnaHRfY29kZShuZXdfY29kZSwge1xuICAgICAgICAgICAgbGFuZ3VhZ2VfY29kZTogbGFuZ3VhZ2UsXG4gICAgICAgICAgICBjb2xsYXBzZV9uZXdsaW5lczogb3B0aW9ucy5nZW5lcmF0ZWRfZnJvbV9oZWxwZXJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb2RlX2NhY2hlLmhpZ2hsaWdodCgpO1xuXG4gICAgaWYgKGxhbmd1YWdlcy5oZWxwZXIuaW5jbHVkZShsYW5ndWFnZSkpIHtcbiAgICAgIGhlbHBlcl9jYWNoZSA9IHt9O1xuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29kZV9jYWNoZSwgXCJ1cGRhdGVcIiwge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoY2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5jb2RlID0gdXBkYXRlX2hlbHBlcih0aGlzLmNvZGUsIGNoYW5nZSwgaGVscGVyX2NhY2hlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvZGVfY2FjaGU7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgY29kZV9ub2RlcyA9IF9BcnJheSRmcm9tKG5vZGUucXVlcnlTZWxlY3RvckFsbChcIi5cIiArIGNsYXNzZXMuY29kZSkpLFxuICAgICAgICBjb2RlX2NhY2hlcyA9IGNvZGVfbm9kZXMubWFwKGZ1bmN0aW9uIChjb2RlX25vZGUpIHtcbiAgICAgIHJldHVybiBDb2RlQ2FjaGUoY29kZV9ub2RlLCB7IGdlbmVyYXRlZF9mcm9tX2hlbHBlcjogY29kZV9ub2Rlcy5sZW5ndGggPiAxIH0pO1xuICAgIH0pO1xuXG4gICAgdmFyIGFwaSA9IF9PYmplY3QkZGVmaW5lUHJvcGVydGllcyh7XG5cbiAgICAgIGxlbmd0aDogY29kZV9jYWNoZXMubGVuZ3RoXG4gICAgfSwge1xuICAgICAgbWFya3VwOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBjb2RlX2NhY2hlcy5maWx0ZXIoZnVuY3Rpb24gKGNvZGVfY2FjaGUpIHtcbiAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZXMubWFya3VwLmluY2x1ZGUoY29kZV9jYWNoZS5sYW5ndWFnZSk7XG4gICAgICAgICAgfSlbMF07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGhlbHBlcjoge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gY29kZV9jYWNoZXMuZmlsdGVyKGZ1bmN0aW9uIChjb2RlX2NhY2hlKSB7XG4gICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2VzLmhlbHBlci5pbmNsdWRlKGNvZGVfY2FjaGUubGFuZ3VhZ2UpO1xuICAgICAgICAgIH0pWzBdO1xuICAgICAgICB9LFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZV9jYWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkoYXBpLCBpLCB7IHZhbHVlOiBjb2RlX2NhY2hlc1tpXSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXBpO1xuICB9O1xufSkoKTtcblxuLy8qXG4vLyBUaGUgY29uc3RydWN0b3IgYXJvdW5kIGEgY29kZSBibG9jay5cbi8vXG4vLyBAZmFjdG9yeVxuLy8gQHB1YmxpY1xuLy9cbi8vIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgLSBUaGUgbm9kZSB3aXRoIHRoZSBgY29kZS1ibG9ja2Agcm9vdCBjbGFzcy5cblxuQ29kZUJsb2NrID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgdmFyIHNlbGYgPSB7XG4gICAgbm9kZTogbm9kZSxcbiAgICBpc19oaWRkZW46IG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKHN0YXRlcy5yb290LmhpZGRlbiksXG4gICAgdG9nZ2xlcjogbm9kZS5xdWVyeVNlbGVjdG9yKFwiLlwiICsgY2xhc3Nlcy50b2dnbGVyKSxcbiAgICBjb250ZW50OiBub2RlLnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBjbGFzc2VzLmNvbnRlbnQpLFxuICAgIGNvZGVfY2FjaGVzOiBDb2RlQ2FjaGVzKG5vZGUpLFxuICAgIGNvbW11bmljYXRvcjogaG9va191cF9pZnJhbWVfY29tbXVuaWNhdGlvbihzZWxmKVxuICB9O1xuXG4gIGF0dGFjaF9ldmVudF9saXN0ZW5lcnMoc2VsZik7XG5cbiAgaWYgKHNlbGYuaXNfaGlkZGVuKSB7XG4gICAgaGlkZShzZWxmLCB7IHdpdGhvdXRfdHJhbnNpdGlvbjogdHJ1ZSB9KTtcbiAgfVxuICBpZiAoc2VsZi50b2dnbGVyKSB7XG4gICAgY2FjaGVfY29udGVudF9oZWlnaHQoc2VsZik7XG4gIH1cblxuICAvLypcbiAgLy8gVG9nZ2xlcyB0aGUgY29kZSBibG9jay5cbiAgLy9cbiAgLy8gQG1ldGhvZFxuXG4gIHZhciB0b2dnbGUgPSBmdW5jdGlvbiB0b2dnbGUoKSB7XG4gICAgcmV0dXJuIHNlbGYuaXNfaGlkZGVuID8gc2hvdyhzZWxmKSA6IGhpZGUoc2VsZik7XG4gIH07XG4gIHZhciBjb2RlX2Jsb2NrID0geyB0b2dnbGU6IHRvZ2dsZSB9O1xuXG4gIHJldHVybiBjb2RlX2Jsb2NrO1xufTtcblxuZXhwb3J0cy5jbGFzc2VzID0gY2xhc3NlcztcbmV4cG9ydHMuc3RhdGVzID0gc3RhdGVzO1xuZXhwb3J0cy52YXJpYW50cyA9IHZhcmlhbnRzO1xuZXhwb3J0cy5hdHRycyA9IGF0dHJzO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBDb2RlQmxvY2s7XG5cbn0se1wiLi4vLi4vdXRpbGl0aWVzL2V2ZW50c1wiOjEwLFwiLi4vLi4vdXRpbGl0aWVzL21hcmt1cFwiOjExLFwiLi4vLi4vdXRpbGl0aWVzL3BhaW50aW5nXCI6MTIsXCIuLi8uLi91dGlsaXRpZXMvcmFuZ2VcIjoxMyxcIi4uLy4uL3V0aWxpdGllcy91aV9ldmVudHNcIjoxNCxcIi4uL2lmcmFtZVwiOjUsXCIuLi9zY3JvbGxfY29udGFpbmVyXCI6NixcIi4uL3NlbGVjdFwiOjcsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbVwiOjE2LFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiOjE3LFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydGllc1wiOjIwLFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIjoyMSxcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiOjI2LFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiOjc1fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9nZXRJdGVyYXRvciA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9BcnJheSRmcm9tID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF91dGlsaXRpZXNFdmVudHMgPSByZXF1aXJlKFwiLi4vLi4vdXRpbGl0aWVzL2V2ZW50c1wiKTtcblxudmFyIF91dGlsaXRpZXNFdmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbGl0aWVzRXZlbnRzKTtcblxudmFyIF91dGlsaXRpZXNVaV9ldmVudHMgPSByZXF1aXJlKFwiLi4vLi4vdXRpbGl0aWVzL3VpX2V2ZW50c1wiKTtcblxudmFyIF91dGlsaXRpZXNVaV9ldmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbGl0aWVzVWlfZXZlbnRzKTtcblxudmFyIF9pZnJhbWUgPSByZXF1aXJlKFwiLi4vaWZyYW1lXCIpO1xuXG4vLypcbi8vIFRoZSBuYW1lIG9mIGNsYXNzZXMgcmVsZXZhbnQgdG8gYERlbW9gLlxuLy8gQG9iamVjdFxuXG52YXIgJCA9IHt9O1xudmFyIGNsYXNzZXMgPSB7XG4gIHJvb3Q6IFwiZGVtb1wiLFxuICBzZWN0aW9uOiBcImRlbW9fX3NlY3Rpb25cIixcbiAgY29udGVudDogXCJjb250ZW50XCJcbn07XG5cbi8vKlxuLy8gVGhlIGRlbGF5IGFmdGVyIGEgY2hhbmdlIGluIG1hcmt1cCB0byBrZWVwIHRyYWNrIG9mIGhlaWdodCBjaGFuZ2VzIGFuZFxuLy8gY29tbXVuaWNhdGUgdGhlbSB0byB0aGUgYXR0YWNoZWQgW2BJZnJhbWVgXShAbGluaykuXG4vL1xuLy8gQHR5cGUgTnVtYmVyXG4vLyBAdmFsdWUgMTAwMFxuXG52YXIgSEVJR0hUX0NIQU5HRV9XQVRDSF9EVVJBVElPTiA9IDEwMDA7XG5cbi8vKlxuLy8gVXBkYXRlcyB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgcGFyZW50IGZvciB0aGUgZGVtbyB0byBtYXRjaCB0aGVcbi8vIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIGxhc3Qgc2VjdGlvbi4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSwgZHVyaW5nIHRoZVxuLy8gdHJhbnNpdGlvbiBmcm9tIGEgbGFyZ2VyIHNpemUgdG8gYSBzbWFsbGVyIHNpemUsIG5vdCBkb2luZyB0aGlzIHdvdWxkIHNob3dcbi8vIHdoaXRlIGJlbG93IGFsbCBvZiB0aGUgZGVtbyBzZWN0aW9ucyByZWdhcmRsZXNzIG9mIHRoZWlyIGNvbG9yLlxuLy9cbi8vIEBwcml2YXRlXG4vLyBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIC0gVGhlIGJhc2UgYERlbW9gIG5vZGUuXG5cbmZ1bmN0aW9uIHNldF9jb3JyZWN0X2JhY2tncm91bmRfY29sb3Iobm9kZSkge1xuICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlLFxuICAgICAgc2VjdGlvbnMgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIgKyBjbGFzc2VzLnNlY3Rpb24pLFxuICAgICAgbGFzdF9zZWN0aW9uID0gc2VjdGlvbnNbc2VjdGlvbnMubGVuZ3RoIC0gMV07XG5cbiAgcGFyZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGxhc3Rfc2VjdGlvbikuYmFja2dyb3VuZENvbG9yO1xufVxuXG4vLypcbi8vIFNwcmVhZHMgdGhlIG1pbmltdW0gaGVpZ2h0IG9mIHRoZSB0b3RhbCBkZW1vIGJldHdlZW4gdGhlIHNlY3Rpb25zIHRoYXQgYXJlXG4vLyBwcmVzZW50LiBUaGlzIGlzIGltcG9ydGFudCBiZWNhdXNlIHRoZSByZXNpemFibGUgZGVtbyB3aWxsIHNob3cgdGhlIGZ1bGxcbi8vIG1pbmltdW0gd2lkdGgsIHNvIGlmIHRoZXJlIGFyZSBjb2xvcmVkIHNlY3Rpb25zIHRoYXQgZG9uJ3QgY29tcGxldGVseSBmaWxsXG4vLyB0aGUgbWluaW11bSB3aWR0aCwgdGhlcmUgd2lsbCBiZSBhbiBhd2t3YXJkIHdoaXRlIHBhdGNoIGJlbG93IHRoZSBzZWN0aW9ucy5cbi8vXG4vLyBAcHJpdmF0ZVxuLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSAtIFRoZSBiYXNlIGBEZW1vYCBub2RlLlxuXG5mdW5jdGlvbiBhbGxvY2F0ZV9taW5pbXVtX2hlaWdodChub2RlKSB7XG4gIHZhciBtaW5faGVpZ2h0ID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkubWluSGVpZ2h0KSxcbiAgICAgIGRlbW9fc2VjdGlvbnMgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIgKyBjbGFzc2VzLnNlY3Rpb24pO1xuXG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9nZXRJdGVyYXRvcihkZW1vX3NlY3Rpb25zKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgdmFyIGRlbW9fc2VjdGlvbiA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICBkZW1vX3NlY3Rpb24uc3R5bGUubWluSGVpZ2h0ID0gbWluX2hlaWdodCAvIGRlbW9fc2VjdGlvbnMubGVuZ3RoICsgXCJweFwiO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgIF9pdGVyYXRvcltcInJldHVyblwiXSgpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vKlxuLy8gQ2FjaGVzIGFsbCBvZiB0aGUgaW50ZXJuYWwgZGV0YWlscyBmb3IgYW4gW2BEZW1vYF0oQGxpbmspLlxuLy9cbi8vIEBwcml2YXRlXG4vLyBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIC0gVGhlIG5vZGUgYmFja2luZyB0aGUgYERlbW9gLlxuLy8gQHJldHVybnMgT2JqZWN0IC0gVGhlIHByaXZhdGUsIGludGVybmFsIGRldGFpbHMgb2YgdGhlIGBEZW1vYC5cblxuZnVuY3Rpb24gY3JlYXRlX3NlbGYobm9kZSkge1xuICByZXR1cm4ge1xuICAgIG1hcmt1cF9zb3VyY2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuI3tDTEFTU0VTLkNPTlRFTlR9XCIpLFxuICAgIGRlbW9faGFuZGxlcnM6IHdpbmRvdy5wYXJlbnQuRG9ja3MuZGVtb19oYW5kbGVycyB8fCB7fSxcbiAgICBwYXJlbnQ6IG5vZGUucGFyZW50Tm9kZSxcbiAgICBoZWlnaHQ6IDAsXG4gICAgYWN0aW9uczoge30sXG4gICAgY29udGV4dDoge1xuICAgICAgYm9keTogZG9jdW1lbnQuYm9keSxcbiAgICAgIGRvY3VtZW50OiBkb2N1bWVudFxuICAgIH1cbiAgfTtcbn1cblxuLy8qXG4vLyBUaGUgY29uc3RydWN0b3IgZm9yIGEgbmV3IGBEZW1vYC4gVGhpcyB3aWxsIHNpZ24gdGhlIGRlbW8gdXAgZm9yIGFsbCB0aGVcbi8vIHJlcXVpcmVkIGV2ZW50cyBhbmQgd2lsbCBkbyB0aGUgcmVxdWlyZWQgaW5pdGlhbGl6YXRpb24gd29yay5cbi8vXG4vLyBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIC0gVGhlIGJhc2UgYERlbW9gIG5vZGUuXG4vL1xuLy8gQGZhY3RvcnlcblxuZnVuY3Rpb24gRGVtbyhub2RlKSB7XG4gIHZhciBzZWxmID0gY3JlYXRlX3NlbGYobm9kZSksXG4gICAgICBjb21tdW5pY2F0b3IgPSAoMCwgX2lmcmFtZS5Db21tdW5pY2F0b3IpKCk7XG5cbiAgLy8qXG4gIC8vIFNlbmRzIHRoZSBtYXJrdXAgZm9yIHRoZSBjdXJyZW50IFwibWFpblwiIHNlY3Rpb24uXG4gIC8vXG4gIC8vIEBwYXJhbSB7T2JqZWN0fSBbZXZlbnQgPSB7fV0gLSBUaGUgKG9wdGlvbmFsKSBldmVudCB0aGF0IHNwZWNpZmllcyB0aGUgZGVtb1xuICAvLyB0byBzZW5kIG1hcmt1cCBmb3IuXG4gIC8vXG4gIC8vIEBtZXRob2RcbiAgLy8gQHByaXZhdGVcblxuICBmdW5jdGlvbiBzZW5kX21hcmt1cCgpIHtcbiAgICB2YXIgZXZlbnQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuICAgIGlmIChldmVudC5kZW1vKSB7XG4gICAgICBzZWxmLm1hcmt1cF9zb3VyY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgY2xhc3Nlcy5zZWN0aW9uICsgXCItLVwiICsgZXZlbnQuZGVtbyArIFwiIC5cIiArIGNsYXNzZXMuY29udGVudCk7XG4gICAgfVxuXG4gICAgY29tbXVuaWNhdG9yLnRyaWdnZXIoX3V0aWxpdGllc0V2ZW50czJbXCJkZWZhdWx0XCJdLnR5cGVzLm1hcmt1cF9yZXF1ZXN0LCB7XG4gICAgICBodG1sOiBzZWxmLm1hcmt1cF9zb3VyY2UuaW5uZXJIVE1MXG4gICAgfSk7XG4gIH1cblxuICAvLypcbiAgLy8gU2VuZHMgdGhlIGhlaWdodCBmb3IgdGhlIGRlbW8gYXMgYSB3aG9sZSwgYW5kIHNldHMgdGhhdCBoZWlnaHQgb24gdGhlXG4gIC8vIGRlbW8ncyBjb250YWluZXIuIFRoZSBoZWlnaHQgaXMgc2V0IG9uIHRoZSBjb250YWluZXIgYWZ0ZXIgYSBkZWxheSB0b1xuICAvLyBlbnN1cmUgdGhhdCB0aGVyZSBpcyBubyBwYXRjaCBvZiB1bnN0eWxlZCBiYWNrZ3JvdW5kIGNvbG9yIHVuZGVybmVhdGggYVxuICAvLyBkZW1vIHRoYXQgaXMgc2hyaW5raW5nLlxuICAvL1xuICAvLyBAbWV0aG9kXG4gIC8vIEBwcml2YXRlXG5cbiAgZnVuY3Rpb24gaGVpZ2h0X3VwZGF0ZSgpIHtcbiAgICB2YXIgbmV3X2hlaWdodCA9IG5vZGUub2Zmc2V0SGVpZ2h0O1xuICAgIGlmIChuZXdfaGVpZ2h0ID09PSBzZWxmLmhlaWdodCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNlbGYuaGVpZ2h0ID0gbmV3X2hlaWdodDtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYucGFyZW50LnN0eWxlLm1pbkhlaWdodCA9IG5ld19oZWlnaHQgKyBcInB4XCI7XG4gICAgfSwgSEVJR0hUX0NIQU5HRV9XQVRDSF9EVVJBVElPTik7XG5cbiAgICBjb21tdW5pY2F0b3IudHJpZ2dlcihfdXRpbGl0aWVzRXZlbnRzMltcImRlZmF1bHRcIl0udHlwZXMuaGVpZ2h0X2NoYW5nZSwgeyBoZWlnaHQ6IG5ld19oZWlnaHQgfSk7XG4gIH1cblxuICAvLypcbiAgLy8gQXBwbGllcyBhIGNsYXNzIGNoYW5nZSB0byB0aGUgZGVtby4gVGhpcyBjbGFzcyBjaGFuZ2Ugd2lsbCBhdm9pZCBhZGRpbmdcbiAgLy8gY2xhc3NlcyB0byBjb21wb25lbnRzIHRoYXQgaGF2ZSBhIGNsYXNzIHByb2NsdWRlZCBmcm9tIHRoZSBuZXcgY2xhc3MsIHdpbGxcbiAgLy8gZmlsdGVyIHRvIHRoZSBwYXNzZWQgZmlsdGVyLCBhbmQgd2lsbCBwZXJmb3JtIHRoZSBvcHRpb25hbCBKYXZhU2NyaXB0XG4gIC8vIGFjdGlvbiBpbnN0ZWFkIG9mIGEgc2ltcGxlIGNsYXNzIGFkZGl0aW9uLyByZW1vdmFsLiBJZiBhcHByb3ByaWF0ZSwgdGhlXG4gIC8vIGNvbXBvbmVudCB3aWxsIHRoZW4gcmV0dXJuIHRoZSBjbGFzcyBjaGFuZ2UgZXZlbnQsIHNlbmQgYSBtYXJrdXAgY2hhbmdlXG4gIC8vIGV2ZW50LCBhbmQgc2VuZCBhIGhlaWdodCB1cGRhdGUgZXZlbnQuXG4gIC8vXG4gIC8vIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIFRoZSBjbGFzcyBjaGFuZ2UgZXZlbnQuXG4gIC8vIEBwcml2YXRlXG4gIC8vXG5cbiAgZnVuY3Rpb24gYXBwbHlfY2xhc3NfY2hhbmdlKGV2ZW50KSB7XG4gICAgdmFyIGRldGFpbHMgPSBldmVudC5kZXRhaWxzLFxuICAgICAgICBtYXJrdXBfY2hhbmdlX2luX3NvdXJjZSA9IGZhbHNlLFxuICAgICAgICBtaW5pbXVtX29uZV9jbGFzc19jaGFuZ2UgPSBmYWxzZSxcbiAgICAgICAgbWF0Y2hlcyA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChcIi5cIiArIGNsYXNzZXMuY29udGVudCArIFwiIC5cIiArIGRldGFpbHNbXCJmb3JcIl0pO1xuXG4gICAgaWYgKGRldGFpbHMuZmlsdGVyX3RvKSB7XG4gICAgICAvLyBDaGVjayBvbiBtYXRjaGVzXG4gICAgICBtYXRjaGVzID0gbWF0Y2hlcy5maWx0ZXIoZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiBtYXRjaC5tYXRjaGVzKGRldGFpbHMuZmlsdGVyX3RvKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNvbWUgaGVpZ2h0IGNoYW5nZXMgbWF5IG9jY3VyIG92ZXIgdGltZS4gV2F0Y2ggZm9yIHRyYW5zaXRpb25zXG4gICAgLy8gYW5kIHNlbmQgaGVpZ2h0IGFnYWluIG9uIGVhY2ggdHJhbnNpdGlvbmVuZCBldmVudFxuICAgIC8vXG4gICAgLy8gVE9ETzogaW50ZWdyYXRlIGJldHRlciBpZnJhbWUgcmVzaXppbmdcbiAgICAvLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGpicmFkc2hhdy9pZnJhbWUtcmVzaXplci90cmVlL21hc3Rlci90ZXN0XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKF91dGlsaXRpZXNVaV9ldmVudHMyW1wiZGVmYXVsdFwiXS50cmFuc2l0aW9uX2VuZCwgaGVpZ2h0X3VwZGF0ZSk7XG5cbiAgICB2YXIgYmFpbF9lYXJseSwgY2xhc3NfbGlzdCwgYWN0aW9uO1xuXG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gX2dldEl0ZXJhdG9yKG1hdGNoZXMpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgIGJhaWxfZWFybHkgPSBmYWxzZTtcbiAgICAgICAgY2xhc3NfbGlzdCA9IG1hdGNoLmNsYXNzTGlzdDtcbiAgICAgICAgYWN0aW9uID0gbnVsbDtcblxuICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO1xuICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7XG4gICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gX2dldEl0ZXJhdG9yKGRldGFpbHMucHJlY2x1ZGUpLCBfc3RlcDM7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSAoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWUpIHtcbiAgICAgICAgICAgIHZhciBwcmVjbHVkZSA9IF9zdGVwMy52YWx1ZTtcblxuICAgICAgICAgICAgaWYgKGNsYXNzX2xpc3QuY29udGFpbnMocHJlY2x1ZGUpKSB7XG4gICAgICAgICAgICAgIGJhaWxfZWFybHkgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yMyA9IHRydWU7XG4gICAgICAgICAgX2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjNbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAgICAgX2l0ZXJhdG9yM1tcInJldHVyblwiXSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IzKSB7XG4gICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmFpbF9lYXJseSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbWluaW11bV9vbmVfY2xhc3NfY2hhbmdlID0gdHJ1ZTtcblxuICAgICAgICBhY3Rpb24gPSBkZXRhaWxzLmphdmFzY3JpcHRfYWN0aW9uO1xuICAgICAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAgICAgaWYgKCFldmVudC5hZGQpIHtcbiAgICAgICAgICAgIGFjdGlvbiA9IGFjdGlvbi5yZXBsYWNlKC9hZGRDbGFzcy9nLCBcInJlbW92ZUNsYXNzXCIpLnJlcGxhY2UoL2NsYXNzTGlzdFxcLmFkZC9nLCBcImNsYXNzTGlzdC5yZW1vdmVcIikucmVwbGFjZSgvKHRydWV8ZmFsc2UpLywgeyBcInRydWVcIjogXCJmYWxzZVwiLCBcImZhbHNlXCI6IFwidHJ1ZVwiIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGV2YWwoYWN0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbGFzc19saXN0W2V2ZW50LmFkZCA/IFwiYWRkXCIgOiBcInJlbW92ZVwiXShkZXRhaWxzLm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT25seSB1cGRhdGUgbWFya3VwIGluIHNvdXJjZSB3aGVuIHRoZSBtYXJrdXAgc291cmNlIGlzIGFib3ZlIGluIHRoZVxuICAgICAgICAvLyBET00gdHJlZS5cbiAgICAgICAgbWFya3VwX2NoYW5nZV9pbl9zb3VyY2UgPSBtYXJrdXBfY2hhbmdlX2luX3NvdXJjZSB8fCAkKG1hdGNoKS5jbG9zZXN0KHNlbGYubWFya3VwX3NvdXJjZSkubGVuZ3RoID4gMDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMltcInJldHVyblwiXSkge1xuICAgICAgICAgIF9pdGVyYXRvcjJbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtYXJrdXBfY2hhbmdlX2luX3NvdXJjZSkge1xuICAgICAgc2VuZF9tYXJrdXAoKTtcbiAgICB9XG5cbiAgICBpZiAobWluaW11bV9vbmVfY2xhc3NfY2hhbmdlKSB7XG4gICAgICAvLyBQYXNzIGFsb25nIHRoZSBjbGFzcyBjaGFuZ2UgZXZlbnRcbiAgICAgIGNvbW11bmljYXRvci50cmlnZ2VyKGV2ZW50LnR5cGUsIGV2ZW50KTtcbiAgICAgIGhlaWdodF91cGRhdGUoKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoX3V0aWxpdGllc1VpX2V2ZW50czJbXCJkZWZhdWx0XCJdLnRyYW5zaXRpb25fZW5kLCBoZWlnaHRfdXBkYXRlKTtcbiAgICB9LCBIRUlHSFRfQ0hBTkdFX1dBVENIX0RVUkFUSU9OKTtcbiAgfVxuXG4gIGNvbW11bmljYXRvci5yZWdpc3Rlci5mcm9tX25vZGUobm9kZSk7XG4gIGNvbW11bmljYXRvci5vbihfdXRpbGl0aWVzRXZlbnRzMltcImRlZmF1bHRcIl0udHlwZXMuaGVpZ2h0X3JlcXVlc3QsIGhlaWdodF91cGRhdGUpO1xuICBjb21tdW5pY2F0b3Iub24oX3V0aWxpdGllc0V2ZW50czJbXCJkZWZhdWx0XCJdLnR5cGVzLm1hcmt1cF9yZXF1ZXN0LCBzZW5kX21hcmt1cCk7XG4gIGNvbW11bmljYXRvci5vbihfdXRpbGl0aWVzRXZlbnRzMltcImRlZmF1bHRcIl0udHlwZXMuY2xhc3NfY2hhbmdlLCBhcHBseV9jbGFzc19jaGFuZ2UpO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhlaWdodF91cGRhdGUpO1xuICBzZXRJbnRlcnZhbChoZWlnaHRfdXBkYXRlLCBIRUlHSFRfQ0hBTkdFX1dBVENIX0RVUkFUSU9OKTtcblxuICBoZWlnaHRfdXBkYXRlKCk7XG4gIGFsbG9jYXRlX21pbmltdW1faGVpZ2h0KG5vZGUpO1xuICBzZXRfY29ycmVjdF9iYWNrZ3JvdW5kX2NvbG9yKG5vZGUpO1xuXG4gIHJldHVybiB7fTtcbn1cblxuLy8qXG4vLyBJbml0aWFsaXplcyB0aGUgYERlbW9gIGNvbXBvbmVudC5cbi8vXG4vLyBAbWV0aG9kXG4vLyBAc3RhdGljXG4vL1xuLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gW2NvbnRleHQgPSBkb2N1bWVudF0gLSBUaGUgY29udGV4dCBpbiB3aGljaCB0byBzZWFyY2hcbi8vIGZvciBET00gbm9kZXMgdGhhdCBzaG91bGQgYmUgdXNlZCBhcyB0aGUgcm9vdCBvZiBhbiBgRGVtb2AgY29tcG9uZW50LlxuXG5EZW1vLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjb250ZXh0ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQgOiBhcmd1bWVudHNbMF07XG5cbiAgdmFyIGRlbW9zID0gX0FycmF5JGZyb20oY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiICsgY2xhc3Nlcy5yb290KSk7XG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWU7XG4gIHZhciBfZGlkSXRlcmF0b3JFcnJvcjQgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yNCA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvcjQgPSBfZ2V0SXRlcmF0b3IoZGVtb3MpLCBfc3RlcDQ7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSAoX3N0ZXA0ID0gX2l0ZXJhdG9yNC5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWUpIHtcbiAgICAgIHZhciBkZW1vID0gX3N0ZXA0LnZhbHVlO1xuICAgICAgRGVtbyhkZW1vKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yNCA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3I0ID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ICYmIF9pdGVyYXRvcjRbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgX2l0ZXJhdG9yNFtcInJldHVyblwiXSgpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I0KSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRGVtbztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbn0se1wiLi4vLi4vdXRpbGl0aWVzL2V2ZW50c1wiOjEwLFwiLi4vLi4vdXRpbGl0aWVzL3VpX2V2ZW50c1wiOjE0LFwiLi4vaWZyYW1lXCI6NSxcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tXCI6MTYsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCI6MTcsXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIjoyNn1dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgJCA9IHt9O1xuXG52YXIgY2xhc3NlcyA9IHtcbiAgcm9vdDogXCJmaWVsZFwiLFxuICBpbnB1dDogXCJmaWVsZF9faW5wdXRcIixcbiAgbGFiZWw6IFwibGFiZWxcIlxufTtcblxudmFyIHN0YXRlcyA9IHtcbiAgcm9vdDogeyBmb2N1c2VkOiBjbGFzc2VzLnJvb3QgKyBcIi0taXMtZm9jdXNlZFwiIH0sXG4gIGxhYmVsOiB7IGZvY3VzZWQ6IGNsYXNzZXMubGFiZWwgKyBcIi0taXMtZm9jdXNlZFwiIH1cbn07XG5cbnZhciBGaWVsZCA9IHtcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAkKGRvY3VtZW50KS5vbihcImZvY3VzaW4gZm9jdXNvdXRcIiwgXCIuXCIgKyBjbGFzc2VzLmlucHV0LCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciBtZXRob2QgPSBldmVudC50eXBlID09PSBcImZvY3VzaW5cIiA/IFwiYWRkXCIgOiBcInJlbW92ZVwiLFxuICAgICAgICAgIGxhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltmb3I9XCIgKyBldmVudC50YXJnZXQuaWQgKyBcIl1cIik7XG5cbiAgICAgIGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTGlzdFttZXRob2RdKHN0YXRlcy5yb290LmZvY3VzZWQpO1xuICAgICAgbGFiZWwuY2xhc3NMaXN0W21ldGhvZF0oc3RhdGVzLmxhYmVsLmZvY3VzZWQpO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEZpZWxkO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxufSx7fV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyAgICAgICAgICAgICAgICAgICBfX18gICAgICAgX19fICAgICAgICAgIF9fXyAgICAgICAgICBfX18gICAgICAgICAgX19fXG4vLyAgICAgIF9fXyAgICAgICAgIC8gIC9cXCAgICAgLyAgL1xcICAgICAgICAvICAvXFwgICAgICAgIC9fXy9cXCAgICAgICAgLyAgL1xcXG4vLyAgICAgLyAgL1xcICAgICAgIC8gIC86L18gICAvICAvOjpcXCAgICAgIC8gIC86OlxcICAgICAgfCAgfDo6XFwgICAgICAvICAvOi9fXG4vLyAgICAvICAvOi8gICAgICAvICAvOi8gL1xcIC8gIC86L1xcOlxcICAgIC8gIC86L1xcOlxcICAgICB8ICB8Onw6XFwgICAgLyAgLzovIC9cXFxuLy8gICAvX18vOjpcXCAgICAgLyAgLzovIC86Ly8gIC86L34vOi8gICAvICAvOi9+Lzo6XFwgIF9ffF9ffDp8XFw6XFwgIC8gIC86LyAvOi9fXG4vLyAgIFxcX19cXC9cXDpcXF9fIC9fXy86LyAvOi8vX18vOi8gLzovX19fL19fLzovIC86L1xcOlxcL19fLzo6Ojp8IFxcOlxcL19fLzovIC86LyAvXFxcbi8vICAgICAgXFwgIFxcOlxcL1xcXFwgIFxcOlxcLzovIFxcICBcXDpcXC86Ojo6Oi9cXCAgXFw6XFwvOi9fX1xcL1xcICBcXDpcXH5+XFxfX1xcL1xcICBcXDpcXC86LyAvOi9cbi8vICAgICAgIFxcX19cXDo6LyBcXCAgXFw6Oi8gICBcXCAgXFw6Oi9+fn5+ICBcXCAgXFw6Oi8gICAgICBcXCAgXFw6XFwgICAgICAgXFwgIFxcOjovIC86L1xuLy8gICAgICAgL19fLzovICAgXFwgIFxcOlxcICAgIFxcICBcXDpcXCAgICAgICBcXCAgXFw6XFwgICAgICAgXFwgIFxcOlxcICAgICAgIFxcICBcXDpcXC86L1xuLy8gICAgICAgXFxfX1xcLyAgICAgXFwgIFxcOlxcICAgIFxcICBcXDpcXCAgICAgICBcXCAgXFw6XFwgICAgICAgXFwgIFxcOlxcICAgICAgIFxcICBcXDo6L1xuLy8gICAgICAgICAgICAgICAgICBcXF9fXFwvICAgICBcXF9fXFwvICAgICAgICBcXF9fXFwvICAgICAgICBcXF9fXFwvICAgICAgICBcXF9fXFwvXG4vL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9nZXRJdGVyYXRvciA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9PYmplY3QkYXNzaWduID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9BcnJheSRmcm9tID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF91dGlsaXRpZXNFdmVudHMgPSByZXF1aXJlKFwiLi4vLi4vdXRpbGl0aWVzL2V2ZW50c1wiKTtcblxudmFyIF91dGlsaXRpZXNFdmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbGl0aWVzRXZlbnRzKTtcblxudmFyIF91dGlsaXRpZXNEb21fY2FjaGUgPSByZXF1aXJlKFwiLi4vLi4vdXRpbGl0aWVzL2RvbV9jYWNoZVwiKTtcblxudmFyIF91dGlsaXRpZXNEb21fY2FjaGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbGl0aWVzRG9tX2NhY2hlKTtcblxudmFyIF91dGlsaXRpZXNNYXJrdXAgPSByZXF1aXJlKFwiLi4vLi4vdXRpbGl0aWVzL21hcmt1cFwiKTtcblxuLy8qXG4vLyBUaGUgbmFtZSBvZiBjbGFzc2VzIHJlbGV2YW50IHRvIGBJZnJhbWVgIGFuZCBgQ29tbXVuaWNhdG9yYC5cbi8vIEBvYmplY3RcblxudmFyIGNsYXNzZXMgPSB7XG4gIHJvb3Q6IFwiaWZyYW1lXCIsXG4gIGNvbnRlbnQ6IFwiaWZyYW1lX19jb250ZW50XCJcbn07XG5cbi8vKlxuLy8gVGhlIG5hbWUgb2YgYXR0cmlidXRlcyByZWxldmFudCB0byBgSWZyYW1lYCBhbmQgYENvbW11bmljYXRvcmAuXG4vLyBAb2JqZWN0XG5cbnZhciBhdHRycyA9IHtcbiAgaWQ6IFwiZGF0YS1pZnJhbWUtaWRcIlxufTtcblxuLy8qXG4vLyBUaGUgcG9zc2libGUgcG9zaXRpb25zIG9mIGFuIFtgSWZyYW1lYF0oQGxpbmspIOKAlMKgZWl0aGVyIHRoZSBwYXJlbnQgKG9uIHRoZVxuLy8gbWFpbiBwYWdlKSBvciB0aGUgY2hpbGQgKGVtYmVkZGVkIGluc2lkZSBhbiBgaWZyYW1lYCkuXG4vL1xuLy8gQG9iamVjdFxuLy8gQHByaXZhdGVcblxudmFyIHBvc2l0aW9ucyA9IHtcbiAgcGFyZW50OiBcInBhcmVudFwiLFxuICBjaGlsZDogXCJjaGlsZFwiXG59O1xuXG4vLypcbi8vIEEgc2V0IG9mIGV2ZW50cyByZWdpc3RlcmVkIHdpdGggW2BFdmVudHNgXShAbGluaykgdGhhdCByZWxhdGUgc3BlY2lmaWNhbGx5XG4vLyB0byBmZWF0dXJlcyBtYW5hZ2VkIGJ5IHRoZSBjb3JlIGBJZnJhbWVgLlxuLy9cbi8vIEBvYmplY3Rcbi8vIEBwcml2YXRlXG5cbnZhciBpZnJhbWVfZXZlbnRzID0gW1wibWFya3VwX3JlcXVlc3RcIiwgXCJtYXJrdXBfcmVxdWVzdFwiLCBcImhlaWdodF9jaGFuZ2VcIiwgXCJtYXJrdXBfY2hhbmdlXCIsIFwiY2xhc3NfY2hhbmdlXCIsIFwiaGVpZ2h0X3JlcXVlc3RcIiwgXCJldmVudF9oYW5kbGVyXCJdO1xuXG5fdXRpbGl0aWVzRXZlbnRzMltcImRlZmF1bHRcIl0ucmVnaXN0ZXIuYXBwbHkoX3V0aWxpdGllc0V2ZW50czJbXCJkZWZhdWx0XCJdLCBpZnJhbWVfZXZlbnRzKTtcblxudmFyIGlmcmFtZXMgPSBbXTtcbnZhciBJZnJhbWUsIENvbW11bmljYXRvcjtcblxuLy8qXG4vLyBBIG1lY2hhbmlzbSBmb3IgY29tbXVuaWNhdGluZyBiZXR3ZWVuIGEgZ2l2ZW4gY29tcG9uZW50IGFuZCBvbmUgb3IgbW9yZVxuLy8gW2BJZnJhbWVgc10oQGxpbmsgSWZyYW1lKS5cbi8vXG4vLyBAZmFjdG9yeWtcblxuZXhwb3J0cy5Db21tdW5pY2F0b3IgPSBDb21tdW5pY2F0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBwcml2YXRlX2lmcmFtZXMgPSBbXSxcbiAgICAgIGFjdGlvbnMgPSB7fTtcblxuICB2YXIgY29tbXVuaWNhdG9yID0ge1xuXG4gICAgLy8qXG4gICAgLy8gVHJpZ2dlciBhbiBldmVudCB3aXRoIHRoZSBwcm92aWRlZCBkYXRhIHRvIGFsbCBhdHRhY2hlZCBpZnJhbWVzLlxuICAgIC8vXG4gICAgLy8gQG1ldGhvZFxuICAgIC8vXG4gICAgLy8gQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCB0byB0cmlnZ2VyLiBEbyBub3QgcGFzcyBhIHN0cmluZ1xuICAgIC8vIGxpdGVyYWwg4oCUwqBpbnN0ZWFkLCBwYXNzIGFuIGV2ZW50IGRlZmluZWQgb24gW2BFdmVudHMudHlwZXNgXShAbGluaykuXG4gICAgLy9cbiAgICAvLyBAcGFyYW0geyp9IGRhdGEgLSBBbnkgcGllY2Ugb2YgZGF0YSB0aGF0IGNhbiBiZSBzdHJpbmdpZmllZCBieVxuICAgIC8vIGBKU09OLnN0cmluZ2lmeWAuXG5cbiAgICB0cmlnZ2VyOiBmdW5jdGlvbiB0cmlnZ2VyKHR5cGUsIGRhdGEpIHtcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBfZ2V0SXRlcmF0b3IocHJpdmF0ZV9pZnJhbWVzKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBwcml2YXRlX2lmcmFtZSA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgcHJpdmF0ZV9pZnJhbWUudHJpZ2dlcih0eXBlLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcltcInJldHVyblwiXSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLypcbiAgICAvLyBBZGQgYSBsaXN0ZW5lciBmb3Igd2hlbiBhbiBgSWZyYW1lYCBpcyB0cmlnZ2VyZWQgd2l0aCB0aGUgcGFzc2VkIGBldmVudGAuXG4gICAgLy9cbiAgICAvLyBAbWV0aG9kXG4gICAgLy9cbiAgICAvLyBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFRoZSB0eXBlIG9mIGV2ZW50IHRvIGxpc3RlbiBmb3IuIERvIG5vdCBwYXNzIGFcbiAgICAvLyBzdHJpbmcgbGl0ZXJhbCDigJTCoGluc3RlYWQsIHBhc3MgYW4gZXZlbnQgZGVmaW5lZCBvblxuICAgIC8vIFtgRXZlbnRzLnR5cGVzYF0oQGxpbmspLlxuICAgIC8vXG4gICAgLy8gQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uIC0gVGhlIGNhbGxiYWNrIHRvIHJ1biB3aGVuIHRoZSBldmVudCBpc1xuICAgIC8vIHRyaWdnZXJlZC5cbiAgICAvL1xuICAgIC8vIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24uZGF0YSAtIFRoZSBkYXRhIHRoYXQgd2FzIHBhc3NlZCBhbG9uZyB0byB0aGVcbiAgICAvLyBbYElmcmFtZSN0cmlnZ2VyYF0oQGxpbmspIHRoYXQgZ2VuZXJhdGVkIHRoaXMgZXZlbnQuXG5cbiAgICBvbjogZnVuY3Rpb24gb24oZXZlbnQsIGFjdGlvbikge1xuICAgICAgYWN0aW9uc1tldmVudF0gPSBhY3Rpb25zW2V2ZW50XSB8fCBbXTtcbiAgICAgIGFjdGlvbnNbZXZlbnRdLnB1c2goYWN0aW9uKTtcbiAgICB9LFxuXG4gICAgLy8qXG4gICAgLy8gUmVjZWl2ZXMgdGhlIGRhdGEgZm9yIGFuIGV2ZW50IGFuZCBjbGFscyBhbGwgYXNzb2NpYXRlZCBldmVudCBoYW5kbGVycy5cbiAgICAvLyBUaGlzIGlzIHByaW1hcmlseSBwcm92aWRlZCBzbyB0aGF0IHRoZSBgSWZyYW1lYCBjYW4gY2FsbCB0aGlzIG1ldGhvZCBmb3JcbiAgICAvLyBhbGwgbGlzdGVuZXJzIHRoYXQgaGF2ZSBiZWVuIHJlZ2lzdGVyZWQgd2l0aCBpdC5cbiAgICAvL1xuICAgIC8vIEBtZXRob2RcbiAgICAvL1xuICAgIC8vIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIEFsbCBvZiB0aGUgZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50LlxuXG4gICAgcmVjZWl2ZTogZnVuY3Rpb24gcmVjZWl2ZShldmVudCkge1xuICAgICAgdmFyIGV2ZW50X2FjdGlvbnMgPSBhY3Rpb25zW2V2ZW50LnR5cGVdO1xuICAgICAgaWYgKCFldmVudF9hY3Rpb25zKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gX2dldEl0ZXJhdG9yKGFjdGlvbnMpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgYWN0aW9uID0gX3N0ZXAyLnZhbHVlO1xuICAgICAgICAgIGFjdGlvbihldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMltcInJldHVyblwiXSkge1xuICAgICAgICAgICAgX2l0ZXJhdG9yMltcInJldHVyblwiXSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vKlxuICAgIC8vIEFuIG9iamVjdCB0aGF0IHdyYXBzIGFsbCBvZiB0aGUgcmVnaXN0ZXJpbmcgZnVuY3Rpb25hbGl0eS5cbiAgICAvL1xuICAgIC8vIEBwcm9wZXJ0eVxuICAgIC8vIEBvYmplY3RcblxuICAgIHJlZ2lzdGVyOiB7XG5cbiAgICAgIC8vKlxuICAgICAgLy8gUmVnaXN0ZXJzIHRoaXMgYENvbW11bmljYXRvcmAgd2l0aCB0aGUgcGFzc2VkIElEIG9yIGBpZnJhbWVgIG5vZGUuXG4gICAgICAvL1xuICAgICAgLy8gQG1ldGhvZFxuICAgICAgLy9cbiAgICAgIC8vIEBwYXJhbSB7U3RyaW5nIHwgSFRNTEVsZW1lbnR9IGlkIC0gVGhlIGBpZnJhbWVgIHRvIHJlZ2lzdGVyIHdpdGguIElmXG4gICAgICAvLyBhIGBTdHJpbmdgIGlzIHBhc3NlZCwgaXQgc2hvdWxkIG1hdGNoIHNvbWUgYGlmcmFtZWAncyBgZGF0YS1pZnJhbWUtaWRgXG4gICAgICAvLyBhdHRyaWJ1dGUuIE90aGVyd2lzZSwgeW91IHNob3VsZCBwYXNzIHRoZSBhY3R1YWwgYGlmcmFtZWAgbm9kZSB0b1xuICAgICAgLy8gcmVnaXN0ZXIgd2l0aC5cbiAgICAgIC8vXG4gICAgICAvLyBAcmV0dXJucyBCb29sZWFuIC0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHJlZ2lzdHJhdGlvbiB3YXMgc3VjY2Vzc2Z1bCxcbiAgICAgIC8vIGFuZCBmYWxzZSBvdGhlcndpc2UuXG5cbiAgICAgIHdpdGhfaWZyYW1lOiBmdW5jdGlvbiB3aXRoX2lmcmFtZShpZCkge1xuICAgICAgICB2YXIgaWZyYW1lID0gSWZyYW1lW1wiZm9yXCJdKGlkKSxcbiAgICAgICAgICAgIHJlZ2lzdGVyZWQgPSAhIWlmcmFtZSAmJiBpZnJhbWUucmVnaXN0ZXIoY29tbXVuaWNhdG9yKTtcblxuICAgICAgICBpZiAocmVnaXN0ZXJlZCkge1xuICAgICAgICAgIHByaXZhdGVfaWZyYW1lcy5wdXNoKGlmcmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVyZWQ7XG4gICAgICB9LFxuXG4gICAgICAvLypcbiAgICAgIC8vIFJlZ2lzdGVycyB0aGlzIGBDb21tdW5pY2F0b3JgIHdpdGggdGhlIGBpZnJhbWVgIHdob3NlIGBkYXRhLWlmcmFtZS1pZGBcbiAgICAgIC8vIG1hdGNoZXMgdGhhdCBvZiB0aGUgcGFzc2VkIG5vZGUuXG4gICAgICAvL1xuICAgICAgLy8gQG1ldGhvZFxuICAgICAgLy9cbiAgICAgIC8vIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgLSBUaGUgbm9kZSB0byBtYXRjaCB0byBhbiBgaWZyYW1lYC5cbiAgICAgIC8vXG4gICAgICAvLyBAcmV0dXJucyBCb29sZWFuIC0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHJlZ2lzdHJhdGlvbiB3YXMgc3VjY2Vzc2Z1bCxcbiAgICAgIC8vIGFuZCBmYWxzZSBvdGhlcndpc2UuXG5cbiAgICAgIGZyb21fbm9kZTogZnVuY3Rpb24gZnJvbV9ub2RlKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2l0aF9pZnJhbWUobm9kZS5nZXRBdHRyaWJ1dGUoYXR0cnMuaWQpKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vKlxuICAgICAgLy8gUmVnaXN0ZXJzIHRoaXMgYENvbW11bmljYXRvcmAgd2l0aCBhbGwgYGlmcmFtZWBzIG9uIHRoZSBwYWdlLlxuICAgICAgLy9cbiAgICAgIC8vIEBtZXRob2RcbiAgICAgIC8vXG4gICAgICAvLyBAcmV0dXJucyBCb29sZWFuIC0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlcmUgYXJlIGBpZnJhbWVgcyBvbiB0aGUgcGFnZSxcbiAgICAgIC8vIGFuZCBmYWxzZSBvdGhlcndpc2UuXG5cbiAgICAgIHdpdGhfYWxsOiBmdW5jdGlvbiB3aXRoX2FsbCgpIHtcbiAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMyA9IGZhbHNlO1xuICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMyA9IF9nZXRJdGVyYXRvcihpZnJhbWVzKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgaWZyYW1lID0gX3N0ZXAzLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy53aXRoX2lmcmFtZShpZnJhbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IzID0gdHJ1ZTtcbiAgICAgICAgICBfaXRlcmF0b3JFcnJvcjMgPSBlcnI7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgJiYgX2l0ZXJhdG9yM1tcInJldHVyblwiXSkge1xuICAgICAgICAgICAgICBfaXRlcmF0b3IzW1wicmV0dXJuXCJdKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjMpIHtcbiAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpZnJhbWUubGVuZ3RoID4gMDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGNvbW11bmljYXRvcjtcbn07XG5cbi8vKlxuLy8gQ2FjaGVzIGFsbCBvZiB0aGUgaW50ZXJuYWwgZGV0YWlscyBmb3IgYW4gW2BJZnJhbWVgXShAbGluaykuXG4vL1xuLy8gQHByaXZhdGVcbi8vIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgLSBUaGUgbm9kZSBiYWNraW5nIHRoZSBgSWZyYW1lYC4gVGhpcyBjYW4gYmUgZWl0aGVyXG4vLyBhbiBhY3R1YWwgYGlmcmFtZWAgKGluIHRoZSBjYXNlIG9mIHRoZSBwYXJlbnQpIG9yIHRoZSB3cmFwcGluZyBlbGVtZW50IG9mXG4vLyBhIGRlbW8gdGhhdCBpcyBhY3R1YWxseSBpbiB0aGUgYGlmcmFtZWAuXG4vL1xuLy8gQHJldHVybnMgT2JqZWN0IC0gVGhlIHByaXZhdGUsIGludGVybmFsIGRldGFpbHMgb2YgdGhlIGBJZnJhbWVgLlxuXG5mdW5jdGlvbiBjcmVhdGVfc2VsZihub2RlKSB7XG4gIHZhciBzZWxmID0ge1xuICAgIG5vZGU6IG5vZGUsXG4gICAgaWQ6IG5vZGUuZ2V0QXR0cmlidXRlKGF0dHJzLmlkKSxcbiAgICByZWFkeTogZmFsc2UsXG4gICAgbGlzdGVuZXJzOiBbXSxcbiAgICBtZXNzYWdlX3F1ZXVlOiBbXSxcbiAgICBtZXNzYWdlOiBmdW5jdGlvbiBtZXNzYWdlKGRhdGEpIHtcbiAgICAgIHRoaXMubWVzc2FnZV90YXJnZXQucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkoZGF0YSksIFwiKlwiKTtcbiAgICB9LFxuICAgIHF1ZXVlOiBmdW5jdGlvbiBxdWV1ZShkYXRhKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VfcXVldWUucHVzaChkYXRhKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlmcmFtZVwiKSB7XG4gICAgX09iamVjdCRhc3NpZ24oc2VsZiwgeyBwb3NpdGlvbjogcG9zaXRpb25zLnBhcmVudCwgbWVzc2FnZV90YXJnZXQ6IG5vZGUuY29udGVudFdpbmRvdyB9KTtcbiAgfSBlbHNlIHtcbiAgICBfT2JqZWN0JGFzc2lnbihzZWxmLCB7IHBvc2l0aW9uOiBwb3NpdGlvbnMuY2hpbGQsIG1lc3NhZ2VfdGFyZ2V0OiB3aW5kb3cucGFyZW50IH0pO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbi8vKlxuLy8gU2V0cyB1cCBhbGwgcmVxdWlyZWQgZXZlbnQgbGlzdGVuZXJzIGZvciBhbiBbYElmcmFtZWBdKEBsaW5rKSwgaW5jbHVkaW5nIHRoZVxuLy8gbGlzdGVuZXIgZm9yIGBwb3N0TWVzc2FnZWAgYW5kIGxpc3RlbmVycyBvbiB0aGUgcmVsZXZhbnQgYGlmcmFtZWAgZm9yIHRoZVxuLy8gYGxvYWRgIGV2ZW50IChhcyBhIGhvb2sgdG8gcnVuIHRoZSBmaXJzdCBzZXQgb2YgZXZlbnRzKS5cbi8vXG4vLyBAcHJpdmF0ZVxuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhbiBbYElmcmFtZWBdKEBsaW5rKS5cblxuZnVuY3Rpb24gYWRkX2V2ZW50X2xpc3RlbmVycyhzZWxmKSB7XG4gIHNlbGYubm9kZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5yZWFkeSA9IHRydWU7XG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3I0ID0gZmFsc2U7XG4gICAgdmFyIF9pdGVyYXRvckVycm9yNCA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3I0ID0gX2dldEl0ZXJhdG9yKHNlbGYubWVzc2FnZV9xdWV1ZSksIF9zdGVwNDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IChfc3RlcDQgPSBfaXRlcmF0b3I0Lm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gdHJ1ZSkge1xuICAgICAgICB2YXIgcXVldWVkX21lc3NhZ2UgPSBfc3RlcDQudmFsdWU7XG4gICAgICAgIHNlbGYubWVzc2FnZShxdWV1ZWRfbWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZGlkSXRlcmF0b3JFcnJvcjQgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3I0ID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ICYmIF9pdGVyYXRvcjRbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICBfaXRlcmF0b3I0W1wicmV0dXJuXCJdKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjQpIHtcbiAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxmLm1lc3NhZ2VfcXVldWUgPSBbXTtcbiAgfSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICh0eXBlb2YgZXZlbnQuZGF0YSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcbiAgICBpZiAoZGF0YS5pZCAhPT0gc2VsZi5pZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNSA9IHRydWU7XG4gICAgdmFyIF9kaWRJdGVyYXRvckVycm9yNSA9IGZhbHNlO1xuICAgIHZhciBfaXRlcmF0b3JFcnJvcjUgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yNSA9IF9nZXRJdGVyYXRvcihzZWxmLmxpc3RlbmVycyksIF9zdGVwNTsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNSA9IChfc3RlcDUgPSBfaXRlcmF0b3I1Lm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241ID0gdHJ1ZSkge1xuICAgICAgICB2YXIgbGlzdGVuZXIgPSBfc3RlcDUudmFsdWU7XG4gICAgICAgIGxpc3RlbmVyLnJlY2VpdmUoZGF0YSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZGlkSXRlcmF0b3JFcnJvcjUgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3I1ID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241ICYmIF9pdGVyYXRvcjVbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICBfaXRlcmF0b3I1W1wicmV0dXJuXCJdKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjUpIHtcbiAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG4vLypcbi8vIE1vdmVzIHRoZSBtYXJrdXAgZm9yIGZvciBhbiBpZnJhbWUgaW50byB0aGUgYWN0dWFsIGlmcmFtZS4gVGhpcyBsb29rcyBmb3IgdGhlXG4vLyBgaWZyYW1lX19jb250ZW50YCBzaWJsaW5nIG5vZGUgb2YgdGhlIGlmcmFtZSwgdGFrZXMgaXRzIGlubmVyIEhUTUwsIGRlY29kZXNcbi8vIHRoZSBlc2NhcGVkIGVudGl0aWVzLCBhbmQgd3JpdGVzIHRoZSBlbnRpcmV0eSBvZiB0aGUgcmVzdWx0aW5nIHN0cmluZyAod2hpY2hcbi8vIGluY2x1ZGVzIHRoZSBIVE1MIGVsZW1lbnQgYW5kIGFsbCBjaGlsZHJlbikgdG8gdGhlIGlmcmFtZSdzIHdpbmRvdy5cbi8vXG4vLyBAcHJpdmF0ZVxuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhbiBbYElmcmFtZWBdKEBsaW5rKS5cblxuZnVuY3Rpb24gbW92ZV9tYXJrdXBfdG9faWZyYW1lKHNlbGYpIHtcbiAgdmFyIGlmcmFtZSA9IHNlbGYubm9kZSxcbiAgICAgIGlmcmFtZV9jb250ZW50ID0gaWZyYW1lLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi5cIiArIGNsYXNzZXMuY29udGVudCksXG4gICAgICBpZnJhbWVfd2luZG93ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3c7XG5cbiAgaWYgKCEoaWZyYW1lX2NvbnRlbnQgJiYgaWZyYW1lX3dpbmRvdykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZnJhbWVfd2luZG93LmRvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lX3dpbmRvdy5kb2N1bWVudC53cml0ZSgoMCwgX3V0aWxpdGllc01hcmt1cC5kZWNvZGVfaHRtbF9lbnRpdGllcykoaWZyYW1lX2NvbnRlbnQuaW5uZXJIVE1MKSk7XG4gIGlmcmFtZV93aW5kb3cuZG9jdW1lbnQuY2xvc2UoKTtcbn1cblxuLy8qXG4vLyBUaGUgb2JqZWN0IHRoYXQgbWFuYWdlcyBjb21tdW5pY2F0aW9uIGJldHdlZW4gdGhlIHBhcmVudCBwYWdlIGFuZCBhXG4vLyBkb2N1bWVudCBlbWJlZGRlZCBpbiBhbiBgaWZyYW1lYC4gRXNzZW50aWFsbHksIGNvbXBvbmVudHMgY2FuIHJlZ2lzdGVyIG9uXG4vLyBlaXRoZXIgc2lkZSBvZiB0aGUgY29pbiB3aXRoIHRoZSBgSWZyYW1lYCBmb3IgdGhhdCBzaWRlLiBUaGV5IGNhbiB0aGVuXG4vLyBzZW5kIG1lc3NhZ2VzLCB3aGljaCBnZXQgdHJpZ2dlcmVkIG9uIHRoZSBvdGhlciBzaWRlLCBhbmQgY2FuIGxpc3RlbiBmb3Jcbi8vIGV2ZW50cyBzZW50IGZyb20gdGhlIG90aGVyIHNpZGUuIFRoZSByZWdpc3RlcmluZyBhbmQgc2VuZGluZy8gbGlzdGVuaW5nIGlzXG4vLyBhbGwgaGFuZGxlZCBieSBbYENvbW11bmljYXRvcmBdKEBsaW5rKTsgdGhlIGBJZnJhbWVgIHNpbXBseSBtYW5hZ2VzIHRoZVxuLy8gdGhlIHBhc3Npbmcgb2YgZXZlbnRzIGJldHdlZW4gdGhlIHR3byBzaWRlcyBhbmQgdGhlIGNhbGxpbmcgb2YgZXZlbnRcbi8vIGhhbmRsZXJzIGluIGxpc3RlbmVycyB0aGF0IGhhdmUgYmVlbiByZWdpc3RlcmVkLlxuLy9cbi8vIEBmYWN0b3J5XG4vL1xuLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSAtIFRoZSBhY3R1YWwgYGlmcmFtZWAgbm9kZSAoaWYgaW4gdGhlIHBhcmVudCkgb3Jcbi8vIHRoZSB3cmFwcGVyIG5vZGUgKGlmIGluIHRoZSBjaGlsZCkgdGhhdCB3aWxsIGFjdCBhcyB0aGUgcm9vdCBmb3IgdGhlXG4vLyBgSWZyYW1lYC5cblxuSWZyYW1lID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgdmFyIHNlbGYgPSBjcmVhdGVfc2VsZihub2RlKTtcbiAgbW92ZV9tYXJrdXBfdG9faWZyYW1lKHNlbGYpO1xuICBhZGRfZXZlbnRfbGlzdGVuZXJzKHNlbGYpO1xuXG4gIHJldHVybiB7XG5cbiAgICAvLypcbiAgICAvLyBUcmlnZ2VyIGEgcGFydGljdWxhciBldmVudCwgc3VjaCB0aGF0IGl0IGdldHMgc2VudCB0byB0aGUgb3RoZXIgc2lkZSBvZlxuICAgIC8vIHRoZSBgaWZyYW1lYCBicmlkZ2UuIElmIHRoZSBgaWZyYW1lYCBoYXMgbm90IHlldCBsb2FkZWQsIHRoZSBtZXNzYWdlXG4gICAgLy8gd2lsbCBiZSBxdWV1ZWQgZm9yIHdoZW4gdGhlIGBpZnJhbWVgIGNvbW11bmljYXRpb24gaXMgYXZhaWxhYmxlLlxuICAgIC8vXG4gICAgLy8gQG1ldGhvZFxuICAgIC8vXG4gICAgLy8gQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCB0byB0cmlnZ2VyLiBEbyBub3QgcGFzcyBhIHN0cmluZ1xuICAgIC8vIGxpdGVyYWw7IGluc3RlYWQsIHBhc3MgYW4gZXZlbnQgZGVmaW5lZCBvbiBbYEV2ZW50cy50eXBlc2BdKEBsaW5rKS5cbiAgICAvL1xuICAgIC8vIEBwYXJhbSB7Kn0gW2RhdGEgPSB7fV0gLSBUaGUgZGF0YSB0byBwYXNzIHRvIHRoZSBjb3JyZXNwb25kaW5nIGBJZnJhbWVgLlxuICAgIC8vIFRoaXMgY2FuIGJlIGFueXRoaW5nIHRoYXQgY2FuIGJlIHN0cmluZ2lmaWVkIHdpdGggYEpTT04uc3RyaW5naWZ5YC5cblxuICAgIHRyaWdnZXI6IGZ1bmN0aW9uIHRyaWdnZXIodHlwZSkge1xuICAgICAgdmFyIGRhdGEgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICAgICAgZGF0YSA9IF9PYmplY3QkYXNzaWduKHt9LCB7IHR5cGU6IHR5cGUsIGlkOiBzZWxmLmlkIH0sIGRhdGEpO1xuICAgICAgZGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgcmV0dXJuIHNlbGYucmVhZHkgPyBzZWxmLm1lc3NhZ2UoZGF0YSkgOiBzZWxmLnF1ZXVlKGRhdGEpO1xuICAgIH0sXG5cbiAgICAvLypcbiAgICAvLyBSZWdpc3RlcnMgYSBsaXN0ZW5lciBvYmplY3Qgd2l0aCB0aGlzIGBJZnJhbWVgIHRoYXQgd2lsbCBiZSBub3RpZmllZCB3aGVuXG4gICAgLy8gZXZlbnRzIGFyZSByZWNpdmVkIGZyb20gdGhlIG90aGVyIHNpZGUgb2YgdGhlIGBpZnJhbWVgIGJyaWRnZS5cbiAgICAvL1xuICAgIC8vIEBtZXRob2RcbiAgICAvL1xuICAgIC8vIEBwYXJhbSB7Q29tbXVuaWNhdG9yfSBsaXN0ZW5lciAtIFRoZSBvYmplY3QgdGhhdCB3aWxsIHJlY2VpdmUgZXZlbnRzLlxuICAgIC8vXG4gICAgLy8gQHJldHVybnMgQm9vbGVhbiAtIFJldHVybnMgYHRydWVgIGlmIHRoZSByZWdpc3RlciBjYWxsIHdhcyBzdWNjZXNzZnVsXG4gICAgLy8gKHRoYXQgaXMsIHRoZSBsaXN0ZW5lciBoYXMgdGhlIHJlcXVpcmVkIHNpZ25hdHVyZSBhbmQgaXMgbm90IGFscmVhZHlcbiAgICAvLyByZWdpc3RlcmVkKSwgYGZhbHNlYCBvdGhlcndpc2UuXG5cbiAgICByZWdpc3RlcjogZnVuY3Rpb24gcmVnaXN0ZXIobGlzdGVuZXIpIHtcbiAgICAgIGlmIChzZWxmLmxpc3RlbmVycy5pbmNsdWRlcyhsaXN0ZW5lcikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgc2VsZi5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH07XG59O1xuXG4vLypcbi8vIFJldHVybnMgdGhlIFtgSWZyYW1lYF0oQGxpbmspIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhlIHBhc3NlZCBub2RlLCBvclxuLy8gdGhlIGlmcmFtZSB3aG9zZSBJRCBtYXRjaGVzIHRoZSBwYXNzZWQgaWRlbnRpZmllci5cbi8vXG4vLyBAbWV0aG9kXG4vLyBAc3RhdGljXG4vL1xuLy8gQFBhcmFtIHtTdHJpbmcgfCBIVE1MRWxlbWVudH0gaWZyYW1lIC0gSWYgYSBgU3RyaW5nYCBpcyBwYXNzZWQsIHRoZVxuLy8gW2BJZnJhbWVgXShAbGluaykgZm9yIGFuIGBpZnJhbWVgIHdob3NlIGBkYXRhLWlmcmFtZS1pZGAgbWF0Y2hlcyB0aGUgc3RyaW5nLlxuLy8gSWYgYW4gYEhUTUxFbGVtZW50YCBpcyBwYXNzZWQsIHRoZSBbYElmcmFtZWBdKEBsaW5rKSBvYmplY3QgdGhhdCB3YXMgY3JlYXRlZFxuLy8gZm9yIHRoYXQgbm9kZS5cbi8vXG4vLyBAcmV0dXJucyB7SWZyYW1lIHwgQm9vbGVhbn0gLSBJZiBubyBtYXRjaGluZyBgSWZyYW1lYCBpcyBmb3VuZCwgYGZhbHNlYCB3aWxsXG4vLyBiZSByZXR1cm5lZC5cblxuSWZyYW1lW1wiZm9yXCJdID0gZnVuY3Rpb24gKGlmcmFtZSkge1xuICBpZiAodHlwZW9mIGlmcmFtZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBjbGFzc2VzLmJhc2UgKyBcIltcIiArIGF0dHJzLmlkICsgXCI9J1wiICsgaWZyYW1lICsgXCInXVwiKTtcbiAgfVxuXG4gIGlmICghaWZyYW1lKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoMCwgX3V0aWxpdGllc0RvbV9jYWNoZTJbXCJkZWZhdWx0XCJdKShpZnJhbWUpLmdldChjbGFzc2VzLnJvb3QpO1xufTtcblxuLy8qXG4vLyBJbml0aWFsaXplcyB0aGUgYElmcmFtZWAgY29tcG9uZW50LlxuLy9cbi8vIEBtZXRob2Rcbi8vIEBzdGF0aWNcbi8vXG4vLyBAcGFyYW0ge0hUTUxFbGVtZW50fSBbY29udGV4dCA9IGRvY3VtZW50XSAtIFRoZSBjb250ZXh0IGluIHdoaWNoIHRvIHNlYXJjaFxuLy8gZm9yIERPTSBub2RlcyB0aGF0IHNob3VsZCBiZSB1c2VkIGFzIHRoZSByb290IG9mIGFuIGBJZnJhbWVgIGNvbXBvbmVudC5cblxuSWZyYW1lLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjb250ZXh0ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQgOiBhcmd1bWVudHNbMF07XG5cbiAgdmFyIGlmcmFtZV9ub2RlcyA9IF9BcnJheSRmcm9tKGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChcIi5cIiArIGNsYXNzZXMucm9vdCkpO1xuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjYgPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3I2ID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvcjYgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3I2ID0gX2dldEl0ZXJhdG9yKGlmcmFtZV9ub2RlcyksIF9zdGVwNjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNiA9IChfc3RlcDYgPSBfaXRlcmF0b3I2Lm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb242ID0gdHJ1ZSkge1xuICAgICAgdmFyIGlmcmFtZSA9IF9zdGVwNi52YWx1ZTtcbiAgICAgIElmcmFtZShpZnJhbWUpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3I2ID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvcjYgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjYgJiYgX2l0ZXJhdG9yNltcInJldHVyblwiXSkge1xuICAgICAgICBfaXRlcmF0b3I2W1wicmV0dXJuXCJdKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjYpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I2O1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0cy5Db21tdW5pY2F0b3IgPSBDb21tdW5pY2F0b3I7XG5leHBvcnRzLmNsYXNzZXMgPSBjbGFzc2VzO1xuZXhwb3J0cy5hdHRycyA9IGF0dHJzO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBJZnJhbWU7XG5cbn0se1wiLi4vLi4vdXRpbGl0aWVzL2RvbV9jYWNoZVwiOjksXCIuLi8uLi91dGlsaXRpZXMvZXZlbnRzXCI6MTAsXCIuLi8uLi91dGlsaXRpZXMvbWFya3VwXCI6MTEsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbVwiOjE2LFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiOjE3LFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ25cIjoxOCxcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiOjI2fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxufSx7fV0sNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxufSx7fV0sODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9jb21wb25lbnRzQXZhdGFyID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hdmF0YXJcIik7XG5cbnZhciBfY29tcG9uZW50c0F2YXRhcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21wb25lbnRzQXZhdGFyKTtcblxudmFyIF9jb21wb25lbnRzQ29kZV9ibG9jayA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY29kZV9ibG9ja1wiKTtcblxudmFyIF9jb21wb25lbnRzQ29kZV9ibG9jazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21wb25lbnRzQ29kZV9ibG9jayk7XG5cbnZhciBfY29tcG9uZW50c0RlbW8gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2RlbW9cIik7XG5cbnZhciBfY29tcG9uZW50c0RlbW8yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcG9uZW50c0RlbW8pO1xuXG52YXIgX2NvbXBvbmVudHNGaWVsZCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvZmllbGRcIik7XG5cbnZhciBfY29tcG9uZW50c0ZpZWxkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbXBvbmVudHNGaWVsZCk7XG5cbnZhciBfY29tcG9uZW50c0lmcmFtZSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvaWZyYW1lXCIpO1xuXG52YXIgX2NvbXBvbmVudHNJZnJhbWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcG9uZW50c0lmcmFtZSk7XG5cbl9jb21wb25lbnRzQXZhdGFyMltcImRlZmF1bHRcIl0uaW5pdCgpO1xuX2NvbXBvbmVudHNJZnJhbWUyW1wiZGVmYXVsdFwiXS5pbml0KCk7XG5fY29tcG9uZW50c0RlbW8yW1wiZGVmYXVsdFwiXS5pbml0KCk7XG5fY29tcG9uZW50c0NvZGVfYmxvY2syW1wiZGVmYXVsdFwiXS5pbml0KCk7XG5fY29tcG9uZW50c0ZpZWxkMltcImRlZmF1bHRcIl0uaW5pdCgpO1xuXG59LHtcIi4vY29tcG9uZW50cy9hdmF0YXJcIjoxLFwiLi9jb21wb25lbnRzL2NvZGVfYmxvY2tcIjoyLFwiLi9jb21wb25lbnRzL2RlbW9cIjozLFwiLi9jb21wb25lbnRzL2ZpZWxkXCI6NCxcIi4vY29tcG9uZW50cy9pZnJhbWVcIjo1LFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCI6MjZ9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8vICAgICAgICBfX18gICAgICAgICAgX19fICAgICAgICAgIF9fXyAgICAgICAgICBfX18gICAgICAgICAgX19fXG4vLyAgICAgICAvICAvXFwgICAgICAgIC8gIC9cXCAgICAgICAgLyAgL1xcICAgICAgICAvX18vXFwgICAgICAgIC8gIC9cXFxuLy8gICAgICAvICAvOi8gICAgICAgLyAgLzo6XFwgICAgICAvICAvOi8gICAgICAgIFxcICBcXDpcXCAgICAgIC8gIC86L19cbi8vICAgICAvICAvOi8gICAgICAgLyAgLzovXFw6XFwgICAgLyAgLzovICAgICAgICAgIFxcX19cXDpcXCAgICAvICAvOi8gL1xcXG4vLyAgICAvICAvOi8gIF9fXyAgLyAgLzovfi86OlxcICAvICAvOi8gIF9fXyAgX19fIC8gIC86OlxcICAvICAvOi8gLzovX1xuLy8gICAvX18vOi8gIC8gIC9cXC9fXy86LyAvOi9cXDpcXC9fXy86LyAgLyAgL1xcL19fL1xcICAvOi9cXDpcXC9fXy86LyAvOi8gL1xcXG4vLyAgIFxcICBcXDpcXCAvICAvOi9cXCAgXFw6XFwvOi9fX1xcL1xcICBcXDpcXCAvICAvOi9cXCAgXFw6XFwvOi9fX1xcL1xcICBcXDpcXC86LyAvOi9cbi8vICAgIFxcICBcXDpcXCAgLzovICBcXCAgXFw6Oi8gICAgICBcXCAgXFw6XFwgIC86LyAgXFwgIFxcOjovICAgICAgXFwgIFxcOjovIC86L1xuLy8gICAgIFxcICBcXDpcXC86LyAgICBcXCAgXFw6XFwgICAgICAgXFwgIFxcOlxcLzovICAgIFxcICBcXDpcXCAgICAgICBcXCAgXFw6XFwvOi9cbi8vICAgICAgXFwgIFxcOjovICAgICAgXFwgIFxcOlxcICAgICAgIFxcICBcXDo6LyAgICAgIFxcICBcXDpcXCAgICAgICBcXCAgXFw6Oi9cbi8vICAgICAgIFxcX19cXC8gICAgICAgIFxcX19cXC8gICAgICAgIFxcX19cXC8gICAgICAgIFxcX19cXC8gICAgICAgIFxcX19cXC9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5mdW5jdGlvbiBDYWNoZSgpIHt9XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQ2FjaGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG59LHt9XSwxMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyAgICAgICAgX19fICAgICAgICAgICAgICAgICAgICAgIF9fXyAgICAgICAgICBfX18gICAgICAgICAgICAgICAgICAgX19fXG4vLyAgICAgICAvICAvXFwgICAgICAgICBfX18gICAgICAgIC8gIC9cXCAgICAgICAgL19fL1xcICAgICAgICAgX19fICAgICAvICAvXFxcbi8vICAgICAgLyAgLzovXyAgICAgICAvX18vXFwgICAgICAvICAvOi9fICAgICAgIFxcICBcXDpcXCAgICAgICAvICAvXFwgICAvICAvOi9fXG4vLyAgICAgLyAgLzovIC9cXCAgICAgIFxcICBcXDpcXCAgICAvICAvOi8gL1xcICAgICAgIFxcICBcXDpcXCAgICAgLyAgLzovICAvICAvOi8gL1xcXG4vLyAgICAvICAvOi8gLzovXyAgICAgIFxcICBcXDpcXCAgLyAgLzovIC86L18gIF9fX19fXFxfX1xcOlxcICAgLyAgLzovICAvICAvOi8gLzo6XFxcbi8vICAgL19fLzovIC86LyAvXFwgX19fICBcXF9fXFw6XFwvX18vOi8gLzovIC9cXC9fXy86Ojo6Ojo6OlxcIC8gIC86OlxcIC9fXy86LyAvOi9cXDpcXFxuLy8gICBcXCAgXFw6XFwvOi8gLzovL19fL1xcIHwgIHw6fFxcICBcXDpcXC86LyAvOi9cXCAgXFw6XFx+flxcfn5cXC8vX18vOi9cXDpcXFxcICBcXDpcXC86L34vOi9cbi8vICAgIFxcICBcXDo6LyAvOi8gXFwgIFxcOlxcfCAgfDp8IFxcICBcXDo6LyAvOi8gIFxcICBcXDpcXCAgfn5+IFxcX19cXC8gIFxcOlxcXFwgIFxcOjovIC86L1xuLy8gICAgIFxcICBcXDpcXC86LyAgIFxcICBcXDpcXF9ffDp8ICBcXCAgXFw6XFwvOi8gICAgXFwgIFxcOlxcICAgICAgICAgIFxcICBcXDpcXFxcX19cXC8gLzovXG4vLyAgICAgIFxcICBcXDo6LyAgICAgXFxfX1xcOjo6Oi8gICAgXFwgIFxcOjovICAgICAgXFwgIFxcOlxcICAgICAgICAgIFxcX19cXC8gIC9fXy86L1xuLy8gICAgICAgXFxfX1xcLyAgICAgICAgICB+fn5+ICAgICAgXFxfX1xcLyAgICAgICAgXFxfX1xcLyAgICAgICAgICAgICAgICAgXFxfX1xcL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9nZXRJdGVyYXRvciA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBFdmVudHMgPSB7XG4gIHJlZ2lzdGVyOiBmdW5jdGlvbiByZWdpc3RlcigpIHtcbiAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBldmVudHMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgZXZlbnRzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBfZ2V0SXRlcmF0b3IoZXZlbnRzKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICB2YXIgZXZlbnQgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICB0aGlzLnR5cGVzW2V2ZW50XSA9IGV2ZW50O1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICBfaXRlcmF0b3JbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgdHlwZXM6IHt9XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEV2ZW50cztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbn0se1wiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiOjE3fV0sMTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy8gICAgICAgIF9fXyAgICAgICAgICBfX18gICAgICAgICAgX19fICAgICAgICAgIF9fXyAgICAgICAgICBfX18gICAgICAgICAgX19fXG4vLyAgICAgICAvX18vXFwgICAgICAgIC8gIC9cXCAgICAgICAgLyAgL1xcICAgICAgICAvX18vfCAgICAgICAgL19fL1xcICAgICAgICAvICAvXFxcbi8vICAgICAgfCAgfDo6XFwgICAgICAvICAvOjpcXCAgICAgIC8gIC86OlxcICAgICAgfCAgfDp8ICAgICAgICBcXCAgXFw6XFwgICAgICAvICAvOjpcXFxuLy8gICAgICB8ICB8Onw6XFwgICAgLyAgLzovXFw6XFwgICAgLyAgLzovXFw6XFwgICAgIHwgIHw6fCAgICAgICAgIFxcICBcXDpcXCAgICAvICAvOi9cXDpcXFxuLy8gICAgX198X198OnxcXDpcXCAgLyAgLzovfi86OlxcICAvICAvOi9+LzovICAgX198ICB8OnwgICAgIF9fXyAgXFwgIFxcOlxcICAvICAvOi9+LzovXG4vLyAgIC9fXy86Ojo6fCBcXDpcXC9fXy86LyAvOi9cXDpcXC9fXy86LyAvOi9fX18vX18vXFxffDp8X19fXy9fXy9cXCAgXFxfX1xcOlxcL19fLzovIC86L1xuLy8gICBcXCAgXFw6XFx+flxcX19cXC9cXCAgXFw6XFwvOi9fX1xcL1xcICBcXDpcXC86Ojo6Oi9cXCAgXFw6XFwvOjo6OjovXFwgIFxcOlxcIC8gIC86L1xcICBcXDpcXC86L1xuLy8gICAgXFwgIFxcOlxcICAgICAgIFxcICBcXDo6LyAgICAgIFxcICBcXDo6L35+fn4gIFxcICBcXDo6L35+fn4gIFxcICBcXDpcXCAgLzovICBcXCAgXFw6Oi9cbi8vICAgICBcXCAgXFw6XFwgICAgICAgXFwgIFxcOlxcICAgICAgIFxcICBcXDpcXCAgICAgICBcXCAgXFw6XFwgICAgICAgXFwgIFxcOlxcLzovICAgIFxcICBcXDpcXFxuLy8gICAgICBcXCAgXFw6XFwgICAgICAgXFwgIFxcOlxcICAgICAgIFxcICBcXDpcXCAgICAgICBcXCAgXFw6XFwgICAgICAgXFwgIFxcOjovICAgICAgXFwgIFxcOlxcXG4vLyAgICAgICBcXF9fXFwvICAgICAgICBcXF9fXFwvICAgICAgICBcXF9fXFwvICAgICAgICBcXF9fXFwvICAgICAgICBcXF9fXFwvICAgICAgICBcXF9fXFwvXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2dldEl0ZXJhdG9yID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3ZlbmRvckhsanMgPSByZXF1aXJlKFwiLi4vLi4vdmVuZG9yL2hsanNcIik7XG5cbnZhciBfdmVuZG9ySGxqczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92ZW5kb3JIbGpzKTtcblxudmFyIHN0YXJ0X3RhZ190ZXN0ID0gL148W15cXC9dLztcblxuLy8qXG4vLyBUaGUgc2l6ZSBvZiBtYW51YWxseSByZS1pbmRlbnRlZCBjb2RlLlxuLy9cbi8vIEBwcml2YXRlXG4vLyBAdHlwZSBOdW1iZXJcbi8vIEB2YWx1ZSAyXG5cbnZhciBlbmRfdGFnX3Rlc3QgPSAvXjxcXC8vO1xudmFyIGNvbnRhaW5zX2VuZF90YWcgPSAvPFxcLy87XG52YXIgSU5ERU5UQVRJT05fU0laRSA9IDI7XG5cbmZ1bmN0aW9uIGRlY29kZV9odG1sX2VudGl0aWVzKHN0cmluZykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gc3RyaW5nLnRyaW0oKTtcblxuICByZXR1cm4gZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCA/IFwiXCIgOiBlbGVtZW50LmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlIHx8IGVsZW1lbnQuaW5uZXJIVE1MO1xufVxuXG4vLypcbi8vIEluZGVudHMgSFRNTCBtYXJrdXAgYnkgZmluZGluZyBvcGVuaW5nIGFuZCBjbG9zaW5nIEhUTUwgdGFncy5cbi8vXG4vLyBAcGFyYW0ge1N0cmluZ30gY29kZSAtIFRoZSByYW5kb21seS1lc2NhcGVkIEhUTUwgc3RyaW5nLlxuLy8gQHJldHVybnMge1N0cmluZ30gVGhlIGluZGVudGVkIHN0cmluZy5cblxuZnVuY3Rpb24gaW5kZW50KG1hcmt1cCkge1xuICB2YXIgaW5kZW50X2NvdW50ID0gLUlOREVOVEFUSU9OX1NJWkUsXG4gICAgICBpbmRlbnRlZF9tYXJrdXAgPSBbXSxcbiAgICAgIG1hcmt1cF9saW5lcyA9IG1hcmt1cC5zcGxpdChcIlxcblwiKSxcbiAgICAgIHN0YXJ0X3RhZyxcbiAgICAgIGVuZF90YWc7XG5cbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2dldEl0ZXJhdG9yKG1hcmt1cF9saW5lcyksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgIHZhciBtYXJrdXBfbGluZSA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICBtYXJrdXBfbGluZSA9IG1hcmt1cF9saW5lLnRyaW0oKTtcbiAgICAgIHN0YXJ0X3RhZyA9IHN0YXJ0X3RhZ190ZXN0LnRlc3QobWFya3VwX2xpbmUpO1xuICAgICAgZW5kX3RhZyA9IGVuZF90YWdfdGVzdC50ZXN0KG1hcmt1cF9saW5lKTtcblxuICAgICAgaWYgKHN0YXJ0X3RhZykge1xuICAgICAgICBpbmRlbnRfY291bnQgKz0gSU5ERU5UQVRJT05fU0laRTtcbiAgICAgIH1cbiAgICAgIGluZGVudF9jb3VudCA9IE1hdGgubWF4KGluZGVudF9jb3VudCwgMCk7XG5cbiAgICAgIGlmIChpbmRlbnRfY291bnQgPiAwKSB7XG4gICAgICAgIG1hcmt1cF9saW5lID0gXCJcIiArIEFycmF5KGluZGVudF9jb3VudCArIDEpLmpvaW4oXCIgXCIpICsgbWFya3VwX2xpbmU7XG4gICAgICB9XG5cbiAgICAgIGluZGVudGVkX21hcmt1cC5wdXNoKG1hcmt1cF9saW5lKTtcbiAgICAgIGlmIChlbmRfdGFnKSB7XG4gICAgICAgIGluZGVudF9jb3VudCAtPSBJTkRFTlRBVElPTl9TSVpFO1xuICAgICAgfVxuICAgICAgaWYgKCFlbmRfdGFnICYmIGNvbnRhaW5zX2VuZF90YWcudGVzdChtYXJrdXBfbGluZSkpIHtcbiAgICAgICAgaW5kZW50X2NvdW50IC09IElOREVOVEFUSU9OX1NJWkU7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gaW5kZW50ZWRfbWFya3VwLmpvaW4oXCJcXG5cIik7XG59XG5cbmZ1bmN0aW9uIGNsZWFuKGNvZGUpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICBpZiAoIWNvZGUpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvZGUgPSBkZWNvZGVfaHRtbF9lbnRpdGllcyhjb2RlKTtcbiAgY29kZSA9IGNvZGUudHJpbSgpO1xuICBpZiAob3B0aW9ucy5jb2xsYXBzZV9uZXdsaW5lcykge1xuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcbl5cXHMqXFxuL21nLCBcIlxcblwiKTtcbiAgfVxuXG4gIC8vIEtpbGxzIGFueSBsZWFkaW5nIHNwYWNlcyBmcm9tIGVhY2ggbGluZVxuICB2YXIgbGVhZGluZ19zcGFjZXMgPSBjb2RlLm1hdGNoKC9eXFxzKi8pO1xuICBpZiAobGVhZGluZ19zcGFjZXMpIHtcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJeXFxcXHN7XCIgKyBsZWFkaW5nX3NwYWNlc1swXS5sZW5ndGggKyBcIn1cIiwgXCJnbVwiKSwgXCJcIik7XG4gIH1cblxuICByZXR1cm4gY29kZTtcbn1cblxuZnVuY3Rpb24gaGlnaGxpZ2h0KGNvZGUpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICByZXR1cm4gX3ZlbmRvckhsanMyW1wiZGVmYXVsdFwiXS5oaWdobGlnaHQob3B0aW9ucy5sYW5ndWFnZV9jb2RlIHx8IFwiaHRtbFwiLCBjb2RlKS52YWx1ZTtcbn1cblxuZXhwb3J0cy5kZWNvZGVfaHRtbF9lbnRpdGllcyA9IGRlY29kZV9odG1sX2VudGl0aWVzO1xuZXhwb3J0cy5pbmRlbnQgPSBpbmRlbnQ7XG5leHBvcnRzLmNsZWFuID0gY2xlYW47XG5leHBvcnRzLmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcblxufSx7XCIuLi8uLi92ZW5kb3IvaGxqc1wiOjE1LFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiOjE3LFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCI6MjZ9XSwxMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmZ1bmN0aW9uIGZvcmNlX3JlcGFpbnQoKSB7XG4gIHZhciBub2RlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQgOiBhcmd1bWVudHNbMF07XG5cbiAgcmV0dXJuIG5vZGUub2Zmc2V0SGVpZ2h0ICYmIG5vZGUub2Zmc2V0V2lkdGg7XG59XG5cbmV4cG9ydHMuZm9yY2VfcmVwYWludCA9IGZvcmNlX3JlcGFpbnQ7XG5cbn0se31dLDEzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG59LHt9XSwxNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyBUT0RPXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0aWVzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXNcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX1Byb21pc2UgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2VcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIFVJRXZlbnRzID0gX09iamVjdCRkZWZpbmVQcm9wZXJ0aWVzKHtcblxuICBkcmFnOiBfT2JqZWN0JGRlZmluZVByb3BlcnRpZXMoe30sIHtcbiAgICBzdGFydDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBcIm1vdXNlZG93blwiO1xuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIG1vdmU6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gXCJtb3VzZW1vdmVcIjtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBlbmQ6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gXCJtb3VzZXVwXCI7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSksXG5cbiAgdHJhbnNpdGlvbjogZnVuY3Rpb24gdHJhbnNpdGlvbihub2RlLCBjYWxsYmFjaykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IF9Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICB2YXIgdHJhbnNpdGlvbl9lbmQgPSBfdGhpcy50cmFuc2l0aW9uX2VuZDtcblxuICAgICAgaWYgKHRyYW5zaXRpb25fZW5kKSB7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uX2VuZCwgcmVzb2x2ZSk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0sIHtcbiAgdHJhbnNpdGlvbl9lbmQ6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciB0cmFuc2l0aW9ucyA9IHtcbiAgICAgICAgV2Via2l0VHJhbnNpdGlvbjogXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCIsXG4gICAgICAgIE1velRyYW5zaXRpb246IFwidHJhbnNpdGlvbmVuZFwiLFxuICAgICAgICBPVHJhbnNpdGlvbjogXCJvdHJhbnNpdGlvbmVuZFwiLFxuICAgICAgICB0cmFuc2l0aW9uOiBcInRyYW5zaXRpb25lbmRcIlxuICAgICAgfTtcblxuICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgICAgICAgIGV2ZW50X25hbWUgPSBudWxsO1xuXG4gICAgICBmb3IgKHZhciB0cmFuc2l0aW9uIGluIHRyYW5zaXRpb25zKSB7XG4gICAgICAgIGlmIChlbGVtZW50LnN0eWxlW3RyYW5zaXRpb25dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBldmVudF9uYW1lID0gdHJhbnNpdGlvbnNbdHJhbnNpdGlvbl07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJRXZlbnRzLCBcInRyYW5zaXRpb25fZW5kXCIsIHsgdmFsdWU6IGV2ZW50X25hbWUgfSk7XG4gICAgICByZXR1cm4gZXZlbnRfbmFtZTtcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG4gIH1cbn0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFVJRXZlbnRzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxufSx7XCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzXCI6MjAsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZVwiOjIzfV0sMTU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfT2JqZWN0JGtleXMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9PYmplY3QkY3JlYXRlID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlXCIpW1wiZGVmYXVsdFwiXTtcblxuIShmdW5jdGlvbiAoZSkge1xuICBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBleHBvcnRzID8gZShleHBvcnRzKSA6ICh3aW5kb3cuaGxqcyA9IGUoe30pLCBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGRlZmluZSAmJiBkZWZpbmUuYW1kICYmIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cuaGxqcztcbiAgfSkpO1xufSkoZnVuY3Rpb24gKGUpIHtcbiAgZnVuY3Rpb24gbihlKSB7XG4gICAgcmV0dXJuIGUucmVwbGFjZSgvJi9nbSwgXCImYW1wO1wiKS5yZXBsYWNlKC88L2dtLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nbSwgXCImZ3Q7XCIpO1xuICB9ZnVuY3Rpb24gdChlKSB7XG4gICAgcmV0dXJuIGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgfWZ1bmN0aW9uIHIoZSwgbikge1xuICAgIHZhciB0ID0gZSAmJiBlLmV4ZWMobik7cmV0dXJuIHQgJiYgMCA9PSB0LmluZGV4O1xuICB9ZnVuY3Rpb24gYShlKSB7XG4gICAgdmFyIG4gPSAoZS5jbGFzc05hbWUgKyBcIiBcIiArIChlLnBhcmVudE5vZGUgPyBlLnBhcmVudE5vZGUuY2xhc3NOYW1lIDogXCJcIikpLnNwbGl0KC9cXHMrLyk7cmV0dXJuIChuID0gbi5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBlLnJlcGxhY2UoL15sYW5nKHVhZ2UpPy0vLCBcIlwiKTtcbiAgICB9KSwgbi5maWx0ZXIoZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBOKGUpIHx8IC9ubygtPyloaWdobGlnaHQvLnRlc3QoZSk7XG4gICAgfSlbMF0pO1xuICB9ZnVuY3Rpb24gbyhlLCBuKSB7XG4gICAgdmFyIHQgPSB7fTtmb3IgKHZhciByIGluIGUpIHRbcl0gPSBlW3JdO2lmIChuKSBmb3IgKHZhciByIGluIG4pIHRbcl0gPSBuW3JdO3JldHVybiB0O1xuICB9ZnVuY3Rpb24gaShlKSB7XG4gICAgdmFyIG4gPSBbXTtyZXR1cm4gKChmdW5jdGlvbiByKGUsIGEpIHtcbiAgICAgIGZvciAodmFyIG8gPSBlLmZpcnN0Q2hpbGQ7IG87IG8gPSBvLm5leHRTaWJsaW5nKSAzID09IG8ubm9kZVR5cGUgPyBhICs9IG8ubm9kZVZhbHVlLmxlbmd0aCA6IDEgPT0gby5ub2RlVHlwZSAmJiAobi5wdXNoKHsgZXZlbnQ6IFwic3RhcnRcIiwgb2Zmc2V0OiBhLCBub2RlOiBvIH0pLCBhID0gcihvLCBhKSwgdChvKS5tYXRjaCgvYnJ8aHJ8aW1nfGlucHV0LykgfHwgbi5wdXNoKHsgZXZlbnQ6IFwic3RvcFwiLCBvZmZzZXQ6IGEsIG5vZGU6IG8gfSkpO3JldHVybiBhO1xuICAgIH0pKGUsIDApLCBuKTtcbiAgfWZ1bmN0aW9uIGMoZSwgciwgYSkge1xuICAgIGZ1bmN0aW9uIG8oKSB7XG4gICAgICByZXR1cm4gZS5sZW5ndGggJiYgci5sZW5ndGggPyBlWzBdLm9mZnNldCAhPSByWzBdLm9mZnNldCA/IGVbMF0ub2Zmc2V0IDwgclswXS5vZmZzZXQgPyBlIDogciA6IFwic3RhcnRcIiA9PSByWzBdLmV2ZW50ID8gZSA6IHIgOiBlLmxlbmd0aCA/IGUgOiByO1xuICAgIH1mdW5jdGlvbiBpKGUpIHtcbiAgICAgIGZ1bmN0aW9uIHIoZSkge1xuICAgICAgICByZXR1cm4gXCIgXCIgKyBlLm5vZGVOYW1lICsgJz1cIicgKyBuKGUudmFsdWUpICsgJ1wiJztcbiAgICAgIH1sICs9IFwiPFwiICsgdChlKSArIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChlLmF0dHJpYnV0ZXMsIHIpLmpvaW4oXCJcIikgKyBcIj5cIjtcbiAgICB9ZnVuY3Rpb24gYyhlKSB7XG4gICAgICBsICs9IFwiPC9cIiArIHQoZSkgKyBcIj5cIjtcbiAgICB9ZnVuY3Rpb24gdShlKSB7XG4gICAgICAoXCJzdGFydFwiID09IGUuZXZlbnQgPyBpIDogYykoZS5ub2RlKTtcbiAgICB9Zm9yICh2YXIgcyA9IDAsIGwgPSBcIlwiLCBmID0gW107IGUubGVuZ3RoIHx8IHIubGVuZ3RoOykge1xuICAgICAgdmFyIGcgPSBvKCk7aWYgKChsICs9IG4oYS5zdWJzdHIocywgZ1swXS5vZmZzZXQgLSBzKSksIHMgPSBnWzBdLm9mZnNldCwgZyA9PSBlKSkge1xuICAgICAgICBmLnJldmVyc2UoKS5mb3JFYWNoKGMpO2RvIHUoZy5zcGxpY2UoMCwgMSlbMF0pLCBnID0gbygpOyB3aGlsZSAoZyA9PSBlICYmIGcubGVuZ3RoICYmIGdbMF0ub2Zmc2V0ID09IHMpO2YucmV2ZXJzZSgpLmZvckVhY2goaSk7XG4gICAgICB9IGVsc2UgXCJzdGFydFwiID09IGdbMF0uZXZlbnQgPyBmLnB1c2goZ1swXS5ub2RlKSA6IGYucG9wKCksIHUoZy5zcGxpY2UoMCwgMSlbMF0pO1xuICAgIH1yZXR1cm4gbCArIG4oYS5zdWJzdHIocykpO1xuICB9ZnVuY3Rpb24gdShlKSB7XG4gICAgZnVuY3Rpb24gbihlKSB7XG4gICAgICByZXR1cm4gZSAmJiBlLnNvdXJjZSB8fCBlO1xuICAgIH1mdW5jdGlvbiB0KHQsIHIpIHtcbiAgICAgIHJldHVybiBSZWdFeHAobih0KSwgXCJtXCIgKyAoZS5jSSA/IFwiaVwiIDogXCJcIikgKyAociA/IFwiZ1wiIDogXCJcIikpO1xuICAgIH1mdW5jdGlvbiByKGEsIGkpIHtcbiAgICAgIGlmICghYS5jb21waWxlZCkge1xuICAgICAgICBpZiAoKGEuY29tcGlsZWQgPSAhMCwgYS5rID0gYS5rIHx8IGEuYkssIGEuaykpIHtcbiAgICAgICAgICB2YXIgYyA9IHt9LFxuICAgICAgICAgICAgICB1ID0gZnVuY3Rpb24gdShuLCB0KSB7XG4gICAgICAgICAgICBlLmNJICYmICh0ID0gdC50b0xvd2VyQ2FzZSgpKSwgdC5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICB2YXIgdCA9IGUuc3BsaXQoXCJ8XCIpO2NbdFswXV0gPSBbbiwgdFsxXSA/IE51bWJlcih0WzFdKSA6IDFdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcInN0cmluZ1wiID09IHR5cGVvZiBhLmsgPyB1KFwia2V5d29yZFwiLCBhLmspIDogX09iamVjdCRrZXlzKGEuaykuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdShlLCBhLmtbZV0pO1xuICAgICAgICAgIH0pLCBhLmsgPSBjO1xuICAgICAgICB9YS5sUiA9IHQoYS5sIHx8IC9cXGJbQS1aYS16MC05X10rXFxiLywgITApLCBpICYmIChhLmJLICYmIChhLmIgPSBcIlxcXFxiKFwiICsgYS5iSy5zcGxpdChcIiBcIikuam9pbihcInxcIikgKyBcIilcXFxcYlwiKSwgYS5iIHx8IChhLmIgPSAvXFxCfFxcYi8pLCBhLmJSID0gdChhLmIpLCBhLmUgfHwgYS5lVyB8fCAoYS5lID0gL1xcQnxcXGIvKSwgYS5lICYmIChhLmVSID0gdChhLmUpKSwgYS50RSA9IG4oYS5lKSB8fCBcIlwiLCBhLmVXICYmIGkudEUgJiYgKGEudEUgKz0gKGEuZSA/IFwifFwiIDogXCJcIikgKyBpLnRFKSksIGEuaSAmJiAoYS5pUiA9IHQoYS5pKSksIHZvaWQgMCA9PT0gYS5yICYmIChhLnIgPSAxKSwgYS5jIHx8IChhLmMgPSBbXSk7dmFyIHMgPSBbXTthLmMuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGUudiA/IGUudi5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICBzLnB1c2gobyhlLCBuKSk7XG4gICAgICAgICAgfSkgOiBzLnB1c2goXCJzZWxmXCIgPT0gZSA/IGEgOiBlKTtcbiAgICAgICAgfSksIGEuYyA9IHMsIGEuYy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgcihlLCBhKTtcbiAgICAgICAgfSksIGEuc3RhcnRzICYmIHIoYS5zdGFydHMsIGkpO3ZhciBsID0gYS5jLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHJldHVybiBlLmJLID8gXCJcXFxcLj8oXCIgKyBlLmIgKyBcIilcXFxcLj9cIiA6IGUuYjtcbiAgICAgICAgfSkuY29uY2F0KFthLnRFLCBhLmldKS5tYXAobikuZmlsdGVyKEJvb2xlYW4pO2EudCA9IGwubGVuZ3RoID8gdChsLmpvaW4oXCJ8XCIpLCAhMCkgOiB7IGV4ZWM6IGZ1bmN0aW9uIGV4ZWMoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9IH07XG4gICAgICB9XG4gICAgfXIoZSk7XG4gIH1mdW5jdGlvbiBzKGUsIHQsIGEsIG8pIHtcbiAgICBmdW5jdGlvbiBpKGUsIG4pIHtcbiAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgbi5jLmxlbmd0aDsgdCsrKSBpZiAocihuLmNbdF0uYlIsIGUpKSByZXR1cm4gbi5jW3RdO1xuICAgIH1mdW5jdGlvbiBjKF94LCBfeDIpIHtcbiAgICAgIHZhciBfYWdhaW4gPSB0cnVlO1xuXG4gICAgICBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHtcbiAgICAgICAgdmFyIGUgPSBfeCxcbiAgICAgICAgICAgIG4gPSBfeDI7XG4gICAgICAgIF9hZ2FpbiA9IGZhbHNlO1xuICAgICAgICBpZiAocihlLmVSLCBuKSkge1xuICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChlLmVXKSB7XG4gICAgICAgICAgICBfeCA9IGUucGFyZW50O1xuICAgICAgICAgICAgX3gyID0gbjtcbiAgICAgICAgICAgIF9hZ2FpbiA9IHRydWU7XG4gICAgICAgICAgICBjb250aW51ZSBfZnVuY3Rpb247XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfWZ1bmN0aW9uIGYoZSwgbikge1xuICAgICAgcmV0dXJuICFhICYmIHIobi5pUiwgZSk7XG4gICAgfWZ1bmN0aW9uIGcoZSwgbikge1xuICAgICAgdmFyIHQgPSB4LmNJID8gblswXS50b0xvd2VyQ2FzZSgpIDogblswXTtyZXR1cm4gZS5rLmhhc093blByb3BlcnR5KHQpICYmIGUua1t0XTtcbiAgICB9ZnVuY3Rpb24gcChlLCBuLCB0LCByKSB7XG4gICAgICB2YXIgYSA9IHIgPyBcIlwiIDogRS5jbGFzc1ByZWZpeCxcbiAgICAgICAgICBvID0gJzxzcGFuIGNsYXNzPVwiJyArIGEsXG4gICAgICAgICAgaSA9IHQgPyBcIlwiIDogXCI8L3NwYW4+XCI7cmV0dXJuIChvICs9IGUgKyAnXCI+JywgbyArIG4gKyBpKTtcbiAgICB9ZnVuY3Rpb24gZCgpIHtcbiAgICAgIGlmICghdy5rKSByZXR1cm4gbih5KTt2YXIgZSA9IFwiXCIsXG4gICAgICAgICAgdCA9IDA7dy5sUi5sYXN0SW5kZXggPSAwO2ZvciAodmFyIHIgPSB3LmxSLmV4ZWMoeSk7IHI7KSB7XG4gICAgICAgIGUgKz0gbih5LnN1YnN0cih0LCByLmluZGV4IC0gdCkpO3ZhciBhID0gZyh3LCByKTthID8gKEIgKz0gYVsxXSwgZSArPSBwKGFbMF0sIG4oclswXSkpKSA6IGUgKz0gbihyWzBdKSwgdCA9IHcubFIubGFzdEluZGV4LCByID0gdy5sUi5leGVjKHkpO1xuICAgICAgfXJldHVybiBlICsgbih5LnN1YnN0cih0KSk7XG4gICAgfWZ1bmN0aW9uIGgoKSB7XG4gICAgICBpZiAody5zTCAmJiAhUlt3LnNMXSkgcmV0dXJuIG4oeSk7dmFyIGUgPSB3LnNMID8gcyh3LnNMLCB5LCAhMCwgTFt3LnNMXSkgOiBsKHkpO3JldHVybiAody5yID4gMCAmJiAoQiArPSBlLnIpLCBcImNvbnRpbnVvdXNcIiA9PSB3LnN1Ykxhbmd1YWdlTW9kZSAmJiAoTFt3LnNMXSA9IGUudG9wKSwgcChlLmxhbmd1YWdlLCBlLnZhbHVlLCAhMSwgITApKTtcbiAgICB9ZnVuY3Rpb24gdigpIHtcbiAgICAgIHJldHVybiB2b2lkIDAgIT09IHcuc0wgPyBoKCkgOiBkKCk7XG4gICAgfWZ1bmN0aW9uIGIoZSwgdCkge1xuICAgICAgdmFyIHIgPSBlLmNOID8gcChlLmNOLCBcIlwiLCAhMCkgOiBcIlwiO2UuckIgPyAoTSArPSByLCB5ID0gXCJcIikgOiBlLmVCID8gKE0gKz0gbih0KSArIHIsIHkgPSBcIlwiKSA6IChNICs9IHIsIHkgPSB0KSwgdyA9IF9PYmplY3QkY3JlYXRlKGUsIHsgcGFyZW50OiB7IHZhbHVlOiB3IH0gfSk7XG4gICAgfWZ1bmN0aW9uIG0oZSwgdCkge1xuICAgICAgaWYgKCh5ICs9IGUsIHZvaWQgMCA9PT0gdCkpIHJldHVybiAoTSArPSB2KCksIDApO3ZhciByID0gaSh0LCB3KTtpZiAocikgcmV0dXJuIChNICs9IHYoKSwgYihyLCB0KSwgci5yQiA/IDAgOiB0Lmxlbmd0aCk7dmFyIGEgPSBjKHcsIHQpO2lmIChhKSB7XG4gICAgICAgIHZhciBvID0gdztvLnJFIHx8IG8uZUUgfHwgKHkgKz0gdCksIE0gKz0gdigpO2RvIHcuY04gJiYgKE0gKz0gXCI8L3NwYW4+XCIpLCBCICs9IHcuciwgdyA9IHcucGFyZW50OyB3aGlsZSAodyAhPSBhLnBhcmVudCk7cmV0dXJuIChvLmVFICYmIChNICs9IG4odCkpLCB5ID0gXCJcIiwgYS5zdGFydHMgJiYgYihhLnN0YXJ0cywgXCJcIiksIG8uckUgPyAwIDogdC5sZW5ndGgpO1xuICAgICAgfWlmIChmKHQsIHcpKSB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgbGV4ZW1lIFwiJyArIHQgKyAnXCIgZm9yIG1vZGUgXCInICsgKHcuY04gfHwgXCI8dW5uYW1lZD5cIikgKyAnXCInKTtyZXR1cm4gKHkgKz0gdCwgdC5sZW5ndGggfHwgMSk7XG4gICAgfXZhciB4ID0gTihlKTtpZiAoIXgpIHRocm93IG5ldyBFcnJvcignVW5rbm93biBsYW5ndWFnZTogXCInICsgZSArICdcIicpO3UoeCk7Zm9yICh2YXIgdyA9IG8gfHwgeCwgTCA9IHt9LCBNID0gXCJcIiwgayA9IHc7IGsgIT0geDsgayA9IGsucGFyZW50KSBrLmNOICYmIChNID0gcChrLmNOLCBcIlwiLCAhMCkgKyBNKTt2YXIgeSA9IFwiXCIsXG4gICAgICAgIEIgPSAwO3RyeSB7XG4gICAgICBmb3IgKHZhciBDLCBqLCBJID0gMDs7KSB7XG4gICAgICAgIGlmICgody50Lmxhc3RJbmRleCA9IEksIEMgPSB3LnQuZXhlYyh0KSwgIUMpKSBicmVhaztqID0gbSh0LnN1YnN0cihJLCBDLmluZGV4IC0gSSksIENbMF0pLCBJID0gQy5pbmRleCArIGo7XG4gICAgICB9bSh0LnN1YnN0cihJKSk7Zm9yICh2YXIgayA9IHc7IGsucGFyZW50OyBrID0gay5wYXJlbnQpIGsuY04gJiYgKE0gKz0gXCI8L3NwYW4+XCIpO3JldHVybiB7IHI6IEIsIHZhbHVlOiBNLCBsYW5ndWFnZTogZSwgdG9wOiB3IH07XG4gICAgfSBjYXRjaCAoQSkge1xuICAgICAgaWYgKC0xICE9IEEubWVzc2FnZS5pbmRleE9mKFwiSWxsZWdhbFwiKSkgcmV0dXJuIHsgcjogMCwgdmFsdWU6IG4odCkgfTt0aHJvdyBBO1xuICAgIH1cbiAgfWZ1bmN0aW9uIGwoZSwgdCkge1xuICAgIHQgPSB0IHx8IEUubGFuZ3VhZ2VzIHx8IF9PYmplY3Qka2V5cyhSKTt2YXIgciA9IHsgcjogMCwgdmFsdWU6IG4oZSkgfSxcbiAgICAgICAgYSA9IHI7cmV0dXJuICh0LmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgIGlmIChOKG4pKSB7XG4gICAgICAgIHZhciB0ID0gcyhuLCBlLCAhMSk7dC5sYW5ndWFnZSA9IG4sIHQuciA+IGEuciAmJiAoYSA9IHQpLCB0LnIgPiByLnIgJiYgKGEgPSByLCByID0gdCk7XG4gICAgICB9XG4gICAgfSksIGEubGFuZ3VhZ2UgJiYgKHIuc2Vjb25kX2Jlc3QgPSBhKSwgcik7XG4gIH1mdW5jdGlvbiBmKGUpIHtcbiAgICByZXR1cm4gKEUudGFiUmVwbGFjZSAmJiAoZSA9IGUucmVwbGFjZSgvXigoPFtePl0rPnxcXHQpKykvZ20sIGZ1bmN0aW9uIChlLCBuKSB7XG4gICAgICByZXR1cm4gbi5yZXBsYWNlKC9cXHQvZywgRS50YWJSZXBsYWNlKTtcbiAgICB9KSksIEUudXNlQlIgJiYgKGUgPSBlLnJlcGxhY2UoL1xcbi9nLCBcIjxicj5cIikpLCBlKTtcbiAgfWZ1bmN0aW9uIGcoZSwgbiwgdCkge1xuICAgIHZhciByID0gbiA/IHhbbl0gOiB0LFxuICAgICAgICBhID0gW2UudHJpbSgpXTtyZXR1cm4gKGUubWF0Y2goLyhcXHN8XilobGpzKFxcc3wkKS8pIHx8IGEucHVzaChcImhsanNcIiksIHIgJiYgYS5wdXNoKHIpLCBhLmpvaW4oXCIgXCIpLnRyaW0oKSk7XG4gIH1mdW5jdGlvbiBwKGUpIHtcbiAgICB2YXIgbiA9IGEoZSk7aWYgKCEvbm8oLT8paGlnaGxpZ2h0Ly50ZXN0KG4pKSB7XG4gICAgICB2YXIgdDtFLnVzZUJSID8gKHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIsIFwiZGl2XCIpLCB0LmlubmVySFRNTCA9IGUuaW5uZXJIVE1MLnJlcGxhY2UoL1xcbi9nLCBcIlwiKS5yZXBsYWNlKC88YnJbIFxcL10qPi9nLCBcIlxcblwiKSkgOiB0ID0gZTt2YXIgciA9IHQudGV4dENvbnRlbnQsXG4gICAgICAgICAgbyA9IG4gPyBzKG4sIHIsICEwKSA6IGwociksXG4gICAgICAgICAgdSA9IGkodCk7aWYgKHUubGVuZ3RoKSB7XG4gICAgICAgIHZhciBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiLCBcImRpdlwiKTtwLmlubmVySFRNTCA9IG8udmFsdWUsIG8udmFsdWUgPSBjKHUsIGkocCksIHIpO1xuICAgICAgfW8udmFsdWUgPSBmKG8udmFsdWUpLCBlLmlubmVySFRNTCA9IG8udmFsdWUsIGUuY2xhc3NOYW1lID0gZyhlLmNsYXNzTmFtZSwgbiwgby5sYW5ndWFnZSksIGUucmVzdWx0ID0geyBsYW5ndWFnZTogby5sYW5ndWFnZSwgcmU6IG8uciB9LCBvLnNlY29uZF9iZXN0ICYmIChlLnNlY29uZF9iZXN0ID0geyBsYW5ndWFnZTogby5zZWNvbmRfYmVzdC5sYW5ndWFnZSwgcmU6IG8uc2Vjb25kX2Jlc3QuciB9KTtcbiAgICB9XG4gIH1mdW5jdGlvbiBkKGUpIHtcbiAgICBFID0gbyhFLCBlKTtcbiAgfWZ1bmN0aW9uIGgoKSB7XG4gICAgaWYgKCFoLmNhbGxlZCkge1xuICAgICAgaC5jYWxsZWQgPSAhMDt2YXIgZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJwcmUgY29kZVwiKTtBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGUsIHApO1xuICAgIH1cbiAgfWZ1bmN0aW9uIHYoKSB7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaCwgITEpLCBhZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBoLCAhMSk7XG4gIH1mdW5jdGlvbiBiKG4sIHQpIHtcbiAgICB2YXIgciA9IFJbbl0gPSB0KGUpO3IuYWxpYXNlcyAmJiByLmFsaWFzZXMuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgeFtlXSA9IG47XG4gICAgfSk7XG4gIH1mdW5jdGlvbiBtKCkge1xuICAgIHJldHVybiBfT2JqZWN0JGtleXMoUik7XG4gIH1mdW5jdGlvbiBOKGUpIHtcbiAgICByZXR1cm4gUltlXSB8fCBSW3hbZV1dO1xuICB9dmFyIEUgPSB7IGNsYXNzUHJlZml4OiBcImhsanMtXCIsIHRhYlJlcGxhY2U6IG51bGwsIHVzZUJSOiAhMSwgbGFuZ3VhZ2VzOiB2b2lkIDAgfSxcbiAgICAgIFIgPSB7fSxcbiAgICAgIHggPSB7fTtyZXR1cm4gKGUuaGlnaGxpZ2h0ID0gcywgZS5oaWdobGlnaHRBdXRvID0gbCwgZS5maXhNYXJrdXAgPSBmLCBlLmhpZ2hsaWdodEJsb2NrID0gcCwgZS5jb25maWd1cmUgPSBkLCBlLmluaXRIaWdobGlnaHRpbmcgPSBoLCBlLmluaXRIaWdobGlnaHRpbmdPbkxvYWQgPSB2LCBlLnJlZ2lzdGVyTGFuZ3VhZ2UgPSBiLCBlLmxpc3RMYW5ndWFnZXMgPSBtLCBlLmdldExhbmd1YWdlID0gTiwgZS5pbmhlcml0ID0gbywgZS5JUiA9IFwiW2EtekEtWl1bYS16QS1aMC05X10qXCIsIGUuVUlSID0gXCJbYS16QS1aX11bYS16QS1aMC05X10qXCIsIGUuTlIgPSBcIlxcXFxiXFxcXGQrKFxcXFwuXFxcXGQrKT9cIiwgZS5DTlIgPSBcIihcXFxcYjBbeFhdW2EtZkEtRjAtOV0rfChcXFxcYlxcXFxkKyhcXFxcLlxcXFxkKik/fFxcXFwuXFxcXGQrKShbZUVdWy0rXT9cXFxcZCspPylcIiwgZS5CTlIgPSBcIlxcXFxiKDBiWzAxXSspXCIsIGUuUlNSID0gXCIhfCE9fCE9PXwlfCU9fCZ8JiZ8Jj18XFxcXCp8XFxcXCo9fFxcXFwrfFxcXFwrPXwsfC18LT18Lz18L3w6fDt8PDx8PDw9fDw9fDx8PT09fD09fD18Pj4+PXw+Pj18Pj18Pj4+fD4+fD58XFxcXD98XFxcXFt8XFxcXHt8XFxcXCh8XFxcXF58XFxcXF49fFxcXFx8fFxcXFx8PXxcXFxcfFxcXFx8fH5cIiwgZS5CRSA9IHsgYjogXCJcXFxcXFxcXFtcXFxcc1xcXFxTXVwiLCByOiAwIH0sIGUuQVNNID0geyBjTjogXCJzdHJpbmdcIiwgYjogXCInXCIsIGU6IFwiJ1wiLCBpOiBcIlxcXFxuXCIsIGM6IFtlLkJFXSB9LCBlLlFTTSA9IHsgY046IFwic3RyaW5nXCIsIGI6ICdcIicsIGU6ICdcIicsIGk6IFwiXFxcXG5cIiwgYzogW2UuQkVdIH0sIGUuUFdNID0geyBiOiAvXFxiKGF8YW58dGhlfGFyZXxJfEknbXxpc24ndHxkb24ndHxkb2Vzbid0fHdvbid0fGJ1dHxqdXN0fHNob3VsZHxwcmV0dHl8c2ltcGx5fGVub3VnaHxnb25uYXxnb2luZ3x3dGZ8c298c3VjaClcXGIvIH0sIGUuQ0xDTSA9IHsgY046IFwiY29tbWVudFwiLCBiOiBcIi8vXCIsIGU6IFwiJFwiLCBjOiBbZS5QV01dIH0sIGUuQ0JDTSA9IHsgY046IFwiY29tbWVudFwiLCBiOiBcIi9cXFxcKlwiLCBlOiBcIlxcXFwqL1wiLCBjOiBbZS5QV01dIH0sIGUuSENNID0geyBjTjogXCJjb21tZW50XCIsIGI6IFwiI1wiLCBlOiBcIiRcIiwgYzogW2UuUFdNXSB9LCBlLk5NID0geyBjTjogXCJudW1iZXJcIiwgYjogZS5OUiwgcjogMCB9LCBlLkNOTSA9IHsgY046IFwibnVtYmVyXCIsIGI6IGUuQ05SLCByOiAwIH0sIGUuQk5NID0geyBjTjogXCJudW1iZXJcIiwgYjogZS5CTlIsIHI6IDAgfSwgZS5DU1NOTSA9IHsgY046IFwibnVtYmVyXCIsIGI6IGUuTlIgKyBcIiglfGVtfGV4fGNofHJlbXx2d3x2aHx2bWlufHZtYXh8Y218bW18aW58cHR8cGN8cHh8ZGVnfGdyYWR8cmFkfHR1cm58c3xtc3xIenxrSHp8ZHBpfGRwY218ZHBweCk/XCIsIHI6IDAgfSwgZS5STSA9IHsgY046IFwicmVnZXhwXCIsIGI6IC9cXC8vLCBlOiAvXFwvW2dpbXV5XSovLCBpOiAvXFxuLywgYzogW2UuQkUsIHsgYjogL1xcWy8sIGU6IC9cXF0vLCByOiAwLCBjOiBbZS5CRV0gfV0gfSwgZS5UTSA9IHsgY046IFwidGl0bGVcIiwgYjogZS5JUiwgcjogMCB9LCBlLlVUTSA9IHsgY046IFwidGl0bGVcIiwgYjogZS5VSVIsIHI6IDAgfSwgZSk7XG59KTtobGpzLnJlZ2lzdGVyTGFuZ3VhZ2UoXCJjb2ZmZWVzY3JpcHRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgdmFyIGMgPSB7IGtleXdvcmQ6IFwiaW4gaWYgZm9yIHdoaWxlIGZpbmFsbHkgbmV3IGRvIHJldHVybiBlbHNlIGJyZWFrIGNhdGNoIGluc3RhbmNlb2YgdGhyb3cgdHJ5IHRoaXMgc3dpdGNoIGNvbnRpbnVlIHR5cGVvZiBkZWxldGUgZGVidWdnZXIgc3VwZXIgdGhlbiB1bmxlc3MgdW50aWwgbG9vcCBvZiBieSB3aGVuIGFuZCBvciBpcyBpc250IG5vdFwiLCBsaXRlcmFsOiBcInRydWUgZmFsc2UgbnVsbCB1bmRlZmluZWQgeWVzIG5vIG9uIG9mZlwiLCByZXNlcnZlZDogXCJjYXNlIGRlZmF1bHQgZnVuY3Rpb24gdmFyIHZvaWQgd2l0aCBjb25zdCBsZXQgZW51bSBleHBvcnQgaW1wb3J0IG5hdGl2ZSBfX2hhc1Byb3AgX19leHRlbmRzIF9fc2xpY2UgX19iaW5kIF9faW5kZXhPZlwiLCBidWlsdF9pbjogXCJucG0gcmVxdWlyZSBjb25zb2xlIHByaW50IG1vZHVsZSBnbG9iYWwgd2luZG93IGRvY3VtZW50XCIgfSxcbiAgICAgIG4gPSBcIltBLVphLXokX11bMC05QS1aYS16JF9dKlwiLFxuICAgICAgdCA9IHsgY046IFwic3Vic3RcIiwgYjogLyNcXHsvLCBlOiAvfS8sIGs6IGMgfSxcbiAgICAgIHIgPSBbZS5CTk0sIGUuaW5oZXJpdChlLkNOTSwgeyBzdGFydHM6IHsgZTogXCIoXFxcXHMqLyk/XCIsIHI6IDAgfSB9KSwgeyBjTjogXCJzdHJpbmdcIiwgdjogW3sgYjogLycnJy8sIGU6IC8nJycvLCBjOiBbZS5CRV0gfSwgeyBiOiAvJy8sIGU6IC8nLywgYzogW2UuQkVdIH0sIHsgYjogL1wiXCJcIi8sIGU6IC9cIlwiXCIvLCBjOiBbZS5CRSwgdF0gfSwgeyBiOiAvXCIvLCBlOiAvXCIvLCBjOiBbZS5CRSwgdF0gfV0gfSwgeyBjTjogXCJyZWdleHBcIiwgdjogW3sgYjogXCIvLy9cIiwgZTogXCIvLy9cIiwgYzogW3QsIGUuSENNXSB9LCB7IGI6IFwiLy9bZ2ltXSpcIiwgcjogMCB9LCB7IGI6IC9cXC8oPyFbICpdKShcXFxcXFwvfC4pKj9cXC9bZ2ltXSooPz1cXFd8JCkvIH1dIH0sIHsgY046IFwicHJvcGVydHlcIiwgYjogXCJAXCIgKyBuIH0sIHsgYjogXCJgXCIsIGU6IFwiYFwiLCBlQjogITAsIGVFOiAhMCwgc0w6IFwiamF2YXNjcmlwdFwiIH1dO3QuYyA9IHI7dmFyIGkgPSBlLmluaGVyaXQoZS5UTSwgeyBiOiBuIH0pLFxuICAgICAgcyA9IFwiKFxcXFwoLipcXFxcKSk/XFxcXHMqXFxcXEJbLT1dPlwiLFxuICAgICAgbyA9IHsgY046IFwicGFyYW1zXCIsIGI6IFwiXFxcXChbXlxcXFwoXVwiLCByQjogITAsIGM6IFt7IGI6IC9cXCgvLCBlOiAvXFwpLywgazogYywgYzogW1wic2VsZlwiXS5jb25jYXQocikgfV0gfTtyZXR1cm4geyBhbGlhc2VzOiBbXCJjb2ZmZWVcIiwgXCJjc29uXCIsIFwiaWNlZFwiXSwgazogYywgaTogL1xcL1xcKi8sIGM6IHIuY29uY2F0KFt7IGNOOiBcImNvbW1lbnRcIiwgYjogXCIjIyNcIiwgZTogXCIjIyNcIiwgYzogW2UuUFdNXSB9LCBlLkhDTSwgeyBjTjogXCJmdW5jdGlvblwiLCBiOiBcIl5cXFxccypcIiArIG4gKyBcIlxcXFxzKj1cXFxccypcIiArIHMsIGU6IFwiWy09XT5cIiwgckI6ICEwLCBjOiBbaSwgb10gfSwgeyBiOiAvWzpcXCgsPV1cXHMqLywgcjogMCwgYzogW3sgY046IFwiZnVuY3Rpb25cIiwgYjogcywgZTogXCJbLT1dPlwiLCByQjogITAsIGM6IFtvXSB9XSB9LCB7IGNOOiBcImNsYXNzXCIsIGJLOiBcImNsYXNzXCIsIGU6IFwiJFwiLCBpOiAvWzo9XCJcXFtcXF1dLywgYzogW3sgYks6IFwiZXh0ZW5kc1wiLCBlVzogITAsIGk6IC9bOj1cIlxcW1xcXV0vLCBjOiBbaV0gfSwgaV0gfSwgeyBjTjogXCJhdHRyaWJ1dGVcIiwgYjogbiArIFwiOlwiLCBlOiBcIjpcIiwgckI6ICEwLCByRTogITAsIHI6IDAgfV0pIH07XG59KTtobGpzLnJlZ2lzdGVyTGFuZ3VhZ2UoXCJ4bWxcIiwgZnVuY3Rpb24gKCkge1xuICB2YXIgdCA9IFwiW0EtWmEtejAtOVxcXFwuXzotXStcIixcbiAgICAgIGUgPSB7IGI6IC88XFw/KHBocCk/KD8hXFx3KS8sIGU6IC9cXD8+Lywgc0w6IFwicGhwXCIsIHN1Ykxhbmd1YWdlTW9kZTogXCJjb250aW51b3VzXCIgfSxcbiAgICAgIGMgPSB7IGVXOiAhMCwgaTogLzwvLCByOiAwLCBjOiBbZSwgeyBjTjogXCJhdHRyaWJ1dGVcIiwgYjogdCwgcjogMCB9LCB7IGI6IFwiPVwiLCByOiAwLCBjOiBbeyBjTjogXCJ2YWx1ZVwiLCBjOiBbZV0sIHY6IFt7IGI6IC9cIi8sIGU6IC9cIi8gfSwgeyBiOiAvJy8sIGU6IC8nLyB9LCB7IGI6IC9bXlxcc1xcLz5dKy8gfV0gfV0gfV0gfTtyZXR1cm4geyBhbGlhc2VzOiBbXCJodG1sXCIsIFwieGh0bWxcIiwgXCJyc3NcIiwgXCJhdG9tXCIsIFwieHNsXCIsIFwicGxpc3RcIl0sIGNJOiAhMCwgYzogW3sgY046IFwiZG9jdHlwZVwiLCBiOiBcIjwhRE9DVFlQRVwiLCBlOiBcIj5cIiwgcjogMTAsIGM6IFt7IGI6IFwiXFxcXFtcIiwgZTogXCJcXFxcXVwiIH1dIH0sIHsgY046IFwiY29tbWVudFwiLCBiOiBcIjwhLS1cIiwgZTogXCItLT5cIiwgcjogMTAgfSwgeyBjTjogXCJjZGF0YVwiLCBiOiBcIjxcXFxcIVxcXFxbQ0RBVEFcXFxcW1wiLCBlOiBcIlxcXFxdXFxcXF0+XCIsIHI6IDEwIH0sIHsgY046IFwidGFnXCIsIGI6IFwiPHN0eWxlKD89XFxcXHN8PnwkKVwiLCBlOiBcIj5cIiwgazogeyB0aXRsZTogXCJzdHlsZVwiIH0sIGM6IFtjXSwgc3RhcnRzOiB7IGU6IFwiPC9zdHlsZT5cIiwgckU6ICEwLCBzTDogXCJjc3NcIiB9IH0sIHsgY046IFwidGFnXCIsIGI6IFwiPHNjcmlwdCg/PVxcXFxzfD58JClcIiwgZTogXCI+XCIsIGs6IHsgdGl0bGU6IFwic2NyaXB0XCIgfSwgYzogW2NdLCBzdGFydHM6IHsgZTogXCI8L3NjcmlwdD5cIiwgckU6ICEwLCBzTDogXCJqYXZhc2NyaXB0XCIgfSB9LCBlLCB7IGNOOiBcInBpXCIsIGI6IC88XFw/XFx3Ky8sIGU6IC9cXD8+LywgcjogMTAgfSwgeyBjTjogXCJ0YWdcIiwgYjogXCI8Lz9cIiwgZTogXCIvPz5cIiwgYzogW3sgY046IFwidGl0bGVcIiwgYjogL1teIFxcLz48XFxuXFx0XSsvLCByOiAwIH0sIGNdIH1dIH07XG59KTtobGpzLnJlZ2lzdGVyTGFuZ3VhZ2UoXCJoYW1sXCIsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHsgY0k6ICEwLCBjOiBbeyBjTjogXCJkb2N0eXBlXCIsIGI6IFwiXiEhISggKDV8MVxcXFwuMXxTdHJpY3R8RnJhbWVzZXR8QmFzaWN8TW9iaWxlfFJERmF8WE1MXFxcXGIuKikpPyRcIiwgcjogMTAgfSwgeyBjTjogXCJjb21tZW50XCIsIGI6IFwiXlxcXFxzKighPSN8PSN8LSN8LykuKiRcIiwgcjogMCB9LCB7IGI6IFwiXlxcXFxzKigtfD18IT0pKD8hIylcIiwgc3RhcnRzOiB7IGU6IFwiXFxcXG5cIiwgc0w6IFwicnVieVwiIH0gfSwgeyBjTjogXCJ0YWdcIiwgYjogXCJeXFxcXHMqJVwiLCBjOiBbeyBjTjogXCJ0aXRsZVwiLCBiOiBcIlxcXFx3K1wiIH0sIHsgY046IFwidmFsdWVcIiwgYjogXCJbI1xcXFwuXVxcXFx3K1wiIH0sIHsgYjogXCJ7XFxcXHMqXCIsIGU6IFwiXFxcXHMqfVwiLCBlRTogITAsIGM6IFt7IGI6IFwiOlxcXFx3K1xcXFxzKj0+XCIsIGU6IFwiLFxcXFxzK1wiLCByQjogITAsIGVXOiAhMCwgYzogW3sgY046IFwic3ltYm9sXCIsIGI6IFwiOlxcXFx3K1wiIH0sIHsgY046IFwic3RyaW5nXCIsIGI6ICdcIicsIGU6ICdcIicgfSwgeyBjTjogXCJzdHJpbmdcIiwgYjogXCInXCIsIGU6IFwiJ1wiIH0sIHsgYjogXCJcXFxcdytcIiwgcjogMCB9XSB9XSB9LCB7IGI6IFwiXFxcXChcXFxccypcIiwgZTogXCJcXFxccypcXFxcKVwiLCBlRTogITAsIGM6IFt7IGI6IFwiXFxcXHcrXFxcXHMqPVwiLCBlOiBcIlxcXFxzK1wiLCByQjogITAsIGVXOiAhMCwgYzogW3sgY046IFwiYXR0cmlidXRlXCIsIGI6IFwiXFxcXHcrXCIsIHI6IDAgfSwgeyBjTjogXCJzdHJpbmdcIiwgYjogJ1wiJywgZTogJ1wiJyB9LCB7IGNOOiBcInN0cmluZ1wiLCBiOiBcIidcIiwgZTogXCInXCIgfSwgeyBiOiBcIlxcXFx3K1wiLCByOiAwIH1dIH1dIH1dIH0sIHsgY046IFwiYnVsbGV0XCIsIGI6IFwiXlxcXFxzKls9fl1cXFxccypcIiwgcjogMCB9LCB7IGI6IFwiI3tcIiwgc3RhcnRzOiB7IGU6IFwifVwiLCBzTDogXCJydWJ5XCIgfSB9XSB9O1xufSk7aGxqcy5yZWdpc3Rlckxhbmd1YWdlKFwicnVieVwiLCBmdW5jdGlvbiAoZSkge1xuICB2YXIgYiA9IFwiW2EtekEtWl9dXFxcXHcqWyE/PV0/fFstK35dXFxcXEB8PDx8Pj58PX58PT09P3w8PT58Wzw+XT0/fFxcXFwqXFxcXCp8Wy0vKyVeJip+YHxdfFxcXFxbXFxcXF09P1wiLFxuICAgICAgciA9IFwiYW5kIGZhbHNlIHRoZW4gZGVmaW5lZCBtb2R1bGUgaW4gcmV0dXJuIHJlZG8gaWYgQkVHSU4gcmV0cnkgZW5kIGZvciB0cnVlIHNlbGYgd2hlbiBuZXh0IHVudGlsIGRvIGJlZ2luIHVubGVzcyBFTkQgcmVzY3VlIG5pbCBlbHNlIGJyZWFrIHVuZGVmIG5vdCBzdXBlciBjbGFzcyBjYXNlIHJlcXVpcmUgeWllbGQgYWxpYXMgd2hpbGUgZW5zdXJlIGVsc2lmIG9yIGluY2x1ZGUgYXR0cl9yZWFkZXIgYXR0cl93cml0ZXIgYXR0cl9hY2Nlc3NvclwiLFxuICAgICAgYyA9IHsgY046IFwieWFyZG9jdGFnXCIsIGI6IFwiQFtBLVphLXpdK1wiIH0sXG4gICAgICBhID0geyBjTjogXCJ2YWx1ZVwiLCBiOiBcIiM8XCIsIGU6IFwiPlwiIH0sXG4gICAgICBzID0geyBjTjogXCJjb21tZW50XCIsIHY6IFt7IGI6IFwiI1wiLCBlOiBcIiRcIiwgYzogW2NdIH0sIHsgYjogXCJeXFxcXD1iZWdpblwiLCBlOiBcIl5cXFxcPWVuZFwiLCBjOiBbY10sIHI6IDEwIH0sIHsgYjogXCJeX19FTkRfX1wiLCBlOiBcIlxcXFxuJFwiIH1dIH0sXG4gICAgICBuID0geyBjTjogXCJzdWJzdFwiLCBiOiBcIiNcXFxce1wiLCBlOiBcIn1cIiwgazogciB9LFxuICAgICAgdCA9IHsgY046IFwic3RyaW5nXCIsIGM6IFtlLkJFLCBuXSwgdjogW3sgYjogLycvLCBlOiAvJy8gfSwgeyBiOiAvXCIvLCBlOiAvXCIvIH0sIHsgYjogL2AvLCBlOiAvYC8gfSwgeyBiOiBcIiVbcVF3V3hdP1xcXFwoXCIsIGU6IFwiXFxcXClcIiB9LCB7IGI6IFwiJVtxUXdXeF0/XFxcXFtcIiwgZTogXCJcXFxcXVwiIH0sIHsgYjogXCIlW3FRd1d4XT97XCIsIGU6IFwifVwiIH0sIHsgYjogXCIlW3FRd1d4XT88XCIsIGU6IFwiPlwiIH0sIHsgYjogXCIlW3FRd1d4XT8vXCIsIGU6IFwiL1wiIH0sIHsgYjogXCIlW3FRd1d4XT8lXCIsIGU6IFwiJVwiIH0sIHsgYjogXCIlW3FRd1d4XT8tXCIsIGU6IFwiLVwiIH0sIHsgYjogXCIlW3FRd1d4XT9cXFxcfFwiLCBlOiBcIlxcXFx8XCIgfSwgeyBiOiAvXFxCXFw/KFxcXFxcXGR7MSwzfXxcXFxceFtBLUZhLWYwLTldezEsMn18XFxcXHVbQS1GYS1mMC05XXs0fXxcXFxcP1xcUylcXGIvIH1dIH0sXG4gICAgICBpID0geyBjTjogXCJwYXJhbXNcIiwgYjogXCJcXFxcKFwiLCBlOiBcIlxcXFwpXCIsIGs6IHIgfSxcbiAgICAgIGQgPSBbdCwgYSwgcywgeyBjTjogXCJjbGFzc1wiLCBiSzogXCJjbGFzcyBtb2R1bGVcIiwgZTogXCIkfDtcIiwgaTogLz0vLCBjOiBbZS5pbmhlcml0KGUuVE0sIHsgYjogXCJbQS1aYS16X11cXFxcdyooOjpcXFxcdyspKihcXFxcP3xcXFxcISk/XCIgfSksIHsgY046IFwiaW5oZXJpdGFuY2VcIiwgYjogXCI8XFxcXHMqXCIsIGM6IFt7IGNOOiBcInBhcmVudFwiLCBiOiBcIihcIiArIGUuSVIgKyBcIjo6KT9cIiArIGUuSVIgfV0gfSwgc10gfSwgeyBjTjogXCJmdW5jdGlvblwiLCBiSzogXCJkZWZcIiwgZTogXCIgfCR8O1wiLCByOiAwLCBjOiBbZS5pbmhlcml0KGUuVE0sIHsgYjogYiB9KSwgaSwgc10gfSwgeyBjTjogXCJjb25zdGFudFwiLCBiOiBcIig6Oik/KFxcXFxiW0EtWl1cXFxcdyooOjopPykrXCIsIHI6IDAgfSwgeyBjTjogXCJzeW1ib2xcIiwgYjogZS5VSVIgKyBcIihcXFxcIXxcXFxcPyk/OlwiLCByOiAwIH0sIHsgY046IFwic3ltYm9sXCIsIGI6IFwiOlwiLCBjOiBbdCwgeyBiOiBiIH1dLCByOiAwIH0sIHsgY046IFwibnVtYmVyXCIsIGI6IFwiKFxcXFxiMFswLTdfXSspfChcXFxcYjB4WzAtOWEtZkEtRl9dKyl8KFxcXFxiWzEtOV1bMC05X10qKFxcXFwuWzAtOV9dKyk/KXxbMF9dXFxcXGJcIiwgcjogMCB9LCB7IGNOOiBcInZhcmlhYmxlXCIsIGI6IFwiKFxcXFwkXFxcXFcpfCgoXFxcXCR8XFxcXEBcXFxcQD8pKFxcXFx3KykpXCIgfSwgeyBiOiBcIihcIiArIGUuUlNSICsgXCIpXFxcXHMqXCIsIGM6IFthLCBzLCB7IGNOOiBcInJlZ2V4cFwiLCBjOiBbZS5CRSwgbl0sIGk6IC9cXG4vLCB2OiBbeyBiOiBcIi9cIiwgZTogXCIvW2Etel0qXCIgfSwgeyBiOiBcIiVye1wiLCBlOiBcIn1bYS16XSpcIiB9LCB7IGI6IFwiJXJcXFxcKFwiLCBlOiBcIlxcXFwpW2Etel0qXCIgfSwgeyBiOiBcIiVyIVwiLCBlOiBcIiFbYS16XSpcIiB9LCB7IGI6IFwiJXJcXFxcW1wiLCBlOiBcIlxcXFxdW2Etel0qXCIgfV0gfV0sIHI6IDAgfV07bi5jID0gZCwgaS5jID0gZDt2YXIgbCA9IFwiWz4/XT5cIixcbiAgICAgIHUgPSBcIltcXFxcdyNdK1xcXFwoXFxcXHcrXFxcXCk6XFxcXGQrOlxcXFxkKz5cIixcbiAgICAgIE4gPSBcIihcXFxcdystKT9cXFxcZCtcXFxcLlxcXFxkK1xcXFwuXFxcXGQocFxcXFxkKyk/W14+XSs+XCIsXG4gICAgICBvID0gW3sgYjogL15cXHMqPT4vLCBjTjogXCJzdGF0dXNcIiwgc3RhcnRzOiB7IGU6IFwiJFwiLCBjOiBkIH0gfSwgeyBjTjogXCJwcm9tcHRcIiwgYjogXCJeKFwiICsgbCArIFwifFwiICsgdSArIFwifFwiICsgTiArIFwiKVwiLCBzdGFydHM6IHsgZTogXCIkXCIsIGM6IGQgfSB9XTtyZXR1cm4geyBhbGlhc2VzOiBbXCJyYlwiLCBcImdlbXNwZWNcIiwgXCJwb2RzcGVjXCIsIFwidGhvclwiLCBcImlyYlwiXSwgazogciwgYzogW3NdLmNvbmNhdChvKS5jb25jYXQoZCkgfTtcbn0pO2hsanMucmVnaXN0ZXJMYW5ndWFnZShcImphdmFzY3JpcHRcIiwgZnVuY3Rpb24gKHIpIHtcbiAgcmV0dXJuIHsgYWxpYXNlczogW1wianNcIl0sIGs6IHsga2V5d29yZDogXCJpbiBpZiBmb3Igd2hpbGUgZmluYWxseSB2YXIgbmV3IGZ1bmN0aW9uIGRvIHJldHVybiB2b2lkIGVsc2UgYnJlYWsgY2F0Y2ggaW5zdGFuY2VvZiB3aXRoIHRocm93IGNhc2UgZGVmYXVsdCB0cnkgdGhpcyBzd2l0Y2ggY29udGludWUgdHlwZW9mIGRlbGV0ZSBsZXQgeWllbGQgY29uc3QgY2xhc3NcIiwgbGl0ZXJhbDogXCJ0cnVlIGZhbHNlIG51bGwgdW5kZWZpbmVkIE5hTiBJbmZpbml0eVwiLCBidWlsdF9pbjogXCJldmFsIGlzRmluaXRlIGlzTmFOIHBhcnNlRmxvYXQgcGFyc2VJbnQgZGVjb2RlVVJJIGRlY29kZVVSSUNvbXBvbmVudCBlbmNvZGVVUkkgZW5jb2RlVVJJQ29tcG9uZW50IGVzY2FwZSB1bmVzY2FwZSBPYmplY3QgRnVuY3Rpb24gQm9vbGVhbiBFcnJvciBFdmFsRXJyb3IgSW50ZXJuYWxFcnJvciBSYW5nZUVycm9yIFJlZmVyZW5jZUVycm9yIFN0b3BJdGVyYXRpb24gU3ludGF4RXJyb3IgVHlwZUVycm9yIFVSSUVycm9yIE51bWJlciBNYXRoIERhdGUgU3RyaW5nIFJlZ0V4cCBBcnJheSBGbG9hdDMyQXJyYXkgRmxvYXQ2NEFycmF5IEludDE2QXJyYXkgSW50MzJBcnJheSBJbnQ4QXJyYXkgVWludDE2QXJyYXkgVWludDMyQXJyYXkgVWludDhBcnJheSBVaW50OENsYW1wZWRBcnJheSBBcnJheUJ1ZmZlciBEYXRhVmlldyBKU09OIEludGwgYXJndW1lbnRzIHJlcXVpcmUgbW9kdWxlIGNvbnNvbGUgd2luZG93IGRvY3VtZW50XCIgfSwgYzogW3sgY046IFwicGlcIiwgcjogMTAsIHY6IFt7IGI6IC9eXFxzKignfFwiKXVzZSBzdHJpY3QoJ3xcIikvIH0sIHsgYjogL15cXHMqKCd8XCIpdXNlIGFzbSgnfFwiKS8gfV0gfSwgci5BU00sIHIuUVNNLCByLkNMQ00sIHIuQ0JDTSwgci5DTk0sIHsgYjogXCIoXCIgKyByLlJTUiArIFwifFxcXFxiKGNhc2V8cmV0dXJufHRocm93KVxcXFxiKVxcXFxzKlwiLCBrOiBcInJldHVybiB0aHJvdyBjYXNlXCIsIGM6IFtyLkNMQ00sIHIuQ0JDTSwgci5STSwgeyBiOiAvPC8sIGU6IC8+Oy8sIHI6IDAsIHNMOiBcInhtbFwiIH1dLCByOiAwIH0sIHsgY046IFwiZnVuY3Rpb25cIiwgYks6IFwiZnVuY3Rpb25cIiwgZTogL1xcey8sIGVFOiAhMCwgYzogW3IuaW5oZXJpdChyLlRNLCB7IGI6IC9bQS1aYS16JF9dWzAtOUEtWmEteiRfXSovIH0pLCB7IGNOOiBcInBhcmFtc1wiLCBiOiAvXFwoLywgZTogL1xcKS8sIGM6IFtyLkNMQ00sIHIuQ0JDTV0sIGk6IC9bXCInXFwoXS8gfV0sIGk6IC9cXFt8JS8gfSwgeyBiOiAvXFwkWyguXS8gfSwgeyBiOiBcIlxcXFwuXCIgKyByLklSLCByOiAwIH1dIH07XG59KTtobGpzLnJlZ2lzdGVyTGFuZ3VhZ2UoXCJlcmJcIiwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4geyBzTDogXCJ4bWxcIiwgc3ViTGFuZ3VhZ2VNb2RlOiBcImNvbnRpbnVvdXNcIiwgYzogW3sgY046IFwiY29tbWVudFwiLCBiOiBcIjwlI1wiLCBlOiBcIiU+XCIgfSwgeyBiOiBcIjwlWyU9LV0/XCIsIGU6IFwiWyUtXT8lPlwiLCBzTDogXCJydWJ5XCIsIGVCOiAhMCwgZUU6ICEwIH1dIH07XG59KTtobGpzLnJlZ2lzdGVyTGFuZ3VhZ2UoXCJzY3NzXCIsIGZ1bmN0aW9uIChlKSB7XG4gIHtcbiAgICB2YXIgdCA9IFwiW2EtekEtWi1dW2EtekEtWjAtOV8tXSpcIixcbiAgICAgICAgaSA9IHsgY046IFwidmFyaWFibGVcIiwgYjogXCIoXFxcXCRcIiArIHQgKyBcIilcXFxcYlwiIH0sXG4gICAgICAgIHIgPSB7IGNOOiBcImZ1bmN0aW9uXCIsIGI6IHQgKyBcIlxcXFwoXCIsIHJCOiAhMCwgZUU6ICEwLCBlOiBcIlxcXFwoXCIgfSxcbiAgICAgICAgbyA9IHsgY046IFwiaGV4Y29sb3JcIiwgYjogXCIjWzAtOUEtRmEtZl0rXCIgfTsoeyBjTjogXCJhdHRyaWJ1dGVcIiwgYjogXCJbQS1aXFxcXF9cXFxcLlxcXFwtXStcIiwgZTogXCI6XCIsIGVFOiAhMCwgaTogXCJbXlxcXFxzXVwiLCBzdGFydHM6IHsgY046IFwidmFsdWVcIiwgZVc6ICEwLCBlRTogITAsIGM6IFtyLCBvLCBlLkNTU05NLCBlLlFTTSwgZS5BU00sIGUuQ0JDTSwgeyBjTjogXCJpbXBvcnRhbnRcIiwgYjogXCIhaW1wb3J0YW50XCIgfV0gfSB9KTtcbiAgfXJldHVybiB7IGNJOiAhMCwgaTogXCJbPS98J11cIiwgYzogW2UuQ0xDTSwgZS5DQkNNLCByLCB7IGNOOiBcImlkXCIsIGI6IFwiXFxcXCNbQS1aYS16MC05Xy1dK1wiLCByOiAwIH0sIHsgY046IFwiY2xhc3NcIiwgYjogXCJcXFxcLltBLVphLXowLTlfLV0rXCIsIHI6IDAgfSwgeyBjTjogXCJhdHRyX3NlbGVjdG9yXCIsIGI6IFwiXFxcXFtcIiwgZTogXCJcXFxcXVwiLCBpOiBcIiRcIiB9LCB7IGNOOiBcInRhZ1wiLCBiOiBcIlxcXFxiKGF8YWJicnxhY3JvbnltfGFkZHJlc3N8YXJlYXxhcnRpY2xlfGFzaWRlfGF1ZGlvfGJ8YmFzZXxiaWd8YmxvY2txdW90ZXxib2R5fGJyfGJ1dHRvbnxjYW52YXN8Y2FwdGlvbnxjaXRlfGNvZGV8Y29sfGNvbGdyb3VwfGNvbW1hbmR8ZGF0YWxpc3R8ZGR8ZGVsfGRldGFpbHN8ZGZufGRpdnxkbHxkdHxlbXxlbWJlZHxmaWVsZHNldHxmaWdjYXB0aW9ufGZpZ3VyZXxmb290ZXJ8Zm9ybXxmcmFtZXxmcmFtZXNldHwoaFsxLTZdKXxoZWFkfGhlYWRlcnxoZ3JvdXB8aHJ8aHRtbHxpfGlmcmFtZXxpbWd8aW5wdXR8aW5zfGtiZHxrZXlnZW58bGFiZWx8bGVnZW5kfGxpfGxpbmt8bWFwfG1hcmt8bWV0YXxtZXRlcnxuYXZ8bm9mcmFtZXN8bm9zY3JpcHR8b2JqZWN0fG9sfG9wdGdyb3VwfG9wdGlvbnxvdXRwdXR8cHxwYXJhbXxwcmV8cHJvZ3Jlc3N8cXxycHxydHxydWJ5fHNhbXB8c2NyaXB0fHNlY3Rpb258c2VsZWN0fHNtYWxsfHNwYW58c3RyaWtlfHN0cm9uZ3xzdHlsZXxzdWJ8c3VwfHRhYmxlfHRib2R5fHRkfHRleHRhcmVhfHRmb290fHRofHRoZWFkfHRpbWV8dGl0bGV8dHJ8dHR8dWx8dmFyfHZpZGVvKVxcXFxiXCIsIHI6IDAgfSwgeyBjTjogXCJwc2V1ZG9cIiwgYjogXCI6KHZpc2l0ZWR8dmFsaWR8cm9vdHxyaWdodHxyZXF1aXJlZHxyZWFkLXdyaXRlfHJlYWQtb25seXxvdXQtcmFuZ2V8b3B0aW9uYWx8b25seS1vZi10eXBlfG9ubHktY2hpbGR8bnRoLW9mLXR5cGV8bnRoLWxhc3Qtb2YtdHlwZXxudGgtbGFzdC1jaGlsZHxudGgtY2hpbGR8bm90fGxpbmt8bGVmdHxsYXN0LW9mLXR5cGV8bGFzdC1jaGlsZHxsYW5nfGludmFsaWR8aW5kZXRlcm1pbmF0ZXxpbi1yYW5nZXxob3Zlcnxmb2N1c3xmaXJzdC1vZi10eXBlfGZpcnN0LWxpbmV8Zmlyc3QtbGV0dGVyfGZpcnN0LWNoaWxkfGZpcnN0fGVuYWJsZWR8ZW1wdHl8ZGlzYWJsZWR8ZGVmYXVsdHxjaGVja2VkfGJlZm9yZXxhZnRlcnxhY3RpdmUpXCIgfSwgeyBjTjogXCJwc2V1ZG9cIiwgYjogXCI6OihhZnRlcnxiZWZvcmV8Y2hvaWNlc3xmaXJzdC1sZXR0ZXJ8Zmlyc3QtbGluZXxyZXBlYXQtaW5kZXh8cmVwZWF0LWl0ZW18c2VsZWN0aW9ufHZhbHVlKVwiIH0sIGksIHsgY046IFwiYXR0cmlidXRlXCIsIGI6IFwiXFxcXGIoei1pbmRleHx3b3JkLXdyYXB8d29yZC1zcGFjaW5nfHdvcmQtYnJlYWt8d2lkdGh8d2lkb3dzfHdoaXRlLXNwYWNlfHZpc2liaWxpdHl8dmVydGljYWwtYWxpZ258dW5pY29kZS1iaWRpfHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9ufHRyYW5zaXRpb24tcHJvcGVydHl8dHJhbnNpdGlvbi1kdXJhdGlvbnx0cmFuc2l0aW9uLWRlbGF5fHRyYW5zaXRpb258dHJhbnNmb3JtLXN0eWxlfHRyYW5zZm9ybS1vcmlnaW58dHJhbnNmb3JtfHRvcHx0ZXh0LXVuZGVybGluZS1wb3NpdGlvbnx0ZXh0LXRyYW5zZm9ybXx0ZXh0LXNoYWRvd3x0ZXh0LXJlbmRlcmluZ3x0ZXh0LW92ZXJmbG93fHRleHQtaW5kZW50fHRleHQtZGVjb3JhdGlvbi1zdHlsZXx0ZXh0LWRlY29yYXRpb24tbGluZXx0ZXh0LWRlY29yYXRpb24tY29sb3J8dGV4dC1kZWNvcmF0aW9ufHRleHQtYWxpZ24tbGFzdHx0ZXh0LWFsaWdufHRhYi1zaXplfHRhYmxlLWxheW91dHxyaWdodHxyZXNpemV8cXVvdGVzfHBvc2l0aW9ufHBvaW50ZXItZXZlbnRzfHBlcnNwZWN0aXZlLW9yaWdpbnxwZXJzcGVjdGl2ZXxwYWdlLWJyZWFrLWluc2lkZXxwYWdlLWJyZWFrLWJlZm9yZXxwYWdlLWJyZWFrLWFmdGVyfHBhZGRpbmctdG9wfHBhZGRpbmctcmlnaHR8cGFkZGluZy1sZWZ0fHBhZGRpbmctYm90dG9tfHBhZGRpbmd8b3ZlcmZsb3cteXxvdmVyZmxvdy14fG92ZXJmbG93LXdyYXB8b3ZlcmZsb3d8b3V0bGluZS13aWR0aHxvdXRsaW5lLXN0eWxlfG91dGxpbmUtb2Zmc2V0fG91dGxpbmUtY29sb3J8b3V0bGluZXxvcnBoYW5zfG9yZGVyfG9wYWNpdHl8b2JqZWN0LXBvc2l0aW9ufG9iamVjdC1maXR8bm9ybWFsfG5vbmV8bmF2LXVwfG5hdi1yaWdodHxuYXYtbGVmdHxuYXYtaW5kZXh8bmF2LWRvd258bWluLXdpZHRofG1pbi1oZWlnaHR8bWF4LXdpZHRofG1heC1oZWlnaHR8bWFza3xtYXJrc3xtYXJnaW4tdG9wfG1hcmdpbi1yaWdodHxtYXJnaW4tbGVmdHxtYXJnaW4tYm90dG9tfG1hcmdpbnxsaXN0LXN0eWxlLXR5cGV8bGlzdC1zdHlsZS1wb3NpdGlvbnxsaXN0LXN0eWxlLWltYWdlfGxpc3Qtc3R5bGV8bGluZS1oZWlnaHR8bGV0dGVyLXNwYWNpbmd8bGVmdHxqdXN0aWZ5LWNvbnRlbnR8aW5pdGlhbHxpbmhlcml0fGltZS1tb2RlfGltYWdlLW9yaWVudGF0aW9ufGltYWdlLXJlc29sdXRpb258aW1hZ2UtcmVuZGVyaW5nfGljb258aHlwaGVuc3xoZWlnaHR8Zm9udC13ZWlnaHR8Zm9udC12YXJpYW50LWxpZ2F0dXJlc3xmb250LXZhcmlhbnR8Zm9udC1zdHlsZXxmb250LXN0cmV0Y2h8Zm9udC1zaXplLWFkanVzdHxmb250LXNpemV8Zm9udC1sYW5ndWFnZS1vdmVycmlkZXxmb250LWtlcm5pbmd8Zm9udC1mZWF0dXJlLXNldHRpbmdzfGZvbnQtZmFtaWx5fGZvbnR8ZmxvYXR8ZmxleC13cmFwfGZsZXgtc2hyaW5rfGZsZXgtZ3Jvd3xmbGV4LWZsb3d8ZmxleC1kaXJlY3Rpb258ZmxleC1iYXNpc3xmbGV4fGZpbHRlcnxlbXB0eS1jZWxsc3xkaXNwbGF5fGRpcmVjdGlvbnxjdXJzb3J8Y291bnRlci1yZXNldHxjb3VudGVyLWluY3JlbWVudHxjb250ZW50fGNvbHVtbi13aWR0aHxjb2x1bW4tc3Bhbnxjb2x1bW4tcnVsZS13aWR0aHxjb2x1bW4tcnVsZS1zdHlsZXxjb2x1bW4tcnVsZS1jb2xvcnxjb2x1bW4tcnVsZXxjb2x1bW4tZ2FwfGNvbHVtbi1maWxsfGNvbHVtbi1jb3VudHxjb2x1bW5zfGNvbG9yfGNsaXAtcGF0aHxjbGlwfGNsZWFyfGNhcHRpb24tc2lkZXxicmVhay1pbnNpZGV8YnJlYWstYmVmb3JlfGJyZWFrLWFmdGVyfGJveC1zaXppbmd8Ym94LXNoYWRvd3xib3gtZGVjb3JhdGlvbi1icmVha3xib3R0b218Ym9yZGVyLXdpZHRofGJvcmRlci10b3Atd2lkdGh8Ym9yZGVyLXRvcC1zdHlsZXxib3JkZXItdG9wLXJpZ2h0LXJhZGl1c3xib3JkZXItdG9wLWxlZnQtcmFkaXVzfGJvcmRlci10b3AtY29sb3J8Ym9yZGVyLXRvcHxib3JkZXItc3R5bGV8Ym9yZGVyLXNwYWNpbmd8Ym9yZGVyLXJpZ2h0LXdpZHRofGJvcmRlci1yaWdodC1zdHlsZXxib3JkZXItcmlnaHQtY29sb3J8Ym9yZGVyLXJpZ2h0fGJvcmRlci1yYWRpdXN8Ym9yZGVyLWxlZnQtd2lkdGh8Ym9yZGVyLWxlZnQtc3R5bGV8Ym9yZGVyLWxlZnQtY29sb3J8Ym9yZGVyLWxlZnR8Ym9yZGVyLWltYWdlLXdpZHRofGJvcmRlci1pbWFnZS1zb3VyY2V8Ym9yZGVyLWltYWdlLXNsaWNlfGJvcmRlci1pbWFnZS1yZXBlYXR8Ym9yZGVyLWltYWdlLW91dHNldHxib3JkZXItaW1hZ2V8Ym9yZGVyLWNvbG9yfGJvcmRlci1jb2xsYXBzZXxib3JkZXItYm90dG9tLXdpZHRofGJvcmRlci1ib3R0b20tc3R5bGV8Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXN8Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1c3xib3JkZXItYm90dG9tLWNvbG9yfGJvcmRlci1ib3R0b218Ym9yZGVyfGJhY2tncm91bmQtc2l6ZXxiYWNrZ3JvdW5kLXJlcGVhdHxiYWNrZ3JvdW5kLXBvc2l0aW9ufGJhY2tncm91bmQtb3JpZ2lufGJhY2tncm91bmQtaW1hZ2V8YmFja2dyb3VuZC1jb2xvcnxiYWNrZ3JvdW5kLWNsaXB8YmFja2dyb3VuZC1hdHRhY2htZW50fGJhY2tncm91bmR8YmFja2ZhY2UtdmlzaWJpbGl0eXxhdXRvfGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb258YW5pbWF0aW9uLXBsYXktc3RhdGV8YW5pbWF0aW9uLW5hbWV8YW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudHxhbmltYXRpb24tZmlsbC1tb2RlfGFuaW1hdGlvbi1kdXJhdGlvbnxhbmltYXRpb24tZGlyZWN0aW9ufGFuaW1hdGlvbi1kZWxheXxhbmltYXRpb258YWxpZ24tc2VsZnxhbGlnbi1pdGVtc3xhbGlnbi1jb250ZW50KVxcXFxiXCIsIGk6IFwiW15cXFxcc11cIiB9LCB7IGNOOiBcInZhbHVlXCIsIGI6IFwiXFxcXGIod2hpdGVzcGFjZXx3YWl0fHctcmVzaXplfHZpc2libGV8dmVydGljYWwtdGV4dHx2ZXJ0aWNhbC1pZGVvZ3JhcGhpY3x1cHBlcmNhc2V8dXBwZXItcm9tYW58dXBwZXItYWxwaGF8dW5kZXJsaW5lfHRyYW5zcGFyZW50fHRvcHx0aGlufHRoaWNrfHRleHR8dGV4dC10b3B8dGV4dC1ib3R0b218dGItcmx8dGFibGUtaGVhZGVyLWdyb3VwfHRhYmxlLWZvb3Rlci1ncm91cHxzdy1yZXNpemV8c3VwZXJ8c3RyaWN0fHN0YXRpY3xzcXVhcmV8c29saWR8c21hbGwtY2Fwc3xzZXBhcmF0ZXxzZS1yZXNpemV8c2Nyb2xsfHMtcmVzaXplfHJ0bHxyb3ctcmVzaXplfHJpZGdlfHJpZ2h0fHJlcGVhdHxyZXBlYXQteXxyZXBlYXQteHxyZWxhdGl2ZXxwcm9ncmVzc3xwb2ludGVyfG92ZXJsaW5lfG91dHNpZGV8b3V0c2V0fG9ibGlxdWV8bm93cmFwfG5vdC1hbGxvd2VkfG5vcm1hbHxub25lfG53LXJlc2l6ZXxuby1yZXBlYXR8bm8tZHJvcHxuZXdzcGFwZXJ8bmUtcmVzaXplfG4tcmVzaXplfG1vdmV8bWlkZGxlfG1lZGl1bXxsdHJ8bHItdGJ8bG93ZXJjYXNlfGxvd2VyLXJvbWFufGxvd2VyLWFscGhhfGxvb3NlfGxpc3QtaXRlbXxsaW5lfGxpbmUtdGhyb3VnaHxsaW5lLWVkZ2V8bGlnaHRlcnxsZWZ0fGtlZXAtYWxsfGp1c3RpZnl8aXRhbGljfGludGVyLXdvcmR8aW50ZXItaWRlb2dyYXBofGluc2lkZXxpbnNldHxpbmxpbmV8aW5saW5lLWJsb2NrfGluaGVyaXR8aW5hY3RpdmV8aWRlb2dyYXBoLXNwYWNlfGlkZW9ncmFwaC1wYXJlbnRoZXNpc3xpZGVvZ3JhcGgtbnVtZXJpY3xpZGVvZ3JhcGgtYWxwaGF8aG9yaXpvbnRhbHxoaWRkZW58aGVscHxoYW5kfGdyb292ZXxmaXhlZHxlbGxpcHNpc3xlLXJlc2l6ZXxkb3VibGV8ZG90dGVkfGRpc3RyaWJ1dGV8ZGlzdHJpYnV0ZS1zcGFjZXxkaXN0cmlidXRlLWxldHRlcnxkaXN0cmlidXRlLWFsbC1saW5lc3xkaXNjfGRpc2FibGVkfGRlZmF1bHR8ZGVjaW1hbHxkYXNoZWR8Y3Jvc3NoYWlyfGNvbGxhcHNlfGNvbC1yZXNpemV8Y2lyY2xlfGNoYXJ8Y2VudGVyfGNhcGl0YWxpemV8YnJlYWstd29yZHxicmVhay1hbGx8Ym90dG9tfGJvdGh8Ym9sZGVyfGJvbGR8YmxvY2t8YmlkaS1vdmVycmlkZXxiZWxvd3xiYXNlbGluZXxhdXRvfGFsd2F5c3xhbGwtc2Nyb2xsfGFic29sdXRlfHRhYmxlfHRhYmxlLWNlbGwpXFxcXGJcIiB9LCB7IGNOOiBcInZhbHVlXCIsIGI6IFwiOlwiLCBlOiBcIjtcIiwgYzogW3IsIGksIG8sIGUuQ1NTTk0sIGUuUVNNLCBlLkFTTSwgeyBjTjogXCJpbXBvcnRhbnRcIiwgYjogXCIhaW1wb3J0YW50XCIgfV0gfSwgeyBjTjogXCJhdF9ydWxlXCIsIGI6IFwiQFwiLCBlOiBcIlt7O11cIiwgazogXCJtaXhpbiBpbmNsdWRlIGV4dGVuZCBmb3IgaWYgZWxzZSBlYWNoIHdoaWxlIGNoYXJzZXQgaW1wb3J0IGRlYnVnIG1lZGlhIHBhZ2UgY29udGVudCBmb250LWZhY2UgbmFtZXNwYWNlIHdhcm5cIiwgYzogW3IsIGksIGUuUVNNLCBlLkFTTSwgbywgZS5DU1NOTSwgeyBjTjogXCJwcmVwcm9jZXNzb3JcIiwgYjogXCJcXFxcc1tBLVphLXowLTlfLi1dK1wiLCByOiAwIH1dIH1dIH07XG59KTtobGpzLnJlZ2lzdGVyTGFuZ3VhZ2UoXCJjc3NcIiwgZnVuY3Rpb24gKGUpIHtcbiAgdmFyIGMgPSBcIlthLXpBLVotXVthLXpBLVowLTlfLV0qXCIsXG4gICAgICBhID0geyBjTjogXCJmdW5jdGlvblwiLCBiOiBjICsgXCJcXFxcKFwiLCByQjogITAsIGVFOiAhMCwgZTogXCJcXFxcKFwiIH07cmV0dXJuIHsgY0k6ICEwLCBpOiBcIls9L3wnXVwiLCBjOiBbZS5DQkNNLCB7IGNOOiBcImlkXCIsIGI6IFwiXFxcXCNbQS1aYS16MC05Xy1dK1wiIH0sIHsgY046IFwiY2xhc3NcIiwgYjogXCJcXFxcLltBLVphLXowLTlfLV0rXCIsIHI6IDAgfSwgeyBjTjogXCJhdHRyX3NlbGVjdG9yXCIsIGI6IFwiXFxcXFtcIiwgZTogXCJcXFxcXVwiLCBpOiBcIiRcIiB9LCB7IGNOOiBcInBzZXVkb1wiLCBiOiBcIjooOik/W2EtekEtWjAtOVxcXFxfXFxcXC1cXFxcK1xcXFwoXFxcXClcXFxcXFxcIlxcXFwnXStcIiB9LCB7IGNOOiBcImF0X3J1bGVcIiwgYjogXCJAKGZvbnQtZmFjZXxwYWdlKVwiLCBsOiBcIlthLXotXStcIiwgazogXCJmb250LWZhY2UgcGFnZVwiIH0sIHsgY046IFwiYXRfcnVsZVwiLCBiOiBcIkBcIiwgZTogXCJbeztdXCIsIGM6IFt7IGNOOiBcImtleXdvcmRcIiwgYjogL1xcUysvIH0sIHsgYjogL1xccy8sIGVXOiAhMCwgZUU6ICEwLCByOiAwLCBjOiBbYSwgZS5BU00sIGUuUVNNLCBlLkNTU05NXSB9XSB9LCB7IGNOOiBcInRhZ1wiLCBiOiBjLCByOiAwIH0sIHsgY046IFwicnVsZXNcIiwgYjogXCJ7XCIsIGU6IFwifVwiLCBpOiBcIlteXFxcXHNdXCIsIHI6IDAsIGM6IFtlLkNCQ00sIHsgY046IFwicnVsZVwiLCBiOiBcIlteXFxcXHNdXCIsIHJCOiAhMCwgZTogXCI7XCIsIGVXOiAhMCwgYzogW3sgY046IFwiYXR0cmlidXRlXCIsIGI6IFwiW0EtWlxcXFxfXFxcXC5cXFxcLV0rXCIsIGU6IFwiOlwiLCBlRTogITAsIGk6IFwiW15cXFxcc11cIiwgc3RhcnRzOiB7IGNOOiBcInZhbHVlXCIsIGVXOiAhMCwgZUU6ICEwLCBjOiBbYSwgZS5DU1NOTSwgZS5RU00sIGUuQVNNLCBlLkNCQ00sIHsgY046IFwiaGV4Y29sb3JcIiwgYjogXCIjWzAtOUEtRmEtZl0rXCIgfSwgeyBjTjogXCJpbXBvcnRhbnRcIiwgYjogXCIhaW1wb3J0YW50XCIgfV0gfSB9XSB9XSB9XSB9O1xufSk7aGxqcy5yZWdpc3Rlckxhbmd1YWdlKFwiaGFuZGxlYmFyc1wiLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBlID0gXCJlYWNoIGluIHdpdGggaWYgZWxzZSB1bmxlc3MgYmluZGF0dHIgYWN0aW9uIGNvbGxlY3Rpb24gZGVidWdnZXIgbG9nIG91dGxldCB0ZW1wbGF0ZSB1bmJvdW5kIHZpZXcgeWllbGRcIjtyZXR1cm4geyBhbGlhc2VzOiBbXCJoYnNcIiwgXCJodG1sLmhic1wiLCBcImh0bWwuaGFuZGxlYmFyc1wiXSwgY0k6ICEwLCBzTDogXCJ4bWxcIiwgc3ViTGFuZ3VhZ2VNb2RlOiBcImNvbnRpbnVvdXNcIiwgYzogW3sgY046IFwiZXhwcmVzc2lvblwiLCBiOiBcInt7XCIsIGU6IFwifX1cIiwgYzogW3sgY046IFwiYmVnaW4tYmxvY2tcIiwgYjogXCIjW2EtekEtWi0gLl0rXCIsIGs6IGUgfSwgeyBjTjogXCJzdHJpbmdcIiwgYjogJ1wiJywgZTogJ1wiJyB9LCB7IGNOOiBcImVuZC1ibG9ja1wiLCBiOiBcIlxcXFwvW2EtekEtWi0gLl0rXCIsIGs6IGUgfSwgeyBjTjogXCJ2YXJpYWJsZVwiLCBiOiBcIlthLXpBLVotLl0rXCIsIGs6IGUgfV0gfV0gfTtcbn0pO1xuXG59LHtcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlXCI6MTksXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXNcIjoyMn1dLDE2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG59LHtcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCI6Mjd9XSwxNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG59LHtcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIjoyOH1dLDE4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG59LHtcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCI6Mjl9XSwxOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xufSx7XCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZVwiOjMwfV0sMjA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydGllc1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xufSx7XCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzXCI6MzF9XSwyMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xufSx7XCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiOjMyfV0sMjI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG59LHtcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiOjMzfV0sMjM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcbn0se1wiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIjozNH1dLDI0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcbn0se1wiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbFwiOjM1fV0sMjU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xufSx7XCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCI6MzZ9XSwyNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbn0se31dLDI3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKS5jb3JlLkFycmF5LmZyb207XG59LHtcIi4uLy4uL21vZHVsZXMvJFwiOjUyLFwiLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbVwiOjY2LFwiLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yXCI6NzJ9XSwyODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLml0ZXItaGVscGVycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzLyQnKS5jb3JlLmdldEl0ZXJhdG9yO1xufSx7XCIuLi9tb2R1bGVzLyRcIjo1MixcIi4uL21vZHVsZXMvY29yZS5pdGVyLWhlbHBlcnNcIjo2NSxcIi4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvclwiOjcyLFwiLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlXCI6NzR9XSwyOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJCcpLmNvcmUuT2JqZWN0LmFzc2lnbjtcbn0se1wiLi4vLi4vbW9kdWxlcy8kXCI6NTIsXCIuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduXCI6Njh9XSwzMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgJCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCl7XG4gIHJldHVybiAkLmNyZWF0ZShQLCBEKTtcbn07XG59LHtcIi4uLy4uL21vZHVsZXMvJFwiOjUyfV0sMzE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyICQgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhULCBEKXtcbiAgcmV0dXJuICQuc2V0RGVzY3MoVCwgRCk7XG59O1xufSx7XCIuLi8uLi9tb2R1bGVzLyRcIjo1Mn1dLDMyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciAkID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2Mpe1xuICByZXR1cm4gJC5zZXREZXNjKGl0LCBrZXksIGRlc2MpO1xufTtcbn0se1wiLi4vLi4vbW9kdWxlcy8kXCI6NTJ9XSwzMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc3RhdGljcy1hY2NlcHQtcHJpbWl0aXZlcycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKS5jb3JlLk9iamVjdC5rZXlzO1xufSx7XCIuLi8uLi9tb2R1bGVzLyRcIjo1MixcIi4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zdGF0aWNzLWFjY2VwdC1wcmltaXRpdmVzXCI6Njl9XSwzNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzLyQnKS5jb3JlLlByb21pc2U7XG59LHtcIi4uL21vZHVsZXMvJFwiOjUyLFwiLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZ1wiOjcwLFwiLi4vbW9kdWxlcy9lczYucHJvbWlzZVwiOjcxLFwiLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yXCI6NzIsXCIuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGVcIjo3NH1dLDM1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN5bWJvbCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKS5jb3JlLlN5bWJvbDtcbn0se1wiLi4vLi4vbW9kdWxlcy8kXCI6NTIsXCIuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2xcIjo3M31dLDM2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJC53a3MnKSgnaXRlcmF0b3InKTtcbn0se1wiLi4vLi4vbW9kdWxlcy8kLndrc1wiOjY0LFwiLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yXCI6NzIsXCIuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGVcIjo3NH1dLDM3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciAkID0gcmVxdWlyZSgnLi8kJyk7XG5mdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uLCBtc2cxLCBtc2cyKXtcbiAgaWYoIWNvbmRpdGlvbil0aHJvdyBUeXBlRXJyb3IobXNnMiA/IG1zZzEgKyBtc2cyIDogbXNnMSk7XG59XG5hc3NlcnQuZGVmID0gJC5hc3NlcnREZWZpbmVkO1xuYXNzZXJ0LmZuID0gZnVuY3Rpb24oaXQpe1xuICBpZighJC5pc0Z1bmN0aW9uKGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuYXNzZXJ0Lm9iaiA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoISQuaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbmFzc2VydC5pbnN0ID0gZnVuY3Rpb24oaXQsIENvbnN0cnVjdG9yLCBuYW1lKXtcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSl0aHJvdyBUeXBlRXJyb3IobmFtZSArIFwiOiB1c2UgdGhlICduZXcnIG9wZXJhdG9yIVwiKTtcbiAgcmV0dXJuIGl0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gYXNzZXJ0O1xufSx7XCIuLyRcIjo1Mn1dLDM4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZW51bUtleXMgPSByZXF1aXJlKCcuLyQuZW51bS1rZXlzJyk7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG4gIHZhciBUID0gT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZCh0YXJnZXQpKVxuICAgICwgbCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGkgPSAxO1xuICB3aGlsZShsID4gaSl7XG4gICAgdmFyIFMgICAgICA9ICQuRVM1T2JqZWN0KGFyZ3VtZW50c1tpKytdKVxuICAgICAgLCBrZXlzICAgPSBlbnVtS2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKVRba2V5ID0ga2V5c1tqKytdXSA9IFNba2V5XTtcbiAgfVxuICByZXR1cm4gVDtcbn07XG59LHtcIi4vJFwiOjUyLFwiLi8kLmVudW0ta2V5c1wiOjQzfV0sMzk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBUQUcgICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKVxuICAsIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5mdW5jdGlvbiBjb2YoaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufVxuY29mLmNsYXNzb2YgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBUO1xuICByZXR1cm4gaXQgPT0gdW5kZWZpbmVkID8gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogJ051bGwnXG4gICAgOiB0eXBlb2YgKFQgPSAoTyA9IE9iamVjdChpdCkpW1RBR10pID09ICdzdHJpbmcnID8gVCA6IGNvZihPKTtcbn07XG5jb2Yuc2V0ID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICEkLmhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkkLmhpZGUoaXQsIFRBRywgdGFnKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGNvZjtcbn0se1wiLi8kXCI6NTIsXCIuLyQud2tzXCI6NjR9XSw0MDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyBPcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhc3NlcnRGdW5jdGlvbiA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKS5mbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFzc2VydEZ1bmN0aW9uKGZuKTtcbiAgaWYofmxlbmd0aCAmJiB0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfSByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgICB9O1xufTtcbn0se1wiLi8kLmFzc2VydFwiOjM3fV0sNDE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGdsb2JhbCAgICAgPSAkLmdcbiAgLCBjb3JlICAgICAgID0gJC5jb3JlXG4gICwgaXNGdW5jdGlvbiA9ICQuaXNGdW5jdGlvbjtcbmZ1bmN0aW9uIGN0eChmbiwgdGhhdCl7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufVxuLy8gdHlwZSBiaXRtYXBcbiRkZWYuRiA9IDE7ICAvLyBmb3JjZWRcbiRkZWYuRyA9IDI7ICAvLyBnbG9iYWxcbiRkZWYuUyA9IDQ7ICAvLyBzdGF0aWNcbiRkZWYuUCA9IDg7ICAvLyBwcm90b1xuJGRlZi5CID0gMTY7IC8vIGJpbmRcbiRkZWYuVyA9IDMyOyAvLyB3cmFwXG5mdW5jdGlvbiAkZGVmKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHBcbiAgICAsIGlzR2xvYmFsID0gdHlwZSAmICRkZWYuR1xuICAgICwgaXNQcm90byAgPSB0eXBlICYgJGRlZi5QXG4gICAgLCB0YXJnZXQgICA9IGlzR2xvYmFsID8gZ2xvYmFsIDogdHlwZSAmICRkZWYuU1xuICAgICAgICA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pLnByb3RvdHlwZVxuICAgICwgZXhwb3J0cyAgPSBpc0dsb2JhbCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICBpZihpc0dsb2JhbClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gISh0eXBlICYgJGRlZi5GKSAmJiB0YXJnZXQgJiYga2V5IGluIHRhcmdldDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGlmKGlzR2xvYmFsICYmICFpc0Z1bmN0aW9uKHRhcmdldFtrZXldKSlleHAgPSBzb3VyY2Vba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGVsc2UgaWYodHlwZSAmICRkZWYuQiAmJiBvd24pZXhwID0gY3R4KG91dCwgZ2xvYmFsKTtcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIGVsc2UgaWYodHlwZSAmICRkZWYuVyAmJiB0YXJnZXRba2V5XSA9PSBvdXQpIWZ1bmN0aW9uKEMpe1xuICAgICAgZXhwID0gZnVuY3Rpb24ocGFyYW0pe1xuICAgICAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIEMgPyBuZXcgQyhwYXJhbSkgOiBDKHBhcmFtKTtcbiAgICAgIH07XG4gICAgICBleHAucHJvdG90eXBlID0gQy5wcm90b3R5cGU7XG4gICAgfShvdXQpO1xuICAgIGVsc2UgZXhwID0gaXNQcm90byAmJiBpc0Z1bmN0aW9uKG91dCkgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnRcbiAgICBleHBvcnRzW2tleV0gPSBleHA7XG4gICAgaWYoaXNQcm90bykoZXhwb3J0cy5wcm90b3R5cGUgfHwgKGV4cG9ydHMucHJvdG90eXBlID0ge30pKVtrZXldID0gb3V0O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9ICRkZWY7XG59LHtcIi4vJFwiOjUyfV0sNDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBkb2N1bWVudCA9ICQuZy5kb2N1bWVudFxuICAsIGlzT2JqZWN0ID0gJC5pc09iamVjdFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbn0se1wiLi8kXCI6NTJ9XSw0MzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBrZXlzICAgICAgID0gJC5nZXRLZXlzKGl0KVxuICAgICwgZ2V0RGVzYyAgICA9ICQuZ2V0RGVzY1xuICAgICwgZ2V0U3ltYm9scyA9ICQuZ2V0U3ltYm9scztcbiAgaWYoZ2V0U3ltYm9scykkLmVhY2guY2FsbChnZXRTeW1ib2xzKGl0KSwgZnVuY3Rpb24oa2V5KXtcbiAgICBpZihnZXREZXNjKGl0LCBrZXkpLmVudW1lcmFibGUpa2V5cy5wdXNoKGtleSk7XG4gIH0pO1xuICByZXR1cm4ga2V5cztcbn07XG59LHtcIi4vJFwiOjUyfV0sNDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIGN0eCAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBnZXQgID0gcmVxdWlyZSgnLi8kLml0ZXInKS5nZXRcbiAgLCBjYWxsID0gcmVxdWlyZSgnLi8kLml0ZXItY2FsbCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQpe1xuICB2YXIgaXRlcmF0b3IgPSBnZXQoaXRlcmFibGUpXG4gICAgLCBmICAgICAgICA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKVxuICAgICwgc3RlcDtcbiAgd2hpbGUoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKXtcbiAgICBpZihjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKSA9PT0gZmFsc2Upe1xuICAgICAgcmV0dXJuIGNhbGwuY2xvc2UoaXRlcmF0b3IpO1xuICAgIH1cbiAgfVxufTtcbn0se1wiLi8kLmN0eFwiOjQwLFwiLi8kLml0ZXJcIjo1MSxcIi4vJC5pdGVyLWNhbGxcIjo0OH1dLDQ1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJCl7XG4gICQuRlcgICA9IGZhbHNlO1xuICAkLnBhdGggPSAkLmNvcmU7XG4gIHJldHVybiAkO1xufTtcbn0se31dLDQ2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcclxudmFyICQgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgdG9TdHJpbmcgPSB7fS50b1N0cmluZ1xyXG4gICwgZ2V0TmFtZXMgPSAkLmdldE5hbWVzO1xyXG5cclxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xyXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xyXG5cclxuZnVuY3Rpb24gZ2V0V2luZG93TmFtZXMoaXQpe1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gZ2V0TmFtZXMoaXQpO1xyXG4gIH0gY2F0Y2goZSl7XHJcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzLmdldCA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xyXG4gIGlmKHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nKXJldHVybiBnZXRXaW5kb3dOYW1lcyhpdCk7XHJcbiAgcmV0dXJuIGdldE5hbWVzKCQudG9PYmplY3QoaXQpKTtcclxufTtcbn0se1wiLi8kXCI6NTJ9XSw0NzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyBGYXN0IGFwcGx5XG4vLyBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIGFyZ3MsIHRoYXQpe1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaChhcmdzLmxlbmd0aCl7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gICAgY2FzZSA1OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdKTtcbiAgfSByZXR1cm4gICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcbn0se31dLDQ4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciBhc3NlcnRPYmplY3QgPSByZXF1aXJlKCcuLyQuYXNzZXJ0Jykub2JqO1xuZnVuY3Rpb24gY2xvc2UoaXRlcmF0b3Ipe1xuICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICBpZihyZXQgIT09IHVuZGVmaW5lZClhc3NlcnRPYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbn1cbmZ1bmN0aW9uIGNhbGwoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhc3NlcnRPYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIH0gY2F0Y2goZSl7XG4gICAgY2xvc2UoaXRlcmF0b3IpO1xuICAgIHRocm93IGU7XG4gIH1cbn1cbmNhbGwuY2xvc2UgPSBjbG9zZTtcbm1vZHVsZS5leHBvcnRzID0gY2FsbDtcbn0se1wiLi8kLmFzc2VydFwiOjM3fV0sNDk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyICRkZWYgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRyZWRlZiAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZicpXG4gICwgJCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjb2YgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCAkaXRlciAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlcicpXG4gICwgU1lNQk9MX0lURVJBVE9SID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgRkZfSVRFUkFUT1IgICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgID0gJ3ZhbHVlcydcbiAgLCBJdGVyYXRvcnMgICAgICAgPSAkaXRlci5JdGVyYXRvcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFKXtcbiAgJGl0ZXIuY3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgZnVuY3Rpb24gY3JlYXRlTWV0aG9kKGtpbmQpe1xuICAgIGZ1bmN0aW9uICQkKHRoYXQpe1xuICAgICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGF0LCBraW5kKTtcbiAgICB9XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gJCQodGhpcyk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJCQodGhpcyk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gJCQodGhpcyk7IH07XG4gIH1cbiAgdmFyIFRBRyAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBwcm90byAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCBfbmF0aXZlICA9IHByb3RvW1NZTUJPTF9JVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsIF9kZWZhdWx0ID0gX25hdGl2ZSB8fCBjcmVhdGVNZXRob2QoREVGQVVMVClcbiAgICAsIG1ldGhvZHMsIGtleTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZihfbmF0aXZlKXtcbiAgICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSAkLmdldFByb3RvKF9kZWZhdWx0LmNhbGwobmV3IEJhc2UpKTtcbiAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgY29mLnNldChJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAvLyBGRiBmaXhcbiAgICBpZigkLkZXICYmICQuaGFzKHByb3RvLCBGRl9JVEVSQVRPUikpJGl0ZXIuc2V0KEl0ZXJhdG9yUHJvdG90eXBlLCAkLnRoYXQpO1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigkLkZXIHx8IEZPUkNFKSRpdGVyLnNldChwcm90bywgX2RlZmF1bHQpO1xuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IF9kZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSAkLnRoYXQ7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgICAgICAgICA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKEtFWVMpLFxuICAgICAgdmFsdWVzOiAgREVGQVVMVCA9PSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZChWQUxVRVMpLFxuICAgICAgZW50cmllczogREVGQVVMVCAhPSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZCgnZW50cmllcycpXG4gICAgfTtcbiAgICBpZihGT1JDRSlmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKSRyZWRlZihwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZGVmKCRkZWYuUCArICRkZWYuRiAqICRpdGVyLkJVR0dZLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxufTtcbn0se1wiLi8kXCI6NTIsXCIuLyQuY29mXCI6MzksXCIuLyQuZGVmXCI6NDEsXCIuLyQuaXRlclwiOjUxLFwiLi8kLnJlZGVmXCI6NTUsXCIuLyQud2tzXCI6NjR9XSw1MDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgU1lNQk9MX0lURVJBVE9SID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HICAgID0gZmFsc2U7XG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bU1lNQk9MX0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIGlmKCFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbU1lNQk9MX0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHNhZmUgPSB0cnVlOyB9O1xuICAgIGFycltTWU1CT0xfSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcbn0se1wiLi8kLndrc1wiOjY0fV0sNTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjb2YgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsIGNsYXNzb2YgICAgICAgICAgID0gY29mLmNsYXNzb2ZcbiAgLCBhc3NlcnQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKVxuICAsIGFzc2VydE9iamVjdCAgICAgID0gYXNzZXJ0Lm9ialxuICAsIFNZTUJPTF9JVEVSQVRPUiAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgRkZfSVRFUkFUT1IgICAgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBJdGVyYXRvcnMgICAgICAgICA9IHJlcXVpcmUoJy4vJC5zaGFyZWQnKSgnaXRlcmF0b3JzJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnNldEl0ZXJhdG9yKEl0ZXJhdG9yUHJvdG90eXBlLCAkLnRoYXQpO1xuZnVuY3Rpb24gc2V0SXRlcmF0b3IoTywgdmFsdWUpe1xuICAkLmhpZGUoTywgU1lNQk9MX0lURVJBVE9SLCB2YWx1ZSk7XG4gIC8vIEFkZCBpdGVyYXRvciBmb3IgRkYgaXRlcmF0b3IgcHJvdG9jb2xcbiAgaWYoRkZfSVRFUkFUT1IgaW4gW10pJC5oaWRlKE8sIEZGX0lURVJBVE9SLCB2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gIEJVR0dZOiAna2V5cycgaW4gW10gJiYgISgnbmV4dCcgaW4gW10ua2V5cygpKSxcbiAgSXRlcmF0b3JzOiBJdGVyYXRvcnMsXG4gIHN0ZXA6IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbiAgfSxcbiAgaXM6IGZ1bmN0aW9uKGl0KXtcbiAgICB2YXIgTyAgICAgID0gT2JqZWN0KGl0KVxuICAgICAgLCBTeW1ib2wgPSAkLmcuU3ltYm9sO1xuICAgIHJldHVybiAoU3ltYm9sICYmIFN5bWJvbC5pdGVyYXRvciB8fCBGRl9JVEVSQVRPUikgaW4gT1xuICAgICAgfHwgU1lNQk9MX0lURVJBVE9SIGluIE9cbiAgICAgIHx8ICQuaGFzKEl0ZXJhdG9ycywgY2xhc3NvZihPKSk7XG4gIH0sXG4gIGdldDogZnVuY3Rpb24oaXQpe1xuICAgIHZhciBTeW1ib2wgPSAkLmcuU3ltYm9sXG4gICAgICAsIGdldEl0ZXI7XG4gICAgaWYoaXQgIT0gdW5kZWZpbmVkKXtcbiAgICAgIGdldEl0ZXIgPSBpdFtTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yIHx8IEZGX0lURVJBVE9SXVxuICAgICAgICB8fCBpdFtTWU1CT0xfSVRFUkFUT1JdXG4gICAgICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG4gICAgfVxuICAgIGFzc2VydCgkLmlzRnVuY3Rpb24oZ2V0SXRlciksIGl0LCAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgICByZXR1cm4gYXNzZXJ0T2JqZWN0KGdldEl0ZXIuY2FsbChpdCkpO1xuICB9LFxuICBzZXQ6IHNldEl0ZXJhdG9yLFxuICBjcmVhdGU6IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0LCBwcm90byl7XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gJC5jcmVhdGUocHJvdG8gfHwgSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiAkLmRlc2MoMSwgbmV4dCl9KTtcbiAgICBjb2Yuc2V0KENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xuICB9XG59O1xufSx7XCIuLyRcIjo1MixcIi4vJC5hc3NlcnRcIjozNyxcIi4vJC5jb2ZcIjozOSxcIi4vJC5zaGFyZWRcIjo1OCxcIi4vJC53a3NcIjo2NH1dLDUyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpXG4gICwgY29yZSAgID0ge31cbiAgLCBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eVxuICAsIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHlcbiAgLCBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vclxuICAsIG1heCAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICA9IE1hdGgubWluO1xuLy8gVGhlIGVuZ2luZSB3b3JrcyBmaW5lIHdpdGggZGVzY3JpcHRvcnM/IFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHkuXG52YXIgREVTQyA9ICEhZnVuY3Rpb24oKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDI7IH19KS5hID09IDI7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbn0oKTtcbnZhciBoaWRlID0gY3JlYXRlRGVmaW5lcigxKTtcbi8vIDcuMS40IFRvSW50ZWdlclxuZnVuY3Rpb24gdG9JbnRlZ2VyKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59XG5mdW5jdGlvbiBkZXNjKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn1cbmZ1bmN0aW9uIHNpbXBsZVNldChvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufVxuZnVuY3Rpb24gY3JlYXRlRGVmaW5lcihiaXRtYXApe1xuICByZXR1cm4gREVTQyA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gICAgcmV0dXJuICQuc2V0RGVzYyhvYmplY3QsIGtleSwgZGVzYyhiaXRtYXAsIHZhbHVlKSk7XG4gIH0gOiBzaW1wbGVTZXQ7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGl0KXtcbiAgcmV0dXJuIGl0ICE9PSBudWxsICYmICh0eXBlb2YgaXQgPT0gJ29iamVjdCcgfHwgdHlwZW9mIGl0ID09ICdmdW5jdGlvbicpO1xufVxuZnVuY3Rpb24gaXNGdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIGFzc2VydERlZmluZWQoaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59XG5cbnZhciAkID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuZncnKSh7XG4gIGc6IGdsb2JhbCxcbiAgY29yZTogY29yZSxcbiAgaHRtbDogZ2xvYmFsLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgLy8gaHR0cDovL2pzcGVyZi5jb20vY29yZS1qcy1pc29iamVjdFxuICBpc09iamVjdDogICBpc09iamVjdCxcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgdGhhdDogZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgLy8gNy4xLjQgVG9JbnRlZ2VyXG4gIHRvSW50ZWdlcjogdG9JbnRlZ2VyLFxuICAvLyA3LjEuMTUgVG9MZW5ndGhcbiAgdG9MZW5ndGg6IGZ1bmN0aW9uKGl0KXtcbiAgICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxuICB9LFxuICB0b0luZGV4OiBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gICAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG4gIH0sXG4gIGhhczogZnVuY3Rpb24oaXQsIGtleSl7XG4gICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG4gIH0sXG4gIGNyZWF0ZTogICAgIE9iamVjdC5jcmVhdGUsXG4gIGdldFByb3RvOiAgIE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgREVTQzogICAgICAgREVTQyxcbiAgZGVzYzogICAgICAgZGVzYyxcbiAgZ2V0RGVzYzogICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgc2V0RGVzYzogICAgZGVmaW5lUHJvcGVydHksXG4gIHNldERlc2NzOiAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzLFxuICBnZXRLZXlzOiAgICBPYmplY3Qua2V5cyxcbiAgZ2V0TmFtZXM6ICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsXG4gIGdldFN5bWJvbHM6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gIGFzc2VydERlZmluZWQ6IGFzc2VydERlZmluZWQsXG4gIC8vIER1bW15LCBmaXggZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmcgaW4gZXM1IG1vZHVsZVxuICBFUzVPYmplY3Q6IE9iamVjdCxcbiAgdG9PYmplY3Q6IGZ1bmN0aW9uKGl0KXtcbiAgICByZXR1cm4gJC5FUzVPYmplY3QoYXNzZXJ0RGVmaW5lZChpdCkpO1xuICB9LFxuICBoaWRlOiBoaWRlLFxuICBkZWY6IGNyZWF0ZURlZmluZXIoMCksXG4gIHNldDogZ2xvYmFsLlN5bWJvbCA/IHNpbXBsZVNldCA6IGhpZGUsXG4gIGVhY2g6IFtdLmZvckVhY2hcbn0pO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbmlmKHR5cGVvZiBfX2UgIT0gJ3VuZGVmaW5lZCcpX19lID0gY29yZTtcbmlmKHR5cGVvZiBfX2cgIT0gJ3VuZGVmaW5lZCcpX19nID0gZ2xvYmFsO1xufSx7XCIuLyQuZndcIjo0NX1dLDUzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciAkID0gcmVxdWlyZSgnLi8kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgZWwpe1xuICB2YXIgTyAgICAgID0gJC50b09iamVjdChvYmplY3QpXG4gICAgLCBrZXlzICAgPSAkLmdldEtleXMoTylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKGxlbmd0aCA+IGluZGV4KWlmKE9ba2V5ID0ga2V5c1tpbmRleCsrXV0gPT09IGVsKXJldHVybiBrZXk7XG59O1xufSx7XCIuLyRcIjo1Mn1dLDU0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciAkcmVkZWYgPSByZXF1aXJlKCcuLyQucmVkZWYnKTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQsIHNyYyl7XHJcbiAgZm9yKHZhciBrZXkgaW4gc3JjKSRyZWRlZih0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xyXG4gIHJldHVybiB0YXJnZXQ7XHJcbn07XG59LHtcIi4vJC5yZWRlZlwiOjU1fV0sNTU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQnKS5oaWRlO1xufSx7XCIuLyRcIjo1Mn1dLDU2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmlzIHx8IGZ1bmN0aW9uIGlzKHgsIHkpe1xyXG4gIHJldHVybiB4ID09PSB5ID8geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHkgOiB4ICE9IHggJiYgeSAhPSB5O1xyXG59O1xufSx7fV0sNTc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyICQgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgYXNzZXJ0ID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpO1xuZnVuY3Rpb24gY2hlY2soTywgcHJvdG8pe1xuICBhc3NlcnQub2JqKE8pO1xuICBhc3NlcnQocHJvdG8gPT09IG51bGwgfHwgJC5pc09iamVjdChwcm90byksIHByb3RvLCBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICA/IGZ1bmN0aW9uKGJ1Z2d5LCBzZXQpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHNldCA9IHJlcXVpcmUoJy4vJC5jdHgnKShGdW5jdGlvbi5jYWxsLCAkLmdldERlc2MoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgICAgc2V0KHt9LCBbXSk7XG4gICAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgICByZXR1cm4gTztcbiAgICAgICAgfTtcbiAgICAgIH0oKVxuICAgIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xufSx7XCIuLyRcIjo1MixcIi4vJC5hc3NlcnRcIjozNyxcIi4vJC5jdHhcIjo0MH1dLDU4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciAkICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcclxuICAsIHN0b3JlICA9ICQuZ1tTSEFSRURdIHx8ICgkLmdbU0hBUkVEXSA9IHt9KTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xyXG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xyXG59O1xufSx7XCIuLyRcIjo1Mn1dLDU5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciAkICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBTUEVDSUVTID0gcmVxdWlyZSgnLi8kLndrcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEMpe1xuICBpZigkLkRFU0MgJiYgIShTUEVDSUVTIGluIEMpKSQuc2V0RGVzYyhDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogJC50aGF0XG4gIH0pO1xufTtcbn0se1wiLi8kXCI6NTIsXCIuLyQud2tzXCI6NjR9XSw2MDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxudmFyICQgPSByZXF1aXJlKCcuLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoJC5hc3NlcnREZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gJC50b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbFxuICAgICAgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcbn0se1wiLi8kXCI6NTJ9XSw2MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG52YXIgJCAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjdHggICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBjb2YgICAgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCBpbnZva2UgPSByZXF1aXJlKCcuLyQuaW52b2tlJylcbiAgLCBjZWwgICAgPSByZXF1aXJlKCcuLyQuZG9tLWNyZWF0ZScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gJC5nXG4gICwgaXNGdW5jdGlvbiAgICAgICAgID0gJC5pc0Z1bmN0aW9uXG4gICwgaHRtbCAgICAgICAgICAgICAgID0gJC5odG1sXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBzZXRUYXNrICAgICAgICAgICAgPSBnbG9iYWwuc2V0SW1tZWRpYXRlXG4gICwgY2xlYXJUYXNrICAgICAgICAgID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlXG4gICwgTWVzc2FnZUNoYW5uZWwgICAgID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsXG4gICwgY291bnRlciAgICAgICAgICAgID0gMFxuICAsIHF1ZXVlICAgICAgICAgICAgICA9IHt9XG4gICwgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSdcbiAgLCBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbmZ1bmN0aW9uIHJ1bigpe1xuICB2YXIgaWQgPSArdGhpcztcbiAgaWYoJC5oYXMocXVldWUsIGlkKSl7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufVxuZnVuY3Rpb24gbGlzdG5lcihldmVudCl7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufVxuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYoIWlzRnVuY3Rpb24oc2V0VGFzaykgfHwgIWlzRnVuY3Rpb24oY2xlYXJUYXNrKSl7XG4gIHNldFRhc2sgPSBmdW5jdGlvbihmbil7XG4gICAgdmFyIGFyZ3MgPSBbXSwgaSA9IDE7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24oKXtcbiAgICAgIGludm9rZShpc0Z1bmN0aW9uKGZuKSA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbihpZCl7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmKGNvZihwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIE1vZGVybiBicm93c2Vycywgc2tpcCBpbXBsZW1lbnRhdGlvbiBmb3IgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyBvYmplY3RcbiAgfSBlbHNlIGlmKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIGlzRnVuY3Rpb24oZ2xvYmFsLnBvc3RNZXNzYWdlKSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0bmVyLCBmYWxzZSk7XG4gIC8vIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmKGlzRnVuY3Rpb24oTWVzc2FnZUNoYW5uZWwpKXtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsO1xuICAgIHBvcnQgICAgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdG5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0Jykpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6ICAgc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcbn0se1wiLi8kXCI6NTIsXCIuLyQuY29mXCI6MzksXCIuLyQuY3R4XCI6NDAsXCIuLyQuZG9tLWNyZWF0ZVwiOjQyLFwiLi8kLmludm9rZVwiOjQ3fV0sNjI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIHNpZCA9IDA7XG5mdW5jdGlvbiB1aWQoa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsrc2lkICsgTWF0aC5yYW5kb20oKSkudG9TdHJpbmcoMzYpKTtcbn1cbnVpZC5zYWZlID0gcmVxdWlyZSgnLi8kJykuZy5TeW1ib2wgfHwgdWlkO1xubW9kdWxlLmV4cG9ydHMgPSB1aWQ7XG59LHtcIi4vJFwiOjUyfV0sNjM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9O1xufSx7fV0sNjQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vJCcpLmdcbiAgLCBzdG9yZSAgPSByZXF1aXJlKCcuLyQuc2hhcmVkJykoJ3drcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgZ2xvYmFsLlN5bWJvbCAmJiBnbG9iYWwuU3ltYm9sW25hbWVdIHx8IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG59LHtcIi4vJFwiOjUyLFwiLi8kLnNoYXJlZFwiOjU4LFwiLi8kLnVpZFwiOjYyfV0sNjU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIGNvcmUgID0gcmVxdWlyZSgnLi8kJykuY29yZVxuICAsICRpdGVyID0gcmVxdWlyZSgnLi8kLml0ZXInKTtcbmNvcmUuaXNJdGVyYWJsZSAgPSAkaXRlci5pcztcbmNvcmUuZ2V0SXRlcmF0b3IgPSAkaXRlci5nZXQ7XG59LHtcIi4vJFwiOjUyLFwiLi8kLml0ZXJcIjo1MX1dLDY2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciAkICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY3R4ICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCAkZGVmICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRpdGVyID0gcmVxdWlyZSgnLi8kLml0ZXInKVxuICAsIGNhbGwgID0gcmVxdWlyZSgnLi8kLml0ZXItY2FsbCcpO1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhcmVxdWlyZSgnLi8kLml0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UvKiwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQqLyl7XG4gICAgdmFyIE8gICAgICAgPSBPYmplY3QoJC5hc3NlcnREZWZpbmVkKGFycmF5TGlrZSkpXG4gICAgICAsIG1hcGZuICAgPSBhcmd1bWVudHNbMV1cbiAgICAgICwgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWRcbiAgICAgICwgZiAgICAgICA9IG1hcHBpbmcgPyBjdHgobWFwZm4sIGFyZ3VtZW50c1syXSwgMikgOiB1bmRlZmluZWRcbiAgICAgICwgaW5kZXggICA9IDBcbiAgICAgICwgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmKCRpdGVyLmlzKE8pKXtcbiAgICAgIGl0ZXJhdG9yID0gJGl0ZXIuZ2V0KE8pO1xuICAgICAgLy8gc3RyYW5nZSBJRSBxdWlya3MgbW9kZSBidWcgLT4gdXNlIHR5cGVvZiBpbnN0ZWFkIG9mIGlzRnVuY3Rpb25cbiAgICAgIHJlc3VsdCAgID0gbmV3ICh0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5KTtcbiAgICAgIGZvcig7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKyl7XG4gICAgICAgIHJlc3VsdFtpbmRleF0gPSBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgZiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzdHJhbmdlIElFIHF1aXJrcyBtb2RlIGJ1ZyAtPiB1c2UgdHlwZW9mIGluc3RlYWQgb2YgaXNGdW5jdGlvblxuICAgICAgcmVzdWx0ID0gbmV3ICh0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5KShsZW5ndGggPSAkLnRvTGVuZ3RoKE8ubGVuZ3RoKSk7XG4gICAgICBmb3IoOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgICAgIHJlc3VsdFtpbmRleF0gPSBtYXBwaW5nID8gZihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF07XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbn0se1wiLi8kXCI6NTIsXCIuLyQuY3R4XCI6NDAsXCIuLyQuZGVmXCI6NDEsXCIuLyQuaXRlclwiOjUxLFwiLi8kLml0ZXItY2FsbFwiOjQ4LFwiLi8kLml0ZXItZGV0ZWN0XCI6NTB9XSw2NzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgc2V0VW5zY29wZSA9IHJlcXVpcmUoJy4vJC51bnNjb3BlJylcbiAgLCBJVEVSICAgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpLnNhZmUoJ2l0ZXInKVxuICAsICRpdGVyICAgICAgPSByZXF1aXJlKCcuLyQuaXRlcicpXG4gICwgc3RlcCAgICAgICA9ICRpdGVyLnN0ZXBcbiAgLCBJdGVyYXRvcnMgID0gJGl0ZXIuSXRlcmF0b3JzO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuLyQuaXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICAkLnNldCh0aGlzLCBJVEVSLCB7bzogJC50b09iamVjdChpdGVyYXRlZCksIGk6IDAsIGs6IGtpbmR9KTtcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIGl0ZXIgID0gdGhpc1tJVEVSXVxuICAgICwgTyAgICAgPSBpdGVyLm9cbiAgICAsIGtpbmQgID0gaXRlci5rXG4gICAgLCBpbmRleCA9IGl0ZXIuaSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgaXRlci5vID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5zZXRVbnNjb3BlKCdrZXlzJyk7XG5zZXRVbnNjb3BlKCd2YWx1ZXMnKTtcbnNldFVuc2NvcGUoJ2VudHJpZXMnKTtcbn0se1wiLi8kXCI6NTIsXCIuLyQuaXRlclwiOjUxLFwiLi8kLml0ZXItZGVmaW5lXCI6NDksXCIuLyQudWlkXCI6NjIsXCIuLyQudW5zY29wZVwiOjYzfV0sNjg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuLyQuYXNzaWduJyl9KTtcbn0se1wiLi8kLmFzc2lnblwiOjM4LFwiLi8kLmRlZlwiOjQxfV0sNjk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCAkZGVmICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGlzT2JqZWN0ID0gJC5pc09iamVjdFxuICAsIHRvT2JqZWN0ID0gJC50b09iamVjdDtcbiQuZWFjaC5jYWxsKCgnZnJlZXplLHNlYWwscHJldmVudEV4dGVuc2lvbnMsaXNGcm96ZW4saXNTZWFsZWQsaXNFeHRlbnNpYmxlLCcgK1xuICAnZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLGdldFByb3RvdHlwZU9mLGtleXMsZ2V0T3duUHJvcGVydHlOYW1lcycpLnNwbGl0KCcsJylcbiwgZnVuY3Rpb24oS0VZLCBJRCl7XG4gIHZhciBmbiAgICAgPSAoJC5jb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZm9yY2VkID0gMFxuICAgICwgbWV0aG9kID0ge307XG4gIG1ldGhvZFtLRVldID0gSUQgPT0gMCA/IGZ1bmN0aW9uIGZyZWV6ZShpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IGl0O1xuICB9IDogSUQgPT0gMSA/IGZ1bmN0aW9uIHNlYWwoaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyBmbihpdCkgOiBpdDtcbiAgfSA6IElEID09IDIgPyBmdW5jdGlvbiBwcmV2ZW50RXh0ZW5zaW9ucyhpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IGl0O1xuICB9IDogSUQgPT0gMyA/IGZ1bmN0aW9uIGlzRnJvemVuKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gZm4oaXQpIDogdHJ1ZTtcbiAgfSA6IElEID09IDQgPyBmdW5jdGlvbiBpc1NlYWxlZChpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IHRydWU7XG4gIH0gOiBJRCA9PSA1ID8gZnVuY3Rpb24gaXNFeHRlbnNpYmxlKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gZm4oaXQpIDogZmFsc2U7XG4gIH0gOiBJRCA9PSA2ID8gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICAgIHJldHVybiBmbih0b09iamVjdChpdCksIGtleSk7XG4gIH0gOiBJRCA9PSA3ID8gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpe1xuICAgIHJldHVybiBmbihPYmplY3QoJC5hc3NlcnREZWZpbmVkKGl0KSkpO1xuICB9IDogSUQgPT0gOCA/IGZ1bmN0aW9uIGtleXMoaXQpe1xuICAgIHJldHVybiBmbih0b09iamVjdChpdCkpO1xuICB9IDogcmVxdWlyZSgnLi8kLmdldC1uYW1lcycpLmdldDtcbiAgdHJ5IHtcbiAgICBmbigneicpO1xuICB9IGNhdGNoKGUpe1xuICAgIGZvcmNlZCA9IDE7XG4gIH1cbiAgJGRlZigkZGVmLlMgKyAkZGVmLkYgKiBmb3JjZWQsICdPYmplY3QnLCBtZXRob2QpO1xufSk7XG59LHtcIi4vJFwiOjUyLFwiLi8kLmRlZlwiOjQxLFwiLi8kLmdldC1uYW1lc1wiOjQ2fV0sNzA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgdG1wID0ge307XG50bXBbcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpXSA9ICd6JztcbmlmKHJlcXVpcmUoJy4vJCcpLkZXICYmIGNvZih0bXApICE9ICd6Jyl7XG4gIHJlcXVpcmUoJy4vJC5yZWRlZicpKE9iamVjdC5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuICdbb2JqZWN0ICcgKyBjb2YuY2xhc3NvZih0aGlzKSArICddJztcbiAgfSwgdHJ1ZSk7XG59XG59LHtcIi4vJFwiOjUyLFwiLi8kLmNvZlwiOjM5LFwiLi8kLnJlZGVmXCI6NTUsXCIuLyQud2tzXCI6NjR9XSw3MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGN0eCAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgY29mICAgICAgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCAkZGVmICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGFzc2VydCAgID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpXG4gICwgZm9yT2YgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzZXRQcm90byA9IHJlcXVpcmUoJy4vJC5zZXQtcHJvdG8nKS5zZXRcbiAgLCBzYW1lICAgICA9IHJlcXVpcmUoJy4vJC5zYW1lJylcbiAgLCBzcGVjaWVzICA9IHJlcXVpcmUoJy4vJC5zcGVjaWVzJylcbiAgLCBTUEVDSUVTICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpXG4gICwgUkVDT1JEICAgPSByZXF1aXJlKCcuLyQudWlkJykuc2FmZSgncmVjb3JkJylcbiAgLCBQUk9NSVNFICA9ICdQcm9taXNlJ1xuICAsIGdsb2JhbCAgID0gJC5nXG4gICwgcHJvY2VzcyAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIGlzTm9kZSAgID0gY29mKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIGFzYXAgICAgID0gcHJvY2VzcyAmJiBwcm9jZXNzLm5leHRUaWNrIHx8IHJlcXVpcmUoJy4vJC50YXNrJykuc2V0XG4gICwgUCAgICAgICAgPSBnbG9iYWxbUFJPTUlTRV1cbiAgLCBpc0Z1bmN0aW9uICAgICA9ICQuaXNGdW5jdGlvblxuICAsIGlzT2JqZWN0ICAgICAgID0gJC5pc09iamVjdFxuICAsIGFzc2VydEZ1bmN0aW9uID0gYXNzZXJ0LmZuXG4gICwgYXNzZXJ0T2JqZWN0ICAgPSBhc3NlcnQub2JqXG4gICwgV3JhcHBlcjtcblxuZnVuY3Rpb24gdGVzdFJlc29sdmUoc3ViKXtcbiAgdmFyIHRlc3QgPSBuZXcgUChmdW5jdGlvbigpe30pO1xuICBpZihzdWIpdGVzdC5jb25zdHJ1Y3RvciA9IE9iamVjdDtcbiAgcmV0dXJuIFAucmVzb2x2ZSh0ZXN0KSA9PT0gdGVzdDtcbn1cblxudmFyIHVzZU5hdGl2ZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB3b3JrcyA9IGZhbHNlO1xuICBmdW5jdGlvbiBQMih4KXtcbiAgICB2YXIgc2VsZiA9IG5ldyBQKHgpO1xuICAgIHNldFByb3RvKHNlbGYsIFAyLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cbiAgdHJ5IHtcbiAgICB3b3JrcyA9IGlzRnVuY3Rpb24oUCkgJiYgaXNGdW5jdGlvbihQLnJlc29sdmUpICYmIHRlc3RSZXNvbHZlKCk7XG4gICAgc2V0UHJvdG8oUDIsIFApO1xuICAgIFAyLnByb3RvdHlwZSA9ICQuY3JlYXRlKFAucHJvdG90eXBlLCB7Y29uc3RydWN0b3I6IHt2YWx1ZTogUDJ9fSk7XG4gICAgLy8gYWN0dWFsIEZpcmVmb3ggaGFzIGJyb2tlbiBzdWJjbGFzcyBzdXBwb3J0LCB0ZXN0IHRoYXRcbiAgICBpZighKFAyLnJlc29sdmUoNSkudGhlbihmdW5jdGlvbigpe30pIGluc3RhbmNlb2YgUDIpKXtcbiAgICAgIHdvcmtzID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIGFjdHVhbCBWOCBidWcsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTYyXG4gICAgaWYod29ya3MgJiYgJC5ERVNDKXtcbiAgICAgIHZhciB0aGVuYWJsZVRoZW5Hb3R0ZW4gPSBmYWxzZTtcbiAgICAgIFAucmVzb2x2ZSgkLnNldERlc2Moe30sICd0aGVuJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7IHRoZW5hYmxlVGhlbkdvdHRlbiA9IHRydWU7IH1cbiAgICAgIH0pKTtcbiAgICAgIHdvcmtzID0gdGhlbmFibGVUaGVuR290dGVuO1xuICAgIH1cbiAgfSBjYXRjaChlKXsgd29ya3MgPSBmYWxzZTsgfVxuICByZXR1cm4gd29ya3M7XG59KCk7XG5cbi8vIGhlbHBlcnNcbmZ1bmN0aW9uIGlzUHJvbWlzZShpdCl7XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgKHVzZU5hdGl2ZSA/IGNvZi5jbGFzc29mKGl0KSA9PSAnUHJvbWlzZScgOiBSRUNPUkQgaW4gaXQpO1xufVxuZnVuY3Rpb24gc2FtZUNvbnN0cnVjdG9yKGEsIGIpe1xuICAvLyBsaWJyYXJ5IHdyYXBwZXIgc3BlY2lhbCBjYXNlXG4gIGlmKCEkLkZXICYmIGEgPT09IFAgJiYgYiA9PT0gV3JhcHBlcilyZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIHNhbWUoYSwgYik7XG59XG5mdW5jdGlvbiBnZXRDb25zdHJ1Y3RvcihDKXtcbiAgdmFyIFMgPSBhc3NlcnRPYmplY3QoQylbU1BFQ0lFU107XG4gIHJldHVybiBTICE9IHVuZGVmaW5lZCA/IFMgOiBDO1xufVxuZnVuY3Rpb24gaXNUaGVuYWJsZShpdCl7XG4gIHZhciB0aGVuO1xuICBpZihpc09iamVjdChpdCkpdGhlbiA9IGl0LnRoZW47XG4gIHJldHVybiBpc0Z1bmN0aW9uKHRoZW4pID8gdGhlbiA6IGZhbHNlO1xufVxuZnVuY3Rpb24gbm90aWZ5KHJlY29yZCl7XG4gIHZhciBjaGFpbiA9IHJlY29yZC5jO1xuICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gIGlmKGNoYWluLmxlbmd0aClhc2FwLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHJlY29yZC52XG4gICAgICAsIG9rICAgID0gcmVjb3JkLnMgPT0gMVxuICAgICAgLCBpICAgICA9IDA7XG4gICAgZnVuY3Rpb24gcnVuKHJlYWN0KXtcbiAgICAgIHZhciBjYiA9IG9rID8gcmVhY3Qub2sgOiByZWFjdC5mYWlsXG4gICAgICAgICwgcmV0LCB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYoY2Ipe1xuICAgICAgICAgIGlmKCFvaylyZWNvcmQuaCA9IHRydWU7XG4gICAgICAgICAgcmV0ID0gY2IgPT09IHRydWUgPyB2YWx1ZSA6IGNiKHZhbHVlKTtcbiAgICAgICAgICBpZihyZXQgPT09IHJlYWN0LlApe1xuICAgICAgICAgICAgcmVhY3QucmVqKFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYodGhlbiA9IGlzVGhlbmFibGUocmV0KSl7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmV0LCByZWFjdC5yZXMsIHJlYWN0LnJlaik7XG4gICAgICAgICAgfSBlbHNlIHJlYWN0LnJlcyhyZXQpO1xuICAgICAgICB9IGVsc2UgcmVhY3QucmVqKHZhbHVlKTtcbiAgICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgICAgcmVhY3QucmVqKGVycik7XG4gICAgICB9XG4gICAgfVxuICAgIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIGNoYWluLmxlbmd0aCA9IDA7XG4gIH0pO1xufVxuZnVuY3Rpb24gaXNVbmhhbmRsZWQocHJvbWlzZSl7XG4gIHZhciByZWNvcmQgPSBwcm9taXNlW1JFQ09SRF1cbiAgICAsIGNoYWluICA9IHJlY29yZC5hIHx8IHJlY29yZC5jXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZWFjdDtcbiAgaWYocmVjb3JkLmgpcmV0dXJuIGZhbHNlO1xuICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXtcbiAgICByZWFjdCA9IGNoYWluW2krK107XG4gICAgaWYocmVhY3QuZmFpbCB8fCAhaXNVbmhhbmRsZWQocmVhY3QuUCkpcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gJHJlamVjdCh2YWx1ZSl7XG4gIHZhciByZWNvcmQgPSB0aGlzXG4gICAgLCBwcm9taXNlO1xuICBpZihyZWNvcmQuZClyZXR1cm47XG4gIHJlY29yZC5kID0gdHJ1ZTtcbiAgcmVjb3JkID0gcmVjb3JkLnIgfHwgcmVjb3JkOyAvLyB1bndyYXBcbiAgcmVjb3JkLnYgPSB2YWx1ZTtcbiAgcmVjb3JkLnMgPSAyO1xuICByZWNvcmQuYSA9IHJlY29yZC5jLnNsaWNlKCk7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgYXNhcC5jYWxsKGdsb2JhbCwgZnVuY3Rpb24oKXtcbiAgICAgIGlmKGlzVW5oYW5kbGVkKHByb21pc2UgPSByZWNvcmQucCkpe1xuICAgICAgICBpZihpc05vZGUpe1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYoZ2xvYmFsLmNvbnNvbGUgJiYgY29uc29sZS5lcnJvcil7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZWNvcmQuYSA9IHVuZGVmaW5lZDtcbiAgICB9KTtcbiAgfSwgMSk7XG4gIG5vdGlmeShyZWNvcmQpO1xufVxuZnVuY3Rpb24gJHJlc29sdmUodmFsdWUpe1xuICB2YXIgcmVjb3JkID0gdGhpc1xuICAgICwgdGhlbjtcbiAgaWYocmVjb3JkLmQpcmV0dXJuO1xuICByZWNvcmQuZCA9IHRydWU7XG4gIHJlY29yZCA9IHJlY29yZC5yIHx8IHJlY29yZDsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKXtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIGFzYXAuY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3cmFwcGVyID0ge3I6IHJlY29yZCwgZDogZmFsc2V9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlY29yZC52ID0gdmFsdWU7XG4gICAgICByZWNvcmQucyA9IDE7XG4gICAgICBub3RpZnkocmVjb3JkKTtcbiAgICB9XG4gIH0gY2F0Y2goZSl7XG4gICAgJHJlamVjdC5jYWxsKHtyOiByZWNvcmQsIGQ6IGZhbHNlfSwgZSk7IC8vIHdyYXBcbiAgfVxufVxuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIXVzZU5hdGl2ZSl7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gIFAgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICBhc3NlcnRGdW5jdGlvbihleGVjdXRvcik7XG4gICAgdmFyIHJlY29yZCA9IHtcbiAgICAgIHA6IGFzc2VydC5pbnN0KHRoaXMsIFAsIFBST01JU0UpLCAgICAgICAvLyA8LSBwcm9taXNlXG4gICAgICBjOiBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgICBhOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICAgIHM6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgICAgZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICAgIHY6IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgaDogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGhhbmRsZWQgcmVqZWN0aW9uXG4gICAgfTtcbiAgICAkLmhpZGUodGhpcywgUkVDT1JELCByZWNvcmQpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHJlY29yZCwgMSksIGN0eCgkcmVqZWN0LCByZWNvcmQsIDEpKTtcbiAgICB9IGNhdGNoKGVycil7XG4gICAgICAkcmVqZWN0LmNhbGwocmVjb3JkLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgcmVxdWlyZSgnLi8kLm1peCcpKFAucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKXtcbiAgICAgIHZhciBTID0gYXNzZXJ0T2JqZWN0KGFzc2VydE9iamVjdCh0aGlzKS5jb25zdHJ1Y3RvcilbU1BFQ0lFU107XG4gICAgICB2YXIgcmVhY3QgPSB7XG4gICAgICAgIG9rOiAgIGlzRnVuY3Rpb24ob25GdWxmaWxsZWQpID8gb25GdWxmaWxsZWQgOiB0cnVlLFxuICAgICAgICBmYWlsOiBpc0Z1bmN0aW9uKG9uUmVqZWN0ZWQpICA/IG9uUmVqZWN0ZWQgIDogZmFsc2VcbiAgICAgIH07XG4gICAgICB2YXIgcHJvbWlzZSA9IHJlYWN0LlAgPSBuZXcgKFMgIT0gdW5kZWZpbmVkID8gUyA6IFApKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgICAgcmVhY3QucmVzID0gYXNzZXJ0RnVuY3Rpb24ocmVzKTtcbiAgICAgICAgcmVhY3QucmVqID0gYXNzZXJ0RnVuY3Rpb24ocmVqKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHJlY29yZCA9IHRoaXNbUkVDT1JEXTtcbiAgICAgIHJlY29yZC5jLnB1c2gocmVhY3QpO1xuICAgICAgaWYocmVjb3JkLmEpcmVjb3JkLmEucHVzaChyZWFjdCk7XG4gICAgICBpZihyZWNvcmQucylub3RpZnkocmVjb3JkKTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGVkKXtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBleHBvcnRcbiRkZWYoJGRlZi5HICsgJGRlZi5XICsgJGRlZi5GICogIXVzZU5hdGl2ZSwge1Byb21pc2U6IFB9KTtcbmNvZi5zZXQoUCwgUFJPTUlTRSk7XG5zcGVjaWVzKFApO1xuc3BlY2llcyhXcmFwcGVyID0gJC5jb3JlW1BST01JU0VdKTtcblxuLy8gc3RhdGljc1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhdXNlTmF0aXZlLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpe1xuICAgIHJldHVybiBuZXcgKGdldENvbnN0cnVjdG9yKHRoaXMpKShmdW5jdGlvbihyZXMsIHJlail7IHJlaihyKTsgfSk7XG4gIH1cbn0pO1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAoIXVzZU5hdGl2ZSB8fCB0ZXN0UmVzb2x2ZSh0cnVlKSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCl7XG4gICAgcmV0dXJuIGlzUHJvbWlzZSh4KSAmJiBzYW1lQ29uc3RydWN0b3IoeC5jb25zdHJ1Y3RvciwgdGhpcylcbiAgICAgID8geCA6IG5ldyB0aGlzKGZ1bmN0aW9uKHJlcyl7IHJlcyh4KTsgfSk7XG4gIH1cbn0pO1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhKHVzZU5hdGl2ZSAmJiByZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXtcbiAgUC5hbGwoaXRlcilbJ2NhdGNoJ10oZnVuY3Rpb24oKXt9KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgPSBnZXRDb25zdHJ1Y3Rvcih0aGlzKVxuICAgICAgLCB2YWx1ZXMgPSBbXTtcbiAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24ocmVzLCByZWope1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCB2YWx1ZXMucHVzaCwgdmFsdWVzKTtcbiAgICAgIHZhciByZW1haW5pbmcgPSB2YWx1ZXMubGVuZ3RoXG4gICAgICAgICwgcmVzdWx0cyAgID0gQXJyYXkocmVtYWluaW5nKTtcbiAgICAgIGlmKHJlbWFpbmluZykkLmVhY2guY2FsbCh2YWx1ZXMsIGZ1bmN0aW9uKHByb21pc2UsIGluZGV4KXtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzKHJlc3VsdHMpO1xuICAgICAgICB9LCByZWopO1xuICAgICAgfSk7XG4gICAgICBlbHNlIHJlcyhyZXN1bHRzKTtcbiAgICB9KTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyA9IGdldENvbnN0cnVjdG9yKHRoaXMpO1xuICAgIHJldHVybiBuZXcgQyhmdW5jdGlvbihyZXMsIHJlail7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihyZXMsIHJlaik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufSk7XG59LHtcIi4vJFwiOjUyLFwiLi8kLmFzc2VydFwiOjM3LFwiLi8kLmNvZlwiOjM5LFwiLi8kLmN0eFwiOjQwLFwiLi8kLmRlZlwiOjQxLFwiLi8kLmZvci1vZlwiOjQ0LFwiLi8kLml0ZXItZGV0ZWN0XCI6NTAsXCIuLyQubWl4XCI6NTQsXCIuLyQuc2FtZVwiOjU2LFwiLi8kLnNldC1wcm90b1wiOjU3LFwiLi8kLnNwZWNpZXNcIjo1OSxcIi4vJC50YXNrXCI6NjEsXCIuLyQudWlkXCI6NjIsXCIuLyQud2tzXCI6NjR9XSw3MjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgc2V0ICAgPSByZXF1aXJlKCcuLyQnKS5zZXRcbiAgLCAkYXQgICA9IHJlcXVpcmUoJy4vJC5zdHJpbmctYXQnKSh0cnVlKVxuICAsIElURVIgID0gcmVxdWlyZSgnLi8kLnVpZCcpLnNhZmUoJ2l0ZXInKVxuICAsICRpdGVyID0gcmVxdWlyZSgnLi8kLml0ZXInKVxuICAsIHN0ZXAgID0gJGl0ZXIuc3RlcDtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICBzZXQodGhpcywgSVRFUiwge286IFN0cmluZyhpdGVyYXRlZCksIGk6IDB9KTtcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBpdGVyICA9IHRoaXNbSVRFUl1cbiAgICAsIE8gICAgID0gaXRlci5vXG4gICAgLCBpbmRleCA9IGl0ZXIuaVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiBzdGVwKDEpO1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIGl0ZXIuaSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiBzdGVwKDAsIHBvaW50KTtcbn0pO1xufSx7XCIuLyRcIjo1MixcIi4vJC5pdGVyXCI6NTEsXCIuLyQuaXRlci1kZWZpbmVcIjo0OSxcIi4vJC5zdHJpbmctYXRcIjo2MCxcIi4vJC51aWRcIjo2Mn1dLDczOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgc2V0VGFnICAgPSByZXF1aXJlKCcuLyQuY29mJykuc2V0XG4gICwgdWlkICAgICAgPSByZXF1aXJlKCcuLyQudWlkJylcbiAgLCBzaGFyZWQgICA9IHJlcXVpcmUoJy4vJC5zaGFyZWQnKVxuICAsICRkZWYgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJHJlZGVmICAgPSByZXF1aXJlKCcuLyQucmVkZWYnKVxuICAsIGtleU9mICAgID0gcmVxdWlyZSgnLi8kLmtleW9mJylcbiAgLCBlbnVtS2V5cyA9IHJlcXVpcmUoJy4vJC5lbnVtLWtleXMnKVxuICAsIGFzc2VydE9iamVjdCA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKS5vYmpcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGVcbiAgLCBERVNDICAgICA9ICQuREVTQ1xuICAsIGhhcyAgICAgID0gJC5oYXNcbiAgLCAkY3JlYXRlICA9ICQuY3JlYXRlXG4gICwgZ2V0RGVzYyAgPSAkLmdldERlc2NcbiAgLCBzZXREZXNjICA9ICQuc2V0RGVzY1xuICAsIGRlc2MgICAgID0gJC5kZXNjXG4gICwgJG5hbWVzICAgPSByZXF1aXJlKCcuLyQuZ2V0LW5hbWVzJylcbiAgLCBnZXROYW1lcyA9ICRuYW1lcy5nZXRcbiAgLCB0b09iamVjdCA9ICQudG9PYmplY3RcbiAgLCAkU3ltYm9sICA9ICQuZy5TeW1ib2xcbiAgLCBzZXR0ZXIgICA9IGZhbHNlXG4gICwgVEFHICAgICAgPSB1aWQoJ3RhZycpXG4gICwgSElEREVOICAgPSB1aWQoJ2hpZGRlbicpXG4gICwgX3Byb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGVcbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCB1c2VOYXRpdmUgPSAkLmlzRnVuY3Rpb24oJFN5bWJvbCk7XG5cbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQyA/IGZ1bmN0aW9uKCl7IC8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZFxuICB0cnkge1xuICAgIHJldHVybiAkY3JlYXRlKHNldERlc2Moe30sIEhJRERFTiwge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gc2V0RGVzYyh0aGlzLCBISURERU4sIHt2YWx1ZTogZmFsc2V9KVtISURERU5dO1xuICAgICAgfVxuICAgIH0pKVtISURERU5dIHx8IHNldERlc2M7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICAgICAgdmFyIHByb3RvRGVzYyA9IGdldERlc2MoT2JqZWN0UHJvdG8sIGtleSk7XG4gICAgICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gICAgICBzZXREZXNjKGl0LCBrZXksIEQpO1xuICAgICAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylzZXREZXNjKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG4gICAgfTtcbiAgfVxufSgpIDogc2V0RGVzYztcblxuZnVuY3Rpb24gd3JhcCh0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gJC5zZXQoJGNyZWF0ZSgkU3ltYm9sLnByb3RvdHlwZSksIFRBRywgdGFnKTtcbiAgREVTQyAmJiBzZXR0ZXIgJiYgc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGRlc2MoMSwgdmFsdWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc3ltO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKXtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKXNldERlc2MoaXQsIEhJRERFTiwgZGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSlpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSAkY3JlYXRlKEQsIHtlbnVtZXJhYmxlOiBkZXNjKDAsIGZhbHNlKX0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIHNldERlc2MoaXQsIGtleSwgRCk7XG59XG5mdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYXNzZXJ0T2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9PYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKWRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZShpdCwgUCl7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyAkY3JlYXRlKGl0KSA6IGRlZmluZVByb3BlcnRpZXMoJGNyZWF0ZShpdCksIFApO1xufVxuZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KXtcbiAgdmFyIEUgPSBfcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0aGlzLCBrZXkpO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldXG4gICAgPyBFIDogdHJ1ZTtcbn1cbmZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgdmFyIEQgPSBnZXREZXNjKGl0ID0gdG9PYmplY3QoaXQpLCBrZXkpO1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59XG5mdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdldE5hbWVzKHRvT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOKXJlc3VsdC5wdXNoKGtleSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ2V0TmFtZXModG9PYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkpcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZighdXNlTmF0aXZlKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG4gICAgcmV0dXJuIHdyYXAodWlkKGFyZ3VtZW50c1swXSkpO1xuICB9O1xuICAkcmVkZWYoJFN5bWJvbC5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoaXNbVEFHXTtcbiAgfSk7XG5cbiAgJC5jcmVhdGUgICAgID0gY3JlYXRlO1xuICAkLnNldERlc2MgICAgPSBkZWZpbmVQcm9wZXJ0eTtcbiAgJC5nZXREZXNjICAgID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkLnNldERlc2NzICAgPSBkZWZpbmVQcm9wZXJ0aWVzO1xuICAkLmdldE5hbWVzICAgPSAkbmFtZXMuZ2V0ID0gZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgJC5nZXRTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKCQuREVTQyAmJiAkLkZXKSRyZWRlZihPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xufVxuXG52YXIgc3ltYm9sU3RhdGljcyA9IHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioa2V5KXtcbiAgICByZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24oKXsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSBmYWxzZTsgfVxufTtcbi8vIDE5LjQuMi4yIFN5bWJvbC5oYXNJbnN0YW5jZVxuLy8gMTkuNC4yLjMgU3ltYm9sLmlzQ29uY2F0U3ByZWFkYWJsZVxuLy8gMTkuNC4yLjQgU3ltYm9sLml0ZXJhdG9yXG4vLyAxOS40LjIuNiBTeW1ib2wubWF0Y2hcbi8vIDE5LjQuMi44IFN5bWJvbC5yZXBsYWNlXG4vLyAxOS40LjIuOSBTeW1ib2wuc2VhcmNoXG4vLyAxOS40LjIuMTAgU3ltYm9sLnNwZWNpZXNcbi8vIDE5LjQuMi4xMSBTeW1ib2wuc3BsaXRcbi8vIDE5LjQuMi4xMiBTeW1ib2wudG9QcmltaXRpdmVcbi8vIDE5LjQuMi4xMyBTeW1ib2wudG9TdHJpbmdUYWdcbi8vIDE5LjQuMi4xNCBTeW1ib2wudW5zY29wYWJsZXNcbiQuZWFjaC5jYWxsKChcbiAgICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLCcgK1xuICAgICdzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuICApLnNwbGl0KCcsJyksIGZ1bmN0aW9uKGl0KXtcbiAgICB2YXIgc3ltID0gcmVxdWlyZSgnLi8kLndrcycpKGl0KTtcbiAgICBzeW1ib2xTdGF0aWNzW2l0XSA9IHVzZU5hdGl2ZSA/IHN5bSA6IHdyYXAoc3ltKTtcbiAgfVxuKTtcblxuc2V0dGVyID0gdHJ1ZTtcblxuJGRlZigkZGVmLkcgKyAkZGVmLlcsIHtTeW1ib2w6ICRTeW1ib2x9KTtcblxuJGRlZigkZGVmLlMsICdTeW1ib2wnLCBzeW1ib2xTdGF0aWNzKTtcblxuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhdXNlTmF0aXZlLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6IGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiBkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiBnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRhZygkLmcuSlNPTiwgJ0pTT04nLCB0cnVlKTtcbn0se1wiLi8kXCI6NTIsXCIuLyQuYXNzZXJ0XCI6MzcsXCIuLyQuY29mXCI6MzksXCIuLyQuZGVmXCI6NDEsXCIuLyQuZW51bS1rZXlzXCI6NDMsXCIuLyQuZ2V0LW5hbWVzXCI6NDYsXCIuLyQua2V5b2ZcIjo1MyxcIi4vJC5yZWRlZlwiOjU1LFwiLi8kLnNoYXJlZFwiOjU4LFwiLi8kLnVpZFwiOjYyLFwiLi8kLndrc1wiOjY0fV0sNzQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xucmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciAkICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgSXRlcmF0b3JzICAgPSByZXF1aXJlKCcuLyQuaXRlcicpLkl0ZXJhdG9yc1xuICAsIElURVJBVE9SICAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlWYWx1ZXMgPSBJdGVyYXRvcnMuQXJyYXlcbiAgLCBOTCAgICAgICAgICA9ICQuZy5Ob2RlTGlzdFxuICAsIEhUQyAgICAgICAgID0gJC5nLkhUTUxDb2xsZWN0aW9uXG4gICwgTkxQcm90byAgICAgPSBOTCAmJiBOTC5wcm90b3R5cGVcbiAgLCBIVENQcm90byAgICA9IEhUQyAmJiBIVEMucHJvdG90eXBlO1xuaWYoJC5GVyl7XG4gIGlmKE5MICYmICEoSVRFUkFUT1IgaW4gTkxQcm90bykpJC5oaWRlKE5MUHJvdG8sIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG4gIGlmKEhUQyAmJiAhKElURVJBVE9SIGluIEhUQ1Byb3RvKSkkLmhpZGUoSFRDUHJvdG8sIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG59XG5JdGVyYXRvcnMuTm9kZUxpc3QgPSBJdGVyYXRvcnMuSFRNTENvbGxlY3Rpb24gPSBBcnJheVZhbHVlcztcbn0se1wiLi8kXCI6NTIsXCIuLyQuaXRlclwiOjUxLFwiLi8kLndrc1wiOjY0LFwiLi9lczYuYXJyYXkuaXRlcmF0b3JcIjo2N31dLDc1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8vIFRoaXMgbWV0aG9kIG9mIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdCBuZWVkcyB0byBiZVxuLy8ga2VwdCBpZGVudGljYWwgdG8gdGhlIHdheSBpdCBpcyBvYnRhaW5lZCBpbiBydW50aW1lLmpzXG52YXIgZyA9XG4gIHR5cGVvZiBnbG9iYWwgPT09IFwib2JqZWN0XCIgPyBnbG9iYWwgOlxuICB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiID8gd2luZG93IDpcbiAgdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgPyBzZWxmIDogdGhpcztcblxuLy8gVXNlIGBnZXRPd25Qcm9wZXJ0eU5hbWVzYCBiZWNhdXNlIG5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCBjYWxsaW5nXG4vLyBgaGFzT3duUHJvcGVydHlgIG9uIHRoZSBnbG9iYWwgYHNlbGZgIG9iamVjdCBpbiBhIHdvcmtlci4gU2VlICMxODMuXG52YXIgaGFkUnVudGltZSA9IGcucmVnZW5lcmF0b3JSdW50aW1lICYmXG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGcpLmluZGV4T2YoXCJyZWdlbmVyYXRvclJ1bnRpbWVcIikgPj0gMDtcblxuLy8gU2F2ZSB0aGUgb2xkIHJlZ2VuZXJhdG9yUnVudGltZSBpbiBjYXNlIGl0IG5lZWRzIHRvIGJlIHJlc3RvcmVkIGxhdGVyLlxudmFyIG9sZFJ1bnRpbWUgPSBoYWRSdW50aW1lICYmIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuXG4vLyBGb3JjZSByZWV2YWx1dGF0aW9uIG9mIHJ1bnRpbWUuanMuXG5nLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9ydW50aW1lXCIpO1xuXG5pZiAoaGFkUnVudGltZSkge1xuICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBydW50aW1lLlxuICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IG9sZFJ1bnRpbWU7XG59IGVsc2Uge1xuICAvLyBSZW1vdmUgdGhlIGdsb2JhbCBwcm9wZXJ0eSBhZGRlZCBieSBydW50aW1lLmpzLlxuICBkZWxldGUgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogbW9kdWxlLmV4cG9ydHMsIF9fZXNNb2R1bGU6IHRydWUgfTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHtcIi4vcnVudGltZVwiOjc2fV0sNzY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCl7XG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBodHRwczovL3Jhdy5naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL21hc3Rlci9MSUNFTlNFIGZpbGUuIEFuXG4gKiBhZGRpdGlvbmFsIGdyYW50IG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW5cbiAqIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9TeW1ib2wgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfU3ltYm9sJGl0ZXJhdG9yID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX09iamVjdCRjcmVhdGUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGVcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX1Byb21pc2UgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2VcIilbXCJkZWZhdWx0XCJdO1xuXG4hKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSB0eXBlb2YgX1N5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF9TeW1ib2wkaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG5cbiAgdmFyIGluTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIjtcbiAgdmFyIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO1xuICBpZiAocnVudGltZSkge1xuICAgIGlmIChpbk1vZHVsZSkge1xuICAgICAgLy8gSWYgcmVnZW5lcmF0b3JSdW50aW1lIGlzIGRlZmluZWQgZ2xvYmFsbHkgYW5kIHdlJ3JlIGluIGEgbW9kdWxlLFxuICAgICAgLy8gbWFrZSB0aGUgZXhwb3J0cyBvYmplY3QgaWRlbnRpY2FsIHRvIHJlZ2VuZXJhdG9yUnVudGltZS5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGV2YWx1YXRpbmcgdGhlIHJlc3Qgb2YgdGhpcyBmaWxlIGlmIHRoZSBydW50aW1lIHdhc1xuICAgIC8vIGFscmVhZHkgZGVmaW5lZCBnbG9iYWxseS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgLy8gbW9kdWxlLmV4cG9ydHMgKGlmIHdlJ3JlIGluIGEgbW9kdWxlKSBvciBhIG5ldywgZW1wdHkgb2JqZWN0LlxuICBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZSA9IGluTW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgOiB7fTtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgZ2VuZXJhdG9yID0gX09iamVjdCRjcmVhdGUoKG91dGVyRm4gfHwgR2VuZXJhdG9yKS5wcm90b3R5cGUpO1xuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYgfHwgbnVsbCwgbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pKTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IF9PYmplY3QkY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgdmFsdWUgaW5zdGFuY2VvZiBBd2FpdEFyZ3VtZW50YCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC4gU29tZSBtYXkgY29uc2lkZXIgdGhlIG5hbWUgb2YgdGhpcyBtZXRob2QgdG9vXG4gIC8vIGN1dGVzeSwgYnV0IHRoZXkgYXJlIGN1cm11ZGdlb25zLlxuICBydW50aW1lLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiBuZXcgQXdhaXRBcmd1bWVudChhcmcpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIEF3YWl0QXJndW1lbnQoYXJnKSB7XG4gICAgdGhpcy5hcmcgPSBhcmc7XG4gIH1cblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIC8vIFRoaXMgaW52b2tlIGZ1bmN0aW9uIGlzIHdyaXR0ZW4gaW4gYSBzdHlsZSB0aGF0IGFzc3VtZXMgc29tZVxuICAgIC8vIGNhbGxpbmcgZnVuY3Rpb24gKG9yIFByb21pc2UpIHdpbGwgaGFuZGxlIGV4Y2VwdGlvbnMuXG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW21ldGhvZF0oYXJnKTtcbiAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEF3YWl0QXJndW1lbnQgPyBfUHJvbWlzZS5yZXNvbHZlKHZhbHVlLmFyZykudGhlbihpbnZva2VOZXh0LCBpbnZva2VUaHJvdykgOiBfUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLiBJZiB0aGUgUHJvbWlzZSBpcyByZWplY3RlZCwgaG93ZXZlciwgdGhlXG4gICAgICAgIC8vIHJlc3VsdCBmb3IgdGhpcyBpdGVyYXRpb24gd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzYW1lXG4gICAgICAgIC8vIHJlYXNvbi4gTm90ZSB0aGF0IHJlamVjdGlvbnMgb2YgeWllbGRlZCBQcm9taXNlcyBhcmUgbm90XG4gICAgICAgIC8vIHRocm93biBiYWNrIGludG8gdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgYXMgaXMgdGhlIGNhc2VcbiAgICAgICAgLy8gd2hlbiBhbiBhd2FpdGVkIFByb21pc2UgaXMgcmVqZWN0ZWQuIFRoaXMgZGlmZmVyZW5jZSBpblxuICAgICAgICAvLyBiZWhhdmlvciBiZXR3ZWVuIHlpZWxkIGFuZCBhd2FpdCBpcyBpbXBvcnRhbnQsIGJlY2F1c2UgaXRcbiAgICAgICAgLy8gYWxsb3dzIHRoZSBjb25zdW1lciB0byBkZWNpZGUgd2hhdCB0byBkbyB3aXRoIHRoZSB5aWVsZGVkXG4gICAgICAgIC8vIHJlamVjdGlvbiAoc3dhbGxvdyBpdCBhbmQgY29udGludWUsIG1hbnVhbGx5IC50aHJvdyBpdCBiYWNrXG4gICAgICAgIC8vIGludG8gdGhlIGdlbmVyYXRvciwgYWJhbmRvbiBpdGVyYXRpb24sIHdoYXRldmVyKS4gV2l0aFxuICAgICAgICAvLyBhd2FpdCwgYnkgY29udHJhc3QsIHRoZXJlIGlzIG5vIG9wcG9ydHVuaXR5IHRvIGV4YW1pbmUgdGhlXG4gICAgICAgIC8vIHJlamVjdGlvbiByZWFzb24gb3V0c2lkZSB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBzbyB0aGVcbiAgICAgICAgLy8gb25seSBvcHRpb24gaXMgdG8gdGhyb3cgaXQgZnJvbSB0aGUgYXdhaXQgZXhwcmVzc2lvbiwgYW5kXG4gICAgICAgIC8vIGxldCB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhbmRsZSB0aGUgZXhjZXB0aW9uLlxuICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy5kb21haW4pIHtcbiAgICAgIGludm9rZSA9IHByb2Nlc3MuZG9tYWluLmJpbmQoaW52b2tlKTtcbiAgICB9XG5cbiAgICB2YXIgaW52b2tlTmV4dCA9IGludm9rZS5iaW5kKGdlbmVyYXRvciwgXCJuZXh0XCIpO1xuICAgIHZhciBpbnZva2VUaHJvdyA9IGludm9rZS5iaW5kKGdlbmVyYXRvciwgXCJ0aHJvd1wiKTtcbiAgICB2YXIgaW52b2tlUmV0dXJuID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcInJldHVyblwiKTtcbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgdmFyIGVucXVldWVSZXN1bHQgPVxuICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KSA6IG5ldyBfUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICByZXNvbHZlKGludm9rZShtZXRob2QsIGFyZykpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGVucXVldWVSZXN1bHQgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnlcbiAgICAgIC8vIGxhdGVyIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgIHByZXZpb3VzUHJvbWlzZSA9IGVucXVldWVSZXN1bHRbXCJjYXRjaFwiXShmdW5jdGlvbiAoaWdub3JlZCkge30pO1xuXG4gICAgICByZXR1cm4gZW5xdWV1ZVJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICBpZiAobWV0aG9kID09PSBcInJldHVyblwiIHx8IG1ldGhvZCA9PT0gXCJ0aHJvd1wiICYmIGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gQSByZXR1cm4gb3IgdGhyb3cgKHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyB0aHJvd1xuICAgICAgICAgICAgLy8gbWV0aG9kKSBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgICAgdmFyIHJldHVybk1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdO1xuICAgICAgICAgICAgaWYgKHJldHVybk1ldGhvZCkge1xuICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gocmV0dXJuTWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgYXJnKTtcbiAgICAgICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcmV0dXJuIG1ldGhvZCB0aHJldyBhbiBleGNlcHRpb24sIGxldCB0aGF0XG4gICAgICAgICAgICAgICAgLy8gZXhjZXB0aW9uIHByZXZhaWwgb3ZlciB0aGUgb3JpZ2luYWwgcmV0dXJuIG9yIHRocm93LlxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICAgICAgLy8gQ29udGludWUgd2l0aCB0aGUgb3V0ZXIgcmV0dXJuLCBub3cgdGhhdCB0aGUgZGVsZWdhdGVcbiAgICAgICAgICAgICAgLy8gaXRlcmF0b3IgaGFzIGJlZW4gdGVybWluYXRlZC5cbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0sIGRlbGVnYXRlLml0ZXJhdG9yLCBhcmcpO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBMaWtlIHJldHVybmluZyBnZW5lcmF0b3IudGhyb3codW5jYXVnaHQpLCBidXQgd2l0aG91dCB0aGVcbiAgICAgICAgICAgIC8vIG92ZXJoZWFkIG9mIGFuIGV4dHJhIGZ1bmN0aW9uIGNhbGwuXG4gICAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRGVsZWdhdGUgZ2VuZXJhdG9yIHJhbiBhbmQgaGFuZGxlZCBpdHMgb3duIGV4Y2VwdGlvbnMgc29cbiAgICAgICAgICAvLyByZWdhcmRsZXNzIG9mIHdoYXQgdGhlIG1ldGhvZCB3YXMsIHdlIGNvbnRpbnVlIGFzIGlmIGl0IGlzXG4gICAgICAgICAgLy8gXCJuZXh0XCIgd2l0aCBhbiB1bmRlZmluZWQgYXJnLlxuICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICAgICAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcbiAgICAgICAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkWWllbGQpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2VudCA9IGFyZztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBhcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBHZW5TdGF0ZUNvbXBsZXRlZCA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICB2YXIgaW5mbyA9IHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoY29udGV4dC5kZWxlZ2F0ZSAmJiBtZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBydW50aW1lLmtleXMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgdGhpcy5zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiYgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiYgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24gZGlzcGF0Y2hFeGNlcHRpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG4gICAgICAgIHJldHVybiAhIWNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbiBhYnJ1cHQodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiYgKHR5cGUgPT09IFwiYnJlYWtcIiB8fCB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uIGNvbXBsZXRlKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8IHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24gZmluaXNoKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gX2NhdGNoKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiBkZWxlZ2F0ZVlpZWxkKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4vLyBBbW9uZyB0aGUgdmFyaW91cyB0cmlja3MgZm9yIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsXG4vLyBvYmplY3QsIHRoaXMgc2VlbXMgdG8gYmUgdGhlIG1vc3QgcmVsaWFibGUgdGVjaG5pcXVlIHRoYXQgZG9lcyBub3Rcbi8vIHVzZSBpbmRpcmVjdCBldmFsICh3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeSkuXG50eXBlb2YgZ2xvYmFsID09PSBcIm9iamVjdFwiID8gZ2xvYmFsIDogdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiID8gc2VsZiA6IHVuZGVmaW5lZCk7XG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCJfcHJvY2Vzc1wiOjc3LFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGVcIjoxOSxcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlXCI6MjMsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sXCI6MjQsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yXCI6MjV9XSw3NzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxufSx7fV19LHt9LFs4XSk7XG4iXSwiZmlsZSI6InBhdHRlcm5fbGlicmFyeS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
