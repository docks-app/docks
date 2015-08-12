(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

},{}],2:[function(require,module,exports){
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

"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/builder");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder);

require("whatwg-fetch");

//*
// The name of classes relevant to `Avatar`.
// @object

var classes = {
  //*
  // @property
  root: "avatar",

  //*
  // @property
  image: "avatar__image",

  //*
  // @property
  initials: "avatar__initials"
};

//*
// The name of states relevant to `Avatar`.
// @object

var states = {
  //*
  // @property
  image: {
    visible: classes.image + "--is-visible"
  }
};

//*
// The name of attributes relevant to `Avatar`.
// @object

var attrs = {
  //*
  // @property
  profile_name: "data-profile-name",

  //*
  // @property
  service: "data-service"
};

//*
// The minimum time, in milliseconds, before the background images for avatars
// should be faded into view. This is done to prevent any sudden visual changes
// immediately after page load.
//
// @value 200
// @type Number
// @private

var MIN_TIME_TO_LOAD = 200;

var Avatar, show_image;

//*
// Fades the image into view smoothly. To prevent sudden appearance of images
// immediately after page load, this function stores the time when it was
// initialized and waits at least `MIN_TIME_TO_LOAD` after that before applying
// the required classes.
//
// @private
// @param {DOMElement} image - The image to reveal.

show_image = (function () {
  var start = Date.now();

  return function (image) {
    setTimeout(function () {
      image.classList.add(states.image.visible);
    }, Math.max(0, MIN_TIME_TO_LOAD - (Date.now() - start)));
  };
})();

//*
// The constructor around an avatar DOM node. This constructor will check for
// the service from which the avatar image should be fetched and do its best to
// grab that image.
//
// Because there is no way to interact with an `Avatar`, there is no public
// interface for this component.
//
// @factory
//
// @param {DOMElement} node - The root of an Avatar component.

Avatar = function (node) {
  var profile_name = node.getAttribute(attrs.profile_name),
      image = node.querySelector("." + classes.image),
      service = node.getAttribute(attrs.service);

  switch (service) {
    case "github":
      fetch("https://api.github.com/users/" + profile_name).then(function (response) {
        return response.json();
      }).then(function (response) {
        image.style.backgroundImage = "url(" + response.avatar_url + ")";
        show_image(image);
      });
      break;

    case "twitter":
    case "email":
      image.style.backgroundImage = "url(http://avatars.io/" + service + "/" + profile_name + ")";
      show_image(image);
      break;
  }
};

//*
// Initializes the `Avatar` component.
//
// @method
// @static
//
// @requires builder::Builder
//
// @arg {HTMLElement} [context = document] - The context in which to search
// for DOM nodes that should be used as the root of an [`Avatar`](@link)
// component.

Avatar.init = _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder2["default"].initialize_once(Avatar, { name: classes.root });

exports.classes = classes;
exports.states = states;
exports.attrs = attrs;
exports["default"] = Avatar;

},{"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/builder":23,"babel-runtime/helpers/interop-require-default":54,"whatwg-fetch":132}],3:[function(require,module,exports){
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

var _scroll_container = require("../scroll_container");

var _scroll_container2 = _interopRequireDefault(_scroll_container);

var _utilitiesEvents = require("../../utilities/events");

var _utilitiesEvents2 = _interopRequireDefault(_utilitiesEvents);

var _utilitiesUi_events = require("../../utilities/ui_events");

var _utilitiesUi_events2 = _interopRequireDefault(_utilitiesUi_events);

var _utilitiesText_range = require("../../utilities/text_range");

var _utilitiesText_range2 = _interopRequireDefault(_utilitiesText_range);

var _utilitiesBuilder = require("../../utilities/builder");

var _utilitiesBuilder2 = _interopRequireDefault(_utilitiesBuilder);

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

var CodeBlock, CodeCaches, clean_and_highlight_code, update_helper, toggle_code_block_visibility, select_code, hide, show, cache_content_height, hook_up_iframe_communication, attach_event_listeners;

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

clean_and_highlight_code = function (code) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var language_code = options.language_code;

  code = (0, _utilitiesMarkup.clean)(code, options);
  if (!language_code || language_code === "html") {
    code = (0, _utilitiesMarkup.indent)(code);
  }
  return (0, _utilitiesMarkup.highlight)(code, options);
};

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
// removed — the value of the `setter` is then returned to the previous
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

update_helper = function (code, change, cache) {
  var add, helper_param, constant, helper_matcher, regex, constants_for_param, index, replace_value, set_by, constant_replacer, boolean_replacer;

  add = !!change.add;

  constant_replacer = function (match, param_portion, constant_portion) {
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
  };

  boolean_replacer = function (match, param_portion) {
    return "" + param_portion + (add ? "true" : "false");
  };

  if (!change.set_by) {
    return code;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(change.set_by), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      set_by = _step.value;

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
};

//*
// Handles a click on the contained `button` that toggles the visibility of the
// code block.
//
// @private
// @param {Object} event - The `click` event on the select.

toggle_code_block_visibility = function (event) {
  var code_block = CodeBlock["for"](event.target);
  if (!code_block) {
    return;
  }
  code_block.toggle();
};

//*
// Handles a focus on the code area of a code block by selecting all of the
// text within the code block.
//
// @private
// @param {Object} event - The `focusin` event on the code.

select_code = function () {
  (0, _utilitiesText_range2["default"])(undefined).select_all();
};

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

hide = function (self) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var node = self.node;
  var toggler = self.toggler;
  var content = self.content;
  var without_transition = options.without_transition;
  var scroll_container;

  _scroll_container2["default"].init();
  scroll_container = _scroll_container2["default"]["for"](node);
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
};

//*
// Shows a code block.
//
// @param {Object} self - The internal details of a [`CodeBlock`](@link).
//
// @private

show = function callee$0$0(self) {
  var node, toggler, content;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
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
};

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

cache_content_height = function (self) {
  var node = self.node;
  var content = self.content;
  var max_height;var header;var header_height;var max_code_height;var code_container;

  max_height = parseInt(window.getComputedStyle(content).maxHeight, 10);

  content.setAttribute(attrs.cached_max_height, max_height);

  header = node.querySelector("." + classes.header);
  header_height = header ? header.offsetHeight : 0;
  max_code_height = max_height - header_height + "px";

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _getIterator(_Array$from(node.querySelectorAll("." + classes.code_container))), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      code_container = _step2.value;

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
};

//*
// Does all of the necessary work to manage the two-way communication between
// a code block connected to an `iframe` and that `iframe`. This includes
// listening for changes to markup of the associated demo and triggering an
// intial markup request to get the most up-to-date representation possible.
//
// @param {Object} self - The internal details of a [`CodeBlock`](@link).
//
// @private

hook_up_iframe_communication = function (self) {
  var communicator = (0, _iframe.Communicator)(),
      registered = communicator.register.from_node(self.node),
      handle_markup_change,
      handle_class_change;

  if (!registered) {
    return false;
  }

  handle_markup_change = function (event) {
    if (!event.html || !self.code_caches.markup) {
      return;
    }
    self.code_caches.markup.code = event.html;
  };

  handle_class_change = function (event) {
    if (!self.code_caches.helper) {
      return;
    }
    if (event.details.add === undefined) {
      event.details.add = event.add;
    }
    self.code_caches.helper.update(event.details);
  };

  communicator.on(_utilitiesEvents2["default"].types.markup_request, handle_markup_change);
  communicator.on(_utilitiesEvents2["default"].types.markup_change, handle_markup_change);
  communicator.on(_utilitiesEvents2["default"].types.class_change, handle_class_change);

  communicator.trigger(_utilitiesEvents2["default"].types.markup_request);
  return communicator;
};

attach_event_listeners = function (self) {
  var select = self.node.querySelector("." + _select.classes.root);

  if (select && self.communicator) {
    select.addEventListener("change", function (event) {
      self.communicator.trigger(_utilitiesEvents2["default"].types.markup_request, {
        demo: event.target.value
      });
    });
  }
};

//*
// An API for cacheing, updating, and highlighting code within a code block.
//
// @param {HTMLElement} node - The main code block.
//
// @private
// @factory

CodeCaches = (function () {
  var languages = {
    markup: ["html"],
    helper: ["erb", "haml", "slim"]
  };

  var CodeCache;

  CodeCache = function (node) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var language = node.getAttribute(attrs.language) || "html",
        dom_code = node.querySelector("code"),
        code = dom_code.innerHTML,
        helper_cache = null,
        code_cache;

    code_cache = _Object$defineProperties({
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

    if (languages.helper.includes(language)) {
      helper_cache = {};

      Object.defineProperty(code_cache, "update", {
        value: function value(change) {
          this.code = update_helper(this.code, change, helper_cache);
        }
      });
    }

    return code_cache;
  };

  return function (node) {
    var code_nodes, code_caches, api, index;

    code_nodes = _Array$from(node.querySelectorAll("." + classes.code));
    code_caches = code_nodes.map(function (code_node) {
      return CodeCache(code_node, { generated_from_helper: code_nodes.length > 1 });
    });

    api = _Object$defineProperties({

      length: code_caches.length
    }, {
      markup: {
        get: function get() {
          return code_caches.filter(function (code_cache) {
            return languages.markup.includes(code_cache.language);
          })[0];
        },
        configurable: true,
        enumerable: true
      },
      helper: {
        get: function get() {
          return code_caches.filter(function (code_cache) {
            return languages.helper.includes(code_cache.language);
          })[0];
        },
        configurable: true,
        enumerable: true
      }
    });

    for (index = 0; index < code_caches.length; index++) {
      _Object$defineProperty(api, index, { value: code_caches[index] });
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
  var self, api, toggle;

  self = {
    node: node,
    is_hidden: node.classList.contains(states.root.hidden),
    toggler: node.querySelector("." + classes.toggler),
    content: node.querySelector("." + classes.content),
    code_caches: CodeCaches(node)
  };

  self.communicator = hook_up_iframe_communication(self);

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

  toggle = function () {
    return self.is_hidden ? show(self) : hide(self);
  };
  api = { toggle: toggle };

  return api;
};

CodeBlock.init = _utilitiesBuilder2["default"].initialize_once(CodeBlock, { name: classes.root, cache: true });

exports.classes = classes;
exports.states = states;
exports.variants = variants;
exports.attrs = attrs;
exports["default"] = CodeBlock;

},{"../../utilities/builder":23,"../../utilities/events":26,"../../utilities/markup":28,"../../utilities/painting":31,"../../utilities/text_range":35,"../../utilities/ui_events":36,"../iframe":7,"../scroll_container":13,"../select":14,"babel-runtime/core-js/array/from":41,"babel-runtime/core-js/get-iterator":42,"babel-runtime/core-js/object/define-properties":46,"babel-runtime/core-js/object/define-property":47,"babel-runtime/helpers/interop-require-default":54,"babel-runtime/regenerator":128}],4:[function(require,module,exports){
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

var Demo, create_self, set_correct_background_color, allocate_minimum_height;

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

set_correct_background_color = function (node) {
  var parent = node.parentNode,
      sections = node.querySelectorAll("." + classes.section),
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

allocate_minimum_height = function (node) {
  var min_height = parseInt(window.getComputedStyle(node).minHeight, 10),
      demo_sections = node.querySelectorAll("." + classes.section),
      demo_section;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(demo_sections), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      demo_section = _step.value;

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
};

//*
// Caches all of the internal details for an [`Demo`](@link).
//
// @private
// @param {HTMLElement} node - The node backing the `Demo`.
// @returns Object - The private, internal details of the `Demo`.

create_self = function (node) {
  return {
    markup_source: document.querySelector("." + classes.content),
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

Demo = function (node) {
  var self = create_self(node),
      communicator = (0, _iframe.Communicator)(),
      send_markup,
      height_update,
      apply_class_change;

  //*
  // Sends the markup for the current "main" section.
  //
  // @param {Object} [event = {}] - The (optional) event that specifies the demo
  // to send markup for.
  //
  // @method
  // @private

  send_markup = function () {
    var event = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    if (event.demo) {
      self.markup_source = document.querySelector("#" + classes.section + "--" + event.demo + " ." + classes.content);
    }

    communicator.trigger(_utilitiesEvents2["default"].types.markup_request, {
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

  height_update = function () {
    var new_height = node.offsetHeight;
    if (new_height === self.height) {
      return;
    }

    self.height = new_height;
    setTimeout(function () {
      self.parent.style.minHeight = new_height + "px";
    }, HEIGHT_CHANGE_WATCH_DURATION);

    communicator.trigger(_utilitiesEvents2["default"].types.height_change, { height: new_height });
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

  apply_class_change = function (event) {
    var details = event.details,
        markup_change_in_source = false,
        minimum_one_class_change = false,
        matches = node.querySelectorAll("." + classes.content + " ." + details["for"]),
        bail_early,
        class_list,
        action,
        match,
        preclude;

    if (details.filter_to) {
      // Check on matches
      matches = matches.filter(function (a_match) {
        return a_match.matches(details.filter_to);
      });
    }

    // Some height changes may occur over time. Watch for transitions
    // and send height again on each transitionend event
    //
    // TODO: integrate better iframe resizing
    // see: https://github.com/davidjbradshaw/iframe-resizer/tree/master/test

    document.addEventListener(_utilitiesUi_events2["default"].transition_end, height_update);

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(matches), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        match = _step2.value;

        bail_early = false;
        class_list = match.classList;
        action = null;

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _getIterator(details.preclude), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            preclude = _step3.value;

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
  };

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
};

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

  var demo,
      demos = _Array$from(context.querySelectorAll("." + classes.root));
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _getIterator(demos), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      demo = _step4.value;
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

},{"../../utilities/events":26,"../../utilities/ui_events":36,"../iframe":7,"babel-runtime/core-js/array/from":41,"babel-runtime/core-js/get-iterator":42,"babel-runtime/helpers/interop-require-default":54}],5:[function(require,module,exports){
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

"use strict";

var _defineProperty = require("babel-runtime/helpers/define-property")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilitiesUi_events = require("../../utilities/ui_events");

var _utilitiesUi_events2 = _interopRequireDefault(_utilitiesUi_events);

var _utilitiesClient = require("../../utilities/client");

var _utilitiesClient2 = _interopRequireDefault(_utilitiesClient);

var _utilitiesBuilder = require("../../utilities/builder");

var _utilitiesBuilder2 = _interopRequireDefault(_utilitiesBuilder);

var _utilitiesNumbers = require("../../utilities/numbers");

var _utilitiesPainting = require("../../utilities/painting");

var classes = {
  root: "exploded",
  structure: "exploded__structure",
  content: "exploded__structure__content",
  source: "exploded__source",
  pane: "exploded__pane"
};

var states = {
  root: {
    initialized: classes.root + "--is-being-initialized"
  },

  pane: {
    hovered: classes.pane + "--is-hovered",
    selected: classes.pane + "--is-selected"
  }
};

var attrs = {
  id: "data-explosion-id",
  node: "data-explosion-node",
  range_attr: "data-explosion-attribute"
};

var events = {
  pane_selected: classes.root + ":pane-selected"
};

var LAYER_GAP = 40;

var clone, initialize_panes, initialize_ranges, reset, start_dragging, rotate_by, update_panes, node_for_pane, main_class_for_node, Exploded;

//*
// Initializes the panes for an explosion. This does all of the required
// cloning, stores the resulting panes on the secrets object, and performs an
// initial rotation.
//
// @param {Object} self - The internal details of an `Exploded`.
// @private

initialize_panes = function callee$0$0(self) {
  var source, structure;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        source = self.source;
        structure = self.structure;

        if (!(source.children[0].children.length < 1)) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt("return");

      case 4:

        reset(self);

        self.panes = clone(source.children[0], structure.children[0]);
        self.spread = 1;

        setTimeout(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(_utilitiesUi_events2["default"].transition(self.node, function () {
                  self.node.classList.add(states.root.initialized);
                  rotate_by(20, 5, self);
                }));

              case 2:

                self.node.classList.remove(states.root.initialized);

              case 3:
              case "end":
                return context$2$0.stop();
            }
          }, null, this);
        }, 400);

      case 8:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

//*
// Initializes the ranges within an `Exploded` to perform their action. This
// function also contains the definitions of the possible actions for a range,
// the `attrs.range_attr` value that will give that behavior to a range, and
// the actual event handlers for when the range changes values.
//
// @param {Object} self - The internal details of an `Exploded`.
// @private

initialize_ranges = (function () {
  var _ranges, _handlers;

  var actions, ranges, percentage_from_center, handlers, create_range_listener;

  actions = {
    gap: "pane-gap",
    perspective: "perspective"
  };

  ranges = (_ranges = {}, _defineProperty(_ranges, actions.gap, { min: 0.25, max: 2, "default": 1 }), _defineProperty(_ranges, actions.perspective, { min: 500, max: 4000, "default": 2000 }), _ranges);

  //*
  // Calculates the difference a value from 0-100 is from 50, then normalizes that
  // value for how close it is to the center. So, values close to 50 will be close,
  // to 0, while 0 and 100 will be -1 and 1, respectively.
  //
  // @param {Number} value - The number on a scale of 0-100.
  // @private
  // @returns Number

  percentage_from_center = function (value) {
    return (parseInt(value, 10) / 100 - 0.5) / 0.5;
  };

  handlers = (_handlers = {}, _defineProperty(_handlers, actions.gap, function (self, event) {
    var range = ranges[actions.gap],
        spread_from_center = percentage_from_center(event.target.value);

    if (spread_from_center < 0) {
      self.spread = range["default"] + spread_from_center * (range["default"] - range.min);
    } else {
      self.spread = range["default"] + spread_from_center * (range.max - range["default"]);
    }

    update_panes(self);
  }), _defineProperty(_handlers, actions.perspective, function (self, event) {
    var range = ranges[actions.perspective],
        spread_from_center = percentage_from_center(event.target.value),
        perspective;

    if (spread_from_center > 0) {
      perspective = range["default"] - spread_from_center * (range["default"] - range.min);
    } else {
      perspective = range["default"] - spread_from_center * (range.max - range["default"]);
    }

    self.structure.style.perspective = perspective + "px";
  }), _handlers);

  create_range_listener = function (action) {
    return function (event) {
      handlers[action](self, event);
    };
  };

  return function (self) {
    var range_node;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(_Object$keys(actions)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _name = _step.value;

        var action = actions[_name];
        range_node = self.node.querySelector("[" + attrs.range_attr + "=\"" + action + "\"]");

        if (!range_node) {
          continue;
        }
        range_node.addEventListener("input", create_range_listener(action));
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
})();

//*
// Resets the internal state of an `Exploded`.
//
// @param {Object} self - The internal details of an `Exploded`.
// @private

reset = function (self) {
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

clone = (function () {
  var explosion_id = 0,
      destination,
      pane_count,
      widths,
      clone_level,
      original_offset,
      panes,
      prepare_for_cloning,
      append_clone,
      append_all_clones,
      clone_node,
      find_overlaps,
      stack_siblings;

  //*
  // Resets the internal information used to perform explosions.
  //
  // @private

  prepare_for_cloning = function () {
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

  append_clone = function (dims, to) {
    var parent_width = destination.offsetWidth,
        parent_height = destination.offsetHeight,
        node = $("<div class='" + classes.pane + "' style='height: " + dims.height + "px; width: " + dims.width + "px; top: " + dims.top + "px; left: " + dims.left + "px; transform-origin: " + (parent_width / 2 - dims.left) + "px " + (parent_height / 2 - dims.top) + "px " + LAYER_GAP + "px;' />")[0];

    to.appendChild(node);
    return node;
  };

  //*
  // Appends all of the required panes to the `to` node passed to
  // [`clone`](@link).
  //
  // @private

  append_all_clones = function () {
    var fragment = document.createDocumentFragment(),
        pane;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(panes), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        pane = _step2.value;

        pane.clone = append_clone(pane, fragment);
        pane.clone.setAttribute(attrs.node, pane.id);
        pane.clone.style.zIndex = LAYER_GAP * pane.level + (pane.adjustment || 0);
        pane.node.setAttribute(attrs.id, pane.id);
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

  clone_node = function (node) {
    var node_offsets = node.getBoundingClientRect(),
        pane,
        child;

    original_offset = original_offset || node.parentNode.getBoundingClientRect();
    pane_count += 1;

    // If we have a visible node
    if (node_offsets.height + node_offsets.width > 2) {
      pane = {
        height: node_offsets.height,
        width: node_offsets.width,
        top: node_offsets.top - original_offset.top,
        left: node_offsets.left - original_offset.left,
        level: clone_level,
        node: node,
        id: explosion_id + "-" + pane_count
      };

      panes.push(pane);

      widths.min = Math.min(pane.left, widths.min);
      widths.max = Math.max(pane.left + pane.width, widths.max);
    }

    clone_level += 1;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _getIterator(_Array$from(node.children)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        child = _step3.value;
        clone_node(child);
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

    clone_level -= 1;
  };

  //*
  // Finds pairs of nodes whose dimensions overlap one another.
  //
  // @param {Array} siblings - The set of nodes to check for overlap.
  // @private
  // @returns Array - An array of arrays that each contain a set of two
  // overlapping nodes.

  find_overlaps = function (siblings) {
    var overlaps = [],
        sibling_count = siblings.length,
        index,
        sibling,
        other_index,
        other,
        within_other,
        other_within,
        custom_between;

    custom_between = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _utilitiesNumbers.between.apply(undefined, args.concat([{ include_min: true }]));
    };

    for (index = 0; index < sibling_count; index++) {
      sibling = siblings[index];

      for (other_index = index + 1; other_index < sibling_count; other_index++) {
        other = siblings[other_index];

        other_within = custom_between(other.left, sibling.left, sibling.left + sibling.width) && custom_between(other.top, sibling.top, sibling.top + sibling.height);

        within_other = custom_between(sibling.left, other.left, other.left + other.width) && custom_between(sibling.top, other.top, other.top + other.height);

        if (other_within || within_other) {
          overlaps.push([sibling, other]);
        }
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

  stack_siblings = function () {
    var levels = [],
        overlaps,
        pane,
        level,
        overlap;

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = _getIterator(panes), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        pane = _step4.value;

        levels[pane.level] = levels[pane.level] || [];
        levels[pane.level].push(pane);
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

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = _getIterator(levels), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        level = _step5.value;

        overlaps = find_overlaps(level);

        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = _getIterator(overlaps), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            overlap = _step6.value;

            overlap[0].adjustment = -LAYER_GAP / 8;
            overlap[1].adjustment = LAYER_GAP / 8;
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
  };

  return function (from, to) {
    var clone_results = [],
        child,
        pane;

    prepare_for_cloning();
    destination = to;

    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = _getIterator(_Array$from(from.children)), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        child = _step7.value;
        clone_node(child);
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
          _iterator7["return"]();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }

    stack_siblings();
    append_all_clones();

    to.style.maxWidth = widths.max - widths.min + "px";
    to.style.height = from.offsetHeight + "px";
    from.parentNode.style.display = "none";

    for (pane in panes) {
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

start_dragging = function (self, start_event) {
  var old_coordinates = _utilitiesUi_events2["default"].coordinates(start_event),
      drag_threshold_met = false,
      drag,
      drag_end;

  start_event.preventDefault();

  drag = function (event) {
    var new_coordinates = _utilitiesUi_events2["default"].coordinates(event);
    event.preventDefault();

    if (drag_threshold_met) {
      document.body.style.pointerEvents = "none";
      rotate_by((new_coordinates.x - old_coordinates.x) / 2, (new_coordinates.y - old_coordinates.y) / 2, self);
    } else {
      drag_threshold_met = _utilitiesUi_events2["default"].coordinates.distance_between(old_coordinates, new_coordinates) > _utilitiesUi_events2["default"].DRAG_THRESHOLD;
    }
  };

  drag_end = function (event) {
    if (!drag_threshold_met && event.target.classList.contains(classes.pane)) {
      self.select_pane(event.target);
    }

    // TODO: Maybe move to helper?
    document.body.style.pointerEvents = null;
  };

  return _utilitiesUi_events2["default"].add_drag_listeners(drag, drag_end);
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

rotate_by = function (x, y, self) {
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

update_panes = function (self) {
  var _self$rotation = self.rotation;
  var x = _self$rotation.x;
  var y = _self$rotation.y;
  var identity_matrix = (0, _utilitiesNumbers.Matrix)();
  var rotation_matrix = identity_matrix.rotate(-y, x, 0);
  var updates = [];
  var transform = _utilitiesClient2["default"].name_for("transform");
  var z_translate;var pane;var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {

    for (var _iterator8 = _getIterator(self.panes), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      pane = _step8.value;

      if (!pane.node) {
        continue;
      }

      z_translate = (pane.level * LAYER_GAP + pane.adjustment) * self.spread;
      updates.push({
        node: pane.node,
        transform: rotation_matrix.translate(0, 0, z_translate).toString()
      });
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
        _iterator8["return"]();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  requestAnimationFrame(function () {
    var update;

    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (var _iterator9 = _getIterator(updates), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
        update = _step9.value;

        update.node.style[transform] = update.transform;
      }
    } catch (err) {
      _didIteratorError9 = true;
      _iteratorError9 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion9 && _iterator9["return"]) {
          _iterator9["return"]();
        }
      } finally {
        if (_didIteratorError9) {
          throw _iteratorError9;
        }
      }
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

node_for_pane = function (pane) {
  var node_id = pane.getAttribute(attrs.node);
  if (!node_id) {
    throw new Error("The passed node must have an \"" + attrs.node + "\" attribute.");
  }
  return document.querySelector("[" + attrs.id + "='" + node_id + "']");
};

// TODO: get this out of here.

//*
// Gets the main class name for a given node.
//
// @param {HTMLElement} node - The node to retrieve the main class name for.
//
// @private
// @returns String

main_class_for_node = function (node) {
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

Exploded = function (node) {
  var self, api, set_markup, select_pane, select_component, on;

  self = {
    node: node,
    // TODO: write a simpler method for finding all occurances of a class
    structure: node.querySelector("." + classes.structure),
    source: node.querySelector("." + classes.source)
  };

  //*
  // Clears the existing explosion and re-initalizes the component with the new
  // markup.
  //
  // @method
  //
  // @param {String} markup - The new markup to demonstrate.

  set_markup = function (markup) {
    self.source.children[0].innerHTML = markup;
    (0, _utilitiesPainting.force_repaint)(node);
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

  select_pane = function (pane) {
    var panes = Array.isArray(pane) ? pane : [pane],
        event,
        related_node;

    requestAnimationFrame(function () {
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = _getIterator(self.panes), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          pane = _step10.value;
          pane.node.classList.remove(states.pane.selected);
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10["return"]) {
            _iterator10["return"]();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = _getIterator(panes), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          pane = _step11.value;
          pane.classList.add(states.pane.selected);
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11["return"]) {
            _iterator11["return"]();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }
    });

    if (!panes.length) {
      return;
    }
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

  select_component = function (component) {
    var panes = [],
        components = self.source.querySelectorAll("." + component),
        explosion_id,
        pane,
        event;

    var _iteratorNormalCompletion12 = true;
    var _didIteratorError12 = false;
    var _iteratorError12 = undefined;

    try {
      for (var _iterator12 = _getIterator(components), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
        component = _step12.value;

        explosion_id = component.getAttribute(attrs.id);
        pane = node.querySelector("[" + attrs.node + "=\"" + explosion_id + "\"]");
        if (pane) {
          panes.push(pane);
        }
      }
    } catch (err) {
      _didIteratorError12 = true;
      _iteratorError12 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion12 && _iterator12["return"]) {
          _iterator12["return"]();
        }
      } finally {
        if (_didIteratorError12) {
          throw _iteratorError12;
        }
      }
    }

    select_pane(panes);

    // Event won't get triggered by select_pane. Do it here instead.
    if (components.length && !panes.length) {
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

  on = function (event, callback) {
    var $node = $(node);
    $node.on(event, callback);

    return {
      remove: function remove() {
        $node.off(event, callback);
      }
    };
  };

  api = { select_pane: select_pane, select_component: select_component, set_markup: set_markup, on: on };
  _Object$assign(self, api);

  initialize_panes(self);
  initialize_ranges(self);

  self.structure.querySelector("." + classes.content).addEventListener(_utilitiesUi_events2["default"].drag.start, function (event) {
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

Exploded.init = function () {
  _utilitiesBuilder2["default"].build_and_cache(Exploded, { name: classes.root });
};

exports.classes = classes;
exports.states = states;
exports.attrs = attrs;
exports.events = events;
exports["default"] = Exploded;

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

},{"../../utilities/builder":23,"../../utilities/client":24,"../../utilities/numbers":30,"../../utilities/painting":31,"../../utilities/ui_events":36,"babel-runtime/core-js/array/from":41,"babel-runtime/core-js/get-iterator":42,"babel-runtime/core-js/object/assign":44,"babel-runtime/core-js/object/keys":48,"babel-runtime/helpers/define-property":53,"babel-runtime/helpers/interop-require-default":54,"babel-runtime/regenerator":128}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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
// The possible positions of an [`Iframe`](@link) — either the parent (on the
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

var Iframe, iframes, Communicator, create_self, add_event_listeners, move_markup_to_iframe;

iframes = [];

_utilitiesEvents2["default"].register.apply(_utilitiesEvents2["default"], iframe_events);

//*
// A mechanism for communicating between a given component and one or more
// [`Iframe`s](@link Iframe).
//
// @factoryk

exports.Communicator = Communicator = function () {
  var private_iframes = [],
      private_iframe,
      actions = {},
      communicator;

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

    trigger: function trigger(type, data) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(private_iframes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          private_iframe = _step.value;

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
    // string literal — instead, pass an event defined on
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
      var event_actions = actions[event.type],
          action;

      if (!event_actions) {
        return;
      }
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _getIterator(actions), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          action = _step2.value;
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
        var iframe;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _getIterator(iframes), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            iframe = _step3.value;
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

create_self = function (node) {
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
};

//*
// Sets up all required event listeners for an [`Iframe`](@link), including the
// listener for `postMessage` and listeners on the relevant `iframe` for the
// `load` event (as a hook to run the first set of events).
//
// @private
// @param {Object} self - The internal details of an [`Iframe`](@link).

add_event_listeners = function (self) {
  self.node.addEventListener("load", function () {
    var queued_message;

    self.ready = true;
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = _getIterator(self.message_queue), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        queued_message = _step4.value;
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
    var data, listener;

    if (typeof event.data !== "string") {
      return;
    }

    data = JSON.parse(event.data);
    if (data.id !== self.id) {
      return;
    }

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = _getIterator(self.listeners), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        listener = _step5.value;
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
};

//*
// Moves the markup for for an iframe into the actual iframe. This looks for the
// `iframe__content` sibling node of the iframe, takes its inner HTML, decodes
// the escaped entities, and writes the entirety of the resulting string (which
// includes the HTML element and all children) to the iframe's window.
//
// @private
// @param {Object} self - The internal details of an [`Iframe`](@link).

move_markup_to_iframe = function (self) {
  var iframe = self.node,
      iframe_content = iframe.parentNode.querySelector("." + classes.content),
      iframe_window = iframe.contentWindow;

  if (!(iframe_content && iframe_window)) {
    return;
  }

  iframe_window.document.open();
  iframe_window.document.write((0, _utilitiesMarkup.decode_html_entities)(iframe_content.innerHTML));
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

},{"../../utilities/dom_cache":25,"../../utilities/events":26,"../../utilities/markup":28,"babel-runtime/core-js/array/from":41,"babel-runtime/core-js/get-iterator":42,"babel-runtime/core-js/object/assign":44,"babel-runtime/helpers/interop-require-default":54}],8:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _avatar = require("./avatar");

var _avatar2 = _interopRequireDefault(_avatar);

var _code_block = require("./code_block");

var _code_block2 = _interopRequireDefault(_code_block);

var _demo = require("./demo");

var _demo2 = _interopRequireDefault(_demo);

var _exploded = require("./exploded");

var _exploded2 = _interopRequireDefault(_exploded);

var _field = require("./field");

var _field2 = _interopRequireDefault(_field);

var _iframe = require("./iframe");

var _iframe2 = _interopRequireDefault(_iframe);

var _internal_link = require("./internal_link");

var _internal_link2 = _interopRequireDefault(_internal_link);

var _resizable = require("./resizable");

var _resizable2 = _interopRequireDefault(_resizable);

var _scroll_container = require("./scroll_container");

var _scroll_container2 = _interopRequireDefault(_scroll_container);

var _select = require("./select");

var _select2 = _interopRequireDefault(_select);

var _table = require("./table");

var _table2 = _interopRequireDefault(_table);

var _tablist = require("./tablist");

var _tablist2 = _interopRequireDefault(_tablist);

var _toggle = require("./toggle");

var _toggle2 = _interopRequireDefault(_toggle);

var _xray = require("./xray");

var _xray2 = _interopRequireDefault(_xray);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceFoundationApp = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/foundation/app");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceFoundationApp2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceFoundationApp);

[_avatar2["default"], _code_block2["default"], _exploded2["default"], _field2["default"], _iframe2["default"], _internal_link2["default"], _resizable2["default"], _scroll_container2["default"], _demo2["default"], _select2["default"], _table2["default"], _tablist2["default"], _toggle2["default"], _xray2["default"]].forEach(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceFoundationApp2["default"].register);

},{"./avatar":2,"./code_block":3,"./demo":4,"./exploded":5,"./field":6,"./iframe":7,"./internal_link":9,"./resizable":11,"./scroll_container":13,"./select":14,"./table":15,"./tablist":16,"./toggle":17,"./xray":18,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/foundation/app":19,"babel-runtime/helpers/interop-require-default":54}],9:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceStructuresSidebar = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/structures/sidebar");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceStructuresSidebar2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceStructuresSidebar);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsTablist = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components/tablist");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsTablist2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsTablist);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsScroll_container = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components/scroll_container");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsScroll_container2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsScroll_container);

var InternalLink, move_to_node, on_hash_change, process_initial_hash, current_hash;

current_hash = function () {
  return window.location.hash.replace("#", "");
};

move_to_node = function (node) {
  _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsTablist2["default"].activate_panel_containing(node);
  _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsScroll_container2["default"]["for"](node).scroll_to(node);
};

on_hash_change = function () {
  var hash = current_hash(),
      node;

  _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceStructuresSidebar2["default"].hide();
  node = document.getElementById(hash);
  if (!node) {
    return;
  }

  node.id = null;
  window.location.hash = hash;
  node.id = hash;
  move_to_node(node);
};

process_initial_hash = function () {
  var hash = current_hash(),
      node;

  if (!hash.length) {
    return;
  }

  node = document.getElementById(hash);
  if (!node) {
    return;
  }

  move_to_node(node);
};

InternalLink = {
  init: function init() {
    $(window).on("hashchange", on_hash_change);
    setTimeout(process_initial_hash, 0);
  }
};

exports["default"] = InternalLink;
module.exports = exports["default"];

},{"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components/scroll_container":13,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components/tablist":16,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/structures/sidebar":22,"babel-runtime/helpers/interop-require-default":54}],10:[function(require,module,exports){
"use strict";

},{}],11:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _size_buttons = require("./size_buttons");

var _size_buttons2 = _interopRequireDefault(_size_buttons);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsIframe = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components/iframe");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesEvents = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/events");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesEvents2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesEvents);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesUi_events = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/ui_events");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesUi_events2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesUi_events);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/keycodes");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/builder");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder);

var classes = {
  root: "resizable",
  handle: "resizable__handle",
  container: "resizable__size-button",
  width_indicator: "resizable__width-indicator",
  px_indicator: "resizable__width-indicator__px",
  em_indicator: "resizable__width-indicator__em"
};

var states = {
  root: { transitioning: "resizable--is-transitioning-width" },
  size_button: {
    hidden: "resizable__size-button--is-hidden",
    active: "resizable__size-button--is-active"
  },
  width_indicator: { visible: "resizable__width-indicator--is-visible" }
};

var SHOW_WIDTH_DURATION = 2500;

var Resizable, key_on_handle, handle_drag_move, start_dragging_handle;

//*
// Handles key presses on the resizable handle. If the key is an arrow key,
// the resizable component will be resized appropriately. If the shift key is
// being pressed at the same time, the resizing will be accelerated.
//
// @param {Object} event - The `keypress` event.
// @private

key_on_handle = function (event) {
  var width_change;

  if (!_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes2["default"].ARROWS.includes(event.which)) {
    return;
  }
  event.preventDefault();

  width_change = event.shiftKey ? 10 : 2;
  if ([_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes2["default"].LEFT, _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes2["default"].DOWN].includes(event.which)) {
    width_change = width_change * -1;
  }

  Resizable["for"](event.target).set_width({ delta: width_change });
};

//*
// Handles a drag movement while holding onto a resizable handle. As the user
// drags, the associated resizable component will resize.
//
// @param {Object} context - The context for the current drag.
// @param {Object} event   - The `mousemove`/ `touchmove` event.
//
// @private

handle_drag_move = function (context, event) {
  var x = _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesUi_events2["default"].coordinates(event).x,
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

start_dragging_handle = function (context) {
  var drag_move, drag_end, listeners;

  context.iframe.style.pointerEvents = "none";

  drag_move = function (event) {
    handle_drag_move(context, event);
  };
  drag_end = function () {
    listeners.remove();
    context.iframe.style.pointerEvents = null;
  };

  listeners = _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesUi_events2["default"].add_drag_listeners(drag_move, drag_end);
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

Resizable = function (root) {
  var api, structure, set_width, show_width, size_buttons, handle_host_resize, min_width, max_width, container_side_padding, width_taken_by_side_components, communicator, respond_to_height, set_height, initialize_handle_resize, container_styles;

  size_buttons = _size_buttons2["default"].within(root)[0];

  communicator = (0, _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsIframe.Communicator)();
  communicator.register.from_node(root);

  respond_to_height = function (event) {
    set_height(event.height);
  };
  communicator.on(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesEvents2["default"].types.height_change, respond_to_height);
  communicator.on(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesEvents2["default"].types.height_request, respond_to_height);

  structure = {
    root: root,
    iframe: root.querySelector("iframe"),
    handle: root.querySelector("." + classes.handle),
    container: root.parentNode,
    width_indicator: root.querySelector("." + classes.width_indicator)
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

  handle_host_resize = function () {
    max_width = structure.container.offsetWidth - container_side_padding - width_taken_by_side_components;
    show_width();
  };

  //*
  // Sets the height of the `Resizable`. This is done directly on the contained
  // `iframe`.
  //
  // @param {Number} height - The new height of the contained `iframe`.
  // @private

  set_height = function (height) {
    structure.iframe.style.height = height + "px";
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

  show_width = (function () {
    var show_width_timeout;

    return function () {
      var width = structure.iframe.offsetWidth;

      structure.width_indicator.querySelector("." + classes.px_indicator).textContent = width;
      structure.width_indicator.querySelector("." + classes.em_indicator).textContent = (width / 16).toFixed(2);

      if (show_width_timeout) {
        clearTimeout(show_width_timeout);
      } else {
        structure.width_indicator.classList.add(states.width_indicator.visible);
      }

      show_width_timeout = setTimeout(function () {
        structure.width_indicator.classList.remove(states.width_indicator.visible);
        show_width_timeout = null;
      }, SHOW_WIDTH_DURATION);
    };
  })();

  set_width = function (width) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (typeof width === "object") {
      options = width;
      width = root.offsetWidth - width_taken_by_side_components + (options.delta || 0);
    }

    if (options.animated) {
      root.classList.add(states.root.transitioning);
      _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesUi_events2["default"].transition(root, function () {
        root.classList.remove(states.root.transitioning);
      });
    }

    if (width) {
      width = Math.max(Math.min(width, max_width), min_width);
      root.style.width = width + width_taken_by_side_components + "px";
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

  initialize_handle_resize = function (event) {
    var context = {
      start_x: _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesUi_events2["default"].coordinates(event).x,
      start_width: structure.iframe.offsetWidth,
      max_width: structure.container.offsetWidth - container_side_padding,
      set_width: set_width,
      iframe: structure.iframe
    };

    start_dragging_handle(context);
  };

  show_width();

  $(window).on("resize", handle_host_resize);
  $(structure.handle).on(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesUi_events2["default"].drag.start, initialize_handle_resize);

  api = { set_width: set_width };
  return api;
};

Resizable.init = function () {
  _size_buttons2["default"].init();
  _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder2["default"].build_and_cache(Resizable, { name: classes.root });

  $(document).on("keydown", "." + classes.handle, key_on_handle);
};

exports["default"] = Resizable;
module.exports = exports["default"];

},{"./size_buttons":12,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components/iframe":7,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/builder":23,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/events":26,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/keycodes":27,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/ui_events":36,"babel-runtime/helpers/interop-require-default":54}],12:[function(require,module,exports){
"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _Object$defineProperties = require("babel-runtime/core-js/object/define-properties")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _resizable = require("./resizable");

var _resizable2 = _interopRequireDefault(_resizable);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/builder");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/keycodes");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes);

var SizeButtons, SizeRelationships, click_size_button, next_unhidden_size_button, previous_unhidden_size_button, key_on_size_button;

var classes = {
  root: "resizable__size-button",
  container: "resizable__size-buttons"
};

var states = {
  root: {
    hidden: "resizable__size-button--is-hidden",
    active: "resizable__size-button--is-active"
  }
};

var attrs = {
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

click_size_button = function (event) {
  var button = $(event.target).closest("." + classes.root);
  SizeButtons["for"](button).active_button = button;
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

next_unhidden_size_button = function (button) {
  var sibling = button.nextElementSibling;

  while (sibling) {
    if (!sibling.classList.contains(states.size_button.hidden)) {
      return sibling;
    }
    sibling = sibling.nextElementSibling;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(_Array$from(button.parentNode.children)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      sibling = _step.value;

      if (sibling === button) {
        break;
      }
      if (!sibling.classList.contains(states.size_button.hidden)) {
        return sibling;
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

previous_unhidden_size_button = function (button) {
  var sibling = button.previousElementSibling;

  while (sibling) {
    if (!sibling.classList.contains(states.size_button.hidden)) {
      return sibling;
    }
    sibling = sibling.previousElementSibling;
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _getIterator(_Array$from(button.parentNode.children).reverse()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      sibling = _step2.value;

      if (sibling === button) {
        break;
      }
      if (!sibling.classList.contains(states.size_button.hidden)) {
        return sibling;
      }
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

  return null;
};

//*
// Handles key presses on a size button. If the key is enter or space, the
// size button will be activated. If the key is an arrow key, this function will
// move focus to the correct sibling size button.
//
// @param {Object} event - The `keypress` event.
// @private

key_on_size_button = function (event) {
  var button, new_button;

  if (_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes2["default"].ACTIVATE.includes(event.which)) {
    event.preventDefault();
    click_size_button(event);
  }

  if (_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes2["default"].ARROWS.includes(event.which)) {
    event.preventDefault();
    button = $(event.target).closest("." + classes.size_button)[0];
    new_button = _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes2["default"].NEXT.includes(event.which) ? next_unhidden_size_button(button) : previous_unhidden_size_button(button);

    if (new_button) {
      SizeButtons["for"](button).focused_button = new_button;
    }
  }
};

//*
// @factory

SizeButtons = function (buttons) {
  var api, associations, active_button, a11y, activate_button, focus_button, activate_active_button, deactivate_active_button, size, a_button;

  buttons = _Array$from(buttons.children);
  associations = {};
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _getIterator(buttons), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      a_button = _step3.value;

      size = SizeRelationships[a_button.getAttribute(attrs.button_size)];
      associations[size] = a_button;
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

  a11y = {
    focus: function focus(button) {
      button.setAttribute("tabindex", "0");
      button.focus();
    },

    blur: function blur(button) {
      button.setAttribute("tabindex", "-1");
    },

    select: function select(button) {
      this.focus(button);
      button.setAttribute("aria-selected", "true");
    },

    deselect: function deselect(button) {
      this.blur(button);
      button.setAttribute("aria-selected", "false");
    }
  };

  deactivate_active_button = function () {
    if (!active_button) {
      return;
    }

    a11y.deslect(active_button);
    active_button.classList.remove(states.root.active);
  };

  activate_button = function (button) {
    if (!buttons.includes(button) || active_button === button) {
      return active_button;
    }

    deactivate_active_button();
    active_button = button;
    _resizable2["default"]["for"](button).set_width(parseInt(button.getAttribute(attrs.size_button), 10), { animated: true });
    activate_active_button();
    return active_button;
  };

  focus_button = function (button) {
    a11y.focus(button);
    return button;
  };

  activate_active_button = function () {
    if (!active_button) {
      return;
    }

    a11y.select(active_button);
    active_button.classList.add(states.root.active);
  };

  api = _Object$defineProperties({

    try_size: function try_size(new_size) {
      deactivate_active_button();
      active_button = associations[new_size];
      activate_active_button();
    }
  }, {
    active_button: {
      set: function set(button) {
        return activate_button(button);
      },
      get: function get() {
        return active_button;
      },
      configurable: true,
      enumerable: true
    },
    focused_button: {
      set: function set(button) {
        return focus_button(button);
      },
      configurable: true,
      enumerable: true
    }
  });

  return api;
};

SizeButtons.init = function () {
  _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder2["default"].build_and_cache(SizeButtons, { name: classes.container });

  $(document).on("click", "." + classes.root, click_size_button).on("keydown", "." + classes.root, key_on_size_button);
};

exports["default"] = SizeButtons;
module.exports = exports["default"];

},{"./resizable":11,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/builder":23,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/keycodes":27,"babel-runtime/core-js/array/from":41,"babel-runtime/core-js/get-iterator":42,"babel-runtime/core-js/object/define-properties":46,"babel-runtime/helpers/interop-require-default":54}],13:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/builder");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder);

var classes = {
  root: "scroll-container"
};

var ScrollContainer;

ScrollContainer = function (node) {
  var force_height = function force_height(height) {
    node.style.minHeight = height + "px";
  };

  return {
    maintain_current_height: function maintain_current_height() {
      force_height(node.offsetHeight);
    },
    restore_height: function restore_height() {
      node.style.minHeight = null;
    },

    scroll_to: function scroll_to(contained_node) {
      node.parentNode.scrollTop = contained_node.getBoundingClientRect().top - node.getBoundingClientRect().top;
    }
  };
};

ScrollContainer.init = _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder2["default"].initialize_once(ScrollContainer, { name: classes.root, cache: true });

exports["default"] = ScrollContainer;
module.exports = exports["default"];

},{"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/builder":23,"babel-runtime/helpers/interop-require-default":54}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var classes = {
  root: "select",
  input: "select__input"
};

var states = {
  root: { focused: classes.root + "--is-focused" }
};

var Select, focus_or_blur_select;

//*
// Translates the `focus`/ `blur` events on the actual `select` node into the
// appropriate addition/ removal of the focused state on the base node of the
// component. This has to be done because most of the visual styling for the
// component is placed on the container, so any adjustments to those styles on
// focus require that container to be aware of the state of its contained
// `select`.
//
// @param {Object} event - The `focus`/ `blur` event on the `select`.
// @private

focus_or_blur_select = function (event) {
  var method = event.type === "focusin" ? "add" : "remove";
  $(event.target).closest(".#{CLASSES.BASE}")[0].classList[method](states.root.focused);
};

Select = {
  init: function init() {
    $(document).on("focus blur", "." + classes.input, focus_or_blur_select);
  }
};

exports.classes = classes;
exports["default"] = Select;

},{}],15:[function(require,module,exports){
"use strict";

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/builder");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/keycodes");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes);

var classes = {
  root: "table",
  header: "table__header",
  body: "table__body",
  row: "table__row",
  cell: "table__cell",
  scroller: "table__scroller",
  container: "table__container",
  actions: "table__actions"
};

var states = {
  scroller: { scrolled: "table__scroller--is-scrolled" },
  container: { overflowing: "table__container--is-overflowing" }
};

var attrs = {
  action: "table-action"
};

var actions = {
  shift_right: "shift-right",
  shift_left: "shift-left"
};

var Table, cache_preferred_widths, check_for_overflow, shift_table_right, shift_table_left, last_visible_cell, handle_keypress, handle_scroll, initialize_table_actions, update_actions;

//*
// Calculates and applies the intrinsic widths of the columns of a `table`,
// keeping in mind the effective maximum column size implied by the `min-width`
// set on the table.
//
// The intrinsic widths of each column are applied only once, to the header
// cells of the column. These are applied by using them as the `min-width`s for
// each header cell, so that the table will appropriately overflow once the
// space available to the table is less than the sum of its intrinsic widths.
//
// A side effect of this function is that `self` is augmented with the minimum
// total intrinsic width of its columns (`min_width`).
//
// @param {Object} self - The internal details of a `Table`.
// @private

cache_preferred_widths = function (self) {
  var table = self.root,
      clone = table.parentNode.parentNode.cloneNode(true),
      width_calculation_container,
      clone_table,
      cloned_header_cells;

  // For the purposes of the width calculations, let the table be at the smaller
  // of its intrinsic size and the `min-width` set in CSS.
  clone.style.maxWidth = window.getComputedStyle(table).minWidth;
  table.style.minWidth = "0px";
  clone.style.display = "inline-block";

  // Creates a container that won't restrict the size of the table.
  width_calculation_container = $("<div style='width: 10000px; visibility: hidden; height: 0;' />")[0];
  width_calculation_container.appendChild(clone);
  document.body.appendChild(width_calculation_container);

  clone_table = clone.querySelector("." + classes.root);
  self.min_width = clone_table.offsetWidth; // sum of constrained intrinsic widths

  // Apply the constrained intrinsic widths to each of the header cells in the
  // actual table.
  cloned_header_cells = _Array$from(clone.querySelectorAll("." + classes.header + " ." + classes.cell));
  self.header_cells.forEach(function (cell, index) {
    cell.style.minWidth = cloned_header_cells[index].offsetWidth + "px";
  });

  // Cleanup.
  document.body.removeChild(width_calculation_container);
};

//*
// Determines whether or not there is overflow and performs all necessary size
// and other DOM updates. This includes fixing the size of the first cell in a
// row and adding a compensating amount of left padding to the second cell in
// each row when the table should overflow, and reversing this when it no longer
// needs to do so.
//
// @param {Object} self - The internal details of a `Table`.
// @private

check_for_overflow = function (self) {
  var scroller = self.scroller;
  var root = self.root;
  var container = self.container;
  var overflowing = self.overflowing;
  var min_width = self.min_width;
  var scroller_width = scroller.offsetWidth;
  var first_cell_width;var cell;var available_space;var index;

  if (!scroller_width) {
    return;
  }

  // Newly overflowing, get the header's width and apply that same width
  // to each first cell (since they'll be absolutely positioned), and add an
  // equivalent amount of left padding to the second cell.
  if (!overflowing && scroller_width < min_width) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(_Array$from(root.querySelectorAll("." + classes.cell + ":first-child"))), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        cell = _step.value;

        first_cell_width = first_cell_width || cell.offsetWidth;

        cell.style.width = first_cell_width + "px";
        self.scroller.style.paddingLeft = first_cell_width - 1 + "px";
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

    container.classList.add(states.container.overflowing);
    self.overflowing = true;
  }

  // No longer overflowing — reverse what we did before!
  if (overflowing && scroller_width >= min_width) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(_Array$from(root.querySelectorAll("." + classes.cell + ":first-child"))), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        cell = _step2.value;

        first_cell_width = first_cell_width || cell.offsetWidth;

        cell.style.width = null;
        self.scroller.style.paddingLeft = null;
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

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _getIterator(self.header_cells), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        cell = _step3.value;
        cell.style.maxWidth = null;
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

    container.classList.remove(states.container.overflowing);
    self.overflowing = false;
  }

  // Even if already overflowing, update the max-widths of columns such that the
  // persistant cell + any other cell <= the total width.
  if (scroller_width < min_width) {
    available_space = scroller_width - self.header_cells[0].offsetWidth;

    for (index = 1; index++; index < self.header_cells.length) {
      self.header_cells[index].style.maxWidth = available_space + "px";
    }
  }
};

last_visible_cell = function (self) {
  var last_cell = self.header_cells[1],
      parent_width = self.scroller.scrollLeft + self.scroller.offsetWidth - parseInt(self.scroller.style.paddingLeft, 10),
      width_so_far = last_cell.offsetWidth,
      cell,
      index;

  for (index = 2; index++; index < self.header_cells[index]) {
    cell = self.header_cells[index];
    if (width_so_far + cell.offsetWidth > parent_width) {
      break;
    }
    last_cell = cell;
    width_so_far += cell.offsetWidth;
  }

  return [last_cell, parent_width - width_so_far];
};

//*
// Shifts the `Table` represented by `self` to the right by one column. If the
// table currently has a column that is partially visible on the right, the
// table will be scrolled such that that entire column is visible. If a column
// is entirely visible and pressed right against the right edge of the scroll
// area, the next (fully hidden) column will be shown.
//
// This has no effect if the table is already fully scrolled.
//
// @param {Object} self - The internal details of a `Table`.

shift_table_right = function (self) {
  var last_cell, next_cell_overlap;

  if (!self.overflowing) {
    return;
  }

  var _last_visible_cell = last_visible_cell(self);

  var _last_visible_cell2 = _slicedToArray(_last_visible_cell, 2);

  last_cell = _last_visible_cell2[0];
  next_cell_overlap = _last_visible_cell2[1];

  if (last_cell === self.header_cells[self.header_cells.length - 1]) {
    return;
  }
  self.scroller.scrollLeft += last_cell.nextElementSibling.offsetWidth - next_cell_overlap;
  self.scroller.classList.add(states.scroller.scrolled);
  update_actions(self);
};

//*
// Shifts the `Table` represented by `self` to the left by one column. If the
// table currently has a column that is partially visible on the right, the
// table will be scrolled such that that entire column is hidden. If a column
// is entirely visible and pressed right against the right edge of the scroll
// area, that column will be scrolled out of view.
//
// This has no effect if the table is at a scroll position of 0.
//
// @param {Object} self - The internal details of a `Table`.

shift_table_left = function (self) {
  var last_cell, next_cell_overlap, scroll_delta;

  if (!self.overflowing) {
    return;
  }

  var _last_visible_cell3 = last_visible_cell(self);

  var _last_visible_cell32 = _slicedToArray(_last_visible_cell3, 2);

  last_cell = _last_visible_cell32[0];
  next_cell_overlap = _last_visible_cell32[1];

  scroll_delta = next_cell_overlap ? -next_cell_overlap : -last_cell.offsetWidth;

  self.scroller.scrollLeft += scroll_delta;
  if (!self.scroller.scrollLeft) {
    self.scroller.classList.remove(states.scroller.scrolled);
  }
  update_actions(self);
};

//*
// Handles a keypress while focused on the table. Only left/ right/ up/ down
// keypresses are handled here: left and down will shift the table left, while
// right and up will shift the table right.
//
// @param {Object} event - The original `keypress` event.
// @param {Object} self - The internal details of a `Table`.
// @private

handle_keypress = function (event, self) {
  switch (event.which) {
    case _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes2["default"].RIGHT:
      event.preventDefault();
      shift_table_right(self);
      break;
    case _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes2["default"].LEFT:
      event.preventDefault();
      shift_table_left(self);
      break;
  }
};

//*
// Handles scrolling on the table by updating the classes on the scroller/
// action buttons to reflect the current scroll position.
//
// @param {Object} event - The original `scroll` event.
// @param {Object} self - The internal details of a `Table`.
// @private

handle_scroll = function (event, self) {
  var scroller;

  if (!self.overflowing) {
    return;
  }

  scroller = self.scroller;
  if (scroller.scrollLeft > 0) {
    scroller.classList.add(states.scroller.scrolled);
  } else {
    scroller.classList.remove(states.scroller.scrolled);
  }

  update_actions(self);
  event.stopPropagation();
};

//*
// Hooks up the event handlers for table actions, stores the actions on
// `self.shifters` for easier access later, and performes the initial updates
// to make the state of the actions match the table itself.
//
// @param {Object} self - The internal details of a `Table`.
// @private

initialize_table_actions = function (self) {
  var action;

  self.shifters = {};
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _getIterator(_Array$from(self.container.querySelectorAll("." + classes.actions + " [" + attrs.action + "]"))), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      action = _step4.value;

      self.shifters[action.getAttribute(attrs.action).replace("shift-", "")] = action;
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

  update_actions(self);

  $(self.container).on("click", "." + classes.actions, function (event) {
    switch (event.target.getAttribute(attrs.action)) {
      case actions.shift_right:
        shift_table_right(self);
        break;
      case actions.shift_left:
        shift_table_left(self);
        break;
    }
  });
};

//*
// Updates the table actions by disabling actions that can't be performed given
// the state of the table (for example, a left shifter when the table is fully
// scrolled to the left).
//
// @param {Object} self - The internal details of a `Table`.
// @private

update_actions = (function () {
  var disable, enable;

  disable = function (shifter) {
    shifter.disabled = true;
    shifter.classList.add(shifter.className.split(" ")[0] + "--is-disabled");
  };

  enable = function (shifter) {
    shifter.disabled = false;
    shifter.classList.remove(shifter.className.split(" ")[0] + "--is-disabled");
  };

  return function (self) {
    var shifters = self.shifters,
        scroll = self.scroller.scrollLeft;

    if (!scroll) {
      disable(shifters.left);
    } else {
      enable(shifters.left);
    }

    if (scroll + self.scroller.offsetWidth + 1 >= self.scroller.scrollWidth) {
      disable(shifters.right);
    } else {
      enable(shifters.right);
    }
  };
})();

//*
// A factory for producing `Table` objects.
//
// @param {HTMLElement} root - The root (`.table`) node of the table. Note that
//                            this is not the container or scroller, but the
//                            actual `table` element itself.
//
// @factory

Table = function (root) {
  var $root, self;

  $root = $(root);
  self = {
    root: root,
    scroller: $root.closest("." + classes.scroller)[0],
    container: $root.closest("." + classes.container)[0],
    overflowing: false,
    header_cells: _Array$from(root.querySelectorAll("." + classes.header + " ." + classes.cell))
  };

  root.setAttribute("tabindex", "-1");
  cache_preferred_widths(self);
  check_for_overflow(self);
  initialize_table_actions(self);

  $(window).on("resize", function () {
    check_for_overflow(self);
    update_actions(self);
  });

  root.addEventListener("keydown", function (event) {
    handle_keypress(event, self);
  });
  self.scroller.addEventListener("scroll", function (event) {
    handle_scroll(event, self);
  });
};

Table.init = function () {
  _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder2["default"].build(Table, { name: classes.root });
};

},{"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/builder":23,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/keycodes":27,"babel-runtime/core-js/array/from":41,"babel-runtime/core-js/get-iterator":42,"babel-runtime/helpers/interop-require-default":54,"babel-runtime/helpers/sliced-to-array":55}],16:[function(require,module,exports){
"use strict";

var _defineProperty = require("babel-runtime/helpers/define-property")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _Object$defineProperties = require("babel-runtime/core-js/object/define-properties")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesQuery_string = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/query_string");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesQuery_string2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesQuery_string);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/builder");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesDom_cache = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/dom_cache");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesDom_cache2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesDom_cache);

var classes = {
  root: "tablist",
  tab: "tablist__tab",
  panel: "tablist__panel"
};

var variants = {
  root: { manages_url: "tablist--manages-url" }
};

var states = {
  tab: { active: "tablist__tab--is-active" },
  panel: { active: "tablist__panel--is-active" }
};

var Tablist, tab_click, panel_for_tab, tab_for_panel, tablist_for_node, a11y, apply_activation_markup, remove_activation_markup, panel_containing_node;

//*
// Manages a click on a tab by finding the associated `Tablist` and activating
// the tab that was clicked on.
//
// @param {Object} event - The `click` event.
// @private

tab_click = function (event) {
  var tablist;

  event.preventDefault();

  tablist = Tablist["for"](event.target);
  if (!tablist) {
    return;
  }
  tablist.activate_tab($(event.currentTarget).closest("." + classes.tab)[0]);
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

panel_for_tab = function (tab) {
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

tab_for_panel = function (panel) {
  return panel && document.querySelector("." + classes.tab + "[href='#" + panel.id + "']");
};

//*
// Writes all of the required accessibility markup to the tablist and its
// subcomponents. This includes IDs for the tablist and its tabs/ panels,
// roles for the same, and the `aria-` associations between tabs and their
// corresponding panels.
//
// @param {HTMLElement} tablist - The root node of the tablist.
// @private

a11y = (function () {
  var _current_ids;

  var current_ids, id_for;

  current_ids = (_current_ids = {}, _defineProperty(_current_ids, classes.root, 1), _defineProperty(_current_ids, classes.tab, 1), _defineProperty(_current_ids, classes.panel, 1), _current_ids);

  id_for = function (node) {
    var type = node.className.split(" ")[0];
    return type + "--" + current_ids[type]++;
  };

  return function (tablist) {
    var panel, tab_id, panel_id, tab;

    tablist.id = tablist.id || id_for(tablist);
    tablist.setAttribute("role", "tablist");

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(_Array$from(tablist.querySelectorAll("." + classes.tab))), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        tab = _step.value;

        panel = panel_for_tab(tab);
        if (!panel) {
          continue;
        }

        tab_id = tab.id || id_for(tab);
        panel_id = panel.id || id_for(panel);

        tab.id = tab_id;
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-controls", panel_id);
        tab.setAttribute("href", "#" + panel_id);

        panel.id = panel_id;
        panel.setAttribute("role", "tab-panel");
        panel.setAttribute("aria-labelledby", tab_id);
        panel.setAttribute("aria-hidden", !panel.classList.contains(states.panel.active));
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
})();

apply_activation_markup = function (node) {
  if (!node) {
    return;
  }

  if (node.classList.contains(classes.tab)) {
    node.classList.add(states.tab.active);
  } else {
    node.classList.add(states.panel.active);
  }
};

remove_activation_markup = function (node) {
  if (!node) {
    return;
  }

  if (node.classList.contains(classes.tab)) {
    node.classList.remove(states.tab.active);
  } else {
    node.classList.remove(states.panel.active);
  }
};

panel_containing_node = function (node) {
  return $(node).closest("." + classes.panel)[0];
};

tablist_for_node = function (node) {
  if (node.classList.contains(classes.panel)) {
    node = tab_for_panel(node);
  }

  return $(node).closest("." + classes.root)[0];
};

//*
// The constructor around a `Tablist` component. This constructor returns a very
// small API: only an `activate_tab` method is exposed, which will activate the
// passed tab in the tablist. This constructor will also ensure that all the
// aria properties and associations are hooked up correctly.

Tablist = function (root) {
  var active_tab = root.querySelector("." + states.tab.active),
      active_panel = panel_for_tab(active_tab),
      saved_tab,
      api,
      self;

  a11y(root);

  self = {
    root: root,
    id: root.id,
    active_panel: panel_for_tab(active_tab),
    manages_url: root.classList.contains(variants.root.manages_url)
  };

  api = _Object$defineProperties({
    //*
    // Activates the passed tab, deactivating the currently-active tab, if there
    // is one (and it is not the passed tab).
    //
    // @param {HTMLElement} tab - The tab to activate.

    activate_tab: function activate_tab(tab) {
      this.active_tab = tab;
    }

  }, {
    active_tab: {
      get: function get() {
        return active_tab;
      },
      set: function set(tab) {
        var panel = panel_for_tab(tab);

        apply_activation_markup(tab);
        apply_activation_markup(panel);

        if (!tab || tab === active_tab) {
          return;
        }

        remove_activation_markup(active_tab);
        remove_activation_markup(active_panel);

        active_tab = tab;
        active_panel = panel;

        if (this.manages_url && _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesQuery_string2["default"].get(this.id) !== tab.id) {
          _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesQuery_string2["default"].set(this.id, tab.id);
        }
      },
      configurable: true,
      enumerable: true
    },
    active_panel: {
      get: function get() {
        return active_panel;
      },
      set: function set(panel) {
        this.active_tab = panel_for_tab(panel);
      },
      configurable: true,
      enumerable: true
    }
  });

  if (self.manages_url) {
    saved_tab = _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesQuery_string2["default"].get(self.id);
    if (saved_tab) {
      api.active_tab = document.getElementById(saved_tab);
    }
  } else {
    api.active_tab = active_tab;
  }

  return api;
};

Tablist["for"] = function (node) {
  var tablist_node = $(node).closest("." + classes.root)[0],
      containing_panel;

  if (!tablist_node) {
    containing_panel = node.classList.contains(classes.panel) ? node : panel_containing_node(node);
    if (!containing_panel) {
      return false;
    }
    tablist_node = tablist_for_node(containing_panel);
  }

  if (!tablist_node) {
    return false;
  }
  return (0, _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesDom_cache2["default"])(tablist_node).get(classes.root);
};

Tablist.init = function () {
  _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder2["default"].build_and_cache(Tablist, { name: classes.root });
  $(document).on("click", "." + classes.tab, tab_click);
};

Tablist.activate_panel_containing = function (node) {
  var panel = $(node).closest("." + classes.panel)[0],
      tablist = Tablist["for"](panel);

  if (tablist) {
    tablist.active_tab = tab_for_panel(panel);
  }
  return !!tablist;
};

Tablist.is_in_active_panel = function (node) {
  var panel = panel_containing_node(node);
  return !!panel && panel.classList.contains(states.panel.active);
};

exports["default"] = Tablist;
module.exports = exports["default"];

},{"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/builder":23,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/dom_cache":25,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/query_string":33,"babel-runtime/core-js/array/from":41,"babel-runtime/core-js/get-iterator":42,"babel-runtime/core-js/object/define-properties":46,"babel-runtime/helpers/define-property":53,"babel-runtime/helpers/interop-require-default":54}],17:[function(require,module,exports){
"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Object$defineProperties = require("babel-runtime/core-js/object/define-properties")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsModal = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components/modal");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsModal2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsModal);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsIframe = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components/iframe");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/keycodes");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesPattern = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/pattern");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesPattern2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesPattern);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/builder");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesEvents = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/events");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesEvents2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesEvents);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesNaming_convention = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/naming_convention");

var classes = {
  root: "toggle",
  info: "toggle__info",
  container: "toggle__container"
};

var states = {
  root: {
    locked: "toggle--is-locked",
    active: "toggle--is-active",
    partially_active: "toggle--is-partially-active"
  }
};

var attrs = {
  name: "data-variation-name"
};

var Toggle, Toggles, handle_keypress, info_click, toggle_click, update_toggle_state;

//*
// Listens and responds to keypress events while focused on a toggle. If either
// space or enter are pressed, the toggle will be toggled as if it had been
// clicked on. This allows for keyboard-only navigation and manipulation of
// toggles.
//
// @param {Object} event - The `keypress` event.
// @private

handle_keypress = function (event) {
  if (![_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes2["default"].ENTER, _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesKeycodes2["default"].SPACE].include(event.which)) {
    return;
  }
  event.preventDefault();
  update_toggle_state(event.target);
};

//*
// Listens for clicks on the information icon in the toggle and activates the
// modal to present details on that variation.
//
// @param {Object} event - The `click` event.
// @private

info_click = function (event) {
  var variation_name;

  // Prevent the click event from propagating to the toggle.
  event.stopImmediatePropagation();
  event.preventDefault();

  variation_name = $(event.target).closest("." + classes.root)[0].getAttribute(attrs.name);
  _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsModal2["default"].present(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesPattern2["default"].find(variation_name, { search_all: true }));
};

//*
// Listens for click events on a toggle and updates the state of the toggle
// appropriately.
//
// @param {Object} event - The `click` event.
// @private

toggle_click = function (event) {
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

update_toggle_state = function (toggle) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var toggle_node, all_toggles, variation, add, currently_active, activate_with, activate_with_toggle, preclude;

  toggle = Toggle["for"](toggle);
  if (toggle.locked) {
    return;
  }
  toggle_node = toggle.root;
  toggle.lock();

  all_toggles = Toggles["for"](toggle_node);
  variation = _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesPattern2["default"]["for"](toggle_node.getAttribute(attrs.name), { search_all: true });
  add = options.add ? !!options.add : !toggle.active;

  // Update the state of all variations that should be activated with the
  // current toggle.
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(variation && variation.activate_with || []), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      activate_with = _step.value;

      if (_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesNaming_convention.naming_convention.is_component(variation)) {
        continue;
      }

      activate_with_toggle = Toggle["for"](activate_with);

      if (activate_with_toggle) {
        currently_active = activate_with_toggle.active;
        if (currently_active && !add || !currently_active && add) {
          update_toggle_state(activate_with_toggle, { add: add });
        }
      } else {
        all_toggles.trigger({
          add: add,
          details: {
            "for": _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesNaming_convention.naming_convention.component_name(activate_with),
            name: activate_with
          }
        });
      }
    }

    // TODO: something about filters.
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

  if (add) {
    toggle.activate();

    // Deactivates any currently active variations that are precluded from being
    // active with the current variation.
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(variation && variation.precludes || []), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        preclude = _step2.value;

        preclude = Toggle["for"](preclude);
        if (preclude && preclude.active) {
          update_toggle_state(preclude, { add: false });
        }
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
  } else {
    toggle.deactivate();
  }

  toggle.unlock();
  all_toggles.trigger({ add: add, details: variation });
};

//*
// A constructor around a single `Toggle`. The returned object gives the ability
// to update the toggle's state, locking or unlocking the toggle from further
// changes, and getting the current state of the toggle.
//
// @param {HTMLElement} root - The root node of a toggle.
// @return {Toggle}

Toggle = function (root) {
  if (!root) {
    return null;
  }
  if (root instanceof Toggle) {
    return root;
  }

  return _Object$defineProperties({
    root: root,
    lock: function lock() {
      root.classList.add(states.root.locked);
    },
    unlock: function unlock() {
      root.classList.remove(states.root.locked);
    },
    activate: function activate() {
      root.classList.add(states.root.active);
    },
    deactivate: function deactivate() {
      root.classList.remove(states.root.active);
    },

    constructor: Toggle
  }, {
    is_locked: {
      get: function get() {
        return root.classList.contains(states.root.locked);
      },
      configurable: true,
      enumerable: true
    },
    is_active: {
      get: function get() {
        return root.classList.contains(states.root.active) || root.classList.contains(states.root.partially_active);
      },
      configurable: true,
      enumerable: true
    }
  });
};

//*
// Gets the toggle for the passed variation.
//
// @param {Toggle, String, HTMLElement} variation - The source of the desired
// `Toggle` — either as the HTMLElement that roots the toggle, a `Toggle` (which
// is returned as-is) or a `String` that is the name of a toggle.
//
// @return {Toggle}

Toggle["for"] = function (variation) {
  if (variation instanceof Toggle) {
    return variation;
  } else if (typeof variation === "string") {
    return Toggle(document.querySelector("[" + attrs.name + "='" + variation.name + "']"));
  } else {
    return Toggle($(variation).closest("." + classes.root)[0]);
  }
};

Toggles = function (root) {
  var communicator = (0, _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsIframe.Communicator)();
  communicator.register.from_node(root);

  return {
    trigger: function trigger() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      communicator.trigger.apply(communicator, [_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesEvents2["default"].types.class_change].concat(args));
    }
  };
};

Toggles.init = function () {
  $(document).on("keypress", "." + classes.root, handle_keypress).on("click", "." + classes.info, info_click).on("click", "." + classes.root, toggle_click);

  _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesBuilder2["default"].build(Toggles, { name: classes.container, cache: true });
};

exports["default"] = Toggles;
module.exports = exports["default"];

},{"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components/iframe":7,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components/modal":10,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/builder":23,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/events":26,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/keycodes":27,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/naming_convention":29,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/pattern":32,"babel-runtime/core-js/get-iterator":42,"babel-runtime/core-js/object/define-properties":46,"babel-runtime/helpers/interop-require-default":54}],18:[function(require,module,exports){
"use strict";

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesTemplate = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/template");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesTemplate2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesTemplate);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesPattern = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/pattern");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesPattern2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesPattern);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesEvents = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/events");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesEvents2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesEvents);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsExploded = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components/exploded");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsExploded2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsExploded);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsIframe = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components/iframe");

var classes = {
  root: "x-ray",
  details: "x-ray__details",
  list: "x-ray__list"
};

var states = {
  root: { active: "x-ray--is-active" }
};

var helpers = {
  active: "x-ray__helpers--x-ray-is-active"
};

var attrs = {
  dismiss: "data-xray-dismiss",
  present: "data-xray-present",
  template: "data-xray-template"
};

var template_names = {
  details: "details",
  list: "list"
};

var Xray, structure, exploded, templates, component, hook_up_iframe_communication, communicator, toggle, present, dismiss, set_component, set_details;

hook_up_iframe_communication = function () {
  var registered;

  communicator = (0, _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsIframe.Communicator)();
  registered = communicator.register.from_node(structure.root);

  if (!registered) {
    return;
  }

  communicator.on(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesEvents2["default"].types.markup_request, function (event) {
    exploded.set_markup(event.markup);
  });
};

set_component = function (component_name) {
  component = _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesPattern2["default"].find(component_name, { search_all: true });
  structure.heading.innerHTML = component.title ? component.title : "<code class='type--code'>" + component_name + "</code>";
  structure.list.innerHTML = _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesTemplate2["default"].render(templates.list, {
    components: [component_name].concat(component.subcomponent || [])
  });
  set_details(component);
};

set_details = function (symbol) {
  var other_content = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var options = _Object$assign(other_content, symbol);
  structure.details.innerHTML = _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesTemplate2["default"].render(templates.details, options);
};

present = function () {
  communicator.trigger(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesEvents2["default"].types.markup_request);
  structure.root.classList.add(states.root.active);
  document.body.classList.add(helpers.active);
};

dismiss = function () {
  exploded.set_markup();
  structure.root.classList.remove(states.root.active);
  document.body.classList.remove(helpers.active);
};

toggle = function () {
  return structure.root.classList.contains(states.root.active) ? dismiss() : present();
};

Xray = {
  toggle: toggle,
  present: present,
  dismiss: dismiss,

  init: function init() {
    var root = document.querySelector("." + classes.root);
    if (!root) {
      return;
    }

    exploded = _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsExploded2["default"].within(root)[0];

    structure = {
      root: root,
      heading: root.querySelector(".type-heading"),
      details: root.querySelector("." + classes.details),
      list: root.querySelector("." + classes.list)
    };

    templates = {
      details: root.querySelector("[" + attrs.template + "='" + template_names.details + "']"),
      list: root.querySelector("[" + attrs.template + "='" + template_names.list + "']")
    };

    hook_up_iframe_communication();

    exploded.on(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceComponentsExploded.events.pane_selected, function (event) {
      component = _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesPattern2["default"].find(event.component, { search_all: true });
      if (component) {
        set_details(component, { tagname: event.node.tagName });
      }
    });

    $(root).on("click", "[" + attrs.dismiss + "]", dismiss).on("click", "[href^='#']", function (event) {
      event.preventDefault();
      exploded.select_component(event.target.textContent);
    });

    $(document).on("click", "[" + attrs.present + "]", function (event) {
      set_component(event.getAttribute(attrs.present));
    });
  }
};

exports["default"] = Xray;
module.exports = exports["default"];

},{"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components/exploded":5,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components/iframe":7,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/events":26,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/pattern":32,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/template":34,"babel-runtime/core-js/object/assign":44,"babel-runtime/helpers/interop-require-default":54}],19:[function(require,module,exports){
"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
var App,
    component,
    components = [];

App = {
  register: function register(a_component) {
    components.push(a_component);
  },

  init: function init() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(components), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        component = _step.value;

        if (component.init) {
          component.init();
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
  }
};

exports["default"] = App;
module.exports = exports["default"];

},{"babel-runtime/core-js/get-iterator":42}],20:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceFoundationApp = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/foundation/app");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceFoundationApp2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceFoundationApp);

require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/vendor");

require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components");

require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/structures");

require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/behaviors");

_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceFoundationApp2["default"].init();

},{"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/behaviors":1,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/components":8,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/foundation/app":19,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/structures":21,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/vendor":39,"babel-runtime/helpers/interop-require-default":54}],21:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _sidebar = require("./sidebar");

var _sidebar2 = _interopRequireDefault(_sidebar);

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceFoundationApp = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/foundation/app");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceFoundationApp2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceFoundationApp);

[_sidebar2["default"]].forEach(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceFoundationApp2["default"].register);

},{"./sidebar":22,"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/foundation/app":19,"babel-runtime/helpers/interop-require-default":54}],22:[function(require,module,exports){
"use strict";

var _Object$defineProperties = require("babel-runtime/core-js/object/define-properties")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
var classes = {
  base: "sidebar",
  toggler: "sidebar__toggler"
};

var states = {
  base: { active: classes.base + "--is-active" }
};

var Sidebar, root, show, hide, toggle, check_for_sidebar_state_change;

//*
// Reveals the sidebar.

show = function () {
  root.classList.add(states.base.active);
  setTimeout(function () {
    document.addEventListener("click", check_for_sidebar_state_change);
  }, 0);
};

//*
// Hides the sidebar.

hide = function () {
  document.removeEventListener("click", check_for_sidebar_state_change);
  root.classList.remove(states.base.active);
};

//*
// Toggles the visibility of the sidebar.

toggle = function () {
  return Sidebar.is_active ? hide() : show();
};

//*
// Captures all clicks when the sidebar is active and checks whether or not the
// sidebar should change its visibility. If the sidebar is clicked on, it should
// remain open — otherwise, it should close.
//
// @param {Object} event - The `click` event on the `document`.
// @private

check_for_sidebar_state_change = function (event) {
  if (!$(event.target).closest("." + classes.base).length) {
    hide();
  }
};

//*
// The global sidebar object. Use this method for manually updating the state of
// the sidebar; however, note that click events on the toggler and when the
// sidebar is open are handled automatically by the component itself.

Sidebar = _Object$defineProperties({
  show: show,
  hide: hide,
  toggle: toggle,

  init: function init() {
    root = document.querySelector("." + classes.base);
    if (!root) {
      return;
    }

    document.querySelector("." + classes.toggler).addEventListener("click", toggle);
  }
}, {
  is_active: {
    get: function get() {
      return root.classList.contains(states.base.active);
    },
    configurable: true,
    enumerable: true
  }
});

exports["default"] = Sidebar;
module.exports = exports["default"];

},{"babel-runtime/core-js/object/define-properties":46}],23:[function(require,module,exports){
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesDom_cache = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/dom_cache");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesDom_cache2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesDom_cache);

//*
// @pattern Builder
// @group Helper
//
// A utility for building all instances of factories. This manages the finding
// and initialization of instances of a factory, cacheing, adding cache
// retrieval methods, and more.

var Builder, add_retrieval_methods;

//*
// Adds static methods to `Factory` that allow it to retrieve cached instances
// from nodes.
//
// @private
//
// @param {Function} Factory - The factory function to add methods to.
//
// @param {Object} [options = {}]
//
// @param {String} [options.name] - The name for this Factory. This will
// be used as the root class name if `options.selector` is not provided.
//
// @param {String} [options.selector] - The selector to use to find nodes
// to call the factory on.

add_retrieval_methods = function (Factory) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (!Factory["for"]) {
    Factory["for"] = function (node) {
      return (0, _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesDom_cache2["default"])($(node).closest(options.selector)[0]).get(options.name);
    };
  }

  if (!Factory.within) {
    Factory.within = function (node) {
      var results = [],
          api,
          nodes = _Array$from(node.querySelectorAll(options.selector));

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(nodes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          node = _step.value;

          api = Factory["for"](node);
          if (api) {
            results.push(api);
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

      return results;
    };
  }
};

//*
// @object

Builder = {

  //*
  // Creates all required instances of the passed factory.
  //
  // @method
  //
  // @param {Function} Factory - The factory function to use.
  //
  // @param {Object} [options = {}]
  //
  // @param {String} [options.name] - The name for this Factory. This will
  // be used to set up cacheing if required, and will be used as the root
  // class name if `options.selector` is not provided.
  //
  // @param {String} [options.selector] - The selector to use to find nodes
  // to call the factory on.
  //
  // @param {Boolean} [options.cache = false] - Whether or not to cache the
  // return result of the factory on the node.
  //
  // @param {Function} [options.filter] - A function that determines whether
  // or not a given node should be used as a root for the `factory`. This
  // function is passed a single argument, `node`, which is the node to test.

  build: function build(Factory) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var node, nodes, api;

    nodes = options.selector ? document.querySelectorAll(options.selector) : document.getElementsByClassName(options.name);

    options.selector = options.selector || "." + options.name;

    if (options.cache) {
      add_retrieval_methods(Factory, options);
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(_Array$from(nodes)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        node = _step2.value;

        if (options.filter && !options.filter(node)) {
          continue;
        }

        api = Factory(node);
        if (options.cache) {
          (0, _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceUtilitiesDom_cache2["default"])(node).set(options.name, api);
        }
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
  // Builds the passed factory and caches the result. This is equivalent to:
  //
  // ```
  // Builder.build(Factory, { cache: true });
  // ```
  //
  // See [`Builder.build`](@link) for more details on `options` argument.
  //
  // @param {Function} Factory - The factory function to use.
  // @param {Object} [options = {}]
  //
  // @method

  build_and_cache: function build_and_cache(Factory) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    options.cache = true;
    return this.build(Factory, options);
  },

  //*
  // Builds the passed factory but, before doing so, ensures that each node
  // has not been used as an argument for this factory.
  //
  // See [`Builder.build`](@link) for more details on `options` argument.
  //
  // @param {Function} Factory - The factory function to use.
  // @param {Object} [options = {}]
  //
  // @method

  initialize_once: function initialize_once(Factory) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return function () {
      options.filter = function (node) {
        return !Factory["for"](node);
      };
      Builder.build_and_cache(Factory, options);
    };
  }
};

exports["default"] = Builder;
module.exports = exports["default"];

},{"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/utilities/dom_cache":25,"babel-runtime/core-js/array/from":41,"babel-runtime/core-js/get-iterator":42,"babel-runtime/helpers/interop-require-default":54}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Client;

Client = {
  name_for: function name_for(property) {
    return property;
  }
};

exports["default"] = Client;
module.exports = exports["default"];

},{}],25:[function(require,module,exports){
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
var Cache;

Cache = function (node) {
  var $node = $(node);

  return {
    get: function get(key) {
      return $node.data(key);
    },
    set: function set(key, value) {
      return $node.data(key, value);
    }
  };
};

exports["default"] = Cache;
module.exports = exports["default"];

},{}],26:[function(require,module,exports){
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
    var event;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _len = arguments.length, events = Array(_len), _key = 0; _key < _len; _key++) {
        events[_key] = arguments[_key];
      }

      for (var _iterator = _getIterator(events), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        event = _step.value;

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

},{"babel-runtime/core-js/get-iterator":42}],27:[function(require,module,exports){
module.exports={
  "main": "package.json"
}

},{}],28:[function(require,module,exports){
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

var _vendorHighlight = require("../../vendor/highlight");

var _vendorHighlight2 = _interopRequireDefault(_vendorHighlight);

var start_tag_test = /^<[^\/]/;
var end_tag_test = /^<\//;
var contains_end_tag = /<\//;

//*
// The size of manually re-indented code.
//
// @private
// @type Number
// @value 2

var INDENTATION_SIZE = 2;

var decode_html_entities, indent, clean, highlight;

exports.decode_html_entities = decode_html_entities = function (string) {
  var element = document.createElement("div");
  element.innerHTML = string.trim();

  return element.childNodes.length === 0 ? "" : element.childNodes[0].nodeValue || element.innerHTML;
};

//*
// Indents HTML markup by finding opening and closing HTML tags.
//
// @param {String} code - The randomly-escaped HTML string.
// @returns {String} The indented string.

exports.indent = indent = function (markup) {
  var indent_count = -INDENTATION_SIZE,
      indented_markup = [],
      markup_lines = markup.split("\n"),
      markup_line,
      start_tag,
      end_tag;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(markup_lines), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      markup_line = _step.value;

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
};

exports.clean = clean = function (code) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var leading_spaces;

  if (!code) {
    return "";
  }

  code = decode_html_entities(code);
  code = code.trim();
  if (options.collapse_newlines) {
    code = code.replace(/\n^\s*\n/mg, "\n");
  }

  // Kills any leading spaces from each line
  leading_spaces = code.match(/^\s*/);
  if (leading_spaces) {
    code = code.replace(new RegExp("^\\s{" + leading_spaces[0].length + "}", "gm"), "");
  }

  return code;
};

exports.highlight = highlight = function (code) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return _vendorHighlight2["default"].highlight(options.language_code || "html", code).value;
};

exports.decode_html_entities = decode_html_entities;
exports.indent = indent;
exports.clean = clean;
exports.highlight = highlight;

},{"../../vendor/highlight":38,"babel-runtime/core-js/get-iterator":42,"babel-runtime/helpers/interop-require-default":54}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var naming_convention = {};

exports.naming_convention = naming_convention;

},{}],30:[function(require,module,exports){
"use strict";

var _bind = require("babel-runtime/helpers/bind")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Matrix, between;

exports.between = between = function (point, min, max) {
  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  var min_condition = options.include_min ? point >= min : point > min,
      max_condition = options.include_max ? point <= max : point < max;
  return min_condition && max_condition;
};

exports.Matrix = Matrix = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var MatrixClass = window.WebKitCSSMatrix || window.MSCSSMatrix || window.CSSMatrix;
  return new (_bind.apply(MatrixClass, [null].concat(args)))();
};

exports.Matrix = Matrix;
exports.between = between;

},{"babel-runtime/helpers/bind":52}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var force_repaint;

exports.force_repaint = force_repaint = function () {
  var node = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];

  return node.offsetHeight && node.offsetWidth;
};

exports.force_repaint = force_repaint;

},{}],32:[function(require,module,exports){
"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Pattern, pattern, result_types, find_variation;

pattern = window.pattern;
delete window.pattern;

result_types = ["style", "script"];

find_variation = function (component, symbol) {
  var variation;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator((component.state || []).concat(component.variant || [])), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      variation = _step.value;

      if (symbol.include(variation.name)) {
        return variation;
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
};

Pattern = {
  find: function find(symbol) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var result_type, result, variation, subcomponent;

    if (!pattern) {
      return false;
    }

    symbol = symbol.split(/\s+/);

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(result_types), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        result_type = _step2.value;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _getIterator(pattern[result_type]), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            result = _step3.value;

            if (symbol.include(result.name)) {
              return result;
            }

            if (options.search_variations || options.search_all) {
              variation = find_variation(result, symbol);
              if (variation) {
                return variation;
              }
            }

            if (options.search_subcomponents || options.search_all) {
              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                for (var _iterator4 = _getIterator(result.subcomponent || []), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  subcomponent = _step4.value;

                  if (symbol.include(subcomponent.name)) {
                    return subcomponent;
                  }

                  variation = find_variation(result, symbol);
                  if (variation) {
                    return variation;
                  }
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

    return false;
  },

  __pattern__: pattern
};

exports["default"] = Pattern;
module.exports = exports["default"];

},{"babel-runtime/core-js/get-iterator":42}],33:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceVendorQuery_string = require("/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/vendor/query_string");

var _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceVendorQuery_string2 = _interopRequireDefault(_UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceVendorQuery_string);

var QueryString, location, query;

location = function () {
  return window.location;
};
query = function () {
  return _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceVendorQuery_string2["default"].parse(location().search);
};

QueryString = {
  get: function get(key) {
    return query()[key];
  },

  set: function set(key, value) {
    var current_query = query(),
        new_url;

    current_query[key] = value;
    new_url = location.protocol + "//" + location.host + location.pathname + "?" + _UsersChrisDropboxPersonalChrisCodeWebDocksDocksAssetsSourceVendorQuery_string2["default"].stringify(query);
    window.history.replaceState({ path: new_url }, document.title, new_url);
    return current_query;
  }
};

exports["default"] = QueryString;
module.exports = exports["default"];

},{"/Users/chris/Dropbox (Personal)/Chris/Code/web/docks/docks/assets/source/vendor/query_string":40,"babel-runtime/helpers/interop-require-default":54}],34:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mustache = require("mustache");

var _mustache2 = _interopRequireDefault(_mustache);

var Template = {
  render: function render(template, binding) {
    if (template.innerHTML) {
      template = template.innerHTML;
    }
    _mustache2["default"].render(template, binding);
  }
};

exports["default"] = Template;
module.exports = exports["default"];

},{"babel-runtime/helpers/interop-require-default":54,"mustache":131}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TextRange, _select_all;

TextRange = function (target) {
  return {
    select_all: function select_all() {
      _select_all(target);
    }
  };
};

exports["default"] = TextRange;

_select_all = (function () {
  if (window.getSelection) {
    return function (target) {
      var selection, range;

      selection = window.getSelection();
      selection.removeAllRanges();

      range = document.createRange();
      range.selectNodeContents(target);
      selection.addRange(range);
    };
  } else {
    return function (target) {
      var range = document.body.createTextRange();
      range.moveToElementText(target);
      range.select();
    };
  }
})();
module.exports = exports["default"];

},{}],36:[function(require,module,exports){
// TODO

"use strict";

var _Object$defineProperties = require("babel-runtime/core-js/object/define-properties")["default"];

var _Promise = require("babel-runtime/core-js/promise")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DRAG_THRESHOLD = 5;

var UIEvents, coordinates;

coordinates = function (event) {
  var touches = event.touches;

  return {
    x: touches ? touches[0].x : event.pageX,
    y: touches ? touches[0].y : event.pageY
  };
};

coordinates.distance_between = function (before, after) {
  var delta_x = Math.abs(after.x - before.x),
      delta_y = Math.abs(after.y - before.y);

  return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
};

UIEvents = _Object$defineProperties({

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
  },

  add_drag_listeners: function add_drag_listeners(move_handler, end_handler) {
    var _drag = this.drag;
    var move = _drag.move;
    var end = _drag.end;

    document.addEventListener(move, move_handler);
    document.addEventListener(end, end_handler);

    return {
      remove: function remove() {
        document.removeEventListener(move, move_handler);
        document.removeEventListener(end, end_handler);
      }
    };
  },

  coordinates: coordinates,
  DRAG_THRESHOLD: DRAG_THRESHOLD
}, {
  transition_end: {
    get: function get() {
      var transitions, transition, element, event_name;

      transitions = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend",
        transition: "transitionend"
      };

      element = document.createElement("div");
      event_name = null;

      for (transition in transitions) {
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

},{"babel-runtime/core-js/object/define-properties":46,"babel-runtime/core-js/promise":49}],37:[function(require,module,exports){
'use strict';

if (![].includes) {
  Array.prototype.includes = function (searchElement /*, fromIndex*/) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {
        k = 0;
      }
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
        return true;
      }
      k++;
    }
    return false;
  };
}

},{}],38:[function(require,module,exports){
"use strict";

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var hljs;

!(function (e) {
    hljs = e({});
})(function (e) {
    function n(e) {
        return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
    }

    function t(e) {
        return e.nodeName.toLowerCase();
    }

    function r(e, n) {
        var t = e && e.exec(n);
        return t && 0 == t.index;
    }

    function a(e) {
        var n = (e.className + " " + (e.parentNode ? e.parentNode.className : "")).split(/\s+/);
        return (n = n.map(function (e) {
            return e.replace(/^lang(uage)?-/, "");
        }), n.filter(function (e) {
            return N(e) || /no(-?)highlight/.test(e);
        })[0]);
    }

    function o(e, n) {
        var t = {};
        for (var r in e) t[r] = e[r];
        if (n) for (var r in n) t[r] = n[r];
        return t;
    }

    function i(e) {
        var n = [];
        return ((function r(e, a) {
            for (var o = e.firstChild; o; o = o.nextSibling) 3 == o.nodeType ? a += o.nodeValue.length : 1 == o.nodeType && (n.push({
                event: "start",
                offset: a,
                node: o
            }), a = r(o, a), t(o).match(/br|hr|img|input/) || n.push({
                event: "stop",
                offset: a,
                node: o
            }));
            return a;
        })(e, 0), n);
    }

    function c(e, r, a) {
        function o() {
            return e.length && r.length ? e[0].offset != r[0].offset ? e[0].offset < r[0].offset ? e : r : "start" == r[0].event ? e : r : e.length ? e : r;
        }

        function i(e) {
            function r(e) {
                return " " + e.nodeName + '="' + n(e.value) + '"';
            }
            l += "<" + t(e) + Array.prototype.map.call(e.attributes, r).join("") + ">";
        }

        function c(e) {
            l += "</" + t(e) + ">";
        }

        function u(e) {
            ("start" == e.event ? i : c)(e.node);
        }
        for (var s = 0, l = "", f = []; e.length || r.length;) {
            var g = o();
            if ((l += n(a.substr(s, g[0].offset - s)), s = g[0].offset, g == e)) {
                f.reverse().forEach(c);
                do u(g.splice(0, 1)[0]), g = o(); while (g == e && g.length && g[0].offset == s);
                f.reverse().forEach(i);
            } else "start" == g[0].event ? f.push(g[0].node) : f.pop(), u(g.splice(0, 1)[0]);
        }
        return l + n(a.substr(s));
    }

    function u(e) {
        function n(e) {
            return e && e.source || e;
        }

        function t(t, r) {
            return RegExp(n(t), "m" + (e.cI ? "i" : "") + (r ? "g" : ""));
        }

        function r(a, i) {
            if (!a.compiled) {
                if ((a.compiled = !0, a.k = a.k || a.bK, a.k)) {
                    var c = {},
                        u = function u(n, t) {
                        e.cI && (t = t.toLowerCase()), t.split(" ").forEach(function (e) {
                            var t = e.split("|");
                            c[t[0]] = [n, t[1] ? Number(t[1]) : 1];
                        });
                    };
                    "string" == typeof a.k ? u("keyword", a.k) : _Object$keys(a.k).forEach(function (e) {
                        u(e, a.k[e]);
                    }), a.k = c;
                }
                a.lR = t(a.l || /\b[A-Za-z0-9_]+\b/, !0), i && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), a.bR = t(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = t(a.e)), a.tE = n(a.e) || "", a.eW && i.tE && (a.tE += (a.e ? "|" : "") + i.tE)), a.i && (a.iR = t(a.i)), void 0 === a.r && (a.r = 1), a.c || (a.c = []);
                var s = [];
                a.c.forEach(function (e) {
                    e.v ? e.v.forEach(function (n) {
                        s.push(o(e, n));
                    }) : s.push("self" == e ? a : e);
                }), a.c = s, a.c.forEach(function (e) {
                    r(e, a);
                }), a.starts && r(a.starts, i);
                var l = a.c.map(function (e) {
                    return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b;
                }).concat([a.tE, a.i]).map(n).filter(Boolean);
                a.t = l.length ? t(l.join("|"), !0) : {
                    exec: function exec() {
                        return null;
                    }
                };
            }
        }
        r(e);
    }

    function s(e, t, a, o) {
        function i(e, n) {
            for (var t = 0; t < n.c.length; t++) if (r(n.c[t].bR, e)) return n.c[t];
        }

        function c(_x, _x2) {
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
        }

        function f(e, n) {
            return !a && r(n.iR, e);
        }

        function g(e, n) {
            var t = x.cI ? n[0].toLowerCase() : n[0];
            return e.k.hasOwnProperty(t) && e.k[t];
        }

        function p(e, n, t, r) {
            var a = r ? "" : E.classPrefix,
                o = '<span class="' + a,
                i = t ? "" : "</span>";
            return (o += e + '">', o + n + i);
        }

        function d() {
            if (!w.k) return n(y);
            var e = "",
                t = 0;
            w.lR.lastIndex = 0;
            for (var r = w.lR.exec(y); r;) {
                e += n(y.substr(t, r.index - t));
                var a = g(w, r);
                a ? (B += a[1], e += p(a[0], n(r[0]))) : e += n(r[0]), t = w.lR.lastIndex, r = w.lR.exec(y);
            }
            return e + n(y.substr(t));
        }

        function h() {
            if (w.sL && !R[w.sL]) return n(y);
            var e = w.sL ? s(w.sL, y, !0, L[w.sL]) : l(y);
            return (w.r > 0 && (B += e.r), "continuous" == w.subLanguageMode && (L[w.sL] = e.top), p(e.language, e.value, !1, !0));
        }

        function v() {
            return void 0 !== w.sL ? h() : d();
        }

        function b(e, t) {
            var r = e.cN ? p(e.cN, "", !0) : "";
            e.rB ? (M += r, y = "") : e.eB ? (M += n(t) + r, y = "") : (M += r, y = t), w = _Object$create(e, {
                parent: {
                    value: w
                }
            });
        }

        function m(e, t) {
            if ((y += e, void 0 === t)) return (M += v(), 0);
            var r = i(t, w);
            if (r) return (M += v(), b(r, t), r.rB ? 0 : t.length);
            var a = c(w, t);
            if (a) {
                var o = w;
                o.rE || o.eE || (y += t), M += v();
                do w.cN && (M += "</span>"), B += w.r, w = w.parent; while (w != a.parent);
                return (o.eE && (M += n(t)), y = "", a.starts && b(a.starts, ""), o.rE ? 0 : t.length);
            }
            if (f(t, w)) throw new Error('Illegal lexeme "' + t + '" for mode "' + (w.cN || "<unnamed>") + '"');
            return (y += t, t.length || 1);
        }
        var x = N(e);
        if (!x) throw new Error('Unknown language: "' + e + '"');
        u(x);
        for (var w = o || x, L = {}, M = "", k = w; k != x; k = k.parent) k.cN && (M = p(k.cN, "", !0) + M);
        var y = "",
            B = 0;
        try {
            for (var C, j, I = 0;;) {
                if ((w.t.lastIndex = I, C = w.t.exec(t), !C)) break;
                j = m(t.substr(I, C.index - I), C[0]), I = C.index + j;
            }
            m(t.substr(I));
            for (var k = w; k.parent; k = k.parent) k.cN && (M += "</span>");
            return {
                r: B,
                value: M,
                language: e,
                top: w
            };
        } catch (A) {
            if (-1 != A.message.indexOf("Illegal")) return {
                r: 0,
                value: n(t)
            };
            throw A;
        }
    }

    function l(e, t) {
        t = t || E.languages || _Object$keys(R);
        var r = {
            r: 0,
            value: n(e)
        },
            a = r;
        return (t.forEach(function (n) {
            if (N(n)) {
                var t = s(n, e, !1);
                t.language = n, t.r > a.r && (a = t), t.r > r.r && (a = r, r = t);
            }
        }), a.language && (r.second_best = a), r);
    }

    function f(e) {
        return (E.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function (e, n) {
            return n.replace(/\t/g, E.tabReplace);
        })), E.useBR && (e = e.replace(/\n/g, "<br>")), e);
    }

    function g(e, n, t) {
        var r = n ? x[n] : t,
            a = [e.trim()];
        return (e.match(/(\s|^)hljs(\s|$)/) || a.push("hljs"), r && a.push(r), a.join(" ").trim());
    }

    function p(e) {
        var n = a(e);
        if (!/no(-?)highlight/.test(n)) {
            var t;
            E.useBR ? (t = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), t.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : t = e;
            var r = t.textContent,
                o = n ? s(n, r, !0) : l(r),
                u = i(t);
            if (u.length) {
                var p = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                p.innerHTML = o.value, o.value = c(u, i(p), r);
            }
            o.value = f(o.value), e.innerHTML = o.value, e.className = g(e.className, n, o.language), e.result = {
                language: o.language,
                re: o.r
            }, o.second_best && (e.second_best = {
                language: o.second_best.language,
                re: o.second_best.r
            });
        }
    }

    function d(e) {
        E = o(E, e);
    }

    function h() {
        if (!h.called) {
            h.called = !0;
            var e = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(e, p);
        }
    }

    function v() {
        addEventListener("DOMContentLoaded", h, !1), addEventListener("load", h, !1);
    }

    function b(n, t) {
        var r = R[n] = t(e);
        r.aliases && r.aliases.forEach(function (e) {
            x[e] = n;
        });
    }

    function m() {
        return _Object$keys(R);
    }

    function N(e) {
        return R[e] || R[x[e]];
    }
    var E = {
        classPrefix: "hljs-",
        tabReplace: null,
        useBR: !1,
        languages: void 0
    },
        R = {},
        x = {};
    return (e.highlight = s, e.highlightAuto = l, e.fixMarkup = f, e.highlightBlock = p, e.configure = d, e.initHighlighting = h, e.initHighlightingOnLoad = v, e.registerLanguage = b, e.listLanguages = m, e.getLanguage = N, e.inherit = o, e.IR = "[a-zA-Z][a-zA-Z0-9_]*", e.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, e.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [e.BE]
    }, e.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [e.BE]
    }, e.PWM = {
        b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/
    }, e.CLCM = {
        cN: "comment",
        b: "//",
        e: "$",
        c: [e.PWM]
    }, e.CBCM = {
        cN: "comment",
        b: "/\\*",
        e: "\\*/",
        c: [e.PWM]
    }, e.HCM = {
        cN: "comment",
        b: "#",
        e: "$",
        c: [e.PWM]
    }, e.NM = {
        cN: "number",
        b: e.NR,
        r: 0
    }, e.CNM = {
        cN: "number",
        b: e.CNR,
        r: 0
    }, e.BNM = {
        cN: "number",
        b: e.BNR,
        r: 0
    }, e.CSSNM = {
        cN: "number",
        b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        r: 0
    }, e.RM = {
        cN: "regexp",
        b: /\//,
        e: /\/[gimuy]*/,
        i: /\n/,
        c: [e.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [e.BE]
        }]
    }, e.TM = {
        cN: "title",
        b: e.IR,
        r: 0
    }, e.UTM = {
        cN: "title",
        b: e.UIR,
        r: 0
    }, e);
});

hljs.registerLanguage("coffeescript", function (e) {
    var c = {
        keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
        literal: "true false null undefined yes no on off",
        reserved: "case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",
        built_in: "npm require console print module global window document"
    },
        n = "[A-Za-z$_][0-9A-Za-z$_]*",
        t = {
        cN: "subst",
        b: /#\{/,
        e: /}/,
        k: c
    },
        r = [e.BNM, e.inherit(e.CNM, {
        starts: {
            e: "(\\s*/)?",
            r: 0
        }
    }), {
        cN: "string",
        v: [{
            b: /'''/,
            e: /'''/,
            c: [e.BE]
        }, {
            b: /'/,
            e: /'/,
            c: [e.BE]
        }, {
            b: /"""/,
            e: /"""/,
            c: [e.BE, t]
        }, {
            b: /"/,
            e: /"/,
            c: [e.BE, t]
        }]
    }, {
        cN: "regexp",
        v: [{
            b: "///",
            e: "///",
            c: [t, e.HCM]
        }, {
            b: "//[gim]*",
            r: 0
        }, {
            b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
        }]
    }, {
        cN: "property",
        b: "@" + n
    }, {
        b: "`",
        e: "`",
        eB: !0,
        eE: !0,
        sL: "javascript"
    }];
    t.c = r;
    var i = e.inherit(e.TM, {
        b: n
    }),
        s = "(\\(.*\\))?\\s*\\B[-=]>",
        o = {
        cN: "params",
        b: "\\([^\\(]",
        rB: !0,
        c: [{
            b: /\(/,
            e: /\)/,
            k: c,
            c: ["self"].concat(r)
        }]
    };
    return {
        aliases: ["coffee", "cson", "iced"],
        k: c,
        i: /\/\*/,
        c: r.concat([{
            cN: "comment",
            b: "###",
            e: "###",
            c: [e.PWM]
        }, e.HCM, {
            cN: "function",
            b: "^\\s*" + n + "\\s*=\\s*" + s,
            e: "[-=]>",
            rB: !0,
            c: [i, o]
        }, {
            b: /[:\(,=]\s*/,
            r: 0,
            c: [{
                cN: "function",
                b: s,
                e: "[-=]>",
                rB: !0,
                c: [o]
            }]
        }, {
            cN: "class",
            bK: "class",
            e: "$",
            i: /[:="\[\]]/,
            c: [{
                bK: "extends",
                eW: !0,
                i: /[:="\[\]]/,
                c: [i]
            }, i]
        }, {
            cN: "attribute",
            b: n + ":",
            e: ":",
            rB: !0,
            rE: !0,
            r: 0
        }])
    };
});
hljs.registerLanguage("xml", function () {
    var t = "[A-Za-z0-9\\._:-]+",
        e = {
        b: /<\?(php)?(?!\w)/,
        e: /\?>/,
        sL: "php",
        subLanguageMode: "continuous"
    },
        c = {
        eW: !0,
        i: /</,
        r: 0,
        c: [e, {
            cN: "attribute",
            b: t,
            r: 0
        }, {
            b: "=",
            r: 0,
            c: [{
                cN: "value",
                c: [e],
                v: [{
                    b: /"/,
                    e: /"/
                }, {
                    b: /'/,
                    e: /'/
                }, {
                    b: /[^\s\/>]+/
                }]
            }]
        }]
    };
    return {
        aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
        cI: !0,
        c: [{
            cN: "doctype",
            b: "<!DOCTYPE",
            e: ">",
            r: 10,
            c: [{
                b: "\\[",
                e: "\\]"
            }]
        }, {
            cN: "comment",
            b: "<!--",
            e: "-->",
            r: 10
        }, {
            cN: "cdata",
            b: "<\\!\\[CDATA\\[",
            e: "\\]\\]>",
            r: 10
        }, {
            cN: "tag",
            b: "<style(?=\\s|>|$)",
            e: ">",
            k: {
                title: "style"
            },
            c: [c],
            starts: {
                e: "</style>",
                rE: !0,
                sL: "css"
            }
        }, {
            cN: "tag",
            b: "<script(?=\\s|>|$)",
            e: ">",
            k: {
                title: "script"
            },
            c: [c],
            starts: {
                e: "</script>",
                rE: !0,
                sL: "javascript"
            }
        }, e, {
            cN: "pi",
            b: /<\?\w+/,
            e: /\?>/,
            r: 10
        }, {
            cN: "tag",
            b: "</?",
            e: "/?>",
            c: [{
                cN: "title",
                b: /[^ \/><\n\t]+/,
                r: 0
            }, c]
        }]
    };
});
hljs.registerLanguage("haml", function () {
    return {
        cI: !0,
        c: [{
            cN: "doctype",
            b: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
            r: 10
        }, {
            cN: "comment",
            b: "^\\s*(!=#|=#|-#|/).*$",
            r: 0
        }, {
            b: "^\\s*(-|=|!=)(?!#)",
            starts: {
                e: "\\n",
                sL: "ruby"
            }
        }, {
            cN: "tag",
            b: "^\\s*%",
            c: [{
                cN: "title",
                b: "\\w+"
            }, {
                cN: "value",
                b: "[#\\.]\\w+"
            }, {
                b: "{\\s*",
                e: "\\s*}",
                eE: !0,
                c: [{
                    b: ":\\w+\\s*=>",
                    e: ",\\s+",
                    rB: !0,
                    eW: !0,
                    c: [{
                        cN: "symbol",
                        b: ":\\w+"
                    }, {
                        cN: "string",
                        b: '"',
                        e: '"'
                    }, {
                        cN: "string",
                        b: "'",
                        e: "'"
                    }, {
                        b: "\\w+",
                        r: 0
                    }]
                }]
            }, {
                b: "\\(\\s*",
                e: "\\s*\\)",
                eE: !0,
                c: [{
                    b: "\\w+\\s*=",
                    e: "\\s+",
                    rB: !0,
                    eW: !0,
                    c: [{
                        cN: "attribute",
                        b: "\\w+",
                        r: 0
                    }, {
                        cN: "string",
                        b: '"',
                        e: '"'
                    }, {
                        cN: "string",
                        b: "'",
                        e: "'"
                    }, {
                        b: "\\w+",
                        r: 0
                    }]
                }]
            }]
        }, {
            cN: "bullet",
            b: "^\\s*[=~]\\s*",
            r: 0
        }, {
            b: "#{",
            starts: {
                e: "}",
                sL: "ruby"
            }
        }]
    };
});
hljs.registerLanguage("ruby", function (e) {
    var b = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
        r = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
        c = {
        cN: "yardoctag",
        b: "@[A-Za-z]+"
    },
        a = {
        cN: "value",
        b: "#<",
        e: ">"
    },
        s = {
        cN: "comment",
        v: [{
            b: "#",
            e: "$",
            c: [c]
        }, {
            b: "^\\=begin",
            e: "^\\=end",
            c: [c],
            r: 10
        }, {
            b: "^__END__",
            e: "\\n$"
        }]
    },
        n = {
        cN: "subst",
        b: "#\\{",
        e: "}",
        k: r
    },
        t = {
        cN: "string",
        c: [e.BE, n],
        v: [{
            b: /'/,
            e: /'/
        }, {
            b: /"/,
            e: /"/
        }, {
            b: /`/,
            e: /`/
        }, {
            b: "%[qQwWx]?\\(",
            e: "\\)"
        }, {
            b: "%[qQwWx]?\\[",
            e: "\\]"
        }, {
            b: "%[qQwWx]?{",
            e: "}"
        }, {
            b: "%[qQwWx]?<",
            e: ">"
        }, {
            b: "%[qQwWx]?/",
            e: "/"
        }, {
            b: "%[qQwWx]?%",
            e: "%"
        }, {
            b: "%[qQwWx]?-",
            e: "-"
        }, {
            b: "%[qQwWx]?\\|",
            e: "\\|"
        }, {
            b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
        }]
    },
        i = {
        cN: "params",
        b: "\\(",
        e: "\\)",
        k: r
    },
        d = [t, a, s, {
        cN: "class",
        bK: "class module",
        e: "$|;",
        i: /=/,
        c: [e.inherit(e.TM, {
            b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
        }), {
            cN: "inheritance",
            b: "<\\s*",
            c: [{
                cN: "parent",
                b: "(" + e.IR + "::)?" + e.IR
            }]
        }, s]
    }, {
        cN: "function",
        bK: "def",
        e: " |$|;",
        r: 0,
        c: [e.inherit(e.TM, {
            b: b
        }), i, s]
    }, {
        cN: "constant",
        b: "(::)?(\\b[A-Z]\\w*(::)?)+",
        r: 0
    }, {
        cN: "symbol",
        b: e.UIR + "(\\!|\\?)?:",
        r: 0
    }, {
        cN: "symbol",
        b: ":",
        c: [t, {
            b: b
        }],
        r: 0
    }, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }, {
        cN: "variable",
        b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
    }, {
        b: "(" + e.RSR + ")\\s*",
        c: [a, s, {
            cN: "regexp",
            c: [e.BE, n],
            i: /\n/,
            v: [{
                b: "/",
                e: "/[a-z]*"
            }, {
                b: "%r{",
                e: "}[a-z]*"
            }, {
                b: "%r\\(",
                e: "\\)[a-z]*"
            }, {
                b: "%r!",
                e: "![a-z]*"
            }, {
                b: "%r\\[",
                e: "\\][a-z]*"
            }]
        }],
        r: 0
    }];
    n.c = d, i.c = d;
    var l = "[>?]>",
        u = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
        N = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
        o = [{
        b: /^\s*=>/,
        cN: "status",
        starts: {
            e: "$",
            c: d
        }
    }, {
        cN: "prompt",
        b: "^(" + l + "|" + u + "|" + N + ")",
        starts: {
            e: "$",
            c: d
        }
    }];
    return {
        aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
        k: r,
        c: [s].concat(o).concat(d)
    };
});
hljs.registerLanguage("javascript", function (r) {
    return {
        aliases: ["js"],
        k: {
            keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
            literal: "true false null undefined NaN Infinity",
            built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document"
        },
        c: [{
            cN: "pi",
            r: 10,
            v: [{
                b: /^\s*('|")use strict('|")/
            }, {
                b: /^\s*('|")use asm('|")/
            }]
        }, r.ASM, r.QSM, r.CLCM, r.CBCM, r.CNM, {
            b: "(" + r.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [r.CLCM, r.CBCM, r.RM, {
                b: /</,
                e: />;/,
                r: 0,
                sL: "xml"
            }],
            r: 0
        }, {
            cN: "function",
            bK: "function",
            e: /\{/,
            eE: !0,
            c: [r.inherit(r.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/
            }), {
                cN: "params",
                b: /\(/,
                e: /\)/,
                c: [r.CLCM, r.CBCM],
                i: /["'\(]/
            }],
            i: /\[|%/
        }, {
            b: /\$[(.]/
        }, {
            b: "\\." + r.IR,
            r: 0
        }]
    };
});
hljs.registerLanguage("erb", function () {
    return {
        sL: "xml",
        subLanguageMode: "continuous",
        c: [{
            cN: "comment",
            b: "<%#",
            e: "%>"
        }, {
            b: "<%[%=-]?",
            e: "[%-]?%>",
            sL: "ruby",
            eB: !0,
            eE: !0
        }]
    };
});
hljs.registerLanguage("scss", function (e) {
    {
        var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
            i = {
            cN: "variable",
            b: "(\\$" + t + ")\\b"
        },
            r = {
            cN: "function",
            b: t + "\\(",
            rB: !0,
            eE: !0,
            e: "\\("
        },
            o = {
            cN: "hexcolor",
            b: "#[0-9A-Fa-f]+"
        };
        ({
            cN: "attribute",
            b: "[A-Z\\_\\.\\-]+",
            e: ":",
            eE: !0,
            i: "[^\\s]",
            starts: {
                cN: "value",
                eW: !0,
                eE: !0,
                c: [r, o, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
                    cN: "important",
                    b: "!important"
                }]
            }
        });
    }
    return {
        cI: !0,
        i: "[=/|']",
        c: [e.CLCM, e.CBCM, r, {
            cN: "id",
            b: "\\#[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "class",
            b: "\\.[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "attr_selector",
            b: "\\[",
            e: "\\]",
            i: "$"
        }, {
            cN: "tag",
            b: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
            r: 0
        }, {
            cN: "pseudo",
            b: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
        }, {
            cN: "pseudo",
            b: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
        }, i, {
            cN: "attribute",
            b: "\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
            i: "[^\\s]"
        }, {
            cN: "value",
            b: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
        }, {
            cN: "value",
            b: ":",
            e: ";",
            c: [r, i, o, e.CSSNM, e.QSM, e.ASM, {
                cN: "important",
                b: "!important"
            }]
        }, {
            cN: "at_rule",
            b: "@",
            e: "[{;]",
            k: "mixin include extend for if else each while charset import debug media page content font-face namespace warn",
            c: [r, i, e.QSM, e.ASM, o, e.CSSNM, {
                cN: "preprocessor",
                b: "\\s[A-Za-z0-9_.-]+",
                r: 0
            }]
        }]
    };
});
hljs.registerLanguage("css", function (e) {
    var c = "[a-zA-Z-][a-zA-Z0-9_-]*",
        a = {
        cN: "function",
        b: c + "\\(",
        rB: !0,
        eE: !0,
        e: "\\("
    };
    return {
        cI: !0,
        i: "[=/|']",
        c: [e.CBCM, {
            cN: "id",
            b: "\\#[A-Za-z0-9_-]+"
        }, {
            cN: "class",
            b: "\\.[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "attr_selector",
            b: "\\[",
            e: "\\]",
            i: "$"
        }, {
            cN: "pseudo",
            b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
        }, {
            cN: "at_rule",
            b: "@(font-face|page)",
            l: "[a-z-]+",
            k: "font-face page"
        }, {
            cN: "at_rule",
            b: "@",
            e: "[{;]",
            c: [{
                cN: "keyword",
                b: /\S+/
            }, {
                b: /\s/,
                eW: !0,
                eE: !0,
                r: 0,
                c: [a, e.ASM, e.QSM, e.CSSNM]
            }]
        }, {
            cN: "tag",
            b: c,
            r: 0
        }, {
            cN: "rules",
            b: "{",
            e: "}",
            i: "[^\\s]",
            r: 0,
            c: [e.CBCM, {
                cN: "rule",
                b: "[^\\s]",
                rB: !0,
                e: ";",
                eW: !0,
                c: [{
                    cN: "attribute",
                    b: "[A-Z\\_\\.\\-]+",
                    e: ":",
                    eE: !0,
                    i: "[^\\s]",
                    starts: {
                        cN: "value",
                        eW: !0,
                        eE: !0,
                        c: [a, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
                            cN: "hexcolor",
                            b: "#[0-9A-Fa-f]+"
                        }, {
                            cN: "important",
                            b: "!important"
                        }]
                    }
                }]
            }]
        }]
    };
});
hljs.registerLanguage("handlebars", function () {
    var e = "each in with if else unless bindattr action collection debugger log outlet template unbound view yield";
    return {
        aliases: ["hbs", "html.hbs", "html.handlebars"],
        cI: !0,
        sL: "xml",
        subLanguageMode: "continuous",
        c: [{
            cN: "expression",
            b: "{{",
            e: "}}",
            c: [{
                cN: "begin-block",
                b: "#[a-zA-Z- .]+",
                k: e
            }, {
                cN: "string",
                b: '"',
                e: '"'
            }, {
                cN: "end-block",
                b: "\\/[a-zA-Z- .]+",
                k: e
            }, {
                cN: "variable",
                b: "[a-zA-Z-.]+",
                k: e
            }]
        }]
    };
});
module.exports = hljs;

},{"babel-runtime/core-js/object/create":45,"babel-runtime/core-js/object/keys":48}],39:[function(require,module,exports){
"use strict";

require("./array_includes");

},{"./array_includes":37}],40:[function(require,module,exports){
/*!
  query-string
  Parse and stringify URL query strings
  https://github.com/sindresorhus/query-string
  by Sindre Sorhus
  MIT License
*/
'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

(function () {
  'use strict';
  var queryString = {};

  queryString.parse = function (str) {
    if (typeof str !== 'string') {
      return {};
    }

    str = str.trim().replace(/^(\?|#)/, '');

    if (!str) {
      return {};
    }

    return str.trim().split('&').reduce(function (ret, param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = parts[0];
      var val = parts[1];

      key = decodeURIComponent(key);
      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (!ret.hasOwnProperty(key)) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }

      return ret;
    }, {});
  };

  queryString.stringify = function (obj) {
    return obj ? _Object$keys(obj).map(function (key) {
      var val = obj[key];

      if (Array.isArray(val)) {
        return val.map(function (val2) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
        }).join('&');
      }

      return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
  };

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return queryString;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = queryString;
  } else {
    window.queryString = queryString;
  }
})();

},{"babel-runtime/core-js/object/keys":48}],41:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":56}],42:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":57}],43:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":58}],44:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":59}],45:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":60}],46:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-properties"), __esModule: true };
},{"core-js/library/fn/object/define-properties":61}],47:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":62}],48:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":63}],49:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":64}],50:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":65}],51:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":66}],52:[function(require,module,exports){
"use strict";

exports["default"] = Function.prototype.bind;
exports.__esModule = true;
},{}],53:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = function (obj, key, value) {
  if (key in obj) {
    _Object$defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":47}],54:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],55:[function(require,module,exports){
"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _isIterable = require("babel-runtime/core-js/is-iterable")["default"];

exports["default"] = (function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (_isIterable(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/get-iterator":42,"babel-runtime/core-js/is-iterable":43}],56:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/$.core').Array.from;
},{"../../modules/$.core":72,"../../modules/es6.array.from":119,"../../modules/es6.string.iterator":125}],57:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":117,"../modules/es6.string.iterator":125,"../modules/web.dom.iterable":127}],58:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');
},{"../modules/core.is-iterable":118,"../modules/es6.string.iterator":125,"../modules/web.dom.iterable":127}],59:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$.core').Object.assign;
},{"../../modules/$.core":72,"../../modules/es6.object.assign":121}],60:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function create(P, D){
  return $.create(P, D);
};
},{"../../modules/$":95}],61:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperties(T, D){
  return $.setDescs(T, D);
};
},{"../../modules/$":95}],62:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":95}],63:[function(require,module,exports){
require('../../modules/es6.object.statics-accept-primitives');
module.exports = require('../../modules/$.core').Object.keys;
},{"../../modules/$.core":72,"../../modules/es6.object.statics-accept-primitives":122}],64:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/$.core').Promise;
},{"../modules/$.core":72,"../modules/es6.object.to-string":123,"../modules/es6.promise":124,"../modules/es6.string.iterator":125,"../modules/web.dom.iterable":127}],65:[function(require,module,exports){
require('../../modules/es6.symbol');
module.exports = require('../../modules/$.core').Symbol;
},{"../../modules/$.core":72,"../../modules/es6.symbol":126}],66:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/$.wks')('iterator');
},{"../../modules/$.wks":115,"../../modules/es6.string.iterator":125,"../../modules/web.dom.iterable":127}],67:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],68:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":87}],69:[function(require,module,exports){
var toObject  = require('./$.to-object')
  , ES5Object = require('./$.es5-object')
  , enumKeys  = require('./$.enum-keys');
// 19.1.2.1 Object.assign(target, source, ...)
/* eslint-disable no-unused-vars */
module.exports = Object.assign || function assign(target, source){
/* eslint-enable no-unused-vars */
  var T = toObject(target, true)
    , l = arguments.length
    , i = 1;
  while(l > i){
    var S      = ES5Object(arguments[i++])
      , keys   = enumKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)T[key = keys[j++]] = S[key];
  }
  return T;
};
},{"./$.enum-keys":77,"./$.es5-object":78,"./$.to-object":112}],70:[function(require,module,exports){
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":71,"./$.wks":115}],71:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],72:[function(require,module,exports){
var core = module.exports = {};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],73:[function(require,module,exports){
// Optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
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
},{"./$.a-function":67}],74:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , PROTOTYPE = 'prototype';
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
        ? global[name] : (global[name] || {})[PROTOTYPE]
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    if(isGlobal && typeof target[key] != 'function')exp = source[key];
    // bind timers to global for call from export context
    else if(type & $def.B && own)exp = ctx(out, global);
    // wrap global constructors for prevent change them in library
    else if(type & $def.W && target[key] == out)!function(C){
      exp = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      exp[PROTOTYPE] = C[PROTOTYPE];
    }(out);
    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export
    exports[key] = exp;
    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
}
module.exports = $def;
},{"./$.core":72,"./$.global":81}],75:[function(require,module,exports){
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],76:[function(require,module,exports){
var isObject = require('./$.is-object')
  , document = require('./$.global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":81,"./$.is-object":87}],77:[function(require,module,exports){
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , isEnum     = $.isEnum
    , getSymbols = $.getSymbols;
  if(getSymbols)for(var symbols = getSymbols(it), i = 0, key; symbols.length > i; ){
    if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};
},{"./$":95}],78:[function(require,module,exports){
// fallback for not array-like ES3 strings
var cof     = require('./$.cof')
  , $Object = Object;
module.exports = 0 in $Object('z') ? $Object : function(it){
  return cof(it) == 'String' ? it.split('') : $Object(it);
};
},{"./$.cof":71}],79:[function(require,module,exports){
var ctx         = require('./$.ctx')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , anObject    = require('./$.an-object')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":68,"./$.ctx":73,"./$.is-array-iter":86,"./$.iter-call":89,"./$.to-length":111,"./core.get-iterator-method":116}],80:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toString = {}.toString
  , toObject = require('./$.to-object')
  , getNames = require('./$').getNames;

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
  return getNames(toObject(it));
};
},{"./$":95,"./$.to-object":112}],81:[function(require,module,exports){
var global = typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
module.exports = global;
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],82:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],83:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.support-desc') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":95,"./$.property-desc":99,"./$.support-desc":107}],84:[function(require,module,exports){
module.exports = require('./$.global').document && document.documentElement;
},{"./$.global":81}],85:[function(require,module,exports){
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
},{}],86:[function(require,module,exports){
var Iterators = require('./$.iterators')
  , ITERATOR  = require('./$.wks')('iterator');
module.exports = function(it){
  return ('Array' in Iterators ? Iterators.Array : Array.prototype[ITERATOR]) === it;
};
},{"./$.iterators":94,"./$.wks":115}],87:[function(require,module,exports){
// http://jsperf.com/core-js-isobject
module.exports = function(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
};
},{}],88:[function(require,module,exports){
// Safari has buggy iterators w/o `next`
module.exports = 'keys' in [] && !('next' in [].keys());
},{}],89:[function(require,module,exports){
var anObject = require('./$.an-object');
function close(iterator){
  var ret = iterator['return'];
  if(ret !== undefined)anObject(ret.call(iterator));
}
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch(e){
    close(iterator);
    throw e;
  }
};
},{"./$.an-object":68}],90:[function(require,module,exports){
'use strict';
var $ = require('./$')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: require('./$.property-desc')(1,next)});
  require('./$.tag')(Constructor, NAME + ' Iterator');
};
},{"./$":95,"./$.hide":83,"./$.property-desc":99,"./$.tag":108,"./$.wks":115}],91:[function(require,module,exports){
'use strict';
var LIBRARY         = require('./$.library')
  , $def            = require('./$.def')
  , $redef          = require('./$.redef')
  , hide            = require('./$.hide')
  , has             = require('./$.has')
  , SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , Iterators       = require('./$.iterators')
  , FF_ITERATOR     = '@@iterator'
  , KEYS            = 'keys'
  , VALUES          = 'values';
function returnThis(){ return this; }
module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
  require('./$.iter-create')(Constructor, NAME, next);
  function createMethod(kind){
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  }
  var TAG      = NAME + ' Iterator'
    , proto    = Base.prototype
    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , _default = _native || createMethod(DEFAULT)
    , methods, key;
  // Fix native
  if(_native){
    var IteratorPrototype = require('./$').getProto(_default.call(new Base));
    // Set @@toStringTag to native iterators
    require('./$.tag')(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
  }
  // Define iterator
  if(!LIBRARY || FORCE)hide(proto, SYMBOL_ITERATOR, _default);
  // Plug for library
  Iterators[NAME] = _default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      keys:    IS_SET            ? _default : createMethod(KEYS),
      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
      entries: DEFAULT != VALUES ? _default : createMethod('entries')
    };
    if(FORCE)for(key in methods){
      if(!(key in proto))$redef(proto, key, methods[key]);
    } else $def($def.P + $def.F * require('./$.iter-buggy'), NAME, methods);
  }
};
},{"./$":95,"./$.def":74,"./$.has":82,"./$.hide":83,"./$.iter-buggy":88,"./$.iter-create":90,"./$.iterators":94,"./$.library":97,"./$.redef":100,"./$.tag":108,"./$.wks":115}],92:[function(require,module,exports){
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
},{"./$.wks":115}],93:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],94:[function(require,module,exports){
module.exports = {};
},{}],95:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],96:[function(require,module,exports){
var $        = require('./$')
  , toObject = require('./$.to-object');
module.exports = function(object, el){
  var O      = toObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":95,"./$.to-object":112}],97:[function(require,module,exports){
module.exports = true;
},{}],98:[function(require,module,exports){
var $redef = require('./$.redef');
module.exports = function(target, src){
  for(var key in src)$redef(target, key, src[key]);
  return target;
};
},{"./$.redef":100}],99:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],100:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":83}],101:[function(require,module,exports){
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],102:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
function check(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
}
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
    ? function(buggy, set){
        try {
          set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
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
},{"./$":95,"./$.an-object":68,"./$.ctx":73,"./$.is-object":87}],103:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":81}],104:[function(require,module,exports){
var $       = require('./$')
  , SPECIES = require('./$.wks')('species');
module.exports = function(C){
  if(require('./$.support-desc') && !(SPECIES in C))$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":95,"./$.support-desc":107,"./$.wks":115}],105:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],106:[function(require,module,exports){
// true  -> String#at
// false -> String#codePointAt
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
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
},{"./$.defined":75,"./$.to-integer":110}],107:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !!function(){
  try {
    return Object.defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
  } catch(e){ /* empty */ }
}();
},{}],108:[function(require,module,exports){
var has  = require('./$.has')
  , hide = require('./$.hide')
  , TAG  = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
};
},{"./$.has":82,"./$.hide":83,"./$.wks":115}],109:[function(require,module,exports){
'use strict';
var ctx                = require('./$.ctx')
  , invoke             = require('./$.invoke')
  , html               = require('./$.html')
  , cel                = require('./$.dom-create')
  , global             = require('./$.global')
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
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
}
function listner(event){
  run.call(event.data);
}
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./$.cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Modern browsers, skip implementation for WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id, '*');
    };
    global.addEventListener('message', listner, false);
  // WebWorkers
  } else if(MessageChannel){
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
},{"./$.cof":71,"./$.ctx":73,"./$.dom-create":76,"./$.global":81,"./$.html":84,"./$.invoke":85}],110:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],111:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":110}],112:[function(require,module,exports){
var ES5Object = require('./$.es5-object')
  , defined   = require('./$.defined');
module.exports = function(it, realString){
  return (realString ? Object : ES5Object)(defined(it));
};
},{"./$.defined":75,"./$.es5-object":78}],113:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],114:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],115:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || require('./$.uid'))('Symbol.' + name));
};
},{"./$.global":81,"./$.shared":103,"./$.uid":113}],116:[function(require,module,exports){
var global    = require('./$.global')
  , classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  var Symbol = global.Symbol;
  if(it != undefined){
    return it[Symbol && Symbol.iterator || '@@iterator']
      || it[ITERATOR]
      || Iterators[classof(it)];
  }
};
},{"./$.classof":70,"./$.core":72,"./$.global":81,"./$.iterators":94,"./$.wks":115}],117:[function(require,module,exports){
var anObject = require('./$.an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./$.core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./$.an-object":68,"./$.core":72,"./core.get-iterator-method":116}],118:[function(require,module,exports){
var global    = require('./$.global')
  , has       = require('./$.has')
  , classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').isIterable = function(it){
  var O      = Object(it)
    , Symbol = global.Symbol;
  return (Symbol && Symbol.iterator || '@@iterator') in O
    || ITERATOR in O
    || has(Iterators, classof(O));
};
},{"./$.classof":70,"./$.core":72,"./$.global":81,"./$.has":82,"./$.iterators":94,"./$.wks":115}],119:[function(require,module,exports){
var ctx         = require('./$.ctx')
  , $def        = require('./$.def')
  , toObject    = require('./$.to-object')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
$def($def.S + $def.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike, true)
      , C       = typeof this == 'function' ? this : Array
      , mapfn   = arguments[1]
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, arguments[2], 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      for(result = new C(length = toLength(O.length)); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});
},{"./$.ctx":73,"./$.def":74,"./$.is-array-iter":86,"./$.iter-call":89,"./$.iter-detect":92,"./$.to-length":111,"./$.to-object":112,"./core.get-iterator-method":116}],120:[function(require,module,exports){
var setUnscope = require('./$.unscope')
  , step       = require('./$.iter-step')
  , Iterators  = require('./$.iterators')
  , toObject   = require('./$.to-object');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toObject(iterated); // target
  this._i = 0;                  // next index
  this._k = kind;               // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
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
},{"./$.iter-define":91,"./$.iter-step":93,"./$.iterators":94,"./$.to-object":112,"./$.unscope":114}],121:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $def = require('./$.def');
$def($def.S, 'Object', {assign: require('./$.assign')});
},{"./$.assign":69,"./$.def":74}],122:[function(require,module,exports){
var $        = require('./$')
  , core     = require('./$.core')
  , $def     = require('./$.def')
  , toObject = require('./$.to-object')
  , isObject = require('./$.is-object');
$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
, function(KEY, ID){
  var fn     = (core.Object || {})[KEY] || Object[KEY]
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
    return fn(toObject(it, true));
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
},{"./$":95,"./$.core":72,"./$.def":74,"./$.get-names":80,"./$.is-object":87,"./$.to-object":112}],123:[function(require,module,exports){

},{}],124:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , LIBRARY    = require('./$.library')
  , global     = require('./$.global')
  , ctx        = require('./$.ctx')
  , classof    = require('./$.classof')
  , $def       = require('./$.def')
  , isObject   = require('./$.is-object')
  , anObject   = require('./$.an-object')
  , aFunction  = require('./$.a-function')
  , strictNew  = require('./$.strict-new')
  , forOf      = require('./$.for-of')
  , setProto   = require('./$.set-proto').set
  , same       = require('./$.same')
  , species    = require('./$.species')
  , SPECIES    = require('./$.wks')('species')
  , RECORD     = require('./$.uid')('record')
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , asap       = process && process.nextTick || require('./$.task').set
  , P          = global[PROMISE]
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
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && require('./$.support-desc')){
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
  return isObject(it) && (useNative ? classof(it) == 'Promise' : RECORD in it);
}
function sameConstructor(a, b){
  // library wrapper special case
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
}
function getConstructor(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
}
function isThenable(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
}
function notify(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  // strange IE + webpack dev server bug - use .call(global)
  asap.call(global, function(){
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
    record.n = false;
    if(isReject)setTimeout(function(){
      // strange IE + webpack dev server bug - use .call(global)
      asap.call(global, function(){
        if(isUnhandled(record.p)){
          if(isNode){
            process.emit('unhandledRejection', value, record.p);
          } else if(global.console && console.error){
            console.error('Unhandled promise rejection', value);
          }
        }
        record.a = undefined;
      });
    }, 1);
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
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
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
      notify(record, false);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
}

// constructor polyfill
if(!useNative){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    aFunction(executor);
    var record = {
      p: strictNew(this, P, PROMISE),         // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false,                               // <- handled rejection
      n: false                                // <- notify
    };
    this[RECORD] = record;
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.mix')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var S = anObject(anObject(this).constructor)[SPECIES];
      var react = {
        ok:   typeof onFulfilled == 'function' ? onFulfilled : true,
        fail: typeof onRejected == 'function'  ? onRejected  : false
      };
      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
        react.res = aFunction(res);
        react.rej = aFunction(rej);
      });
      var record = this[RECORD];
      record.c.push(react);
      if(record.a)record.a.push(react);
      if(record.s)notify(record, false);
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
require('./$.tag')(P, PROMISE);
species(P);
species(Wrapper = require('./$.core')[PROMISE]);

// statics
$def($def.S + $def.F * !useNative, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    return new this(function(res, rej){ rej(r); });
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
},{"./$":95,"./$.a-function":67,"./$.an-object":68,"./$.classof":70,"./$.core":72,"./$.ctx":73,"./$.def":74,"./$.for-of":79,"./$.global":81,"./$.is-object":87,"./$.iter-detect":92,"./$.library":97,"./$.mix":98,"./$.same":101,"./$.set-proto":102,"./$.species":104,"./$.strict-new":105,"./$.support-desc":107,"./$.tag":108,"./$.task":109,"./$.uid":113,"./$.wks":115}],125:[function(require,module,exports){
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":91,"./$.string-at":106}],126:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $              = require('./$')
  , global         = require('./$.global')
  , has            = require('./$.has')
  , SUPPORT_DESC   = require('./$.support-desc')
  , $def           = require('./$.def')
  , $redef         = require('./$.redef')
  , shared         = require('./$.shared')
  , setTag         = require('./$.tag')
  , uid            = require('./$.uid')
  , wks            = require('./$.wks')
  , keyOf          = require('./$.keyof')
  , $names         = require('./$.get-names')
  , enumKeys       = require('./$.enum-keys')
  , anObject       = require('./$.an-object')
  , toObject       = require('./$.to-object')
  , createDesc     = require('./$.property-desc')
  , getDesc        = $.getDesc
  , setDesc        = $.setDesc
  , $create        = $.create
  , getNames       = $names.get
  , $Symbol        = global.Symbol
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = $.isEnum
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , useNative      = typeof $Symbol == 'function'
  , ObjectProto    = Object.prototype;

var setSymbolDesc = SUPPORT_DESC ? function(){ // fallback for old Android
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
  var sym = AllSymbols[tag] = $create($Symbol.prototype);
  sym._k = tag;
  SUPPORT_DESC && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
}

function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = $create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
}
function defineProperties(it, P){
  anObject(it);
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
  var E = isEnum.call(this, key);
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
    return this._k;
  });

  $.create     = create;
  $.isEnum     = propertyIsEnumerable;
  $.getDesc    = getOwnPropertyDescriptor;
  $.setDesc    = defineProperty;
  $.setDescs   = defineProperties;
  $.getNames   = $names.get = getOwnPropertyNames;
  $.getSymbols = getOwnPropertySymbols;

  if(SUPPORT_DESC && !require('./$.library')){
    $redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
  }
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
    var sym = wks(it);
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
setTag(global.JSON, 'JSON', true);
},{"./$":95,"./$.an-object":68,"./$.def":74,"./$.enum-keys":77,"./$.get-names":80,"./$.global":81,"./$.has":82,"./$.keyof":96,"./$.library":97,"./$.property-desc":99,"./$.redef":100,"./$.shared":103,"./$.support-desc":107,"./$.tag":108,"./$.to-object":112,"./$.uid":113,"./$.wks":115}],127:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":94,"./es6.array.iterator":120}],128:[function(require,module,exports){
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
},{"./runtime":129}],129:[function(require,module,exports){
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
},{"_process":130,"babel-runtime/core-js/object/create":45,"babel-runtime/core-js/promise":49,"babel-runtime/core-js/symbol":50,"babel-runtime/core-js/symbol/iterator":51}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false Mustache: true*/

(function defineMustache (global, factory) {
  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
    factory(exports); // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory); // AMD
  } else {
    global.Mustache = {};
    factory(Mustache); // script, wsh, asp
  }
}(this, function mustacheFactory (mustache) {

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction (object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;
  function testRegExp (re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };

  function escapeHtml (string) {
    return String(string).replace(/[&<>"'\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate (template, tags) {
    if (!template)
      return [];

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace () {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags (tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n')
            stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens (tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens (tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos () {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
    case -1:
      match = this.tail;
      this.tail = '';
      break;
    case 0:
      match = '';
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context (view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup (name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           **/
          while (value != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = hasProperty(value, names[index]);

            value = value[names[index++]];
          }
        } else {
          value = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit)
          break;

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer () {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null)
      tokens = cache[template] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function render (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
      else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender (template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null)
      return this.renderTokens(this.parse(value), context, partials, value);
  };

  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype.escapedValue = function escapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return mustache.escape(value);
  };

  Writer.prototype.rawValue = function rawValue (token) {
    return token[1];
  };

  mustache.name = 'mustache.js';
  mustache.version = '2.1.3';
  mustache.tags = [ '{{', '}}' ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function render (template, view, partials) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.,
  /*eslint-disable */ // eslint wants camel cased function name
  mustache.to_html = function to_html (template, view, partials, send) {
    /*eslint-enable*/

    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

}));

},{}],132:[function(require,module,exports){
(function() {
  'use strict';

  if (self.fetch) {
    return
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = name.toString();
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = value.toString();
    }
    return value
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  var support = {
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self
  }

  function Body() {
    this.bodyUsed = false


    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (!body) {
        this._bodyText = ''
      } else {
        throw new Error('unsupported BodyInit type')
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(url, options) {
    options = options || {}
    this.url = url

    this.credentials = options.credentials || 'omit'
    this.headers = new Headers(options.headers)
    this.method = normalizeMethod(options.method || 'GET')
    this.mode = options.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(options.body)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this._initBody(bodyInit)
    this.type = 'default'
    this.url = null
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
  }

  Body.call(Response.prototype)

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    // TODO: Request constructor should accept input, init
    var request
    if (Request.prototype.isPrototypeOf(input) && !init) {
      request = input
    } else {
      request = new Request(input, init)
    }

    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return;
      }

      xhr.onload = function() {
        var status = (xhr.status === 1223) ? 204 : xhr.status
        if (status < 100 || status > 599) {
          reject(new TypeError('Network request failed'))
          return
        }
        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})();

},{}]},{},[20]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYXR0ZXJuX2xpYnJhcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbn0se31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy8gICAgICAgIF9fXyAgICAgICAgICAgICAgICAgICAgIF9fXyAgICAgICAgICAgICAgICAgX19fICAgICAgICAgIF9fX1xuLy8gICAgICAgLyAgL1xcICAgICAgICBfX18gICAgICAgIC8gIC9cXCAgICAgICAgX19fICAgIC8gIC9cXCAgICAgICAgLyAgL1xcXG4vLyAgICAgIC8gIC86OlxcICAgICAgL19fL1xcICAgICAgLyAgLzo6XFwgICAgICAvICAvXFwgIC8gIC86OlxcICAgICAgLyAgLzo6XFxcbi8vICAgICAvICAvOi9cXDpcXCAgICAgXFwgIFxcOlxcICAgIC8gIC86L1xcOlxcICAgIC8gIC86LyAvICAvOi9cXDpcXCAgICAvICAvOi9cXDpcXFxuLy8gICAgLyAgLzovfi86OlxcICAgICBcXCAgXFw6XFwgIC8gIC86L34vOjpcXCAgLyAgLzovIC8gIC86L34vOjpcXCAgLyAgLzovfi86L1xuLy8gICAvX18vOi8gLzovXFw6XFxfX18gIFxcX19cXDpcXC9fXy86LyAvOi9cXDpcXC8gIC86OlxcL19fLzovIC86L1xcOlxcL19fLzovIC86L19fX1xuLy8gICBcXCAgXFw6XFwvOi9fX1xcL19fL1xcIHwgIHw6fFxcICBcXDpcXC86L19fXFwvX18vOi9cXDpcXCAgXFw6XFwvOi9fX1xcL1xcICBcXDpcXC86Ojo6Oi9cbi8vICAgIFxcICBcXDo6LyAgICBcXCAgXFw6XFx8ICB8OnwgXFwgIFxcOjovICAgIFxcX19cXC8gIFxcOlxcICBcXDo6LyAgICAgIFxcICBcXDo6L35+fn5cbi8vICAgICBcXCAgXFw6XFwgICAgIFxcICBcXDpcXF9ffDp8ICBcXCAgXFw6XFwgICAgICAgICBcXCAgXFw6XFwgIFxcOlxcICAgICAgIFxcICBcXDpcXFxuLy8gICAgICBcXCAgXFw6XFwgICAgIFxcX19cXDo6OjovICAgIFxcICBcXDpcXCAgICAgICAgIFxcX19cXC9cXCAgXFw6XFwgICAgICAgXFwgIFxcOlxcXG4vLyAgICAgICBcXF9fXFwvICAgICAgICAgfn5+fiAgICAgIFxcX19cXC8gICAgICAgICAgICAgICBcXF9fXFwvICAgICAgICBcXF9fXFwvXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzQnVpbGRlciA9IHJlcXVpcmUoXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL2J1aWxkZXJcIik7XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNCdWlsZGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzQnVpbGRlcik7XG5cbnJlcXVpcmUoXCJ3aGF0d2ctZmV0Y2hcIik7XG5cbi8vKlxuLy8gVGhlIG5hbWUgb2YgY2xhc3NlcyByZWxldmFudCB0byBgQXZhdGFyYC5cbi8vIEBvYmplY3RcblxudmFyIGNsYXNzZXMgPSB7XG4gIC8vKlxuICAvLyBAcHJvcGVydHlcbiAgcm9vdDogXCJhdmF0YXJcIixcblxuICAvLypcbiAgLy8gQHByb3BlcnR5XG4gIGltYWdlOiBcImF2YXRhcl9faW1hZ2VcIixcblxuICAvLypcbiAgLy8gQHByb3BlcnR5XG4gIGluaXRpYWxzOiBcImF2YXRhcl9faW5pdGlhbHNcIlxufTtcblxuLy8qXG4vLyBUaGUgbmFtZSBvZiBzdGF0ZXMgcmVsZXZhbnQgdG8gYEF2YXRhcmAuXG4vLyBAb2JqZWN0XG5cbnZhciBzdGF0ZXMgPSB7XG4gIC8vKlxuICAvLyBAcHJvcGVydHlcbiAgaW1hZ2U6IHtcbiAgICB2aXNpYmxlOiBjbGFzc2VzLmltYWdlICsgXCItLWlzLXZpc2libGVcIlxuICB9XG59O1xuXG4vLypcbi8vIFRoZSBuYW1lIG9mIGF0dHJpYnV0ZXMgcmVsZXZhbnQgdG8gYEF2YXRhcmAuXG4vLyBAb2JqZWN0XG5cbnZhciBhdHRycyA9IHtcbiAgLy8qXG4gIC8vIEBwcm9wZXJ0eVxuICBwcm9maWxlX25hbWU6IFwiZGF0YS1wcm9maWxlLW5hbWVcIixcblxuICAvLypcbiAgLy8gQHByb3BlcnR5XG4gIHNlcnZpY2U6IFwiZGF0YS1zZXJ2aWNlXCJcbn07XG5cbi8vKlxuLy8gVGhlIG1pbmltdW0gdGltZSwgaW4gbWlsbGlzZWNvbmRzLCBiZWZvcmUgdGhlIGJhY2tncm91bmQgaW1hZ2VzIGZvciBhdmF0YXJzXG4vLyBzaG91bGQgYmUgZmFkZWQgaW50byB2aWV3LiBUaGlzIGlzIGRvbmUgdG8gcHJldmVudCBhbnkgc3VkZGVuIHZpc3VhbCBjaGFuZ2VzXG4vLyBpbW1lZGlhdGVseSBhZnRlciBwYWdlIGxvYWQuXG4vL1xuLy8gQHZhbHVlIDIwMFxuLy8gQHR5cGUgTnVtYmVyXG4vLyBAcHJpdmF0ZVxuXG52YXIgTUlOX1RJTUVfVE9fTE9BRCA9IDIwMDtcblxudmFyIEF2YXRhciwgc2hvd19pbWFnZTtcblxuLy8qXG4vLyBGYWRlcyB0aGUgaW1hZ2UgaW50byB2aWV3IHNtb290aGx5LiBUbyBwcmV2ZW50IHN1ZGRlbiBhcHBlYXJhbmNlIG9mIGltYWdlc1xuLy8gaW1tZWRpYXRlbHkgYWZ0ZXIgcGFnZSBsb2FkLCB0aGlzIGZ1bmN0aW9uIHN0b3JlcyB0aGUgdGltZSB3aGVuIGl0IHdhc1xuLy8gaW5pdGlhbGl6ZWQgYW5kIHdhaXRzIGF0IGxlYXN0IGBNSU5fVElNRV9UT19MT0FEYCBhZnRlciB0aGF0IGJlZm9yZSBhcHBseWluZ1xuLy8gdGhlIHJlcXVpcmVkIGNsYXNzZXMuXG4vL1xuLy8gQHByaXZhdGVcbi8vIEBwYXJhbSB7RE9NRWxlbWVudH0gaW1hZ2UgLSBUaGUgaW1hZ2UgdG8gcmV2ZWFsLlxuXG5zaG93X2ltYWdlID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICByZXR1cm4gZnVuY3Rpb24gKGltYWdlKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKHN0YXRlcy5pbWFnZS52aXNpYmxlKTtcbiAgICB9LCBNYXRoLm1heCgwLCBNSU5fVElNRV9UT19MT0FEIC0gKERhdGUubm93KCkgLSBzdGFydCkpKTtcbiAgfTtcbn0pKCk7XG5cbi8vKlxuLy8gVGhlIGNvbnN0cnVjdG9yIGFyb3VuZCBhbiBhdmF0YXIgRE9NIG5vZGUuIFRoaXMgY29uc3RydWN0b3Igd2lsbCBjaGVjayBmb3Jcbi8vIHRoZSBzZXJ2aWNlIGZyb20gd2hpY2ggdGhlIGF2YXRhciBpbWFnZSBzaG91bGQgYmUgZmV0Y2hlZCBhbmQgZG8gaXRzIGJlc3QgdG9cbi8vIGdyYWIgdGhhdCBpbWFnZS5cbi8vXG4vLyBCZWNhdXNlIHRoZXJlIGlzIG5vIHdheSB0byBpbnRlcmFjdCB3aXRoIGFuIGBBdmF0YXJgLCB0aGVyZSBpcyBubyBwdWJsaWNcbi8vIGludGVyZmFjZSBmb3IgdGhpcyBjb21wb25lbnQuXG4vL1xuLy8gQGZhY3Rvcnlcbi8vXG4vLyBAcGFyYW0ge0RPTUVsZW1lbnR9IG5vZGUgLSBUaGUgcm9vdCBvZiBhbiBBdmF0YXIgY29tcG9uZW50LlxuXG5BdmF0YXIgPSBmdW5jdGlvbiAobm9kZSkge1xuICB2YXIgcHJvZmlsZV9uYW1lID0gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cnMucHJvZmlsZV9uYW1lKSxcbiAgICAgIGltYWdlID0gbm9kZS5xdWVyeVNlbGVjdG9yKFwiLlwiICsgY2xhc3Nlcy5pbWFnZSksXG4gICAgICBzZXJ2aWNlID0gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cnMuc2VydmljZSk7XG5cbiAgc3dpdGNoIChzZXJ2aWNlKSB7XG4gICAgY2FzZSBcImdpdGh1YlwiOlxuICAgICAgZmV0Y2goXCJodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzL1wiICsgcHJvZmlsZV9uYW1lKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgaW1hZ2Uuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoXCIgKyByZXNwb25zZS5hdmF0YXJfdXJsICsgXCIpXCI7XG4gICAgICAgIHNob3dfaW1hZ2UoaW1hZ2UpO1xuICAgICAgfSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCJ0d2l0dGVyXCI6XG4gICAgY2FzZSBcImVtYWlsXCI6XG4gICAgICBpbWFnZS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChodHRwOi8vYXZhdGFycy5pby9cIiArIHNlcnZpY2UgKyBcIi9cIiArIHByb2ZpbGVfbmFtZSArIFwiKVwiO1xuICAgICAgc2hvd19pbWFnZShpbWFnZSk7XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuLy8qXG4vLyBJbml0aWFsaXplcyB0aGUgYEF2YXRhcmAgY29tcG9uZW50LlxuLy9cbi8vIEBtZXRob2Rcbi8vIEBzdGF0aWNcbi8vXG4vLyBAcmVxdWlyZXMgYnVpbGRlcjo6QnVpbGRlclxuLy9cbi8vIEBhcmcge0hUTUxFbGVtZW50fSBbY29udGV4dCA9IGRvY3VtZW50XSAtIFRoZSBjb250ZXh0IGluIHdoaWNoIHRvIHNlYXJjaFxuLy8gZm9yIERPTSBub2RlcyB0aGF0IHNob3VsZCBiZSB1c2VkIGFzIHRoZSByb290IG9mIGFuIFtgQXZhdGFyYF0oQGxpbmspXG4vLyBjb21wb25lbnQuXG5cbkF2YXRhci5pbml0ID0gX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzQnVpbGRlcjJbXCJkZWZhdWx0XCJdLmluaXRpYWxpemVfb25jZShBdmF0YXIsIHsgbmFtZTogY2xhc3Nlcy5yb290IH0pO1xuXG5leHBvcnRzLmNsYXNzZXMgPSBjbGFzc2VzO1xuZXhwb3J0cy5zdGF0ZXMgPSBzdGF0ZXM7XG5leHBvcnRzLmF0dHJzID0gYXR0cnM7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEF2YXRhcjtcblxufSx7XCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL2J1aWxkZXJcIjoyMyxcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiOjU0LFwid2hhdHdnLWZldGNoXCI6MTMyfV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyBTZWU6IGh0dHA6Ly91cGRhdGVzLmh0bWw1cm9ja3MuY29tLzIwMTUvMDQvY3V0LWFuZC1jb3B5LWNvbW1hbmRzXG5cbi8vICAgICAgICBfX18gICAgICAgICAgX19fICAgICAgICBfX19fXyAgICAgICAgX19fXG4vLyAgICAgICAvICAvXFwgICAgICAgIC8gIC9cXCAgICAgIC8gIC86OlxcICAgICAgLyAgL1xcXG4vLyAgICAgIC8gIC86LyAgICAgICAvICAvOjpcXCAgICAvICAvOi9cXDpcXCAgICAvICAvOi9fXG4vLyAgICAgLyAgLzovICAgICAgIC8gIC86L1xcOlxcICAvICAvOi8gIFxcOlxcICAvICAvOi8gL1xcXG4vLyAgICAvICAvOi8gIF9fXyAgLyAgLzovICBcXDpcXC9fXy86LyBcXF9fXFw6fC8gIC86LyAvOi9fXG4vLyAgIC9fXy86LyAgLyAgL1xcL19fLzovIFxcX19cXDpcXCAgXFw6XFwgLyAgLzovX18vOi8gLzovIC9cXFxuLy8gICBcXCAgXFw6XFwgLyAgLzovXFwgIFxcOlxcIC8gIC86L1xcICBcXDpcXCAgLzovXFwgIFxcOlxcLzovIC86L1xuLy8gICAgXFwgIFxcOlxcICAvOi8gIFxcICBcXDpcXCAgLzovICBcXCAgXFw6XFwvOi8gIFxcICBcXDo6LyAvOi9cbi8vICAgICBcXCAgXFw6XFwvOi8gICAgXFwgIFxcOlxcLzovICAgIFxcICBcXDo6LyAgICBcXCAgXFw6XFwvOi9cbi8vICAgICAgXFwgIFxcOjovICAgICAgXFwgIFxcOjovICAgICAgXFxfX1xcLyAgICAgIFxcICBcXDo6L1xuLy8gICAgICAgXFxfX1xcLyAgICAgICAgXFxfX1xcLyAgICAgICAgICAgICAgICAgICBcXF9fXFwvXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2dldEl0ZXJhdG9yID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX3JlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9BcnJheSRmcm9tID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9PYmplY3QkZGVmaW5lUHJvcGVydGllcyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9PYmplY3QkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3Njcm9sbF9jb250YWluZXIgPSByZXF1aXJlKFwiLi4vc2Nyb2xsX2NvbnRhaW5lclwiKTtcblxudmFyIF9zY3JvbGxfY29udGFpbmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Njcm9sbF9jb250YWluZXIpO1xuXG52YXIgX3V0aWxpdGllc0V2ZW50cyA9IHJlcXVpcmUoXCIuLi8uLi91dGlsaXRpZXMvZXZlbnRzXCIpO1xuXG52YXIgX3V0aWxpdGllc0V2ZW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsaXRpZXNFdmVudHMpO1xuXG52YXIgX3V0aWxpdGllc1VpX2V2ZW50cyA9IHJlcXVpcmUoXCIuLi8uLi91dGlsaXRpZXMvdWlfZXZlbnRzXCIpO1xuXG52YXIgX3V0aWxpdGllc1VpX2V2ZW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsaXRpZXNVaV9ldmVudHMpO1xuXG52YXIgX3V0aWxpdGllc1RleHRfcmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vdXRpbGl0aWVzL3RleHRfcmFuZ2VcIik7XG5cbnZhciBfdXRpbGl0aWVzVGV4dF9yYW5nZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsaXRpZXNUZXh0X3JhbmdlKTtcblxudmFyIF91dGlsaXRpZXNCdWlsZGVyID0gcmVxdWlyZShcIi4uLy4uL3V0aWxpdGllcy9idWlsZGVyXCIpO1xuXG52YXIgX3V0aWxpdGllc0J1aWxkZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbGl0aWVzQnVpbGRlcik7XG5cbnZhciBfaWZyYW1lID0gcmVxdWlyZShcIi4uL2lmcmFtZVwiKTtcblxudmFyIF9zZWxlY3QgPSByZXF1aXJlKFwiLi4vc2VsZWN0XCIpO1xuXG52YXIgX3V0aWxpdGllc01hcmt1cCA9IHJlcXVpcmUoXCIuLi8uLi91dGlsaXRpZXMvbWFya3VwXCIpO1xuXG52YXIgX3V0aWxpdGllc1BhaW50aW5nID0gcmVxdWlyZShcIi4uLy4uL3V0aWxpdGllcy9wYWludGluZ1wiKTtcblxudmFyIGNsYXNzZXMgPSB7XG4gIHJvb3Q6IFwiY29kZS1ibG9ja1wiLFxuICBoZWFkZXI6IFwiY29kZS1ibG9ja19faGVhZGVyXCIsXG4gIGNvZGU6IFwiY29kZS1ibG9ja19fY29kZVwiLFxuICBzZWxlY3Q6IFwiY29kZS1ibG9ja19fZGVtby1zZWxlY3RvclwiLFxuICBjb2RlX2NvbnRhaW5lcjogXCJjb2RlLWJsb2NrX19jb2RlLWNvbnRhaW5lclwiLFxuICB0b2dnbGVyOiBcImNvZGUtYmxvY2tfX3RvZ2dsZXJcIixcbiAgY29udGVudDogXCJjb2RlLWJsb2NrX19jb250ZW50XCIsXG4gIGlmcmFtZTogXCJjb2RlLWJsb2NrX19pZnJhbWVcIixcbiAgZGVtb19jb250ZW50OiBcImNvZGUtYmxvY2tfX2RlbW9fX2NvbnRlbnRcIlxufTtcblxudmFyIHZhcmlhbnRzID0ge1xuICByb290OiB7IHdpdGhfZGVtbzogY2xhc3Nlcy5yb290ICsgXCItLXdpdGgtZGVtb1wiIH1cbn07XG5cbnZhciBzdGF0ZXMgPSB7XG4gIHJvb3Q6IHsgaGlkZGVuOiBjbGFzc2VzLnJvb3QgKyBcIi0taXMtaGlkZGVuXCIgfVxufTtcblxudmFyIGF0dHJzID0ge1xuICBsYW5ndWFnZTogXCJkYXRhLWNvZGUtYmxvY2stbGFuZ3VhZ2VcIixcbiAgY2FjaGVkX21heF9oZWlnaHQ6IFwiZGF0YS1jYWNoZWQtbWF4LWhlaWdodFwiXG59O1xuXG52YXIgQ29kZUJsb2NrLCBDb2RlQ2FjaGVzLCBjbGVhbl9hbmRfaGlnaGxpZ2h0X2NvZGUsIHVwZGF0ZV9oZWxwZXIsIHRvZ2dsZV9jb2RlX2Jsb2NrX3Zpc2liaWxpdHksIHNlbGVjdF9jb2RlLCBoaWRlLCBzaG93LCBjYWNoZV9jb250ZW50X2hlaWdodCwgaG9va191cF9pZnJhbWVfY29tbXVuaWNhdGlvbiwgYXR0YWNoX2V2ZW50X2xpc3RlbmVycztcblxuLy8qXG4vLyBDbGVhbnMgYSBzdHJpbmcgb2YgY29kZSBhbmQgdXBkYXRlcyB0aGUgc3RyaW5nIHdpdGggc3ludGF4IGhpZ2hsaWdodGluZ1xuLy8gbWFya3VwLlxuLy9cbi8vIEBwYXJhbSB7U3RyaW5nfSBjb2RlIC0gVGhlIHJhdyBjb2RlLlxuLy9cbi8vIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucyA9IHt9XSAtIFRoZSBvcHRpb25zIGZvciB0aGUgaGlnaGxpZ2h0aW5nIG9wZXJhdGlvbi5cbi8vXG4vLyBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubGFuZ3VhZ2VfY29kZSA9IFwiaHRtbFwiXVxuLy8gVGhlIGxhbmd1YWdlIG9mIHRoZSBwYXNzZWQgY29kZS4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBzeW50YXggaGlnaGxpZ2h0ZXIgdG9cbi8vIHBpY2sgdGhlIGFwcHJvcHJpYXRlIGhpZ2hsaWdodGVyLlxuLy9cbi8vIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY29sbGFwc2VfbmV3bGluZXMgPSBmYWxzZV1cbi8vIFdoZXRoZXIgb3Igbm90IHRvIGNvbWJpbmUgbXVsdGlwbGUgY29uc2VjdXRpdmUgbmV3bGluZXMgaW50byBhIHNpbmdsZSBuZXdsaW5lLlxuLy9cbi8vIEBwcml2YXRlXG4vLyBAcmV0dXJucyBTdHJpbmcgLSBUaGUgY2xlYW5lZCBhbmQgc3ludGF4LWhpZ2hsaWdodGVkIHN0cmluZy5cblxuY2xlYW5fYW5kX2hpZ2hsaWdodF9jb2RlID0gZnVuY3Rpb24gKGNvZGUpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcbiAgdmFyIGxhbmd1YWdlX2NvZGUgPSBvcHRpb25zLmxhbmd1YWdlX2NvZGU7XG5cbiAgY29kZSA9ICgwLCBfdXRpbGl0aWVzTWFya3VwLmNsZWFuKShjb2RlLCBvcHRpb25zKTtcbiAgaWYgKCFsYW5ndWFnZV9jb2RlIHx8IGxhbmd1YWdlX2NvZGUgPT09IFwiaHRtbFwiKSB7XG4gICAgY29kZSA9ICgwLCBfdXRpbGl0aWVzTWFya3VwLmluZGVudCkoY29kZSk7XG4gIH1cbiAgcmV0dXJuICgwLCBfdXRpbGl0aWVzTWFya3VwLmhpZ2hsaWdodCkoY29kZSwgb3B0aW9ucyk7XG59O1xuXG4vLypcbi8vIFVwZGF0ZXMgaGVscGVyIGNvZGUgKHRoYXQgaXMsIGEgdGVtcGxhdGUgbGFuZ3VhZ2UgdGhhdCBnZW5lcmF0ZXMgbWFya3VwKSBmb3Jcbi8vIGNoYW5nZXMgaW4gY2xhc3NlcyB0aGF0IGhhdmUgY29ycmVzcG9uZGluZyBhdHRyaWJ1dGVzIGluIHRoZSBoZWxwZXIgbWFya3VwLlxuLy8gSXQgZG9lcyB0aGlzIGJ5IHNlYXJjaGluZyB0aHJvdWdoIHRoZSBoZWxwZXIgbWFya3VwIGZvciB0aGUgc3ltYm9sIHRoYXQgc2V0c1xuLy8gYSBnaXZlbiBjbGFzcyAodGhlIGBzZXR0ZXJgKSwgYW5kIHRoZW4gYXNzaWducyB0aGF0IGEgdmFsdWUgZGVwZW5kaW5nIG9uIHRoZVxuLy8gbmF0dXJlIG9mIHRoZSBjaGFuZ2UuXG4vL1xuLy8gLSBJZiB0aGVyZSBpcyBubyBgY29uc3RhbnRgIGZvciB0aGUgY2hhbmdlLCB0aGUgdmFsdWUgb2YgdGhlIGBzZXR0ZXJgIGlzXG4vLyBhc3N1bWVkIHRvIGJlIGB0cnVlYCBpZiB0aGUgY2xhc3MgaXMgYWN0aXZlIGFuZCBgZmFsc2VgIG90aGVyd2lzZS5cbi8vXG4vLyAtIElmIHRoZXJlIGlzIGEgYGNvbnN0YW50YCwgdGhpcyB2YWx1ZSBpcyB1c2VkIHdoZW4gYSBjbGFzcyBpcyBhZGRlZC4gVGhlXG4vLyBjYWNoZSBpcyByZXF1aXJlZCB0byBzdG9yZSB2YWx1ZXMgZm9yIHdoZW4gYSBgc2V0dGVyYCB3aXRoIGEgY29uc3RhbnQgaXNcbi8vIHJlbW92ZWQg4oCUIHRoZSB2YWx1ZSBvZiB0aGUgYHNldHRlcmAgaXMgdGhlbiByZXR1cm5lZCB0byB0aGUgcHJldmlvdXNcbi8vIGBjb25zdGFudGAsIHdoaWNoIGlzIHN0b3JlZCBpbiB0aGUgY2FjaGUuXG4vL1xuLy8gQHBhcmFtIHtTdHJpbmd9IGNvZGUgICAtIFRoZSByYXcgY29kZS5cbi8vIEBwYXJhbSB7T2JqZWN0fSBjaGFuZ2UgLSBUaGUgZGV0YWlscyBhYm91dCB0aGUgY2xhc3MgY2hhbmdlLiBUaGlzIHNob3VsZFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGUgd2hldGhlciB0aGUgY2xhc3Mgd2FzIGFkZGVkIG9yIHJlbW92ZWQgYW5kXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsIG9mIHRoZSBgc2V0dGVyc2AgZm9yIHRoZSBjb3JyZXNwb25kaW5nIHZhcmlhdGlvbi5cbi8vIEBwYXJhbSB7T2JqZWN0fSBjYWNoZSAgLSBUaGUgY2FjaGUgb2YgcHJldmlvdXMgY29uc3RhbnQgdmFsdWVzLlxuLy9cbi8vIEBwcml2YXRlXG4vLyBAcmV0dXJucyBTdHJpbmcgLSBUaGUgaGVscGVyIGNvZGUgd2l0aCB0aGUgcmVsZXZhbnQgYXR0cmlidXRlcyB1cGRhdGVkLlxuXG51cGRhdGVfaGVscGVyID0gZnVuY3Rpb24gKGNvZGUsIGNoYW5nZSwgY2FjaGUpIHtcbiAgdmFyIGFkZCwgaGVscGVyX3BhcmFtLCBjb25zdGFudCwgaGVscGVyX21hdGNoZXIsIHJlZ2V4LCBjb25zdGFudHNfZm9yX3BhcmFtLCBpbmRleCwgcmVwbGFjZV92YWx1ZSwgc2V0X2J5LCBjb25zdGFudF9yZXBsYWNlciwgYm9vbGVhbl9yZXBsYWNlcjtcblxuICBhZGQgPSAhIWNoYW5nZS5hZGQ7XG5cbiAgY29uc3RhbnRfcmVwbGFjZXIgPSBmdW5jdGlvbiAobWF0Y2gsIHBhcmFtX3BvcnRpb24sIGNvbnN0YW50X3BvcnRpb24pIHtcbiAgICBjYWNoZVtoZWxwZXJfcGFyYW1dID0gY2FjaGVbaGVscGVyX3BhcmFtXSB8fCBbY29uc3RhbnRfcG9ydGlvbl07XG5cbiAgICBpZiAoY2hhbmdlLm1ldGhvZCA9PT0gXCJhZGRcIikge1xuICAgICAgY2FjaGVbaGVscGVyX3BhcmFtXS5wdXNoKGNvbnN0YW50KTtcbiAgICAgIHJldHVybiBcIlwiICsgcGFyYW1fcG9ydGlvbiArIGNvbnN0YW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdGFudHNfZm9yX3BhcmFtID0gY2FjaGVbaGVscGVyX3BhcmFtXTtcbiAgICAgIGlmICghY29uc3RhbnRzX2Zvcl9wYXJhbSkge1xuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICB9XG5cbiAgICAgIGluZGV4ID0gY29uc3RhbnRzX2Zvcl9wYXJhbS5pbmRleE9mKGNvbnN0YW50KTtcbiAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIGNvbnN0YW50c19mb3JfcGFyYW0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cblxuICAgICAgcmVwbGFjZV92YWx1ZSA9IGNvbnN0YW50c19mb3JfcGFyYW1bY29uc3RhbnRzX2Zvcl9wYXJhbS5sZW5ndGggLSAxXTtcbiAgICAgIHJldHVybiBcIlwiICsgcGFyYW1fcG9ydGlvbiArIHJlcGxhY2VfdmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIGJvb2xlYW5fcmVwbGFjZXIgPSBmdW5jdGlvbiAobWF0Y2gsIHBhcmFtX3BvcnRpb24pIHtcbiAgICByZXR1cm4gXCJcIiArIHBhcmFtX3BvcnRpb24gKyAoYWRkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xuICB9O1xuXG4gIGlmICghY2hhbmdlLnNldF9ieSkge1xuICAgIHJldHVybiBjb2RlO1xuICB9XG5cbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2dldEl0ZXJhdG9yKGNoYW5nZS5zZXRfYnkpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICBzZXRfYnkgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgY29uc3RhbnQgPSBzZXRfYnkuY29uc3RhbnQgfHwgXCJcIjtcbiAgICAgIGhlbHBlcl9wYXJhbSA9IHNldF9ieS5zZXR0ZXI7XG4gICAgICBoZWxwZXJfbWF0Y2hlciA9IFwiOj9cXFwiP1wiICsgaGVscGVyX3BhcmFtLnJlcGxhY2UoXCI6XCIsIFwiXCIpLnJlcGxhY2UoXCI/XCIsIFwiXFxcXD9cIikgKyBcIlxcXCI/Oj9cXFxccyooPzo9PlxcXFxzKik/XCI7XG5cbiAgICAgIGlmIChjb25zdGFudCkge1xuICAgICAgICAvLyBJZiBhIHZhbHVlIHdhcyBhY3R1YWxseSBkZWNsYXJlZCBmb3IgdGhlIHNldF9ieSwgZmluZCB0aGUgY3VycmVudCBjb25zdGFudFxuICAgICAgICAvLyBhbmQgcmVwbGFjZSBpdCBhcyBuZWVkZWRcbiAgICAgICAgLy8ga2V5OiBWQUxVRSwgOmtleSA9PiBWQUxVRSwgXCJrZXlcIiA9PiBWQUxVRSwgOlwia2V5XCIgPT4gVkFMVUVcblxuICAgICAgICByZWdleCA9IG5ldyBSZWdFeHAoXCIoXCIgKyBoZWxwZXJfbWF0Y2hlciArIFwiKShbYS16QS1aXFxcXC1fOl0qKVwiKTtcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZWdleCwgY29uc3RhbnRfcmVwbGFjZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTm8gY29uc3RhbnQgZGVjbGFyZWQsIGFzc3VtZSBpdCBpcyB0cnVlLyBmYWxzZVxuICAgICAgICByZWdleCA9IG5ldyBSZWdFeHAoXCIoXCIgKyBoZWxwZXJfbWF0Y2hlciArIFwiKSh0cnVlfGZhbHNlKVwiKTtcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZWdleCwgYm9vbGVhbl9yZXBsYWNlcik7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29kZTtcbn07XG5cbi8vKlxuLy8gSGFuZGxlcyBhIGNsaWNrIG9uIHRoZSBjb250YWluZWQgYGJ1dHRvbmAgdGhhdCB0b2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZVxuLy8gY29kZSBibG9jay5cbi8vXG4vLyBAcHJpdmF0ZVxuLy8gQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gVGhlIGBjbGlja2AgZXZlbnQgb24gdGhlIHNlbGVjdC5cblxudG9nZ2xlX2NvZGVfYmxvY2tfdmlzaWJpbGl0eSA9IGZ1bmN0aW9uIChldmVudCkge1xuICB2YXIgY29kZV9ibG9jayA9IENvZGVCbG9ja1tcImZvclwiXShldmVudC50YXJnZXQpO1xuICBpZiAoIWNvZGVfYmxvY2spIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29kZV9ibG9jay50b2dnbGUoKTtcbn07XG5cbi8vKlxuLy8gSGFuZGxlcyBhIGZvY3VzIG9uIHRoZSBjb2RlIGFyZWEgb2YgYSBjb2RlIGJsb2NrIGJ5IHNlbGVjdGluZyBhbGwgb2YgdGhlXG4vLyB0ZXh0IHdpdGhpbiB0aGUgY29kZSBibG9jay5cbi8vXG4vLyBAcHJpdmF0ZVxuLy8gQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gVGhlIGBmb2N1c2luYCBldmVudCBvbiB0aGUgY29kZS5cblxuc2VsZWN0X2NvZGUgPSBmdW5jdGlvbiAoKSB7XG4gICgwLCBfdXRpbGl0aWVzVGV4dF9yYW5nZTJbXCJkZWZhdWx0XCJdKSh1bmRlZmluZWQpLnNlbGVjdF9hbGwoKTtcbn07XG5cbiQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuXCIgKyBjbGFzc2VzLnRvZ2dsZXIsIHRvZ2dsZV9jb2RlX2Jsb2NrX3Zpc2liaWxpdHkpO1xuJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5cIiArIGNsYXNzZXMuY29kZSwgc2VsZWN0X2NvZGUpO1xuXG4vLypcbi8vIEhpZGVzIGEgY29kZSBibG9jay5cbi8vXG4vLyBAcGFyYW0ge09iamVjdH0gc2VsZiAtIFRoZSBpbnRlcm5hbCBkZXRhaWxzIG9mIGEgW2BDb2RlQmxvY2tgXShAbGluaykuXG4vLyBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAoe30pIC0gVGhlIG9wdGlvbnMgZm9yIGhvdyB0aGUgY29kZSBibG9jayBzaG91bGQgYmVcbi8vIGhpZGRlbi4gQ3VycmVudGx5LCBvbmx5IHRoZSBgd2l0aG91dF90cmFuc2l0aW9uYCAod2hpY2ggaGlkZXMgYXV0b21hdGljYWxseVxuLy8gcmF0aGVyIHRoYW4gc2NhbGluZyB0aGUgaGVpZ2h0IG9mIHRoZSBjb2RlIGJsb2NrKSBvcHRpb24gaXMgc3VwcG9ydGVkLlxuLy9cbi8vIEBwcml2YXRlXG5cbmhpZGUgPSBmdW5jdGlvbiAoc2VsZikge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuICB2YXIgbm9kZSA9IHNlbGYubm9kZTtcbiAgdmFyIHRvZ2dsZXIgPSBzZWxmLnRvZ2dsZXI7XG4gIHZhciBjb250ZW50ID0gc2VsZi5jb250ZW50O1xuICB2YXIgd2l0aG91dF90cmFuc2l0aW9uID0gb3B0aW9ucy53aXRob3V0X3RyYW5zaXRpb247XG4gIHZhciBzY3JvbGxfY29udGFpbmVyO1xuXG4gIF9zY3JvbGxfY29udGFpbmVyMltcImRlZmF1bHRcIl0uaW5pdCgpO1xuICBzY3JvbGxfY29udGFpbmVyID0gX3Njcm9sbF9jb250YWluZXIyW1wiZGVmYXVsdFwiXVtcImZvclwiXShub2RlKTtcbiAgaWYgKHNjcm9sbF9jb250YWluZXIpIHtcbiAgICBzY3JvbGxfY29udGFpbmVyLm1haW50YWluX2N1cnJlbnRfaGVpZ2h0KCk7XG4gIH1cblxuICBub2RlLmNsYXNzTGlzdC5hZGQoc3RhdGVzLnJvb3QuaGlkZGVuKTtcbiAgaWYgKHRvZ2dsZXIpIHtcbiAgICB0b2dnbGVyLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpLnRleHRDb250ZW50ID0gXCJTaG93XCI7XG4gIH1cblxuICBjb250ZW50LnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcblxuICBpZiAoIXdpdGhvdXRfdHJhbnNpdGlvbikge1xuICAgIGNvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5taW4oY29udGVudC5zY3JvbGxIZWlnaHQsIHBhcnNlSW50KGNvbnRlbnQuZ2V0QXR0cmlidXRlKGF0dHJzLmNhY2hlZF9tYXhfaGVpZ2h0KSwgMTApKSArIFwicHhcIjtcbiAgICAoMCwgX3V0aWxpdGllc1BhaW50aW5nLmZvcmNlX3JlcGFpbnQpKGNvbnRlbnQpO1xuICAgIGNvbnRlbnQuc3R5bGUudHJhbnNpdGlvbiA9IG51bGw7XG4gIH1cblxuICAoMCwgX3V0aWxpdGllc1BhaW50aW5nLmZvcmNlX3JlcGFpbnQpKGNvbnRlbnQpO1xuICBjb250ZW50LnN0eWxlLmhlaWdodCA9IFwiMHB4XCI7XG5cbiAgaWYgKHdpdGhvdXRfdHJhbnNpdGlvbikge1xuICAgICgwLCBfdXRpbGl0aWVzUGFpbnRpbmcuZm9yY2VfcmVwYWludCkoY29udGVudCk7XG4gICAgY29udGVudC5zdHlsZS50cmFuc2l0aW9uID0gbnVsbDtcbiAgfVxuXG4gIHNlbGYuaXNfaGlkZGVuID0gdHJ1ZTtcbn07XG5cbi8vKlxuLy8gU2hvd3MgYSBjb2RlIGJsb2NrLlxuLy9cbi8vIEBwYXJhbSB7T2JqZWN0fSBzZWxmIC0gVGhlIGludGVybmFsIGRldGFpbHMgb2YgYSBbYENvZGVCbG9ja2BdKEBsaW5rKS5cbi8vXG4vLyBAcHJpdmF0ZVxuXG5zaG93ID0gZnVuY3Rpb24gY2FsbGVlJDAkMChzZWxmKSB7XG4gIHZhciBub2RlLCB0b2dnbGVyLCBjb250ZW50O1xuICByZXR1cm4gX3JlZ2VuZXJhdG9yUnVudGltZS5hc3luYyhmdW5jdGlvbiBjYWxsZWUkMCQwJChjb250ZXh0JDEkMCkge1xuICAgIHdoaWxlICgxKSBzd2l0Y2ggKGNvbnRleHQkMSQwLnByZXYgPSBjb250ZXh0JDEkMC5uZXh0KSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIG5vZGUgPSBzZWxmLm5vZGU7XG4gICAgICAgIHRvZ2dsZXIgPSBzZWxmLnRvZ2dsZXI7XG4gICAgICAgIGNvbnRlbnQgPSBzZWxmLmNvbnRlbnQ7XG5cbiAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKHN0YXRlcy5yb290LmhpZGRlbik7XG4gICAgICAgIHNlbGYuaXNfaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIGlmICh0b2dnbGVyKSB7XG4gICAgICAgICAgdG9nZ2xlci5xdWVyeVNlbGVjdG9yKFwic3BhblwiKS50ZXh0Q29udGVudCA9IFwiSGlkZVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dCQxJDAubmV4dCA9IDg7XG4gICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKF91dGlsaXRpZXNVaV9ldmVudHMyW1wiZGVmYXVsdFwiXS50cmFuc2l0aW9uKGNvbnRlbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb250ZW50LnN0eWxlLmhlaWdodCA9IE1hdGgubWluKGNvbnRlbnQuc2Nyb2xsSGVpZ2h0LCBwYXJzZUludChjb250ZW50LmdldEF0dHJpYnV0ZShhdHRycy5jYWNoZWRfbWF4X2hlaWdodCksIDEwKSkgKyBcInB4XCI7XG4gICAgICAgIH0pKTtcblxuICAgICAgY2FzZSA4OlxuXG4gICAgICAgIGNvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gbnVsbDtcblxuICAgICAgY2FzZSA5OlxuICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICByZXR1cm4gY29udGV4dCQxJDAuc3RvcCgpO1xuICAgIH1cbiAgfSwgbnVsbCwgdGhpcyk7XG59O1xuXG4vLypcbi8vIENhY2hlcyB0aGUgbWF4IGhlaWdodCBvZiB0aGUgbWFpbiBjb250ZW50IGFyZWEgb2YgYSBjb2RlIGJsb2NrLiBUaGlzIGlzIGRvbmVcbi8vIHNvIHRoYXQgdGhlIHRyYW5zaXRpb24gZnJvbSBoaWRkZW4gdG8gc2hvd24gY2FwcyBvdXQgYXQgdGhlIGBtYXgtaGVpZ2h0YFxuLy8gc3BlY2lmaWVkIGluIENTUy5cbi8vXG4vLyBJbiBvcmRlciB0byBhbGxvdyB0aGUgY29kZSBhcmVhcyB0byBzY3JvbGwsIGFuIGFwcHJvcHJpYXRlIG1heC1oZWlnaHQgaXMgYWxzb1xuLy8gc2V0IG9uIHRoZW0uXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhIFtgQ29kZUJsb2NrYF0oQGxpbmspLlxuLy9cbi8vIEBwcml2YXRlXG5cbmNhY2hlX2NvbnRlbnRfaGVpZ2h0ID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgdmFyIG5vZGUgPSBzZWxmLm5vZGU7XG4gIHZhciBjb250ZW50ID0gc2VsZi5jb250ZW50O1xuICB2YXIgbWF4X2hlaWdodDt2YXIgaGVhZGVyO3ZhciBoZWFkZXJfaGVpZ2h0O3ZhciBtYXhfY29kZV9oZWlnaHQ7dmFyIGNvZGVfY29udGFpbmVyO1xuXG4gIG1heF9oZWlnaHQgPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb250ZW50KS5tYXhIZWlnaHQsIDEwKTtcblxuICBjb250ZW50LnNldEF0dHJpYnV0ZShhdHRycy5jYWNoZWRfbWF4X2hlaWdodCwgbWF4X2hlaWdodCk7XG5cbiAgaGVhZGVyID0gbm9kZS5xdWVyeVNlbGVjdG9yKFwiLlwiICsgY2xhc3Nlcy5oZWFkZXIpO1xuICBoZWFkZXJfaGVpZ2h0ID0gaGVhZGVyID8gaGVhZGVyLm9mZnNldEhlaWdodCA6IDA7XG4gIG1heF9jb2RlX2hlaWdodCA9IG1heF9oZWlnaHQgLSBoZWFkZXJfaGVpZ2h0ICsgXCJweFwiO1xuXG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBfZ2V0SXRlcmF0b3IoX0FycmF5JGZyb20obm9kZS5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiICsgY2xhc3Nlcy5jb2RlX2NvbnRhaW5lcikpKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICBjb2RlX2NvbnRhaW5lciA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgY29kZV9jb250YWluZXIuc3R5bGUubWF4SGVpZ2h0ID0gbWF4X2NvZGVfaGVpZ2h0O1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMltcInJldHVyblwiXSkge1xuICAgICAgICBfaXRlcmF0b3IyW1wicmV0dXJuXCJdKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLy8qXG4vLyBEb2VzIGFsbCBvZiB0aGUgbmVjZXNzYXJ5IHdvcmsgdG8gbWFuYWdlIHRoZSB0d28td2F5IGNvbW11bmljYXRpb24gYmV0d2VlblxuLy8gYSBjb2RlIGJsb2NrIGNvbm5lY3RlZCB0byBhbiBgaWZyYW1lYCBhbmQgdGhhdCBgaWZyYW1lYC4gVGhpcyBpbmNsdWRlc1xuLy8gbGlzdGVuaW5nIGZvciBjaGFuZ2VzIHRvIG1hcmt1cCBvZiB0aGUgYXNzb2NpYXRlZCBkZW1vIGFuZCB0cmlnZ2VyaW5nIGFuXG4vLyBpbnRpYWwgbWFya3VwIHJlcXVlc3QgdG8gZ2V0IHRoZSBtb3N0IHVwLXRvLWRhdGUgcmVwcmVzZW50YXRpb24gcG9zc2libGUuXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhIFtgQ29kZUJsb2NrYF0oQGxpbmspLlxuLy9cbi8vIEBwcml2YXRlXG5cbmhvb2tfdXBfaWZyYW1lX2NvbW11bmljYXRpb24gPSBmdW5jdGlvbiAoc2VsZikge1xuICB2YXIgY29tbXVuaWNhdG9yID0gKDAsIF9pZnJhbWUuQ29tbXVuaWNhdG9yKSgpLFxuICAgICAgcmVnaXN0ZXJlZCA9IGNvbW11bmljYXRvci5yZWdpc3Rlci5mcm9tX25vZGUoc2VsZi5ub2RlKSxcbiAgICAgIGhhbmRsZV9tYXJrdXBfY2hhbmdlLFxuICAgICAgaGFuZGxlX2NsYXNzX2NoYW5nZTtcblxuICBpZiAoIXJlZ2lzdGVyZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBoYW5kbGVfbWFya3VwX2NoYW5nZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICghZXZlbnQuaHRtbCB8fCAhc2VsZi5jb2RlX2NhY2hlcy5tYXJrdXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2VsZi5jb2RlX2NhY2hlcy5tYXJrdXAuY29kZSA9IGV2ZW50Lmh0bWw7XG4gIH07XG5cbiAgaGFuZGxlX2NsYXNzX2NoYW5nZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICghc2VsZi5jb2RlX2NhY2hlcy5oZWxwZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGV2ZW50LmRldGFpbHMuYWRkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGV2ZW50LmRldGFpbHMuYWRkID0gZXZlbnQuYWRkO1xuICAgIH1cbiAgICBzZWxmLmNvZGVfY2FjaGVzLmhlbHBlci51cGRhdGUoZXZlbnQuZGV0YWlscyk7XG4gIH07XG5cbiAgY29tbXVuaWNhdG9yLm9uKF91dGlsaXRpZXNFdmVudHMyW1wiZGVmYXVsdFwiXS50eXBlcy5tYXJrdXBfcmVxdWVzdCwgaGFuZGxlX21hcmt1cF9jaGFuZ2UpO1xuICBjb21tdW5pY2F0b3Iub24oX3V0aWxpdGllc0V2ZW50czJbXCJkZWZhdWx0XCJdLnR5cGVzLm1hcmt1cF9jaGFuZ2UsIGhhbmRsZV9tYXJrdXBfY2hhbmdlKTtcbiAgY29tbXVuaWNhdG9yLm9uKF91dGlsaXRpZXNFdmVudHMyW1wiZGVmYXVsdFwiXS50eXBlcy5jbGFzc19jaGFuZ2UsIGhhbmRsZV9jbGFzc19jaGFuZ2UpO1xuXG4gIGNvbW11bmljYXRvci50cmlnZ2VyKF91dGlsaXRpZXNFdmVudHMyW1wiZGVmYXVsdFwiXS50eXBlcy5tYXJrdXBfcmVxdWVzdCk7XG4gIHJldHVybiBjb21tdW5pY2F0b3I7XG59O1xuXG5hdHRhY2hfZXZlbnRfbGlzdGVuZXJzID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgdmFyIHNlbGVjdCA9IHNlbGYubm9kZS5xdWVyeVNlbGVjdG9yKFwiLlwiICsgX3NlbGVjdC5jbGFzc2VzLnJvb3QpO1xuXG4gIGlmIChzZWxlY3QgJiYgc2VsZi5jb21tdW5pY2F0b3IpIHtcbiAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHNlbGYuY29tbXVuaWNhdG9yLnRyaWdnZXIoX3V0aWxpdGllc0V2ZW50czJbXCJkZWZhdWx0XCJdLnR5cGVzLm1hcmt1cF9yZXF1ZXN0LCB7XG4gICAgICAgIGRlbW86IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbi8vKlxuLy8gQW4gQVBJIGZvciBjYWNoZWluZywgdXBkYXRpbmcsIGFuZCBoaWdobGlnaHRpbmcgY29kZSB3aXRoaW4gYSBjb2RlIGJsb2NrLlxuLy9cbi8vIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgLSBUaGUgbWFpbiBjb2RlIGJsb2NrLlxuLy9cbi8vIEBwcml2YXRlXG4vLyBAZmFjdG9yeVxuXG5Db2RlQ2FjaGVzID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGxhbmd1YWdlcyA9IHtcbiAgICBtYXJrdXA6IFtcImh0bWxcIl0sXG4gICAgaGVscGVyOiBbXCJlcmJcIiwgXCJoYW1sXCIsIFwic2xpbVwiXVxuICB9O1xuXG4gIHZhciBDb2RlQ2FjaGU7XG5cbiAgQ29kZUNhY2hlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gICAgdmFyIGxhbmd1YWdlID0gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cnMubGFuZ3VhZ2UpIHx8IFwiaHRtbFwiLFxuICAgICAgICBkb21fY29kZSA9IG5vZGUucXVlcnlTZWxlY3RvcihcImNvZGVcIiksXG4gICAgICAgIGNvZGUgPSBkb21fY29kZS5pbm5lckhUTUwsXG4gICAgICAgIGhlbHBlcl9jYWNoZSA9IG51bGwsXG4gICAgICAgIGNvZGVfY2FjaGU7XG5cbiAgICBjb2RlX2NhY2hlID0gX09iamVjdCRkZWZpbmVQcm9wZXJ0aWVzKHtcbiAgICAgIGxhbmd1YWdlOiBsYW5ndWFnZSxcbiAgICAgIGhpZ2hsaWdodDogZnVuY3Rpb24gaGlnaGxpZ2h0KCkge1xuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGNvZGU6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIGNvZGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gc2V0KG5ld19jb2RlKSB7XG4gICAgICAgICAgY29kZSA9IG5ld19jb2RlO1xuICAgICAgICAgIGRvbV9jb2RlLmlubmVySFRNTCA9IGNsZWFuX2FuZF9oaWdobGlnaHRfY29kZShuZXdfY29kZSwge1xuICAgICAgICAgICAgbGFuZ3VhZ2VfY29kZTogbGFuZ3VhZ2UsXG4gICAgICAgICAgICBjb2xsYXBzZV9uZXdsaW5lczogb3B0aW9ucy5nZW5lcmF0ZWRfZnJvbV9oZWxwZXJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb2RlX2NhY2hlLmhpZ2hsaWdodCgpO1xuXG4gICAgaWYgKGxhbmd1YWdlcy5oZWxwZXIuaW5jbHVkZXMobGFuZ3VhZ2UpKSB7XG4gICAgICBoZWxwZXJfY2FjaGUgPSB7fTtcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvZGVfY2FjaGUsIFwidXBkYXRlXCIsIHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGNoYW5nZSkge1xuICAgICAgICAgIHRoaXMuY29kZSA9IHVwZGF0ZV9oZWxwZXIodGhpcy5jb2RlLCBjaGFuZ2UsIGhlbHBlcl9jYWNoZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjb2RlX2NhY2hlO1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBjb2RlX25vZGVzLCBjb2RlX2NhY2hlcywgYXBpLCBpbmRleDtcblxuICAgIGNvZGVfbm9kZXMgPSBfQXJyYXkkZnJvbShub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIgKyBjbGFzc2VzLmNvZGUpKTtcbiAgICBjb2RlX2NhY2hlcyA9IGNvZGVfbm9kZXMubWFwKGZ1bmN0aW9uIChjb2RlX25vZGUpIHtcbiAgICAgIHJldHVybiBDb2RlQ2FjaGUoY29kZV9ub2RlLCB7IGdlbmVyYXRlZF9mcm9tX2hlbHBlcjogY29kZV9ub2Rlcy5sZW5ndGggPiAxIH0pO1xuICAgIH0pO1xuXG4gICAgYXBpID0gX09iamVjdCRkZWZpbmVQcm9wZXJ0aWVzKHtcblxuICAgICAgbGVuZ3RoOiBjb2RlX2NhY2hlcy5sZW5ndGhcbiAgICB9LCB7XG4gICAgICBtYXJrdXA6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIGNvZGVfY2FjaGVzLmZpbHRlcihmdW5jdGlvbiAoY29kZV9jYWNoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlcy5tYXJrdXAuaW5jbHVkZXMoY29kZV9jYWNoZS5sYW5ndWFnZSk7XG4gICAgICAgICAgfSlbMF07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGhlbHBlcjoge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gY29kZV9jYWNoZXMuZmlsdGVyKGZ1bmN0aW9uIChjb2RlX2NhY2hlKSB7XG4gICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2VzLmhlbHBlci5pbmNsdWRlcyhjb2RlX2NhY2hlLmxhbmd1YWdlKTtcbiAgICAgICAgICB9KVswXTtcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBjb2RlX2NhY2hlcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkoYXBpLCBpbmRleCwgeyB2YWx1ZTogY29kZV9jYWNoZXNbaW5kZXhdIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBhcGk7XG4gIH07XG59KSgpO1xuXG4vLypcbi8vIFRoZSBjb25zdHJ1Y3RvciBhcm91bmQgYSBjb2RlIGJsb2NrLlxuLy9cbi8vIEBmYWN0b3J5XG4vLyBAcHVibGljXG4vL1xuLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSAtIFRoZSBub2RlIHdpdGggdGhlIGBjb2RlLWJsb2NrYCByb290IGNsYXNzLlxuXG5Db2RlQmxvY2sgPSBmdW5jdGlvbiAobm9kZSkge1xuICB2YXIgc2VsZiwgYXBpLCB0b2dnbGU7XG5cbiAgc2VsZiA9IHtcbiAgICBub2RlOiBub2RlLFxuICAgIGlzX2hpZGRlbjogbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoc3RhdGVzLnJvb3QuaGlkZGVuKSxcbiAgICB0b2dnbGVyOiBub2RlLnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBjbGFzc2VzLnRvZ2dsZXIpLFxuICAgIGNvbnRlbnQ6IG5vZGUucXVlcnlTZWxlY3RvcihcIi5cIiArIGNsYXNzZXMuY29udGVudCksXG4gICAgY29kZV9jYWNoZXM6IENvZGVDYWNoZXMobm9kZSlcbiAgfTtcblxuICBzZWxmLmNvbW11bmljYXRvciA9IGhvb2tfdXBfaWZyYW1lX2NvbW11bmljYXRpb24oc2VsZik7XG5cbiAgYXR0YWNoX2V2ZW50X2xpc3RlbmVycyhzZWxmKTtcblxuICBpZiAoc2VsZi5pc19oaWRkZW4pIHtcbiAgICBoaWRlKHNlbGYsIHsgd2l0aG91dF90cmFuc2l0aW9uOiB0cnVlIH0pO1xuICB9XG4gIGlmIChzZWxmLnRvZ2dsZXIpIHtcbiAgICBjYWNoZV9jb250ZW50X2hlaWdodChzZWxmKTtcbiAgfVxuXG4gIC8vKlxuICAvLyBUb2dnbGVzIHRoZSBjb2RlIGJsb2NrLlxuICAvL1xuICAvLyBAbWV0aG9kXG5cbiAgdG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzZWxmLmlzX2hpZGRlbiA/IHNob3coc2VsZikgOiBoaWRlKHNlbGYpO1xuICB9O1xuICBhcGkgPSB7IHRvZ2dsZTogdG9nZ2xlIH07XG5cbiAgcmV0dXJuIGFwaTtcbn07XG5cbkNvZGVCbG9jay5pbml0ID0gX3V0aWxpdGllc0J1aWxkZXIyW1wiZGVmYXVsdFwiXS5pbml0aWFsaXplX29uY2UoQ29kZUJsb2NrLCB7IG5hbWU6IGNsYXNzZXMucm9vdCwgY2FjaGU6IHRydWUgfSk7XG5cbmV4cG9ydHMuY2xhc3NlcyA9IGNsYXNzZXM7XG5leHBvcnRzLnN0YXRlcyA9IHN0YXRlcztcbmV4cG9ydHMudmFyaWFudHMgPSB2YXJpYW50cztcbmV4cG9ydHMuYXR0cnMgPSBhdHRycztcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQ29kZUJsb2NrO1xuXG59LHtcIi4uLy4uL3V0aWxpdGllcy9idWlsZGVyXCI6MjMsXCIuLi8uLi91dGlsaXRpZXMvZXZlbnRzXCI6MjYsXCIuLi8uLi91dGlsaXRpZXMvbWFya3VwXCI6MjgsXCIuLi8uLi91dGlsaXRpZXMvcGFpbnRpbmdcIjozMSxcIi4uLy4uL3V0aWxpdGllcy90ZXh0X3JhbmdlXCI6MzUsXCIuLi8uLi91dGlsaXRpZXMvdWlfZXZlbnRzXCI6MzYsXCIuLi9pZnJhbWVcIjo3LFwiLi4vc2Nyb2xsX2NvbnRhaW5lclwiOjEzLFwiLi4vc2VsZWN0XCI6MTQsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbVwiOjQxLFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiOjQyLFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydGllc1wiOjQ2LFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIjo0NyxcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiOjU0LFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiOjEyOH1dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfZ2V0SXRlcmF0b3IgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfQXJyYXkkZnJvbSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbVwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdXRpbGl0aWVzRXZlbnRzID0gcmVxdWlyZShcIi4uLy4uL3V0aWxpdGllcy9ldmVudHNcIik7XG5cbnZhciBfdXRpbGl0aWVzRXZlbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxpdGllc0V2ZW50cyk7XG5cbnZhciBfdXRpbGl0aWVzVWlfZXZlbnRzID0gcmVxdWlyZShcIi4uLy4uL3V0aWxpdGllcy91aV9ldmVudHNcIik7XG5cbnZhciBfdXRpbGl0aWVzVWlfZXZlbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxpdGllc1VpX2V2ZW50cyk7XG5cbnZhciBfaWZyYW1lID0gcmVxdWlyZShcIi4uL2lmcmFtZVwiKTtcblxuLy8qXG4vLyBUaGUgbmFtZSBvZiBjbGFzc2VzIHJlbGV2YW50IHRvIGBEZW1vYC5cbi8vIEBvYmplY3RcblxudmFyIGNsYXNzZXMgPSB7XG4gIHJvb3Q6IFwiZGVtb1wiLFxuICBzZWN0aW9uOiBcImRlbW9fX3NlY3Rpb25cIixcbiAgY29udGVudDogXCJjb250ZW50XCJcbn07XG5cbnZhciBEZW1vLCBjcmVhdGVfc2VsZiwgc2V0X2NvcnJlY3RfYmFja2dyb3VuZF9jb2xvciwgYWxsb2NhdGVfbWluaW11bV9oZWlnaHQ7XG5cbi8vKlxuLy8gVGhlIGRlbGF5IGFmdGVyIGEgY2hhbmdlIGluIG1hcmt1cCB0byBrZWVwIHRyYWNrIG9mIGhlaWdodCBjaGFuZ2VzIGFuZFxuLy8gY29tbXVuaWNhdGUgdGhlbSB0byB0aGUgYXR0YWNoZWQgW2BJZnJhbWVgXShAbGluaykuXG4vL1xuLy8gQHR5cGUgTnVtYmVyXG4vLyBAdmFsdWUgMTAwMFxuXG52YXIgSEVJR0hUX0NIQU5HRV9XQVRDSF9EVVJBVElPTiA9IDEwMDA7XG5cbi8vKlxuLy8gVXBkYXRlcyB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgcGFyZW50IGZvciB0aGUgZGVtbyB0byBtYXRjaCB0aGVcbi8vIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIGxhc3Qgc2VjdGlvbi4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSwgZHVyaW5nIHRoZVxuLy8gdHJhbnNpdGlvbiBmcm9tIGEgbGFyZ2VyIHNpemUgdG8gYSBzbWFsbGVyIHNpemUsIG5vdCBkb2luZyB0aGlzIHdvdWxkIHNob3dcbi8vIHdoaXRlIGJlbG93IGFsbCBvZiB0aGUgZGVtbyBzZWN0aW9ucyByZWdhcmRsZXNzIG9mIHRoZWlyIGNvbG9yLlxuLy9cbi8vIEBwcml2YXRlXG4vLyBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIC0gVGhlIGJhc2UgYERlbW9gIG5vZGUuXG5cbnNldF9jb3JyZWN0X2JhY2tncm91bmRfY29sb3IgPSBmdW5jdGlvbiAobm9kZSkge1xuICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlLFxuICAgICAgc2VjdGlvbnMgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIgKyBjbGFzc2VzLnNlY3Rpb24pLFxuICAgICAgbGFzdF9zZWN0aW9uID0gc2VjdGlvbnNbc2VjdGlvbnMubGVuZ3RoIC0gMV07XG5cbiAgcGFyZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGxhc3Rfc2VjdGlvbikuYmFja2dyb3VuZENvbG9yO1xufTtcblxuLy8qXG4vLyBTcHJlYWRzIHRoZSBtaW5pbXVtIGhlaWdodCBvZiB0aGUgdG90YWwgZGVtbyBiZXR3ZWVuIHRoZSBzZWN0aW9ucyB0aGF0IGFyZVxuLy8gcHJlc2VudC4gVGhpcyBpcyBpbXBvcnRhbnQgYmVjYXVzZSB0aGUgcmVzaXphYmxlIGRlbW8gd2lsbCBzaG93IHRoZSBmdWxsXG4vLyBtaW5pbXVtIHdpZHRoLCBzbyBpZiB0aGVyZSBhcmUgY29sb3JlZCBzZWN0aW9ucyB0aGF0IGRvbid0IGNvbXBsZXRlbHkgZmlsbFxuLy8gdGhlIG1pbmltdW0gd2lkdGgsIHRoZXJlIHdpbGwgYmUgYW4gYXdrd2FyZCB3aGl0ZSBwYXRjaCBiZWxvdyB0aGUgc2VjdGlvbnMuXG4vL1xuLy8gQHByaXZhdGVcbi8vIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgLSBUaGUgYmFzZSBgRGVtb2Agbm9kZS5cblxuYWxsb2NhdGVfbWluaW11bV9oZWlnaHQgPSBmdW5jdGlvbiAobm9kZSkge1xuICB2YXIgbWluX2hlaWdodCA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLm1pbkhlaWdodCwgMTApLFxuICAgICAgZGVtb19zZWN0aW9ucyA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChcIi5cIiArIGNsYXNzZXMuc2VjdGlvbiksXG4gICAgICBkZW1vX3NlY3Rpb247XG5cbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2dldEl0ZXJhdG9yKGRlbW9fc2VjdGlvbnMpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICBkZW1vX3NlY3Rpb24gPSBfc3RlcC52YWx1ZTtcblxuICAgICAgZGVtb19zZWN0aW9uLnN0eWxlLm1pbkhlaWdodCA9IG1pbl9oZWlnaHQgLyBkZW1vX3NlY3Rpb25zLmxlbmd0aCArIFwicHhcIjtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICBfaXRlcmF0b3JbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLy8qXG4vLyBDYWNoZXMgYWxsIG9mIHRoZSBpbnRlcm5hbCBkZXRhaWxzIGZvciBhbiBbYERlbW9gXShAbGluaykuXG4vL1xuLy8gQHByaXZhdGVcbi8vIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgLSBUaGUgbm9kZSBiYWNraW5nIHRoZSBgRGVtb2AuXG4vLyBAcmV0dXJucyBPYmplY3QgLSBUaGUgcHJpdmF0ZSwgaW50ZXJuYWwgZGV0YWlscyBvZiB0aGUgYERlbW9gLlxuXG5jcmVhdGVfc2VsZiA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHJldHVybiB7XG4gICAgbWFya3VwX3NvdXJjZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5cIiArIGNsYXNzZXMuY29udGVudCksXG4gICAgZGVtb19oYW5kbGVyczogd2luZG93LnBhcmVudC5kZW1vX2hhbmRsZXJzIHx8IHt9LFxuICAgIHBhcmVudDogbm9kZS5wYXJlbnROb2RlLFxuICAgIGhlaWdodDogMCxcbiAgICBhY3Rpb25zOiB7fSxcbiAgICBjb250ZXh0OiB7XG4gICAgICBib2R5OiBkb2N1bWVudC5ib2R5LFxuICAgICAgZG9jdW1lbnQ6IGRvY3VtZW50XG4gICAgfVxuICB9O1xufTtcblxuLy8qXG4vLyBUaGUgY29uc3RydWN0b3IgZm9yIGEgbmV3IGBEZW1vYC4gVGhpcyB3aWxsIHNpZ24gdGhlIGRlbW8gdXAgZm9yIGFsbCB0aGVcbi8vIHJlcXVpcmVkIGV2ZW50cyBhbmQgd2lsbCBkbyB0aGUgcmVxdWlyZWQgaW5pdGlhbGl6YXRpb24gd29yay5cbi8vXG4vLyBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIC0gVGhlIGJhc2UgYERlbW9gIG5vZGUuXG4vL1xuLy8gQGZhY3RvcnlcblxuRGVtbyA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHZhciBzZWxmID0gY3JlYXRlX3NlbGYobm9kZSksXG4gICAgICBjb21tdW5pY2F0b3IgPSAoMCwgX2lmcmFtZS5Db21tdW5pY2F0b3IpKCksXG4gICAgICBzZW5kX21hcmt1cCxcbiAgICAgIGhlaWdodF91cGRhdGUsXG4gICAgICBhcHBseV9jbGFzc19jaGFuZ2U7XG5cbiAgLy8qXG4gIC8vIFNlbmRzIHRoZSBtYXJrdXAgZm9yIHRoZSBjdXJyZW50IFwibWFpblwiIHNlY3Rpb24uXG4gIC8vXG4gIC8vIEBwYXJhbSB7T2JqZWN0fSBbZXZlbnQgPSB7fV0gLSBUaGUgKG9wdGlvbmFsKSBldmVudCB0aGF0IHNwZWNpZmllcyB0aGUgZGVtb1xuICAvLyB0byBzZW5kIG1hcmt1cCBmb3IuXG4gIC8vXG4gIC8vIEBtZXRob2RcbiAgLy8gQHByaXZhdGVcblxuICBzZW5kX21hcmt1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXZlbnQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuICAgIGlmIChldmVudC5kZW1vKSB7XG4gICAgICBzZWxmLm1hcmt1cF9zb3VyY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgY2xhc3Nlcy5zZWN0aW9uICsgXCItLVwiICsgZXZlbnQuZGVtbyArIFwiIC5cIiArIGNsYXNzZXMuY29udGVudCk7XG4gICAgfVxuXG4gICAgY29tbXVuaWNhdG9yLnRyaWdnZXIoX3V0aWxpdGllc0V2ZW50czJbXCJkZWZhdWx0XCJdLnR5cGVzLm1hcmt1cF9yZXF1ZXN0LCB7XG4gICAgICBodG1sOiBzZWxmLm1hcmt1cF9zb3VyY2UuaW5uZXJIVE1MXG4gICAgfSk7XG4gIH07XG5cbiAgLy8qXG4gIC8vIFNlbmRzIHRoZSBoZWlnaHQgZm9yIHRoZSBkZW1vIGFzIGEgd2hvbGUsIGFuZCBzZXRzIHRoYXQgaGVpZ2h0IG9uIHRoZVxuICAvLyBkZW1vJ3MgY29udGFpbmVyLiBUaGUgaGVpZ2h0IGlzIHNldCBvbiB0aGUgY29udGFpbmVyIGFmdGVyIGEgZGVsYXkgdG9cbiAgLy8gZW5zdXJlIHRoYXQgdGhlcmUgaXMgbm8gcGF0Y2ggb2YgdW5zdHlsZWQgYmFja2dyb3VuZCBjb2xvciB1bmRlcm5lYXRoIGFcbiAgLy8gZGVtbyB0aGF0IGlzIHNocmlua2luZy5cbiAgLy9cbiAgLy8gQG1ldGhvZFxuICAvLyBAcHJpdmF0ZVxuXG4gIGhlaWdodF91cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG5ld19oZWlnaHQgPSBub2RlLm9mZnNldEhlaWdodDtcbiAgICBpZiAobmV3X2hlaWdodCA9PT0gc2VsZi5oZWlnaHQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZWxmLmhlaWdodCA9IG5ld19oZWlnaHQ7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLnBhcmVudC5zdHlsZS5taW5IZWlnaHQgPSBuZXdfaGVpZ2h0ICsgXCJweFwiO1xuICAgIH0sIEhFSUdIVF9DSEFOR0VfV0FUQ0hfRFVSQVRJT04pO1xuXG4gICAgY29tbXVuaWNhdG9yLnRyaWdnZXIoX3V0aWxpdGllc0V2ZW50czJbXCJkZWZhdWx0XCJdLnR5cGVzLmhlaWdodF9jaGFuZ2UsIHsgaGVpZ2h0OiBuZXdfaGVpZ2h0IH0pO1xuICB9O1xuXG4gIC8vKlxuICAvLyBBcHBsaWVzIGEgY2xhc3MgY2hhbmdlIHRvIHRoZSBkZW1vLiBUaGlzIGNsYXNzIGNoYW5nZSB3aWxsIGF2b2lkIGFkZGluZ1xuICAvLyBjbGFzc2VzIHRvIGNvbXBvbmVudHMgdGhhdCBoYXZlIGEgY2xhc3MgcHJvY2x1ZGVkIGZyb20gdGhlIG5ldyBjbGFzcywgd2lsbFxuICAvLyBmaWx0ZXIgdG8gdGhlIHBhc3NlZCBmaWx0ZXIsIGFuZCB3aWxsIHBlcmZvcm0gdGhlIG9wdGlvbmFsIEphdmFTY3JpcHRcbiAgLy8gYWN0aW9uIGluc3RlYWQgb2YgYSBzaW1wbGUgY2xhc3MgYWRkaXRpb24vIHJlbW92YWwuIElmIGFwcHJvcHJpYXRlLCB0aGVcbiAgLy8gY29tcG9uZW50IHdpbGwgdGhlbiByZXR1cm4gdGhlIGNsYXNzIGNoYW5nZSBldmVudCwgc2VuZCBhIG1hcmt1cCBjaGFuZ2VcbiAgLy8gZXZlbnQsIGFuZCBzZW5kIGEgaGVpZ2h0IHVwZGF0ZSBldmVudC5cbiAgLy9cbiAgLy8gQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gVGhlIGNsYXNzIGNoYW5nZSBldmVudC5cbiAgLy8gQHByaXZhdGVcbiAgLy9cblxuICBhcHBseV9jbGFzc19jaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgZGV0YWlscyA9IGV2ZW50LmRldGFpbHMsXG4gICAgICAgIG1hcmt1cF9jaGFuZ2VfaW5fc291cmNlID0gZmFsc2UsXG4gICAgICAgIG1pbmltdW1fb25lX2NsYXNzX2NoYW5nZSA9IGZhbHNlLFxuICAgICAgICBtYXRjaGVzID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiICsgY2xhc3Nlcy5jb250ZW50ICsgXCIgLlwiICsgZGV0YWlsc1tcImZvclwiXSksXG4gICAgICAgIGJhaWxfZWFybHksXG4gICAgICAgIGNsYXNzX2xpc3QsXG4gICAgICAgIGFjdGlvbixcbiAgICAgICAgbWF0Y2gsXG4gICAgICAgIHByZWNsdWRlO1xuXG4gICAgaWYgKGRldGFpbHMuZmlsdGVyX3RvKSB7XG4gICAgICAvLyBDaGVjayBvbiBtYXRjaGVzXG4gICAgICBtYXRjaGVzID0gbWF0Y2hlcy5maWx0ZXIoZnVuY3Rpb24gKGFfbWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGFfbWF0Y2gubWF0Y2hlcyhkZXRhaWxzLmZpbHRlcl90byk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTb21lIGhlaWdodCBjaGFuZ2VzIG1heSBvY2N1ciBvdmVyIHRpbWUuIFdhdGNoIGZvciB0cmFuc2l0aW9uc1xuICAgIC8vIGFuZCBzZW5kIGhlaWdodCBhZ2FpbiBvbiBlYWNoIHRyYW5zaXRpb25lbmQgZXZlbnRcbiAgICAvL1xuICAgIC8vIFRPRE86IGludGVncmF0ZSBiZXR0ZXIgaWZyYW1lIHJlc2l6aW5nXG4gICAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF2aWRqYnJhZHNoYXcvaWZyYW1lLXJlc2l6ZXIvdHJlZS9tYXN0ZXIvdGVzdFxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihfdXRpbGl0aWVzVWlfZXZlbnRzMltcImRlZmF1bHRcIl0udHJhbnNpdGlvbl9lbmQsIGhlaWdodF91cGRhdGUpO1xuXG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gX2dldEl0ZXJhdG9yKG1hdGNoZXMpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgbWF0Y2ggPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgYmFpbF9lYXJseSA9IGZhbHNlO1xuICAgICAgICBjbGFzc19saXN0ID0gbWF0Y2guY2xhc3NMaXN0O1xuICAgICAgICBhY3Rpb24gPSBudWxsO1xuXG4gICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWU7XG4gICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjMgPSBmYWxzZTtcbiAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yMyA9IHVuZGVmaW5lZDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBfZ2V0SXRlcmF0b3IoZGV0YWlscy5wcmVjbHVkZSksIF9zdGVwMzsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IChfc3RlcDMgPSBfaXRlcmF0b3IzLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZSkge1xuICAgICAgICAgICAgcHJlY2x1ZGUgPSBfc3RlcDMudmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChjbGFzc19saXN0LmNvbnRhaW5zKHByZWNsdWRlKSkge1xuICAgICAgICAgICAgICBiYWlsX2Vhcmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjMgPSB0cnVlO1xuICAgICAgICAgIF9pdGVyYXRvckVycm9yMyA9IGVycjtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyAmJiBfaXRlcmF0b3IzW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgICAgIF9pdGVyYXRvcjNbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMykge1xuICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJhaWxfZWFybHkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1pbmltdW1fb25lX2NsYXNzX2NoYW5nZSA9IHRydWU7XG5cbiAgICAgICAgYWN0aW9uID0gZGV0YWlscy5qYXZhc2NyaXB0X2FjdGlvbjtcbiAgICAgICAgaWYgKGFjdGlvbikge1xuICAgICAgICAgIGlmICghZXZlbnQuYWRkKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSBhY3Rpb24ucmVwbGFjZSgvYWRkQ2xhc3MvZywgXCJyZW1vdmVDbGFzc1wiKS5yZXBsYWNlKC9jbGFzc0xpc3RcXC5hZGQvZywgXCJjbGFzc0xpc3QucmVtb3ZlXCIpLnJlcGxhY2UoLyh0cnVlfGZhbHNlKS8sIHsgXCJ0cnVlXCI6IFwiZmFsc2VcIiwgXCJmYWxzZVwiOiBcInRydWVcIiB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBldmFsKGFjdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xhc3NfbGlzdFtldmVudC5hZGQgPyBcImFkZFwiIDogXCJyZW1vdmVcIl0oZGV0YWlscy5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9ubHkgdXBkYXRlIG1hcmt1cCBpbiBzb3VyY2Ugd2hlbiB0aGUgbWFya3VwIHNvdXJjZSBpcyBhYm92ZSBpbiB0aGVcbiAgICAgICAgLy8gRE9NIHRyZWUuXG4gICAgICAgIG1hcmt1cF9jaGFuZ2VfaW5fc291cmNlID0gbWFya3VwX2NoYW5nZV9pbl9zb3VyY2UgfHwgJChtYXRjaCkuY2xvc2VzdChzZWxmLm1hcmt1cF9zb3VyY2UpLmxlbmd0aCA+IDA7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjJbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICBfaXRlcmF0b3IyW1wicmV0dXJuXCJdKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWFya3VwX2NoYW5nZV9pbl9zb3VyY2UpIHtcbiAgICAgIHNlbmRfbWFya3VwKCk7XG4gICAgfVxuXG4gICAgaWYgKG1pbmltdW1fb25lX2NsYXNzX2NoYW5nZSkge1xuICAgICAgLy8gUGFzcyBhbG9uZyB0aGUgY2xhc3MgY2hhbmdlIGV2ZW50XG4gICAgICBjb21tdW5pY2F0b3IudHJpZ2dlcihldmVudC50eXBlLCBldmVudCk7XG4gICAgICBoZWlnaHRfdXBkYXRlKCk7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKF91dGlsaXRpZXNVaV9ldmVudHMyW1wiZGVmYXVsdFwiXS50cmFuc2l0aW9uX2VuZCwgaGVpZ2h0X3VwZGF0ZSk7XG4gICAgfSwgSEVJR0hUX0NIQU5HRV9XQVRDSF9EVVJBVElPTik7XG4gIH07XG5cbiAgY29tbXVuaWNhdG9yLnJlZ2lzdGVyLmZyb21fbm9kZShub2RlKTtcbiAgY29tbXVuaWNhdG9yLm9uKF91dGlsaXRpZXNFdmVudHMyW1wiZGVmYXVsdFwiXS50eXBlcy5oZWlnaHRfcmVxdWVzdCwgaGVpZ2h0X3VwZGF0ZSk7XG4gIGNvbW11bmljYXRvci5vbihfdXRpbGl0aWVzRXZlbnRzMltcImRlZmF1bHRcIl0udHlwZXMubWFya3VwX3JlcXVlc3QsIHNlbmRfbWFya3VwKTtcbiAgY29tbXVuaWNhdG9yLm9uKF91dGlsaXRpZXNFdmVudHMyW1wiZGVmYXVsdFwiXS50eXBlcy5jbGFzc19jaGFuZ2UsIGFwcGx5X2NsYXNzX2NoYW5nZSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGVpZ2h0X3VwZGF0ZSk7XG4gIHNldEludGVydmFsKGhlaWdodF91cGRhdGUsIEhFSUdIVF9DSEFOR0VfV0FUQ0hfRFVSQVRJT04pO1xuXG4gIGhlaWdodF91cGRhdGUoKTtcbiAgYWxsb2NhdGVfbWluaW11bV9oZWlnaHQobm9kZSk7XG4gIHNldF9jb3JyZWN0X2JhY2tncm91bmRfY29sb3Iobm9kZSk7XG5cbiAgcmV0dXJuIHt9O1xufTtcblxuLy8qXG4vLyBJbml0aWFsaXplcyB0aGUgYERlbW9gIGNvbXBvbmVudC5cbi8vXG4vLyBAbWV0aG9kXG4vLyBAc3RhdGljXG4vL1xuLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gW2NvbnRleHQgPSBkb2N1bWVudF0gLSBUaGUgY29udGV4dCBpbiB3aGljaCB0byBzZWFyY2hcbi8vIGZvciBET00gbm9kZXMgdGhhdCBzaG91bGQgYmUgdXNlZCBhcyB0aGUgcm9vdCBvZiBhbiBgRGVtb2AgY29tcG9uZW50LlxuXG5EZW1vLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjb250ZXh0ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQgOiBhcmd1bWVudHNbMF07XG5cbiAgdmFyIGRlbW8sXG4gICAgICBkZW1vcyA9IF9BcnJheSRmcm9tKGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChcIi5cIiArIGNsYXNzZXMucm9vdCkpO1xuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3I0ID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvcjQgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3I0ID0gX2dldEl0ZXJhdG9yKGRlbW9zKSwgX3N0ZXA0OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gKF9zdGVwNCA9IF9pdGVyYXRvcjQubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlKSB7XG4gICAgICBkZW1vID0gX3N0ZXA0LnZhbHVlO1xuICAgICAgRGVtbyhkZW1vKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yNCA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3I0ID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ICYmIF9pdGVyYXRvcjRbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgX2l0ZXJhdG9yNFtcInJldHVyblwiXSgpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I0KSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRGVtbztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbn0se1wiLi4vLi4vdXRpbGl0aWVzL2V2ZW50c1wiOjI2LFwiLi4vLi4vdXRpbGl0aWVzL3VpX2V2ZW50c1wiOjM2LFwiLi4vaWZyYW1lXCI6NyxcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tXCI6NDEsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCI6NDIsXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIjo1NH1dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy8gICAgICAgIF9fXyAgICAgICAgICBfX18gICAgICAgICBfX18gICAgICAgICAgICAgICAgICAgX19fICAgICAgICBfX19fXyAgICAgICAgX19fICAgICAgICBfX19fX1xuLy8gICAgICAgLyAgL1xcICAgICAgICAvX18vfCAgICAgICAvICAvXFwgICAgICAgICAgICAgICAgIC8gIC9cXCAgICAgIC8gIC86OlxcICAgICAgLyAgL1xcICAgICAgLyAgLzo6XFxcbi8vICAgICAgLyAgLzovXyAgICAgIHwgIHw6fCAgICAgIC8gIC86OlxcICAgICAgICAgICAgICAgLyAgLzo6XFwgICAgLyAgLzovXFw6XFwgICAgLyAgLzovXyAgICAvICAvOi9cXDpcXFxuLy8gICAgIC8gIC86LyAvXFwgICAgIHwgIHw6fCAgICAgLyAgLzovXFw6XFxfX18gICAgIF9fXyAgLyAgLzovXFw6XFwgIC8gIC86LyAgXFw6XFwgIC8gIC86LyAvXFwgIC8gIC86LyAgXFw6XFxcbi8vICAgIC8gIC86LyAvOi9fICBfX3xfX3w6fCAgICAvICAvOi9+LzovX18vXFwgICAvICAvXFwvICAvOi8gIFxcOlxcL19fLzovIFxcX19cXDp8LyAgLzovIC86L18vX18vOi8gXFxfX1xcOnxcbi8vICAgL19fLzovIC86LyAvXFwvX18vOjo6OlxcX19fL19fLzovIC86L1xcICBcXDpcXCAvICAvOi9fXy86LyBcXF9fXFw6XFwgIFxcOlxcIC8gIC86L19fLzovIC86LyAvXFwgIFxcOlxcIC8gIC86L1xuLy8gICBcXCAgXFw6XFwvOi8gLzovICAgflxcfn5cXDo6Ojp8ICBcXDpcXC86LyAgXFwgIFxcOlxcICAvOi9cXCAgXFw6XFwgLyAgLzovXFwgIFxcOlxcICAvOi9cXCAgXFw6XFwvOi8gLzovXFwgIFxcOlxcICAvOi9cbi8vICAgIFxcICBcXDo6LyAvOi8gICAgIHx+fnw6fH5+IFxcICBcXDo6LyAgICBcXCAgXFw6XFwvOi8gIFxcICBcXDpcXCAgLzovICBcXCAgXFw6XFwvOi8gIFxcICBcXDo6LyAvOi8gIFxcICBcXDpcXC86L1xuLy8gICAgIFxcICBcXDpcXC86LyAgICAgIHwgIHw6fCAgICBcXCAgXFw6XFwgICAgIFxcICBcXDo6LyAgICBcXCAgXFw6XFwvOi8gICAgXFwgIFxcOjovICAgIFxcICBcXDpcXC86LyAgICBcXCAgXFw6Oi9cbi8vICAgICAgXFwgIFxcOjovICAgICAgIHwgIHw6fCAgICAgXFwgIFxcOlxcICAgICBcXF9fXFwvICAgICAgXFwgIFxcOjovICAgICAgXFxfX1xcLyAgICAgIFxcICBcXDo6LyAgICAgIFxcX19cXC9cbi8vICAgICAgIFxcX19cXC8gICAgICAgIHxfX3wvICAgICAgIFxcX19cXC8gICAgICAgICAgICAgICAgIFxcX19cXC8gICAgICAgICAgICAgICAgICAgXFxfX1xcL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lLXByb3BlcnR5XCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9yZWdlbmVyYXRvclJ1bnRpbWUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfZ2V0SXRlcmF0b3IgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfT2JqZWN0JGtleXMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9BcnJheSRmcm9tID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9PYmplY3QkYXNzaWduID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF91dGlsaXRpZXNVaV9ldmVudHMgPSByZXF1aXJlKFwiLi4vLi4vdXRpbGl0aWVzL3VpX2V2ZW50c1wiKTtcblxudmFyIF91dGlsaXRpZXNVaV9ldmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbGl0aWVzVWlfZXZlbnRzKTtcblxudmFyIF91dGlsaXRpZXNDbGllbnQgPSByZXF1aXJlKFwiLi4vLi4vdXRpbGl0aWVzL2NsaWVudFwiKTtcblxudmFyIF91dGlsaXRpZXNDbGllbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbGl0aWVzQ2xpZW50KTtcblxudmFyIF91dGlsaXRpZXNCdWlsZGVyID0gcmVxdWlyZShcIi4uLy4uL3V0aWxpdGllcy9idWlsZGVyXCIpO1xuXG52YXIgX3V0aWxpdGllc0J1aWxkZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbGl0aWVzQnVpbGRlcik7XG5cbnZhciBfdXRpbGl0aWVzTnVtYmVycyA9IHJlcXVpcmUoXCIuLi8uLi91dGlsaXRpZXMvbnVtYmVyc1wiKTtcblxudmFyIF91dGlsaXRpZXNQYWludGluZyA9IHJlcXVpcmUoXCIuLi8uLi91dGlsaXRpZXMvcGFpbnRpbmdcIik7XG5cbnZhciBjbGFzc2VzID0ge1xuICByb290OiBcImV4cGxvZGVkXCIsXG4gIHN0cnVjdHVyZTogXCJleHBsb2RlZF9fc3RydWN0dXJlXCIsXG4gIGNvbnRlbnQ6IFwiZXhwbG9kZWRfX3N0cnVjdHVyZV9fY29udGVudFwiLFxuICBzb3VyY2U6IFwiZXhwbG9kZWRfX3NvdXJjZVwiLFxuICBwYW5lOiBcImV4cGxvZGVkX19wYW5lXCJcbn07XG5cbnZhciBzdGF0ZXMgPSB7XG4gIHJvb3Q6IHtcbiAgICBpbml0aWFsaXplZDogY2xhc3Nlcy5yb290ICsgXCItLWlzLWJlaW5nLWluaXRpYWxpemVkXCJcbiAgfSxcblxuICBwYW5lOiB7XG4gICAgaG92ZXJlZDogY2xhc3Nlcy5wYW5lICsgXCItLWlzLWhvdmVyZWRcIixcbiAgICBzZWxlY3RlZDogY2xhc3Nlcy5wYW5lICsgXCItLWlzLXNlbGVjdGVkXCJcbiAgfVxufTtcblxudmFyIGF0dHJzID0ge1xuICBpZDogXCJkYXRhLWV4cGxvc2lvbi1pZFwiLFxuICBub2RlOiBcImRhdGEtZXhwbG9zaW9uLW5vZGVcIixcbiAgcmFuZ2VfYXR0cjogXCJkYXRhLWV4cGxvc2lvbi1hdHRyaWJ1dGVcIlxufTtcblxudmFyIGV2ZW50cyA9IHtcbiAgcGFuZV9zZWxlY3RlZDogY2xhc3Nlcy5yb290ICsgXCI6cGFuZS1zZWxlY3RlZFwiXG59O1xuXG52YXIgTEFZRVJfR0FQID0gNDA7XG5cbnZhciBjbG9uZSwgaW5pdGlhbGl6ZV9wYW5lcywgaW5pdGlhbGl6ZV9yYW5nZXMsIHJlc2V0LCBzdGFydF9kcmFnZ2luZywgcm90YXRlX2J5LCB1cGRhdGVfcGFuZXMsIG5vZGVfZm9yX3BhbmUsIG1haW5fY2xhc3NfZm9yX25vZGUsIEV4cGxvZGVkO1xuXG4vLypcbi8vIEluaXRpYWxpemVzIHRoZSBwYW5lcyBmb3IgYW4gZXhwbG9zaW9uLiBUaGlzIGRvZXMgYWxsIG9mIHRoZSByZXF1aXJlZFxuLy8gY2xvbmluZywgc3RvcmVzIHRoZSByZXN1bHRpbmcgcGFuZXMgb24gdGhlIHNlY3JldHMgb2JqZWN0LCBhbmQgcGVyZm9ybXMgYW5cbi8vIGluaXRpYWwgcm90YXRpb24uXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhbiBgRXhwbG9kZWRgLlxuLy8gQHByaXZhdGVcblxuaW5pdGlhbGl6ZV9wYW5lcyA9IGZ1bmN0aW9uIGNhbGxlZSQwJDAoc2VsZikge1xuICB2YXIgc291cmNlLCBzdHJ1Y3R1cmU7XG4gIHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLmFzeW5jKGZ1bmN0aW9uIGNhbGxlZSQwJDAkKGNvbnRleHQkMSQwKSB7XG4gICAgd2hpbGUgKDEpIHN3aXRjaCAoY29udGV4dCQxJDAucHJldiA9IGNvbnRleHQkMSQwLm5leHQpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgc291cmNlID0gc2VsZi5zb3VyY2U7XG4gICAgICAgIHN0cnVjdHVyZSA9IHNlbGYuc3RydWN0dXJlO1xuXG4gICAgICAgIGlmICghKHNvdXJjZS5jaGlsZHJlblswXS5jaGlsZHJlbi5sZW5ndGggPCAxKSkge1xuICAgICAgICAgIGNvbnRleHQkMSQwLm5leHQgPSA0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbnRleHQkMSQwLmFicnVwdChcInJldHVyblwiKTtcblxuICAgICAgY2FzZSA0OlxuXG4gICAgICAgIHJlc2V0KHNlbGYpO1xuXG4gICAgICAgIHNlbGYucGFuZXMgPSBjbG9uZShzb3VyY2UuY2hpbGRyZW5bMF0sIHN0cnVjdHVyZS5jaGlsZHJlblswXSk7XG4gICAgICAgIHNlbGYuc3ByZWFkID0gMTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIGNhbGxlZSQxJDAoKSB7XG4gICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvclJ1bnRpbWUuYXN5bmMoZnVuY3Rpb24gY2FsbGVlJDEkMCQoY29udGV4dCQyJDApIHtcbiAgICAgICAgICAgIHdoaWxlICgxKSBzd2l0Y2ggKGNvbnRleHQkMiQwLnByZXYgPSBjb250ZXh0JDIkMC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBjb250ZXh0JDIkMC5uZXh0ID0gMjtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yUnVudGltZS5hd3JhcChfdXRpbGl0aWVzVWlfZXZlbnRzMltcImRlZmF1bHRcIl0udHJhbnNpdGlvbihzZWxmLm5vZGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHNlbGYubm9kZS5jbGFzc0xpc3QuYWRkKHN0YXRlcy5yb290LmluaXRpYWxpemVkKTtcbiAgICAgICAgICAgICAgICAgIHJvdGF0ZV9ieSgyMCwgNSwgc2VsZik7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcblxuICAgICAgICAgICAgICAgIHNlbGYubm9kZS5jbGFzc0xpc3QucmVtb3ZlKHN0YXRlcy5yb290LmluaXRpYWxpemVkKTtcblxuICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dCQyJDAuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIG51bGwsIHRoaXMpO1xuICAgICAgICB9LCA0MDApO1xuXG4gICAgICBjYXNlIDg6XG4gICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgIHJldHVybiBjb250ZXh0JDEkMC5zdG9wKCk7XG4gICAgfVxuICB9LCBudWxsLCB0aGlzKTtcbn07XG5cbi8vKlxuLy8gSW5pdGlhbGl6ZXMgdGhlIHJhbmdlcyB3aXRoaW4gYW4gYEV4cGxvZGVkYCB0byBwZXJmb3JtIHRoZWlyIGFjdGlvbi4gVGhpc1xuLy8gZnVuY3Rpb24gYWxzbyBjb250YWlucyB0aGUgZGVmaW5pdGlvbnMgb2YgdGhlIHBvc3NpYmxlIGFjdGlvbnMgZm9yIGEgcmFuZ2UsXG4vLyB0aGUgYGF0dHJzLnJhbmdlX2F0dHJgIHZhbHVlIHRoYXQgd2lsbCBnaXZlIHRoYXQgYmVoYXZpb3IgdG8gYSByYW5nZSwgYW5kXG4vLyB0aGUgYWN0dWFsIGV2ZW50IGhhbmRsZXJzIGZvciB3aGVuIHRoZSByYW5nZSBjaGFuZ2VzIHZhbHVlcy5cbi8vXG4vLyBAcGFyYW0ge09iamVjdH0gc2VsZiAtIFRoZSBpbnRlcm5hbCBkZXRhaWxzIG9mIGFuIGBFeHBsb2RlZGAuXG4vLyBAcHJpdmF0ZVxuXG5pbml0aWFsaXplX3JhbmdlcyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBfcmFuZ2VzLCBfaGFuZGxlcnM7XG5cbiAgdmFyIGFjdGlvbnMsIHJhbmdlcywgcGVyY2VudGFnZV9mcm9tX2NlbnRlciwgaGFuZGxlcnMsIGNyZWF0ZV9yYW5nZV9saXN0ZW5lcjtcblxuICBhY3Rpb25zID0ge1xuICAgIGdhcDogXCJwYW5lLWdhcFwiLFxuICAgIHBlcnNwZWN0aXZlOiBcInBlcnNwZWN0aXZlXCJcbiAgfTtcblxuICByYW5nZXMgPSAoX3JhbmdlcyA9IHt9LCBfZGVmaW5lUHJvcGVydHkoX3JhbmdlcywgYWN0aW9ucy5nYXAsIHsgbWluOiAwLjI1LCBtYXg6IDIsIFwiZGVmYXVsdFwiOiAxIH0pLCBfZGVmaW5lUHJvcGVydHkoX3JhbmdlcywgYWN0aW9ucy5wZXJzcGVjdGl2ZSwgeyBtaW46IDUwMCwgbWF4OiA0MDAwLCBcImRlZmF1bHRcIjogMjAwMCB9KSwgX3Jhbmdlcyk7XG5cbiAgLy8qXG4gIC8vIENhbGN1bGF0ZXMgdGhlIGRpZmZlcmVuY2UgYSB2YWx1ZSBmcm9tIDAtMTAwIGlzIGZyb20gNTAsIHRoZW4gbm9ybWFsaXplcyB0aGF0XG4gIC8vIHZhbHVlIGZvciBob3cgY2xvc2UgaXQgaXMgdG8gdGhlIGNlbnRlci4gU28sIHZhbHVlcyBjbG9zZSB0byA1MCB3aWxsIGJlIGNsb3NlLFxuICAvLyB0byAwLCB3aGlsZSAwIGFuZCAxMDAgd2lsbCBiZSAtMSBhbmQgMSwgcmVzcGVjdGl2ZWx5LlxuICAvL1xuICAvLyBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBUaGUgbnVtYmVyIG9uIGEgc2NhbGUgb2YgMC0xMDAuXG4gIC8vIEBwcml2YXRlXG4gIC8vIEByZXR1cm5zIE51bWJlclxuXG4gIHBlcmNlbnRhZ2VfZnJvbV9jZW50ZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gKHBhcnNlSW50KHZhbHVlLCAxMCkgLyAxMDAgLSAwLjUpIC8gMC41O1xuICB9O1xuXG4gIGhhbmRsZXJzID0gKF9oYW5kbGVycyA9IHt9LCBfZGVmaW5lUHJvcGVydHkoX2hhbmRsZXJzLCBhY3Rpb25zLmdhcCwgZnVuY3Rpb24gKHNlbGYsIGV2ZW50KSB7XG4gICAgdmFyIHJhbmdlID0gcmFuZ2VzW2FjdGlvbnMuZ2FwXSxcbiAgICAgICAgc3ByZWFkX2Zyb21fY2VudGVyID0gcGVyY2VudGFnZV9mcm9tX2NlbnRlcihldmVudC50YXJnZXQudmFsdWUpO1xuXG4gICAgaWYgKHNwcmVhZF9mcm9tX2NlbnRlciA8IDApIHtcbiAgICAgIHNlbGYuc3ByZWFkID0gcmFuZ2VbXCJkZWZhdWx0XCJdICsgc3ByZWFkX2Zyb21fY2VudGVyICogKHJhbmdlW1wiZGVmYXVsdFwiXSAtIHJhbmdlLm1pbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuc3ByZWFkID0gcmFuZ2VbXCJkZWZhdWx0XCJdICsgc3ByZWFkX2Zyb21fY2VudGVyICogKHJhbmdlLm1heCAtIHJhbmdlW1wiZGVmYXVsdFwiXSk7XG4gICAgfVxuXG4gICAgdXBkYXRlX3BhbmVzKHNlbGYpO1xuICB9KSwgX2RlZmluZVByb3BlcnR5KF9oYW5kbGVycywgYWN0aW9ucy5wZXJzcGVjdGl2ZSwgZnVuY3Rpb24gKHNlbGYsIGV2ZW50KSB7XG4gICAgdmFyIHJhbmdlID0gcmFuZ2VzW2FjdGlvbnMucGVyc3BlY3RpdmVdLFxuICAgICAgICBzcHJlYWRfZnJvbV9jZW50ZXIgPSBwZXJjZW50YWdlX2Zyb21fY2VudGVyKGV2ZW50LnRhcmdldC52YWx1ZSksXG4gICAgICAgIHBlcnNwZWN0aXZlO1xuXG4gICAgaWYgKHNwcmVhZF9mcm9tX2NlbnRlciA+IDApIHtcbiAgICAgIHBlcnNwZWN0aXZlID0gcmFuZ2VbXCJkZWZhdWx0XCJdIC0gc3ByZWFkX2Zyb21fY2VudGVyICogKHJhbmdlW1wiZGVmYXVsdFwiXSAtIHJhbmdlLm1pbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBlcnNwZWN0aXZlID0gcmFuZ2VbXCJkZWZhdWx0XCJdIC0gc3ByZWFkX2Zyb21fY2VudGVyICogKHJhbmdlLm1heCAtIHJhbmdlW1wiZGVmYXVsdFwiXSk7XG4gICAgfVxuXG4gICAgc2VsZi5zdHJ1Y3R1cmUuc3R5bGUucGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZSArIFwicHhcIjtcbiAgfSksIF9oYW5kbGVycyk7XG5cbiAgY3JlYXRlX3JhbmdlX2xpc3RlbmVyID0gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGhhbmRsZXJzW2FjdGlvbl0oc2VsZiwgZXZlbnQpO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChzZWxmKSB7XG4gICAgdmFyIHJhbmdlX25vZGU7XG5cbiAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9nZXRJdGVyYXRvcihfT2JqZWN0JGtleXMoYWN0aW9ucykpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgIHZhciBfbmFtZSA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgIHZhciBhY3Rpb24gPSBhY3Rpb25zW19uYW1lXTtcbiAgICAgICAgcmFuZ2Vfbm9kZSA9IHNlbGYubm9kZS5xdWVyeVNlbGVjdG9yKFwiW1wiICsgYXR0cnMucmFuZ2VfYXR0ciArIFwiPVxcXCJcIiArIGFjdGlvbiArIFwiXFxcIl1cIik7XG5cbiAgICAgICAgaWYgKCFyYW5nZV9ub2RlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgcmFuZ2Vfbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgY3JlYXRlX3JhbmdlX2xpc3RlbmVyKGFjdGlvbikpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICBfaXRlcmF0b3JbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59KSgpO1xuXG4vLypcbi8vIFJlc2V0cyB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgYW4gYEV4cGxvZGVkYC5cbi8vXG4vLyBAcGFyYW0ge09iamVjdH0gc2VsZiAtIFRoZSBpbnRlcm5hbCBkZXRhaWxzIG9mIGFuIGBFeHBsb2RlZGAuXG4vLyBAcHJpdmF0ZVxuXG5yZXNldCA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gIHNlbGYucm90YXRpb24gPSB7IHg6IDAsIHk6IDAsIHo6IDAgfTtcbiAgc2VsZi5zb3VyY2Uuc3R5bGUuZGlzcGxheSA9IG51bGw7XG4gIHNlbGYuc3RydWN0dXJlLmNoaWxkcmVuWzBdLmlubmVySFRNTCA9IFwiXCI7XG59O1xuXG4vLypcbi8vIENyZWF0ZXMgdGhlIGNsb25lIHJlcHJlc2VudGF0aW9ucyBvZiB0aGUgY29udGVudCBvZiBgZnJvbWAgaW50byB0aGUgY29udGFpbmVyXG4vLyBgdG9gLiBUaGlzIGlzIGRvbmUgYnkgZGV0ZXJtaW5pbmcgdGhlIHBvc2l0aW9uIG9mIGVhY2ggZGVzY2VuZGFudCBvZiBgZnJvbWBcbi8vIHJlbGF0aXZlIHRvIHRoZSBgZnJvbWAgY29udGFpbmVyIGl0c2VsZiwgYW5kIHRoZW4gYWJzb2x1dGVseSBwb3NpdGlvbmluZyBhblxuLy8gYGV4cGxvZGVkX19wYW5lYCBhdCB0aGUgc2FtZSByZWxhdGl2ZSBwb3NpdGlvbiBpbiBgdG9gLiBJbiBvcmRlciB0byBwcmVzZW50XG4vLyBhIHVzZWZ1bCBkaWFncmFtLCB0aGUgRE9NIGxldmVsIG9mIGVhY2ggbm9kZSBpcyBjYXB0dXJlZCBhbmQgaXMgdXNlZCB0byBzdGFja1xuLy8gdGhlIHBhbmVzIGluIHRoZSB6LWF4aXMuIEFkZGl0aW9uYWxseSwgYW55IG92ZXJsYXAgYmV0d2VlbiBzaWJsaW5ncyBzaG91bGRcbi8vIGJlIHJlY29yZGVkIGFuZCByZXNvbHZlZCBieSBhZGRpbmcgYSBzbWFsbCBhZGp1c3RtZW50IHRvIHRoZSB6LWluZGV4XG4vLyBzdGFja2luZyBvZiB0aG9zZSBwYW5lcy5cbi8vXG4vLyBAcGFyYW0ge0hUTUxFbGVtZW50fSBmcm9tIC0gVGhlIG5vZGUgY29udGFpbmluZyB0aGUgc291cmNlIERPTSB0cmVlLlxuLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gdG8gICAtIFRoZSBub2RlIGluIHdoaWNoIHRvIGNyZWF0ZSB0aGUgY2xvbmVkIHByZXNlbnRhdGlvbi5cbi8vXG4vLyBAcHJpdmF0ZVxuLy9cbi8vIEByZXR1cm5zIEFycmF5XG4vLyBBbiBhcnJheSBvZiBvYmplY3RzIHJlcHJlc2VudGluZyB0aGUgY2xvbmVkIHBhbmVzLiBFYWNoIG9iamVjdCBoYXMgYSBgbm9kZWAsXG4vLyBgbGV2ZWxgLCBhbmQgYGFkanVzdG1lbnRgIHByb3BlcnR5IHNvIHRoYXQgZnV0dXJlIHRyYW5zbGF0aW9ucyBjYW4gYmUgZG9uZVxuLy8gcGVyZm9ybWFudGx5LlxuXG5jbG9uZSA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBleHBsb3Npb25faWQgPSAwLFxuICAgICAgZGVzdGluYXRpb24sXG4gICAgICBwYW5lX2NvdW50LFxuICAgICAgd2lkdGhzLFxuICAgICAgY2xvbmVfbGV2ZWwsXG4gICAgICBvcmlnaW5hbF9vZmZzZXQsXG4gICAgICBwYW5lcyxcbiAgICAgIHByZXBhcmVfZm9yX2Nsb25pbmcsXG4gICAgICBhcHBlbmRfY2xvbmUsXG4gICAgICBhcHBlbmRfYWxsX2Nsb25lcyxcbiAgICAgIGNsb25lX25vZGUsXG4gICAgICBmaW5kX292ZXJsYXBzLFxuICAgICAgc3RhY2tfc2libGluZ3M7XG5cbiAgLy8qXG4gIC8vIFJlc2V0cyB0aGUgaW50ZXJuYWwgaW5mb3JtYXRpb24gdXNlZCB0byBwZXJmb3JtIGV4cGxvc2lvbnMuXG4gIC8vXG4gIC8vIEBwcml2YXRlXG5cbiAgcHJlcGFyZV9mb3JfY2xvbmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICBleHBsb3Npb25faWQgKz0gMTtcbiAgICBwYW5lX2NvdW50ID0gMDtcbiAgICBjbG9uZV9sZXZlbCA9IDA7XG4gICAgcGFuZXMgPSBbXTtcbiAgICBkZXN0aW5hdGlvbiA9IG51bGw7XG4gICAgb3JpZ2luYWxfb2Zmc2V0ID0gbnVsbDtcblxuICAgIHdpZHRocyA9IHtcbiAgICAgIG1pbjogSW5maW5pdHksXG4gICAgICBtYXg6IDBcbiAgICB9O1xuICB9O1xuXG4gIC8vKlxuICAvLyBBcHBlbmRzIGEgbmV3IHBhbmUgd2l0aCB0aGUgcHJvdmlkZWQgZGltZW5zaW9ucyB0byB0aGUgYHRvYCBub2RlLlxuICAvL1xuICAvLyBAcGFyYW0ge09iamVjdH0gZGltcyAtIFRoZSBkaW1lbnNpb25zIG9mIHRoZSBjbG9uZWQgbm9kZS4gU2hvdWxkIGhhdmVcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICBgd2lkdGhgLCBgaGVpZ2h0YCwgYGxlZnRgLCBgdG9wYCwgYGxldmVsYCwgYW5kXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgYGFkanVzdG1lbnRgIHByb3BlcnRpZXMuXG4gIC8vIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRvIC0gVGhlIG5vZGUgaW4gd2hpY2ggdG8gYXBwZW5kIHRoZSBuZXcgcGFuZS5cbiAgLy9cbiAgLy8gQHByaXZhdGVcbiAgLy8gQHJldHVybnMgSFRNTEVsZW1lbnQgLSBUaGUgY2xvbmVkIG5vZGUuXG5cbiAgYXBwZW5kX2Nsb25lID0gZnVuY3Rpb24gKGRpbXMsIHRvKSB7XG4gICAgdmFyIHBhcmVudF93aWR0aCA9IGRlc3RpbmF0aW9uLm9mZnNldFdpZHRoLFxuICAgICAgICBwYXJlbnRfaGVpZ2h0ID0gZGVzdGluYXRpb24ub2Zmc2V0SGVpZ2h0LFxuICAgICAgICBub2RlID0gJChcIjxkaXYgY2xhc3M9J1wiICsgY2xhc3Nlcy5wYW5lICsgXCInIHN0eWxlPSdoZWlnaHQ6IFwiICsgZGltcy5oZWlnaHQgKyBcInB4OyB3aWR0aDogXCIgKyBkaW1zLndpZHRoICsgXCJweDsgdG9wOiBcIiArIGRpbXMudG9wICsgXCJweDsgbGVmdDogXCIgKyBkaW1zLmxlZnQgKyBcInB4OyB0cmFuc2Zvcm0tb3JpZ2luOiBcIiArIChwYXJlbnRfd2lkdGggLyAyIC0gZGltcy5sZWZ0KSArIFwicHggXCIgKyAocGFyZW50X2hlaWdodCAvIDIgLSBkaW1zLnRvcCkgKyBcInB4IFwiICsgTEFZRVJfR0FQICsgXCJweDsnIC8+XCIpWzBdO1xuXG4gICAgdG8uYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgLy8qXG4gIC8vIEFwcGVuZHMgYWxsIG9mIHRoZSByZXF1aXJlZCBwYW5lcyB0byB0aGUgYHRvYCBub2RlIHBhc3NlZCB0b1xuICAvLyBbYGNsb25lYF0oQGxpbmspLlxuICAvL1xuICAvLyBAcHJpdmF0ZVxuXG4gIGFwcGVuZF9hbGxfY2xvbmVzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcbiAgICAgICAgcGFuZTtcblxuICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IF9nZXRJdGVyYXRvcihwYW5lcyksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICBwYW5lID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgIHBhbmUuY2xvbmUgPSBhcHBlbmRfY2xvbmUocGFuZSwgZnJhZ21lbnQpO1xuICAgICAgICBwYW5lLmNsb25lLnNldEF0dHJpYnV0ZShhdHRycy5ub2RlLCBwYW5lLmlkKTtcbiAgICAgICAgcGFuZS5jbG9uZS5zdHlsZS56SW5kZXggPSBMQVlFUl9HQVAgKiBwYW5lLmxldmVsICsgKHBhbmUuYWRqdXN0bWVudCB8fCAwKTtcbiAgICAgICAgcGFuZS5ub2RlLnNldEF0dHJpYnV0ZShhdHRycy5pZCwgcGFuZS5pZCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjJbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICBfaXRlcmF0b3IyW1wicmV0dXJuXCJdKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0aW5hdGlvbi5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gIH07XG5cbiAgLy8qXG4gIC8vIEdlbmVyYXRlcyB0aGUgZGV0YWlscyByZXF1aXJlZCB0byBjbG9uZSBhIG5vZGUgYXMgYSBwYW5lLiBUaGVzZSBpbmNsdWRlXG4gIC8vIGl0cyBkaW1lbnNpb25zLCBpdHMgSUQsIHRoZSBub2RlIGl0IGlzIGNsb25pbmcsIGl0cyBsZXZlbCwgYW5kIHdoZXRoZXIgb3JcbiAgLy8gbm90IGl0IGlzIGFjdHVhbGx5IHZpc2libGUuIFRoZXNlIGFyZSBhZGRlZCB0byB0aGUgY2xvc3VyZWQgYHBhbmVzYCBhcnJheVxuICAvLyBzbyB0aGF0IHRoZXkgY2FuIGJlIGVhc2lseSBhY2Nlc3NlZCBieSBvdGhlciBtZXRob2RzLlxuICAvL1xuICAvLyBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIC0gVGhlIHNvdXJjZSBub2RlIHRvIGNsb25lLlxuICAvLyBAcHJpdmF0ZVxuXG4gIGNsb25lX25vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBub2RlX29mZnNldHMgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICBwYW5lLFxuICAgICAgICBjaGlsZDtcblxuICAgIG9yaWdpbmFsX29mZnNldCA9IG9yaWdpbmFsX29mZnNldCB8fCBub2RlLnBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcGFuZV9jb3VudCArPSAxO1xuXG4gICAgLy8gSWYgd2UgaGF2ZSBhIHZpc2libGUgbm9kZVxuICAgIGlmIChub2RlX29mZnNldHMuaGVpZ2h0ICsgbm9kZV9vZmZzZXRzLndpZHRoID4gMikge1xuICAgICAgcGFuZSA9IHtcbiAgICAgICAgaGVpZ2h0OiBub2RlX29mZnNldHMuaGVpZ2h0LFxuICAgICAgICB3aWR0aDogbm9kZV9vZmZzZXRzLndpZHRoLFxuICAgICAgICB0b3A6IG5vZGVfb2Zmc2V0cy50b3AgLSBvcmlnaW5hbF9vZmZzZXQudG9wLFxuICAgICAgICBsZWZ0OiBub2RlX29mZnNldHMubGVmdCAtIG9yaWdpbmFsX29mZnNldC5sZWZ0LFxuICAgICAgICBsZXZlbDogY2xvbmVfbGV2ZWwsXG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgICAgIGlkOiBleHBsb3Npb25faWQgKyBcIi1cIiArIHBhbmVfY291bnRcbiAgICAgIH07XG5cbiAgICAgIHBhbmVzLnB1c2gocGFuZSk7XG5cbiAgICAgIHdpZHRocy5taW4gPSBNYXRoLm1pbihwYW5lLmxlZnQsIHdpZHRocy5taW4pO1xuICAgICAgd2lkdGhzLm1heCA9IE1hdGgubWF4KHBhbmUubGVmdCArIHBhbmUud2lkdGgsIHdpZHRocy5tYXgpO1xuICAgIH1cblxuICAgIGNsb25lX2xldmVsICs9IDE7XG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7XG4gICAgdmFyIF9pdGVyYXRvckVycm9yMyA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gX2dldEl0ZXJhdG9yKF9BcnJheSRmcm9tKG5vZGUuY2hpbGRyZW4pKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7XG4gICAgICAgIGNoaWxkID0gX3N0ZXAzLnZhbHVlO1xuICAgICAgICBjbG9uZV9ub2RlKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kaWRJdGVyYXRvckVycm9yMyA9IHRydWU7XG4gICAgICBfaXRlcmF0b3JFcnJvcjMgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgJiYgX2l0ZXJhdG9yM1tcInJldHVyblwiXSkge1xuICAgICAgICAgIF9pdGVyYXRvcjNbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMykge1xuICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNsb25lX2xldmVsIC09IDE7XG4gIH07XG5cbiAgLy8qXG4gIC8vIEZpbmRzIHBhaXJzIG9mIG5vZGVzIHdob3NlIGRpbWVuc2lvbnMgb3ZlcmxhcCBvbmUgYW5vdGhlci5cbiAgLy9cbiAgLy8gQHBhcmFtIHtBcnJheX0gc2libGluZ3MgLSBUaGUgc2V0IG9mIG5vZGVzIHRvIGNoZWNrIGZvciBvdmVybGFwLlxuICAvLyBAcHJpdmF0ZVxuICAvLyBAcmV0dXJucyBBcnJheSAtIEFuIGFycmF5IG9mIGFycmF5cyB0aGF0IGVhY2ggY29udGFpbiBhIHNldCBvZiB0d29cbiAgLy8gb3ZlcmxhcHBpbmcgbm9kZXMuXG5cbiAgZmluZF9vdmVybGFwcyA9IGZ1bmN0aW9uIChzaWJsaW5ncykge1xuICAgIHZhciBvdmVybGFwcyA9IFtdLFxuICAgICAgICBzaWJsaW5nX2NvdW50ID0gc2libGluZ3MubGVuZ3RoLFxuICAgICAgICBpbmRleCxcbiAgICAgICAgc2libGluZyxcbiAgICAgICAgb3RoZXJfaW5kZXgsXG4gICAgICAgIG90aGVyLFxuICAgICAgICB3aXRoaW5fb3RoZXIsXG4gICAgICAgIG90aGVyX3dpdGhpbixcbiAgICAgICAgY3VzdG9tX2JldHdlZW47XG5cbiAgICBjdXN0b21fYmV0d2VlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdXRpbGl0aWVzTnVtYmVycy5iZXR3ZWVuLmFwcGx5KHVuZGVmaW5lZCwgYXJncy5jb25jYXQoW3sgaW5jbHVkZV9taW46IHRydWUgfV0pKTtcbiAgICB9O1xuXG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgc2libGluZ19jb3VudDsgaW5kZXgrKykge1xuICAgICAgc2libGluZyA9IHNpYmxpbmdzW2luZGV4XTtcblxuICAgICAgZm9yIChvdGhlcl9pbmRleCA9IGluZGV4ICsgMTsgb3RoZXJfaW5kZXggPCBzaWJsaW5nX2NvdW50OyBvdGhlcl9pbmRleCsrKSB7XG4gICAgICAgIG90aGVyID0gc2libGluZ3Nbb3RoZXJfaW5kZXhdO1xuXG4gICAgICAgIG90aGVyX3dpdGhpbiA9IGN1c3RvbV9iZXR3ZWVuKG90aGVyLmxlZnQsIHNpYmxpbmcubGVmdCwgc2libGluZy5sZWZ0ICsgc2libGluZy53aWR0aCkgJiYgY3VzdG9tX2JldHdlZW4ob3RoZXIudG9wLCBzaWJsaW5nLnRvcCwgc2libGluZy50b3AgKyBzaWJsaW5nLmhlaWdodCk7XG5cbiAgICAgICAgd2l0aGluX290aGVyID0gY3VzdG9tX2JldHdlZW4oc2libGluZy5sZWZ0LCBvdGhlci5sZWZ0LCBvdGhlci5sZWZ0ICsgb3RoZXIud2lkdGgpICYmIGN1c3RvbV9iZXR3ZWVuKHNpYmxpbmcudG9wLCBvdGhlci50b3AsIG90aGVyLnRvcCArIG90aGVyLmhlaWdodCk7XG5cbiAgICAgICAgaWYgKG90aGVyX3dpdGhpbiB8fCB3aXRoaW5fb3RoZXIpIHtcbiAgICAgICAgICBvdmVybGFwcy5wdXNoKFtzaWJsaW5nLCBvdGhlcl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBzO1xuICB9O1xuXG4gIC8vKlxuICAvLyBDcmVhdGVzIHRoZSBuZWNlc3NhcnkgYWRqdXN0bWVudHMgdG8gcHJvdmlkZSB6LXNwYWNlIGJldHdlZW4gc2libGluZ3MgdGhhdFxuICAvLyB3b3VsZCBvdGhlcndpc2Ugb3ZlcmxhcCBvbmUgYW5vdGhlciAodGhhdCBpcywgb24gdGhlIHNhbWUgbGV2ZWwgd2l0aCBzb21lXG4gIC8vIG92ZXJsYXBwaW5nIGNvb3JkaW5hdGVzKS4gVGhlc2UgYWRqdXN0bWVudHMgYXJlIGFkZGVkIGRpcmVjdGx5IHRvIHRoZVxuICAvLyBvYmplY3RzIGluIHRoZSBjbG9zdXJlZCBgcGFuZXNgIGFycmF5LlxuICAvL1xuICAvLyBAcHJpdmF0ZVxuXG4gIHN0YWNrX3NpYmxpbmdzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBsZXZlbHMgPSBbXSxcbiAgICAgICAgb3ZlcmxhcHMsXG4gICAgICAgIHBhbmUsXG4gICAgICAgIGxldmVsLFxuICAgICAgICBvdmVybGFwO1xuXG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3I0ID0gZmFsc2U7XG4gICAgdmFyIF9pdGVyYXRvckVycm9yNCA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3I0ID0gX2dldEl0ZXJhdG9yKHBhbmVzKSwgX3N0ZXA0OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gKF9zdGVwNCA9IF9pdGVyYXRvcjQubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlKSB7XG4gICAgICAgIHBhbmUgPSBfc3RlcDQudmFsdWU7XG5cbiAgICAgICAgbGV2ZWxzW3BhbmUubGV2ZWxdID0gbGV2ZWxzW3BhbmUubGV2ZWxdIHx8IFtdO1xuICAgICAgICBsZXZlbHNbcGFuZS5sZXZlbF0ucHVzaChwYW5lKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kaWRJdGVyYXRvckVycm9yNCA9IHRydWU7XG4gICAgICBfaXRlcmF0b3JFcnJvcjQgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgJiYgX2l0ZXJhdG9yNFtcInJldHVyblwiXSkge1xuICAgICAgICAgIF9pdGVyYXRvcjRbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yNCkge1xuICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNSA9IHRydWU7XG4gICAgdmFyIF9kaWRJdGVyYXRvckVycm9yNSA9IGZhbHNlO1xuICAgIHZhciBfaXRlcmF0b3JFcnJvcjUgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yNSA9IF9nZXRJdGVyYXRvcihsZXZlbHMpLCBfc3RlcDU7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjUgPSAoX3N0ZXA1ID0gX2l0ZXJhdG9yNS5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNSA9IHRydWUpIHtcbiAgICAgICAgbGV2ZWwgPSBfc3RlcDUudmFsdWU7XG5cbiAgICAgICAgb3ZlcmxhcHMgPSBmaW5kX292ZXJsYXBzKGxldmVsKTtcblxuICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjYgPSB0cnVlO1xuICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3I2ID0gZmFsc2U7XG4gICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjYgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I2ID0gX2dldEl0ZXJhdG9yKG92ZXJsYXBzKSwgX3N0ZXA2OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb242ID0gKF9zdGVwNiA9IF9pdGVyYXRvcjYubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjYgPSB0cnVlKSB7XG4gICAgICAgICAgICBvdmVybGFwID0gX3N0ZXA2LnZhbHVlO1xuXG4gICAgICAgICAgICBvdmVybGFwWzBdLmFkanVzdG1lbnQgPSAtTEFZRVJfR0FQIC8gODtcbiAgICAgICAgICAgIG92ZXJsYXBbMV0uYWRqdXN0bWVudCA9IExBWUVSX0dBUCAvIDg7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjYgPSB0cnVlO1xuICAgICAgICAgIF9pdGVyYXRvckVycm9yNiA9IGVycjtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNiAmJiBfaXRlcmF0b3I2W1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgICAgIF9pdGVyYXRvcjZbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yNikge1xuICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZGlkSXRlcmF0b3JFcnJvcjUgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3I1ID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241ICYmIF9pdGVyYXRvcjVbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICBfaXRlcmF0b3I1W1wicmV0dXJuXCJdKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjUpIHtcbiAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmcm9tLCB0bykge1xuICAgIHZhciBjbG9uZV9yZXN1bHRzID0gW10sXG4gICAgICAgIGNoaWxkLFxuICAgICAgICBwYW5lO1xuXG4gICAgcHJlcGFyZV9mb3JfY2xvbmluZygpO1xuICAgIGRlc3RpbmF0aW9uID0gdG87XG5cbiAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjcgPSB0cnVlO1xuICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjcgPSBmYWxzZTtcbiAgICB2YXIgX2l0ZXJhdG9yRXJyb3I3ID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pdGVyYXRvcjcgPSBfZ2V0SXRlcmF0b3IoX0FycmF5JGZyb20oZnJvbS5jaGlsZHJlbikpLCBfc3RlcDc7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjcgPSAoX3N0ZXA3ID0gX2l0ZXJhdG9yNy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNyA9IHRydWUpIHtcbiAgICAgICAgY2hpbGQgPSBfc3RlcDcudmFsdWU7XG4gICAgICAgIGNsb25lX25vZGUoY2hpbGQpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3I3ID0gdHJ1ZTtcbiAgICAgIF9pdGVyYXRvckVycm9yNyA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNyAmJiBfaXRlcmF0b3I3W1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yN1tcInJldHVyblwiXSgpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I3KSB7XG4gICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I3O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhY2tfc2libGluZ3MoKTtcbiAgICBhcHBlbmRfYWxsX2Nsb25lcygpO1xuXG4gICAgdG8uc3R5bGUubWF4V2lkdGggPSB3aWR0aHMubWF4IC0gd2lkdGhzLm1pbiArIFwicHhcIjtcbiAgICB0by5zdHlsZS5oZWlnaHQgPSBmcm9tLm9mZnNldEhlaWdodCArIFwicHhcIjtcbiAgICBmcm9tLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgZm9yIChwYW5lIGluIHBhbmVzKSB7XG4gICAgICBjbG9uZV9yZXN1bHRzLnB1c2goe1xuICAgICAgICBub2RlOiBwYW5lLmNsb25lLFxuICAgICAgICBsZXZlbDogcGFuZS5sZXZlbCxcbiAgICAgICAgYWRqdXN0bWVudDogcGFuZS5hZGp1c3RtZW50IHx8IDBcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjbG9uZV9yZXN1bHRzO1xuICB9O1xufSkoKTtcblxuLy8qXG4vLyBBdHRhY2hlcyB0aGUgZXZlbnRzIHJlcXVpcmVkIHRvIGhhbmRsZSB0b3VjaGVzIGFuZCBjbGlja3Mgb24gdGhlIGV4cGxvZGVkXG4vLyBzdHJ1Y3R1cmUuIElmIHRoZSBjbGljayBlbmRzIGJlZm9yZSB0aGUgdXNlciBkcmFncyB0aGUgYERSQUdfVEhSRVNIT0xEYFxuLy8gZGlzdGFuY2UsIHRoZSBhY3Rpb24gd2lsbCBiZSB0cmVhdGVkIGFzIGEgY2xpY2sgYW5kIHRoZSBwYW5lIG9uIHdoaWNoIHRoZVxuLy8gdXNlciBjbGlja2VkIHdpbGwgYmUgc2VsZWN0ZWQuIElmIHRoZSB1c2VyIGRyYWdzIG1vcmUgdGhhbiB0aGUgdGhyZXNob2xkLFxuLy8gdGhlIGVudGlyZSBzdHJ1Y3R1cmUgd2lsbCBiZSByb3RhdGVkIGFjY29yZGluZyB0byB0aGUgZGlzdGFuY2UgZHJhZ2dlZC5cbi8vXG4vLyBAcGFyYW0ge09iamVjdH0gc2VsZiAtIFRoZSBpbnRlcm5hbCBkZXRhaWxzIG9mIGFuIGBFeHBsb2RlZGAuXG4vLyBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBUaGUgaW5pdGlhbCBgbW91c2Vkb3duYC8gYHRvdWNoZG93bmAgZXZlbnQuXG4vL1xuLy8gQHByaXZhdGVcbi8vIEByZXR1cm5zIE9iamVjdCAtIFRoZSBsaXN0ZW5lciBvYmplY3Qgd2l0aCBhIGByZW1vdmVgIG1ldGhvZCB0aGF0IGFsbG93cyB0aGVcbi8vICAgICAgICAgICAgICAgICAgIGRyYWcgdG8gYmUgY2xlYW5seSBjYW5jZWxsZWQuXG5cbnN0YXJ0X2RyYWdnaW5nID0gZnVuY3Rpb24gKHNlbGYsIHN0YXJ0X2V2ZW50KSB7XG4gIHZhciBvbGRfY29vcmRpbmF0ZXMgPSBfdXRpbGl0aWVzVWlfZXZlbnRzMltcImRlZmF1bHRcIl0uY29vcmRpbmF0ZXMoc3RhcnRfZXZlbnQpLFxuICAgICAgZHJhZ190aHJlc2hvbGRfbWV0ID0gZmFsc2UsXG4gICAgICBkcmFnLFxuICAgICAgZHJhZ19lbmQ7XG5cbiAgc3RhcnRfZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICBkcmFnID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIG5ld19jb29yZGluYXRlcyA9IF91dGlsaXRpZXNVaV9ldmVudHMyW1wiZGVmYXVsdFwiXS5jb29yZGluYXRlcyhldmVudCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmIChkcmFnX3RocmVzaG9sZF9tZXQpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgcm90YXRlX2J5KChuZXdfY29vcmRpbmF0ZXMueCAtIG9sZF9jb29yZGluYXRlcy54KSAvIDIsIChuZXdfY29vcmRpbmF0ZXMueSAtIG9sZF9jb29yZGluYXRlcy55KSAvIDIsIHNlbGYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnX3RocmVzaG9sZF9tZXQgPSBfdXRpbGl0aWVzVWlfZXZlbnRzMltcImRlZmF1bHRcIl0uY29vcmRpbmF0ZXMuZGlzdGFuY2VfYmV0d2VlbihvbGRfY29vcmRpbmF0ZXMsIG5ld19jb29yZGluYXRlcykgPiBfdXRpbGl0aWVzVWlfZXZlbnRzMltcImRlZmF1bHRcIl0uRFJBR19USFJFU0hPTEQ7XG4gICAgfVxuICB9O1xuXG4gIGRyYWdfZW5kID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKCFkcmFnX3RocmVzaG9sZF9tZXQgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc2VzLnBhbmUpKSB7XG4gICAgICBzZWxmLnNlbGVjdF9wYW5lKGV2ZW50LnRhcmdldCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogTWF5YmUgbW92ZSB0byBoZWxwZXI/XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wb2ludGVyRXZlbnRzID0gbnVsbDtcbiAgfTtcblxuICByZXR1cm4gX3V0aWxpdGllc1VpX2V2ZW50czJbXCJkZWZhdWx0XCJdLmFkZF9kcmFnX2xpc3RlbmVycyhkcmFnLCBkcmFnX2VuZCk7XG59O1xuXG4vLypcbi8vIFJvdGF0ZXMgdGhlIHBhbmVzIG9mIGFuIGBFeHBsb2RlZGAgYnkgdGhlIHBhc3NlZCB4IGFuZCB5IGRlZ3JlZXMuXG4vL1xuLy8gQHBhcmFtIHtOdW1iZXJ9IHggLSBUaGUgZGVncmVlcyBpbiB0aGUgeC1heGlzIHRvIHJvdGF0ZSB0aGUgcGFuZXMuXG4vLyBAcGFyYW0ge051bWJlcn0geSAtIFRoZSBkZWdyZWVzIGluIHRoZSB4LWF4aXMgdG8gcm90YXRlIHRoZSBwYW5lcy4gTm90ZSB0aGF0XG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMgd2lsbCBiZSByZXZlcnNlZCBzbyB0aGF0IHRoZSByb3RhdGlvbiBmZWVscyBuYXR1cmFsLlxuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhbiBgRXhwbG9kZWRgLlxuLy9cbi8vIEBwcml2YXRlXG5cbnJvdGF0ZV9ieSA9IGZ1bmN0aW9uICh4LCB5LCBzZWxmKSB7XG4gIHNlbGYucm90YXRpb24ueCA9IE1hdGgubWF4KE1hdGgubWluKDkwLCAoc2VsZi5yb3RhdGlvbi54ICsgeCkgJSAzNjApLCAtOTApO1xuICBzZWxmLnJvdGF0aW9uLnkgPSBNYXRoLm1heChNYXRoLm1pbig5MCwgKHNlbGYucm90YXRpb24ueSArIHkpICUgMzYwKSwgLTkwKTtcbiAgdXBkYXRlX3BhbmVzKHNlbGYpO1xufTtcblxuLy8qXG4vLyBBcHBsaWVzIHRoZSBjdXJyZW50IHJvdGF0aW9uIHRvIGFsbCBwYW5lcyB3aXRoaW4gYW4gYEV4cGxvZGVkYC4gSXQgd2lsbCBhbHNvXG4vLyBtYWtlIHN1cmUgdGhhdCB0aGUgei10cmFuc2xhdGlvbiBvZiBlYWNoIHBhbmUgaXMgY29ycmVjdCBnaXZlbiBpdHMgbGV2ZWwgaW5cbi8vIHRoZSBvcmlnaW5hbCBzb3VyY2UgdHJlZSBhbmQgaXRzIHN0YWNraW5nIG9yZGVyIGFnYWluc3QgaXRzIHNpYmxpbmdzLlxuLy9cbi8vIEBwYXJhbSB7T2JqZWN0fSBzZWxmIC0gVGhlIGludGVybmFsIGRldGFpbHMgb2YgYW4gYEV4cGxvZGVkYC5cbi8vIEBwcml2YXRlXG5cbnVwZGF0ZV9wYW5lcyA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gIHZhciBfc2VsZiRyb3RhdGlvbiA9IHNlbGYucm90YXRpb247XG4gIHZhciB4ID0gX3NlbGYkcm90YXRpb24ueDtcbiAgdmFyIHkgPSBfc2VsZiRyb3RhdGlvbi55O1xuICB2YXIgaWRlbnRpdHlfbWF0cml4ID0gKDAsIF91dGlsaXRpZXNOdW1iZXJzLk1hdHJpeCkoKTtcbiAgdmFyIHJvdGF0aW9uX21hdHJpeCA9IGlkZW50aXR5X21hdHJpeC5yb3RhdGUoLXksIHgsIDApO1xuICB2YXIgdXBkYXRlcyA9IFtdO1xuICB2YXIgdHJhbnNmb3JtID0gX3V0aWxpdGllc0NsaWVudDJbXCJkZWZhdWx0XCJdLm5hbWVfZm9yKFwidHJhbnNmb3JtXCIpO1xuICB2YXIgel90cmFuc2xhdGU7dmFyIHBhbmU7dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb244ID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yOCA9IGZhbHNlO1xuICB2YXIgX2l0ZXJhdG9yRXJyb3I4ID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG5cbiAgICBmb3IgKHZhciBfaXRlcmF0b3I4ID0gX2dldEl0ZXJhdG9yKHNlbGYucGFuZXMpLCBfc3RlcDg7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjggPSAoX3N0ZXA4ID0gX2l0ZXJhdG9yOC5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uOCA9IHRydWUpIHtcbiAgICAgIHBhbmUgPSBfc3RlcDgudmFsdWU7XG5cbiAgICAgIGlmICghcGFuZS5ub2RlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB6X3RyYW5zbGF0ZSA9IChwYW5lLmxldmVsICogTEFZRVJfR0FQICsgcGFuZS5hZGp1c3RtZW50KSAqIHNlbGYuc3ByZWFkO1xuICAgICAgdXBkYXRlcy5wdXNoKHtcbiAgICAgICAgbm9kZTogcGFuZS5ub2RlLFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0aW9uX21hdHJpeC50cmFuc2xhdGUoMCwgMCwgel90cmFuc2xhdGUpLnRvU3RyaW5nKClcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3I4ID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvcjggPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjggJiYgX2l0ZXJhdG9yOFtcInJldHVyblwiXSkge1xuICAgICAgICBfaXRlcmF0b3I4W1wicmV0dXJuXCJdKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjgpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHVwZGF0ZTtcblxuICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uOSA9IHRydWU7XG4gICAgdmFyIF9kaWRJdGVyYXRvckVycm9yOSA9IGZhbHNlO1xuICAgIHZhciBfaXRlcmF0b3JFcnJvcjkgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yOSA9IF9nZXRJdGVyYXRvcih1cGRhdGVzKSwgX3N0ZXA5OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb245ID0gKF9zdGVwOSA9IF9pdGVyYXRvcjkubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjkgPSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZSA9IF9zdGVwOS52YWx1ZTtcblxuICAgICAgICB1cGRhdGUubm9kZS5zdHlsZVt0cmFuc2Zvcm1dID0gdXBkYXRlLnRyYW5zZm9ybTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kaWRJdGVyYXRvckVycm9yOSA9IHRydWU7XG4gICAgICBfaXRlcmF0b3JFcnJvcjkgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjkgJiYgX2l0ZXJhdG9yOVtcInJldHVyblwiXSkge1xuICAgICAgICAgIF9pdGVyYXRvcjlbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yOSkge1xuICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yOTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG4vLypcbi8vIFJldHVybnMgdGhlIG9yaWdpbmFsIG5vZGUgKGZyb20gdGhlIHNvdXJjZSBjb250ZW50KSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZVxuLy8gcGFzc2VkIHBhbmUuXG4vL1xuLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFuZSAtIFRoZSBleHBsb2RlZCBwYW5lIGZvciB3aGljaCBhIGNvcnJlc3BvbmRpbmcgc291cmNlXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlIHNob3VsZCBiZSBmb3VuZC5cbi8vIEBwcml2YXRlXG4vLyBAcmV0dXJucyB7SFRNTEVsZW1lbnQgfCB1bmRlZmluZWR9IC0gVGhlIGNvcnJlc3BvbmRpbmcgbm9kZSBvciwgaWYgbm9uZSBleGlzdHMsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLlxuXG5ub2RlX2Zvcl9wYW5lID0gZnVuY3Rpb24gKHBhbmUpIHtcbiAgdmFyIG5vZGVfaWQgPSBwYW5lLmdldEF0dHJpYnV0ZShhdHRycy5ub2RlKTtcbiAgaWYgKCFub2RlX2lkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHBhc3NlZCBub2RlIG11c3QgaGF2ZSBhbiBcXFwiXCIgKyBhdHRycy5ub2RlICsgXCJcXFwiIGF0dHJpYnV0ZS5cIik7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbXCIgKyBhdHRycy5pZCArIFwiPSdcIiArIG5vZGVfaWQgKyBcIiddXCIpO1xufTtcblxuLy8gVE9ETzogZ2V0IHRoaXMgb3V0IG9mIGhlcmUuXG5cbi8vKlxuLy8gR2V0cyB0aGUgbWFpbiBjbGFzcyBuYW1lIGZvciBhIGdpdmVuIG5vZGUuXG4vL1xuLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSAtIFRoZSBub2RlIHRvIHJldHJpZXZlIHRoZSBtYWluIGNsYXNzIG5hbWUgZm9yLlxuLy9cbi8vIEBwcml2YXRlXG4vLyBAcmV0dXJucyBTdHJpbmdcblxubWFpbl9jbGFzc19mb3Jfbm9kZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHJldHVybiBub2RlLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpLnNwbGl0KFwiIFwiKVswXTtcbn07XG5cbi8vKlxuLy8gVGhlIGNvbnN0cnVjdG9yIGFyb3VuZCBhbiBleHBsb3Npb24uXG4vL1xuLy8gQGZhY3Rvcnlcbi8vXG4vLyBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIC0gVGhlIGJhc2UgZXhwbG9zaW9uIG5vZGUuXG4vL1xuLy8gQHJldHVybnMgT2JqZWN0IC0gVGhlIEFQSSBmb3IgbWFuaXB1bGF0aW5nIHRoaXMgZXhwbG9zaW9uLCBpbmNsdWRpbmcgbWV0aG9kc1xuLy8gICAgICAgICAgICAgICAgICAgdG8gdXBkYXRlIHRoZSBtYXJrdXAgdG8gZGVtb25zdHJhdGUsIHNlbGVjdGluZyBwYXJ0aWN1bGFyXG4vLyAgICAgICAgICAgICAgICAgICBwYW5lcyBvciBhbGwgcGFuZXMgZm9yIHBhcnRpY3VsYXIgY29tcG9uZW50cywgYW5kIGFkZGluZ1xuLy8gICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzIHRvIHBhbmUgc2VsZWN0aW9uLlxuXG5FeHBsb2RlZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHZhciBzZWxmLCBhcGksIHNldF9tYXJrdXAsIHNlbGVjdF9wYW5lLCBzZWxlY3RfY29tcG9uZW50LCBvbjtcblxuICBzZWxmID0ge1xuICAgIG5vZGU6IG5vZGUsXG4gICAgLy8gVE9ETzogd3JpdGUgYSBzaW1wbGVyIG1ldGhvZCBmb3IgZmluZGluZyBhbGwgb2NjdXJhbmNlcyBvZiBhIGNsYXNzXG4gICAgc3RydWN0dXJlOiBub2RlLnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBjbGFzc2VzLnN0cnVjdHVyZSksXG4gICAgc291cmNlOiBub2RlLnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBjbGFzc2VzLnNvdXJjZSlcbiAgfTtcblxuICAvLypcbiAgLy8gQ2xlYXJzIHRoZSBleGlzdGluZyBleHBsb3Npb24gYW5kIHJlLWluaXRhbGl6ZXMgdGhlIGNvbXBvbmVudCB3aXRoIHRoZSBuZXdcbiAgLy8gbWFya3VwLlxuICAvL1xuICAvLyBAbWV0aG9kXG4gIC8vXG4gIC8vIEBwYXJhbSB7U3RyaW5nfSBtYXJrdXAgLSBUaGUgbmV3IG1hcmt1cCB0byBkZW1vbnN0cmF0ZS5cblxuICBzZXRfbWFya3VwID0gZnVuY3Rpb24gKG1hcmt1cCkge1xuICAgIHNlbGYuc291cmNlLmNoaWxkcmVuWzBdLmlubmVySFRNTCA9IG1hcmt1cDtcbiAgICAoMCwgX3V0aWxpdGllc1BhaW50aW5nLmZvcmNlX3JlcGFpbnQpKG5vZGUpO1xuICAgIGluaXRpYWxpemVfcGFuZXMoc2VsZik7XG4gIH07XG5cbiAgLy8qXG4gIC8vIFNlbGVjdHMgYSBnaXZlbiBwYW5lIGFuZCBlbWl0cyB0aGUgc2VsZWN0ZWQgZXZlbnQuIFRoaXMgZXZlbnQgY2FuIGJlXG4gIC8vIHBpY2tlZCB1cCBieSBvdGhlciBjb21wb25lbnRzIHNvIHRoYXQgdGhleSBjYW4gZGlzcGxheSB1c2VmdWwgaW5mb3JtYXRpb25cbiAgLy8gcmVsYXRlZCB0byB0aGlzIHBhbmUuIFNlZSBbYG9uX3BhbmVfc2VsZWN0YF0oQGxpbmsgRXhwbG9kZWQjb25fcGFuZV9zZWxlY3QpIGZvciBkZXRhaWxzXG4gIC8vIG9uIGF0dGFjaGluZyBsaXN0ZW5lcnMgdG8gcGFuZSBzZWxlY3Rpb24uXG4gIC8vXG4gIC8vIEBtZXRob2RcbiAgLy9cbiAgLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFuZSAtIFRoZSBzZWxlY3RlZCBwYW5lLlxuXG4gIHNlbGVjdF9wYW5lID0gZnVuY3Rpb24gKHBhbmUpIHtcbiAgICB2YXIgcGFuZXMgPSBBcnJheS5pc0FycmF5KHBhbmUpID8gcGFuZSA6IFtwYW5lXSxcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIHJlbGF0ZWRfbm9kZTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjEwID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjEwID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IxMCA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMTAgPSBfZ2V0SXRlcmF0b3Ioc2VsZi5wYW5lcyksIF9zdGVwMTA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjEwID0gKF9zdGVwMTAgPSBfaXRlcmF0b3IxMC5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMTAgPSB0cnVlKSB7XG4gICAgICAgICAgcGFuZSA9IF9zdGVwMTAudmFsdWU7XG4gICAgICAgICAgcGFuZS5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoc3RhdGVzLnBhbmUuc2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IxMCA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMTAgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjEwICYmIF9pdGVyYXRvcjEwW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IxMFtcInJldHVyblwiXSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IxMCkge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IxMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24xMSA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IxMSA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yMTEgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjExID0gX2dldEl0ZXJhdG9yKHBhbmVzKSwgX3N0ZXAxMTsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMTEgPSAoX3N0ZXAxMSA9IF9pdGVyYXRvcjExLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24xMSA9IHRydWUpIHtcbiAgICAgICAgICBwYW5lID0gX3N0ZXAxMS52YWx1ZTtcbiAgICAgICAgICBwYW5lLmNsYXNzTGlzdC5hZGQoc3RhdGVzLnBhbmUuc2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IxMSA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMTEgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjExICYmIF9pdGVyYXRvcjExW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IxMVtcInJldHVyblwiXSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IxMSkge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IxMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICghcGFuZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHBhbmUgPSBwYW5lc1swXTtcbiAgICByZWxhdGVkX25vZGUgPSBub2RlX2Zvcl9wYW5lKHBhbmUpO1xuXG4gICAgLy8gVGhlIGV2ZW50IHByb3ZpZGVzIHRoZSBzZWxlY3RlZCBwYW5lLCB0aGUgcmVsYXRlZCAoc291cmNlKSBub2RlLCBhbmRcbiAgICAvLyB0aGUgY2xhc3Mgb2YgdGhlIG5vZGUgZm9yIGVhc3kgY29tcG9uZW50IGlkZW50aWZpY2F0aW9uLlxuICAgIC8vIFRPRE86IGNsZWFuIHRoaXMgdXAsIGtpbGwgJFxuICAgIGV2ZW50ID0gJC5FdmVudChldmVudHMucGFuZV9zZWxlY3RlZCwge1xuICAgICAgbm9kZTogcmVsYXRlZF9ub2RlLFxuICAgICAgcGFuZTogcGFuZSxcbiAgICAgIGNvbXBvbmVudDogbWFpbl9jbGFzc19mb3Jfbm9kZShyZWxhdGVkX25vZGUpXG4gICAgfSk7XG5cbiAgICAkKG5vZGUpLnRyaWdnZXIoZXZlbnQpO1xuICB9O1xuXG4gIC8vKlxuICAvLyBTZWxlY3RzIHRoZSBwYW5lIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHByb3ZpZGVkIGNvbXBvbmVudC5cbiAgLy9cbiAgLy8gQG1ldGhvZFxuICAvL1xuICAvLyBAcGFyYW0ge1N0cmluZ30gY29tcG9uZW50IC0gVGhlIGNsYXNzIG5hbWUgb2YgdGhlIGNvbXBvbmVudCB0byBzZWxlY3QuXG5cbiAgc2VsZWN0X2NvbXBvbmVudCA9IGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICB2YXIgcGFuZXMgPSBbXSxcbiAgICAgICAgY29tcG9uZW50cyA9IHNlbGYuc291cmNlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIgKyBjb21wb25lbnQpLFxuICAgICAgICBleHBsb3Npb25faWQsXG4gICAgICAgIHBhbmUsXG4gICAgICAgIGV2ZW50O1xuXG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24xMiA9IHRydWU7XG4gICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMTIgPSBmYWxzZTtcbiAgICB2YXIgX2l0ZXJhdG9yRXJyb3IxMiA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IxMiA9IF9nZXRJdGVyYXRvcihjb21wb25lbnRzKSwgX3N0ZXAxMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMTIgPSAoX3N0ZXAxMiA9IF9pdGVyYXRvcjEyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24xMiA9IHRydWUpIHtcbiAgICAgICAgY29tcG9uZW50ID0gX3N0ZXAxMi52YWx1ZTtcblxuICAgICAgICBleHBsb3Npb25faWQgPSBjb21wb25lbnQuZ2V0QXR0cmlidXRlKGF0dHJzLmlkKTtcbiAgICAgICAgcGFuZSA9IG5vZGUucXVlcnlTZWxlY3RvcihcIltcIiArIGF0dHJzLm5vZGUgKyBcIj1cXFwiXCIgKyBleHBsb3Npb25faWQgKyBcIlxcXCJdXCIpO1xuICAgICAgICBpZiAocGFuZSkge1xuICAgICAgICAgIHBhbmVzLnB1c2gocGFuZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kaWRJdGVyYXRvckVycm9yMTIgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3IxMiA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMTIgJiYgX2l0ZXJhdG9yMTJbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICBfaXRlcmF0b3IxMltcInJldHVyblwiXSgpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IxMikge1xuICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMTI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RfcGFuZShwYW5lcyk7XG5cbiAgICAvLyBFdmVudCB3b24ndCBnZXQgdHJpZ2dlcmVkIGJ5IHNlbGVjdF9wYW5lLiBEbyBpdCBoZXJlIGluc3RlYWQuXG4gICAgaWYgKGNvbXBvbmVudHMubGVuZ3RoICYmICFwYW5lcy5sZW5ndGgpIHtcbiAgICAgIGV2ZW50ID0gJC5FdmVudChldmVudHMucGFuZV9zZWxlY3RlZCwge1xuICAgICAgICBub2RlOiBjb21wb25lbnRzWzBdLFxuICAgICAgICBjb21wb25lbnQ6IGNvbXBvbmVudHNbMF0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpWzBdXG4gICAgICB9KTtcblxuICAgICAgJChub2RlKS50cmlnZ2VyKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgLy8qXG4gIC8vIEEgaGVscGVyIG1ldGhvZCB0byBhdHRhY2ggYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGBFeHBsb2RlZGAuXG4gIC8vXG4gIC8vIEBtZXRob2RcbiAgLy9cbiAgLy8gQHBhcmFtIHtTdHJpbmd9IGV2ZW50IC0gVGhlIGV2ZW50IHRvIGxpc3RlbiBmb3IuXG4gIC8vIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAvLyBAcGFyYW0ge09iamVjdH0gY2FsbGJhY2suZXZlbnRcbiAgLy8gVGhlIGV2ZW50IG9iamVjdC4gTW9zdCBpbXBvcnRhbnRseSwgdGhlIGBkZXRhaWxgIHByb3BlcnR5IG9mIHRoaXMgb2JqZWN0XG4gIC8vIGNvbnRhaW5zIHRoZSBzb3VyY2UgYG5vZGVgLCB0aGUgc2VsZWN0ZWQgYHBhbmVgLCBhbmQgdGhlIG5hbWUgb2YgdGhlXG4gIC8vIGBjb21wb25lbnRgIHRoYXQgd2FzIHNlbGVjdGVkLlxuICAvL1xuICAvLyBAcmV0dXJucyBPYmplY3QgLSBBbiBvYmplY3QgdGhhdCBhbGxvd3MgeW91IHRvIGVhc2lseSByZW1vdmUgdGhlIGxpc3RlbmVyXG4gIC8vICAgICAgICAgICAgICAgICAgIHdpdGggdGhlIGAjcmVtb3ZlYCBtZXRob2QuXG5cbiAgb24gPSBmdW5jdGlvbiAoZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgdmFyICRub2RlID0gJChub2RlKTtcbiAgICAkbm9kZS5vbihldmVudCwgY2FsbGJhY2spO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgICAkbm9kZS5vZmYoZXZlbnQsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIGFwaSA9IHsgc2VsZWN0X3BhbmU6IHNlbGVjdF9wYW5lLCBzZWxlY3RfY29tcG9uZW50OiBzZWxlY3RfY29tcG9uZW50LCBzZXRfbWFya3VwOiBzZXRfbWFya3VwLCBvbjogb24gfTtcbiAgX09iamVjdCRhc3NpZ24oc2VsZiwgYXBpKTtcblxuICBpbml0aWFsaXplX3BhbmVzKHNlbGYpO1xuICBpbml0aWFsaXplX3JhbmdlcyhzZWxmKTtcblxuICBzZWxmLnN0cnVjdHVyZS5xdWVyeVNlbGVjdG9yKFwiLlwiICsgY2xhc3Nlcy5jb250ZW50KS5hZGRFdmVudExpc3RlbmVyKF91dGlsaXRpZXNVaV9ldmVudHMyW1wiZGVmYXVsdFwiXS5kcmFnLnN0YXJ0LCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBzdGFydF9kcmFnZ2luZyhzZWxmLCBldmVudCk7XG4gIH0pO1xuXG4gIHJldHVybiBhcGk7XG59O1xuXG4vLypcbi8vIEluaXRpYWxpemVzIHRoZSBgRXhwbG9kZWRgIGNvbXBvbmVudC5cbi8vXG4vLyBAbWV0aG9kXG4vLyBAc3RhdGljXG4vL1xuLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gW2NvbnRleHQgPSBkb2N1bWVudF0gLSBUaGUgY29udGV4dCBpbiB3aGljaCB0byBzZWFyY2hcbi8vIGZvciBET00gbm9kZXMgdGhhdCBzaG91bGQgYmUgdXNlZCBhcyB0aGUgcm9vdCBvZiBhbiBgRXhwbG9kZWRgIGNvbXBvbmVudC5cblxuRXhwbG9kZWQuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgX3V0aWxpdGllc0J1aWxkZXIyW1wiZGVmYXVsdFwiXS5idWlsZF9hbmRfY2FjaGUoRXhwbG9kZWQsIHsgbmFtZTogY2xhc3Nlcy5yb290IH0pO1xufTtcblxuZXhwb3J0cy5jbGFzc2VzID0gY2xhc3NlcztcbmV4cG9ydHMuc3RhdGVzID0gc3RhdGVzO1xuZXhwb3J0cy5hdHRycyA9IGF0dHJzO1xuZXhwb3J0cy5ldmVudHMgPSBldmVudHM7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEV4cGxvZGVkO1xuXG4vLypcbi8vIEBuYW1lIGdhcFxuLy9cbi8vIFVwZGF0ZXMgdGhlIHNwcmVhZCBiZXR3ZWVuIHBhbmVzLiA1MCUgb24gdGhlIHJhbmdlIHdpbGwgZ2VuZXJhdGUgYSB6LWF4aXNcbi8vIGRpc3RhbmNlIGJldHdlZW4gY2hpbGQvIHBhcmVudCBwYW5lcyBvZiBgTEFZRVJfR0FQYC4gQW55dGhpbmcgbGVzcyB0aGFuXG4vLyA1MCUgd2lsbCByZWR1Y2UgdGhpcyBnYXAsIGFuZCBhbnl0aGluZyBncmVhdGVyIHRoYW4gNTAlIHdpbGwgaW5jcmVhc2UgaXQuXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhbiBgRXhwbG9kZWRgLlxuLy8gQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gVGhlIGBpbnB1dGAgZXZlbnQgb24gYSByYW5nZSBpbnB1dC5cbi8vXG4vLyBAcHJpdmF0ZVxuXG4vLypcbi8vIEBuYW1lIHBlcnNwZWN0aXZlXG4vL1xuLy8gVXBkYXRlcyB0aGUgcGVyc3BlY3RpdmUgb2YgYW4gYEV4cGxvZGVkYC4gNTAlIG9uIHRoZSByYW5nZSB3aWxsIGdlbmVyYXRlXG4vLyB0aGUgZGVmYXVsdCBwZXJzcGVjdGl2ZSwgYW5kIHZhbHVlcyBsb3dlciBhbmQgaGlnaGVyIHdpbGwgZGVjcmVhc2UgYW5kXG4vLyBpbmNyZWFzZSB0aGF0IHBlcnNwZWN0aXZlLCByZXNwZWN0aXZlbHkuXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhbiBgRXhwbG9kZWRgLlxuLy8gQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gVGhlIGBpbnB1dGAgZXZlbnQgb24gYSByYW5nZSBpbnB1dC5cbi8vXG4vLyBAcHJpdmF0ZVxuXG59LHtcIi4uLy4uL3V0aWxpdGllcy9idWlsZGVyXCI6MjMsXCIuLi8uLi91dGlsaXRpZXMvY2xpZW50XCI6MjQsXCIuLi8uLi91dGlsaXRpZXMvbnVtYmVyc1wiOjMwLFwiLi4vLi4vdXRpbGl0aWVzL3BhaW50aW5nXCI6MzEsXCIuLi8uLi91dGlsaXRpZXMvdWlfZXZlbnRzXCI6MzYsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbVwiOjQxLFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiOjQyLFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ25cIjo0NCxcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5c1wiOjQ4LFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZS1wcm9wZXJ0eVwiOjUzLFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCI6NTQsXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCI6MTI4fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBjbGFzc2VzID0ge1xuICByb290OiBcImZpZWxkXCIsXG4gIGlucHV0OiBcImZpZWxkX19pbnB1dFwiLFxuICBsYWJlbDogXCJsYWJlbFwiXG59O1xuXG52YXIgc3RhdGVzID0ge1xuICByb290OiB7IGZvY3VzZWQ6IGNsYXNzZXMucm9vdCArIFwiLS1pcy1mb2N1c2VkXCIgfSxcbiAgbGFiZWw6IHsgZm9jdXNlZDogY2xhc3Nlcy5sYWJlbCArIFwiLS1pcy1mb2N1c2VkXCIgfVxufTtcblxudmFyIEZpZWxkID0ge1xuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICQoZG9jdW1lbnQpLm9uKFwiZm9jdXNpbiBmb2N1c291dFwiLCBcIi5cIiArIGNsYXNzZXMuaW5wdXQsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdmFyIG1ldGhvZCA9IGV2ZW50LnR5cGUgPT09IFwiZm9jdXNpblwiID8gXCJhZGRcIiA6IFwicmVtb3ZlXCIsXG4gICAgICAgICAgbGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2Zvcj1cIiArIGV2ZW50LnRhcmdldC5pZCArIFwiXVwiKTtcblxuICAgICAgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NMaXN0W21ldGhvZF0oc3RhdGVzLnJvb3QuZm9jdXNlZCk7XG4gICAgICBsYWJlbC5jbGFzc0xpc3RbbWV0aG9kXShzdGF0ZXMubGFiZWwuZm9jdXNlZCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRmllbGQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG59LHt9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8vICAgICAgICAgICAgICAgICAgIF9fXyAgICAgICBfX18gICAgICAgICAgX19fICAgICAgICAgIF9fXyAgICAgICAgICBfX19cbi8vICAgICAgX19fICAgICAgICAgLyAgL1xcICAgICAvICAvXFwgICAgICAgIC8gIC9cXCAgICAgICAgL19fL1xcICAgICAgICAvICAvXFxcbi8vICAgICAvICAvXFwgICAgICAgLyAgLzovXyAgIC8gIC86OlxcICAgICAgLyAgLzo6XFwgICAgICB8ICB8OjpcXCAgICAgIC8gIC86L19cbi8vICAgIC8gIC86LyAgICAgIC8gIC86LyAvXFwgLyAgLzovXFw6XFwgICAgLyAgLzovXFw6XFwgICAgIHwgIHw6fDpcXCAgICAvICAvOi8gL1xcXG4vLyAgIC9fXy86OlxcICAgICAvICAvOi8gLzovLyAgLzovfi86LyAgIC8gIC86L34vOjpcXCAgX198X198OnxcXDpcXCAgLyAgLzovIC86L19cbi8vICAgXFxfX1xcL1xcOlxcX18gL19fLzovIC86Ly9fXy86LyAvOi9fX18vX18vOi8gLzovXFw6XFwvX18vOjo6OnwgXFw6XFwvX18vOi8gLzovIC9cXFxuLy8gICAgICBcXCAgXFw6XFwvXFxcXCAgXFw6XFwvOi8gXFwgIFxcOlxcLzo6Ojo6L1xcICBcXDpcXC86L19fXFwvXFwgIFxcOlxcfn5cXF9fXFwvXFwgIFxcOlxcLzovIC86L1xuLy8gICAgICAgXFxfX1xcOjovIFxcICBcXDo6LyAgIFxcICBcXDo6L35+fn4gIFxcICBcXDo6LyAgICAgIFxcICBcXDpcXCAgICAgICBcXCAgXFw6Oi8gLzovXG4vLyAgICAgICAvX18vOi8gICBcXCAgXFw6XFwgICAgXFwgIFxcOlxcICAgICAgIFxcICBcXDpcXCAgICAgICBcXCAgXFw6XFwgICAgICAgXFwgIFxcOlxcLzovXG4vLyAgICAgICBcXF9fXFwvICAgICBcXCAgXFw6XFwgICAgXFwgIFxcOlxcICAgICAgIFxcICBcXDpcXCAgICAgICBcXCAgXFw6XFwgICAgICAgXFwgIFxcOjovXG4vLyAgICAgICAgICAgICAgICAgIFxcX19cXC8gICAgIFxcX19cXC8gICAgICAgIFxcX19cXC8gICAgICAgIFxcX19cXC8gICAgICAgIFxcX19cXC9cbi8vXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2dldEl0ZXJhdG9yID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX09iamVjdCRhc3NpZ24gPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ25cIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX0FycmF5JGZyb20gPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb21cIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3V0aWxpdGllc0V2ZW50cyA9IHJlcXVpcmUoXCIuLi8uLi91dGlsaXRpZXMvZXZlbnRzXCIpO1xuXG52YXIgX3V0aWxpdGllc0V2ZW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsaXRpZXNFdmVudHMpO1xuXG52YXIgX3V0aWxpdGllc0RvbV9jYWNoZSA9IHJlcXVpcmUoXCIuLi8uLi91dGlsaXRpZXMvZG9tX2NhY2hlXCIpO1xuXG52YXIgX3V0aWxpdGllc0RvbV9jYWNoZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsaXRpZXNEb21fY2FjaGUpO1xuXG52YXIgX3V0aWxpdGllc01hcmt1cCA9IHJlcXVpcmUoXCIuLi8uLi91dGlsaXRpZXMvbWFya3VwXCIpO1xuXG4vLypcbi8vIFRoZSBuYW1lIG9mIGNsYXNzZXMgcmVsZXZhbnQgdG8gYElmcmFtZWAgYW5kIGBDb21tdW5pY2F0b3JgLlxuLy8gQG9iamVjdFxuXG52YXIgY2xhc3NlcyA9IHtcbiAgcm9vdDogXCJpZnJhbWVcIixcbiAgY29udGVudDogXCJpZnJhbWVfX2NvbnRlbnRcIlxufTtcblxuLy8qXG4vLyBUaGUgbmFtZSBvZiBhdHRyaWJ1dGVzIHJlbGV2YW50IHRvIGBJZnJhbWVgIGFuZCBgQ29tbXVuaWNhdG9yYC5cbi8vIEBvYmplY3RcblxudmFyIGF0dHJzID0ge1xuICBpZDogXCJkYXRhLWlmcmFtZS1pZFwiXG59O1xuXG4vLypcbi8vIFRoZSBwb3NzaWJsZSBwb3NpdGlvbnMgb2YgYW4gW2BJZnJhbWVgXShAbGluaykg4oCUIGVpdGhlciB0aGUgcGFyZW50IChvbiB0aGVcbi8vIG1haW4gcGFnZSkgb3IgdGhlIGNoaWxkIChlbWJlZGRlZCBpbnNpZGUgYW4gYGlmcmFtZWApLlxuLy9cbi8vIEBvYmplY3Rcbi8vIEBwcml2YXRlXG5cbnZhciBwb3NpdGlvbnMgPSB7XG4gIHBhcmVudDogXCJwYXJlbnRcIixcbiAgY2hpbGQ6IFwiY2hpbGRcIlxufTtcblxuLy8qXG4vLyBBIHNldCBvZiBldmVudHMgcmVnaXN0ZXJlZCB3aXRoIFtgRXZlbnRzYF0oQGxpbmspIHRoYXQgcmVsYXRlIHNwZWNpZmljYWxseVxuLy8gdG8gZmVhdHVyZXMgbWFuYWdlZCBieSB0aGUgY29yZSBgSWZyYW1lYC5cbi8vXG4vLyBAb2JqZWN0XG4vLyBAcHJpdmF0ZVxuXG52YXIgaWZyYW1lX2V2ZW50cyA9IFtcIm1hcmt1cF9yZXF1ZXN0XCIsIFwibWFya3VwX3JlcXVlc3RcIiwgXCJoZWlnaHRfY2hhbmdlXCIsIFwibWFya3VwX2NoYW5nZVwiLCBcImNsYXNzX2NoYW5nZVwiLCBcImhlaWdodF9yZXF1ZXN0XCIsIFwiZXZlbnRfaGFuZGxlclwiXTtcblxudmFyIElmcmFtZSwgaWZyYW1lcywgQ29tbXVuaWNhdG9yLCBjcmVhdGVfc2VsZiwgYWRkX2V2ZW50X2xpc3RlbmVycywgbW92ZV9tYXJrdXBfdG9faWZyYW1lO1xuXG5pZnJhbWVzID0gW107XG5cbl91dGlsaXRpZXNFdmVudHMyW1wiZGVmYXVsdFwiXS5yZWdpc3Rlci5hcHBseShfdXRpbGl0aWVzRXZlbnRzMltcImRlZmF1bHRcIl0sIGlmcmFtZV9ldmVudHMpO1xuXG4vLypcbi8vIEEgbWVjaGFuaXNtIGZvciBjb21tdW5pY2F0aW5nIGJldHdlZW4gYSBnaXZlbiBjb21wb25lbnQgYW5kIG9uZSBvciBtb3JlXG4vLyBbYElmcmFtZWBzXShAbGluayBJZnJhbWUpLlxuLy9cbi8vIEBmYWN0b3J5a1xuXG5leHBvcnRzLkNvbW11bmljYXRvciA9IENvbW11bmljYXRvciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHByaXZhdGVfaWZyYW1lcyA9IFtdLFxuICAgICAgcHJpdmF0ZV9pZnJhbWUsXG4gICAgICBhY3Rpb25zID0ge30sXG4gICAgICBjb21tdW5pY2F0b3I7XG5cbiAgY29tbXVuaWNhdG9yID0ge1xuXG4gICAgLy8qXG4gICAgLy8gVHJpZ2dlciBhbiBldmVudCB3aXRoIHRoZSBwcm92aWRlZCBkYXRhIHRvIGFsbCBhdHRhY2hlZCBpZnJhbWVzLlxuICAgIC8vXG4gICAgLy8gQG1ldGhvZFxuICAgIC8vXG4gICAgLy8gQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCB0byB0cmlnZ2VyLiBEbyBub3QgcGFzcyBhIHN0cmluZ1xuICAgIC8vIGxpdGVyYWwg4oCUIGluc3RlYWQsIHBhc3MgYW4gZXZlbnQgZGVmaW5lZCBvbiBbYEV2ZW50cy50eXBlc2BdKEBsaW5rKS5cbiAgICAvL1xuICAgIC8vIEBwYXJhbSB7Kn0gZGF0YSAtIEFueSBwaWVjZSBvZiBkYXRhIHRoYXQgY2FuIGJlIHN0cmluZ2lmaWVkIGJ5XG4gICAgLy8gYEpTT04uc3RyaW5naWZ5YC5cblxuICAgIHRyaWdnZXI6IGZ1bmN0aW9uIHRyaWdnZXIodHlwZSwgZGF0YSkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9nZXRJdGVyYXRvcihwcml2YXRlX2lmcmFtZXMpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgcHJpdmF0ZV9pZnJhbWUgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgIHByaXZhdGVfaWZyYW1lLnRyaWdnZXIodHlwZSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3JbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8qXG4gICAgLy8gQWRkIGEgbGlzdGVuZXIgZm9yIHdoZW4gYW4gYElmcmFtZWAgaXMgdHJpZ2dlcmVkIHdpdGggdGhlIHBhc3NlZCBgZXZlbnRgLlxuICAgIC8vXG4gICAgLy8gQG1ldGhvZFxuICAgIC8vXG4gICAgLy8gQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCB0byBsaXN0ZW4gZm9yLiBEbyBub3QgcGFzcyBhXG4gICAgLy8gc3RyaW5nIGxpdGVyYWwg4oCUIGluc3RlYWQsIHBhc3MgYW4gZXZlbnQgZGVmaW5lZCBvblxuICAgIC8vIFtgRXZlbnRzLnR5cGVzYF0oQGxpbmspLlxuICAgIC8vXG4gICAgLy8gQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uIC0gVGhlIGNhbGxiYWNrIHRvIHJ1biB3aGVuIHRoZSBldmVudCBpc1xuICAgIC8vIHRyaWdnZXJlZC5cbiAgICAvL1xuICAgIC8vIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24uZGF0YSAtIFRoZSBkYXRhIHRoYXQgd2FzIHBhc3NlZCBhbG9uZyB0byB0aGVcbiAgICAvLyBbYElmcmFtZSN0cmlnZ2VyYF0oQGxpbmspIHRoYXQgZ2VuZXJhdGVkIHRoaXMgZXZlbnQuXG5cbiAgICBvbjogZnVuY3Rpb24gb24oZXZlbnQsIGFjdGlvbikge1xuICAgICAgYWN0aW9uc1tldmVudF0gPSBhY3Rpb25zW2V2ZW50XSB8fCBbXTtcbiAgICAgIGFjdGlvbnNbZXZlbnRdLnB1c2goYWN0aW9uKTtcbiAgICB9LFxuXG4gICAgLy8qXG4gICAgLy8gUmVjZWl2ZXMgdGhlIGRhdGEgZm9yIGFuIGV2ZW50IGFuZCBjbGFscyBhbGwgYXNzb2NpYXRlZCBldmVudCBoYW5kbGVycy5cbiAgICAvLyBUaGlzIGlzIHByaW1hcmlseSBwcm92aWRlZCBzbyB0aGF0IHRoZSBgSWZyYW1lYCBjYW4gY2FsbCB0aGlzIG1ldGhvZCBmb3JcbiAgICAvLyBhbGwgbGlzdGVuZXJzIHRoYXQgaGF2ZSBiZWVuIHJlZ2lzdGVyZWQgd2l0aCBpdC5cbiAgICAvL1xuICAgIC8vIEBtZXRob2RcbiAgICAvL1xuICAgIC8vIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIEFsbCBvZiB0aGUgZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50LlxuXG4gICAgcmVjZWl2ZTogZnVuY3Rpb24gcmVjZWl2ZShldmVudCkge1xuICAgICAgdmFyIGV2ZW50X2FjdGlvbnMgPSBhY3Rpb25zW2V2ZW50LnR5cGVdLFxuICAgICAgICAgIGFjdGlvbjtcblxuICAgICAgaWYgKCFldmVudF9hY3Rpb25zKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gX2dldEl0ZXJhdG9yKGFjdGlvbnMpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICBhY3Rpb24gPSBfc3RlcDIudmFsdWU7XG4gICAgICAgICAgYWN0aW9uKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IyW1wicmV0dXJuXCJdKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8qXG4gICAgLy8gQW4gb2JqZWN0IHRoYXQgd3JhcHMgYWxsIG9mIHRoZSByZWdpc3RlcmluZyBmdW5jdGlvbmFsaXR5LlxuICAgIC8vXG4gICAgLy8gQHByb3BlcnR5XG4gICAgLy8gQG9iamVjdFxuXG4gICAgcmVnaXN0ZXI6IHtcblxuICAgICAgLy8qXG4gICAgICAvLyBSZWdpc3RlcnMgdGhpcyBgQ29tbXVuaWNhdG9yYCB3aXRoIHRoZSBwYXNzZWQgSUQgb3IgYGlmcmFtZWAgbm9kZS5cbiAgICAgIC8vXG4gICAgICAvLyBAbWV0aG9kXG4gICAgICAvL1xuICAgICAgLy8gQHBhcmFtIHtTdHJpbmcgfCBIVE1MRWxlbWVudH0gaWQgLSBUaGUgYGlmcmFtZWAgdG8gcmVnaXN0ZXIgd2l0aC4gSWZcbiAgICAgIC8vIGEgYFN0cmluZ2AgaXMgcGFzc2VkLCBpdCBzaG91bGQgbWF0Y2ggc29tZSBgaWZyYW1lYCdzIGBkYXRhLWlmcmFtZS1pZGBcbiAgICAgIC8vIGF0dHJpYnV0ZS4gT3RoZXJ3aXNlLCB5b3Ugc2hvdWxkIHBhc3MgdGhlIGFjdHVhbCBgaWZyYW1lYCBub2RlIHRvXG4gICAgICAvLyByZWdpc3RlciB3aXRoLlxuICAgICAgLy9cbiAgICAgIC8vIEByZXR1cm5zIEJvb2xlYW4gLSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgcmVnaXN0cmF0aW9uIHdhcyBzdWNjZXNzZnVsLFxuICAgICAgLy8gYW5kIGZhbHNlIG90aGVyd2lzZS5cblxuICAgICAgd2l0aF9pZnJhbWU6IGZ1bmN0aW9uIHdpdGhfaWZyYW1lKGlkKSB7XG4gICAgICAgIHZhciBpZnJhbWUgPSBJZnJhbWVbXCJmb3JcIl0oaWQpLFxuICAgICAgICAgICAgcmVnaXN0ZXJlZCA9ICEhaWZyYW1lICYmIGlmcmFtZS5yZWdpc3Rlcihjb21tdW5pY2F0b3IpO1xuXG4gICAgICAgIGlmIChyZWdpc3RlcmVkKSB7XG4gICAgICAgICAgcHJpdmF0ZV9pZnJhbWVzLnB1c2goaWZyYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVnaXN0ZXJlZDtcbiAgICAgIH0sXG5cbiAgICAgIC8vKlxuICAgICAgLy8gUmVnaXN0ZXJzIHRoaXMgYENvbW11bmljYXRvcmAgd2l0aCB0aGUgYGlmcmFtZWAgd2hvc2UgYGRhdGEtaWZyYW1lLWlkYFxuICAgICAgLy8gbWF0Y2hlcyB0aGF0IG9mIHRoZSBwYXNzZWQgbm9kZS5cbiAgICAgIC8vXG4gICAgICAvLyBAbWV0aG9kXG4gICAgICAvL1xuICAgICAgLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSAtIFRoZSBub2RlIHRvIG1hdGNoIHRvIGFuIGBpZnJhbWVgLlxuICAgICAgLy9cbiAgICAgIC8vIEByZXR1cm5zIEJvb2xlYW4gLSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgcmVnaXN0cmF0aW9uIHdhcyBzdWNjZXNzZnVsLFxuICAgICAgLy8gYW5kIGZhbHNlIG90aGVyd2lzZS5cblxuICAgICAgZnJvbV9ub2RlOiBmdW5jdGlvbiBmcm9tX25vZGUobm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy53aXRoX2lmcmFtZShub2RlLmdldEF0dHJpYnV0ZShhdHRycy5pZCkpO1xuICAgICAgfSxcblxuICAgICAgLy8qXG4gICAgICAvLyBSZWdpc3RlcnMgdGhpcyBgQ29tbXVuaWNhdG9yYCB3aXRoIGFsbCBgaWZyYW1lYHMgb24gdGhlIHBhZ2UuXG4gICAgICAvL1xuICAgICAgLy8gQG1ldGhvZFxuICAgICAgLy9cbiAgICAgIC8vIEByZXR1cm5zIEJvb2xlYW4gLSBSZXR1cm5zIGB0cnVlYCBpZiB0aGVyZSBhcmUgYGlmcmFtZWBzIG9uIHRoZSBwYWdlLFxuICAgICAgLy8gYW5kIGZhbHNlIG90aGVyd2lzZS5cblxuICAgICAgd2l0aF9hbGw6IGZ1bmN0aW9uIHdpdGhfYWxsKCkge1xuICAgICAgICB2YXIgaWZyYW1lO1xuICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO1xuICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7XG4gICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gX2dldEl0ZXJhdG9yKGlmcmFtZXMpLCBfc3RlcDM7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSAoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWUpIHtcbiAgICAgICAgICAgIGlmcmFtZSA9IF9zdGVwMy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMud2l0aF9pZnJhbWUoaWZyYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yMyA9IHRydWU7XG4gICAgICAgICAgX2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjNbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAgICAgX2l0ZXJhdG9yM1tcInJldHVyblwiXSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IzKSB7XG4gICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaWZyYW1lLmxlbmd0aCA+IDA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBjb21tdW5pY2F0b3I7XG59O1xuXG4vLypcbi8vIENhY2hlcyBhbGwgb2YgdGhlIGludGVybmFsIGRldGFpbHMgZm9yIGFuIFtgSWZyYW1lYF0oQGxpbmspLlxuLy9cbi8vIEBwcml2YXRlXG4vLyBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIC0gVGhlIG5vZGUgYmFja2luZyB0aGUgYElmcmFtZWAuIFRoaXMgY2FuIGJlIGVpdGhlclxuLy8gYW4gYWN0dWFsIGBpZnJhbWVgIChpbiB0aGUgY2FzZSBvZiB0aGUgcGFyZW50KSBvciB0aGUgd3JhcHBpbmcgZWxlbWVudCBvZlxuLy8gYSBkZW1vIHRoYXQgaXMgYWN0dWFsbHkgaW4gdGhlIGBpZnJhbWVgLlxuLy9cbi8vIEByZXR1cm5zIE9iamVjdCAtIFRoZSBwcml2YXRlLCBpbnRlcm5hbCBkZXRhaWxzIG9mIHRoZSBgSWZyYW1lYC5cblxuY3JlYXRlX3NlbGYgPSBmdW5jdGlvbiAobm9kZSkge1xuICB2YXIgc2VsZiA9IHtcbiAgICBub2RlOiBub2RlLFxuICAgIGlkOiBub2RlLmdldEF0dHJpYnV0ZShhdHRycy5pZCksXG4gICAgcmVhZHk6IGZhbHNlLFxuICAgIGxpc3RlbmVyczogW10sXG4gICAgbWVzc2FnZV9xdWV1ZTogW10sXG4gICAgbWVzc2FnZTogZnVuY3Rpb24gbWVzc2FnZShkYXRhKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VfdGFyZ2V0LnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KGRhdGEpLCBcIipcIik7XG4gICAgfSxcbiAgICBxdWV1ZTogZnVuY3Rpb24gcXVldWUoZGF0YSkge1xuICAgICAgdGhpcy5tZXNzYWdlX3F1ZXVlLnB1c2goZGF0YSk7XG4gICAgfVxuICB9O1xuXG4gIGlmIChub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpZnJhbWVcIikge1xuICAgIF9PYmplY3QkYXNzaWduKHNlbGYsIHsgcG9zaXRpb246IHBvc2l0aW9ucy5wYXJlbnQsIG1lc3NhZ2VfdGFyZ2V0OiBub2RlLmNvbnRlbnRXaW5kb3cgfSk7XG4gIH0gZWxzZSB7XG4gICAgX09iamVjdCRhc3NpZ24oc2VsZiwgeyBwb3NpdGlvbjogcG9zaXRpb25zLmNoaWxkLCBtZXNzYWdlX3RhcmdldDogd2luZG93LnBhcmVudCB9KTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufTtcblxuLy8qXG4vLyBTZXRzIHVwIGFsbCByZXF1aXJlZCBldmVudCBsaXN0ZW5lcnMgZm9yIGFuIFtgSWZyYW1lYF0oQGxpbmspLCBpbmNsdWRpbmcgdGhlXG4vLyBsaXN0ZW5lciBmb3IgYHBvc3RNZXNzYWdlYCBhbmQgbGlzdGVuZXJzIG9uIHRoZSByZWxldmFudCBgaWZyYW1lYCBmb3IgdGhlXG4vLyBgbG9hZGAgZXZlbnQgKGFzIGEgaG9vayB0byBydW4gdGhlIGZpcnN0IHNldCBvZiBldmVudHMpLlxuLy9cbi8vIEBwcml2YXRlXG4vLyBAcGFyYW0ge09iamVjdH0gc2VsZiAtIFRoZSBpbnRlcm5hbCBkZXRhaWxzIG9mIGFuIFtgSWZyYW1lYF0oQGxpbmspLlxuXG5hZGRfZXZlbnRfbGlzdGVuZXJzID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgc2VsZi5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcXVldWVkX21lc3NhZ2U7XG5cbiAgICBzZWxmLnJlYWR5ID0gdHJ1ZTtcbiAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlO1xuICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjQgPSBmYWxzZTtcbiAgICB2YXIgX2l0ZXJhdG9yRXJyb3I0ID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pdGVyYXRvcjQgPSBfZ2V0SXRlcmF0b3Ioc2VsZi5tZXNzYWdlX3F1ZXVlKSwgX3N0ZXA0OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gKF9zdGVwNCA9IF9pdGVyYXRvcjQubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlKSB7XG4gICAgICAgIHF1ZXVlZF9tZXNzYWdlID0gX3N0ZXA0LnZhbHVlO1xuICAgICAgICBzZWxmLm1lc3NhZ2UocXVldWVkX21lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3I0ID0gdHJ1ZTtcbiAgICAgIF9pdGVyYXRvckVycm9yNCA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCAmJiBfaXRlcmF0b3I0W1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yNFtcInJldHVyblwiXSgpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I0KSB7XG4gICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2VsZi5tZXNzYWdlX3F1ZXVlID0gW107XG4gIH0pO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgZGF0YSwgbGlzdGVuZXI7XG5cbiAgICBpZiAodHlwZW9mIGV2ZW50LmRhdGEgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcbiAgICBpZiAoZGF0YS5pZCAhPT0gc2VsZi5pZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNSA9IHRydWU7XG4gICAgdmFyIF9kaWRJdGVyYXRvckVycm9yNSA9IGZhbHNlO1xuICAgIHZhciBfaXRlcmF0b3JFcnJvcjUgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yNSA9IF9nZXRJdGVyYXRvcihzZWxmLmxpc3RlbmVycyksIF9zdGVwNTsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNSA9IChfc3RlcDUgPSBfaXRlcmF0b3I1Lm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241ID0gdHJ1ZSkge1xuICAgICAgICBsaXN0ZW5lciA9IF9zdGVwNS52YWx1ZTtcbiAgICAgICAgbGlzdGVuZXIucmVjZWl2ZShkYXRhKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kaWRJdGVyYXRvckVycm9yNSA9IHRydWU7XG4gICAgICBfaXRlcmF0b3JFcnJvcjUgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjUgJiYgX2l0ZXJhdG9yNVtcInJldHVyblwiXSkge1xuICAgICAgICAgIF9pdGVyYXRvcjVbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yNSkge1xuICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG4vLypcbi8vIE1vdmVzIHRoZSBtYXJrdXAgZm9yIGZvciBhbiBpZnJhbWUgaW50byB0aGUgYWN0dWFsIGlmcmFtZS4gVGhpcyBsb29rcyBmb3IgdGhlXG4vLyBgaWZyYW1lX19jb250ZW50YCBzaWJsaW5nIG5vZGUgb2YgdGhlIGlmcmFtZSwgdGFrZXMgaXRzIGlubmVyIEhUTUwsIGRlY29kZXNcbi8vIHRoZSBlc2NhcGVkIGVudGl0aWVzLCBhbmQgd3JpdGVzIHRoZSBlbnRpcmV0eSBvZiB0aGUgcmVzdWx0aW5nIHN0cmluZyAod2hpY2hcbi8vIGluY2x1ZGVzIHRoZSBIVE1MIGVsZW1lbnQgYW5kIGFsbCBjaGlsZHJlbikgdG8gdGhlIGlmcmFtZSdzIHdpbmRvdy5cbi8vXG4vLyBAcHJpdmF0ZVxuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhbiBbYElmcmFtZWBdKEBsaW5rKS5cblxubW92ZV9tYXJrdXBfdG9faWZyYW1lID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgdmFyIGlmcmFtZSA9IHNlbGYubm9kZSxcbiAgICAgIGlmcmFtZV9jb250ZW50ID0gaWZyYW1lLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi5cIiArIGNsYXNzZXMuY29udGVudCksXG4gICAgICBpZnJhbWVfd2luZG93ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3c7XG5cbiAgaWYgKCEoaWZyYW1lX2NvbnRlbnQgJiYgaWZyYW1lX3dpbmRvdykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZnJhbWVfd2luZG93LmRvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lX3dpbmRvdy5kb2N1bWVudC53cml0ZSgoMCwgX3V0aWxpdGllc01hcmt1cC5kZWNvZGVfaHRtbF9lbnRpdGllcykoaWZyYW1lX2NvbnRlbnQuaW5uZXJIVE1MKSk7XG4gIGlmcmFtZV93aW5kb3cuZG9jdW1lbnQuY2xvc2UoKTtcbn07XG5cbi8vKlxuLy8gVGhlIG9iamVjdCB0aGF0IG1hbmFnZXMgY29tbXVuaWNhdGlvbiBiZXR3ZWVuIHRoZSBwYXJlbnQgcGFnZSBhbmQgYVxuLy8gZG9jdW1lbnQgZW1iZWRkZWQgaW4gYW4gYGlmcmFtZWAuIEVzc2VudGlhbGx5LCBjb21wb25lbnRzIGNhbiByZWdpc3RlciBvblxuLy8gZWl0aGVyIHNpZGUgb2YgdGhlIGNvaW4gd2l0aCB0aGUgYElmcmFtZWAgZm9yIHRoYXQgc2lkZS4gVGhleSBjYW4gdGhlblxuLy8gc2VuZCBtZXNzYWdlcywgd2hpY2ggZ2V0IHRyaWdnZXJlZCBvbiB0aGUgb3RoZXIgc2lkZSwgYW5kIGNhbiBsaXN0ZW4gZm9yXG4vLyBldmVudHMgc2VudCBmcm9tIHRoZSBvdGhlciBzaWRlLiBUaGUgcmVnaXN0ZXJpbmcgYW5kIHNlbmRpbmcvIGxpc3RlbmluZyBpc1xuLy8gYWxsIGhhbmRsZWQgYnkgW2BDb21tdW5pY2F0b3JgXShAbGluayk7IHRoZSBgSWZyYW1lYCBzaW1wbHkgbWFuYWdlcyB0aGVcbi8vIHRoZSBwYXNzaW5nIG9mIGV2ZW50cyBiZXR3ZWVuIHRoZSB0d28gc2lkZXMgYW5kIHRoZSBjYWxsaW5nIG9mIGV2ZW50XG4vLyBoYW5kbGVycyBpbiBsaXN0ZW5lcnMgdGhhdCBoYXZlIGJlZW4gcmVnaXN0ZXJlZC5cbi8vXG4vLyBAZmFjdG9yeVxuLy9cbi8vIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgLSBUaGUgYWN0dWFsIGBpZnJhbWVgIG5vZGUgKGlmIGluIHRoZSBwYXJlbnQpIG9yXG4vLyB0aGUgd3JhcHBlciBub2RlIChpZiBpbiB0aGUgY2hpbGQpIHRoYXQgd2lsbCBhY3QgYXMgdGhlIHJvb3QgZm9yIHRoZVxuLy8gYElmcmFtZWAuXG5cbklmcmFtZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHZhciBzZWxmID0gY3JlYXRlX3NlbGYobm9kZSk7XG4gIG1vdmVfbWFya3VwX3RvX2lmcmFtZShzZWxmKTtcbiAgYWRkX2V2ZW50X2xpc3RlbmVycyhzZWxmKTtcblxuICByZXR1cm4ge1xuXG4gICAgLy8qXG4gICAgLy8gVHJpZ2dlciBhIHBhcnRpY3VsYXIgZXZlbnQsIHN1Y2ggdGhhdCBpdCBnZXRzIHNlbnQgdG8gdGhlIG90aGVyIHNpZGUgb2ZcbiAgICAvLyB0aGUgYGlmcmFtZWAgYnJpZGdlLiBJZiB0aGUgYGlmcmFtZWAgaGFzIG5vdCB5ZXQgbG9hZGVkLCB0aGUgbWVzc2FnZVxuICAgIC8vIHdpbGwgYmUgcXVldWVkIGZvciB3aGVuIHRoZSBgaWZyYW1lYCBjb21tdW5pY2F0aW9uIGlzIGF2YWlsYWJsZS5cbiAgICAvL1xuICAgIC8vIEBtZXRob2RcbiAgICAvL1xuICAgIC8vIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgdG8gdHJpZ2dlci4gRG8gbm90IHBhc3MgYSBzdHJpbmdcbiAgICAvLyBsaXRlcmFsOyBpbnN0ZWFkLCBwYXNzIGFuIGV2ZW50IGRlZmluZWQgb24gW2BFdmVudHMudHlwZXNgXShAbGluaykuXG4gICAgLy9cbiAgICAvLyBAcGFyYW0geyp9IFtkYXRhID0ge31dIC0gVGhlIGRhdGEgdG8gcGFzcyB0byB0aGUgY29ycmVzcG9uZGluZyBgSWZyYW1lYC5cbiAgICAvLyBUaGlzIGNhbiBiZSBhbnl0aGluZyB0aGF0IGNhbiBiZSBzdHJpbmdpZmllZCB3aXRoIGBKU09OLnN0cmluZ2lmeWAuXG5cbiAgICB0cmlnZ2VyOiBmdW5jdGlvbiB0cmlnZ2VyKHR5cGUpIHtcbiAgICAgIHZhciBkYXRhID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgICAgIGRhdGEgPSBfT2JqZWN0JGFzc2lnbih7fSwgeyB0eXBlOiB0eXBlLCBpZDogc2VsZi5pZCB9LCBkYXRhKTtcbiAgICAgIGRhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgIHJldHVybiBzZWxmLnJlYWR5ID8gc2VsZi5tZXNzYWdlKGRhdGEpIDogc2VsZi5xdWV1ZShkYXRhKTtcbiAgICB9LFxuXG4gICAgLy8qXG4gICAgLy8gUmVnaXN0ZXJzIGEgbGlzdGVuZXIgb2JqZWN0IHdpdGggdGhpcyBgSWZyYW1lYCB0aGF0IHdpbGwgYmUgbm90aWZpZWQgd2hlblxuICAgIC8vIGV2ZW50cyBhcmUgcmVjaXZlZCBmcm9tIHRoZSBvdGhlciBzaWRlIG9mIHRoZSBgaWZyYW1lYCBicmlkZ2UuXG4gICAgLy9cbiAgICAvLyBAbWV0aG9kXG4gICAgLy9cbiAgICAvLyBAcGFyYW0ge0NvbW11bmljYXRvcn0gbGlzdGVuZXIgLSBUaGUgb2JqZWN0IHRoYXQgd2lsbCByZWNlaXZlIGV2ZW50cy5cbiAgICAvL1xuICAgIC8vIEByZXR1cm5zIEJvb2xlYW4gLSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgcmVnaXN0ZXIgY2FsbCB3YXMgc3VjY2Vzc2Z1bFxuICAgIC8vICh0aGF0IGlzLCB0aGUgbGlzdGVuZXIgaGFzIHRoZSByZXF1aXJlZCBzaWduYXR1cmUgYW5kIGlzIG5vdCBhbHJlYWR5XG4gICAgLy8gcmVnaXN0ZXJlZCksIGBmYWxzZWAgb3RoZXJ3aXNlLlxuXG4gICAgcmVnaXN0ZXI6IGZ1bmN0aW9uIHJlZ2lzdGVyKGxpc3RlbmVyKSB7XG4gICAgICBpZiAoc2VsZi5saXN0ZW5lcnMuaW5jbHVkZXMobGlzdGVuZXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHNlbGYubGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9O1xufTtcblxuLy8qXG4vLyBSZXR1cm5zIHRoZSBbYElmcmFtZWBdKEBsaW5rKSBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoZSBwYXNzZWQgbm9kZSwgb3Jcbi8vIHRoZSBpZnJhbWUgd2hvc2UgSUQgbWF0Y2hlcyB0aGUgcGFzc2VkIGlkZW50aWZpZXIuXG4vL1xuLy8gQG1ldGhvZFxuLy8gQHN0YXRpY1xuLy9cbi8vIEBQYXJhbSB7U3RyaW5nIHwgSFRNTEVsZW1lbnR9IGlmcmFtZSAtIElmIGEgYFN0cmluZ2AgaXMgcGFzc2VkLCB0aGVcbi8vIFtgSWZyYW1lYF0oQGxpbmspIGZvciBhbiBgaWZyYW1lYCB3aG9zZSBgZGF0YS1pZnJhbWUtaWRgIG1hdGNoZXMgdGhlIHN0cmluZy5cbi8vIElmIGFuIGBIVE1MRWxlbWVudGAgaXMgcGFzc2VkLCB0aGUgW2BJZnJhbWVgXShAbGluaykgb2JqZWN0IHRoYXQgd2FzIGNyZWF0ZWRcbi8vIGZvciB0aGF0IG5vZGUuXG4vL1xuLy8gQHJldHVybnMge0lmcmFtZSB8IEJvb2xlYW59IC0gSWYgbm8gbWF0Y2hpbmcgYElmcmFtZWAgaXMgZm91bmQsIGBmYWxzZWAgd2lsbFxuLy8gYmUgcmV0dXJuZWQuXG5cbklmcmFtZVtcImZvclwiXSA9IGZ1bmN0aW9uIChpZnJhbWUpIHtcbiAgaWYgKHR5cGVvZiBpZnJhbWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBpZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlwiICsgY2xhc3Nlcy5iYXNlICsgXCJbXCIgKyBhdHRycy5pZCArIFwiPSdcIiArIGlmcmFtZSArIFwiJ11cIik7XG4gIH1cblxuICBpZiAoIWlmcmFtZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKDAsIF91dGlsaXRpZXNEb21fY2FjaGUyW1wiZGVmYXVsdFwiXSkoaWZyYW1lKS5nZXQoY2xhc3Nlcy5yb290KTtcbn07XG5cbi8vKlxuLy8gSW5pdGlhbGl6ZXMgdGhlIGBJZnJhbWVgIGNvbXBvbmVudC5cbi8vXG4vLyBAbWV0aG9kXG4vLyBAc3RhdGljXG4vL1xuLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gW2NvbnRleHQgPSBkb2N1bWVudF0gLSBUaGUgY29udGV4dCBpbiB3aGljaCB0byBzZWFyY2hcbi8vIGZvciBET00gbm9kZXMgdGhhdCBzaG91bGQgYmUgdXNlZCBhcyB0aGUgcm9vdCBvZiBhbiBgSWZyYW1lYCBjb21wb25lbnQuXG5cbklmcmFtZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgY29udGV4dCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IGRvY3VtZW50IDogYXJndW1lbnRzWzBdO1xuXG4gIHZhciBpZnJhbWVfbm9kZXMgPSBfQXJyYXkkZnJvbShjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIgKyBjbGFzc2VzLnJvb3QpKTtcbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb242ID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yNiA9IGZhbHNlO1xuICB2YXIgX2l0ZXJhdG9yRXJyb3I2ID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yNiA9IF9nZXRJdGVyYXRvcihpZnJhbWVfbm9kZXMpLCBfc3RlcDY7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjYgPSAoX3N0ZXA2ID0gX2l0ZXJhdG9yNi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNiA9IHRydWUpIHtcbiAgICAgIHZhciBpZnJhbWUgPSBfc3RlcDYudmFsdWU7XG4gICAgICBJZnJhbWUoaWZyYW1lKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yNiA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3I2ID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb242ICYmIF9pdGVyYXRvcjZbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgX2l0ZXJhdG9yNltcInJldHVyblwiXSgpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I2KSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydHMuQ29tbXVuaWNhdG9yID0gQ29tbXVuaWNhdG9yO1xuZXhwb3J0cy5jbGFzc2VzID0gY2xhc3NlcztcbmV4cG9ydHMuYXR0cnMgPSBhdHRycztcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gSWZyYW1lO1xuXG59LHtcIi4uLy4uL3V0aWxpdGllcy9kb21fY2FjaGVcIjoyNSxcIi4uLy4uL3V0aWxpdGllcy9ldmVudHNcIjoyNixcIi4uLy4uL3V0aWxpdGllcy9tYXJrdXBcIjoyOCxcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tXCI6NDEsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCI6NDIsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnblwiOjQ0LFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCI6NTR9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2F2YXRhciA9IHJlcXVpcmUoXCIuL2F2YXRhclwiKTtcblxudmFyIF9hdmF0YXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXZhdGFyKTtcblxudmFyIF9jb2RlX2Jsb2NrID0gcmVxdWlyZShcIi4vY29kZV9ibG9ja1wiKTtcblxudmFyIF9jb2RlX2Jsb2NrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvZGVfYmxvY2spO1xuXG52YXIgX2RlbW8gPSByZXF1aXJlKFwiLi9kZW1vXCIpO1xuXG52YXIgX2RlbW8yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVtbyk7XG5cbnZhciBfZXhwbG9kZWQgPSByZXF1aXJlKFwiLi9leHBsb2RlZFwiKTtcblxudmFyIF9leHBsb2RlZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHBsb2RlZCk7XG5cbnZhciBfZmllbGQgPSByZXF1aXJlKFwiLi9maWVsZFwiKTtcblxudmFyIF9maWVsZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9maWVsZCk7XG5cbnZhciBfaWZyYW1lID0gcmVxdWlyZShcIi4vaWZyYW1lXCIpO1xuXG52YXIgX2lmcmFtZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pZnJhbWUpO1xuXG52YXIgX2ludGVybmFsX2xpbmsgPSByZXF1aXJlKFwiLi9pbnRlcm5hbF9saW5rXCIpO1xuXG52YXIgX2ludGVybmFsX2xpbmsyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW50ZXJuYWxfbGluayk7XG5cbnZhciBfcmVzaXphYmxlID0gcmVxdWlyZShcIi4vcmVzaXphYmxlXCIpO1xuXG52YXIgX3Jlc2l6YWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZXNpemFibGUpO1xuXG52YXIgX3Njcm9sbF9jb250YWluZXIgPSByZXF1aXJlKFwiLi9zY3JvbGxfY29udGFpbmVyXCIpO1xuXG52YXIgX3Njcm9sbF9jb250YWluZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2Nyb2xsX2NvbnRhaW5lcik7XG5cbnZhciBfc2VsZWN0ID0gcmVxdWlyZShcIi4vc2VsZWN0XCIpO1xuXG52YXIgX3NlbGVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZWxlY3QpO1xuXG52YXIgX3RhYmxlID0gcmVxdWlyZShcIi4vdGFibGVcIik7XG5cbnZhciBfdGFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGFibGUpO1xuXG52YXIgX3RhYmxpc3QgPSByZXF1aXJlKFwiLi90YWJsaXN0XCIpO1xuXG52YXIgX3RhYmxpc3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGFibGlzdCk7XG5cbnZhciBfdG9nZ2xlID0gcmVxdWlyZShcIi4vdG9nZ2xlXCIpO1xuXG52YXIgX3RvZ2dsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90b2dnbGUpO1xuXG52YXIgX3hyYXkgPSByZXF1aXJlKFwiLi94cmF5XCIpO1xuXG52YXIgX3hyYXkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfeHJheSk7XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VGb3VuZGF0aW9uQXBwID0gcmVxdWlyZShcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS9mb3VuZGF0aW9uL2FwcFwiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZUZvdW5kYXRpb25BcHAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VGb3VuZGF0aW9uQXBwKTtcblxuW19hdmF0YXIyW1wiZGVmYXVsdFwiXSwgX2NvZGVfYmxvY2syW1wiZGVmYXVsdFwiXSwgX2V4cGxvZGVkMltcImRlZmF1bHRcIl0sIF9maWVsZDJbXCJkZWZhdWx0XCJdLCBfaWZyYW1lMltcImRlZmF1bHRcIl0sIF9pbnRlcm5hbF9saW5rMltcImRlZmF1bHRcIl0sIF9yZXNpemFibGUyW1wiZGVmYXVsdFwiXSwgX3Njcm9sbF9jb250YWluZXIyW1wiZGVmYXVsdFwiXSwgX2RlbW8yW1wiZGVmYXVsdFwiXSwgX3NlbGVjdDJbXCJkZWZhdWx0XCJdLCBfdGFibGUyW1wiZGVmYXVsdFwiXSwgX3RhYmxpc3QyW1wiZGVmYXVsdFwiXSwgX3RvZ2dsZTJbXCJkZWZhdWx0XCJdLCBfeHJheTJbXCJkZWZhdWx0XCJdXS5mb3JFYWNoKF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZUZvdW5kYXRpb25BcHAyW1wiZGVmYXVsdFwiXS5yZWdpc3Rlcik7XG5cbn0se1wiLi9hdmF0YXJcIjoyLFwiLi9jb2RlX2Jsb2NrXCI6MyxcIi4vZGVtb1wiOjQsXCIuL2V4cGxvZGVkXCI6NSxcIi4vZmllbGRcIjo2LFwiLi9pZnJhbWVcIjo3LFwiLi9pbnRlcm5hbF9saW5rXCI6OSxcIi4vcmVzaXphYmxlXCI6MTEsXCIuL3Njcm9sbF9jb250YWluZXJcIjoxMyxcIi4vc2VsZWN0XCI6MTQsXCIuL3RhYmxlXCI6MTUsXCIuL3RhYmxpc3RcIjoxNixcIi4vdG9nZ2xlXCI6MTcsXCIuL3hyYXlcIjoxOCxcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS9mb3VuZGF0aW9uL2FwcFwiOjE5LFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCI6NTR9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlU3RydWN0dXJlc1NpZGViYXIgPSByZXF1aXJlKFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3N0cnVjdHVyZXMvc2lkZWJhclwiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVN0cnVjdHVyZXNTaWRlYmFyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlU3RydWN0dXJlc1NpZGViYXIpO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlQ29tcG9uZW50c1RhYmxpc3QgPSByZXF1aXJlKFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL2NvbXBvbmVudHMvdGFibGlzdFwiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZUNvbXBvbmVudHNUYWJsaXN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlQ29tcG9uZW50c1RhYmxpc3QpO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlQ29tcG9uZW50c1Njcm9sbF9jb250YWluZXIgPSByZXF1aXJlKFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL2NvbXBvbmVudHMvc2Nyb2xsX2NvbnRhaW5lclwiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZUNvbXBvbmVudHNTY3JvbGxfY29udGFpbmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlQ29tcG9uZW50c1Njcm9sbF9jb250YWluZXIpO1xuXG52YXIgSW50ZXJuYWxMaW5rLCBtb3ZlX3RvX25vZGUsIG9uX2hhc2hfY2hhbmdlLCBwcm9jZXNzX2luaXRpYWxfaGFzaCwgY3VycmVudF9oYXNoO1xuXG5jdXJyZW50X2hhc2ggPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKFwiI1wiLCBcIlwiKTtcbn07XG5cbm1vdmVfdG9fbm9kZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZUNvbXBvbmVudHNUYWJsaXN0MltcImRlZmF1bHRcIl0uYWN0aXZhdGVfcGFuZWxfY29udGFpbmluZyhub2RlKTtcbiAgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlQ29tcG9uZW50c1Njcm9sbF9jb250YWluZXIyW1wiZGVmYXVsdFwiXVtcImZvclwiXShub2RlKS5zY3JvbGxfdG8obm9kZSk7XG59O1xuXG5vbl9oYXNoX2NoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhhc2ggPSBjdXJyZW50X2hhc2goKSxcbiAgICAgIG5vZGU7XG5cbiAgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlU3RydWN0dXJlc1NpZGViYXIyW1wiZGVmYXVsdFwiXS5oaWRlKCk7XG4gIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKTtcbiAgaWYgKCFub2RlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbm9kZS5pZCA9IG51bGw7XG4gIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaDtcbiAgbm9kZS5pZCA9IGhhc2g7XG4gIG1vdmVfdG9fbm9kZShub2RlKTtcbn07XG5cbnByb2Nlc3NfaW5pdGlhbF9oYXNoID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaGFzaCA9IGN1cnJlbnRfaGFzaCgpLFxuICAgICAgbm9kZTtcblxuICBpZiAoIWhhc2gubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpO1xuICBpZiAoIW5vZGUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBtb3ZlX3RvX25vZGUobm9kZSk7XG59O1xuXG5JbnRlcm5hbExpbmsgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgJCh3aW5kb3cpLm9uKFwiaGFzaGNoYW5nZVwiLCBvbl9oYXNoX2NoYW5nZSk7XG4gICAgc2V0VGltZW91dChwcm9jZXNzX2luaXRpYWxfaGFzaCwgMCk7XG4gIH1cbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gSW50ZXJuYWxMaW5rO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxufSx7XCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvY29tcG9uZW50cy9zY3JvbGxfY29udGFpbmVyXCI6MTMsXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvY29tcG9uZW50cy90YWJsaXN0XCI6MTYsXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2Uvc3RydWN0dXJlcy9zaWRlYmFyXCI6MjIsXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIjo1NH1dLDEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG59LHt9XSwxMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zaXplX2J1dHRvbnMgPSByZXF1aXJlKFwiLi9zaXplX2J1dHRvbnNcIik7XG5cbnZhciBfc2l6ZV9idXR0b25zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NpemVfYnV0dG9ucyk7XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VDb21wb25lbnRzSWZyYW1lID0gcmVxdWlyZShcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS9jb21wb25lbnRzL2lmcmFtZVwiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0V2ZW50cyA9IHJlcXVpcmUoXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL2V2ZW50c1wiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0V2ZW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0V2ZW50cyk7XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNVaV9ldmVudHMgPSByZXF1aXJlKFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy91aV9ldmVudHNcIik7XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNVaV9ldmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNVaV9ldmVudHMpO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzS2V5Y29kZXMgPSByZXF1aXJlKFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy9rZXljb2Rlc1wiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0tleWNvZGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzS2V5Y29kZXMpO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzQnVpbGRlciA9IHJlcXVpcmUoXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL2J1aWxkZXJcIik7XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNCdWlsZGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzQnVpbGRlcik7XG5cbnZhciBjbGFzc2VzID0ge1xuICByb290OiBcInJlc2l6YWJsZVwiLFxuICBoYW5kbGU6IFwicmVzaXphYmxlX19oYW5kbGVcIixcbiAgY29udGFpbmVyOiBcInJlc2l6YWJsZV9fc2l6ZS1idXR0b25cIixcbiAgd2lkdGhfaW5kaWNhdG9yOiBcInJlc2l6YWJsZV9fd2lkdGgtaW5kaWNhdG9yXCIsXG4gIHB4X2luZGljYXRvcjogXCJyZXNpemFibGVfX3dpZHRoLWluZGljYXRvcl9fcHhcIixcbiAgZW1faW5kaWNhdG9yOiBcInJlc2l6YWJsZV9fd2lkdGgtaW5kaWNhdG9yX19lbVwiXG59O1xuXG52YXIgc3RhdGVzID0ge1xuICByb290OiB7IHRyYW5zaXRpb25pbmc6IFwicmVzaXphYmxlLS1pcy10cmFuc2l0aW9uaW5nLXdpZHRoXCIgfSxcbiAgc2l6ZV9idXR0b246IHtcbiAgICBoaWRkZW46IFwicmVzaXphYmxlX19zaXplLWJ1dHRvbi0taXMtaGlkZGVuXCIsXG4gICAgYWN0aXZlOiBcInJlc2l6YWJsZV9fc2l6ZS1idXR0b24tLWlzLWFjdGl2ZVwiXG4gIH0sXG4gIHdpZHRoX2luZGljYXRvcjogeyB2aXNpYmxlOiBcInJlc2l6YWJsZV9fd2lkdGgtaW5kaWNhdG9yLS1pcy12aXNpYmxlXCIgfVxufTtcblxudmFyIFNIT1dfV0lEVEhfRFVSQVRJT04gPSAyNTAwO1xuXG52YXIgUmVzaXphYmxlLCBrZXlfb25faGFuZGxlLCBoYW5kbGVfZHJhZ19tb3ZlLCBzdGFydF9kcmFnZ2luZ19oYW5kbGU7XG5cbi8vKlxuLy8gSGFuZGxlcyBrZXkgcHJlc3NlcyBvbiB0aGUgcmVzaXphYmxlIGhhbmRsZS4gSWYgdGhlIGtleSBpcyBhbiBhcnJvdyBrZXksXG4vLyB0aGUgcmVzaXphYmxlIGNvbXBvbmVudCB3aWxsIGJlIHJlc2l6ZWQgYXBwcm9wcmlhdGVseS4gSWYgdGhlIHNoaWZ0IGtleSBpc1xuLy8gYmVpbmcgcHJlc3NlZCBhdCB0aGUgc2FtZSB0aW1lLCB0aGUgcmVzaXppbmcgd2lsbCBiZSBhY2NlbGVyYXRlZC5cbi8vXG4vLyBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBUaGUgYGtleXByZXNzYCBldmVudC5cbi8vIEBwcml2YXRlXG5cbmtleV9vbl9oYW5kbGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgdmFyIHdpZHRoX2NoYW5nZTtcblxuICBpZiAoIV9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0tleWNvZGVzMltcImRlZmF1bHRcIl0uQVJST1dTLmluY2x1ZGVzKGV2ZW50LndoaWNoKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHdpZHRoX2NoYW5nZSA9IGV2ZW50LnNoaWZ0S2V5ID8gMTAgOiAyO1xuICBpZiAoW19Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0tleWNvZGVzMltcImRlZmF1bHRcIl0uTEVGVCwgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzS2V5Y29kZXMyW1wiZGVmYXVsdFwiXS5ET1dOXS5pbmNsdWRlcyhldmVudC53aGljaCkpIHtcbiAgICB3aWR0aF9jaGFuZ2UgPSB3aWR0aF9jaGFuZ2UgKiAtMTtcbiAgfVxuXG4gIFJlc2l6YWJsZVtcImZvclwiXShldmVudC50YXJnZXQpLnNldF93aWR0aCh7IGRlbHRhOiB3aWR0aF9jaGFuZ2UgfSk7XG59O1xuXG4vLypcbi8vIEhhbmRsZXMgYSBkcmFnIG1vdmVtZW50IHdoaWxlIGhvbGRpbmcgb250byBhIHJlc2l6YWJsZSBoYW5kbGUuIEFzIHRoZSB1c2VyXG4vLyBkcmFncywgdGhlIGFzc29jaWF0ZWQgcmVzaXphYmxlIGNvbXBvbmVudCB3aWxsIHJlc2l6ZS5cbi8vXG4vLyBAcGFyYW0ge09iamVjdH0gY29udGV4dCAtIFRoZSBjb250ZXh0IGZvciB0aGUgY3VycmVudCBkcmFnLlxuLy8gQHBhcmFtIHtPYmplY3R9IGV2ZW50ICAgLSBUaGUgYG1vdXNlbW92ZWAvIGB0b3VjaG1vdmVgIGV2ZW50LlxuLy9cbi8vIEBwcml2YXRlXG5cbmhhbmRsZV9kcmFnX21vdmUgPSBmdW5jdGlvbiAoY29udGV4dCwgZXZlbnQpIHtcbiAgdmFyIHggPSBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNVaV9ldmVudHMyW1wiZGVmYXVsdFwiXS5jb29yZGluYXRlcyhldmVudCkueCxcbiAgICAgIGRlbHRhID0geCAtIGNvbnRleHQuc3RhcnRfeDtcblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb250ZXh0LnNldF93aWR0aChjb250ZXh0LnN0YXJ0X3dpZHRoICsgMiAqIGRlbHRhKTtcbn07XG5cbi8vKlxuLy8gSW5pdGlhbGl6ZXMgdGhlIHJlcXVpcmVkIGV2ZW50cy8gYXR0cmlidXRlcyB0byBwZXJmb3JtIGEgZHJhZyBvbiBhIHJlc2l6YWJsZVxuLy8gaGFuZGxlLiBUaGlzIGZ1bmN0aW9uIGFsc28gcmVtb3ZlcyBhbGwgcG9pbnRlciBldmVudHMgb24gdGhlIHJlc2l6YWJsZSB0b1xuLy8gcHJldmVudCB1bm5lY2Vzc2FyeSBjbGlja3MvIGhvdmVycy8gc2VsZWN0cy5cbi8vXG4vLyBAcGFyYW0ge09iamVjdH0gY29udGV4dCAtIFRoZSBjb250ZXh0IGZvciB0aGUgY3VycmVudCBkcmFnLlxuXG5zdGFydF9kcmFnZ2luZ19oYW5kbGUgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICB2YXIgZHJhZ19tb3ZlLCBkcmFnX2VuZCwgbGlzdGVuZXJzO1xuXG4gIGNvbnRleHQuaWZyYW1lLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcblxuICBkcmFnX21vdmUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBoYW5kbGVfZHJhZ19tb3ZlKGNvbnRleHQsIGV2ZW50KTtcbiAgfTtcbiAgZHJhZ19lbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGlzdGVuZXJzLnJlbW92ZSgpO1xuICAgIGNvbnRleHQuaWZyYW1lLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBudWxsO1xuICB9O1xuXG4gIGxpc3RlbmVycyA9IF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc1VpX2V2ZW50czJbXCJkZWZhdWx0XCJdLmFkZF9kcmFnX2xpc3RlbmVycyhkcmFnX21vdmUsIGRyYWdfZW5kKTtcbn07XG5cbi8vKlxuLy8gVGhlIGNvbnN0cnVjdG9yIGFyb3VuZCBhIGBSZXNpemFibGVgIGNvbXBvbmVudC4gVGhpcyBjb21wb25lbnQgbWFuYWdlcyBtYW55XG4vLyB0aGluZ3MsIGluY2x1ZGluZzogdGhlIGludGlhbGl6YXRpb24gb2YgcmVzaXppbmcgYnkgZHJhZ2dpbmcgb24gdGhlXG4vLyBgUmVzaXphYmxlYCdzIGhhbmRsZSwgcmVzcG9uZGluZyB0byBjaGFuZ2VzIGluIHRoZSB2aWV3cG9ydCBzaXplLCBhbmRcbi8vIHJlc3BvbmRpbmcgdG8gY2hhbmdlcyBpbiB0aGUgaGVpZ2h0IG9mIHRoZSBjb250YWluZWQgYGlmcmFtZWAuXG4vL1xuLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSAtIFRoZSByb290IG5vZGUgZm9yIHRoZSBgUmVzaXphYmxlYFxuLy9cbi8vIEBmYWN0b3J5XG5cblJlc2l6YWJsZSA9IGZ1bmN0aW9uIChyb290KSB7XG4gIHZhciBhcGksIHN0cnVjdHVyZSwgc2V0X3dpZHRoLCBzaG93X3dpZHRoLCBzaXplX2J1dHRvbnMsIGhhbmRsZV9ob3N0X3Jlc2l6ZSwgbWluX3dpZHRoLCBtYXhfd2lkdGgsIGNvbnRhaW5lcl9zaWRlX3BhZGRpbmcsIHdpZHRoX3Rha2VuX2J5X3NpZGVfY29tcG9uZW50cywgY29tbXVuaWNhdG9yLCByZXNwb25kX3RvX2hlaWdodCwgc2V0X2hlaWdodCwgaW5pdGlhbGl6ZV9oYW5kbGVfcmVzaXplLCBjb250YWluZXJfc3R5bGVzO1xuXG4gIHNpemVfYnV0dG9ucyA9IF9zaXplX2J1dHRvbnMyW1wiZGVmYXVsdFwiXS53aXRoaW4ocm9vdClbMF07XG5cbiAgY29tbXVuaWNhdG9yID0gKDAsIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZUNvbXBvbmVudHNJZnJhbWUuQ29tbXVuaWNhdG9yKSgpO1xuICBjb21tdW5pY2F0b3IucmVnaXN0ZXIuZnJvbV9ub2RlKHJvb3QpO1xuXG4gIHJlc3BvbmRfdG9faGVpZ2h0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgc2V0X2hlaWdodChldmVudC5oZWlnaHQpO1xuICB9O1xuICBjb21tdW5pY2F0b3Iub24oX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzRXZlbnRzMltcImRlZmF1bHRcIl0udHlwZXMuaGVpZ2h0X2NoYW5nZSwgcmVzcG9uZF90b19oZWlnaHQpO1xuICBjb21tdW5pY2F0b3Iub24oX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzRXZlbnRzMltcImRlZmF1bHRcIl0udHlwZXMuaGVpZ2h0X3JlcXVlc3QsIHJlc3BvbmRfdG9faGVpZ2h0KTtcblxuICBzdHJ1Y3R1cmUgPSB7XG4gICAgcm9vdDogcm9vdCxcbiAgICBpZnJhbWU6IHJvb3QucXVlcnlTZWxlY3RvcihcImlmcmFtZVwiKSxcbiAgICBoYW5kbGU6IHJvb3QucXVlcnlTZWxlY3RvcihcIi5cIiArIGNsYXNzZXMuaGFuZGxlKSxcbiAgICBjb250YWluZXI6IHJvb3QucGFyZW50Tm9kZSxcbiAgICB3aWR0aF9pbmRpY2F0b3I6IHJvb3QucXVlcnlTZWxlY3RvcihcIi5cIiArIGNsYXNzZXMud2lkdGhfaW5kaWNhdG9yKVxuICB9O1xuXG4gIGNvbnRhaW5lcl9zdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzdHJ1Y3R1cmUuY29udGFpbmVyKTtcbiAgY29udGFpbmVyX3NpZGVfcGFkZGluZyA9IHBhcnNlSW50KGNvbnRhaW5lcl9zdHlsZXMucGFkZGluZ0xlZnQsIDEwKSArIHBhcnNlSW50KGNvbnRhaW5lcl9zdHlsZXMucGFkZGluZ1JpZ2h0LCAxMCk7XG5cbiAgd2lkdGhfdGFrZW5fYnlfc2lkZV9jb21wb25lbnRzID0gc3RydWN0dXJlLmhhbmRsZS5vZmZzZXRXaWR0aDtcbiAgbWF4X3dpZHRoID0gc3RydWN0dXJlLmlmcmFtZS5vZmZzZXRXaWR0aDtcbiAgbWluX3dpZHRoID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUocm9vdCkubWluV2lkdGgsIDEwKSAtIHdpZHRoX3Rha2VuX2J5X3NpZGVfY29tcG9uZW50cztcblxuICAvLypcbiAgLy8gQ2hlY2tzIHdoZXRoZXIgb3Igbm90IGEgcmVzaXplIG9mIHRoZSB2aWV3cG9ydCBoYXMgY2F1c2VkIHRoZSByZXNpemFibGVcbiAgLy8gd2lkdGggdG8gYmUgZ3JlYXRlciB0aGFuIGl0IGlzIGFsbG93ZWQgdG8gYmUuIElmIHNvLCBpdCB3aWxsIGRlYWN0aXZhdGVcbiAgLy8gdGhlIHNpemUgYnV0dG9uIHRoYXQgY2F1c2VkIHRoYXQgd2lkdGggdG8gYmUgYWN0aXZlIChpZiBhcHBsaWNhYmxlKSwgYW5kXG4gIC8vIHdpbGwgcmVzaXplIHRoZSBgUmVzaXphYmxlYCBhbmQgZGlzcGxheSB0aGUgd2lkdGguXG4gIC8vXG4gIC8vIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIFRoZSBgcmVzaXplYCBldmVudCBvbiB0aGUgYHdpbmRvd2AuXG4gIC8vIEBwcml2YXRlXG5cbiAgaGFuZGxlX2hvc3RfcmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgIG1heF93aWR0aCA9IHN0cnVjdHVyZS5jb250YWluZXIub2Zmc2V0V2lkdGggLSBjb250YWluZXJfc2lkZV9wYWRkaW5nIC0gd2lkdGhfdGFrZW5fYnlfc2lkZV9jb21wb25lbnRzO1xuICAgIHNob3dfd2lkdGgoKTtcbiAgfTtcblxuICAvLypcbiAgLy8gU2V0cyB0aGUgaGVpZ2h0IG9mIHRoZSBgUmVzaXphYmxlYC4gVGhpcyBpcyBkb25lIGRpcmVjdGx5IG9uIHRoZSBjb250YWluZWRcbiAgLy8gYGlmcmFtZWAuXG4gIC8vXG4gIC8vIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgLSBUaGUgbmV3IGhlaWdodCBvZiB0aGUgY29udGFpbmVkIGBpZnJhbWVgLlxuICAvLyBAcHJpdmF0ZVxuXG4gIHNldF9oZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0KSB7XG4gICAgc3RydWN0dXJlLmlmcmFtZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gIH07XG5cbiAgLy8qXG4gIC8vIFNob3dzIHRoZSBjdXJyZW50IHdpZHRoIG9mIHRoZSBjb250YWluZWQgYGlmcmFtZWAuIFRoaXMgaW52b2x2ZXMgYSBmZXdcbiAgLy8gdGhpbmdzOiB0aGUgd2lkdGggaXMgY29udmVydGVkIHRvIGBlbWAgYW5kIGJvdGggdGhlIGBweGAgYW5kIGBlbWAgd2lkdGhzXG4gIC8vIGFyZSBkaXNwbGF5ZWQgaW4gdGhlIHdpZHRoIGluZGljYXRvciwgdGhlIHZpc2libGUgc3RhdGUgaXMgYWRkZWQgdG8gdGhlXG4gIC8vIHdpZHRoIGluZGljYXRvciwgYW5kIGEgdGltZW91dCBpcyBzZXQgdXAgdG8gcmVtb3ZlIHRoZSB2aXNpYmxlIHN0YXRlIChzb1xuICAvLyB0aGF0IHRoZSBpbmRpY2F0b3IgaXMgaGlkZGVuIGFmdGVyIGEgc21hbGwgZGVsYXkpLlxuICAvL1xuICAvLyBAcGFyYW0ge051bWJlcn0gd2lkdGggKGlmcmFtZS5vZmZzZXRXaWR0aCkgLSBUaGUgd2lkdGggdG8gZGlzcGxheS5cbiAgLy8gQHByaXZhdGVcblxuICBzaG93X3dpZHRoID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2hvd193aWR0aF90aW1lb3V0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB3aWR0aCA9IHN0cnVjdHVyZS5pZnJhbWUub2Zmc2V0V2lkdGg7XG5cbiAgICAgIHN0cnVjdHVyZS53aWR0aF9pbmRpY2F0b3IucXVlcnlTZWxlY3RvcihcIi5cIiArIGNsYXNzZXMucHhfaW5kaWNhdG9yKS50ZXh0Q29udGVudCA9IHdpZHRoO1xuICAgICAgc3RydWN0dXJlLndpZHRoX2luZGljYXRvci5xdWVyeVNlbGVjdG9yKFwiLlwiICsgY2xhc3Nlcy5lbV9pbmRpY2F0b3IpLnRleHRDb250ZW50ID0gKHdpZHRoIC8gMTYpLnRvRml4ZWQoMik7XG5cbiAgICAgIGlmIChzaG93X3dpZHRoX3RpbWVvdXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHNob3dfd2lkdGhfdGltZW91dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHJ1Y3R1cmUud2lkdGhfaW5kaWNhdG9yLmNsYXNzTGlzdC5hZGQoc3RhdGVzLndpZHRoX2luZGljYXRvci52aXNpYmxlKTtcbiAgICAgIH1cblxuICAgICAgc2hvd193aWR0aF90aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0cnVjdHVyZS53aWR0aF9pbmRpY2F0b3IuY2xhc3NMaXN0LnJlbW92ZShzdGF0ZXMud2lkdGhfaW5kaWNhdG9yLnZpc2libGUpO1xuICAgICAgICBzaG93X3dpZHRoX3RpbWVvdXQgPSBudWxsO1xuICAgICAgfSwgU0hPV19XSURUSF9EVVJBVElPTik7XG4gICAgfTtcbiAgfSkoKTtcblxuICBzZXRfd2lkdGggPSBmdW5jdGlvbiAod2lkdGgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gICAgaWYgKHR5cGVvZiB3aWR0aCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgb3B0aW9ucyA9IHdpZHRoO1xuICAgICAgd2lkdGggPSByb290Lm9mZnNldFdpZHRoIC0gd2lkdGhfdGFrZW5fYnlfc2lkZV9jb21wb25lbnRzICsgKG9wdGlvbnMuZGVsdGEgfHwgMCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuYW5pbWF0ZWQpIHtcbiAgICAgIHJvb3QuY2xhc3NMaXN0LmFkZChzdGF0ZXMucm9vdC50cmFuc2l0aW9uaW5nKTtcbiAgICAgIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc1VpX2V2ZW50czJbXCJkZWZhdWx0XCJdLnRyYW5zaXRpb24ocm9vdCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoc3RhdGVzLnJvb3QudHJhbnNpdGlvbmluZyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAod2lkdGgpIHtcbiAgICAgIHdpZHRoID0gTWF0aC5tYXgoTWF0aC5taW4od2lkdGgsIG1heF93aWR0aCksIG1pbl93aWR0aCk7XG4gICAgICByb290LnN0eWxlLndpZHRoID0gd2lkdGggKyB3aWR0aF90YWtlbl9ieV9zaWRlX2NvbXBvbmVudHMgKyBcInB4XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3Quc3R5bGUud2lkdGggPSBudWxsO1xuICAgIH1cblxuICAgIHNob3dfd2lkdGgoKTtcblxuICAgIHNpemVfYnV0dG9ucy50cnlfc2l6ZSh3aWR0aCk7XG4gICAgcmV0dXJuIHdpZHRoO1xuICB9O1xuXG4gIC8vKlxuICAvLyBMaXN0ZW5zIGZvciB0aGUgc3RhcnQgb2YgYSBkcmFnIG9uIHRoZSBgUmVzaXphYmxlYCBjb21wb25lbnQncyBoYW5kbGUgYW5kXG4gIC8vIHBhc3NlcyB0aGUgYXNzb2NpYXRlZCBjb250ZXh0IHRvIGBzdGFydF9kcmFnZ2luZ19oYW5kbGVgIHNvIHRoYXQgdGhlIGRyYWdcbiAgLy8gZXZlbnRzIGNhbiBiZSBwcm9wZXJseSBhdHRhY2hlZC5cbiAgLy9cbiAgLy8gQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gVGhlIGBtb3VzZWRvd25gLyBgdG91Y2hzdGFydGAgZXZlbnQuXG4gIC8vIEBwcml2YXRlXG5cbiAgaW5pdGlhbGl6ZV9oYW5kbGVfcmVzaXplID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIGNvbnRleHQgPSB7XG4gICAgICBzdGFydF94OiBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNVaV9ldmVudHMyW1wiZGVmYXVsdFwiXS5jb29yZGluYXRlcyhldmVudCkueCxcbiAgICAgIHN0YXJ0X3dpZHRoOiBzdHJ1Y3R1cmUuaWZyYW1lLm9mZnNldFdpZHRoLFxuICAgICAgbWF4X3dpZHRoOiBzdHJ1Y3R1cmUuY29udGFpbmVyLm9mZnNldFdpZHRoIC0gY29udGFpbmVyX3NpZGVfcGFkZGluZyxcbiAgICAgIHNldF93aWR0aDogc2V0X3dpZHRoLFxuICAgICAgaWZyYW1lOiBzdHJ1Y3R1cmUuaWZyYW1lXG4gICAgfTtcblxuICAgIHN0YXJ0X2RyYWdnaW5nX2hhbmRsZShjb250ZXh0KTtcbiAgfTtcblxuICBzaG93X3dpZHRoKCk7XG5cbiAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGhhbmRsZV9ob3N0X3Jlc2l6ZSk7XG4gICQoc3RydWN0dXJlLmhhbmRsZSkub24oX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzVWlfZXZlbnRzMltcImRlZmF1bHRcIl0uZHJhZy5zdGFydCwgaW5pdGlhbGl6ZV9oYW5kbGVfcmVzaXplKTtcblxuICBhcGkgPSB7IHNldF93aWR0aDogc2V0X3dpZHRoIH07XG4gIHJldHVybiBhcGk7XG59O1xuXG5SZXNpemFibGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgX3NpemVfYnV0dG9uczJbXCJkZWZhdWx0XCJdLmluaXQoKTtcbiAgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzQnVpbGRlcjJbXCJkZWZhdWx0XCJdLmJ1aWxkX2FuZF9jYWNoZShSZXNpemFibGUsIHsgbmFtZTogY2xhc3Nlcy5yb290IH0pO1xuXG4gICQoZG9jdW1lbnQpLm9uKFwia2V5ZG93blwiLCBcIi5cIiArIGNsYXNzZXMuaGFuZGxlLCBrZXlfb25faGFuZGxlKTtcbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gUmVzaXphYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxufSx7XCIuL3NpemVfYnV0dG9uc1wiOjEyLFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL2NvbXBvbmVudHMvaWZyYW1lXCI6NyxcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS91dGlsaXRpZXMvYnVpbGRlclwiOjIzLFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy9ldmVudHNcIjoyNixcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS91dGlsaXRpZXMva2V5Y29kZXNcIjoyNyxcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS91dGlsaXRpZXMvdWlfZXZlbnRzXCI6MzYsXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIjo1NH1dLDEyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2dldEl0ZXJhdG9yID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX0FycmF5JGZyb20gPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb21cIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0aWVzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXNcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3Jlc2l6YWJsZSA9IHJlcXVpcmUoXCIuL3Jlc2l6YWJsZVwiKTtcblxudmFyIF9yZXNpemFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVzaXphYmxlKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0J1aWxkZXIgPSByZXF1aXJlKFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy9idWlsZGVyXCIpO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzQnVpbGRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0J1aWxkZXIpO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzS2V5Y29kZXMgPSByZXF1aXJlKFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy9rZXljb2Rlc1wiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0tleWNvZGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzS2V5Y29kZXMpO1xuXG52YXIgU2l6ZUJ1dHRvbnMsIFNpemVSZWxhdGlvbnNoaXBzLCBjbGlja19zaXplX2J1dHRvbiwgbmV4dF91bmhpZGRlbl9zaXplX2J1dHRvbiwgcHJldmlvdXNfdW5oaWRkZW5fc2l6ZV9idXR0b24sIGtleV9vbl9zaXplX2J1dHRvbjtcblxudmFyIGNsYXNzZXMgPSB7XG4gIHJvb3Q6IFwicmVzaXphYmxlX19zaXplLWJ1dHRvblwiLFxuICBjb250YWluZXI6IFwicmVzaXphYmxlX19zaXplLWJ1dHRvbnNcIlxufTtcblxudmFyIHN0YXRlcyA9IHtcbiAgcm9vdDoge1xuICAgIGhpZGRlbjogXCJyZXNpemFibGVfX3NpemUtYnV0dG9uLS1pcy1oaWRkZW5cIixcbiAgICBhY3RpdmU6IFwicmVzaXphYmxlX19zaXplLWJ1dHRvbi0taXMtYWN0aXZlXCJcbiAgfVxufTtcblxudmFyIGF0dHJzID0ge1xuICBidXR0b25fc2l6ZTogXCJkYXRhLXJlc2l6YWJsZS1zaXplLWJ1dHRvbi1zaXplXCIsXG4gIHNpemVfdG86IFwiZGF0YS1yZXNpemFibGUtc2l6ZS10b1wiXG59O1xuXG5TaXplUmVsYXRpb25zaGlwcyA9IHtcbiAgU01BTEw6IDMyMCxcbiAgTUVESVVNOiA3NjgsXG4gIExBUkdFOiA5NjBcbn07XG5cbi8vIEF0dGFjaGVzIG1lZGlhIHF1ZXJpZXMgZm9yIGVhY2ggb2YgdGhlIHNpemUgYnV0dG9ucyB0byBjb25kaXRpb25hbGx5IGhpZGUvXG4vLyBzaG93IHRoZW0gZGVwZW5kaW5nIG9uIHdoZXRoZXIgb3Igbm90IHRoZSBzaXplIHRoZXkgd2FudCB0byBnZW5lcmF0ZSBpcyB3aXRoaW5cbi8vIHRoZSBhdmFpbGFibGUgc3BhY2UuXG4vL1xuLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gYnV0dG9uIC0gVGhlIHNpemUgYnV0dG9uLiBJdCBzaG91bGQgaGF2ZSBhblxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgYXR0cnMuYnV0dG9uX3NpemVgIGF0dHJpYnV0ZSwgd2hpY2ggZGV0ZXJtaW5lc1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGF0IHNpemUgdGhleSBzaG91bGQgbWFrZSB0aGUgY29tcG9uZW50LlxuLy8gQHBhcmFtIHtOdW1iZXJ9IHNpemVfYWRqdXN0bWVudCAtIFRoZSBkaWZmZXJlbmNlIGluIHdpZHRoIGJldHdlZW4gdGhlIHZpZXdwb3J0XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzcGFjZSBhdmFpbGFibGUgdG8gdGhlIGNvbXBvbmVudC5cbi8vXG4vLyBAcHJpdmF0ZVxuXG4vLyBhdHRhY2hfbWVkaWFfbGlzdGVuZXJfdG9fc2l6ZV9idXR0b24gPSAoYnV0dG9uLCBzaXplX2FkanVzdG1lbnQgPSAwKSA9PiB7XG4vLyAgIHZhciBzaXplID0gYnV0dG9uLmdldEF0dHJpYnV0ZShhdHRycy5idXR0b25fc2l6ZSksXG4vLyAgICAgICByZXNwb25kX3dpZHRoID0gU2l6ZVJlbGF0aW9uc2hpcHNbc2l6ZS50b1VwcGVyQ2FzZSgpXSxcbi8vICAgICAgIGxpc3RlbmVyLCBtZWRpYV9xdWVyeTtcblxuLy8gICBpZighcmVzcG9uZF93aWR0aCkgeyByZXR1cm47IH1cbi8vICAgYnV0dG9uLnNldEF0dHJpYnV0ZShhdHRycy5zaXplX3RvLCByZXNwb25kX3dpZHRoKTtcblxuLy8gICBsaXN0ZW5lciA9IChtcSkgPT4ge1xuLy8gICAgIGJ1dHRvbi5jbGFzc0xpc3RbbXEubWF0Y2hlcyA/IFwicmVtb3ZlXCIgOiBcImFkZFwiXShzdGF0ZXMuc2l6ZV9idXR0b24uaGlkZGVuKTtcbi8vICAgfTtcblxuLy8gICBtZWRpYV9xdWVyeSA9IHdpbmRvdy5tYXRjaE1lZGlhKGAobWluLXdpZHRoOiAke3Jlc3BvbmRfd2lkdGggKyBzaXplX2FkanVzdG1lbnR9cHgpYCk7XG4vLyAgIG1lZGlhX3F1ZXJ5LmFkZExpc3RlbmVyKGxpc3RlbmVyKTtcbi8vICAgbGlzdGVuZXIobWVkaWFfcXVlcnkpO1xuLy8gfTtcblxuLy8qXG4vLyBDYXB0dXJlcyBhIGNsaWNrIGV2ZW4gb24gYSBzaXplIGJ1dHRvbiBhbmQgc2VuZHMgdGhlIGFwcHJvcHJpYXRlIGBzZXRfd2lkdGhgXG4vLyBtZXRob2QgY2FsbCB0byB0aGUgYXNzb2NpYXRlZCBgUmVzaXphYmxlYCBjb21wb25lbnQuXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gVGhlIGNsaWNrIGV2ZW50LlxuLy8gQHByaXZhdGVcblxuY2xpY2tfc2l6ZV9idXR0b24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgdmFyIGJ1dHRvbiA9ICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFwiLlwiICsgY2xhc3Nlcy5yb290KTtcbiAgU2l6ZUJ1dHRvbnNbXCJmb3JcIl0oYnV0dG9uKS5hY3RpdmVfYnV0dG9uID0gYnV0dG9uO1xufTtcblxuLy8qXG4vLyBGaW5kcyB0aGUgbmV4dCB2aXNpYmxlIHNpemUgYnV0dG9uIGFmdGVyIHRoZSBwYXNzZWQgYGJ1dHRvbmAuIFRoaXMgaXMgdXNlZFxuLy8gZm9yIGN5Y2xpbmcgdGhyb3VnaCB0aGVzZSBidXR0b25zIHdpdGggdGhlIGtleWJvYXJkLiBUaGlzIHdpbGwgY3ljbGUgdGhyb3VnaFxuLy8gYWxsIGJ1dHRvbnMgaW4gdGhlIGxpc3QsIHdyYXBwaW5nIGFyb3VuZCB0byB0aGUgZmlyc3QgYnV0dG9ucyBpZiBubyBmb2xsb3dpbmdcbi8vIGJ1dHRvbnMgYXJlIHZpc2libGUuIEFzIGEgcmVzdWx0LCB0aGlzIG1ldGhvZCBtaWdodCByZXR1cm4gdGhlIHNhbWUgYGJ1dHRvbmBcbi8vIHRoYXQgd2FzIHBhc3NlZCAoaWYgaXQgaXMgdGhlIG9ubHkgdmlzaWJsZSBzaXplIGJ1dHRvbikuXG4vL1xuLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gYnV0dG9uIC0gVGhlIGN1cnJlbnQgYnV0dG9uICh0aGF0IHRoZSB1c2VyIGlzIG1vdmluZyBvZmZcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Ygd2l0aCB0aGUga2V5Ym9hcmQpLlxuLy9cbi8vIEBwcml2YXRlXG4vLyBAcmV0dXJucyBIVE1MRWxlbWVudCAtIFRoZSBuZXh0IHZpc2libGUgc2l6ZSBidXR0b24gd2l0aGluIHRoZSBgYnV0dG9uYCdzIHNldC5cblxubmV4dF91bmhpZGRlbl9zaXplX2J1dHRvbiA9IGZ1bmN0aW9uIChidXR0b24pIHtcbiAgdmFyIHNpYmxpbmcgPSBidXR0b24ubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gIHdoaWxlIChzaWJsaW5nKSB7XG4gICAgaWYgKCFzaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucyhzdGF0ZXMuc2l6ZV9idXR0b24uaGlkZGVuKSkge1xuICAgICAgcmV0dXJuIHNpYmxpbmc7XG4gICAgfVxuICAgIHNpYmxpbmcgPSBzaWJsaW5nLm5leHRFbGVtZW50U2libGluZztcbiAgfVxuXG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9nZXRJdGVyYXRvcihfQXJyYXkkZnJvbShidXR0b24ucGFyZW50Tm9kZS5jaGlsZHJlbikpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICBzaWJsaW5nID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgIGlmIChzaWJsaW5nID09PSBidXR0b24pIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoIXNpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKHN0YXRlcy5zaXplX2J1dHRvbi5oaWRkZW4pKSB7XG4gICAgICAgIHJldHVybiBzaWJsaW5nO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgIF9pdGVyYXRvcltcInJldHVyblwiXSgpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vLypcbi8vIEZpbmRzIHRoZSBwcmV2aW91cyB2aXNpYmxlIHNpemUgYnV0dG9uIGFmdGVyIHRoZSBwYXNzZWQgYGJ1dHRvbmAuIFRoaXMgaXMgdXNlZFxuLy8gZm9yIGN5Y2xpbmcgdGhyb3VnaCB0aGVzZSBidXR0b25zIHdpdGggdGhlIGtleWJvYXJkLiBUaGlzIHdpbGwgY3ljbGUgdGhyb3VnaFxuLy8gYWxsIGJ1dHRvbnMgaW4gdGhlIGxpc3QsIHdyYXBwaW5nIGFyb3VuZCB0byB0aGUgbGFzdCBidXR0b25zIGlmIG5vIHByZXZpb3VzXG4vLyBidXR0b25zIGFyZSB2aXNpYmxlLiBBcyBhIHJlc3VsdCwgdGhpcyBtZXRob2QgbWlnaHQgcmV0dXJuIHRoZSBzYW1lIGBidXR0b25gXG4vLyB0aGF0IHdhcyBwYXNzZWQgKGlmIGl0IGlzIHRoZSBvbmx5IHZpc2libGUgc2l6ZSBidXR0b24pLlxuLy9cbi8vIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJ1dHRvbiAtIFRoZSBjdXJyZW50IGJ1dHRvbiAodGhhdCB0aGUgdXNlciBpcyBtb3Zpbmcgb2ZmXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mIHdpdGggdGhlIGtleWJvYXJkKS5cbi8vXG4vLyBAcHJpdmF0ZVxuLy8gQHJldHVybnMgSFRNTEVsZW1lbnQgLSBUaGUgcHJldmlvdXMgdmlzaWJsZSBzaXplIGJ1dHRvbiB3aXRoaW4gdGhlIGBidXR0b25gJ3Ncbi8vICAgICAgICAgICAgICAgICAgICAgICBzZXQuXG5cbnByZXZpb3VzX3VuaGlkZGVuX3NpemVfYnV0dG9uID0gZnVuY3Rpb24gKGJ1dHRvbikge1xuICB2YXIgc2libGluZyA9IGJ1dHRvbi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuXG4gIHdoaWxlIChzaWJsaW5nKSB7XG4gICAgaWYgKCFzaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucyhzdGF0ZXMuc2l6ZV9idXR0b24uaGlkZGVuKSkge1xuICAgICAgcmV0dXJuIHNpYmxpbmc7XG4gICAgfVxuICAgIHNpYmxpbmcgPSBzaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gIH1cblxuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gX2dldEl0ZXJhdG9yKF9BcnJheSRmcm9tKGJ1dHRvbi5wYXJlbnROb2RlLmNoaWxkcmVuKS5yZXZlcnNlKCkpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgIHNpYmxpbmcgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgIGlmIChzaWJsaW5nID09PSBidXR0b24pIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoIXNpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKHN0YXRlcy5zaXplX2J1dHRvbi5oaWRkZW4pKSB7XG4gICAgICAgIHJldHVybiBzaWJsaW5nO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMltcInJldHVyblwiXSkge1xuICAgICAgICBfaXRlcmF0b3IyW1wicmV0dXJuXCJdKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxuLy8qXG4vLyBIYW5kbGVzIGtleSBwcmVzc2VzIG9uIGEgc2l6ZSBidXR0b24uIElmIHRoZSBrZXkgaXMgZW50ZXIgb3Igc3BhY2UsIHRoZVxuLy8gc2l6ZSBidXR0b24gd2lsbCBiZSBhY3RpdmF0ZWQuIElmIHRoZSBrZXkgaXMgYW4gYXJyb3cga2V5LCB0aGlzIGZ1bmN0aW9uIHdpbGxcbi8vIG1vdmUgZm9jdXMgdG8gdGhlIGNvcnJlY3Qgc2libGluZyBzaXplIGJ1dHRvbi5cbi8vXG4vLyBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBUaGUgYGtleXByZXNzYCBldmVudC5cbi8vIEBwcml2YXRlXG5cbmtleV9vbl9zaXplX2J1dHRvbiA9IGZ1bmN0aW9uIChldmVudCkge1xuICB2YXIgYnV0dG9uLCBuZXdfYnV0dG9uO1xuXG4gIGlmIChfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNLZXljb2RlczJbXCJkZWZhdWx0XCJdLkFDVElWQVRFLmluY2x1ZGVzKGV2ZW50LndoaWNoKSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2xpY2tfc2l6ZV9idXR0b24oZXZlbnQpO1xuICB9XG5cbiAgaWYgKF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0tleWNvZGVzMltcImRlZmF1bHRcIl0uQVJST1dTLmluY2x1ZGVzKGV2ZW50LndoaWNoKSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgYnV0dG9uID0gJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIuXCIgKyBjbGFzc2VzLnNpemVfYnV0dG9uKVswXTtcbiAgICBuZXdfYnV0dG9uID0gX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzS2V5Y29kZXMyW1wiZGVmYXVsdFwiXS5ORVhULmluY2x1ZGVzKGV2ZW50LndoaWNoKSA/IG5leHRfdW5oaWRkZW5fc2l6ZV9idXR0b24oYnV0dG9uKSA6IHByZXZpb3VzX3VuaGlkZGVuX3NpemVfYnV0dG9uKGJ1dHRvbik7XG5cbiAgICBpZiAobmV3X2J1dHRvbikge1xuICAgICAgU2l6ZUJ1dHRvbnNbXCJmb3JcIl0oYnV0dG9uKS5mb2N1c2VkX2J1dHRvbiA9IG5ld19idXR0b247XG4gICAgfVxuICB9XG59O1xuXG4vLypcbi8vIEBmYWN0b3J5XG5cblNpemVCdXR0b25zID0gZnVuY3Rpb24gKGJ1dHRvbnMpIHtcbiAgdmFyIGFwaSwgYXNzb2NpYXRpb25zLCBhY3RpdmVfYnV0dG9uLCBhMTF5LCBhY3RpdmF0ZV9idXR0b24sIGZvY3VzX2J1dHRvbiwgYWN0aXZhdGVfYWN0aXZlX2J1dHRvbiwgZGVhY3RpdmF0ZV9hY3RpdmVfYnV0dG9uLCBzaXplLCBhX2J1dHRvbjtcblxuICBidXR0b25zID0gX0FycmF5JGZyb20oYnV0dG9ucy5jaGlsZHJlbik7XG4gIGFzc29jaWF0aW9ucyA9IHt9O1xuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvcjMgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gX2dldEl0ZXJhdG9yKGJ1dHRvbnMpLCBfc3RlcDM7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSAoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWUpIHtcbiAgICAgIGFfYnV0dG9uID0gX3N0ZXAzLnZhbHVlO1xuXG4gICAgICBzaXplID0gU2l6ZVJlbGF0aW9uc2hpcHNbYV9idXR0b24uZ2V0QXR0cmlidXRlKGF0dHJzLmJ1dHRvbl9zaXplKV07XG4gICAgICBhc3NvY2lhdGlvbnNbc2l6ZV0gPSBhX2J1dHRvbjtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yMyA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjNbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgX2l0ZXJhdG9yM1tcInJldHVyblwiXSgpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IzKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhMTF5ID0ge1xuICAgIGZvY3VzOiBmdW5jdGlvbiBmb2N1cyhidXR0b24pIHtcbiAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIjBcIik7XG4gICAgICBidXR0b24uZm9jdXMoKTtcbiAgICB9LFxuXG4gICAgYmx1cjogZnVuY3Rpb24gYmx1cihidXR0b24pIHtcbiAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgIH0sXG5cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uIHNlbGVjdChidXR0b24pIHtcbiAgICAgIHRoaXMuZm9jdXMoYnV0dG9uKTtcbiAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIFwidHJ1ZVwiKTtcbiAgICB9LFxuXG4gICAgZGVzZWxlY3Q6IGZ1bmN0aW9uIGRlc2VsZWN0KGJ1dHRvbikge1xuICAgICAgdGhpcy5ibHVyKGJ1dHRvbik7XG4gICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBcImZhbHNlXCIpO1xuICAgIH1cbiAgfTtcblxuICBkZWFjdGl2YXRlX2FjdGl2ZV9idXR0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFhY3RpdmVfYnV0dG9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYTExeS5kZXNsZWN0KGFjdGl2ZV9idXR0b24pO1xuICAgIGFjdGl2ZV9idXR0b24uY2xhc3NMaXN0LnJlbW92ZShzdGF0ZXMucm9vdC5hY3RpdmUpO1xuICB9O1xuXG4gIGFjdGl2YXRlX2J1dHRvbiA9IGZ1bmN0aW9uIChidXR0b24pIHtcbiAgICBpZiAoIWJ1dHRvbnMuaW5jbHVkZXMoYnV0dG9uKSB8fCBhY3RpdmVfYnV0dG9uID09PSBidXR0b24pIHtcbiAgICAgIHJldHVybiBhY3RpdmVfYnV0dG9uO1xuICAgIH1cblxuICAgIGRlYWN0aXZhdGVfYWN0aXZlX2J1dHRvbigpO1xuICAgIGFjdGl2ZV9idXR0b24gPSBidXR0b247XG4gICAgX3Jlc2l6YWJsZTJbXCJkZWZhdWx0XCJdW1wiZm9yXCJdKGJ1dHRvbikuc2V0X3dpZHRoKHBhcnNlSW50KGJ1dHRvbi5nZXRBdHRyaWJ1dGUoYXR0cnMuc2l6ZV9idXR0b24pLCAxMCksIHsgYW5pbWF0ZWQ6IHRydWUgfSk7XG4gICAgYWN0aXZhdGVfYWN0aXZlX2J1dHRvbigpO1xuICAgIHJldHVybiBhY3RpdmVfYnV0dG9uO1xuICB9O1xuXG4gIGZvY3VzX2J1dHRvbiA9IGZ1bmN0aW9uIChidXR0b24pIHtcbiAgICBhMTF5LmZvY3VzKGJ1dHRvbik7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfTtcblxuICBhY3RpdmF0ZV9hY3RpdmVfYnV0dG9uID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghYWN0aXZlX2J1dHRvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGExMXkuc2VsZWN0KGFjdGl2ZV9idXR0b24pO1xuICAgIGFjdGl2ZV9idXR0b24uY2xhc3NMaXN0LmFkZChzdGF0ZXMucm9vdC5hY3RpdmUpO1xuICB9O1xuXG4gIGFwaSA9IF9PYmplY3QkZGVmaW5lUHJvcGVydGllcyh7XG5cbiAgICB0cnlfc2l6ZTogZnVuY3Rpb24gdHJ5X3NpemUobmV3X3NpemUpIHtcbiAgICAgIGRlYWN0aXZhdGVfYWN0aXZlX2J1dHRvbigpO1xuICAgICAgYWN0aXZlX2J1dHRvbiA9IGFzc29jaWF0aW9uc1tuZXdfc2l6ZV07XG4gICAgICBhY3RpdmF0ZV9hY3RpdmVfYnV0dG9uKCk7XG4gICAgfVxuICB9LCB7XG4gICAgYWN0aXZlX2J1dHRvbjoge1xuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoYnV0dG9uKSB7XG4gICAgICAgIHJldHVybiBhY3RpdmF0ZV9idXR0b24oYnV0dG9uKTtcbiAgICAgIH0sXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZV9idXR0b247XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgZm9jdXNlZF9idXR0b246IHtcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0KGJ1dHRvbikge1xuICAgICAgICByZXR1cm4gZm9jdXNfYnV0dG9uKGJ1dHRvbik7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGFwaTtcbn07XG5cblNpemVCdXR0b25zLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0J1aWxkZXIyW1wiZGVmYXVsdFwiXS5idWlsZF9hbmRfY2FjaGUoU2l6ZUJ1dHRvbnMsIHsgbmFtZTogY2xhc3Nlcy5jb250YWluZXIgfSk7XG5cbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5cIiArIGNsYXNzZXMucm9vdCwgY2xpY2tfc2l6ZV9idXR0b24pLm9uKFwia2V5ZG93blwiLCBcIi5cIiArIGNsYXNzZXMucm9vdCwga2V5X29uX3NpemVfYnV0dG9uKTtcbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gU2l6ZUJ1dHRvbnM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG59LHtcIi4vcmVzaXphYmxlXCI6MTEsXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL2J1aWxkZXJcIjoyMyxcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS91dGlsaXRpZXMva2V5Y29kZXNcIjoyNyxcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tXCI6NDEsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCI6NDIsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzXCI6NDYsXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIjo1NH1dLDEzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzQnVpbGRlciA9IHJlcXVpcmUoXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL2J1aWxkZXJcIik7XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNCdWlsZGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzQnVpbGRlcik7XG5cbnZhciBjbGFzc2VzID0ge1xuICByb290OiBcInNjcm9sbC1jb250YWluZXJcIlxufTtcblxudmFyIFNjcm9sbENvbnRhaW5lcjtcblxuU2Nyb2xsQ29udGFpbmVyID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgdmFyIGZvcmNlX2hlaWdodCA9IGZ1bmN0aW9uIGZvcmNlX2hlaWdodChoZWlnaHQpIHtcbiAgICBub2RlLnN0eWxlLm1pbkhlaWdodCA9IGhlaWdodCArIFwicHhcIjtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG1haW50YWluX2N1cnJlbnRfaGVpZ2h0OiBmdW5jdGlvbiBtYWludGFpbl9jdXJyZW50X2hlaWdodCgpIHtcbiAgICAgIGZvcmNlX2hlaWdodChub2RlLm9mZnNldEhlaWdodCk7XG4gICAgfSxcbiAgICByZXN0b3JlX2hlaWdodDogZnVuY3Rpb24gcmVzdG9yZV9oZWlnaHQoKSB7XG4gICAgICBub2RlLnN0eWxlLm1pbkhlaWdodCA9IG51bGw7XG4gICAgfSxcblxuICAgIHNjcm9sbF90bzogZnVuY3Rpb24gc2Nyb2xsX3RvKGNvbnRhaW5lZF9ub2RlKSB7XG4gICAgICBub2RlLnBhcmVudE5vZGUuc2Nyb2xsVG9wID0gY29udGFpbmVkX25vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgfVxuICB9O1xufTtcblxuU2Nyb2xsQ29udGFpbmVyLmluaXQgPSBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNCdWlsZGVyMltcImRlZmF1bHRcIl0uaW5pdGlhbGl6ZV9vbmNlKFNjcm9sbENvbnRhaW5lciwgeyBuYW1lOiBjbGFzc2VzLnJvb3QsIGNhY2hlOiB0cnVlIH0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFNjcm9sbENvbnRhaW5lcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbn0se1wiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy9idWlsZGVyXCI6MjMsXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIjo1NH1dLDE0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIGNsYXNzZXMgPSB7XG4gIHJvb3Q6IFwic2VsZWN0XCIsXG4gIGlucHV0OiBcInNlbGVjdF9faW5wdXRcIlxufTtcblxudmFyIHN0YXRlcyA9IHtcbiAgcm9vdDogeyBmb2N1c2VkOiBjbGFzc2VzLnJvb3QgKyBcIi0taXMtZm9jdXNlZFwiIH1cbn07XG5cbnZhciBTZWxlY3QsIGZvY3VzX29yX2JsdXJfc2VsZWN0O1xuXG4vLypcbi8vIFRyYW5zbGF0ZXMgdGhlIGBmb2N1c2AvIGBibHVyYCBldmVudHMgb24gdGhlIGFjdHVhbCBgc2VsZWN0YCBub2RlIGludG8gdGhlXG4vLyBhcHByb3ByaWF0ZSBhZGRpdGlvbi8gcmVtb3ZhbCBvZiB0aGUgZm9jdXNlZCBzdGF0ZSBvbiB0aGUgYmFzZSBub2RlIG9mIHRoZVxuLy8gY29tcG9uZW50LiBUaGlzIGhhcyB0byBiZSBkb25lIGJlY2F1c2UgbW9zdCBvZiB0aGUgdmlzdWFsIHN0eWxpbmcgZm9yIHRoZVxuLy8gY29tcG9uZW50IGlzIHBsYWNlZCBvbiB0aGUgY29udGFpbmVyLCBzbyBhbnkgYWRqdXN0bWVudHMgdG8gdGhvc2Ugc3R5bGVzIG9uXG4vLyBmb2N1cyByZXF1aXJlIHRoYXQgY29udGFpbmVyIHRvIGJlIGF3YXJlIG9mIHRoZSBzdGF0ZSBvZiBpdHMgY29udGFpbmVkXG4vLyBgc2VsZWN0YC5cbi8vXG4vLyBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBUaGUgYGZvY3VzYC8gYGJsdXJgIGV2ZW50IG9uIHRoZSBgc2VsZWN0YC5cbi8vIEBwcml2YXRlXG5cbmZvY3VzX29yX2JsdXJfc2VsZWN0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHZhciBtZXRob2QgPSBldmVudC50eXBlID09PSBcImZvY3VzaW5cIiA/IFwiYWRkXCIgOiBcInJlbW92ZVwiO1xuICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdChcIi4je0NMQVNTRVMuQkFTRX1cIilbMF0uY2xhc3NMaXN0W21ldGhvZF0oc3RhdGVzLnJvb3QuZm9jdXNlZCk7XG59O1xuXG5TZWxlY3QgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgJChkb2N1bWVudCkub24oXCJmb2N1cyBibHVyXCIsIFwiLlwiICsgY2xhc3Nlcy5pbnB1dCwgZm9jdXNfb3JfYmx1cl9zZWxlY3QpO1xuICB9XG59O1xuXG5leHBvcnRzLmNsYXNzZXMgPSBjbGFzc2VzO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBTZWxlY3Q7XG5cbn0se31dLDE1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZC10by1hcnJheVwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfQXJyYXkkZnJvbSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbVwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfZ2V0SXRlcmF0b3IgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNCdWlsZGVyID0gcmVxdWlyZShcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS91dGlsaXRpZXMvYnVpbGRlclwiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0J1aWxkZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNCdWlsZGVyKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0tleWNvZGVzID0gcmVxdWlyZShcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS91dGlsaXRpZXMva2V5Y29kZXNcIik7XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNLZXljb2RlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0tleWNvZGVzKTtcblxudmFyIGNsYXNzZXMgPSB7XG4gIHJvb3Q6IFwidGFibGVcIixcbiAgaGVhZGVyOiBcInRhYmxlX19oZWFkZXJcIixcbiAgYm9keTogXCJ0YWJsZV9fYm9keVwiLFxuICByb3c6IFwidGFibGVfX3Jvd1wiLFxuICBjZWxsOiBcInRhYmxlX19jZWxsXCIsXG4gIHNjcm9sbGVyOiBcInRhYmxlX19zY3JvbGxlclwiLFxuICBjb250YWluZXI6IFwidGFibGVfX2NvbnRhaW5lclwiLFxuICBhY3Rpb25zOiBcInRhYmxlX19hY3Rpb25zXCJcbn07XG5cbnZhciBzdGF0ZXMgPSB7XG4gIHNjcm9sbGVyOiB7IHNjcm9sbGVkOiBcInRhYmxlX19zY3JvbGxlci0taXMtc2Nyb2xsZWRcIiB9LFxuICBjb250YWluZXI6IHsgb3ZlcmZsb3dpbmc6IFwidGFibGVfX2NvbnRhaW5lci0taXMtb3ZlcmZsb3dpbmdcIiB9XG59O1xuXG52YXIgYXR0cnMgPSB7XG4gIGFjdGlvbjogXCJ0YWJsZS1hY3Rpb25cIlxufTtcblxudmFyIGFjdGlvbnMgPSB7XG4gIHNoaWZ0X3JpZ2h0OiBcInNoaWZ0LXJpZ2h0XCIsXG4gIHNoaWZ0X2xlZnQ6IFwic2hpZnQtbGVmdFwiXG59O1xuXG52YXIgVGFibGUsIGNhY2hlX3ByZWZlcnJlZF93aWR0aHMsIGNoZWNrX2Zvcl9vdmVyZmxvdywgc2hpZnRfdGFibGVfcmlnaHQsIHNoaWZ0X3RhYmxlX2xlZnQsIGxhc3RfdmlzaWJsZV9jZWxsLCBoYW5kbGVfa2V5cHJlc3MsIGhhbmRsZV9zY3JvbGwsIGluaXRpYWxpemVfdGFibGVfYWN0aW9ucywgdXBkYXRlX2FjdGlvbnM7XG5cbi8vKlxuLy8gQ2FsY3VsYXRlcyBhbmQgYXBwbGllcyB0aGUgaW50cmluc2ljIHdpZHRocyBvZiB0aGUgY29sdW1ucyBvZiBhIGB0YWJsZWAsXG4vLyBrZWVwaW5nIGluIG1pbmQgdGhlIGVmZmVjdGl2ZSBtYXhpbXVtIGNvbHVtbiBzaXplIGltcGxpZWQgYnkgdGhlIGBtaW4td2lkdGhgXG4vLyBzZXQgb24gdGhlIHRhYmxlLlxuLy9cbi8vIFRoZSBpbnRyaW5zaWMgd2lkdGhzIG9mIGVhY2ggY29sdW1uIGFyZSBhcHBsaWVkIG9ubHkgb25jZSwgdG8gdGhlIGhlYWRlclxuLy8gY2VsbHMgb2YgdGhlIGNvbHVtbi4gVGhlc2UgYXJlIGFwcGxpZWQgYnkgdXNpbmcgdGhlbSBhcyB0aGUgYG1pbi13aWR0aGBzIGZvclxuLy8gZWFjaCBoZWFkZXIgY2VsbCwgc28gdGhhdCB0aGUgdGFibGUgd2lsbCBhcHByb3ByaWF0ZWx5IG92ZXJmbG93IG9uY2UgdGhlXG4vLyBzcGFjZSBhdmFpbGFibGUgdG8gdGhlIHRhYmxlIGlzIGxlc3MgdGhhbiB0aGUgc3VtIG9mIGl0cyBpbnRyaW5zaWMgd2lkdGhzLlxuLy9cbi8vIEEgc2lkZSBlZmZlY3Qgb2YgdGhpcyBmdW5jdGlvbiBpcyB0aGF0IGBzZWxmYCBpcyBhdWdtZW50ZWQgd2l0aCB0aGUgbWluaW11bVxuLy8gdG90YWwgaW50cmluc2ljIHdpZHRoIG9mIGl0cyBjb2x1bW5zIChgbWluX3dpZHRoYCkuXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhIGBUYWJsZWAuXG4vLyBAcHJpdmF0ZVxuXG5jYWNoZV9wcmVmZXJyZWRfd2lkdGhzID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgdmFyIHRhYmxlID0gc2VsZi5yb290LFxuICAgICAgY2xvbmUgPSB0YWJsZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xvbmVOb2RlKHRydWUpLFxuICAgICAgd2lkdGhfY2FsY3VsYXRpb25fY29udGFpbmVyLFxuICAgICAgY2xvbmVfdGFibGUsXG4gICAgICBjbG9uZWRfaGVhZGVyX2NlbGxzO1xuXG4gIC8vIEZvciB0aGUgcHVycG9zZXMgb2YgdGhlIHdpZHRoIGNhbGN1bGF0aW9ucywgbGV0IHRoZSB0YWJsZSBiZSBhdCB0aGUgc21hbGxlclxuICAvLyBvZiBpdHMgaW50cmluc2ljIHNpemUgYW5kIHRoZSBgbWluLXdpZHRoYCBzZXQgaW4gQ1NTLlxuICBjbG9uZS5zdHlsZS5tYXhXaWR0aCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhYmxlKS5taW5XaWR0aDtcbiAgdGFibGUuc3R5bGUubWluV2lkdGggPSBcIjBweFwiO1xuICBjbG9uZS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcblxuICAvLyBDcmVhdGVzIGEgY29udGFpbmVyIHRoYXQgd29uJ3QgcmVzdHJpY3QgdGhlIHNpemUgb2YgdGhlIHRhYmxlLlxuICB3aWR0aF9jYWxjdWxhdGlvbl9jb250YWluZXIgPSAkKFwiPGRpdiBzdHlsZT0nd2lkdGg6IDEwMDAwcHg7IHZpc2liaWxpdHk6IGhpZGRlbjsgaGVpZ2h0OiAwOycgLz5cIilbMF07XG4gIHdpZHRoX2NhbGN1bGF0aW9uX2NvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9uZSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod2lkdGhfY2FsY3VsYXRpb25fY29udGFpbmVyKTtcblxuICBjbG9uZV90YWJsZSA9IGNsb25lLnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBjbGFzc2VzLnJvb3QpO1xuICBzZWxmLm1pbl93aWR0aCA9IGNsb25lX3RhYmxlLm9mZnNldFdpZHRoOyAvLyBzdW0gb2YgY29uc3RyYWluZWQgaW50cmluc2ljIHdpZHRoc1xuXG4gIC8vIEFwcGx5IHRoZSBjb25zdHJhaW5lZCBpbnRyaW5zaWMgd2lkdGhzIHRvIGVhY2ggb2YgdGhlIGhlYWRlciBjZWxscyBpbiB0aGVcbiAgLy8gYWN0dWFsIHRhYmxlLlxuICBjbG9uZWRfaGVhZGVyX2NlbGxzID0gX0FycmF5JGZyb20oY2xvbmUucXVlcnlTZWxlY3RvckFsbChcIi5cIiArIGNsYXNzZXMuaGVhZGVyICsgXCIgLlwiICsgY2xhc3Nlcy5jZWxsKSk7XG4gIHNlbGYuaGVhZGVyX2NlbGxzLmZvckVhY2goZnVuY3Rpb24gKGNlbGwsIGluZGV4KSB7XG4gICAgY2VsbC5zdHlsZS5taW5XaWR0aCA9IGNsb25lZF9oZWFkZXJfY2VsbHNbaW5kZXhdLm9mZnNldFdpZHRoICsgXCJweFwiO1xuICB9KTtcblxuICAvLyBDbGVhbnVwLlxuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHdpZHRoX2NhbGN1bGF0aW9uX2NvbnRhaW5lcik7XG59O1xuXG4vLypcbi8vIERldGVybWluZXMgd2hldGhlciBvciBub3QgdGhlcmUgaXMgb3ZlcmZsb3cgYW5kIHBlcmZvcm1zIGFsbCBuZWNlc3Nhcnkgc2l6ZVxuLy8gYW5kIG90aGVyIERPTSB1cGRhdGVzLiBUaGlzIGluY2x1ZGVzIGZpeGluZyB0aGUgc2l6ZSBvZiB0aGUgZmlyc3QgY2VsbCBpbiBhXG4vLyByb3cgYW5kIGFkZGluZyBhIGNvbXBlbnNhdGluZyBhbW91bnQgb2YgbGVmdCBwYWRkaW5nIHRvIHRoZSBzZWNvbmQgY2VsbCBpblxuLy8gZWFjaCByb3cgd2hlbiB0aGUgdGFibGUgc2hvdWxkIG92ZXJmbG93LCBhbmQgcmV2ZXJzaW5nIHRoaXMgd2hlbiBpdCBubyBsb25nZXJcbi8vIG5lZWRzIHRvIGRvIHNvLlxuLy9cbi8vIEBwYXJhbSB7T2JqZWN0fSBzZWxmIC0gVGhlIGludGVybmFsIGRldGFpbHMgb2YgYSBgVGFibGVgLlxuLy8gQHByaXZhdGVcblxuY2hlY2tfZm9yX292ZXJmbG93ID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgdmFyIHNjcm9sbGVyID0gc2VsZi5zY3JvbGxlcjtcbiAgdmFyIHJvb3QgPSBzZWxmLnJvb3Q7XG4gIHZhciBjb250YWluZXIgPSBzZWxmLmNvbnRhaW5lcjtcbiAgdmFyIG92ZXJmbG93aW5nID0gc2VsZi5vdmVyZmxvd2luZztcbiAgdmFyIG1pbl93aWR0aCA9IHNlbGYubWluX3dpZHRoO1xuICB2YXIgc2Nyb2xsZXJfd2lkdGggPSBzY3JvbGxlci5vZmZzZXRXaWR0aDtcbiAgdmFyIGZpcnN0X2NlbGxfd2lkdGg7dmFyIGNlbGw7dmFyIGF2YWlsYWJsZV9zcGFjZTt2YXIgaW5kZXg7XG5cbiAgaWYgKCFzY3JvbGxlcl93aWR0aCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIE5ld2x5IG92ZXJmbG93aW5nLCBnZXQgdGhlIGhlYWRlcidzIHdpZHRoIGFuZCBhcHBseSB0aGF0IHNhbWUgd2lkdGhcbiAgLy8gdG8gZWFjaCBmaXJzdCBjZWxsIChzaW5jZSB0aGV5J2xsIGJlIGFic29sdXRlbHkgcG9zaXRpb25lZCksIGFuZCBhZGQgYW5cbiAgLy8gZXF1aXZhbGVudCBhbW91bnQgb2YgbGVmdCBwYWRkaW5nIHRvIHRoZSBzZWNvbmQgY2VsbC5cbiAgaWYgKCFvdmVyZmxvd2luZyAmJiBzY3JvbGxlcl93aWR0aCA8IG1pbl93aWR0aCkge1xuICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2dldEl0ZXJhdG9yKF9BcnJheSRmcm9tKHJvb3QucXVlcnlTZWxlY3RvckFsbChcIi5cIiArIGNsYXNzZXMuY2VsbCArIFwiOmZpcnN0LWNoaWxkXCIpKSksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgY2VsbCA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgIGZpcnN0X2NlbGxfd2lkdGggPSBmaXJzdF9jZWxsX3dpZHRoIHx8IGNlbGwub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgY2VsbC5zdHlsZS53aWR0aCA9IGZpcnN0X2NlbGxfd2lkdGggKyBcInB4XCI7XG4gICAgICAgIHNlbGYuc2Nyb2xsZXIuc3R5bGUucGFkZGluZ0xlZnQgPSBmaXJzdF9jZWxsX3dpZHRoIC0gMSArIFwicHhcIjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoc3RhdGVzLmNvbnRhaW5lci5vdmVyZmxvd2luZyk7XG4gICAgc2VsZi5vdmVyZmxvd2luZyA9IHRydWU7XG4gIH1cblxuICAvLyBObyBsb25nZXIgb3ZlcmZsb3dpbmcg4oCUIHJldmVyc2Ugd2hhdCB3ZSBkaWQgYmVmb3JlIVxuICBpZiAob3ZlcmZsb3dpbmcgJiYgc2Nyb2xsZXJfd2lkdGggPj0gbWluX3dpZHRoKSB7XG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gX2dldEl0ZXJhdG9yKF9BcnJheSRmcm9tKHJvb3QucXVlcnlTZWxlY3RvckFsbChcIi5cIiArIGNsYXNzZXMuY2VsbCArIFwiOmZpcnN0LWNoaWxkXCIpKSksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICBjZWxsID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgIGZpcnN0X2NlbGxfd2lkdGggPSBmaXJzdF9jZWxsX3dpZHRoIHx8IGNlbGwub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgY2VsbC5zdHlsZS53aWR0aCA9IG51bGw7XG4gICAgICAgIHNlbGYuc2Nyb2xsZXIuc3R5bGUucGFkZGluZ0xlZnQgPSBudWxsO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yMltcInJldHVyblwiXSgpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7XG4gICAgdmFyIF9pdGVyYXRvckVycm9yMyA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gX2dldEl0ZXJhdG9yKHNlbGYuaGVhZGVyX2NlbGxzKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7XG4gICAgICAgIGNlbGwgPSBfc3RlcDMudmFsdWU7XG4gICAgICAgIGNlbGwuc3R5bGUubWF4V2lkdGggPSBudWxsO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IzID0gdHJ1ZTtcbiAgICAgIF9pdGVyYXRvckVycm9yMyA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyAmJiBfaXRlcmF0b3IzW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yM1tcInJldHVyblwiXSgpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IzKSB7XG4gICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoc3RhdGVzLmNvbnRhaW5lci5vdmVyZmxvd2luZyk7XG4gICAgc2VsZi5vdmVyZmxvd2luZyA9IGZhbHNlO1xuICB9XG5cbiAgLy8gRXZlbiBpZiBhbHJlYWR5IG92ZXJmbG93aW5nLCB1cGRhdGUgdGhlIG1heC13aWR0aHMgb2YgY29sdW1ucyBzdWNoIHRoYXQgdGhlXG4gIC8vIHBlcnNpc3RhbnQgY2VsbCArIGFueSBvdGhlciBjZWxsIDw9IHRoZSB0b3RhbCB3aWR0aC5cbiAgaWYgKHNjcm9sbGVyX3dpZHRoIDwgbWluX3dpZHRoKSB7XG4gICAgYXZhaWxhYmxlX3NwYWNlID0gc2Nyb2xsZXJfd2lkdGggLSBzZWxmLmhlYWRlcl9jZWxsc1swXS5vZmZzZXRXaWR0aDtcblxuICAgIGZvciAoaW5kZXggPSAxOyBpbmRleCsrOyBpbmRleCA8IHNlbGYuaGVhZGVyX2NlbGxzLmxlbmd0aCkge1xuICAgICAgc2VsZi5oZWFkZXJfY2VsbHNbaW5kZXhdLnN0eWxlLm1heFdpZHRoID0gYXZhaWxhYmxlX3NwYWNlICsgXCJweFwiO1xuICAgIH1cbiAgfVxufTtcblxubGFzdF92aXNpYmxlX2NlbGwgPSBmdW5jdGlvbiAoc2VsZikge1xuICB2YXIgbGFzdF9jZWxsID0gc2VsZi5oZWFkZXJfY2VsbHNbMV0sXG4gICAgICBwYXJlbnRfd2lkdGggPSBzZWxmLnNjcm9sbGVyLnNjcm9sbExlZnQgKyBzZWxmLnNjcm9sbGVyLm9mZnNldFdpZHRoIC0gcGFyc2VJbnQoc2VsZi5zY3JvbGxlci5zdHlsZS5wYWRkaW5nTGVmdCwgMTApLFxuICAgICAgd2lkdGhfc29fZmFyID0gbGFzdF9jZWxsLm9mZnNldFdpZHRoLFxuICAgICAgY2VsbCxcbiAgICAgIGluZGV4O1xuXG4gIGZvciAoaW5kZXggPSAyOyBpbmRleCsrOyBpbmRleCA8IHNlbGYuaGVhZGVyX2NlbGxzW2luZGV4XSkge1xuICAgIGNlbGwgPSBzZWxmLmhlYWRlcl9jZWxsc1tpbmRleF07XG4gICAgaWYgKHdpZHRoX3NvX2ZhciArIGNlbGwub2Zmc2V0V2lkdGggPiBwYXJlbnRfd2lkdGgpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBsYXN0X2NlbGwgPSBjZWxsO1xuICAgIHdpZHRoX3NvX2ZhciArPSBjZWxsLm9mZnNldFdpZHRoO1xuICB9XG5cbiAgcmV0dXJuIFtsYXN0X2NlbGwsIHBhcmVudF93aWR0aCAtIHdpZHRoX3NvX2Zhcl07XG59O1xuXG4vLypcbi8vIFNoaWZ0cyB0aGUgYFRhYmxlYCByZXByZXNlbnRlZCBieSBgc2VsZmAgdG8gdGhlIHJpZ2h0IGJ5IG9uZSBjb2x1bW4uIElmIHRoZVxuLy8gdGFibGUgY3VycmVudGx5IGhhcyBhIGNvbHVtbiB0aGF0IGlzIHBhcnRpYWxseSB2aXNpYmxlIG9uIHRoZSByaWdodCwgdGhlXG4vLyB0YWJsZSB3aWxsIGJlIHNjcm9sbGVkIHN1Y2ggdGhhdCB0aGF0IGVudGlyZSBjb2x1bW4gaXMgdmlzaWJsZS4gSWYgYSBjb2x1bW5cbi8vIGlzIGVudGlyZWx5IHZpc2libGUgYW5kIHByZXNzZWQgcmlnaHQgYWdhaW5zdCB0aGUgcmlnaHQgZWRnZSBvZiB0aGUgc2Nyb2xsXG4vLyBhcmVhLCB0aGUgbmV4dCAoZnVsbHkgaGlkZGVuKSBjb2x1bW4gd2lsbCBiZSBzaG93bi5cbi8vXG4vLyBUaGlzIGhhcyBubyBlZmZlY3QgaWYgdGhlIHRhYmxlIGlzIGFscmVhZHkgZnVsbHkgc2Nyb2xsZWQuXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhIGBUYWJsZWAuXG5cbnNoaWZ0X3RhYmxlX3JpZ2h0ID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgdmFyIGxhc3RfY2VsbCwgbmV4dF9jZWxsX292ZXJsYXA7XG5cbiAgaWYgKCFzZWxmLm92ZXJmbG93aW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIF9sYXN0X3Zpc2libGVfY2VsbCA9IGxhc3RfdmlzaWJsZV9jZWxsKHNlbGYpO1xuXG4gIHZhciBfbGFzdF92aXNpYmxlX2NlbGwyID0gX3NsaWNlZFRvQXJyYXkoX2xhc3RfdmlzaWJsZV9jZWxsLCAyKTtcblxuICBsYXN0X2NlbGwgPSBfbGFzdF92aXNpYmxlX2NlbGwyWzBdO1xuICBuZXh0X2NlbGxfb3ZlcmxhcCA9IF9sYXN0X3Zpc2libGVfY2VsbDJbMV07XG5cbiAgaWYgKGxhc3RfY2VsbCA9PT0gc2VsZi5oZWFkZXJfY2VsbHNbc2VsZi5oZWFkZXJfY2VsbHMubGVuZ3RoIC0gMV0pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc2VsZi5zY3JvbGxlci5zY3JvbGxMZWZ0ICs9IGxhc3RfY2VsbC5uZXh0RWxlbWVudFNpYmxpbmcub2Zmc2V0V2lkdGggLSBuZXh0X2NlbGxfb3ZlcmxhcDtcbiAgc2VsZi5zY3JvbGxlci5jbGFzc0xpc3QuYWRkKHN0YXRlcy5zY3JvbGxlci5zY3JvbGxlZCk7XG4gIHVwZGF0ZV9hY3Rpb25zKHNlbGYpO1xufTtcblxuLy8qXG4vLyBTaGlmdHMgdGhlIGBUYWJsZWAgcmVwcmVzZW50ZWQgYnkgYHNlbGZgIHRvIHRoZSBsZWZ0IGJ5IG9uZSBjb2x1bW4uIElmIHRoZVxuLy8gdGFibGUgY3VycmVudGx5IGhhcyBhIGNvbHVtbiB0aGF0IGlzIHBhcnRpYWxseSB2aXNpYmxlIG9uIHRoZSByaWdodCwgdGhlXG4vLyB0YWJsZSB3aWxsIGJlIHNjcm9sbGVkIHN1Y2ggdGhhdCB0aGF0IGVudGlyZSBjb2x1bW4gaXMgaGlkZGVuLiBJZiBhIGNvbHVtblxuLy8gaXMgZW50aXJlbHkgdmlzaWJsZSBhbmQgcHJlc3NlZCByaWdodCBhZ2FpbnN0IHRoZSByaWdodCBlZGdlIG9mIHRoZSBzY3JvbGxcbi8vIGFyZWEsIHRoYXQgY29sdW1uIHdpbGwgYmUgc2Nyb2xsZWQgb3V0IG9mIHZpZXcuXG4vL1xuLy8gVGhpcyBoYXMgbm8gZWZmZWN0IGlmIHRoZSB0YWJsZSBpcyBhdCBhIHNjcm9sbCBwb3NpdGlvbiBvZiAwLlxuLy9cbi8vIEBwYXJhbSB7T2JqZWN0fSBzZWxmIC0gVGhlIGludGVybmFsIGRldGFpbHMgb2YgYSBgVGFibGVgLlxuXG5zaGlmdF90YWJsZV9sZWZ0ID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgdmFyIGxhc3RfY2VsbCwgbmV4dF9jZWxsX292ZXJsYXAsIHNjcm9sbF9kZWx0YTtcblxuICBpZiAoIXNlbGYub3ZlcmZsb3dpbmcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgX2xhc3RfdmlzaWJsZV9jZWxsMyA9IGxhc3RfdmlzaWJsZV9jZWxsKHNlbGYpO1xuXG4gIHZhciBfbGFzdF92aXNpYmxlX2NlbGwzMiA9IF9zbGljZWRUb0FycmF5KF9sYXN0X3Zpc2libGVfY2VsbDMsIDIpO1xuXG4gIGxhc3RfY2VsbCA9IF9sYXN0X3Zpc2libGVfY2VsbDMyWzBdO1xuICBuZXh0X2NlbGxfb3ZlcmxhcCA9IF9sYXN0X3Zpc2libGVfY2VsbDMyWzFdO1xuXG4gIHNjcm9sbF9kZWx0YSA9IG5leHRfY2VsbF9vdmVybGFwID8gLW5leHRfY2VsbF9vdmVybGFwIDogLWxhc3RfY2VsbC5vZmZzZXRXaWR0aDtcblxuICBzZWxmLnNjcm9sbGVyLnNjcm9sbExlZnQgKz0gc2Nyb2xsX2RlbHRhO1xuICBpZiAoIXNlbGYuc2Nyb2xsZXIuc2Nyb2xsTGVmdCkge1xuICAgIHNlbGYuc2Nyb2xsZXIuY2xhc3NMaXN0LnJlbW92ZShzdGF0ZXMuc2Nyb2xsZXIuc2Nyb2xsZWQpO1xuICB9XG4gIHVwZGF0ZV9hY3Rpb25zKHNlbGYpO1xufTtcblxuLy8qXG4vLyBIYW5kbGVzIGEga2V5cHJlc3Mgd2hpbGUgZm9jdXNlZCBvbiB0aGUgdGFibGUuIE9ubHkgbGVmdC8gcmlnaHQvIHVwLyBkb3duXG4vLyBrZXlwcmVzc2VzIGFyZSBoYW5kbGVkIGhlcmU6IGxlZnQgYW5kIGRvd24gd2lsbCBzaGlmdCB0aGUgdGFibGUgbGVmdCwgd2hpbGVcbi8vIHJpZ2h0IGFuZCB1cCB3aWxsIHNoaWZ0IHRoZSB0YWJsZSByaWdodC5cbi8vXG4vLyBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBUaGUgb3JpZ2luYWwgYGtleXByZXNzYCBldmVudC5cbi8vIEBwYXJhbSB7T2JqZWN0fSBzZWxmIC0gVGhlIGludGVybmFsIGRldGFpbHMgb2YgYSBgVGFibGVgLlxuLy8gQHByaXZhdGVcblxuaGFuZGxlX2tleXByZXNzID0gZnVuY3Rpb24gKGV2ZW50LCBzZWxmKSB7XG4gIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICBjYXNlIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0tleWNvZGVzMltcImRlZmF1bHRcIl0uUklHSFQ6XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2hpZnRfdGFibGVfcmlnaHQoc2VsZik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0tleWNvZGVzMltcImRlZmF1bHRcIl0uTEVGVDpcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzaGlmdF90YWJsZV9sZWZ0KHNlbGYpO1xuICAgICAgYnJlYWs7XG4gIH1cbn07XG5cbi8vKlxuLy8gSGFuZGxlcyBzY3JvbGxpbmcgb24gdGhlIHRhYmxlIGJ5IHVwZGF0aW5nIHRoZSBjbGFzc2VzIG9uIHRoZSBzY3JvbGxlci9cbi8vIGFjdGlvbiBidXR0b25zIHRvIHJlZmxlY3QgdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uLlxuLy9cbi8vIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIFRoZSBvcmlnaW5hbCBgc2Nyb2xsYCBldmVudC5cbi8vIEBwYXJhbSB7T2JqZWN0fSBzZWxmIC0gVGhlIGludGVybmFsIGRldGFpbHMgb2YgYSBgVGFibGVgLlxuLy8gQHByaXZhdGVcblxuaGFuZGxlX3Njcm9sbCA9IGZ1bmN0aW9uIChldmVudCwgc2VsZikge1xuICB2YXIgc2Nyb2xsZXI7XG5cbiAgaWYgKCFzZWxmLm92ZXJmbG93aW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc2Nyb2xsZXIgPSBzZWxmLnNjcm9sbGVyO1xuICBpZiAoc2Nyb2xsZXIuc2Nyb2xsTGVmdCA+IDApIHtcbiAgICBzY3JvbGxlci5jbGFzc0xpc3QuYWRkKHN0YXRlcy5zY3JvbGxlci5zY3JvbGxlZCk7XG4gIH0gZWxzZSB7XG4gICAgc2Nyb2xsZXIuY2xhc3NMaXN0LnJlbW92ZShzdGF0ZXMuc2Nyb2xsZXIuc2Nyb2xsZWQpO1xuICB9XG5cbiAgdXBkYXRlX2FjdGlvbnMoc2VsZik7XG4gIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xufTtcblxuLy8qXG4vLyBIb29rcyB1cCB0aGUgZXZlbnQgaGFuZGxlcnMgZm9yIHRhYmxlIGFjdGlvbnMsIHN0b3JlcyB0aGUgYWN0aW9ucyBvblxuLy8gYHNlbGYuc2hpZnRlcnNgIGZvciBlYXNpZXIgYWNjZXNzIGxhdGVyLCBhbmQgcGVyZm9ybWVzIHRoZSBpbml0aWFsIHVwZGF0ZXNcbi8vIHRvIG1ha2UgdGhlIHN0YXRlIG9mIHRoZSBhY3Rpb25zIG1hdGNoIHRoZSB0YWJsZSBpdHNlbGYuXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhIGBUYWJsZWAuXG4vLyBAcHJpdmF0ZVxuXG5pbml0aWFsaXplX3RhYmxlX2FjdGlvbnMgPSBmdW5jdGlvbiAoc2VsZikge1xuICB2YXIgYWN0aW9uO1xuXG4gIHNlbGYuc2hpZnRlcnMgPSB7fTtcbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yNCA9IGZhbHNlO1xuICB2YXIgX2l0ZXJhdG9yRXJyb3I0ID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yNCA9IF9nZXRJdGVyYXRvcihfQXJyYXkkZnJvbShzZWxmLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiICsgY2xhc3Nlcy5hY3Rpb25zICsgXCIgW1wiICsgYXR0cnMuYWN0aW9uICsgXCJdXCIpKSksIF9zdGVwNDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IChfc3RlcDQgPSBfaXRlcmF0b3I0Lm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gdHJ1ZSkge1xuICAgICAgYWN0aW9uID0gX3N0ZXA0LnZhbHVlO1xuXG4gICAgICBzZWxmLnNoaWZ0ZXJzW2FjdGlvbi5nZXRBdHRyaWJ1dGUoYXR0cnMuYWN0aW9uKS5yZXBsYWNlKFwic2hpZnQtXCIsIFwiXCIpXSA9IGFjdGlvbjtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yNCA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3I0ID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ICYmIF9pdGVyYXRvcjRbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgX2l0ZXJhdG9yNFtcInJldHVyblwiXSgpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I0KSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVfYWN0aW9ucyhzZWxmKTtcblxuICAkKHNlbGYuY29udGFpbmVyKS5vbihcImNsaWNrXCIsIFwiLlwiICsgY2xhc3Nlcy5hY3Rpb25zLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBzd2l0Y2ggKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoYXR0cnMuYWN0aW9uKSkge1xuICAgICAgY2FzZSBhY3Rpb25zLnNoaWZ0X3JpZ2h0OlxuICAgICAgICBzaGlmdF90YWJsZV9yaWdodChzZWxmKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGFjdGlvbnMuc2hpZnRfbGVmdDpcbiAgICAgICAgc2hpZnRfdGFibGVfbGVmdChzZWxmKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9KTtcbn07XG5cbi8vKlxuLy8gVXBkYXRlcyB0aGUgdGFibGUgYWN0aW9ucyBieSBkaXNhYmxpbmcgYWN0aW9ucyB0aGF0IGNhbid0IGJlIHBlcmZvcm1lZCBnaXZlblxuLy8gdGhlIHN0YXRlIG9mIHRoZSB0YWJsZSAoZm9yIGV4YW1wbGUsIGEgbGVmdCBzaGlmdGVyIHdoZW4gdGhlIHRhYmxlIGlzIGZ1bGx5XG4vLyBzY3JvbGxlZCB0byB0aGUgbGVmdCkuXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IHNlbGYgLSBUaGUgaW50ZXJuYWwgZGV0YWlscyBvZiBhIGBUYWJsZWAuXG4vLyBAcHJpdmF0ZVxuXG51cGRhdGVfYWN0aW9ucyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBkaXNhYmxlLCBlbmFibGU7XG5cbiAgZGlzYWJsZSA9IGZ1bmN0aW9uIChzaGlmdGVyKSB7XG4gICAgc2hpZnRlci5kaXNhYmxlZCA9IHRydWU7XG4gICAgc2hpZnRlci5jbGFzc0xpc3QuYWRkKHNoaWZ0ZXIuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKVswXSArIFwiLS1pcy1kaXNhYmxlZFwiKTtcbiAgfTtcblxuICBlbmFibGUgPSBmdW5jdGlvbiAoc2hpZnRlcikge1xuICAgIHNoaWZ0ZXIuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBzaGlmdGVyLmNsYXNzTGlzdC5yZW1vdmUoc2hpZnRlci5jbGFzc05hbWUuc3BsaXQoXCIgXCIpWzBdICsgXCItLWlzLWRpc2FibGVkXCIpO1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbiAoc2VsZikge1xuICAgIHZhciBzaGlmdGVycyA9IHNlbGYuc2hpZnRlcnMsXG4gICAgICAgIHNjcm9sbCA9IHNlbGYuc2Nyb2xsZXIuc2Nyb2xsTGVmdDtcblxuICAgIGlmICghc2Nyb2xsKSB7XG4gICAgICBkaXNhYmxlKHNoaWZ0ZXJzLmxlZnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmFibGUoc2hpZnRlcnMubGVmdCk7XG4gICAgfVxuXG4gICAgaWYgKHNjcm9sbCArIHNlbGYuc2Nyb2xsZXIub2Zmc2V0V2lkdGggKyAxID49IHNlbGYuc2Nyb2xsZXIuc2Nyb2xsV2lkdGgpIHtcbiAgICAgIGRpc2FibGUoc2hpZnRlcnMucmlnaHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmFibGUoc2hpZnRlcnMucmlnaHQpO1xuICAgIH1cbiAgfTtcbn0pKCk7XG5cbi8vKlxuLy8gQSBmYWN0b3J5IGZvciBwcm9kdWNpbmcgYFRhYmxlYCBvYmplY3RzLlxuLy9cbi8vIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHJvb3QgLSBUaGUgcm9vdCAoYC50YWJsZWApIG5vZGUgb2YgdGhlIHRhYmxlLiBOb3RlIHRoYXRcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgaXMgbm90IHRoZSBjb250YWluZXIgb3Igc2Nyb2xsZXIsIGJ1dCB0aGVcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbCBgdGFibGVgIGVsZW1lbnQgaXRzZWxmLlxuLy9cbi8vIEBmYWN0b3J5XG5cblRhYmxlID0gZnVuY3Rpb24gKHJvb3QpIHtcbiAgdmFyICRyb290LCBzZWxmO1xuXG4gICRyb290ID0gJChyb290KTtcbiAgc2VsZiA9IHtcbiAgICByb290OiByb290LFxuICAgIHNjcm9sbGVyOiAkcm9vdC5jbG9zZXN0KFwiLlwiICsgY2xhc3Nlcy5zY3JvbGxlcilbMF0sXG4gICAgY29udGFpbmVyOiAkcm9vdC5jbG9zZXN0KFwiLlwiICsgY2xhc3Nlcy5jb250YWluZXIpWzBdLFxuICAgIG92ZXJmbG93aW5nOiBmYWxzZSxcbiAgICBoZWFkZXJfY2VsbHM6IF9BcnJheSRmcm9tKHJvb3QucXVlcnlTZWxlY3RvckFsbChcIi5cIiArIGNsYXNzZXMuaGVhZGVyICsgXCIgLlwiICsgY2xhc3Nlcy5jZWxsKSlcbiAgfTtcblxuICByb290LnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gIGNhY2hlX3ByZWZlcnJlZF93aWR0aHMoc2VsZik7XG4gIGNoZWNrX2Zvcl9vdmVyZmxvdyhzZWxmKTtcbiAgaW5pdGlhbGl6ZV90YWJsZV9hY3Rpb25zKHNlbGYpO1xuXG4gICQod2luZG93KS5vbihcInJlc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY2hlY2tfZm9yX292ZXJmbG93KHNlbGYpO1xuICAgIHVwZGF0ZV9hY3Rpb25zKHNlbGYpO1xuICB9KTtcblxuICByb290LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGhhbmRsZV9rZXlwcmVzcyhldmVudCwgc2VsZik7XG4gIH0pO1xuICBzZWxmLnNjcm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaGFuZGxlX3Njcm9sbChldmVudCwgc2VsZik7XG4gIH0pO1xufTtcblxuVGFibGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzQnVpbGRlcjJbXCJkZWZhdWx0XCJdLmJ1aWxkKFRhYmxlLCB7IG5hbWU6IGNsYXNzZXMucm9vdCB9KTtcbn07XG5cbn0se1wiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy9idWlsZGVyXCI6MjMsXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL2tleWNvZGVzXCI6MjcsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbVwiOjQxLFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiOjQyLFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCI6NTQsXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkLXRvLWFycmF5XCI6NTV9XSwxNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lLXByb3BlcnR5XCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9nZXRJdGVyYXRvciA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9BcnJheSRmcm9tID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9PYmplY3QkZGVmaW5lUHJvcGVydGllcyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc1F1ZXJ5X3N0cmluZyA9IHJlcXVpcmUoXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL3F1ZXJ5X3N0cmluZ1wiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc1F1ZXJ5X3N0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc1F1ZXJ5X3N0cmluZyk7XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNCdWlsZGVyID0gcmVxdWlyZShcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS91dGlsaXRpZXMvYnVpbGRlclwiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0J1aWxkZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNCdWlsZGVyKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0RvbV9jYWNoZSA9IHJlcXVpcmUoXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL2RvbV9jYWNoZVwiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0RvbV9jYWNoZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0RvbV9jYWNoZSk7XG5cbnZhciBjbGFzc2VzID0ge1xuICByb290OiBcInRhYmxpc3RcIixcbiAgdGFiOiBcInRhYmxpc3RfX3RhYlwiLFxuICBwYW5lbDogXCJ0YWJsaXN0X19wYW5lbFwiXG59O1xuXG52YXIgdmFyaWFudHMgPSB7XG4gIHJvb3Q6IHsgbWFuYWdlc191cmw6IFwidGFibGlzdC0tbWFuYWdlcy11cmxcIiB9XG59O1xuXG52YXIgc3RhdGVzID0ge1xuICB0YWI6IHsgYWN0aXZlOiBcInRhYmxpc3RfX3RhYi0taXMtYWN0aXZlXCIgfSxcbiAgcGFuZWw6IHsgYWN0aXZlOiBcInRhYmxpc3RfX3BhbmVsLS1pcy1hY3RpdmVcIiB9XG59O1xuXG52YXIgVGFibGlzdCwgdGFiX2NsaWNrLCBwYW5lbF9mb3JfdGFiLCB0YWJfZm9yX3BhbmVsLCB0YWJsaXN0X2Zvcl9ub2RlLCBhMTF5LCBhcHBseV9hY3RpdmF0aW9uX21hcmt1cCwgcmVtb3ZlX2FjdGl2YXRpb25fbWFya3VwLCBwYW5lbF9jb250YWluaW5nX25vZGU7XG5cbi8vKlxuLy8gTWFuYWdlcyBhIGNsaWNrIG9uIGEgdGFiIGJ5IGZpbmRpbmcgdGhlIGFzc29jaWF0ZWQgYFRhYmxpc3RgIGFuZCBhY3RpdmF0aW5nXG4vLyB0aGUgdGFiIHRoYXQgd2FzIGNsaWNrZWQgb24uXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gVGhlIGBjbGlja2AgZXZlbnQuXG4vLyBAcHJpdmF0ZVxuXG50YWJfY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgdmFyIHRhYmxpc3Q7XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICB0YWJsaXN0ID0gVGFibGlzdFtcImZvclwiXShldmVudC50YXJnZXQpO1xuICBpZiAoIXRhYmxpc3QpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFibGlzdC5hY3RpdmF0ZV90YWIoJChldmVudC5jdXJyZW50VGFyZ2V0KS5jbG9zZXN0KFwiLlwiICsgY2xhc3Nlcy50YWIpWzBdKTtcbn07XG5cbi8vKlxuLy8gRmluZHMgdGhlIHRhYiBwYW5lbCBhc3NvY2lhdGVkIHdpdGggdGhlIHBhc3NlZCB0YWIuIFRoZSBhc3NvY2lhdGlvbiBpcyBiYXNlZFxuLy8gb24gdGhlIElEIG9mIHRoZSB0YWIgcGFuZWwgbWF0Y2hpbmcgdGhlIGBocmVmYCBvZiB0aGUgdGFiLlxuLy9cbi8vIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhYiAtIFRoZSB0YWIgZm9yIHdoaWNoIHlvdSB3YW50IHRoZSBhc3NvY2lhdGVkIHBhbmVsLlxuLy8gQHByaXZhdGVcbi8vXG4vLyBAcmV0dXJucyB7SFRNTEVsZW1lbnQgfCBudWxsfSBUaGUgYXNzb2NpYXRlZCB0YWIgcGFuZWwgb3IsIGlmIG5vIG1hdGNoaW5nXG4vLyBwYW5lbCB3YXMgZm91bmQsIGBudWxsYC5cblxucGFuZWxfZm9yX3RhYiA9IGZ1bmN0aW9uICh0YWIpIHtcbiAgcmV0dXJuIHRhYiAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWIuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKS5yZXBsYWNlKFwiI1wiLCBcIlwiKSk7XG59O1xuXG4vLypcbi8vIEZpbmRzIHRoZSB0YWIgYXNzb2NpYXRlZCB3aXRoIHRoZSBwYXNzZWQgcGFuZWwuIFRoZSBhc3NvY2lhdGlvbiBpcyBiYXNlZFxuLy8gb24gdGhlIElEIG9mIHRoZSB0YWIgcGFuZWwgbWF0Y2hpbmcgdGhlIGBocmVmYCBvZiB0aGUgdGFiLlxuLy9cbi8vIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhYiAtIFRoZSB0YWIgZm9yIHdoaWNoIHlvdSB3YW50IHRoZSBhc3NvY2lhdGVkIHBhbmVsLlxuLy8gQHByaXZhdGVcbi8vXG4vLyBAcmV0dXJucyB7SFRNTEVsZW1lbnQgfCBudWxsfSBUaGUgYXNzb2NpYXRlZCB0YWIgb3IsIGlmIG5vIG1hdGNoaW5nIHBhbmVsXG4vLyB3YXMgZm91bmQsIGBudWxsYC5cblxudGFiX2Zvcl9wYW5lbCA9IGZ1bmN0aW9uIChwYW5lbCkge1xuICByZXR1cm4gcGFuZWwgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5cIiArIGNsYXNzZXMudGFiICsgXCJbaHJlZj0nI1wiICsgcGFuZWwuaWQgKyBcIiddXCIpO1xufTtcblxuLy8qXG4vLyBXcml0ZXMgYWxsIG9mIHRoZSByZXF1aXJlZCBhY2Nlc3NpYmlsaXR5IG1hcmt1cCB0byB0aGUgdGFibGlzdCBhbmQgaXRzXG4vLyBzdWJjb21wb25lbnRzLiBUaGlzIGluY2x1ZGVzIElEcyBmb3IgdGhlIHRhYmxpc3QgYW5kIGl0cyB0YWJzLyBwYW5lbHMsXG4vLyByb2xlcyBmb3IgdGhlIHNhbWUsIGFuZCB0aGUgYGFyaWEtYCBhc3NvY2lhdGlvbnMgYmV0d2VlbiB0YWJzIGFuZCB0aGVpclxuLy8gY29ycmVzcG9uZGluZyBwYW5lbHMuXG4vL1xuLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFibGlzdCAtIFRoZSByb290IG5vZGUgb2YgdGhlIHRhYmxpc3QuXG4vLyBAcHJpdmF0ZVxuXG5hMTF5ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIF9jdXJyZW50X2lkcztcblxuICB2YXIgY3VycmVudF9pZHMsIGlkX2ZvcjtcblxuICBjdXJyZW50X2lkcyA9IChfY3VycmVudF9pZHMgPSB7fSwgX2RlZmluZVByb3BlcnR5KF9jdXJyZW50X2lkcywgY2xhc3Nlcy5yb290LCAxKSwgX2RlZmluZVByb3BlcnR5KF9jdXJyZW50X2lkcywgY2xhc3Nlcy50YWIsIDEpLCBfZGVmaW5lUHJvcGVydHkoX2N1cnJlbnRfaWRzLCBjbGFzc2VzLnBhbmVsLCAxKSwgX2N1cnJlbnRfaWRzKTtcblxuICBpZF9mb3IgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciB0eXBlID0gbm9kZS5jbGFzc05hbWUuc3BsaXQoXCIgXCIpWzBdO1xuICAgIHJldHVybiB0eXBlICsgXCItLVwiICsgY3VycmVudF9pZHNbdHlwZV0rKztcbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24gKHRhYmxpc3QpIHtcbiAgICB2YXIgcGFuZWwsIHRhYl9pZCwgcGFuZWxfaWQsIHRhYjtcblxuICAgIHRhYmxpc3QuaWQgPSB0YWJsaXN0LmlkIHx8IGlkX2Zvcih0YWJsaXN0KTtcbiAgICB0YWJsaXN0LnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJ0YWJsaXN0XCIpO1xuXG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBfZ2V0SXRlcmF0b3IoX0FycmF5JGZyb20odGFibGlzdC5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiICsgY2xhc3Nlcy50YWIpKSksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgdGFiID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgcGFuZWwgPSBwYW5lbF9mb3JfdGFiKHRhYik7XG4gICAgICAgIGlmICghcGFuZWwpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhYl9pZCA9IHRhYi5pZCB8fCBpZF9mb3IodGFiKTtcbiAgICAgICAgcGFuZWxfaWQgPSBwYW5lbC5pZCB8fCBpZF9mb3IocGFuZWwpO1xuXG4gICAgICAgIHRhYi5pZCA9IHRhYl9pZDtcbiAgICAgICAgdGFiLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJ0YWJcIik7XG4gICAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIsIHBhbmVsX2lkKTtcbiAgICAgICAgdGFiLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCIjXCIgKyBwYW5lbF9pZCk7XG5cbiAgICAgICAgcGFuZWwuaWQgPSBwYW5lbF9pZDtcbiAgICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInRhYi1wYW5lbFwiKTtcbiAgICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbGxlZGJ5XCIsIHRhYl9pZCk7XG4gICAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsICFwYW5lbC5jbGFzc0xpc3QuY29udGFpbnMoc3RhdGVzLnBhbmVsLmFjdGl2ZSkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICBfaXRlcmF0b3JbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59KSgpO1xuXG5hcHBseV9hY3RpdmF0aW9uX21hcmt1cCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIGlmICghbm9kZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc2VzLnRhYikpIHtcbiAgICBub2RlLmNsYXNzTGlzdC5hZGQoc3RhdGVzLnRhYi5hY3RpdmUpO1xuICB9IGVsc2Uge1xuICAgIG5vZGUuY2xhc3NMaXN0LmFkZChzdGF0ZXMucGFuZWwuYWN0aXZlKTtcbiAgfVxufTtcblxucmVtb3ZlX2FjdGl2YXRpb25fbWFya3VwID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgaWYgKCFub2RlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzZXMudGFiKSkge1xuICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZShzdGF0ZXMudGFiLmFjdGl2ZSk7XG4gIH0gZWxzZSB7XG4gICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKHN0YXRlcy5wYW5lbC5hY3RpdmUpO1xuICB9XG59O1xuXG5wYW5lbF9jb250YWluaW5nX25vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICByZXR1cm4gJChub2RlKS5jbG9zZXN0KFwiLlwiICsgY2xhc3Nlcy5wYW5lbClbMF07XG59O1xuXG50YWJsaXN0X2Zvcl9ub2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzZXMucGFuZWwpKSB7XG4gICAgbm9kZSA9IHRhYl9mb3JfcGFuZWwobm9kZSk7XG4gIH1cblxuICByZXR1cm4gJChub2RlKS5jbG9zZXN0KFwiLlwiICsgY2xhc3Nlcy5yb290KVswXTtcbn07XG5cbi8vKlxuLy8gVGhlIGNvbnN0cnVjdG9yIGFyb3VuZCBhIGBUYWJsaXN0YCBjb21wb25lbnQuIFRoaXMgY29uc3RydWN0b3IgcmV0dXJucyBhIHZlcnlcbi8vIHNtYWxsIEFQSTogb25seSBhbiBgYWN0aXZhdGVfdGFiYCBtZXRob2QgaXMgZXhwb3NlZCwgd2hpY2ggd2lsbCBhY3RpdmF0ZSB0aGVcbi8vIHBhc3NlZCB0YWIgaW4gdGhlIHRhYmxpc3QuIFRoaXMgY29uc3RydWN0b3Igd2lsbCBhbHNvIGVuc3VyZSB0aGF0IGFsbCB0aGVcbi8vIGFyaWEgcHJvcGVydGllcyBhbmQgYXNzb2NpYXRpb25zIGFyZSBob29rZWQgdXAgY29ycmVjdGx5LlxuXG5UYWJsaXN0ID0gZnVuY3Rpb24gKHJvb3QpIHtcbiAgdmFyIGFjdGl2ZV90YWIgPSByb290LnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBzdGF0ZXMudGFiLmFjdGl2ZSksXG4gICAgICBhY3RpdmVfcGFuZWwgPSBwYW5lbF9mb3JfdGFiKGFjdGl2ZV90YWIpLFxuICAgICAgc2F2ZWRfdGFiLFxuICAgICAgYXBpLFxuICAgICAgc2VsZjtcblxuICBhMTF5KHJvb3QpO1xuXG4gIHNlbGYgPSB7XG4gICAgcm9vdDogcm9vdCxcbiAgICBpZDogcm9vdC5pZCxcbiAgICBhY3RpdmVfcGFuZWw6IHBhbmVsX2Zvcl90YWIoYWN0aXZlX3RhYiksXG4gICAgbWFuYWdlc191cmw6IHJvb3QuY2xhc3NMaXN0LmNvbnRhaW5zKHZhcmlhbnRzLnJvb3QubWFuYWdlc191cmwpXG4gIH07XG5cbiAgYXBpID0gX09iamVjdCRkZWZpbmVQcm9wZXJ0aWVzKHtcbiAgICAvLypcbiAgICAvLyBBY3RpdmF0ZXMgdGhlIHBhc3NlZCB0YWIsIGRlYWN0aXZhdGluZyB0aGUgY3VycmVudGx5LWFjdGl2ZSB0YWIsIGlmIHRoZXJlXG4gICAgLy8gaXMgb25lIChhbmQgaXQgaXMgbm90IHRoZSBwYXNzZWQgdGFiKS5cbiAgICAvL1xuICAgIC8vIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhYiAtIFRoZSB0YWIgdG8gYWN0aXZhdGUuXG5cbiAgICBhY3RpdmF0ZV90YWI6IGZ1bmN0aW9uIGFjdGl2YXRlX3RhYih0YWIpIHtcbiAgICAgIHRoaXMuYWN0aXZlX3RhYiA9IHRhYjtcbiAgICB9XG5cbiAgfSwge1xuICAgIGFjdGl2ZV90YWI6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gYWN0aXZlX3RhYjtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh0YWIpIHtcbiAgICAgICAgdmFyIHBhbmVsID0gcGFuZWxfZm9yX3RhYih0YWIpO1xuXG4gICAgICAgIGFwcGx5X2FjdGl2YXRpb25fbWFya3VwKHRhYik7XG4gICAgICAgIGFwcGx5X2FjdGl2YXRpb25fbWFya3VwKHBhbmVsKTtcblxuICAgICAgICBpZiAoIXRhYiB8fCB0YWIgPT09IGFjdGl2ZV90YWIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVfYWN0aXZhdGlvbl9tYXJrdXAoYWN0aXZlX3RhYik7XG4gICAgICAgIHJlbW92ZV9hY3RpdmF0aW9uX21hcmt1cChhY3RpdmVfcGFuZWwpO1xuXG4gICAgICAgIGFjdGl2ZV90YWIgPSB0YWI7XG4gICAgICAgIGFjdGl2ZV9wYW5lbCA9IHBhbmVsO1xuXG4gICAgICAgIGlmICh0aGlzLm1hbmFnZXNfdXJsICYmIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc1F1ZXJ5X3N0cmluZzJbXCJkZWZhdWx0XCJdLmdldCh0aGlzLmlkKSAhPT0gdGFiLmlkKSB7XG4gICAgICAgICAgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzUXVlcnlfc3RyaW5nMltcImRlZmF1bHRcIl0uc2V0KHRoaXMuaWQsIHRhYi5pZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBhY3RpdmVfcGFuZWw6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gYWN0aXZlX3BhbmVsO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0KHBhbmVsKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlX3RhYiA9IHBhbmVsX2Zvcl90YWIocGFuZWwpO1xuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChzZWxmLm1hbmFnZXNfdXJsKSB7XG4gICAgc2F2ZWRfdGFiID0gX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzUXVlcnlfc3RyaW5nMltcImRlZmF1bHRcIl0uZ2V0KHNlbGYuaWQpO1xuICAgIGlmIChzYXZlZF90YWIpIHtcbiAgICAgIGFwaS5hY3RpdmVfdGFiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2F2ZWRfdGFiKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYXBpLmFjdGl2ZV90YWIgPSBhY3RpdmVfdGFiO1xuICB9XG5cbiAgcmV0dXJuIGFwaTtcbn07XG5cblRhYmxpc3RbXCJmb3JcIl0gPSBmdW5jdGlvbiAobm9kZSkge1xuICB2YXIgdGFibGlzdF9ub2RlID0gJChub2RlKS5jbG9zZXN0KFwiLlwiICsgY2xhc3Nlcy5yb290KVswXSxcbiAgICAgIGNvbnRhaW5pbmdfcGFuZWw7XG5cbiAgaWYgKCF0YWJsaXN0X25vZGUpIHtcbiAgICBjb250YWluaW5nX3BhbmVsID0gbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3Nlcy5wYW5lbCkgPyBub2RlIDogcGFuZWxfY29udGFpbmluZ19ub2RlKG5vZGUpO1xuICAgIGlmICghY29udGFpbmluZ19wYW5lbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0YWJsaXN0X25vZGUgPSB0YWJsaXN0X2Zvcl9ub2RlKGNvbnRhaW5pbmdfcGFuZWwpO1xuICB9XG5cbiAgaWYgKCF0YWJsaXN0X25vZGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuICgwLCBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNEb21fY2FjaGUyW1wiZGVmYXVsdFwiXSkodGFibGlzdF9ub2RlKS5nZXQoY2xhc3Nlcy5yb290KTtcbn07XG5cblRhYmxpc3QuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzQnVpbGRlcjJbXCJkZWZhdWx0XCJdLmJ1aWxkX2FuZF9jYWNoZShUYWJsaXN0LCB7IG5hbWU6IGNsYXNzZXMucm9vdCB9KTtcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5cIiArIGNsYXNzZXMudGFiLCB0YWJfY2xpY2spO1xufTtcblxuVGFibGlzdC5hY3RpdmF0ZV9wYW5lbF9jb250YWluaW5nID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgdmFyIHBhbmVsID0gJChub2RlKS5jbG9zZXN0KFwiLlwiICsgY2xhc3Nlcy5wYW5lbClbMF0sXG4gICAgICB0YWJsaXN0ID0gVGFibGlzdFtcImZvclwiXShwYW5lbCk7XG5cbiAgaWYgKHRhYmxpc3QpIHtcbiAgICB0YWJsaXN0LmFjdGl2ZV90YWIgPSB0YWJfZm9yX3BhbmVsKHBhbmVsKTtcbiAgfVxuICByZXR1cm4gISF0YWJsaXN0O1xufTtcblxuVGFibGlzdC5pc19pbl9hY3RpdmVfcGFuZWwgPSBmdW5jdGlvbiAobm9kZSkge1xuICB2YXIgcGFuZWwgPSBwYW5lbF9jb250YWluaW5nX25vZGUobm9kZSk7XG4gIHJldHVybiAhIXBhbmVsICYmIHBhbmVsLmNsYXNzTGlzdC5jb250YWlucyhzdGF0ZXMucGFuZWwuYWN0aXZlKTtcbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gVGFibGlzdDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbn0se1wiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy9idWlsZGVyXCI6MjMsXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL2RvbV9jYWNoZVwiOjI1LFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy9xdWVyeV9zdHJpbmdcIjozMyxcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tXCI6NDEsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCI6NDIsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzXCI6NDYsXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lLXByb3BlcnR5XCI6NTMsXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIjo1NH1dLDE3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2dldEl0ZXJhdG9yID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0aWVzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXNcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlQ29tcG9uZW50c01vZGFsID0gcmVxdWlyZShcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS9jb21wb25lbnRzL21vZGFsXCIpO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlQ29tcG9uZW50c01vZGFsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlQ29tcG9uZW50c01vZGFsKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZUNvbXBvbmVudHNJZnJhbWUgPSByZXF1aXJlKFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL2NvbXBvbmVudHMvaWZyYW1lXCIpO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzS2V5Y29kZXMgPSByZXF1aXJlKFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy9rZXljb2Rlc1wiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0tleWNvZGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzS2V5Y29kZXMpO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzUGF0dGVybiA9IHJlcXVpcmUoXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL3BhdHRlcm5cIik7XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNQYXR0ZXJuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzUGF0dGVybik7XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNCdWlsZGVyID0gcmVxdWlyZShcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS91dGlsaXRpZXMvYnVpbGRlclwiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0J1aWxkZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNCdWlsZGVyKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0V2ZW50cyA9IHJlcXVpcmUoXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL2V2ZW50c1wiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0V2ZW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0V2ZW50cyk7XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNOYW1pbmdfY29udmVudGlvbiA9IHJlcXVpcmUoXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL25hbWluZ19jb252ZW50aW9uXCIpO1xuXG52YXIgY2xhc3NlcyA9IHtcbiAgcm9vdDogXCJ0b2dnbGVcIixcbiAgaW5mbzogXCJ0b2dnbGVfX2luZm9cIixcbiAgY29udGFpbmVyOiBcInRvZ2dsZV9fY29udGFpbmVyXCJcbn07XG5cbnZhciBzdGF0ZXMgPSB7XG4gIHJvb3Q6IHtcbiAgICBsb2NrZWQ6IFwidG9nZ2xlLS1pcy1sb2NrZWRcIixcbiAgICBhY3RpdmU6IFwidG9nZ2xlLS1pcy1hY3RpdmVcIixcbiAgICBwYXJ0aWFsbHlfYWN0aXZlOiBcInRvZ2dsZS0taXMtcGFydGlhbGx5LWFjdGl2ZVwiXG4gIH1cbn07XG5cbnZhciBhdHRycyA9IHtcbiAgbmFtZTogXCJkYXRhLXZhcmlhdGlvbi1uYW1lXCJcbn07XG5cbnZhciBUb2dnbGUsIFRvZ2dsZXMsIGhhbmRsZV9rZXlwcmVzcywgaW5mb19jbGljaywgdG9nZ2xlX2NsaWNrLCB1cGRhdGVfdG9nZ2xlX3N0YXRlO1xuXG4vLypcbi8vIExpc3RlbnMgYW5kIHJlc3BvbmRzIHRvIGtleXByZXNzIGV2ZW50cyB3aGlsZSBmb2N1c2VkIG9uIGEgdG9nZ2xlLiBJZiBlaXRoZXJcbi8vIHNwYWNlIG9yIGVudGVyIGFyZSBwcmVzc2VkLCB0aGUgdG9nZ2xlIHdpbGwgYmUgdG9nZ2xlZCBhcyBpZiBpdCBoYWQgYmVlblxuLy8gY2xpY2tlZCBvbi4gVGhpcyBhbGxvd3MgZm9yIGtleWJvYXJkLW9ubHkgbmF2aWdhdGlvbiBhbmQgbWFuaXB1bGF0aW9uIG9mXG4vLyB0b2dnbGVzLlxuLy9cbi8vIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIFRoZSBga2V5cHJlc3NgIGV2ZW50LlxuLy8gQHByaXZhdGVcblxuaGFuZGxlX2tleXByZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmICghW19Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0tleWNvZGVzMltcImRlZmF1bHRcIl0uRU5URVIsIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0tleWNvZGVzMltcImRlZmF1bHRcIl0uU1BBQ0VdLmluY2x1ZGUoZXZlbnQud2hpY2gpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHVwZGF0ZV90b2dnbGVfc3RhdGUoZXZlbnQudGFyZ2V0KTtcbn07XG5cbi8vKlxuLy8gTGlzdGVucyBmb3IgY2xpY2tzIG9uIHRoZSBpbmZvcm1hdGlvbiBpY29uIGluIHRoZSB0b2dnbGUgYW5kIGFjdGl2YXRlcyB0aGVcbi8vIG1vZGFsIHRvIHByZXNlbnQgZGV0YWlscyBvbiB0aGF0IHZhcmlhdGlvbi5cbi8vXG4vLyBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBUaGUgYGNsaWNrYCBldmVudC5cbi8vIEBwcml2YXRlXG5cbmluZm9fY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgdmFyIHZhcmlhdGlvbl9uYW1lO1xuXG4gIC8vIFByZXZlbnQgdGhlIGNsaWNrIGV2ZW50IGZyb20gcHJvcGFnYXRpbmcgdG8gdGhlIHRvZ2dsZS5cbiAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdmFyaWF0aW9uX25hbWUgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdChcIi5cIiArIGNsYXNzZXMucm9vdClbMF0uZ2V0QXR0cmlidXRlKGF0dHJzLm5hbWUpO1xuICBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VDb21wb25lbnRzTW9kYWwyW1wiZGVmYXVsdFwiXS5wcmVzZW50KF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc1BhdHRlcm4yW1wiZGVmYXVsdFwiXS5maW5kKHZhcmlhdGlvbl9uYW1lLCB7IHNlYXJjaF9hbGw6IHRydWUgfSkpO1xufTtcblxuLy8qXG4vLyBMaXN0ZW5zIGZvciBjbGljayBldmVudHMgb24gYSB0b2dnbGUgYW5kIHVwZGF0ZXMgdGhlIHN0YXRlIG9mIHRoZSB0b2dnbGVcbi8vIGFwcHJvcHJpYXRlbHkuXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gVGhlIGBjbGlja2AgZXZlbnQuXG4vLyBAcHJpdmF0ZVxuXG50b2dnbGVfY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdXBkYXRlX3RvZ2dsZV9zdGF0ZShldmVudC50YXJnZXQpO1xufTtcblxuLy8qXG4vLyBVcGRhdGVzIHRoZSBzdGF0dXMgb2YgdGhlIHBhc3NlZCBjaGFuZ2VyLiBJZiB0aGUgYGFkZGAgYXR0cmlidXRlIG9mIHRoZVxuLy8gYG9wdGlvbmAgYXJndW1lbnQgaXMgZGVmaW5lZCwgYSB0cnV0aHkgdmFsdWUgd2lsbCBhY3RpdmF0ZSB0aGUgY2hhbmdlclxuLy8gYW5kIGEgZmFsc2V5IG9uZSB3aWxsIGRlYWN0aXZhdGUgaXQuIE90aGVyd2lzZSwgdGhlIGNoYW5nZXIgd2lsbCBzaW1wbHlcbi8vIGhhdmUgaXRzIHN0YXRlIHRvZ2dsZWQuXG4vL1xuLy8gQHByaXZhdGVcbi8vXG4vLyBAcGFyYW0ge0hUTUxFbGVtZW50LCBUb2dnbGUsIFN0cmluZ30gdG9nZ2xlIC0gVGhlIHdob3NlIHN0YXRlIHNob3VsZCBiZVxuLy8gdXBkYXRlZC4gQW55dGhpbmcgdGhhdCBjYW4gYmUgcmVzb2x2ZWQgdG8gYSBgVG9nZ2xlYCB2aWEgYFRvZ2dsZS5mb3JgXG4vLyBjYW4gYmUgdXNlZCBoZXJlLCBpbmNsdWRpbmcgYSBgVG9nZ2xlYCwgdGhlIGBIVE1MRWxlbWVudGAgdGhhdCBpcyB0aGUgcm9vdFxuLy8gb2YgdGhlIHRvZ2dsZSwgb3IgYSBgU3RyaW5nYCB0aGF0IGlzIHRoZSBuYW1lIG9mIGEgdG9nZ2xlLlxuLy9cbi8vIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucyA9IHt9XSAtIFRoZSBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyB1cGRhdGUuIEN1cnJlbnRseSxcbi8vIG9ubHkgdGhlIGBhZGRgIG9wdGlvbiBpcyByZWFkIHRvIGRldGVybWluZSB3aGV0aGVyIHRoZSB0b2dnbGUgc2hvdWxkIGJlXG4vLyBhY3RpdmF0ZWQgb3IgZGVhY3RpdmF0ZWQuIElmIG5vIGBvcHRpb25zYCBhcmd1bWVudCBpcyBwYXNzZWQsIHRoZSBgdG9nZ2xlYFxuLy8gd2lsbCBzaW1wbHkgYmUgdG9nZ2xlZC5cblxudXBkYXRlX3RvZ2dsZV9zdGF0ZSA9IGZ1bmN0aW9uICh0b2dnbGUpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICB2YXIgdG9nZ2xlX25vZGUsIGFsbF90b2dnbGVzLCB2YXJpYXRpb24sIGFkZCwgY3VycmVudGx5X2FjdGl2ZSwgYWN0aXZhdGVfd2l0aCwgYWN0aXZhdGVfd2l0aF90b2dnbGUsIHByZWNsdWRlO1xuXG4gIHRvZ2dsZSA9IFRvZ2dsZVtcImZvclwiXSh0b2dnbGUpO1xuICBpZiAodG9nZ2xlLmxvY2tlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICB0b2dnbGVfbm9kZSA9IHRvZ2dsZS5yb290O1xuICB0b2dnbGUubG9jaygpO1xuXG4gIGFsbF90b2dnbGVzID0gVG9nZ2xlc1tcImZvclwiXSh0b2dnbGVfbm9kZSk7XG4gIHZhcmlhdGlvbiA9IF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc1BhdHRlcm4yW1wiZGVmYXVsdFwiXVtcImZvclwiXSh0b2dnbGVfbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cnMubmFtZSksIHsgc2VhcmNoX2FsbDogdHJ1ZSB9KTtcbiAgYWRkID0gb3B0aW9ucy5hZGQgPyAhIW9wdGlvbnMuYWRkIDogIXRvZ2dsZS5hY3RpdmU7XG5cbiAgLy8gVXBkYXRlIHRoZSBzdGF0ZSBvZiBhbGwgdmFyaWF0aW9ucyB0aGF0IHNob3VsZCBiZSBhY3RpdmF0ZWQgd2l0aCB0aGVcbiAgLy8gY3VycmVudCB0b2dnbGUuXG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9nZXRJdGVyYXRvcih2YXJpYXRpb24gJiYgdmFyaWF0aW9uLmFjdGl2YXRlX3dpdGggfHwgW10pLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICBhY3RpdmF0ZV93aXRoID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgIGlmIChfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNOYW1pbmdfY29udmVudGlvbi5uYW1pbmdfY29udmVudGlvbi5pc19jb21wb25lbnQodmFyaWF0aW9uKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgYWN0aXZhdGVfd2l0aF90b2dnbGUgPSBUb2dnbGVbXCJmb3JcIl0oYWN0aXZhdGVfd2l0aCk7XG5cbiAgICAgIGlmIChhY3RpdmF0ZV93aXRoX3RvZ2dsZSkge1xuICAgICAgICBjdXJyZW50bHlfYWN0aXZlID0gYWN0aXZhdGVfd2l0aF90b2dnbGUuYWN0aXZlO1xuICAgICAgICBpZiAoY3VycmVudGx5X2FjdGl2ZSAmJiAhYWRkIHx8ICFjdXJyZW50bHlfYWN0aXZlICYmIGFkZCkge1xuICAgICAgICAgIHVwZGF0ZV90b2dnbGVfc3RhdGUoYWN0aXZhdGVfd2l0aF90b2dnbGUsIHsgYWRkOiBhZGQgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsbF90b2dnbGVzLnRyaWdnZXIoe1xuICAgICAgICAgIGFkZDogYWRkLFxuICAgICAgICAgIGRldGFpbHM6IHtcbiAgICAgICAgICAgIFwiZm9yXCI6IF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc05hbWluZ19jb252ZW50aW9uLm5hbWluZ19jb252ZW50aW9uLmNvbXBvbmVudF9uYW1lKGFjdGl2YXRlX3dpdGgpLFxuICAgICAgICAgICAgbmFtZTogYWN0aXZhdGVfd2l0aFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETzogc29tZXRoaW5nIGFib3V0IGZpbHRlcnMuXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICBfaXRlcmF0b3JbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChhZGQpIHtcbiAgICB0b2dnbGUuYWN0aXZhdGUoKTtcblxuICAgIC8vIERlYWN0aXZhdGVzIGFueSBjdXJyZW50bHkgYWN0aXZlIHZhcmlhdGlvbnMgdGhhdCBhcmUgcHJlY2x1ZGVkIGZyb20gYmVpbmdcbiAgICAvLyBhY3RpdmUgd2l0aCB0aGUgY3VycmVudCB2YXJpYXRpb24uXG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gX2dldEl0ZXJhdG9yKHZhcmlhdGlvbiAmJiB2YXJpYXRpb24ucHJlY2x1ZGVzIHx8IFtdKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgIHByZWNsdWRlID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgIHByZWNsdWRlID0gVG9nZ2xlW1wiZm9yXCJdKHByZWNsdWRlKTtcbiAgICAgICAgaWYgKHByZWNsdWRlICYmIHByZWNsdWRlLmFjdGl2ZSkge1xuICAgICAgICAgIHVwZGF0ZV90b2dnbGVfc3RhdGUocHJlY2x1ZGUsIHsgYWRkOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yMltcInJldHVyblwiXSgpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRvZ2dsZS5kZWFjdGl2YXRlKCk7XG4gIH1cblxuICB0b2dnbGUudW5sb2NrKCk7XG4gIGFsbF90b2dnbGVzLnRyaWdnZXIoeyBhZGQ6IGFkZCwgZGV0YWlsczogdmFyaWF0aW9uIH0pO1xufTtcblxuLy8qXG4vLyBBIGNvbnN0cnVjdG9yIGFyb3VuZCBhIHNpbmdsZSBgVG9nZ2xlYC4gVGhlIHJldHVybmVkIG9iamVjdCBnaXZlcyB0aGUgYWJpbGl0eVxuLy8gdG8gdXBkYXRlIHRoZSB0b2dnbGUncyBzdGF0ZSwgbG9ja2luZyBvciB1bmxvY2tpbmcgdGhlIHRvZ2dsZSBmcm9tIGZ1cnRoZXJcbi8vIGNoYW5nZXMsIGFuZCBnZXR0aW5nIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSB0b2dnbGUuXG4vL1xuLy8gQHBhcmFtIHtIVE1MRWxlbWVudH0gcm9vdCAtIFRoZSByb290IG5vZGUgb2YgYSB0b2dnbGUuXG4vLyBAcmV0dXJuIHtUb2dnbGV9XG5cblRvZ2dsZSA9IGZ1bmN0aW9uIChyb290KSB7XG4gIGlmICghcm9vdCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChyb290IGluc3RhbmNlb2YgVG9nZ2xlKSB7XG4gICAgcmV0dXJuIHJvb3Q7XG4gIH1cblxuICByZXR1cm4gX09iamVjdCRkZWZpbmVQcm9wZXJ0aWVzKHtcbiAgICByb290OiByb290LFxuICAgIGxvY2s6IGZ1bmN0aW9uIGxvY2soKSB7XG4gICAgICByb290LmNsYXNzTGlzdC5hZGQoc3RhdGVzLnJvb3QubG9ja2VkKTtcbiAgICB9LFxuICAgIHVubG9jazogZnVuY3Rpb24gdW5sb2NrKCkge1xuICAgICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKHN0YXRlcy5yb290LmxvY2tlZCk7XG4gICAgfSxcbiAgICBhY3RpdmF0ZTogZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgICByb290LmNsYXNzTGlzdC5hZGQoc3RhdGVzLnJvb3QuYWN0aXZlKTtcbiAgICB9LFxuICAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gICAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoc3RhdGVzLnJvb3QuYWN0aXZlKTtcbiAgICB9LFxuXG4gICAgY29uc3RydWN0b3I6IFRvZ2dsZVxuICB9LCB7XG4gICAgaXNfbG9ja2VkOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHJvb3QuY2xhc3NMaXN0LmNvbnRhaW5zKHN0YXRlcy5yb290LmxvY2tlZCk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgaXNfYWN0aXZlOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHJvb3QuY2xhc3NMaXN0LmNvbnRhaW5zKHN0YXRlcy5yb290LmFjdGl2ZSkgfHwgcm9vdC5jbGFzc0xpc3QuY29udGFpbnMoc3RhdGVzLnJvb3QucGFydGlhbGx5X2FjdGl2ZSk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG59O1xuXG4vLypcbi8vIEdldHMgdGhlIHRvZ2dsZSBmb3IgdGhlIHBhc3NlZCB2YXJpYXRpb24uXG4vL1xuLy8gQHBhcmFtIHtUb2dnbGUsIFN0cmluZywgSFRNTEVsZW1lbnR9IHZhcmlhdGlvbiAtIFRoZSBzb3VyY2Ugb2YgdGhlIGRlc2lyZWRcbi8vIGBUb2dnbGVgIOKAlCBlaXRoZXIgYXMgdGhlIEhUTUxFbGVtZW50IHRoYXQgcm9vdHMgdGhlIHRvZ2dsZSwgYSBgVG9nZ2xlYCAod2hpY2hcbi8vIGlzIHJldHVybmVkIGFzLWlzKSBvciBhIGBTdHJpbmdgIHRoYXQgaXMgdGhlIG5hbWUgb2YgYSB0b2dnbGUuXG4vL1xuLy8gQHJldHVybiB7VG9nZ2xlfVxuXG5Ub2dnbGVbXCJmb3JcIl0gPSBmdW5jdGlvbiAodmFyaWF0aW9uKSB7XG4gIGlmICh2YXJpYXRpb24gaW5zdGFuY2VvZiBUb2dnbGUpIHtcbiAgICByZXR1cm4gdmFyaWF0aW9uO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YXJpYXRpb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gVG9nZ2xlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbXCIgKyBhdHRycy5uYW1lICsgXCI9J1wiICsgdmFyaWF0aW9uLm5hbWUgKyBcIiddXCIpKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gVG9nZ2xlKCQodmFyaWF0aW9uKS5jbG9zZXN0KFwiLlwiICsgY2xhc3Nlcy5yb290KVswXSk7XG4gIH1cbn07XG5cblRvZ2dsZXMgPSBmdW5jdGlvbiAocm9vdCkge1xuICB2YXIgY29tbXVuaWNhdG9yID0gKDAsIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZUNvbXBvbmVudHNJZnJhbWUuQ29tbXVuaWNhdG9yKSgpO1xuICBjb21tdW5pY2F0b3IucmVnaXN0ZXIuZnJvbV9ub2RlKHJvb3QpO1xuXG4gIHJldHVybiB7XG4gICAgdHJpZ2dlcjogZnVuY3Rpb24gdHJpZ2dlcigpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIGNvbW11bmljYXRvci50cmlnZ2VyLmFwcGx5KGNvbW11bmljYXRvciwgW19Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0V2ZW50czJbXCJkZWZhdWx0XCJdLnR5cGVzLmNsYXNzX2NoYW5nZV0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59O1xuXG5Ub2dnbGVzLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICQoZG9jdW1lbnQpLm9uKFwia2V5cHJlc3NcIiwgXCIuXCIgKyBjbGFzc2VzLnJvb3QsIGhhbmRsZV9rZXlwcmVzcykub24oXCJjbGlja1wiLCBcIi5cIiArIGNsYXNzZXMuaW5mbywgaW5mb19jbGljaykub24oXCJjbGlja1wiLCBcIi5cIiArIGNsYXNzZXMucm9vdCwgdG9nZ2xlX2NsaWNrKTtcblxuICBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNCdWlsZGVyMltcImRlZmF1bHRcIl0uYnVpbGQoVG9nZ2xlcywgeyBuYW1lOiBjbGFzc2VzLmNvbnRhaW5lciwgY2FjaGU6IHRydWUgfSk7XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFRvZ2dsZXM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG59LHtcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS9jb21wb25lbnRzL2lmcmFtZVwiOjcsXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvY29tcG9uZW50cy9tb2RhbFwiOjEwLFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy9idWlsZGVyXCI6MjMsXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL2V2ZW50c1wiOjI2LFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy9rZXljb2Rlc1wiOjI3LFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy9uYW1pbmdfY29udmVudGlvblwiOjI5LFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy9wYXR0ZXJuXCI6MzIsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCI6NDIsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzXCI6NDYsXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIjo1NH1dLDE4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRhc3NpZ24gPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ25cIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzVGVtcGxhdGUgPSByZXF1aXJlKFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy90ZW1wbGF0ZVwiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc1RlbXBsYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzVGVtcGxhdGUpO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzUGF0dGVybiA9IHJlcXVpcmUoXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL3BhdHRlcm5cIik7XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNQYXR0ZXJuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzUGF0dGVybik7XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNFdmVudHMgPSByZXF1aXJlKFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy9ldmVudHNcIik7XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNFdmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNFdmVudHMpO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlQ29tcG9uZW50c0V4cGxvZGVkID0gcmVxdWlyZShcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS9jb21wb25lbnRzL2V4cGxvZGVkXCIpO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlQ29tcG9uZW50c0V4cGxvZGVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlQ29tcG9uZW50c0V4cGxvZGVkKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZUNvbXBvbmVudHNJZnJhbWUgPSByZXF1aXJlKFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL2NvbXBvbmVudHMvaWZyYW1lXCIpO1xuXG52YXIgY2xhc3NlcyA9IHtcbiAgcm9vdDogXCJ4LXJheVwiLFxuICBkZXRhaWxzOiBcIngtcmF5X19kZXRhaWxzXCIsXG4gIGxpc3Q6IFwieC1yYXlfX2xpc3RcIlxufTtcblxudmFyIHN0YXRlcyA9IHtcbiAgcm9vdDogeyBhY3RpdmU6IFwieC1yYXktLWlzLWFjdGl2ZVwiIH1cbn07XG5cbnZhciBoZWxwZXJzID0ge1xuICBhY3RpdmU6IFwieC1yYXlfX2hlbHBlcnMtLXgtcmF5LWlzLWFjdGl2ZVwiXG59O1xuXG52YXIgYXR0cnMgPSB7XG4gIGRpc21pc3M6IFwiZGF0YS14cmF5LWRpc21pc3NcIixcbiAgcHJlc2VudDogXCJkYXRhLXhyYXktcHJlc2VudFwiLFxuICB0ZW1wbGF0ZTogXCJkYXRhLXhyYXktdGVtcGxhdGVcIlxufTtcblxudmFyIHRlbXBsYXRlX25hbWVzID0ge1xuICBkZXRhaWxzOiBcImRldGFpbHNcIixcbiAgbGlzdDogXCJsaXN0XCJcbn07XG5cbnZhciBYcmF5LCBzdHJ1Y3R1cmUsIGV4cGxvZGVkLCB0ZW1wbGF0ZXMsIGNvbXBvbmVudCwgaG9va191cF9pZnJhbWVfY29tbXVuaWNhdGlvbiwgY29tbXVuaWNhdG9yLCB0b2dnbGUsIHByZXNlbnQsIGRpc21pc3MsIHNldF9jb21wb25lbnQsIHNldF9kZXRhaWxzO1xuXG5ob29rX3VwX2lmcmFtZV9jb21tdW5pY2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcmVnaXN0ZXJlZDtcblxuICBjb21tdW5pY2F0b3IgPSAoMCwgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlQ29tcG9uZW50c0lmcmFtZS5Db21tdW5pY2F0b3IpKCk7XG4gIHJlZ2lzdGVyZWQgPSBjb21tdW5pY2F0b3IucmVnaXN0ZXIuZnJvbV9ub2RlKHN0cnVjdHVyZS5yb290KTtcblxuICBpZiAoIXJlZ2lzdGVyZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb21tdW5pY2F0b3Iub24oX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzRXZlbnRzMltcImRlZmF1bHRcIl0udHlwZXMubWFya3VwX3JlcXVlc3QsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV4cGxvZGVkLnNldF9tYXJrdXAoZXZlbnQubWFya3VwKTtcbiAgfSk7XG59O1xuXG5zZXRfY29tcG9uZW50ID0gZnVuY3Rpb24gKGNvbXBvbmVudF9uYW1lKSB7XG4gIGNvbXBvbmVudCA9IF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc1BhdHRlcm4yW1wiZGVmYXVsdFwiXS5maW5kKGNvbXBvbmVudF9uYW1lLCB7IHNlYXJjaF9hbGw6IHRydWUgfSk7XG4gIHN0cnVjdHVyZS5oZWFkaW5nLmlubmVySFRNTCA9IGNvbXBvbmVudC50aXRsZSA/IGNvbXBvbmVudC50aXRsZSA6IFwiPGNvZGUgY2xhc3M9J3R5cGUtLWNvZGUnPlwiICsgY29tcG9uZW50X25hbWUgKyBcIjwvY29kZT5cIjtcbiAgc3RydWN0dXJlLmxpc3QuaW5uZXJIVE1MID0gX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzVGVtcGxhdGUyW1wiZGVmYXVsdFwiXS5yZW5kZXIodGVtcGxhdGVzLmxpc3QsIHtcbiAgICBjb21wb25lbnRzOiBbY29tcG9uZW50X25hbWVdLmNvbmNhdChjb21wb25lbnQuc3ViY29tcG9uZW50IHx8IFtdKVxuICB9KTtcbiAgc2V0X2RldGFpbHMoY29tcG9uZW50KTtcbn07XG5cbnNldF9kZXRhaWxzID0gZnVuY3Rpb24gKHN5bWJvbCkge1xuICB2YXIgb3RoZXJfY29udGVudCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gIHZhciBvcHRpb25zID0gX09iamVjdCRhc3NpZ24ob3RoZXJfY29udGVudCwgc3ltYm9sKTtcbiAgc3RydWN0dXJlLmRldGFpbHMuaW5uZXJIVE1MID0gX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzVGVtcGxhdGUyW1wiZGVmYXVsdFwiXS5yZW5kZXIodGVtcGxhdGVzLmRldGFpbHMsIG9wdGlvbnMpO1xufTtcblxucHJlc2VudCA9IGZ1bmN0aW9uICgpIHtcbiAgY29tbXVuaWNhdG9yLnRyaWdnZXIoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzRXZlbnRzMltcImRlZmF1bHRcIl0udHlwZXMubWFya3VwX3JlcXVlc3QpO1xuICBzdHJ1Y3R1cmUucm9vdC5jbGFzc0xpc3QuYWRkKHN0YXRlcy5yb290LmFjdGl2ZSk7XG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChoZWxwZXJzLmFjdGl2ZSk7XG59O1xuXG5kaXNtaXNzID0gZnVuY3Rpb24gKCkge1xuICBleHBsb2RlZC5zZXRfbWFya3VwKCk7XG4gIHN0cnVjdHVyZS5yb290LmNsYXNzTGlzdC5yZW1vdmUoc3RhdGVzLnJvb3QuYWN0aXZlKTtcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGhlbHBlcnMuYWN0aXZlKTtcbn07XG5cbnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHN0cnVjdHVyZS5yb290LmNsYXNzTGlzdC5jb250YWlucyhzdGF0ZXMucm9vdC5hY3RpdmUpID8gZGlzbWlzcygpIDogcHJlc2VudCgpO1xufTtcblxuWHJheSA9IHtcbiAgdG9nZ2xlOiB0b2dnbGUsXG4gIHByZXNlbnQ6IHByZXNlbnQsXG4gIGRpc21pc3M6IGRpc21pc3MsXG5cbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBjbGFzc2VzLnJvb3QpO1xuICAgIGlmICghcm9vdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV4cGxvZGVkID0gX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlQ29tcG9uZW50c0V4cGxvZGVkMltcImRlZmF1bHRcIl0ud2l0aGluKHJvb3QpWzBdO1xuXG4gICAgc3RydWN0dXJlID0ge1xuICAgICAgcm9vdDogcm9vdCxcbiAgICAgIGhlYWRpbmc6IHJvb3QucXVlcnlTZWxlY3RvcihcIi50eXBlLWhlYWRpbmdcIiksXG4gICAgICBkZXRhaWxzOiByb290LnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBjbGFzc2VzLmRldGFpbHMpLFxuICAgICAgbGlzdDogcm9vdC5xdWVyeVNlbGVjdG9yKFwiLlwiICsgY2xhc3Nlcy5saXN0KVxuICAgIH07XG5cbiAgICB0ZW1wbGF0ZXMgPSB7XG4gICAgICBkZXRhaWxzOiByb290LnF1ZXJ5U2VsZWN0b3IoXCJbXCIgKyBhdHRycy50ZW1wbGF0ZSArIFwiPSdcIiArIHRlbXBsYXRlX25hbWVzLmRldGFpbHMgKyBcIiddXCIpLFxuICAgICAgbGlzdDogcm9vdC5xdWVyeVNlbGVjdG9yKFwiW1wiICsgYXR0cnMudGVtcGxhdGUgKyBcIj0nXCIgKyB0ZW1wbGF0ZV9uYW1lcy5saXN0ICsgXCInXVwiKVxuICAgIH07XG5cbiAgICBob29rX3VwX2lmcmFtZV9jb21tdW5pY2F0aW9uKCk7XG5cbiAgICBleHBsb2RlZC5vbihfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VDb21wb25lbnRzRXhwbG9kZWQuZXZlbnRzLnBhbmVfc2VsZWN0ZWQsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgY29tcG9uZW50ID0gX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzUGF0dGVybjJbXCJkZWZhdWx0XCJdLmZpbmQoZXZlbnQuY29tcG9uZW50LCB7IHNlYXJjaF9hbGw6IHRydWUgfSk7XG4gICAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICAgIHNldF9kZXRhaWxzKGNvbXBvbmVudCwgeyB0YWduYW1lOiBldmVudC5ub2RlLnRhZ05hbWUgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKHJvb3QpLm9uKFwiY2xpY2tcIiwgXCJbXCIgKyBhdHRycy5kaXNtaXNzICsgXCJdXCIsIGRpc21pc3MpLm9uKFwiY2xpY2tcIiwgXCJbaHJlZl49JyMnXVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBleHBsb2RlZC5zZWxlY3RfY29tcG9uZW50KGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiW1wiICsgYXR0cnMucHJlc2VudCArIFwiXVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHNldF9jb21wb25lbnQoZXZlbnQuZ2V0QXR0cmlidXRlKGF0dHJzLnByZXNlbnQpKTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBYcmF5O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxufSx7XCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvY29tcG9uZW50cy9leHBsb2RlZFwiOjUsXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvY29tcG9uZW50cy9pZnJhbWVcIjo3LFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy9ldmVudHNcIjoyNixcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS91dGlsaXRpZXMvcGF0dGVyblwiOjMyLFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3V0aWxpdGllcy90ZW1wbGF0ZVwiOjM0LFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ25cIjo0NCxcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiOjU0fV0sMTk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfZ2V0SXRlcmF0b3IgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgQXBwLFxuICAgIGNvbXBvbmVudCxcbiAgICBjb21wb25lbnRzID0gW107XG5cbkFwcCA9IHtcbiAgcmVnaXN0ZXI6IGZ1bmN0aW9uIHJlZ2lzdGVyKGFfY29tcG9uZW50KSB7XG4gICAgY29tcG9uZW50cy5wdXNoKGFfY29tcG9uZW50KTtcbiAgfSxcblxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2dldEl0ZXJhdG9yKGNvbXBvbmVudHMpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgIGNvbXBvbmVudCA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgIGlmIChjb21wb25lbnQuaW5pdCkge1xuICAgICAgICAgIGNvbXBvbmVudC5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEFwcDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbn0se1wiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiOjQyfV0sMjA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VGb3VuZGF0aW9uQXBwID0gcmVxdWlyZShcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS9mb3VuZGF0aW9uL2FwcFwiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZUZvdW5kYXRpb25BcHAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VGb3VuZGF0aW9uQXBwKTtcblxucmVxdWlyZShcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS92ZW5kb3JcIik7XG5cbnJlcXVpcmUoXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvY29tcG9uZW50c1wiKTtcblxucmVxdWlyZShcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS9zdHJ1Y3R1cmVzXCIpO1xuXG5yZXF1aXJlKFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL2JlaGF2aW9yc1wiKTtcblxuX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlRm91bmRhdGlvbkFwcDJbXCJkZWZhdWx0XCJdLmluaXQoKTtcblxufSx7XCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvYmVoYXZpb3JzXCI6MSxcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS9jb21wb25lbnRzXCI6OCxcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS9mb3VuZGF0aW9uL2FwcFwiOjE5LFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL3N0cnVjdHVyZXNcIjoyMSxcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS92ZW5kb3JcIjozOSxcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiOjU0fV0sMjE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfc2lkZWJhciA9IHJlcXVpcmUoXCIuL3NpZGViYXJcIik7XG5cbnZhciBfc2lkZWJhcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zaWRlYmFyKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZUZvdW5kYXRpb25BcHAgPSByZXF1aXJlKFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL2ZvdW5kYXRpb24vYXBwXCIpO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlRm91bmRhdGlvbkFwcDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZUZvdW5kYXRpb25BcHApO1xuXG5bX3NpZGViYXIyW1wiZGVmYXVsdFwiXV0uZm9yRWFjaChfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VGb3VuZGF0aW9uQXBwMltcImRlZmF1bHRcIl0ucmVnaXN0ZXIpO1xuXG59LHtcIi4vc2lkZWJhclwiOjIyLFwiL1VzZXJzL2NocmlzL0Ryb3Bib3ggKFBlcnNvbmFsKS9DaHJpcy9Db2RlL3dlYi9kb2Nrcy9kb2Nrcy9hc3NldHMvc291cmNlL2ZvdW5kYXRpb24vYXBwXCI6MTksXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIjo1NH1dLDIyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0aWVzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXNcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIGNsYXNzZXMgPSB7XG4gIGJhc2U6IFwic2lkZWJhclwiLFxuICB0b2dnbGVyOiBcInNpZGViYXJfX3RvZ2dsZXJcIlxufTtcblxudmFyIHN0YXRlcyA9IHtcbiAgYmFzZTogeyBhY3RpdmU6IGNsYXNzZXMuYmFzZSArIFwiLS1pcy1hY3RpdmVcIiB9XG59O1xuXG52YXIgU2lkZWJhciwgcm9vdCwgc2hvdywgaGlkZSwgdG9nZ2xlLCBjaGVja19mb3Jfc2lkZWJhcl9zdGF0ZV9jaGFuZ2U7XG5cbi8vKlxuLy8gUmV2ZWFscyB0aGUgc2lkZWJhci5cblxuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgcm9vdC5jbGFzc0xpc3QuYWRkKHN0YXRlcy5iYXNlLmFjdGl2ZSk7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGVja19mb3Jfc2lkZWJhcl9zdGF0ZV9jaGFuZ2UpO1xuICB9LCAwKTtcbn07XG5cbi8vKlxuLy8gSGlkZXMgdGhlIHNpZGViYXIuXG5cbmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGVja19mb3Jfc2lkZWJhcl9zdGF0ZV9jaGFuZ2UpO1xuICByb290LmNsYXNzTGlzdC5yZW1vdmUoc3RhdGVzLmJhc2UuYWN0aXZlKTtcbn07XG5cbi8vKlxuLy8gVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgc2lkZWJhci5cblxudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gU2lkZWJhci5pc19hY3RpdmUgPyBoaWRlKCkgOiBzaG93KCk7XG59O1xuXG4vLypcbi8vIENhcHR1cmVzIGFsbCBjbGlja3Mgd2hlbiB0aGUgc2lkZWJhciBpcyBhY3RpdmUgYW5kIGNoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGVcbi8vIHNpZGViYXIgc2hvdWxkIGNoYW5nZSBpdHMgdmlzaWJpbGl0eS4gSWYgdGhlIHNpZGViYXIgaXMgY2xpY2tlZCBvbiwgaXQgc2hvdWxkXG4vLyByZW1haW4gb3BlbiDigJQgb3RoZXJ3aXNlLCBpdCBzaG91bGQgY2xvc2UuXG4vL1xuLy8gQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gVGhlIGBjbGlja2AgZXZlbnQgb24gdGhlIGBkb2N1bWVudGAuXG4vLyBAcHJpdmF0ZVxuXG5jaGVja19mb3Jfc2lkZWJhcl9zdGF0ZV9jaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaWYgKCEkKGV2ZW50LnRhcmdldCkuY2xvc2VzdChcIi5cIiArIGNsYXNzZXMuYmFzZSkubGVuZ3RoKSB7XG4gICAgaGlkZSgpO1xuICB9XG59O1xuXG4vLypcbi8vIFRoZSBnbG9iYWwgc2lkZWJhciBvYmplY3QuIFVzZSB0aGlzIG1ldGhvZCBmb3IgbWFudWFsbHkgdXBkYXRpbmcgdGhlIHN0YXRlIG9mXG4vLyB0aGUgc2lkZWJhcjsgaG93ZXZlciwgbm90ZSB0aGF0IGNsaWNrIGV2ZW50cyBvbiB0aGUgdG9nZ2xlciBhbmQgd2hlbiB0aGVcbi8vIHNpZGViYXIgaXMgb3BlbiBhcmUgaGFuZGxlZCBhdXRvbWF0aWNhbGx5IGJ5IHRoZSBjb21wb25lbnQgaXRzZWxmLlxuXG5TaWRlYmFyID0gX09iamVjdCRkZWZpbmVQcm9wZXJ0aWVzKHtcbiAgc2hvdzogc2hvdyxcbiAgaGlkZTogaGlkZSxcbiAgdG9nZ2xlOiB0b2dnbGUsXG5cbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5cIiArIGNsYXNzZXMuYmFzZSk7XG4gICAgaWYgKCFyb290KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5cIiArIGNsYXNzZXMudG9nZ2xlcikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZSk7XG4gIH1cbn0sIHtcbiAgaXNfYWN0aXZlOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gcm9vdC5jbGFzc0xpc3QuY29udGFpbnMoc3RhdGVzLmJhc2UuYWN0aXZlKTtcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG4gIH1cbn0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFNpZGViYXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG59LHtcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXNcIjo0Nn1dLDIzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX0FycmF5JGZyb20gPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb21cIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2dldEl0ZXJhdG9yID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzRG9tX2NhY2hlID0gcmVxdWlyZShcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS91dGlsaXRpZXMvZG9tX2NhY2hlXCIpO1xuXG52YXIgX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzRG9tX2NhY2hlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJzQ2hyaXNEcm9wYm94UGVyc29uYWxDaHJpc0NvZGVXZWJEb2Nrc0RvY2tzQXNzZXRzU291cmNlVXRpbGl0aWVzRG9tX2NhY2hlKTtcblxuLy8qXG4vLyBAcGF0dGVybiBCdWlsZGVyXG4vLyBAZ3JvdXAgSGVscGVyXG4vL1xuLy8gQSB1dGlsaXR5IGZvciBidWlsZGluZyBhbGwgaW5zdGFuY2VzIG9mIGZhY3Rvcmllcy4gVGhpcyBtYW5hZ2VzIHRoZSBmaW5kaW5nXG4vLyBhbmQgaW5pdGlhbGl6YXRpb24gb2YgaW5zdGFuY2VzIG9mIGEgZmFjdG9yeSwgY2FjaGVpbmcsIGFkZGluZyBjYWNoZVxuLy8gcmV0cmlldmFsIG1ldGhvZHMsIGFuZCBtb3JlLlxuXG52YXIgQnVpbGRlciwgYWRkX3JldHJpZXZhbF9tZXRob2RzO1xuXG4vLypcbi8vIEFkZHMgc3RhdGljIG1ldGhvZHMgdG8gYEZhY3RvcnlgIHRoYXQgYWxsb3cgaXQgdG8gcmV0cmlldmUgY2FjaGVkIGluc3RhbmNlc1xuLy8gZnJvbSBub2Rlcy5cbi8vXG4vLyBAcHJpdmF0ZVxuLy9cbi8vIEBwYXJhbSB7RnVuY3Rpb259IEZhY3RvcnkgLSBUaGUgZmFjdG9yeSBmdW5jdGlvbiB0byBhZGQgbWV0aG9kcyB0by5cbi8vXG4vLyBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMgPSB7fV1cbi8vXG4vLyBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubmFtZV0gLSBUaGUgbmFtZSBmb3IgdGhpcyBGYWN0b3J5LiBUaGlzIHdpbGxcbi8vIGJlIHVzZWQgYXMgdGhlIHJvb3QgY2xhc3MgbmFtZSBpZiBgb3B0aW9ucy5zZWxlY3RvcmAgaXMgbm90IHByb3ZpZGVkLlxuLy9cbi8vIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5zZWxlY3Rvcl0gLSBUaGUgc2VsZWN0b3IgdG8gdXNlIHRvIGZpbmQgbm9kZXNcbi8vIHRvIGNhbGwgdGhlIGZhY3Rvcnkgb24uXG5cbmFkZF9yZXRyaWV2YWxfbWV0aG9kcyA9IGZ1bmN0aW9uIChGYWN0b3J5KSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgaWYgKCFGYWN0b3J5W1wiZm9yXCJdKSB7XG4gICAgRmFjdG9yeVtcImZvclwiXSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICByZXR1cm4gKDAsIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVV0aWxpdGllc0RvbV9jYWNoZTJbXCJkZWZhdWx0XCJdKSgkKG5vZGUpLmNsb3Nlc3Qob3B0aW9ucy5zZWxlY3RvcilbMF0pLmdldChvcHRpb25zLm5hbWUpO1xuICAgIH07XG4gIH1cblxuICBpZiAoIUZhY3Rvcnkud2l0aGluKSB7XG4gICAgRmFjdG9yeS53aXRoaW4gPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgdmFyIHJlc3VsdHMgPSBbXSxcbiAgICAgICAgICBhcGksXG4gICAgICAgICAgbm9kZXMgPSBfQXJyYXkkZnJvbShub2RlLnF1ZXJ5U2VsZWN0b3JBbGwob3B0aW9ucy5zZWxlY3RvcikpO1xuXG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2dldEl0ZXJhdG9yKG5vZGVzKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgIG5vZGUgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgIGFwaSA9IEZhY3RvcnlbXCJmb3JcIl0obm9kZSk7XG4gICAgICAgICAgaWYgKGFwaSkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGFwaSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgICAgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG4gIH1cbn07XG5cbi8vKlxuLy8gQG9iamVjdFxuXG5CdWlsZGVyID0ge1xuXG4gIC8vKlxuICAvLyBDcmVhdGVzIGFsbCByZXF1aXJlZCBpbnN0YW5jZXMgb2YgdGhlIHBhc3NlZCBmYWN0b3J5LlxuICAvL1xuICAvLyBAbWV0aG9kXG4gIC8vXG4gIC8vIEBwYXJhbSB7RnVuY3Rpb259IEZhY3RvcnkgLSBUaGUgZmFjdG9yeSBmdW5jdGlvbiB0byB1c2UuXG4gIC8vXG4gIC8vIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucyA9IHt9XVxuICAvL1xuICAvLyBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubmFtZV0gLSBUaGUgbmFtZSBmb3IgdGhpcyBGYWN0b3J5LiBUaGlzIHdpbGxcbiAgLy8gYmUgdXNlZCB0byBzZXQgdXAgY2FjaGVpbmcgaWYgcmVxdWlyZWQsIGFuZCB3aWxsIGJlIHVzZWQgYXMgdGhlIHJvb3RcbiAgLy8gY2xhc3MgbmFtZSBpZiBgb3B0aW9ucy5zZWxlY3RvcmAgaXMgbm90IHByb3ZpZGVkLlxuICAvL1xuICAvLyBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuc2VsZWN0b3JdIC0gVGhlIHNlbGVjdG9yIHRvIHVzZSB0byBmaW5kIG5vZGVzXG4gIC8vIHRvIGNhbGwgdGhlIGZhY3Rvcnkgb24uXG4gIC8vXG4gIC8vIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2FjaGUgPSBmYWxzZV0gLSBXaGV0aGVyIG9yIG5vdCB0byBjYWNoZSB0aGVcbiAgLy8gcmV0dXJuIHJlc3VsdCBvZiB0aGUgZmFjdG9yeSBvbiB0aGUgbm9kZS5cbiAgLy9cbiAgLy8gQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuZmlsdGVyXSAtIEEgZnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXJcbiAgLy8gb3Igbm90IGEgZ2l2ZW4gbm9kZSBzaG91bGQgYmUgdXNlZCBhcyBhIHJvb3QgZm9yIHRoZSBgZmFjdG9yeWAuIFRoaXNcbiAgLy8gZnVuY3Rpb24gaXMgcGFzc2VkIGEgc2luZ2xlIGFyZ3VtZW50LCBgbm9kZWAsIHdoaWNoIGlzIHRoZSBub2RlIHRvIHRlc3QuXG5cbiAgYnVpbGQ6IGZ1bmN0aW9uIGJ1aWxkKEZhY3RvcnkpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gICAgdmFyIG5vZGUsIG5vZGVzLCBhcGk7XG5cbiAgICBub2RlcyA9IG9wdGlvbnMuc2VsZWN0b3IgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKG9wdGlvbnMuc2VsZWN0b3IpIDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShvcHRpb25zLm5hbWUpO1xuXG4gICAgb3B0aW9ucy5zZWxlY3RvciA9IG9wdGlvbnMuc2VsZWN0b3IgfHwgXCIuXCIgKyBvcHRpb25zLm5hbWU7XG5cbiAgICBpZiAob3B0aW9ucy5jYWNoZSkge1xuICAgICAgYWRkX3JldHJpZXZhbF9tZXRob2RzKEZhY3RvcnksIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IF9nZXRJdGVyYXRvcihfQXJyYXkkZnJvbShub2RlcykpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgbm9kZSA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgICBpZiAob3B0aW9ucy5maWx0ZXIgJiYgIW9wdGlvbnMuZmlsdGVyKG5vZGUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBhcGkgPSBGYWN0b3J5KG5vZGUpO1xuICAgICAgICBpZiAob3B0aW9ucy5jYWNoZSkge1xuICAgICAgICAgICgwLCBfVXNlcnNDaHJpc0Ryb3Bib3hQZXJzb25hbENocmlzQ29kZVdlYkRvY2tzRG9ja3NBc3NldHNTb3VyY2VVdGlsaXRpZXNEb21fY2FjaGUyW1wiZGVmYXVsdFwiXSkobm9kZSkuc2V0KG9wdGlvbnMubmFtZSwgYXBpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yMltcInJldHVyblwiXSgpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vKlxuICAvLyBCdWlsZHMgdGhlIHBhc3NlZCBmYWN0b3J5IGFuZCBjYWNoZXMgdGhlIHJlc3VsdC4gVGhpcyBpcyBlcXVpdmFsZW50IHRvOlxuICAvL1xuICAvLyBgYGBcbiAgLy8gQnVpbGRlci5idWlsZChGYWN0b3J5LCB7IGNhY2hlOiB0cnVlIH0pO1xuICAvLyBgYGBcbiAgLy9cbiAgLy8gU2VlIFtgQnVpbGRlci5idWlsZGBdKEBsaW5rKSBmb3IgbW9yZSBkZXRhaWxzIG9uIGBvcHRpb25zYCBhcmd1bWVudC5cbiAgLy9cbiAgLy8gQHBhcmFtIHtGdW5jdGlvbn0gRmFjdG9yeSAtIFRoZSBmYWN0b3J5IGZ1bmN0aW9uIHRvIHVzZS5cbiAgLy8gQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zID0ge31dXG4gIC8vXG4gIC8vIEBtZXRob2RcblxuICBidWlsZF9hbmRfY2FjaGU6IGZ1bmN0aW9uIGJ1aWxkX2FuZF9jYWNoZShGYWN0b3J5KSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICAgIG9wdGlvbnMuY2FjaGUgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLmJ1aWxkKEZhY3RvcnksIG9wdGlvbnMpO1xuICB9LFxuXG4gIC8vKlxuICAvLyBCdWlsZHMgdGhlIHBhc3NlZCBmYWN0b3J5IGJ1dCwgYmVmb3JlIGRvaW5nIHNvLCBlbnN1cmVzIHRoYXQgZWFjaCBub2RlXG4gIC8vIGhhcyBub3QgYmVlbiB1c2VkIGFzIGFuIGFyZ3VtZW50IGZvciB0aGlzIGZhY3RvcnkuXG4gIC8vXG4gIC8vIFNlZSBbYEJ1aWxkZXIuYnVpbGRgXShAbGluaykgZm9yIG1vcmUgZGV0YWlscyBvbiBgb3B0aW9uc2AgYXJndW1lbnQuXG4gIC8vXG4gIC8vIEBwYXJhbSB7RnVuY3Rpb259IEZhY3RvcnkgLSBUaGUgZmFjdG9yeSBmdW5jdGlvbiB0byB1c2UuXG4gIC8vIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucyA9IHt9XVxuICAvL1xuICAvLyBAbWV0aG9kXG5cbiAgaW5pdGlhbGl6ZV9vbmNlOiBmdW5jdGlvbiBpbml0aWFsaXplX29uY2UoRmFjdG9yeSkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgb3B0aW9ucy5maWx0ZXIgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICByZXR1cm4gIUZhY3RvcnlbXCJmb3JcIl0obm9kZSk7XG4gICAgICB9O1xuICAgICAgQnVpbGRlci5idWlsZF9hbmRfY2FjaGUoRmFjdG9yeSwgb3B0aW9ucyk7XG4gICAgfTtcbiAgfVxufTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBCdWlsZGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxufSx7XCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdXRpbGl0aWVzL2RvbV9jYWNoZVwiOjI1LFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb21cIjo0MSxcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3JcIjo0MixcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiOjU0fV0sMjQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgQ2xpZW50O1xuXG5DbGllbnQgPSB7XG4gIG5hbWVfZm9yOiBmdW5jdGlvbiBuYW1lX2Zvcihwcm9wZXJ0eSkge1xuICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgfVxufTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBDbGllbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG59LHt9XSwyNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyAgICAgICAgX19fICAgICAgICAgIF9fXyAgICAgICAgICBfX18gICAgICAgICAgX19fICAgICAgICAgIF9fX1xuLy8gICAgICAgLyAgL1xcICAgICAgICAvICAvXFwgICAgICAgIC8gIC9cXCAgICAgICAgL19fL1xcICAgICAgICAvICAvXFxcbi8vICAgICAgLyAgLzovICAgICAgIC8gIC86OlxcICAgICAgLyAgLzovICAgICAgICBcXCAgXFw6XFwgICAgICAvICAvOi9fXG4vLyAgICAgLyAgLzovICAgICAgIC8gIC86L1xcOlxcICAgIC8gIC86LyAgICAgICAgICBcXF9fXFw6XFwgICAgLyAgLzovIC9cXFxuLy8gICAgLyAgLzovICBfX18gIC8gIC86L34vOjpcXCAgLyAgLzovICBfX18gIF9fXyAvICAvOjpcXCAgLyAgLzovIC86L19cbi8vICAgL19fLzovICAvICAvXFwvX18vOi8gLzovXFw6XFwvX18vOi8gIC8gIC9cXC9fXy9cXCAgLzovXFw6XFwvX18vOi8gLzovIC9cXFxuLy8gICBcXCAgXFw6XFwgLyAgLzovXFwgIFxcOlxcLzovX19cXC9cXCAgXFw6XFwgLyAgLzovXFwgIFxcOlxcLzovX19cXC9cXCAgXFw6XFwvOi8gLzovXG4vLyAgICBcXCAgXFw6XFwgIC86LyAgXFwgIFxcOjovICAgICAgXFwgIFxcOlxcICAvOi8gIFxcICBcXDo6LyAgICAgIFxcICBcXDo6LyAvOi9cbi8vICAgICBcXCAgXFw6XFwvOi8gICAgXFwgIFxcOlxcICAgICAgIFxcICBcXDpcXC86LyAgICBcXCAgXFw6XFwgICAgICAgXFwgIFxcOlxcLzovXG4vLyAgICAgIFxcICBcXDo6LyAgICAgIFxcICBcXDpcXCAgICAgICBcXCAgXFw6Oi8gICAgICBcXCAgXFw6XFwgICAgICAgXFwgIFxcOjovXG4vLyAgICAgICBcXF9fXFwvICAgICAgICBcXF9fXFwvICAgICAgICBcXF9fXFwvICAgICAgICBcXF9fXFwvICAgICAgICBcXF9fXFwvXG5cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIENhY2hlO1xuXG5DYWNoZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHZhciAkbm9kZSA9ICQobm9kZSk7XG5cbiAgcmV0dXJuIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgIHJldHVybiAkbm9kZS5kYXRhKGtleSk7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gJG5vZGUuZGF0YShrZXksIHZhbHVlKTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IENhY2hlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxufSx7fV0sMjY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy8gICAgICAgIF9fXyAgICAgICAgICAgICAgICAgICAgICBfX18gICAgICAgICAgX19fICAgICAgICAgICAgICAgICAgIF9fX1xuLy8gICAgICAgLyAgL1xcICAgICAgICAgX19fICAgICAgICAvICAvXFwgICAgICAgIC9fXy9cXCAgICAgICAgIF9fXyAgICAgLyAgL1xcXG4vLyAgICAgIC8gIC86L18gICAgICAgL19fL1xcICAgICAgLyAgLzovXyAgICAgICBcXCAgXFw6XFwgICAgICAgLyAgL1xcICAgLyAgLzovX1xuLy8gICAgIC8gIC86LyAvXFwgICAgICBcXCAgXFw6XFwgICAgLyAgLzovIC9cXCAgICAgICBcXCAgXFw6XFwgICAgIC8gIC86LyAgLyAgLzovIC9cXFxuLy8gICAgLyAgLzovIC86L18gICAgICBcXCAgXFw6XFwgIC8gIC86LyAvOi9fICBfX19fX1xcX19cXDpcXCAgIC8gIC86LyAgLyAgLzovIC86OlxcXG4vLyAgIC9fXy86LyAvOi8gL1xcIF9fXyAgXFxfX1xcOlxcL19fLzovIC86LyAvXFwvX18vOjo6Ojo6OjpcXCAvICAvOjpcXCAvX18vOi8gLzovXFw6XFxcbi8vICAgXFwgIFxcOlxcLzovIC86Ly9fXy9cXCB8ICB8OnxcXCAgXFw6XFwvOi8gLzovXFwgIFxcOlxcfn5cXH5+XFwvL19fLzovXFw6XFxcXCAgXFw6XFwvOi9+LzovXG4vLyAgICBcXCAgXFw6Oi8gLzovIFxcICBcXDpcXHwgIHw6fCBcXCAgXFw6Oi8gLzovICBcXCAgXFw6XFwgIH5+fiBcXF9fXFwvICBcXDpcXFxcICBcXDo6LyAvOi9cbi8vICAgICBcXCAgXFw6XFwvOi8gICBcXCAgXFw6XFxfX3w6fCAgXFwgIFxcOlxcLzovICAgIFxcICBcXDpcXCAgICAgICAgICBcXCAgXFw6XFxcXF9fXFwvIC86L1xuLy8gICAgICBcXCAgXFw6Oi8gICAgIFxcX19cXDo6OjovICAgIFxcICBcXDo6LyAgICAgIFxcICBcXDpcXCAgICAgICAgICBcXF9fXFwvICAvX18vOi9cbi8vICAgICAgIFxcX19cXC8gICAgICAgICAgfn5+fiAgICAgIFxcX19cXC8gICAgICAgIFxcX19cXC8gICAgICAgICAgICAgICAgIFxcX19cXC9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfZ2V0SXRlcmF0b3IgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgRXZlbnRzID0ge1xuICByZWdpc3RlcjogZnVuY3Rpb24gcmVnaXN0ZXIoKSB7XG4gICAgdmFyIGV2ZW50O1xuXG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgZXZlbnRzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGV2ZW50c1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2dldEl0ZXJhdG9yKGV2ZW50cyksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgZXZlbnQgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICB0aGlzLnR5cGVzW2V2ZW50XSA9IGV2ZW50O1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICBfaXRlcmF0b3JbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgdHlwZXM6IHt9XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEV2ZW50cztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbn0se1wiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiOjQyfV0sMjc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHM9e1xuICBcIm1haW5cIjogXCJwYWNrYWdlLmpzb25cIlxufVxuXG59LHt9XSwyODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyAgICAgICAgX19fICAgICAgICAgIF9fXyAgICAgICAgICBfX18gICAgICAgICAgX19fICAgICAgICAgIF9fXyAgICAgICAgICBfX19cbi8vICAgICAgIC9fXy9cXCAgICAgICAgLyAgL1xcICAgICAgICAvICAvXFwgICAgICAgIC9fXy98ICAgICAgICAvX18vXFwgICAgICAgIC8gIC9cXFxuLy8gICAgICB8ICB8OjpcXCAgICAgIC8gIC86OlxcICAgICAgLyAgLzo6XFwgICAgICB8ICB8OnwgICAgICAgIFxcICBcXDpcXCAgICAgIC8gIC86OlxcXG4vLyAgICAgIHwgIHw6fDpcXCAgICAvICAvOi9cXDpcXCAgICAvICAvOi9cXDpcXCAgICAgfCAgfDp8ICAgICAgICAgXFwgIFxcOlxcICAgIC8gIC86L1xcOlxcXG4vLyAgICBfX3xfX3w6fFxcOlxcICAvICAvOi9+Lzo6XFwgIC8gIC86L34vOi8gICBfX3wgIHw6fCAgICAgX19fICBcXCAgXFw6XFwgIC8gIC86L34vOi9cbi8vICAgL19fLzo6Ojp8IFxcOlxcL19fLzovIC86L1xcOlxcL19fLzovIC86L19fXy9fXy9cXF98OnxfX19fL19fL1xcICBcXF9fXFw6XFwvX18vOi8gLzovXG4vLyAgIFxcICBcXDpcXH5+XFxfX1xcL1xcICBcXDpcXC86L19fXFwvXFwgIFxcOlxcLzo6Ojo6L1xcICBcXDpcXC86Ojo6Oi9cXCAgXFw6XFwgLyAgLzovXFwgIFxcOlxcLzovXG4vLyAgICBcXCAgXFw6XFwgICAgICAgXFwgIFxcOjovICAgICAgXFwgIFxcOjovfn5+fiAgXFwgIFxcOjovfn5+fiAgXFwgIFxcOlxcICAvOi8gIFxcICBcXDo6L1xuLy8gICAgIFxcICBcXDpcXCAgICAgICBcXCAgXFw6XFwgICAgICAgXFwgIFxcOlxcICAgICAgIFxcICBcXDpcXCAgICAgICBcXCAgXFw6XFwvOi8gICAgXFwgIFxcOlxcXG4vLyAgICAgIFxcICBcXDpcXCAgICAgICBcXCAgXFw6XFwgICAgICAgXFwgIFxcOlxcICAgICAgIFxcICBcXDpcXCAgICAgICBcXCAgXFw6Oi8gICAgICBcXCAgXFw6XFxcbi8vICAgICAgIFxcX19cXC8gICAgICAgIFxcX19cXC8gICAgICAgIFxcX19cXC8gICAgICAgIFxcX19cXC8gICAgICAgIFxcX19cXC8gICAgICAgIFxcX19cXC9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfZ2V0SXRlcmF0b3IgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdmVuZG9ySGlnaGxpZ2h0ID0gcmVxdWlyZShcIi4uLy4uL3ZlbmRvci9oaWdobGlnaHRcIik7XG5cbnZhciBfdmVuZG9ySGlnaGxpZ2h0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZlbmRvckhpZ2hsaWdodCk7XG5cbnZhciBzdGFydF90YWdfdGVzdCA9IC9ePFteXFwvXS87XG52YXIgZW5kX3RhZ190ZXN0ID0gL148XFwvLztcbnZhciBjb250YWluc19lbmRfdGFnID0gLzxcXC8vO1xuXG4vLypcbi8vIFRoZSBzaXplIG9mIG1hbnVhbGx5IHJlLWluZGVudGVkIGNvZGUuXG4vL1xuLy8gQHByaXZhdGVcbi8vIEB0eXBlIE51bWJlclxuLy8gQHZhbHVlIDJcblxudmFyIElOREVOVEFUSU9OX1NJWkUgPSAyO1xuXG52YXIgZGVjb2RlX2h0bWxfZW50aXRpZXMsIGluZGVudCwgY2xlYW4sIGhpZ2hsaWdodDtcblxuZXhwb3J0cy5kZWNvZGVfaHRtbF9lbnRpdGllcyA9IGRlY29kZV9odG1sX2VudGl0aWVzID0gZnVuY3Rpb24gKHN0cmluZykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gc3RyaW5nLnRyaW0oKTtcblxuICByZXR1cm4gZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCA/IFwiXCIgOiBlbGVtZW50LmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlIHx8IGVsZW1lbnQuaW5uZXJIVE1MO1xufTtcblxuLy8qXG4vLyBJbmRlbnRzIEhUTUwgbWFya3VwIGJ5IGZpbmRpbmcgb3BlbmluZyBhbmQgY2xvc2luZyBIVE1MIHRhZ3MuXG4vL1xuLy8gQHBhcmFtIHtTdHJpbmd9IGNvZGUgLSBUaGUgcmFuZG9tbHktZXNjYXBlZCBIVE1MIHN0cmluZy5cbi8vIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBpbmRlbnRlZCBzdHJpbmcuXG5cbmV4cG9ydHMuaW5kZW50ID0gaW5kZW50ID0gZnVuY3Rpb24gKG1hcmt1cCkge1xuICB2YXIgaW5kZW50X2NvdW50ID0gLUlOREVOVEFUSU9OX1NJWkUsXG4gICAgICBpbmRlbnRlZF9tYXJrdXAgPSBbXSxcbiAgICAgIG1hcmt1cF9saW5lcyA9IG1hcmt1cC5zcGxpdChcIlxcblwiKSxcbiAgICAgIG1hcmt1cF9saW5lLFxuICAgICAgc3RhcnRfdGFnLFxuICAgICAgZW5kX3RhZztcblxuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBfZ2V0SXRlcmF0b3IobWFya3VwX2xpbmVzKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgbWFya3VwX2xpbmUgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgbWFya3VwX2xpbmUgPSBtYXJrdXBfbGluZS50cmltKCk7XG4gICAgICBzdGFydF90YWcgPSBzdGFydF90YWdfdGVzdC50ZXN0KG1hcmt1cF9saW5lKTtcbiAgICAgIGVuZF90YWcgPSBlbmRfdGFnX3Rlc3QudGVzdChtYXJrdXBfbGluZSk7XG5cbiAgICAgIGlmIChzdGFydF90YWcpIHtcbiAgICAgICAgaW5kZW50X2NvdW50ICs9IElOREVOVEFUSU9OX1NJWkU7XG4gICAgICB9XG4gICAgICBpbmRlbnRfY291bnQgPSBNYXRoLm1heChpbmRlbnRfY291bnQsIDApO1xuXG4gICAgICBpZiAoaW5kZW50X2NvdW50ID4gMCkge1xuICAgICAgICBtYXJrdXBfbGluZSA9IFwiXCIgKyBBcnJheShpbmRlbnRfY291bnQgKyAxKS5qb2luKFwiIFwiKSArIG1hcmt1cF9saW5lO1xuICAgICAgfVxuXG4gICAgICBpbmRlbnRlZF9tYXJrdXAucHVzaChtYXJrdXBfbGluZSk7XG4gICAgICBpZiAoZW5kX3RhZykge1xuICAgICAgICBpbmRlbnRfY291bnQgLT0gSU5ERU5UQVRJT05fU0laRTtcbiAgICAgIH1cbiAgICAgIGlmICghZW5kX3RhZyAmJiBjb250YWluc19lbmRfdGFnLnRlc3QobWFya3VwX2xpbmUpKSB7XG4gICAgICAgIGluZGVudF9jb3VudCAtPSBJTkRFTlRBVElPTl9TSVpFO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgIF9pdGVyYXRvcltcInJldHVyblwiXSgpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluZGVudGVkX21hcmt1cC5qb2luKFwiXFxuXCIpO1xufTtcblxuZXhwb3J0cy5jbGVhbiA9IGNsZWFuID0gZnVuY3Rpb24gKGNvZGUpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICB2YXIgbGVhZGluZ19zcGFjZXM7XG5cbiAgaWYgKCFjb2RlKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBjb2RlID0gZGVjb2RlX2h0bWxfZW50aXRpZXMoY29kZSk7XG4gIGNvZGUgPSBjb2RlLnRyaW0oKTtcbiAgaWYgKG9wdGlvbnMuY29sbGFwc2VfbmV3bGluZXMpIHtcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC9cXG5eXFxzKlxcbi9tZywgXCJcXG5cIik7XG4gIH1cblxuICAvLyBLaWxscyBhbnkgbGVhZGluZyBzcGFjZXMgZnJvbSBlYWNoIGxpbmVcbiAgbGVhZGluZ19zcGFjZXMgPSBjb2RlLm1hdGNoKC9eXFxzKi8pO1xuICBpZiAobGVhZGluZ19zcGFjZXMpIHtcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJeXFxcXHN7XCIgKyBsZWFkaW5nX3NwYWNlc1swXS5sZW5ndGggKyBcIn1cIiwgXCJnbVwiKSwgXCJcIik7XG4gIH1cblxuICByZXR1cm4gY29kZTtcbn07XG5cbmV4cG9ydHMuaGlnaGxpZ2h0ID0gaGlnaGxpZ2h0ID0gZnVuY3Rpb24gKGNvZGUpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICByZXR1cm4gX3ZlbmRvckhpZ2hsaWdodDJbXCJkZWZhdWx0XCJdLmhpZ2hsaWdodChvcHRpb25zLmxhbmd1YWdlX2NvZGUgfHwgXCJodG1sXCIsIGNvZGUpLnZhbHVlO1xufTtcblxuZXhwb3J0cy5kZWNvZGVfaHRtbF9lbnRpdGllcyA9IGRlY29kZV9odG1sX2VudGl0aWVzO1xuZXhwb3J0cy5pbmRlbnQgPSBpbmRlbnQ7XG5leHBvcnRzLmNsZWFuID0gY2xlYW47XG5leHBvcnRzLmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcblxufSx7XCIuLi8uLi92ZW5kb3IvaGlnaGxpZ2h0XCI6MzgsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCI6NDIsXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIjo1NH1dLDI5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIG5hbWluZ19jb252ZW50aW9uID0ge307XG5cbmV4cG9ydHMubmFtaW5nX2NvbnZlbnRpb24gPSBuYW1pbmdfY29udmVudGlvbjtcblxufSx7fV0sMzA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfYmluZCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvYmluZFwiKVtcImRlZmF1bHRcIl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgTWF0cml4LCBiZXR3ZWVuO1xuXG5leHBvcnRzLmJldHdlZW4gPSBiZXR3ZWVuID0gZnVuY3Rpb24gKHBvaW50LCBtaW4sIG1heCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMyB8fCBhcmd1bWVudHNbM10gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzNdO1xuXG4gIHZhciBtaW5fY29uZGl0aW9uID0gb3B0aW9ucy5pbmNsdWRlX21pbiA/IHBvaW50ID49IG1pbiA6IHBvaW50ID4gbWluLFxuICAgICAgbWF4X2NvbmRpdGlvbiA9IG9wdGlvbnMuaW5jbHVkZV9tYXggPyBwb2ludCA8PSBtYXggOiBwb2ludCA8IG1heDtcbiAgcmV0dXJuIG1pbl9jb25kaXRpb24gJiYgbWF4X2NvbmRpdGlvbjtcbn07XG5cbmV4cG9ydHMuTWF0cml4ID0gTWF0cml4ID0gZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICB2YXIgTWF0cml4Q2xhc3MgPSB3aW5kb3cuV2ViS2l0Q1NTTWF0cml4IHx8IHdpbmRvdy5NU0NTU01hdHJpeCB8fCB3aW5kb3cuQ1NTTWF0cml4O1xuICByZXR1cm4gbmV3IChfYmluZC5hcHBseShNYXRyaXhDbGFzcywgW251bGxdLmNvbmNhdChhcmdzKSkpKCk7XG59O1xuXG5leHBvcnRzLk1hdHJpeCA9IE1hdHJpeDtcbmV4cG9ydHMuYmV0d2VlbiA9IGJldHdlZW47XG5cbn0se1wiYmFiZWwtcnVudGltZS9oZWxwZXJzL2JpbmRcIjo1Mn1dLDMxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIGZvcmNlX3JlcGFpbnQ7XG5cbmV4cG9ydHMuZm9yY2VfcmVwYWludCA9IGZvcmNlX3JlcGFpbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBub2RlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQgOiBhcmd1bWVudHNbMF07XG5cbiAgcmV0dXJuIG5vZGUub2Zmc2V0SGVpZ2h0ICYmIG5vZGUub2Zmc2V0V2lkdGg7XG59O1xuXG5leHBvcnRzLmZvcmNlX3JlcGFpbnQgPSBmb3JjZV9yZXBhaW50O1xuXG59LHt9XSwzMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9nZXRJdGVyYXRvciA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBQYXR0ZXJuLCBwYXR0ZXJuLCByZXN1bHRfdHlwZXMsIGZpbmRfdmFyaWF0aW9uO1xuXG5wYXR0ZXJuID0gd2luZG93LnBhdHRlcm47XG5kZWxldGUgd2luZG93LnBhdHRlcm47XG5cbnJlc3VsdF90eXBlcyA9IFtcInN0eWxlXCIsIFwic2NyaXB0XCJdO1xuXG5maW5kX3ZhcmlhdGlvbiA9IGZ1bmN0aW9uIChjb21wb25lbnQsIHN5bWJvbCkge1xuICB2YXIgdmFyaWF0aW9uO1xuXG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9nZXRJdGVyYXRvcigoY29tcG9uZW50LnN0YXRlIHx8IFtdKS5jb25jYXQoY29tcG9uZW50LnZhcmlhbnQgfHwgW10pKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgdmFyaWF0aW9uID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgIGlmIChzeW1ib2wuaW5jbHVkZSh2YXJpYXRpb24ubmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIHZhcmlhdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICBfaXRlcmF0b3JbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuUGF0dGVybiA9IHtcbiAgZmluZDogZnVuY3Rpb24gZmluZChzeW1ib2wpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gICAgdmFyIHJlc3VsdF90eXBlLCByZXN1bHQsIHZhcmlhdGlvbiwgc3ViY29tcG9uZW50O1xuXG4gICAgaWYgKCFwYXR0ZXJuKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3ltYm9sID0gc3ltYm9sLnNwbGl0KC9cXHMrLyk7XG5cbiAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBfZ2V0SXRlcmF0b3IocmVzdWx0X3R5cGVzKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgIHJlc3VsdF90eXBlID0gX3N0ZXAyLnZhbHVlO1xuICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO1xuICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7XG4gICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gX2dldEl0ZXJhdG9yKHBhdHRlcm5bcmVzdWx0X3R5cGVdKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBfc3RlcDMudmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChzeW1ib2wuaW5jbHVkZShyZXN1bHQubmFtZSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2VhcmNoX3ZhcmlhdGlvbnMgfHwgb3B0aW9ucy5zZWFyY2hfYWxsKSB7XG4gICAgICAgICAgICAgIHZhcmlhdGlvbiA9IGZpbmRfdmFyaWF0aW9uKHJlc3VsdCwgc3ltYm9sKTtcbiAgICAgICAgICAgICAgaWYgKHZhcmlhdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YXJpYXRpb247XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2VhcmNoX3N1YmNvbXBvbmVudHMgfHwgb3B0aW9ucy5zZWFyY2hfYWxsKSB7XG4gICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWU7XG4gICAgICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yNCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjQgPSBfZ2V0SXRlcmF0b3IocmVzdWx0LnN1YmNvbXBvbmVudCB8fCBbXSksIF9zdGVwNDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IChfc3RlcDQgPSBfaXRlcmF0b3I0Lm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgc3ViY29tcG9uZW50ID0gX3N0ZXA0LnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoc3ltYm9sLmluY2x1ZGUoc3ViY29tcG9uZW50Lm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHZhcmlhdGlvbiA9IGZpbmRfdmFyaWF0aW9uKHJlc3VsdCwgc3ltYm9sKTtcbiAgICAgICAgICAgICAgICAgIGlmICh2YXJpYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhcmlhdGlvbjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yNCA9IHRydWU7XG4gICAgICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3I0ID0gZXJyO1xuICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ICYmIF9pdGVyYXRvcjRbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yNFtcInJldHVyblwiXSgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yMyA9IHRydWU7XG4gICAgICAgICAgX2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjNbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAgICAgX2l0ZXJhdG9yM1tcInJldHVyblwiXSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IzKSB7XG4gICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMltcInJldHVyblwiXSkge1xuICAgICAgICAgIF9pdGVyYXRvcjJbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICBfX3BhdHRlcm5fXzogcGF0dGVyblxufTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBQYXR0ZXJuO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxufSx7XCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCI6NDJ9XSwzMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0XCIpW1wiZGVmYXVsdFwiXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVZlbmRvclF1ZXJ5X3N0cmluZyA9IHJlcXVpcmUoXCIvVXNlcnMvY2hyaXMvRHJvcGJveCAoUGVyc29uYWwpL0NocmlzL0NvZGUvd2ViL2RvY2tzL2RvY2tzL2Fzc2V0cy9zb3VyY2UvdmVuZG9yL3F1ZXJ5X3N0cmluZ1wiKTtcblxudmFyIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVZlbmRvclF1ZXJ5X3N0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVZlbmRvclF1ZXJ5X3N0cmluZyk7XG5cbnZhciBRdWVyeVN0cmluZywgbG9jYXRpb24sIHF1ZXJ5O1xuXG5sb2NhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbjtcbn07XG5xdWVyeSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVZlbmRvclF1ZXJ5X3N0cmluZzJbXCJkZWZhdWx0XCJdLnBhcnNlKGxvY2F0aW9uKCkuc2VhcmNoKTtcbn07XG5cblF1ZXJ5U3RyaW5nID0ge1xuICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICByZXR1cm4gcXVlcnkoKVtrZXldO1xuICB9LFxuXG4gIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcbiAgICB2YXIgY3VycmVudF9xdWVyeSA9IHF1ZXJ5KCksXG4gICAgICAgIG5ld191cmw7XG5cbiAgICBjdXJyZW50X3F1ZXJ5W2tleV0gPSB2YWx1ZTtcbiAgICBuZXdfdXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0ICsgbG9jYXRpb24ucGF0aG5hbWUgKyBcIj9cIiArIF9Vc2Vyc0NocmlzRHJvcGJveFBlcnNvbmFsQ2hyaXNDb2RlV2ViRG9ja3NEb2Nrc0Fzc2V0c1NvdXJjZVZlbmRvclF1ZXJ5X3N0cmluZzJbXCJkZWZhdWx0XCJdLnN0cmluZ2lmeShxdWVyeSk7XG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHsgcGF0aDogbmV3X3VybCB9LCBkb2N1bWVudC50aXRsZSwgbmV3X3VybCk7XG4gICAgcmV0dXJuIGN1cnJlbnRfcXVlcnk7XG4gIH1cbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gUXVlcnlTdHJpbmc7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG59LHtcIi9Vc2Vycy9jaHJpcy9Ecm9wYm94IChQZXJzb25hbCkvQ2hyaXMvQ29kZS93ZWIvZG9ja3MvZG9ja3MvYXNzZXRzL3NvdXJjZS92ZW5kb3IvcXVlcnlfc3RyaW5nXCI6NDAsXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIjo1NH1dLDM0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX211c3RhY2hlID0gcmVxdWlyZShcIm11c3RhY2hlXCIpO1xuXG52YXIgX211c3RhY2hlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX211c3RhY2hlKTtcblxudmFyIFRlbXBsYXRlID0ge1xuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcih0ZW1wbGF0ZSwgYmluZGluZykge1xuICAgIGlmICh0ZW1wbGF0ZS5pbm5lckhUTUwpIHtcbiAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUuaW5uZXJIVE1MO1xuICAgIH1cbiAgICBfbXVzdGFjaGUyW1wiZGVmYXVsdFwiXS5yZW5kZXIodGVtcGxhdGUsIGJpbmRpbmcpO1xuICB9XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFRlbXBsYXRlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxufSx7XCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHRcIjo1NCxcIm11c3RhY2hlXCI6MTMxfV0sMzU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgVGV4dFJhbmdlLCBfc2VsZWN0X2FsbDtcblxuVGV4dFJhbmdlID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICByZXR1cm4ge1xuICAgIHNlbGVjdF9hbGw6IGZ1bmN0aW9uIHNlbGVjdF9hbGwoKSB7XG4gICAgICBfc2VsZWN0X2FsbCh0YXJnZXQpO1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gVGV4dFJhbmdlO1xuXG5fc2VsZWN0X2FsbCA9IChmdW5jdGlvbiAoKSB7XG4gIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIHZhciBzZWxlY3Rpb24sIHJhbmdlO1xuXG4gICAgICBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG5cbiAgICAgIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh0YXJnZXQpO1xuICAgICAgc2VsZWN0aW9uLmFkZFJhbmdlKHJhbmdlKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5ib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgcmFuZ2UubW92ZVRvRWxlbWVudFRleHQodGFyZ2V0KTtcbiAgICAgIHJhbmdlLnNlbGVjdCgpO1xuICAgIH07XG4gIH1cbn0pKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG59LHt9XSwzNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyBUT0RPXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0aWVzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXNcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX1Byb21pc2UgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2VcIilbXCJkZWZhdWx0XCJdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIERSQUdfVEhSRVNIT0xEID0gNTtcblxudmFyIFVJRXZlbnRzLCBjb29yZGluYXRlcztcblxuY29vcmRpbmF0ZXMgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgdmFyIHRvdWNoZXMgPSBldmVudC50b3VjaGVzO1xuXG4gIHJldHVybiB7XG4gICAgeDogdG91Y2hlcyA/IHRvdWNoZXNbMF0ueCA6IGV2ZW50LnBhZ2VYLFxuICAgIHk6IHRvdWNoZXMgPyB0b3VjaGVzWzBdLnkgOiBldmVudC5wYWdlWVxuICB9O1xufTtcblxuY29vcmRpbmF0ZXMuZGlzdGFuY2VfYmV0d2VlbiA9IGZ1bmN0aW9uIChiZWZvcmUsIGFmdGVyKSB7XG4gIHZhciBkZWx0YV94ID0gTWF0aC5hYnMoYWZ0ZXIueCAtIGJlZm9yZS54KSxcbiAgICAgIGRlbHRhX3kgPSBNYXRoLmFicyhhZnRlci55IC0gYmVmb3JlLnkpO1xuXG4gIHJldHVybiBNYXRoLnNxcnQoZGVsdGFfeCAqIGRlbHRhX3ggKyBkZWx0YV95ICogZGVsdGFfeSk7XG59O1xuXG5VSUV2ZW50cyA9IF9PYmplY3QkZGVmaW5lUHJvcGVydGllcyh7XG5cbiAgZHJhZzogX09iamVjdCRkZWZpbmVQcm9wZXJ0aWVzKHt9LCB7XG4gICAgc3RhcnQ6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gXCJtb3VzZWRvd25cIjtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBtb3ZlOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIFwibW91c2Vtb3ZlXCI7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgZW5kOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIFwibW91c2V1cFwiO1xuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9XG4gIH0pLFxuXG4gIHRyYW5zaXRpb246IGZ1bmN0aW9uIHRyYW5zaXRpb24obm9kZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBfUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgdmFyIHRyYW5zaXRpb25fZW5kID0gX3RoaXMudHJhbnNpdGlvbl9lbmQ7XG5cbiAgICAgIGlmICh0cmFuc2l0aW9uX2VuZCkge1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIodHJhbnNpdGlvbl9lbmQsIHJlc29sdmUpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGFkZF9kcmFnX2xpc3RlbmVyczogZnVuY3Rpb24gYWRkX2RyYWdfbGlzdGVuZXJzKG1vdmVfaGFuZGxlciwgZW5kX2hhbmRsZXIpIHtcbiAgICB2YXIgX2RyYWcgPSB0aGlzLmRyYWc7XG4gICAgdmFyIG1vdmUgPSBfZHJhZy5tb3ZlO1xuICAgIHZhciBlbmQgPSBfZHJhZy5lbmQ7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKG1vdmUsIG1vdmVfaGFuZGxlcik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihlbmQsIGVuZF9oYW5kbGVyKTtcblxuICAgIHJldHVybiB7XG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihtb3ZlLCBtb3ZlX2hhbmRsZXIpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGVuZCwgZW5kX2hhbmRsZXIpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzLFxuICBEUkFHX1RIUkVTSE9MRDogRFJBR19USFJFU0hPTERcbn0sIHtcbiAgdHJhbnNpdGlvbl9lbmQ6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciB0cmFuc2l0aW9ucywgdHJhbnNpdGlvbiwgZWxlbWVudCwgZXZlbnRfbmFtZTtcblxuICAgICAgdHJhbnNpdGlvbnMgPSB7XG4gICAgICAgIFdlYmtpdFRyYW5zaXRpb246IFwid2Via2l0VHJhbnNpdGlvbkVuZFwiLFxuICAgICAgICBNb3pUcmFuc2l0aW9uOiBcInRyYW5zaXRpb25lbmRcIixcbiAgICAgICAgT1RyYW5zaXRpb246IFwib3RyYW5zaXRpb25lbmRcIixcbiAgICAgICAgdHJhbnNpdGlvbjogXCJ0cmFuc2l0aW9uZW5kXCJcbiAgICAgIH07XG5cbiAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZXZlbnRfbmFtZSA9IG51bGw7XG5cbiAgICAgIGZvciAodHJhbnNpdGlvbiBpbiB0cmFuc2l0aW9ucykge1xuICAgICAgICBpZiAoZWxlbWVudC5zdHlsZVt0cmFuc2l0aW9uXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZXZlbnRfbmFtZSA9IHRyYW5zaXRpb25zW3RyYW5zaXRpb25dO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUV2ZW50cywgXCJ0cmFuc2l0aW9uX2VuZFwiLCB7IHZhbHVlOiBldmVudF9uYW1lIH0pO1xuICAgICAgcmV0dXJuIGV2ZW50X25hbWU7XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxuICB9XG59KTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBVSUV2ZW50cztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbn0se1wiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydGllc1wiOjQ2LFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2VcIjo0OX1dLDM3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuaWYgKCFbXS5pbmNsdWRlcykge1xuICBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiAoc2VhcmNoRWxlbWVudCAvKiwgZnJvbUluZGV4Ki8pIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIE8gPSBPYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbiA9IHBhcnNlSW50KE8ubGVuZ3RoKSB8fCAwO1xuICAgIGlmIChsZW4gPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIG4gPSBwYXJzZUludChhcmd1bWVudHNbMV0pIHx8IDA7XG4gICAgdmFyIGs7XG4gICAgaWYgKG4gPj0gMCkge1xuICAgICAgayA9IG47XG4gICAgfSBlbHNlIHtcbiAgICAgIGsgPSBsZW4gKyBuO1xuICAgICAgaWYgKGsgPCAwKSB7XG4gICAgICAgIGsgPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgY3VycmVudEVsZW1lbnQ7XG4gICAgd2hpbGUgKGsgPCBsZW4pIHtcbiAgICAgIGN1cnJlbnRFbGVtZW50ID0gT1trXTtcbiAgICAgIGlmIChzZWFyY2hFbGVtZW50ID09PSBjdXJyZW50RWxlbWVudCB8fCBzZWFyY2hFbGVtZW50ICE9PSBzZWFyY2hFbGVtZW50ICYmIGN1cnJlbnRFbGVtZW50ICE9PSBjdXJyZW50RWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGsrKztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xufVxuXG59LHt9XSwzODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9PYmplY3Qka2V5cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXNcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX09iamVjdCRjcmVhdGUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGVcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgaGxqcztcblxuIShmdW5jdGlvbiAoZSkge1xuICAgIGhsanMgPSBlKHt9KTtcbn0pKGZ1bmN0aW9uIChlKSB7XG4gICAgZnVuY3Rpb24gbihlKSB7XG4gICAgICAgIHJldHVybiBlLnJlcGxhY2UoLyYvZ20sIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nbSwgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZ20sIFwiJmd0O1wiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0KGUpIHtcbiAgICAgICAgcmV0dXJuIGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByKGUsIG4pIHtcbiAgICAgICAgdmFyIHQgPSBlICYmIGUuZXhlYyhuKTtcbiAgICAgICAgcmV0dXJuIHQgJiYgMCA9PSB0LmluZGV4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGEoZSkge1xuICAgICAgICB2YXIgbiA9IChlLmNsYXNzTmFtZSArIFwiIFwiICsgKGUucGFyZW50Tm9kZSA/IGUucGFyZW50Tm9kZS5jbGFzc05hbWUgOiBcIlwiKSkuc3BsaXQoL1xccysvKTtcbiAgICAgICAgcmV0dXJuIChuID0gbi5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlLnJlcGxhY2UoL15sYW5nKHVhZ2UpPy0vLCBcIlwiKTtcbiAgICAgICAgfSksIG4uZmlsdGVyKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gTihlKSB8fCAvbm8oLT8paGlnaGxpZ2h0Ly50ZXN0KGUpO1xuICAgICAgICB9KVswXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbyhlLCBuKSB7XG4gICAgICAgIHZhciB0ID0ge307XG4gICAgICAgIGZvciAodmFyIHIgaW4gZSkgdFtyXSA9IGVbcl07XG4gICAgICAgIGlmIChuKSBmb3IgKHZhciByIGluIG4pIHRbcl0gPSBuW3JdO1xuICAgICAgICByZXR1cm4gdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpKGUpIHtcbiAgICAgICAgdmFyIG4gPSBbXTtcbiAgICAgICAgcmV0dXJuICgoZnVuY3Rpb24gcihlLCBhKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBvID0gZS5maXJzdENoaWxkOyBvOyBvID0gby5uZXh0U2libGluZykgMyA9PSBvLm5vZGVUeXBlID8gYSArPSBvLm5vZGVWYWx1ZS5sZW5ndGggOiAxID09IG8ubm9kZVR5cGUgJiYgKG4ucHVzaCh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6IFwic3RhcnRcIixcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IGEsXG4gICAgICAgICAgICAgICAgbm9kZTogb1xuICAgICAgICAgICAgfSksIGEgPSByKG8sIGEpLCB0KG8pLm1hdGNoKC9icnxocnxpbWd8aW5wdXQvKSB8fCBuLnB1c2goe1xuICAgICAgICAgICAgICAgIGV2ZW50OiBcInN0b3BcIixcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IGEsXG4gICAgICAgICAgICAgICAgbm9kZTogb1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH0pKGUsIDApLCBuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjKGUsIHIsIGEpIHtcbiAgICAgICAgZnVuY3Rpb24gbygpIHtcbiAgICAgICAgICAgIHJldHVybiBlLmxlbmd0aCAmJiByLmxlbmd0aCA/IGVbMF0ub2Zmc2V0ICE9IHJbMF0ub2Zmc2V0ID8gZVswXS5vZmZzZXQgPCByWzBdLm9mZnNldCA/IGUgOiByIDogXCJzdGFydFwiID09IHJbMF0uZXZlbnQgPyBlIDogciA6IGUubGVuZ3RoID8gZSA6IHI7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpKGUpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHIoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIiBcIiArIGUubm9kZU5hbWUgKyAnPVwiJyArIG4oZS52YWx1ZSkgKyAnXCInO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbCArPSBcIjxcIiArIHQoZSkgKyBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoZS5hdHRyaWJ1dGVzLCByKS5qb2luKFwiXCIpICsgXCI+XCI7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjKGUpIHtcbiAgICAgICAgICAgIGwgKz0gXCI8L1wiICsgdChlKSArIFwiPlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdShlKSB7XG4gICAgICAgICAgICAoXCJzdGFydFwiID09IGUuZXZlbnQgPyBpIDogYykoZS5ub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBzID0gMCwgbCA9IFwiXCIsIGYgPSBbXTsgZS5sZW5ndGggfHwgci5sZW5ndGg7KSB7XG4gICAgICAgICAgICB2YXIgZyA9IG8oKTtcbiAgICAgICAgICAgIGlmICgobCArPSBuKGEuc3Vic3RyKHMsIGdbMF0ub2Zmc2V0IC0gcykpLCBzID0gZ1swXS5vZmZzZXQsIGcgPT0gZSkpIHtcbiAgICAgICAgICAgICAgICBmLnJldmVyc2UoKS5mb3JFYWNoKGMpO1xuICAgICAgICAgICAgICAgIGRvIHUoZy5zcGxpY2UoMCwgMSlbMF0pLCBnID0gbygpOyB3aGlsZSAoZyA9PSBlICYmIGcubGVuZ3RoICYmIGdbMF0ub2Zmc2V0ID09IHMpO1xuICAgICAgICAgICAgICAgIGYucmV2ZXJzZSgpLmZvckVhY2goaSk7XG4gICAgICAgICAgICB9IGVsc2UgXCJzdGFydFwiID09IGdbMF0uZXZlbnQgPyBmLnB1c2goZ1swXS5ub2RlKSA6IGYucG9wKCksIHUoZy5zcGxpY2UoMCwgMSlbMF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsICsgbihhLnN1YnN0cihzKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdShlKSB7XG4gICAgICAgIGZ1bmN0aW9uIG4oZSkge1xuICAgICAgICAgICAgcmV0dXJuIGUgJiYgZS5zb3VyY2UgfHwgZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHQodCwgcikge1xuICAgICAgICAgICAgcmV0dXJuIFJlZ0V4cChuKHQpLCBcIm1cIiArIChlLmNJID8gXCJpXCIgOiBcIlwiKSArIChyID8gXCJnXCIgOiBcIlwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByKGEsIGkpIHtcbiAgICAgICAgICAgIGlmICghYS5jb21waWxlZCkge1xuICAgICAgICAgICAgICAgIGlmICgoYS5jb21waWxlZCA9ICEwLCBhLmsgPSBhLmsgfHwgYS5iSywgYS5rKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdSA9IGZ1bmN0aW9uIHUobiwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5jSSAmJiAodCA9IHQudG9Mb3dlckNhc2UoKSksIHQuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGUuc3BsaXQoXCJ8XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNbdFswXV0gPSBbbiwgdFsxXSA/IE51bWJlcih0WzFdKSA6IDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIFwic3RyaW5nXCIgPT0gdHlwZW9mIGEuayA/IHUoXCJrZXl3b3JkXCIsIGEuaykgOiBfT2JqZWN0JGtleXMoYS5rKS5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1KGUsIGEua1tlXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pLCBhLmsgPSBjO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhLmxSID0gdChhLmwgfHwgL1xcYltBLVphLXowLTlfXStcXGIvLCAhMCksIGkgJiYgKGEuYksgJiYgKGEuYiA9IFwiXFxcXGIoXCIgKyBhLmJLLnNwbGl0KFwiIFwiKS5qb2luKFwifFwiKSArIFwiKVxcXFxiXCIpLCBhLmIgfHwgKGEuYiA9IC9cXEJ8XFxiLyksIGEuYlIgPSB0KGEuYiksIGEuZSB8fCBhLmVXIHx8IChhLmUgPSAvXFxCfFxcYi8pLCBhLmUgJiYgKGEuZVIgPSB0KGEuZSkpLCBhLnRFID0gbihhLmUpIHx8IFwiXCIsIGEuZVcgJiYgaS50RSAmJiAoYS50RSArPSAoYS5lID8gXCJ8XCIgOiBcIlwiKSArIGkudEUpKSwgYS5pICYmIChhLmlSID0gdChhLmkpKSwgdm9pZCAwID09PSBhLnIgJiYgKGEuciA9IDEpLCBhLmMgfHwgKGEuYyA9IFtdKTtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IFtdO1xuICAgICAgICAgICAgICAgIGEuYy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUudiA/IGUudi5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnB1c2gobyhlLCBuKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pIDogcy5wdXNoKFwic2VsZlwiID09IGUgPyBhIDogZSk7XG4gICAgICAgICAgICAgICAgfSksIGEuYyA9IHMsIGEuYy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHIoZSwgYSk7XG4gICAgICAgICAgICAgICAgfSksIGEuc3RhcnRzICYmIHIoYS5zdGFydHMsIGkpO1xuICAgICAgICAgICAgICAgIHZhciBsID0gYS5jLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5iSyA/IFwiXFxcXC4/KFwiICsgZS5iICsgXCIpXFxcXC4/XCIgOiBlLmI7XG4gICAgICAgICAgICAgICAgfSkuY29uY2F0KFthLnRFLCBhLmldKS5tYXAobikuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICAgICAgICAgIGEudCA9IGwubGVuZ3RoID8gdChsLmpvaW4oXCJ8XCIpLCAhMCkgOiB7XG4gICAgICAgICAgICAgICAgICAgIGV4ZWM6IGZ1bmN0aW9uIGV4ZWMoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcihlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzKGUsIHQsIGEsIG8pIHtcbiAgICAgICAgZnVuY3Rpb24gaShlLCBuKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IG4uYy5sZW5ndGg7IHQrKykgaWYgKHIobi5jW3RdLmJSLCBlKSkgcmV0dXJuIG4uY1t0XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGMoX3gsIF94Mikge1xuICAgICAgICAgICAgdmFyIF9hZ2FpbiA9IHRydWU7XG5cbiAgICAgICAgICAgIF9mdW5jdGlvbjogd2hpbGUgKF9hZ2Fpbikge1xuICAgICAgICAgICAgICAgIHZhciBlID0gX3gsXG4gICAgICAgICAgICAgICAgICAgIG4gPSBfeDI7XG4gICAgICAgICAgICAgICAgX2FnYWluID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHIoZS5lUiwgbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuZVcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF94ID0gZS5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBfeDIgPSBuO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2FnYWluID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIF9mdW5jdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBmKGUsIG4pIHtcbiAgICAgICAgICAgIHJldHVybiAhYSAmJiByKG4uaVIsIGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZyhlLCBuKSB7XG4gICAgICAgICAgICB2YXIgdCA9IHguY0kgPyBuWzBdLnRvTG93ZXJDYXNlKCkgOiBuWzBdO1xuICAgICAgICAgICAgcmV0dXJuIGUuay5oYXNPd25Qcm9wZXJ0eSh0KSAmJiBlLmtbdF07XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwKGUsIG4sIHQsIHIpIHtcbiAgICAgICAgICAgIHZhciBhID0gciA/IFwiXCIgOiBFLmNsYXNzUHJlZml4LFxuICAgICAgICAgICAgICAgIG8gPSAnPHNwYW4gY2xhc3M9XCInICsgYSxcbiAgICAgICAgICAgICAgICBpID0gdCA/IFwiXCIgOiBcIjwvc3Bhbj5cIjtcbiAgICAgICAgICAgIHJldHVybiAobyArPSBlICsgJ1wiPicsIG8gKyBuICsgaSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkKCkge1xuICAgICAgICAgICAgaWYgKCF3LmspIHJldHVybiBuKHkpO1xuICAgICAgICAgICAgdmFyIGUgPSBcIlwiLFxuICAgICAgICAgICAgICAgIHQgPSAwO1xuICAgICAgICAgICAgdy5sUi5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgciA9IHcubFIuZXhlYyh5KTsgcjspIHtcbiAgICAgICAgICAgICAgICBlICs9IG4oeS5zdWJzdHIodCwgci5pbmRleCAtIHQpKTtcbiAgICAgICAgICAgICAgICB2YXIgYSA9IGcodywgcik7XG4gICAgICAgICAgICAgICAgYSA/IChCICs9IGFbMV0sIGUgKz0gcChhWzBdLCBuKHJbMF0pKSkgOiBlICs9IG4oclswXSksIHQgPSB3LmxSLmxhc3RJbmRleCwgciA9IHcubFIuZXhlYyh5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBlICsgbih5LnN1YnN0cih0KSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBoKCkge1xuICAgICAgICAgICAgaWYgKHcuc0wgJiYgIVJbdy5zTF0pIHJldHVybiBuKHkpO1xuICAgICAgICAgICAgdmFyIGUgPSB3LnNMID8gcyh3LnNMLCB5LCAhMCwgTFt3LnNMXSkgOiBsKHkpO1xuICAgICAgICAgICAgcmV0dXJuICh3LnIgPiAwICYmIChCICs9IGUuciksIFwiY29udGludW91c1wiID09IHcuc3ViTGFuZ3VhZ2VNb2RlICYmIChMW3cuc0xdID0gZS50b3ApLCBwKGUubGFuZ3VhZ2UsIGUudmFsdWUsICExLCAhMCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdigpIHtcbiAgICAgICAgICAgIHJldHVybiB2b2lkIDAgIT09IHcuc0wgPyBoKCkgOiBkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBiKGUsIHQpIHtcbiAgICAgICAgICAgIHZhciByID0gZS5jTiA/IHAoZS5jTiwgXCJcIiwgITApIDogXCJcIjtcbiAgICAgICAgICAgIGUuckIgPyAoTSArPSByLCB5ID0gXCJcIikgOiBlLmVCID8gKE0gKz0gbih0KSArIHIsIHkgPSBcIlwiKSA6IChNICs9IHIsIHkgPSB0KSwgdyA9IF9PYmplY3QkY3JlYXRlKGUsIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG0oZSwgdCkge1xuICAgICAgICAgICAgaWYgKCh5ICs9IGUsIHZvaWQgMCA9PT0gdCkpIHJldHVybiAoTSArPSB2KCksIDApO1xuICAgICAgICAgICAgdmFyIHIgPSBpKHQsIHcpO1xuICAgICAgICAgICAgaWYgKHIpIHJldHVybiAoTSArPSB2KCksIGIociwgdCksIHIuckIgPyAwIDogdC5sZW5ndGgpO1xuICAgICAgICAgICAgdmFyIGEgPSBjKHcsIHQpO1xuICAgICAgICAgICAgaWYgKGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgbyA9IHc7XG4gICAgICAgICAgICAgICAgby5yRSB8fCBvLmVFIHx8ICh5ICs9IHQpLCBNICs9IHYoKTtcbiAgICAgICAgICAgICAgICBkbyB3LmNOICYmIChNICs9IFwiPC9zcGFuPlwiKSwgQiArPSB3LnIsIHcgPSB3LnBhcmVudDsgd2hpbGUgKHcgIT0gYS5wYXJlbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoby5lRSAmJiAoTSArPSBuKHQpKSwgeSA9IFwiXCIsIGEuc3RhcnRzICYmIGIoYS5zdGFydHMsIFwiXCIpLCBvLnJFID8gMCA6IHQubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmKHQsIHcpKSB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgbGV4ZW1lIFwiJyArIHQgKyAnXCIgZm9yIG1vZGUgXCInICsgKHcuY04gfHwgXCI8dW5uYW1lZD5cIikgKyAnXCInKTtcbiAgICAgICAgICAgIHJldHVybiAoeSArPSB0LCB0Lmxlbmd0aCB8fCAxKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgeCA9IE4oZSk7XG4gICAgICAgIGlmICgheCkgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGxhbmd1YWdlOiBcIicgKyBlICsgJ1wiJyk7XG4gICAgICAgIHUoeCk7XG4gICAgICAgIGZvciAodmFyIHcgPSBvIHx8IHgsIEwgPSB7fSwgTSA9IFwiXCIsIGsgPSB3OyBrICE9IHg7IGsgPSBrLnBhcmVudCkgay5jTiAmJiAoTSA9IHAoay5jTiwgXCJcIiwgITApICsgTSk7XG4gICAgICAgIHZhciB5ID0gXCJcIixcbiAgICAgICAgICAgIEIgPSAwO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgQywgaiwgSSA9IDA7Oykge1xuICAgICAgICAgICAgICAgIGlmICgody50Lmxhc3RJbmRleCA9IEksIEMgPSB3LnQuZXhlYyh0KSwgIUMpKSBicmVhaztcbiAgICAgICAgICAgICAgICBqID0gbSh0LnN1YnN0cihJLCBDLmluZGV4IC0gSSksIENbMF0pLCBJID0gQy5pbmRleCArIGo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtKHQuc3Vic3RyKEkpKTtcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSB3OyBrLnBhcmVudDsgayA9IGsucGFyZW50KSBrLmNOICYmIChNICs9IFwiPC9zcGFuPlwiKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogQixcbiAgICAgICAgICAgICAgICB2YWx1ZTogTSxcbiAgICAgICAgICAgICAgICBsYW5ndWFnZTogZSxcbiAgICAgICAgICAgICAgICB0b3A6IHdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gY2F0Y2ggKEEpIHtcbiAgICAgICAgICAgIGlmICgtMSAhPSBBLm1lc3NhZ2UuaW5kZXhPZihcIklsbGVnYWxcIikpIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogMCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbih0KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRocm93IEE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsKGUsIHQpIHtcbiAgICAgICAgdCA9IHQgfHwgRS5sYW5ndWFnZXMgfHwgX09iamVjdCRrZXlzKFIpO1xuICAgICAgICB2YXIgciA9IHtcbiAgICAgICAgICAgIHI6IDAsXG4gICAgICAgICAgICB2YWx1ZTogbihlKVxuICAgICAgICB9LFxuICAgICAgICAgICAgYSA9IHI7XG4gICAgICAgIHJldHVybiAodC5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICBpZiAoTihuKSkge1xuICAgICAgICAgICAgICAgIHZhciB0ID0gcyhuLCBlLCAhMSk7XG4gICAgICAgICAgICAgICAgdC5sYW5ndWFnZSA9IG4sIHQuciA+IGEuciAmJiAoYSA9IHQpLCB0LnIgPiByLnIgJiYgKGEgPSByLCByID0gdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCBhLmxhbmd1YWdlICYmIChyLnNlY29uZF9iZXN0ID0gYSksIHIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGYoZSkge1xuICAgICAgICByZXR1cm4gKEUudGFiUmVwbGFjZSAmJiAoZSA9IGUucmVwbGFjZSgvXigoPFtePl0rPnxcXHQpKykvZ20sIGZ1bmN0aW9uIChlLCBuKSB7XG4gICAgICAgICAgICByZXR1cm4gbi5yZXBsYWNlKC9cXHQvZywgRS50YWJSZXBsYWNlKTtcbiAgICAgICAgfSkpLCBFLnVzZUJSICYmIChlID0gZS5yZXBsYWNlKC9cXG4vZywgXCI8YnI+XCIpKSwgZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZyhlLCBuLCB0KSB7XG4gICAgICAgIHZhciByID0gbiA/IHhbbl0gOiB0LFxuICAgICAgICAgICAgYSA9IFtlLnRyaW0oKV07XG4gICAgICAgIHJldHVybiAoZS5tYXRjaCgvKFxcc3xeKWhsanMoXFxzfCQpLykgfHwgYS5wdXNoKFwiaGxqc1wiKSwgciAmJiBhLnB1c2gociksIGEuam9pbihcIiBcIikudHJpbSgpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwKGUpIHtcbiAgICAgICAgdmFyIG4gPSBhKGUpO1xuICAgICAgICBpZiAoIS9ubygtPyloaWdobGlnaHQvLnRlc3QobikpIHtcbiAgICAgICAgICAgIHZhciB0O1xuICAgICAgICAgICAgRS51c2VCUiA/ICh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiLCBcImRpdlwiKSwgdC5pbm5lckhUTUwgPSBlLmlubmVySFRNTC5yZXBsYWNlKC9cXG4vZywgXCJcIikucmVwbGFjZSgvPGJyWyBcXC9dKj4vZywgXCJcXG5cIikpIDogdCA9IGU7XG4gICAgICAgICAgICB2YXIgciA9IHQudGV4dENvbnRlbnQsXG4gICAgICAgICAgICAgICAgbyA9IG4gPyBzKG4sIHIsICEwKSA6IGwociksXG4gICAgICAgICAgICAgICAgdSA9IGkodCk7XG4gICAgICAgICAgICBpZiAodS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiwgXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgcC5pbm5lckhUTUwgPSBvLnZhbHVlLCBvLnZhbHVlID0gYyh1LCBpKHApLCByKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG8udmFsdWUgPSBmKG8udmFsdWUpLCBlLmlubmVySFRNTCA9IG8udmFsdWUsIGUuY2xhc3NOYW1lID0gZyhlLmNsYXNzTmFtZSwgbiwgby5sYW5ndWFnZSksIGUucmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIGxhbmd1YWdlOiBvLmxhbmd1YWdlLFxuICAgICAgICAgICAgICAgIHJlOiBvLnJcbiAgICAgICAgICAgIH0sIG8uc2Vjb25kX2Jlc3QgJiYgKGUuc2Vjb25kX2Jlc3QgPSB7XG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IG8uc2Vjb25kX2Jlc3QubGFuZ3VhZ2UsXG4gICAgICAgICAgICAgICAgcmU6IG8uc2Vjb25kX2Jlc3QuclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkKGUpIHtcbiAgICAgICAgRSA9IG8oRSwgZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaCgpIHtcbiAgICAgICAgaWYgKCFoLmNhbGxlZCkge1xuICAgICAgICAgICAgaC5jYWxsZWQgPSAhMDtcbiAgICAgICAgICAgIHZhciBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInByZSBjb2RlXCIpO1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlLCBwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHYoKSB7XG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGgsICExKSwgYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgaCwgITEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGIobiwgdCkge1xuICAgICAgICB2YXIgciA9IFJbbl0gPSB0KGUpO1xuICAgICAgICByLmFsaWFzZXMgJiYgci5hbGlhc2VzLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHhbZV0gPSBuO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtKCkge1xuICAgICAgICByZXR1cm4gX09iamVjdCRrZXlzKFIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIE4oZSkge1xuICAgICAgICByZXR1cm4gUltlXSB8fCBSW3hbZV1dO1xuICAgIH1cbiAgICB2YXIgRSA9IHtcbiAgICAgICAgY2xhc3NQcmVmaXg6IFwiaGxqcy1cIixcbiAgICAgICAgdGFiUmVwbGFjZTogbnVsbCxcbiAgICAgICAgdXNlQlI6ICExLFxuICAgICAgICBsYW5ndWFnZXM6IHZvaWQgMFxuICAgIH0sXG4gICAgICAgIFIgPSB7fSxcbiAgICAgICAgeCA9IHt9O1xuICAgIHJldHVybiAoZS5oaWdobGlnaHQgPSBzLCBlLmhpZ2hsaWdodEF1dG8gPSBsLCBlLmZpeE1hcmt1cCA9IGYsIGUuaGlnaGxpZ2h0QmxvY2sgPSBwLCBlLmNvbmZpZ3VyZSA9IGQsIGUuaW5pdEhpZ2hsaWdodGluZyA9IGgsIGUuaW5pdEhpZ2hsaWdodGluZ09uTG9hZCA9IHYsIGUucmVnaXN0ZXJMYW5ndWFnZSA9IGIsIGUubGlzdExhbmd1YWdlcyA9IG0sIGUuZ2V0TGFuZ3VhZ2UgPSBOLCBlLmluaGVyaXQgPSBvLCBlLklSID0gXCJbYS16QS1aXVthLXpBLVowLTlfXSpcIiwgZS5VSVIgPSBcIlthLXpBLVpfXVthLXpBLVowLTlfXSpcIiwgZS5OUiA9IFwiXFxcXGJcXFxcZCsoXFxcXC5cXFxcZCspP1wiLCBlLkNOUiA9IFwiKFxcXFxiMFt4WF1bYS1mQS1GMC05XSt8KFxcXFxiXFxcXGQrKFxcXFwuXFxcXGQqKT98XFxcXC5cXFxcZCspKFtlRV1bLStdP1xcXFxkKyk/KVwiLCBlLkJOUiA9IFwiXFxcXGIoMGJbMDFdKylcIiwgZS5SU1IgPSBcIiF8IT18IT09fCV8JT18JnwmJnwmPXxcXFxcKnxcXFxcKj18XFxcXCt8XFxcXCs9fCx8LXwtPXwvPXwvfDp8O3w8PHw8PD18PD18PHw9PT18PT18PXw+Pj49fD4+PXw+PXw+Pj58Pj58PnxcXFxcP3xcXFxcW3xcXFxce3xcXFxcKHxcXFxcXnxcXFxcXj18XFxcXHx8XFxcXHw9fFxcXFx8XFxcXHx8flwiLCBlLkJFID0ge1xuICAgICAgICBiOiBcIlxcXFxcXFxcW1xcXFxzXFxcXFNdXCIsXG4gICAgICAgIHI6IDBcbiAgICB9LCBlLkFTTSA9IHtcbiAgICAgICAgY046IFwic3RyaW5nXCIsXG4gICAgICAgIGI6IFwiJ1wiLFxuICAgICAgICBlOiBcIidcIixcbiAgICAgICAgaTogXCJcXFxcblwiLFxuICAgICAgICBjOiBbZS5CRV1cbiAgICB9LCBlLlFTTSA9IHtcbiAgICAgICAgY046IFwic3RyaW5nXCIsXG4gICAgICAgIGI6ICdcIicsXG4gICAgICAgIGU6ICdcIicsXG4gICAgICAgIGk6IFwiXFxcXG5cIixcbiAgICAgICAgYzogW2UuQkVdXG4gICAgfSwgZS5QV00gPSB7XG4gICAgICAgIGI6IC9cXGIoYXxhbnx0aGV8YXJlfEl8SSdtfGlzbid0fGRvbid0fGRvZXNuJ3R8d29uJ3R8YnV0fGp1c3R8c2hvdWxkfHByZXR0eXxzaW1wbHl8ZW5vdWdofGdvbm5hfGdvaW5nfHd0Znxzb3xzdWNoKVxcYi9cbiAgICB9LCBlLkNMQ00gPSB7XG4gICAgICAgIGNOOiBcImNvbW1lbnRcIixcbiAgICAgICAgYjogXCIvL1wiLFxuICAgICAgICBlOiBcIiRcIixcbiAgICAgICAgYzogW2UuUFdNXVxuICAgIH0sIGUuQ0JDTSA9IHtcbiAgICAgICAgY046IFwiY29tbWVudFwiLFxuICAgICAgICBiOiBcIi9cXFxcKlwiLFxuICAgICAgICBlOiBcIlxcXFwqL1wiLFxuICAgICAgICBjOiBbZS5QV01dXG4gICAgfSwgZS5IQ00gPSB7XG4gICAgICAgIGNOOiBcImNvbW1lbnRcIixcbiAgICAgICAgYjogXCIjXCIsXG4gICAgICAgIGU6IFwiJFwiLFxuICAgICAgICBjOiBbZS5QV01dXG4gICAgfSwgZS5OTSA9IHtcbiAgICAgICAgY046IFwibnVtYmVyXCIsXG4gICAgICAgIGI6IGUuTlIsXG4gICAgICAgIHI6IDBcbiAgICB9LCBlLkNOTSA9IHtcbiAgICAgICAgY046IFwibnVtYmVyXCIsXG4gICAgICAgIGI6IGUuQ05SLFxuICAgICAgICByOiAwXG4gICAgfSwgZS5CTk0gPSB7XG4gICAgICAgIGNOOiBcIm51bWJlclwiLFxuICAgICAgICBiOiBlLkJOUixcbiAgICAgICAgcjogMFxuICAgIH0sIGUuQ1NTTk0gPSB7XG4gICAgICAgIGNOOiBcIm51bWJlclwiLFxuICAgICAgICBiOiBlLk5SICsgXCIoJXxlbXxleHxjaHxyZW18dnd8dmh8dm1pbnx2bWF4fGNtfG1tfGlufHB0fHBjfHB4fGRlZ3xncmFkfHJhZHx0dXJufHN8bXN8SHp8a0h6fGRwaXxkcGNtfGRwcHgpP1wiLFxuICAgICAgICByOiAwXG4gICAgfSwgZS5STSA9IHtcbiAgICAgICAgY046IFwicmVnZXhwXCIsXG4gICAgICAgIGI6IC9cXC8vLFxuICAgICAgICBlOiAvXFwvW2dpbXV5XSovLFxuICAgICAgICBpOiAvXFxuLyxcbiAgICAgICAgYzogW2UuQkUsIHtcbiAgICAgICAgICAgIGI6IC9cXFsvLFxuICAgICAgICAgICAgZTogL1xcXS8sXG4gICAgICAgICAgICByOiAwLFxuICAgICAgICAgICAgYzogW2UuQkVdXG4gICAgICAgIH1dXG4gICAgfSwgZS5UTSA9IHtcbiAgICAgICAgY046IFwidGl0bGVcIixcbiAgICAgICAgYjogZS5JUixcbiAgICAgICAgcjogMFxuICAgIH0sIGUuVVRNID0ge1xuICAgICAgICBjTjogXCJ0aXRsZVwiLFxuICAgICAgICBiOiBlLlVJUixcbiAgICAgICAgcjogMFxuICAgIH0sIGUpO1xufSk7XG5cbmhsanMucmVnaXN0ZXJMYW5ndWFnZShcImNvZmZlZXNjcmlwdFwiLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBjID0ge1xuICAgICAgICBrZXl3b3JkOiBcImluIGlmIGZvciB3aGlsZSBmaW5hbGx5IG5ldyBkbyByZXR1cm4gZWxzZSBicmVhayBjYXRjaCBpbnN0YW5jZW9mIHRocm93IHRyeSB0aGlzIHN3aXRjaCBjb250aW51ZSB0eXBlb2YgZGVsZXRlIGRlYnVnZ2VyIHN1cGVyIHRoZW4gdW5sZXNzIHVudGlsIGxvb3Agb2YgYnkgd2hlbiBhbmQgb3IgaXMgaXNudCBub3RcIixcbiAgICAgICAgbGl0ZXJhbDogXCJ0cnVlIGZhbHNlIG51bGwgdW5kZWZpbmVkIHllcyBubyBvbiBvZmZcIixcbiAgICAgICAgcmVzZXJ2ZWQ6IFwiY2FzZSBkZWZhdWx0IGZ1bmN0aW9uIHZhciB2b2lkIHdpdGggY29uc3QgbGV0IGVudW0gZXhwb3J0IGltcG9ydCBuYXRpdmUgX19oYXNQcm9wIF9fZXh0ZW5kcyBfX3NsaWNlIF9fYmluZCBfX2luZGV4T2ZcIixcbiAgICAgICAgYnVpbHRfaW46IFwibnBtIHJlcXVpcmUgY29uc29sZSBwcmludCBtb2R1bGUgZ2xvYmFsIHdpbmRvdyBkb2N1bWVudFwiXG4gICAgfSxcbiAgICAgICAgbiA9IFwiW0EtWmEteiRfXVswLTlBLVphLXokX10qXCIsXG4gICAgICAgIHQgPSB7XG4gICAgICAgIGNOOiBcInN1YnN0XCIsXG4gICAgICAgIGI6IC8jXFx7LyxcbiAgICAgICAgZTogL30vLFxuICAgICAgICBrOiBjXG4gICAgfSxcbiAgICAgICAgciA9IFtlLkJOTSwgZS5pbmhlcml0KGUuQ05NLCB7XG4gICAgICAgIHN0YXJ0czoge1xuICAgICAgICAgICAgZTogXCIoXFxcXHMqLyk/XCIsXG4gICAgICAgICAgICByOiAwXG4gICAgICAgIH1cbiAgICB9KSwge1xuICAgICAgICBjTjogXCJzdHJpbmdcIixcbiAgICAgICAgdjogW3tcbiAgICAgICAgICAgIGI6IC8nJycvLFxuICAgICAgICAgICAgZTogLycnJy8sXG4gICAgICAgICAgICBjOiBbZS5CRV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYjogLycvLFxuICAgICAgICAgICAgZTogLycvLFxuICAgICAgICAgICAgYzogW2UuQkVdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGI6IC9cIlwiXCIvLFxuICAgICAgICAgICAgZTogL1wiXCJcIi8sXG4gICAgICAgICAgICBjOiBbZS5CRSwgdF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYjogL1wiLyxcbiAgICAgICAgICAgIGU6IC9cIi8sXG4gICAgICAgICAgICBjOiBbZS5CRSwgdF1cbiAgICAgICAgfV1cbiAgICB9LCB7XG4gICAgICAgIGNOOiBcInJlZ2V4cFwiLFxuICAgICAgICB2OiBbe1xuICAgICAgICAgICAgYjogXCIvLy9cIixcbiAgICAgICAgICAgIGU6IFwiLy8vXCIsXG4gICAgICAgICAgICBjOiBbdCwgZS5IQ01dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGI6IFwiLy9bZ2ltXSpcIixcbiAgICAgICAgICAgIHI6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYjogL1xcLyg/IVsgKl0pKFxcXFxcXC98LikqP1xcL1tnaW1dKig/PVxcV3wkKS9cbiAgICAgICAgfV1cbiAgICB9LCB7XG4gICAgICAgIGNOOiBcInByb3BlcnR5XCIsXG4gICAgICAgIGI6IFwiQFwiICsgblxuICAgIH0sIHtcbiAgICAgICAgYjogXCJgXCIsXG4gICAgICAgIGU6IFwiYFwiLFxuICAgICAgICBlQjogITAsXG4gICAgICAgIGVFOiAhMCxcbiAgICAgICAgc0w6IFwiamF2YXNjcmlwdFwiXG4gICAgfV07XG4gICAgdC5jID0gcjtcbiAgICB2YXIgaSA9IGUuaW5oZXJpdChlLlRNLCB7XG4gICAgICAgIGI6IG5cbiAgICB9KSxcbiAgICAgICAgcyA9IFwiKFxcXFwoLipcXFxcKSk/XFxcXHMqXFxcXEJbLT1dPlwiLFxuICAgICAgICBvID0ge1xuICAgICAgICBjTjogXCJwYXJhbXNcIixcbiAgICAgICAgYjogXCJcXFxcKFteXFxcXChdXCIsXG4gICAgICAgIHJCOiAhMCxcbiAgICAgICAgYzogW3tcbiAgICAgICAgICAgIGI6IC9cXCgvLFxuICAgICAgICAgICAgZTogL1xcKS8sXG4gICAgICAgICAgICBrOiBjLFxuICAgICAgICAgICAgYzogW1wic2VsZlwiXS5jb25jYXQocilcbiAgICAgICAgfV1cbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICAgIGFsaWFzZXM6IFtcImNvZmZlZVwiLCBcImNzb25cIiwgXCJpY2VkXCJdLFxuICAgICAgICBrOiBjLFxuICAgICAgICBpOiAvXFwvXFwqLyxcbiAgICAgICAgYzogci5jb25jYXQoW3tcbiAgICAgICAgICAgIGNOOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgIGI6IFwiIyMjXCIsXG4gICAgICAgICAgICBlOiBcIiMjI1wiLFxuICAgICAgICAgICAgYzogW2UuUFdNXVxuICAgICAgICB9LCBlLkhDTSwge1xuICAgICAgICAgICAgY046IFwiZnVuY3Rpb25cIixcbiAgICAgICAgICAgIGI6IFwiXlxcXFxzKlwiICsgbiArIFwiXFxcXHMqPVxcXFxzKlwiICsgcyxcbiAgICAgICAgICAgIGU6IFwiWy09XT5cIixcbiAgICAgICAgICAgIHJCOiAhMCxcbiAgICAgICAgICAgIGM6IFtpLCBvXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBiOiAvWzpcXCgsPV1cXHMqLyxcbiAgICAgICAgICAgIHI6IDAsXG4gICAgICAgICAgICBjOiBbe1xuICAgICAgICAgICAgICAgIGNOOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgICAgICAgICAgYjogcyxcbiAgICAgICAgICAgICAgICBlOiBcIlstPV0+XCIsXG4gICAgICAgICAgICAgICAgckI6ICEwLFxuICAgICAgICAgICAgICAgIGM6IFtvXVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY046IFwiY2xhc3NcIixcbiAgICAgICAgICAgIGJLOiBcImNsYXNzXCIsXG4gICAgICAgICAgICBlOiBcIiRcIixcbiAgICAgICAgICAgIGk6IC9bOj1cIlxcW1xcXV0vLFxuICAgICAgICAgICAgYzogW3tcbiAgICAgICAgICAgICAgICBiSzogXCJleHRlbmRzXCIsXG4gICAgICAgICAgICAgICAgZVc6ICEwLFxuICAgICAgICAgICAgICAgIGk6IC9bOj1cIlxcW1xcXV0vLFxuICAgICAgICAgICAgICAgIGM6IFtpXVxuICAgICAgICAgICAgfSwgaV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY046IFwiYXR0cmlidXRlXCIsXG4gICAgICAgICAgICBiOiBuICsgXCI6XCIsXG4gICAgICAgICAgICBlOiBcIjpcIixcbiAgICAgICAgICAgIHJCOiAhMCxcbiAgICAgICAgICAgIHJFOiAhMCxcbiAgICAgICAgICAgIHI6IDBcbiAgICAgICAgfV0pXG4gICAgfTtcbn0pO1xuaGxqcy5yZWdpc3Rlckxhbmd1YWdlKFwieG1sXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdCA9IFwiW0EtWmEtejAtOVxcXFwuXzotXStcIixcbiAgICAgICAgZSA9IHtcbiAgICAgICAgYjogLzxcXD8ocGhwKT8oPyFcXHcpLyxcbiAgICAgICAgZTogL1xcPz4vLFxuICAgICAgICBzTDogXCJwaHBcIixcbiAgICAgICAgc3ViTGFuZ3VhZ2VNb2RlOiBcImNvbnRpbnVvdXNcIlxuICAgIH0sXG4gICAgICAgIGMgPSB7XG4gICAgICAgIGVXOiAhMCxcbiAgICAgICAgaTogLzwvLFxuICAgICAgICByOiAwLFxuICAgICAgICBjOiBbZSwge1xuICAgICAgICAgICAgY046IFwiYXR0cmlidXRlXCIsXG4gICAgICAgICAgICBiOiB0LFxuICAgICAgICAgICAgcjogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBiOiBcIj1cIixcbiAgICAgICAgICAgIHI6IDAsXG4gICAgICAgICAgICBjOiBbe1xuICAgICAgICAgICAgICAgIGNOOiBcInZhbHVlXCIsXG4gICAgICAgICAgICAgICAgYzogW2VdLFxuICAgICAgICAgICAgICAgIHY6IFt7XG4gICAgICAgICAgICAgICAgICAgIGI6IC9cIi8sXG4gICAgICAgICAgICAgICAgICAgIGU6IC9cIi9cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGI6IC8nLyxcbiAgICAgICAgICAgICAgICAgICAgZTogLycvXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBiOiAvW15cXHNcXC8+XSsvXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dXG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBhbGlhc2VzOiBbXCJodG1sXCIsIFwieGh0bWxcIiwgXCJyc3NcIiwgXCJhdG9tXCIsIFwieHNsXCIsIFwicGxpc3RcIl0sXG4gICAgICAgIGNJOiAhMCxcbiAgICAgICAgYzogW3tcbiAgICAgICAgICAgIGNOOiBcImRvY3R5cGVcIixcbiAgICAgICAgICAgIGI6IFwiPCFET0NUWVBFXCIsXG4gICAgICAgICAgICBlOiBcIj5cIixcbiAgICAgICAgICAgIHI6IDEwLFxuICAgICAgICAgICAgYzogW3tcbiAgICAgICAgICAgICAgICBiOiBcIlxcXFxbXCIsXG4gICAgICAgICAgICAgICAgZTogXCJcXFxcXVwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjTjogXCJjb21tZW50XCIsXG4gICAgICAgICAgICBiOiBcIjwhLS1cIixcbiAgICAgICAgICAgIGU6IFwiLS0+XCIsXG4gICAgICAgICAgICByOiAxMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjTjogXCJjZGF0YVwiLFxuICAgICAgICAgICAgYjogXCI8XFxcXCFcXFxcW0NEQVRBXFxcXFtcIixcbiAgICAgICAgICAgIGU6IFwiXFxcXF1cXFxcXT5cIixcbiAgICAgICAgICAgIHI6IDEwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNOOiBcInRhZ1wiLFxuICAgICAgICAgICAgYjogXCI8c3R5bGUoPz1cXFxcc3w+fCQpXCIsXG4gICAgICAgICAgICBlOiBcIj5cIixcbiAgICAgICAgICAgIGs6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJzdHlsZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYzogW2NdLFxuICAgICAgICAgICAgc3RhcnRzOiB7XG4gICAgICAgICAgICAgICAgZTogXCI8L3N0eWxlPlwiLFxuICAgICAgICAgICAgICAgIHJFOiAhMCxcbiAgICAgICAgICAgICAgICBzTDogXCJjc3NcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjTjogXCJ0YWdcIixcbiAgICAgICAgICAgIGI6IFwiPHNjcmlwdCg/PVxcXFxzfD58JClcIixcbiAgICAgICAgICAgIGU6IFwiPlwiLFxuICAgICAgICAgICAgazoge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcInNjcmlwdFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYzogW2NdLFxuICAgICAgICAgICAgc3RhcnRzOiB7XG4gICAgICAgICAgICAgICAgZTogXCI8L3NjcmlwdD5cIixcbiAgICAgICAgICAgICAgICByRTogITAsXG4gICAgICAgICAgICAgICAgc0w6IFwiamF2YXNjcmlwdFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGUsIHtcbiAgICAgICAgICAgIGNOOiBcInBpXCIsXG4gICAgICAgICAgICBiOiAvPFxcP1xcdysvLFxuICAgICAgICAgICAgZTogL1xcPz4vLFxuICAgICAgICAgICAgcjogMTBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY046IFwidGFnXCIsXG4gICAgICAgICAgICBiOiBcIjwvP1wiLFxuICAgICAgICAgICAgZTogXCIvPz5cIixcbiAgICAgICAgICAgIGM6IFt7XG4gICAgICAgICAgICAgICAgY046IFwidGl0bGVcIixcbiAgICAgICAgICAgICAgICBiOiAvW14gXFwvPjxcXG5cXHRdKy8sXG4gICAgICAgICAgICAgICAgcjogMFxuICAgICAgICAgICAgfSwgY11cbiAgICAgICAgfV1cbiAgICB9O1xufSk7XG5obGpzLnJlZ2lzdGVyTGFuZ3VhZ2UoXCJoYW1sXCIsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjSTogITAsXG4gICAgICAgIGM6IFt7XG4gICAgICAgICAgICBjTjogXCJkb2N0eXBlXCIsXG4gICAgICAgICAgICBiOiBcIl4hISEoICg1fDFcXFxcLjF8U3RyaWN0fEZyYW1lc2V0fEJhc2ljfE1vYmlsZXxSREZhfFhNTFxcXFxiLiopKT8kXCIsXG4gICAgICAgICAgICByOiAxMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjTjogXCJjb21tZW50XCIsXG4gICAgICAgICAgICBiOiBcIl5cXFxccyooIT0jfD0jfC0jfC8pLiokXCIsXG4gICAgICAgICAgICByOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGI6IFwiXlxcXFxzKigtfD18IT0pKD8hIylcIixcbiAgICAgICAgICAgIHN0YXJ0czoge1xuICAgICAgICAgICAgICAgIGU6IFwiXFxcXG5cIixcbiAgICAgICAgICAgICAgICBzTDogXCJydWJ5XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY046IFwidGFnXCIsXG4gICAgICAgICAgICBiOiBcIl5cXFxccyolXCIsXG4gICAgICAgICAgICBjOiBbe1xuICAgICAgICAgICAgICAgIGNOOiBcInRpdGxlXCIsXG4gICAgICAgICAgICAgICAgYjogXCJcXFxcdytcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNOOiBcInZhbHVlXCIsXG4gICAgICAgICAgICAgICAgYjogXCJbI1xcXFwuXVxcXFx3K1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgYjogXCJ7XFxcXHMqXCIsXG4gICAgICAgICAgICAgICAgZTogXCJcXFxccyp9XCIsXG4gICAgICAgICAgICAgICAgZUU6ICEwLFxuICAgICAgICAgICAgICAgIGM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGI6IFwiOlxcXFx3K1xcXFxzKj0+XCIsXG4gICAgICAgICAgICAgICAgICAgIGU6IFwiLFxcXFxzK1wiLFxuICAgICAgICAgICAgICAgICAgICByQjogITAsXG4gICAgICAgICAgICAgICAgICAgIGVXOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgYzogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNOOiBcInN5bWJvbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYjogXCI6XFxcXHcrXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY046IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBiOiAnXCInLFxuICAgICAgICAgICAgICAgICAgICAgICAgZTogJ1wiJ1xuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjTjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGI6IFwiJ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZTogXCInXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYjogXCJcXFxcdytcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHI6IDBcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGI6IFwiXFxcXChcXFxccypcIixcbiAgICAgICAgICAgICAgICBlOiBcIlxcXFxzKlxcXFwpXCIsXG4gICAgICAgICAgICAgICAgZUU6ICEwLFxuICAgICAgICAgICAgICAgIGM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGI6IFwiXFxcXHcrXFxcXHMqPVwiLFxuICAgICAgICAgICAgICAgICAgICBlOiBcIlxcXFxzK1wiLFxuICAgICAgICAgICAgICAgICAgICByQjogITAsXG4gICAgICAgICAgICAgICAgICAgIGVXOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgYzogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNOOiBcImF0dHJpYnV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYjogXCJcXFxcdytcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHI6IDBcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY046IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBiOiAnXCInLFxuICAgICAgICAgICAgICAgICAgICAgICAgZTogJ1wiJ1xuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjTjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGI6IFwiJ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZTogXCInXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYjogXCJcXFxcdytcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHI6IDBcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY046IFwiYnVsbGV0XCIsXG4gICAgICAgICAgICBiOiBcIl5cXFxccypbPX5dXFxcXHMqXCIsXG4gICAgICAgICAgICByOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGI6IFwiI3tcIixcbiAgICAgICAgICAgIHN0YXJ0czoge1xuICAgICAgICAgICAgICAgIGU6IFwifVwiLFxuICAgICAgICAgICAgICAgIHNMOiBcInJ1YnlcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9XVxuICAgIH07XG59KTtcbmhsanMucmVnaXN0ZXJMYW5ndWFnZShcInJ1YnlcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgYiA9IFwiW2EtekEtWl9dXFxcXHcqWyE/PV0/fFstK35dXFxcXEB8PDx8Pj58PX58PT09P3w8PT58Wzw+XT0/fFxcXFwqXFxcXCp8Wy0vKyVeJip+YHxdfFxcXFxbXFxcXF09P1wiLFxuICAgICAgICByID0gXCJhbmQgZmFsc2UgdGhlbiBkZWZpbmVkIG1vZHVsZSBpbiByZXR1cm4gcmVkbyBpZiBCRUdJTiByZXRyeSBlbmQgZm9yIHRydWUgc2VsZiB3aGVuIG5leHQgdW50aWwgZG8gYmVnaW4gdW5sZXNzIEVORCByZXNjdWUgbmlsIGVsc2UgYnJlYWsgdW5kZWYgbm90IHN1cGVyIGNsYXNzIGNhc2UgcmVxdWlyZSB5aWVsZCBhbGlhcyB3aGlsZSBlbnN1cmUgZWxzaWYgb3IgaW5jbHVkZSBhdHRyX3JlYWRlciBhdHRyX3dyaXRlciBhdHRyX2FjY2Vzc29yXCIsXG4gICAgICAgIGMgPSB7XG4gICAgICAgIGNOOiBcInlhcmRvY3RhZ1wiLFxuICAgICAgICBiOiBcIkBbQS1aYS16XStcIlxuICAgIH0sXG4gICAgICAgIGEgPSB7XG4gICAgICAgIGNOOiBcInZhbHVlXCIsXG4gICAgICAgIGI6IFwiIzxcIixcbiAgICAgICAgZTogXCI+XCJcbiAgICB9LFxuICAgICAgICBzID0ge1xuICAgICAgICBjTjogXCJjb21tZW50XCIsXG4gICAgICAgIHY6IFt7XG4gICAgICAgICAgICBiOiBcIiNcIixcbiAgICAgICAgICAgIGU6IFwiJFwiLFxuICAgICAgICAgICAgYzogW2NdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGI6IFwiXlxcXFw9YmVnaW5cIixcbiAgICAgICAgICAgIGU6IFwiXlxcXFw9ZW5kXCIsXG4gICAgICAgICAgICBjOiBbY10sXG4gICAgICAgICAgICByOiAxMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBiOiBcIl5fX0VORF9fXCIsXG4gICAgICAgICAgICBlOiBcIlxcXFxuJFwiXG4gICAgICAgIH1dXG4gICAgfSxcbiAgICAgICAgbiA9IHtcbiAgICAgICAgY046IFwic3Vic3RcIixcbiAgICAgICAgYjogXCIjXFxcXHtcIixcbiAgICAgICAgZTogXCJ9XCIsXG4gICAgICAgIGs6IHJcbiAgICB9LFxuICAgICAgICB0ID0ge1xuICAgICAgICBjTjogXCJzdHJpbmdcIixcbiAgICAgICAgYzogW2UuQkUsIG5dLFxuICAgICAgICB2OiBbe1xuICAgICAgICAgICAgYjogLycvLFxuICAgICAgICAgICAgZTogLycvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGI6IC9cIi8sXG4gICAgICAgICAgICBlOiAvXCIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGI6IC9gLyxcbiAgICAgICAgICAgIGU6IC9gL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBiOiBcIiVbcVF3V3hdP1xcXFwoXCIsXG4gICAgICAgICAgICBlOiBcIlxcXFwpXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYjogXCIlW3FRd1d4XT9cXFxcW1wiLFxuICAgICAgICAgICAgZTogXCJcXFxcXVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGI6IFwiJVtxUXdXeF0/e1wiLFxuICAgICAgICAgICAgZTogXCJ9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYjogXCIlW3FRd1d4XT88XCIsXG4gICAgICAgICAgICBlOiBcIj5cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBiOiBcIiVbcVF3V3hdPy9cIixcbiAgICAgICAgICAgIGU6IFwiL1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGI6IFwiJVtxUXdXeF0/JVwiLFxuICAgICAgICAgICAgZTogXCIlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYjogXCIlW3FRd1d4XT8tXCIsXG4gICAgICAgICAgICBlOiBcIi1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBiOiBcIiVbcVF3V3hdP1xcXFx8XCIsXG4gICAgICAgICAgICBlOiBcIlxcXFx8XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYjogL1xcQlxcPyhcXFxcXFxkezEsM318XFxcXHhbQS1GYS1mMC05XXsxLDJ9fFxcXFx1W0EtRmEtZjAtOV17NH18XFxcXD9cXFMpXFxiL1xuICAgICAgICB9XVxuICAgIH0sXG4gICAgICAgIGkgPSB7XG4gICAgICAgIGNOOiBcInBhcmFtc1wiLFxuICAgICAgICBiOiBcIlxcXFwoXCIsXG4gICAgICAgIGU6IFwiXFxcXClcIixcbiAgICAgICAgazogclxuICAgIH0sXG4gICAgICAgIGQgPSBbdCwgYSwgcywge1xuICAgICAgICBjTjogXCJjbGFzc1wiLFxuICAgICAgICBiSzogXCJjbGFzcyBtb2R1bGVcIixcbiAgICAgICAgZTogXCIkfDtcIixcbiAgICAgICAgaTogLz0vLFxuICAgICAgICBjOiBbZS5pbmhlcml0KGUuVE0sIHtcbiAgICAgICAgICAgIGI6IFwiW0EtWmEtel9dXFxcXHcqKDo6XFxcXHcrKSooXFxcXD98XFxcXCEpP1wiXG4gICAgICAgIH0pLCB7XG4gICAgICAgICAgICBjTjogXCJpbmhlcml0YW5jZVwiLFxuICAgICAgICAgICAgYjogXCI8XFxcXHMqXCIsXG4gICAgICAgICAgICBjOiBbe1xuICAgICAgICAgICAgICAgIGNOOiBcInBhcmVudFwiLFxuICAgICAgICAgICAgICAgIGI6IFwiKFwiICsgZS5JUiArIFwiOjopP1wiICsgZS5JUlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwgc11cbiAgICB9LCB7XG4gICAgICAgIGNOOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIGJLOiBcImRlZlwiLFxuICAgICAgICBlOiBcIiB8JHw7XCIsXG4gICAgICAgIHI6IDAsXG4gICAgICAgIGM6IFtlLmluaGVyaXQoZS5UTSwge1xuICAgICAgICAgICAgYjogYlxuICAgICAgICB9KSwgaSwgc11cbiAgICB9LCB7XG4gICAgICAgIGNOOiBcImNvbnN0YW50XCIsXG4gICAgICAgIGI6IFwiKDo6KT8oXFxcXGJbQS1aXVxcXFx3Kig6Oik/KStcIixcbiAgICAgICAgcjogMFxuICAgIH0sIHtcbiAgICAgICAgY046IFwic3ltYm9sXCIsXG4gICAgICAgIGI6IGUuVUlSICsgXCIoXFxcXCF8XFxcXD8pPzpcIixcbiAgICAgICAgcjogMFxuICAgIH0sIHtcbiAgICAgICAgY046IFwic3ltYm9sXCIsXG4gICAgICAgIGI6IFwiOlwiLFxuICAgICAgICBjOiBbdCwge1xuICAgICAgICAgICAgYjogYlxuICAgICAgICB9XSxcbiAgICAgICAgcjogMFxuICAgIH0sIHtcbiAgICAgICAgY046IFwibnVtYmVyXCIsXG4gICAgICAgIGI6IFwiKFxcXFxiMFswLTdfXSspfChcXFxcYjB4WzAtOWEtZkEtRl9dKyl8KFxcXFxiWzEtOV1bMC05X10qKFxcXFwuWzAtOV9dKyk/KXxbMF9dXFxcXGJcIixcbiAgICAgICAgcjogMFxuICAgIH0sIHtcbiAgICAgICAgY046IFwidmFyaWFibGVcIixcbiAgICAgICAgYjogXCIoXFxcXCRcXFxcVyl8KChcXFxcJHxcXFxcQFxcXFxAPykoXFxcXHcrKSlcIlxuICAgIH0sIHtcbiAgICAgICAgYjogXCIoXCIgKyBlLlJTUiArIFwiKVxcXFxzKlwiLFxuICAgICAgICBjOiBbYSwgcywge1xuICAgICAgICAgICAgY046IFwicmVnZXhwXCIsXG4gICAgICAgICAgICBjOiBbZS5CRSwgbl0sXG4gICAgICAgICAgICBpOiAvXFxuLyxcbiAgICAgICAgICAgIHY6IFt7XG4gICAgICAgICAgICAgICAgYjogXCIvXCIsXG4gICAgICAgICAgICAgICAgZTogXCIvW2Etel0qXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBiOiBcIiVye1wiLFxuICAgICAgICAgICAgICAgIGU6IFwifVthLXpdKlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgYjogXCIlclxcXFwoXCIsXG4gICAgICAgICAgICAgICAgZTogXCJcXFxcKVthLXpdKlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgYjogXCIlciFcIixcbiAgICAgICAgICAgICAgICBlOiBcIiFbYS16XSpcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGI6IFwiJXJcXFxcW1wiLFxuICAgICAgICAgICAgICAgIGU6IFwiXFxcXF1bYS16XSpcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIHI6IDBcbiAgICB9XTtcbiAgICBuLmMgPSBkLCBpLmMgPSBkO1xuICAgIHZhciBsID0gXCJbPj9dPlwiLFxuICAgICAgICB1ID0gXCJbXFxcXHcjXStcXFxcKFxcXFx3K1xcXFwpOlxcXFxkKzpcXFxcZCs+XCIsXG4gICAgICAgIE4gPSBcIihcXFxcdystKT9cXFxcZCtcXFxcLlxcXFxkK1xcXFwuXFxcXGQocFxcXFxkKyk/W14+XSs+XCIsXG4gICAgICAgIG8gPSBbe1xuICAgICAgICBiOiAvXlxccyo9Pi8sXG4gICAgICAgIGNOOiBcInN0YXR1c1wiLFxuICAgICAgICBzdGFydHM6IHtcbiAgICAgICAgICAgIGU6IFwiJFwiLFxuICAgICAgICAgICAgYzogZFxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBjTjogXCJwcm9tcHRcIixcbiAgICAgICAgYjogXCJeKFwiICsgbCArIFwifFwiICsgdSArIFwifFwiICsgTiArIFwiKVwiLFxuICAgICAgICBzdGFydHM6IHtcbiAgICAgICAgICAgIGU6IFwiJFwiLFxuICAgICAgICAgICAgYzogZFxuICAgICAgICB9XG4gICAgfV07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWxpYXNlczogW1wicmJcIiwgXCJnZW1zcGVjXCIsIFwicG9kc3BlY1wiLCBcInRob3JcIiwgXCJpcmJcIl0sXG4gICAgICAgIGs6IHIsXG4gICAgICAgIGM6IFtzXS5jb25jYXQobykuY29uY2F0KGQpXG4gICAgfTtcbn0pO1xuaGxqcy5yZWdpc3Rlckxhbmd1YWdlKFwiamF2YXNjcmlwdFwiLCBmdW5jdGlvbiAocikge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFsaWFzZXM6IFtcImpzXCJdLFxuICAgICAgICBrOiB7XG4gICAgICAgICAgICBrZXl3b3JkOiBcImluIGlmIGZvciB3aGlsZSBmaW5hbGx5IHZhciBuZXcgZnVuY3Rpb24gZG8gcmV0dXJuIHZvaWQgZWxzZSBicmVhayBjYXRjaCBpbnN0YW5jZW9mIHdpdGggdGhyb3cgY2FzZSBkZWZhdWx0IHRyeSB0aGlzIHN3aXRjaCBjb250aW51ZSB0eXBlb2YgZGVsZXRlIGxldCB5aWVsZCBjb25zdCBjbGFzc1wiLFxuICAgICAgICAgICAgbGl0ZXJhbDogXCJ0cnVlIGZhbHNlIG51bGwgdW5kZWZpbmVkIE5hTiBJbmZpbml0eVwiLFxuICAgICAgICAgICAgYnVpbHRfaW46IFwiZXZhbCBpc0Zpbml0ZSBpc05hTiBwYXJzZUZsb2F0IHBhcnNlSW50IGRlY29kZVVSSSBkZWNvZGVVUklDb21wb25lbnQgZW5jb2RlVVJJIGVuY29kZVVSSUNvbXBvbmVudCBlc2NhcGUgdW5lc2NhcGUgT2JqZWN0IEZ1bmN0aW9uIEJvb2xlYW4gRXJyb3IgRXZhbEVycm9yIEludGVybmFsRXJyb3IgUmFuZ2VFcnJvciBSZWZlcmVuY2VFcnJvciBTdG9wSXRlcmF0aW9uIFN5bnRheEVycm9yIFR5cGVFcnJvciBVUklFcnJvciBOdW1iZXIgTWF0aCBEYXRlIFN0cmluZyBSZWdFeHAgQXJyYXkgRmxvYXQzMkFycmF5IEZsb2F0NjRBcnJheSBJbnQxNkFycmF5IEludDMyQXJyYXkgSW50OEFycmF5IFVpbnQxNkFycmF5IFVpbnQzMkFycmF5IFVpbnQ4QXJyYXkgVWludDhDbGFtcGVkQXJyYXkgQXJyYXlCdWZmZXIgRGF0YVZpZXcgSlNPTiBJbnRsIGFyZ3VtZW50cyByZXF1aXJlIG1vZHVsZSBjb25zb2xlIHdpbmRvdyBkb2N1bWVudFwiXG4gICAgICAgIH0sXG4gICAgICAgIGM6IFt7XG4gICAgICAgICAgICBjTjogXCJwaVwiLFxuICAgICAgICAgICAgcjogMTAsXG4gICAgICAgICAgICB2OiBbe1xuICAgICAgICAgICAgICAgIGI6IC9eXFxzKignfFwiKXVzZSBzdHJpY3QoJ3xcIikvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgYjogL15cXHMqKCd8XCIpdXNlIGFzbSgnfFwiKS9cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHIuQVNNLCByLlFTTSwgci5DTENNLCByLkNCQ00sIHIuQ05NLCB7XG4gICAgICAgICAgICBiOiBcIihcIiArIHIuUlNSICsgXCJ8XFxcXGIoY2FzZXxyZXR1cm58dGhyb3cpXFxcXGIpXFxcXHMqXCIsXG4gICAgICAgICAgICBrOiBcInJldHVybiB0aHJvdyBjYXNlXCIsXG4gICAgICAgICAgICBjOiBbci5DTENNLCByLkNCQ00sIHIuUk0sIHtcbiAgICAgICAgICAgICAgICBiOiAvPC8sXG4gICAgICAgICAgICAgICAgZTogLz47LyxcbiAgICAgICAgICAgICAgICByOiAwLFxuICAgICAgICAgICAgICAgIHNMOiBcInhtbFwiXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIHI6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY046IFwiZnVuY3Rpb25cIixcbiAgICAgICAgICAgIGJLOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgICAgICBlOiAvXFx7LyxcbiAgICAgICAgICAgIGVFOiAhMCxcbiAgICAgICAgICAgIGM6IFtyLmluaGVyaXQoci5UTSwge1xuICAgICAgICAgICAgICAgIGI6IC9bQS1aYS16JF9dWzAtOUEtWmEteiRfXSovXG4gICAgICAgICAgICB9KSwge1xuICAgICAgICAgICAgICAgIGNOOiBcInBhcmFtc1wiLFxuICAgICAgICAgICAgICAgIGI6IC9cXCgvLFxuICAgICAgICAgICAgICAgIGU6IC9cXCkvLFxuICAgICAgICAgICAgICAgIGM6IFtyLkNMQ00sIHIuQ0JDTV0sXG4gICAgICAgICAgICAgICAgaTogL1tcIidcXChdL1xuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBpOiAvXFxbfCUvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGI6IC9cXCRbKC5dL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBiOiBcIlxcXFwuXCIgKyByLklSLFxuICAgICAgICAgICAgcjogMFxuICAgICAgICB9XVxuICAgIH07XG59KTtcbmhsanMucmVnaXN0ZXJMYW5ndWFnZShcImVyYlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc0w6IFwieG1sXCIsXG4gICAgICAgIHN1Ykxhbmd1YWdlTW9kZTogXCJjb250aW51b3VzXCIsXG4gICAgICAgIGM6IFt7XG4gICAgICAgICAgICBjTjogXCJjb21tZW50XCIsXG4gICAgICAgICAgICBiOiBcIjwlI1wiLFxuICAgICAgICAgICAgZTogXCIlPlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGI6IFwiPCVbJT0tXT9cIixcbiAgICAgICAgICAgIGU6IFwiWyUtXT8lPlwiLFxuICAgICAgICAgICAgc0w6IFwicnVieVwiLFxuICAgICAgICAgICAgZUI6ICEwLFxuICAgICAgICAgICAgZUU6ICEwXG4gICAgICAgIH1dXG4gICAgfTtcbn0pO1xuaGxqcy5yZWdpc3Rlckxhbmd1YWdlKFwic2Nzc1wiLCBmdW5jdGlvbiAoZSkge1xuICAgIHtcbiAgICAgICAgdmFyIHQgPSBcIlthLXpBLVotXVthLXpBLVowLTlfLV0qXCIsXG4gICAgICAgICAgICBpID0ge1xuICAgICAgICAgICAgY046IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgIGI6IFwiKFxcXFwkXCIgKyB0ICsgXCIpXFxcXGJcIlxuICAgICAgICB9LFxuICAgICAgICAgICAgciA9IHtcbiAgICAgICAgICAgIGNOOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgICAgICBiOiB0ICsgXCJcXFxcKFwiLFxuICAgICAgICAgICAgckI6ICEwLFxuICAgICAgICAgICAgZUU6ICEwLFxuICAgICAgICAgICAgZTogXCJcXFxcKFwiXG4gICAgICAgIH0sXG4gICAgICAgICAgICBvID0ge1xuICAgICAgICAgICAgY046IFwiaGV4Y29sb3JcIixcbiAgICAgICAgICAgIGI6IFwiI1swLTlBLUZhLWZdK1wiXG4gICAgICAgIH07XG4gICAgICAgICh7XG4gICAgICAgICAgICBjTjogXCJhdHRyaWJ1dGVcIixcbiAgICAgICAgICAgIGI6IFwiW0EtWlxcXFxfXFxcXC5cXFxcLV0rXCIsXG4gICAgICAgICAgICBlOiBcIjpcIixcbiAgICAgICAgICAgIGVFOiAhMCxcbiAgICAgICAgICAgIGk6IFwiW15cXFxcc11cIixcbiAgICAgICAgICAgIHN0YXJ0czoge1xuICAgICAgICAgICAgICAgIGNOOiBcInZhbHVlXCIsXG4gICAgICAgICAgICAgICAgZVc6ICEwLFxuICAgICAgICAgICAgICAgIGVFOiAhMCxcbiAgICAgICAgICAgICAgICBjOiBbciwgbywgZS5DU1NOTSwgZS5RU00sIGUuQVNNLCBlLkNCQ00sIHtcbiAgICAgICAgICAgICAgICAgICAgY046IFwiaW1wb3J0YW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGI6IFwiIWltcG9ydGFudFwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGNJOiAhMCxcbiAgICAgICAgaTogXCJbPS98J11cIixcbiAgICAgICAgYzogW2UuQ0xDTSwgZS5DQkNNLCByLCB7XG4gICAgICAgICAgICBjTjogXCJpZFwiLFxuICAgICAgICAgICAgYjogXCJcXFxcI1tBLVphLXowLTlfLV0rXCIsXG4gICAgICAgICAgICByOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNOOiBcImNsYXNzXCIsXG4gICAgICAgICAgICBiOiBcIlxcXFwuW0EtWmEtejAtOV8tXStcIixcbiAgICAgICAgICAgIHI6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY046IFwiYXR0cl9zZWxlY3RvclwiLFxuICAgICAgICAgICAgYjogXCJcXFxcW1wiLFxuICAgICAgICAgICAgZTogXCJcXFxcXVwiLFxuICAgICAgICAgICAgaTogXCIkXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY046IFwidGFnXCIsXG4gICAgICAgICAgICBiOiBcIlxcXFxiKGF8YWJicnxhY3JvbnltfGFkZHJlc3N8YXJlYXxhcnRpY2xlfGFzaWRlfGF1ZGlvfGJ8YmFzZXxiaWd8YmxvY2txdW90ZXxib2R5fGJyfGJ1dHRvbnxjYW52YXN8Y2FwdGlvbnxjaXRlfGNvZGV8Y29sfGNvbGdyb3VwfGNvbW1hbmR8ZGF0YWxpc3R8ZGR8ZGVsfGRldGFpbHN8ZGZufGRpdnxkbHxkdHxlbXxlbWJlZHxmaWVsZHNldHxmaWdjYXB0aW9ufGZpZ3VyZXxmb290ZXJ8Zm9ybXxmcmFtZXxmcmFtZXNldHwoaFsxLTZdKXxoZWFkfGhlYWRlcnxoZ3JvdXB8aHJ8aHRtbHxpfGlmcmFtZXxpbWd8aW5wdXR8aW5zfGtiZHxrZXlnZW58bGFiZWx8bGVnZW5kfGxpfGxpbmt8bWFwfG1hcmt8bWV0YXxtZXRlcnxuYXZ8bm9mcmFtZXN8bm9zY3JpcHR8b2JqZWN0fG9sfG9wdGdyb3VwfG9wdGlvbnxvdXRwdXR8cHxwYXJhbXxwcmV8cHJvZ3Jlc3N8cXxycHxydHxydWJ5fHNhbXB8c2NyaXB0fHNlY3Rpb258c2VsZWN0fHNtYWxsfHNwYW58c3RyaWtlfHN0cm9uZ3xzdHlsZXxzdWJ8c3VwfHRhYmxlfHRib2R5fHRkfHRleHRhcmVhfHRmb290fHRofHRoZWFkfHRpbWV8dGl0bGV8dHJ8dHR8dWx8dmFyfHZpZGVvKVxcXFxiXCIsXG4gICAgICAgICAgICByOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNOOiBcInBzZXVkb1wiLFxuICAgICAgICAgICAgYjogXCI6KHZpc2l0ZWR8dmFsaWR8cm9vdHxyaWdodHxyZXF1aXJlZHxyZWFkLXdyaXRlfHJlYWQtb25seXxvdXQtcmFuZ2V8b3B0aW9uYWx8b25seS1vZi10eXBlfG9ubHktY2hpbGR8bnRoLW9mLXR5cGV8bnRoLWxhc3Qtb2YtdHlwZXxudGgtbGFzdC1jaGlsZHxudGgtY2hpbGR8bm90fGxpbmt8bGVmdHxsYXN0LW9mLXR5cGV8bGFzdC1jaGlsZHxsYW5nfGludmFsaWR8aW5kZXRlcm1pbmF0ZXxpbi1yYW5nZXxob3Zlcnxmb2N1c3xmaXJzdC1vZi10eXBlfGZpcnN0LWxpbmV8Zmlyc3QtbGV0dGVyfGZpcnN0LWNoaWxkfGZpcnN0fGVuYWJsZWR8ZW1wdHl8ZGlzYWJsZWR8ZGVmYXVsdHxjaGVja2VkfGJlZm9yZXxhZnRlcnxhY3RpdmUpXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY046IFwicHNldWRvXCIsXG4gICAgICAgICAgICBiOiBcIjo6KGFmdGVyfGJlZm9yZXxjaG9pY2VzfGZpcnN0LWxldHRlcnxmaXJzdC1saW5lfHJlcGVhdC1pbmRleHxyZXBlYXQtaXRlbXxzZWxlY3Rpb258dmFsdWUpXCJcbiAgICAgICAgfSwgaSwge1xuICAgICAgICAgICAgY046IFwiYXR0cmlidXRlXCIsXG4gICAgICAgICAgICBiOiBcIlxcXFxiKHotaW5kZXh8d29yZC13cmFwfHdvcmQtc3BhY2luZ3x3b3JkLWJyZWFrfHdpZHRofHdpZG93c3x3aGl0ZS1zcGFjZXx2aXNpYmlsaXR5fHZlcnRpY2FsLWFsaWdufHVuaWNvZGUtYmlkaXx0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbnx0cmFuc2l0aW9uLXByb3BlcnR5fHRyYW5zaXRpb24tZHVyYXRpb258dHJhbnNpdGlvbi1kZWxheXx0cmFuc2l0aW9ufHRyYW5zZm9ybS1zdHlsZXx0cmFuc2Zvcm0tb3JpZ2lufHRyYW5zZm9ybXx0b3B8dGV4dC11bmRlcmxpbmUtcG9zaXRpb258dGV4dC10cmFuc2Zvcm18dGV4dC1zaGFkb3d8dGV4dC1yZW5kZXJpbmd8dGV4dC1vdmVyZmxvd3x0ZXh0LWluZGVudHx0ZXh0LWRlY29yYXRpb24tc3R5bGV8dGV4dC1kZWNvcmF0aW9uLWxpbmV8dGV4dC1kZWNvcmF0aW9uLWNvbG9yfHRleHQtZGVjb3JhdGlvbnx0ZXh0LWFsaWduLWxhc3R8dGV4dC1hbGlnbnx0YWItc2l6ZXx0YWJsZS1sYXlvdXR8cmlnaHR8cmVzaXplfHF1b3Rlc3xwb3NpdGlvbnxwb2ludGVyLWV2ZW50c3xwZXJzcGVjdGl2ZS1vcmlnaW58cGVyc3BlY3RpdmV8cGFnZS1icmVhay1pbnNpZGV8cGFnZS1icmVhay1iZWZvcmV8cGFnZS1icmVhay1hZnRlcnxwYWRkaW5nLXRvcHxwYWRkaW5nLXJpZ2h0fHBhZGRpbmctbGVmdHxwYWRkaW5nLWJvdHRvbXxwYWRkaW5nfG92ZXJmbG93LXl8b3ZlcmZsb3cteHxvdmVyZmxvdy13cmFwfG92ZXJmbG93fG91dGxpbmUtd2lkdGh8b3V0bGluZS1zdHlsZXxvdXRsaW5lLW9mZnNldHxvdXRsaW5lLWNvbG9yfG91dGxpbmV8b3JwaGFuc3xvcmRlcnxvcGFjaXR5fG9iamVjdC1wb3NpdGlvbnxvYmplY3QtZml0fG5vcm1hbHxub25lfG5hdi11cHxuYXYtcmlnaHR8bmF2LWxlZnR8bmF2LWluZGV4fG5hdi1kb3dufG1pbi13aWR0aHxtaW4taGVpZ2h0fG1heC13aWR0aHxtYXgtaGVpZ2h0fG1hc2t8bWFya3N8bWFyZ2luLXRvcHxtYXJnaW4tcmlnaHR8bWFyZ2luLWxlZnR8bWFyZ2luLWJvdHRvbXxtYXJnaW58bGlzdC1zdHlsZS10eXBlfGxpc3Qtc3R5bGUtcG9zaXRpb258bGlzdC1zdHlsZS1pbWFnZXxsaXN0LXN0eWxlfGxpbmUtaGVpZ2h0fGxldHRlci1zcGFjaW5nfGxlZnR8anVzdGlmeS1jb250ZW50fGluaXRpYWx8aW5oZXJpdHxpbWUtbW9kZXxpbWFnZS1vcmllbnRhdGlvbnxpbWFnZS1yZXNvbHV0aW9ufGltYWdlLXJlbmRlcmluZ3xpY29ufGh5cGhlbnN8aGVpZ2h0fGZvbnQtd2VpZ2h0fGZvbnQtdmFyaWFudC1saWdhdHVyZXN8Zm9udC12YXJpYW50fGZvbnQtc3R5bGV8Zm9udC1zdHJldGNofGZvbnQtc2l6ZS1hZGp1c3R8Zm9udC1zaXplfGZvbnQtbGFuZ3VhZ2Utb3ZlcnJpZGV8Zm9udC1rZXJuaW5nfGZvbnQtZmVhdHVyZS1zZXR0aW5nc3xmb250LWZhbWlseXxmb250fGZsb2F0fGZsZXgtd3JhcHxmbGV4LXNocmlua3xmbGV4LWdyb3d8ZmxleC1mbG93fGZsZXgtZGlyZWN0aW9ufGZsZXgtYmFzaXN8ZmxleHxmaWx0ZXJ8ZW1wdHktY2VsbHN8ZGlzcGxheXxkaXJlY3Rpb258Y3Vyc29yfGNvdW50ZXItcmVzZXR8Y291bnRlci1pbmNyZW1lbnR8Y29udGVudHxjb2x1bW4td2lkdGh8Y29sdW1uLXNwYW58Y29sdW1uLXJ1bGUtd2lkdGh8Y29sdW1uLXJ1bGUtc3R5bGV8Y29sdW1uLXJ1bGUtY29sb3J8Y29sdW1uLXJ1bGV8Y29sdW1uLWdhcHxjb2x1bW4tZmlsbHxjb2x1bW4tY291bnR8Y29sdW1uc3xjb2xvcnxjbGlwLXBhdGh8Y2xpcHxjbGVhcnxjYXB0aW9uLXNpZGV8YnJlYWstaW5zaWRlfGJyZWFrLWJlZm9yZXxicmVhay1hZnRlcnxib3gtc2l6aW5nfGJveC1zaGFkb3d8Ym94LWRlY29yYXRpb24tYnJlYWt8Ym90dG9tfGJvcmRlci13aWR0aHxib3JkZXItdG9wLXdpZHRofGJvcmRlci10b3Atc3R5bGV8Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXN8Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1c3xib3JkZXItdG9wLWNvbG9yfGJvcmRlci10b3B8Ym9yZGVyLXN0eWxlfGJvcmRlci1zcGFjaW5nfGJvcmRlci1yaWdodC13aWR0aHxib3JkZXItcmlnaHQtc3R5bGV8Ym9yZGVyLXJpZ2h0LWNvbG9yfGJvcmRlci1yaWdodHxib3JkZXItcmFkaXVzfGJvcmRlci1sZWZ0LXdpZHRofGJvcmRlci1sZWZ0LXN0eWxlfGJvcmRlci1sZWZ0LWNvbG9yfGJvcmRlci1sZWZ0fGJvcmRlci1pbWFnZS13aWR0aHxib3JkZXItaW1hZ2Utc291cmNlfGJvcmRlci1pbWFnZS1zbGljZXxib3JkZXItaW1hZ2UtcmVwZWF0fGJvcmRlci1pbWFnZS1vdXRzZXR8Ym9yZGVyLWltYWdlfGJvcmRlci1jb2xvcnxib3JkZXItY29sbGFwc2V8Ym9yZGVyLWJvdHRvbS13aWR0aHxib3JkZXItYm90dG9tLXN0eWxlfGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzfGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXN8Ym9yZGVyLWJvdHRvbS1jb2xvcnxib3JkZXItYm90dG9tfGJvcmRlcnxiYWNrZ3JvdW5kLXNpemV8YmFja2dyb3VuZC1yZXBlYXR8YmFja2dyb3VuZC1wb3NpdGlvbnxiYWNrZ3JvdW5kLW9yaWdpbnxiYWNrZ3JvdW5kLWltYWdlfGJhY2tncm91bmQtY29sb3J8YmFja2dyb3VuZC1jbGlwfGJhY2tncm91bmQtYXR0YWNobWVudHxiYWNrZ3JvdW5kfGJhY2tmYWNlLXZpc2liaWxpdHl8YXV0b3xhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9ufGFuaW1hdGlvbi1wbGF5LXN0YXRlfGFuaW1hdGlvbi1uYW1lfGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnR8YW5pbWF0aW9uLWZpbGwtbW9kZXxhbmltYXRpb24tZHVyYXRpb258YW5pbWF0aW9uLWRpcmVjdGlvbnxhbmltYXRpb24tZGVsYXl8YW5pbWF0aW9ufGFsaWduLXNlbGZ8YWxpZ24taXRlbXN8YWxpZ24tY29udGVudClcXFxcYlwiLFxuICAgICAgICAgICAgaTogXCJbXlxcXFxzXVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNOOiBcInZhbHVlXCIsXG4gICAgICAgICAgICBiOiBcIlxcXFxiKHdoaXRlc3BhY2V8d2FpdHx3LXJlc2l6ZXx2aXNpYmxlfHZlcnRpY2FsLXRleHR8dmVydGljYWwtaWRlb2dyYXBoaWN8dXBwZXJjYXNlfHVwcGVyLXJvbWFufHVwcGVyLWFscGhhfHVuZGVybGluZXx0cmFuc3BhcmVudHx0b3B8dGhpbnx0aGlja3x0ZXh0fHRleHQtdG9wfHRleHQtYm90dG9tfHRiLXJsfHRhYmxlLWhlYWRlci1ncm91cHx0YWJsZS1mb290ZXItZ3JvdXB8c3ctcmVzaXplfHN1cGVyfHN0cmljdHxzdGF0aWN8c3F1YXJlfHNvbGlkfHNtYWxsLWNhcHN8c2VwYXJhdGV8c2UtcmVzaXplfHNjcm9sbHxzLXJlc2l6ZXxydGx8cm93LXJlc2l6ZXxyaWRnZXxyaWdodHxyZXBlYXR8cmVwZWF0LXl8cmVwZWF0LXh8cmVsYXRpdmV8cHJvZ3Jlc3N8cG9pbnRlcnxvdmVybGluZXxvdXRzaWRlfG91dHNldHxvYmxpcXVlfG5vd3JhcHxub3QtYWxsb3dlZHxub3JtYWx8bm9uZXxudy1yZXNpemV8bm8tcmVwZWF0fG5vLWRyb3B8bmV3c3BhcGVyfG5lLXJlc2l6ZXxuLXJlc2l6ZXxtb3ZlfG1pZGRsZXxtZWRpdW18bHRyfGxyLXRifGxvd2VyY2FzZXxsb3dlci1yb21hbnxsb3dlci1hbHBoYXxsb29zZXxsaXN0LWl0ZW18bGluZXxsaW5lLXRocm91Z2h8bGluZS1lZGdlfGxpZ2h0ZXJ8bGVmdHxrZWVwLWFsbHxqdXN0aWZ5fGl0YWxpY3xpbnRlci13b3JkfGludGVyLWlkZW9ncmFwaHxpbnNpZGV8aW5zZXR8aW5saW5lfGlubGluZS1ibG9ja3xpbmhlcml0fGluYWN0aXZlfGlkZW9ncmFwaC1zcGFjZXxpZGVvZ3JhcGgtcGFyZW50aGVzaXN8aWRlb2dyYXBoLW51bWVyaWN8aWRlb2dyYXBoLWFscGhhfGhvcml6b250YWx8aGlkZGVufGhlbHB8aGFuZHxncm9vdmV8Zml4ZWR8ZWxsaXBzaXN8ZS1yZXNpemV8ZG91YmxlfGRvdHRlZHxkaXN0cmlidXRlfGRpc3RyaWJ1dGUtc3BhY2V8ZGlzdHJpYnV0ZS1sZXR0ZXJ8ZGlzdHJpYnV0ZS1hbGwtbGluZXN8ZGlzY3xkaXNhYmxlZHxkZWZhdWx0fGRlY2ltYWx8ZGFzaGVkfGNyb3NzaGFpcnxjb2xsYXBzZXxjb2wtcmVzaXplfGNpcmNsZXxjaGFyfGNlbnRlcnxjYXBpdGFsaXplfGJyZWFrLXdvcmR8YnJlYWstYWxsfGJvdHRvbXxib3RofGJvbGRlcnxib2xkfGJsb2NrfGJpZGktb3ZlcnJpZGV8YmVsb3d8YmFzZWxpbmV8YXV0b3xhbHdheXN8YWxsLXNjcm9sbHxhYnNvbHV0ZXx0YWJsZXx0YWJsZS1jZWxsKVxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY046IFwidmFsdWVcIixcbiAgICAgICAgICAgIGI6IFwiOlwiLFxuICAgICAgICAgICAgZTogXCI7XCIsXG4gICAgICAgICAgICBjOiBbciwgaSwgbywgZS5DU1NOTSwgZS5RU00sIGUuQVNNLCB7XG4gICAgICAgICAgICAgICAgY046IFwiaW1wb3J0YW50XCIsXG4gICAgICAgICAgICAgICAgYjogXCIhaW1wb3J0YW50XCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNOOiBcImF0X3J1bGVcIixcbiAgICAgICAgICAgIGI6IFwiQFwiLFxuICAgICAgICAgICAgZTogXCJbeztdXCIsXG4gICAgICAgICAgICBrOiBcIm1peGluIGluY2x1ZGUgZXh0ZW5kIGZvciBpZiBlbHNlIGVhY2ggd2hpbGUgY2hhcnNldCBpbXBvcnQgZGVidWcgbWVkaWEgcGFnZSBjb250ZW50IGZvbnQtZmFjZSBuYW1lc3BhY2Ugd2FyblwiLFxuICAgICAgICAgICAgYzogW3IsIGksIGUuUVNNLCBlLkFTTSwgbywgZS5DU1NOTSwge1xuICAgICAgICAgICAgICAgIGNOOiBcInByZXByb2Nlc3NvclwiLFxuICAgICAgICAgICAgICAgIGI6IFwiXFxcXHNbQS1aYS16MC05Xy4tXStcIixcbiAgICAgICAgICAgICAgICByOiAwXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XVxuICAgIH07XG59KTtcbmhsanMucmVnaXN0ZXJMYW5ndWFnZShcImNzc1wiLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBjID0gXCJbYS16QS1aLV1bYS16QS1aMC05Xy1dKlwiLFxuICAgICAgICBhID0ge1xuICAgICAgICBjTjogXCJmdW5jdGlvblwiLFxuICAgICAgICBiOiBjICsgXCJcXFxcKFwiLFxuICAgICAgICByQjogITAsXG4gICAgICAgIGVFOiAhMCxcbiAgICAgICAgZTogXCJcXFxcKFwiXG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBjSTogITAsXG4gICAgICAgIGk6IFwiWz0vfCddXCIsXG4gICAgICAgIGM6IFtlLkNCQ00sIHtcbiAgICAgICAgICAgIGNOOiBcImlkXCIsXG4gICAgICAgICAgICBiOiBcIlxcXFwjW0EtWmEtejAtOV8tXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjTjogXCJjbGFzc1wiLFxuICAgICAgICAgICAgYjogXCJcXFxcLltBLVphLXowLTlfLV0rXCIsXG4gICAgICAgICAgICByOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNOOiBcImF0dHJfc2VsZWN0b3JcIixcbiAgICAgICAgICAgIGI6IFwiXFxcXFtcIixcbiAgICAgICAgICAgIGU6IFwiXFxcXF1cIixcbiAgICAgICAgICAgIGk6IFwiJFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNOOiBcInBzZXVkb1wiLFxuICAgICAgICAgICAgYjogXCI6KDopP1thLXpBLVowLTlcXFxcX1xcXFwtXFxcXCtcXFxcKFxcXFwpXFxcXFxcXCJcXFxcJ10rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY046IFwiYXRfcnVsZVwiLFxuICAgICAgICAgICAgYjogXCJAKGZvbnQtZmFjZXxwYWdlKVwiLFxuICAgICAgICAgICAgbDogXCJbYS16LV0rXCIsXG4gICAgICAgICAgICBrOiBcImZvbnQtZmFjZSBwYWdlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY046IFwiYXRfcnVsZVwiLFxuICAgICAgICAgICAgYjogXCJAXCIsXG4gICAgICAgICAgICBlOiBcIlt7O11cIixcbiAgICAgICAgICAgIGM6IFt7XG4gICAgICAgICAgICAgICAgY046IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgICAgIGI6IC9cXFMrL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGI6IC9cXHMvLFxuICAgICAgICAgICAgICAgIGVXOiAhMCxcbiAgICAgICAgICAgICAgICBlRTogITAsXG4gICAgICAgICAgICAgICAgcjogMCxcbiAgICAgICAgICAgICAgICBjOiBbYSwgZS5BU00sIGUuUVNNLCBlLkNTU05NXVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY046IFwidGFnXCIsXG4gICAgICAgICAgICBiOiBjLFxuICAgICAgICAgICAgcjogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjTjogXCJydWxlc1wiLFxuICAgICAgICAgICAgYjogXCJ7XCIsXG4gICAgICAgICAgICBlOiBcIn1cIixcbiAgICAgICAgICAgIGk6IFwiW15cXFxcc11cIixcbiAgICAgICAgICAgIHI6IDAsXG4gICAgICAgICAgICBjOiBbZS5DQkNNLCB7XG4gICAgICAgICAgICAgICAgY046IFwicnVsZVwiLFxuICAgICAgICAgICAgICAgIGI6IFwiW15cXFxcc11cIixcbiAgICAgICAgICAgICAgICByQjogITAsXG4gICAgICAgICAgICAgICAgZTogXCI7XCIsXG4gICAgICAgICAgICAgICAgZVc6ICEwLFxuICAgICAgICAgICAgICAgIGM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGNOOiBcImF0dHJpYnV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBiOiBcIltBLVpcXFxcX1xcXFwuXFxcXC1dK1wiLFxuICAgICAgICAgICAgICAgICAgICBlOiBcIjpcIixcbiAgICAgICAgICAgICAgICAgICAgZUU6ICEwLFxuICAgICAgICAgICAgICAgICAgICBpOiBcIlteXFxcXHNdXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY046IFwidmFsdWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVXOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVFOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGM6IFthLCBlLkNTU05NLCBlLlFTTSwgZS5BU00sIGUuQ0JDTSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNOOiBcImhleGNvbG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYjogXCIjWzAtOUEtRmEtZl0rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjTjogXCJpbXBvcnRhbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiOiBcIiFpbXBvcnRhbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XVxuICAgIH07XG59KTtcbmhsanMucmVnaXN0ZXJMYW5ndWFnZShcImhhbmRsZWJhcnNcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBlID0gXCJlYWNoIGluIHdpdGggaWYgZWxzZSB1bmxlc3MgYmluZGF0dHIgYWN0aW9uIGNvbGxlY3Rpb24gZGVidWdnZXIgbG9nIG91dGxldCB0ZW1wbGF0ZSB1bmJvdW5kIHZpZXcgeWllbGRcIjtcbiAgICByZXR1cm4ge1xuICAgICAgICBhbGlhc2VzOiBbXCJoYnNcIiwgXCJodG1sLmhic1wiLCBcImh0bWwuaGFuZGxlYmFyc1wiXSxcbiAgICAgICAgY0k6ICEwLFxuICAgICAgICBzTDogXCJ4bWxcIixcbiAgICAgICAgc3ViTGFuZ3VhZ2VNb2RlOiBcImNvbnRpbnVvdXNcIixcbiAgICAgICAgYzogW3tcbiAgICAgICAgICAgIGNOOiBcImV4cHJlc3Npb25cIixcbiAgICAgICAgICAgIGI6IFwie3tcIixcbiAgICAgICAgICAgIGU6IFwifX1cIixcbiAgICAgICAgICAgIGM6IFt7XG4gICAgICAgICAgICAgICAgY046IFwiYmVnaW4tYmxvY2tcIixcbiAgICAgICAgICAgICAgICBiOiBcIiNbYS16QS1aLSAuXStcIixcbiAgICAgICAgICAgICAgICBrOiBlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgY046IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgYjogJ1wiJyxcbiAgICAgICAgICAgICAgICBlOiAnXCInXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgY046IFwiZW5kLWJsb2NrXCIsXG4gICAgICAgICAgICAgICAgYjogXCJcXFxcL1thLXpBLVotIC5dK1wiLFxuICAgICAgICAgICAgICAgIGs6IGVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjTjogXCJ2YXJpYWJsZVwiLFxuICAgICAgICAgICAgICAgIGI6IFwiW2EtekEtWi0uXStcIixcbiAgICAgICAgICAgICAgICBrOiBlXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XVxuICAgIH07XG59KTtcbm1vZHVsZS5leHBvcnRzID0gaGxqcztcblxufSx7XCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiOjQ1LFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzXCI6NDh9XSwzOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxucmVxdWlyZShcIi4vYXJyYXlfaW5jbHVkZXNcIik7XG5cbn0se1wiLi9hcnJheV9pbmNsdWRlc1wiOjM3fV0sNDA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLyohXG4gIHF1ZXJ5LXN0cmluZ1xuICBQYXJzZSBhbmQgc3RyaW5naWZ5IFVSTCBxdWVyeSBzdHJpbmdzXG4gIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvcXVlcnktc3RyaW5nXG4gIGJ5IFNpbmRyZSBTb3JodXNcbiAgTUlUIExpY2Vuc2VcbiovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfT2JqZWN0JGtleXMgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMnKVsnZGVmYXVsdCddO1xuXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBxdWVyeVN0cmluZyA9IHt9O1xuXG4gIHF1ZXJ5U3RyaW5nLnBhcnNlID0gZnVuY3Rpb24gKHN0cikge1xuICAgIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIHN0ciA9IHN0ci50cmltKCkucmVwbGFjZSgvXihcXD98IykvLCAnJyk7XG5cbiAgICBpZiAoIXN0cikge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIHJldHVybiBzdHIudHJpbSgpLnNwbGl0KCcmJykucmVkdWNlKGZ1bmN0aW9uIChyZXQsIHBhcmFtKSB7XG4gICAgICB2YXIgcGFydHMgPSBwYXJhbS5yZXBsYWNlKC9cXCsvZywgJyAnKS5zcGxpdCgnPScpO1xuICAgICAgdmFyIGtleSA9IHBhcnRzWzBdO1xuICAgICAgdmFyIHZhbCA9IHBhcnRzWzFdO1xuXG4gICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQoa2V5KTtcbiAgICAgIC8vIG1pc3NpbmcgYD1gIHNob3VsZCBiZSBgbnVsbGA6XG4gICAgICAvLyBodHRwOi8vdzMub3JnL1RSLzIwMTIvV0QtdXJsLTIwMTIwNTI0LyNjb2xsZWN0LXVybC1wYXJhbWV0ZXJzXG4gICAgICB2YWwgPSB2YWwgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBkZWNvZGVVUklDb21wb25lbnQodmFsKTtcblxuICAgICAgaWYgKCFyZXQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICByZXRba2V5XSA9IHZhbDtcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXRba2V5XSkpIHtcbiAgICAgICAgcmV0W2tleV0ucHVzaCh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0W2tleV0gPSBbcmV0W2tleV0sIHZhbF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSwge30pO1xuICB9O1xuXG4gIHF1ZXJ5U3RyaW5nLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqID8gX09iamVjdCRrZXlzKG9iaikubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgICByZXR1cm4gdmFsLm1hcChmdW5jdGlvbiAodmFsMikge1xuICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWwyKTtcbiAgICAgICAgfSkuam9pbignJicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsKTtcbiAgICB9KS5qb2luKCcmJykgOiAnJztcbiAgfTtcblxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBxdWVyeVN0cmluZztcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gcXVlcnlTdHJpbmc7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93LnF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmc7XG4gIH1cbn0pKCk7XG5cbn0se1wiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzXCI6NDh9XSw0MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xufSx7XCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiOjU2fV0sNDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xufSx7XCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCI6NTd9XSw0MzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcbn0se1wiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCI6NTh9XSw0NDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xufSx7XCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiOjU5fV0sNDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcbn0se1wiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIjo2MH1dLDQ2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcbn0se1wiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydGllc1wiOjYxfV0sNDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcbn0se1wiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIjo2Mn1dLDQ4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xufSx7XCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXNcIjo2M31dLDQ5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG59LHtcImNvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlXCI6NjR9XSw1MDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG59LHtcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIjo2NX1dLDUxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcbn0se1wiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiOjY2fV0sNTI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xufSx7fV0sNTM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfT2JqZWN0JGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpW1wiZGVmYXVsdFwiXTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgX09iamVjdCRkZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xufSx7XCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiOjQ3fV0sNTQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG59LHt9XSw1NTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9nZXRJdGVyYXRvciA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pc0l0ZXJhYmxlID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZVwiKVtcImRlZmF1bHRcIl07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gX2dldEl0ZXJhdG9yKGFyciksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoX2lzSXRlcmFibGUoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KSgpO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xufSx7XCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCI6NDIsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGVcIjo0M31dLDU2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLkFycmF5LmZyb207XG59LHtcIi4uLy4uL21vZHVsZXMvJC5jb3JlXCI6NzIsXCIuLi8uLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tXCI6MTE5LFwiLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yXCI6MTI1fV0sNTc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvcicpO1xufSx7XCIuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yXCI6MTE3LFwiLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yXCI6MTI1LFwiLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlXCI6MTI3fV0sNTg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlJyk7XG59LHtcIi4uL21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZVwiOjExOCxcIi4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvclwiOjEyNSxcIi4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZVwiOjEyN31dLDU5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5PYmplY3QuYXNzaWduO1xufSx7XCIuLi8uLi9tb2R1bGVzLyQuY29yZVwiOjcyLFwiLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnblwiOjEyMX1dLDYwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciAkID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZShQLCBEKXtcbiAgcmV0dXJuICQuY3JlYXRlKFAsIEQpO1xufTtcbn0se1wiLi4vLi4vbW9kdWxlcy8kXCI6OTV9XSw2MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgJCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKFQsIEQpe1xuICByZXR1cm4gJC5zZXREZXNjcyhULCBEKTtcbn07XG59LHtcIi4uLy4uL21vZHVsZXMvJFwiOjk1fV0sNjI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyICQgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkLnNldERlc2MoaXQsIGtleSwgZGVzYyk7XG59O1xufSx7XCIuLi8uLi9tb2R1bGVzLyRcIjo5NX1dLDYzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zdGF0aWNzLWFjY2VwdC1wcmltaXRpdmVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJC5jb3JlJykuT2JqZWN0LmtleXM7XG59LHtcIi4uLy4uL21vZHVsZXMvJC5jb3JlXCI6NzIsXCIuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc3RhdGljcy1hY2NlcHQtcHJpbWl0aXZlc1wiOjEyMn1dLDY0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvJC5jb3JlJykuUHJvbWlzZTtcbn0se1wiLi4vbW9kdWxlcy8kLmNvcmVcIjo3MixcIi4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmdcIjoxMjMsXCIuLi9tb2R1bGVzL2VzNi5wcm9taXNlXCI6MTI0LFwiLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yXCI6MTI1LFwiLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlXCI6MTI3fV0sNjU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJC5jb3JlJykuU3ltYm9sO1xufSx7XCIuLi8uLi9tb2R1bGVzLyQuY29yZVwiOjcyLFwiLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sXCI6MTI2fV0sNjY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLndrcycpKCdpdGVyYXRvcicpO1xufSx7XCIuLi8uLi9tb2R1bGVzLyQud2tzXCI6MTE1LFwiLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yXCI6MTI1LFwiLi4vLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlXCI6MTI3fV0sNjc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG59LHt9XSw2ODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG59LHtcIi4vJC5pcy1vYmplY3RcIjo4N31dLDY5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciB0b09iamVjdCAgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0JylcbiAgLCBFUzVPYmplY3QgPSByZXF1aXJlKCcuLyQuZXM1LW9iamVjdCcpXG4gICwgZW51bUtleXMgID0gcmVxdWlyZSgnLi8kLmVudW0ta2V5cycpO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2Upe1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCwgdHJ1ZSlcbiAgICAsIGwgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBpID0gMTtcbiAgd2hpbGUobCA+IGkpe1xuICAgIHZhciBTICAgICAgPSBFUzVPYmplY3QoYXJndW1lbnRzW2krK10pXG4gICAgICAsIGtleXMgICA9IGVudW1LZXlzKFMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGogICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGopVFtrZXkgPSBrZXlzW2orK11dID0gU1trZXldO1xuICB9XG4gIHJldHVybiBUO1xufTtcbn0se1wiLi8kLmVudW0ta2V5c1wiOjc3LFwiLi8kLmVzNS1vYmplY3RcIjo3OCxcIi4vJC50by1vYmplY3RcIjoxMTJ9XSw3MDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgVEFHID0gcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpXG4gIC8vIEVTMyB3cm9uZyBoZXJlXG4gICwgQVJHID0gY29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSAoTyA9IE9iamVjdChpdCkpW1RBR10pID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcbn0se1wiLi8kLmNvZlwiOjcxLFwiLi8kLndrc1wiOjExNX1dLDcxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG59LHt9XSw3MjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbn0se31dLDczOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8vIE9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vJC5hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih+bGVuZ3RoICYmIHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9IHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgIH07XG59O1xufSx7XCIuLyQuYS1mdW5jdGlvblwiOjY3fV0sNzQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vJC5jb3JlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbmZ1bmN0aW9uIGN0eChmbiwgdGhhdCl7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufVxuLy8gdHlwZSBiaXRtYXBcbiRkZWYuRiA9IDE7ICAvLyBmb3JjZWRcbiRkZWYuRyA9IDI7ICAvLyBnbG9iYWxcbiRkZWYuUyA9IDQ7ICAvLyBzdGF0aWNcbiRkZWYuUCA9IDg7ICAvLyBwcm90b1xuJGRlZi5CID0gMTY7IC8vIGJpbmRcbiRkZWYuVyA9IDMyOyAvLyB3cmFwXG5mdW5jdGlvbiAkZGVmKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHBcbiAgICAsIGlzR2xvYmFsID0gdHlwZSAmICRkZWYuR1xuICAgICwgaXNQcm90byAgPSB0eXBlICYgJGRlZi5QXG4gICAgLCB0YXJnZXQgICA9IGlzR2xvYmFsID8gZ2xvYmFsIDogdHlwZSAmICRkZWYuU1xuICAgICAgICA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGV4cG9ydHMgID0gaXNHbG9iYWwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgaWYoaXNHbG9iYWwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICEodHlwZSAmICRkZWYuRikgJiYgdGFyZ2V0ICYmIGtleSBpbiB0YXJnZXQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBpZihpc0dsb2JhbCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJylleHAgPSBzb3VyY2Vba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGVsc2UgaWYodHlwZSAmICRkZWYuQiAmJiBvd24pZXhwID0gY3R4KG91dCwgZ2xvYmFsKTtcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIGVsc2UgaWYodHlwZSAmICRkZWYuVyAmJiB0YXJnZXRba2V5XSA9PSBvdXQpIWZ1bmN0aW9uKEMpe1xuICAgICAgZXhwID0gZnVuY3Rpb24ocGFyYW0pe1xuICAgICAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIEMgPyBuZXcgQyhwYXJhbSkgOiBDKHBhcmFtKTtcbiAgICAgIH07XG4gICAgICBleHBbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICB9KG91dCk7XG4gICAgZWxzZSBleHAgPSBpc1Byb3RvICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydFxuICAgIGV4cG9ydHNba2V5XSA9IGV4cDtcbiAgICBpZihpc1Byb3RvKShleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KSlba2V5XSA9IG91dDtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSAkZGVmO1xufSx7XCIuLyQuY29yZVwiOjcyLFwiLi8kLmdsb2JhbFwiOjgxfV0sNzU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG59LHt9XSw3NjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbn0se1wiLi8kLmdsb2JhbFwiOjgxLFwiLi8kLmlzLW9iamVjdFwiOjg3fV0sNzc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyICQgPSByZXF1aXJlKCcuLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIga2V5cyAgICAgICA9ICQuZ2V0S2V5cyhpdClcbiAgICAsIGlzRW51bSAgICAgPSAkLmlzRW51bVxuICAgICwgZ2V0U3ltYm9scyA9ICQuZ2V0U3ltYm9scztcbiAgaWYoZ2V0U3ltYm9scylmb3IodmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KSwgaSA9IDAsIGtleTsgc3ltYm9scy5sZW5ndGggPiBpOyApe1xuICAgIGlmKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKWtleXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiBrZXlzO1xufTtcbn0se1wiLi8kXCI6OTV9XSw3ODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyBmYWxsYmFjayBmb3Igbm90IGFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBjb2YgICAgID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgJE9iamVjdCA9IE9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gMCBpbiAkT2JqZWN0KCd6JykgPyAkT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6ICRPYmplY3QoaXQpO1xufTtcbn0se1wiLi8kLmNvZlwiOjcxfV0sNzk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vJC5pcy1hcnJheS1pdGVyJylcbiAgLCBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi8kLnRvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQpe1xuICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKGl0ZXJhYmxlKVxuICAgICwgZiAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yO1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZihpc0FycmF5SXRlcihpdGVyRm4pKWZvcihsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICB9IGVsc2UgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7ICl7XG4gICAgY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gIH1cbn07XG59LHtcIi4vJC5hbi1vYmplY3RcIjo2OCxcIi4vJC5jdHhcIjo3MyxcIi4vJC5pcy1hcnJheS1pdGVyXCI6ODYsXCIuLyQuaXRlci1jYWxsXCI6ODksXCIuLyQudG8tbGVuZ3RoXCI6MTExLFwiLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2RcIjoxMTZ9XSw4MDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZ1xuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpXG4gICwgZ2V0TmFtZXMgPSByZXF1aXJlKCcuLyQnKS5nZXROYW1lcztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxuZnVuY3Rpb24gZ2V0V2luZG93TmFtZXMoaXQpe1xuICB0cnkge1xuICAgIHJldHVybiBnZXROYW1lcyhpdCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMuZ2V0ID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIGlmKHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nKXJldHVybiBnZXRXaW5kb3dOYW1lcyhpdCk7XG4gIHJldHVybiBnZXROYW1lcyh0b09iamVjdChpdCkpO1xufTtcbn0se1wiLi8kXCI6OTUsXCIuLyQudG8tb2JqZWN0XCI6MTEyfV0sODE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIGdsb2JhbCA9IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG59LHt9XSw4MjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbn0se31dLDgzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLnN1cHBvcnQtZGVzYycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuICQuc2V0RGVzYyhvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xufSx7XCIuLyRcIjo5NSxcIi4vJC5wcm9wZXJ0eS1kZXNjXCI6OTksXCIuLyQuc3VwcG9ydC1kZXNjXCI6MTA3fV0sODQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xufSx7XCIuLyQuZ2xvYmFsXCI6ODF9XSw4NTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyBGYXN0IGFwcGx5XG4vLyBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIGFyZ3MsIHRoYXQpe1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaChhcmdzLmxlbmd0aCl7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gICAgY2FzZSA1OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdKTtcbiAgfSByZXR1cm4gICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcbn0se31dLDg2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuICgnQXJyYXknIGluIEl0ZXJhdG9ycyA/IEl0ZXJhdG9ycy5BcnJheSA6IEFycmF5LnByb3RvdHlwZVtJVEVSQVRPUl0pID09PSBpdDtcbn07XG59LHtcIi4vJC5pdGVyYXRvcnNcIjo5NCxcIi4vJC53a3NcIjoxMTV9XSw4NzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyBodHRwOi8vanNwZXJmLmNvbS9jb3JlLWpzLWlzb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSBudWxsICYmICh0eXBlb2YgaXQgPT0gJ29iamVjdCcgfHwgdHlwZW9mIGl0ID09ICdmdW5jdGlvbicpO1xufTtcbn0se31dLDg4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbm1vZHVsZS5leHBvcnRzID0gJ2tleXMnIGluIFtdICYmICEoJ25leHQnIGluIFtdLmtleXMoKSk7XG59LHt9XSw4OTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0Jyk7XG5mdW5jdGlvbiBjbG9zZShpdGVyYXRvcil7XG4gIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIH0gY2F0Y2goZSl7XG4gICAgY2xvc2UoaXRlcmF0b3IpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG59LHtcIi4vJC5hbi1vYmplY3RcIjo2OH1dLDkwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi8kJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLmhpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSAkLmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJykoMSxuZXh0KX0pO1xuICByZXF1aXJlKCcuLyQudGFnJykoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xufSx7XCIuLyRcIjo5NSxcIi4vJC5oaWRlXCI6ODMsXCIuLyQucHJvcGVydHktZGVzY1wiOjk5LFwiLi8kLnRhZ1wiOjEwOCxcIi4vJC53a3NcIjoxMTV9XSw5MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgID0gcmVxdWlyZSgnLi8kLmxpYnJhcnknKVxuICAsICRkZWYgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRyZWRlZiAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZicpXG4gICwgaGlkZSAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIGhhcyAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIFNZTUJPTF9JVEVSQVRPUiA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIEZGX0lURVJBVE9SICAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgICA9ICd2YWx1ZXMnO1xuZnVuY3Rpb24gcmV0dXJuVGhpcygpeyByZXR1cm4gdGhpczsgfVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRSl7XG4gIHJlcXVpcmUoJy4vJC5pdGVyLWNyZWF0ZScpKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgZnVuY3Rpb24gY3JlYXRlTWV0aG9kKGtpbmQpe1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9XG4gIHZhciBUQUcgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgcHJvdG8gICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgX25hdGl2ZSAgPSBwcm90b1tTWU1CT0xfSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCBfZGVmYXVsdCA9IF9uYXRpdmUgfHwgY3JlYXRlTWV0aG9kKERFRkFVTFQpXG4gICAgLCBtZXRob2RzLCBrZXk7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoX25hdGl2ZSl7XG4gICAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gcmVxdWlyZSgnLi8kJykuZ2V0UHJvdG8oX2RlZmF1bHQuY2FsbChuZXcgQmFzZSkpO1xuICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICByZXF1aXJlKCcuLyQudGFnJykoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgLy8gRkYgZml4XG4gICAgaWYoIUxJQlJBUlkgJiYgaGFzKHByb3RvLCBGRl9JVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgU1lNQk9MX0lURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoIUxJQlJBUlkgfHwgRk9SQ0UpaGlkZShwcm90bywgU1lNQk9MX0lURVJBVE9SLCBfZGVmYXVsdCk7XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gX2RlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgICAgICAgICA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKEtFWVMpLFxuICAgICAgdmFsdWVzOiAgREVGQVVMVCA9PSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZChWQUxVRVMpLFxuICAgICAgZW50cmllczogREVGQVVMVCAhPSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZCgnZW50cmllcycpXG4gICAgfTtcbiAgICBpZihGT1JDRSlmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKSRyZWRlZihwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZGVmKCRkZWYuUCArICRkZWYuRiAqIHJlcXVpcmUoJy4vJC5pdGVyLWJ1Z2d5JyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG59O1xufSx7XCIuLyRcIjo5NSxcIi4vJC5kZWZcIjo3NCxcIi4vJC5oYXNcIjo4MixcIi4vJC5oaWRlXCI6ODMsXCIuLyQuaXRlci1idWdneVwiOjg4LFwiLi8kLml0ZXItY3JlYXRlXCI6OTAsXCIuLyQuaXRlcmF0b3JzXCI6OTQsXCIuLyQubGlicmFyeVwiOjk3LFwiLi8kLnJlZGVmXCI6MTAwLFwiLi8kLnRhZ1wiOjEwOCxcIi4vJC53a3NcIjoxMTV9XSw5MjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgU1lNQk9MX0lURVJBVE9SID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HICAgID0gZmFsc2U7XG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bU1lNQk9MX0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIGlmKCFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbU1lNQk9MX0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHNhZmUgPSB0cnVlOyB9O1xuICAgIGFycltTWU1CT0xfSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcbn0se1wiLi8kLndrc1wiOjExNX1dLDkzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07XG59LHt9XSw5NDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xufSx7fV0sOTU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyICRPYmplY3QgPSBPYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlOiAgICAgJE9iamVjdC5jcmVhdGUsXG4gIGdldFByb3RvOiAgICRPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gIGlzRW51bTogICAgIHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICBnZXREZXNjOiAgICAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgc2V0RGVzYzogICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0eSxcbiAgc2V0RGVzY3M6ICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzLFxuICBnZXRLZXlzOiAgICAkT2JqZWN0LmtleXMsXG4gIGdldE5hbWVzOiAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgZ2V0U3ltYm9sczogJE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gIGVhY2g6ICAgICAgIFtdLmZvckVhY2hcbn07XG59LHt9XSw5NjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvT2JqZWN0KG9iamVjdClcbiAgICAsIGtleXMgICA9ICQuZ2V0S2V5cyhPKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobGVuZ3RoID4gaW5kZXgpaWYoT1trZXkgPSBrZXlzW2luZGV4KytdXSA9PT0gZWwpcmV0dXJuIGtleTtcbn07XG59LHtcIi4vJFwiOjk1LFwiLi8kLnRvLW9iamVjdFwiOjExMn1dLDk3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcbn0se31dLDk4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciAkcmVkZWYgPSByZXF1aXJlKCcuLyQucmVkZWYnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0LCBzcmMpe1xuICBmb3IodmFyIGtleSBpbiBzcmMpJHJlZGVmKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xufSx7XCIuLyQucmVkZWZcIjoxMDB9XSw5OTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07XG59LHt9XSwxMDA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuaGlkZScpO1xufSx7XCIuLyQuaGlkZVwiOjgzfV0sMTAxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmlzIHx8IGZ1bmN0aW9uIGlzKHgsIHkpe1xuICByZXR1cm4geCA9PT0geSA/IHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5IDogeCAhPSB4ICYmIHkgIT0geTtcbn07XG59LHt9XSwxMDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGdldERlc2MgID0gcmVxdWlyZSgnLi8kJykuZ2V0RGVzY1xuICAsIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0Jyk7XG5mdW5jdGlvbiBjaGVjayhPLCBwcm90byl7XG4gIGFuT2JqZWN0KE8pO1xuICBpZighaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKXRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgID8gZnVuY3Rpb24oYnVnZ3ksIHNldCl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi8kLmN0eCcpKEZ1bmN0aW9uLmNhbGwsIGdldERlc2MoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgICAgc2V0KHt9LCBbXSk7XG4gICAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgICByZXR1cm4gTztcbiAgICAgICAgfTtcbiAgICAgIH0oKVxuICAgIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xufSx7XCIuLyRcIjo5NSxcIi4vJC5hbi1vYmplY3RcIjo2OCxcIi4vJC5jdHhcIjo3MyxcIi4vJC5pcy1vYmplY3RcIjo4N31dLDEwMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcbn0se1wiLi8kLmdsb2JhbFwiOjgxfV0sMTA0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciAkICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBTUEVDSUVTID0gcmVxdWlyZSgnLi8kLndrcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEMpe1xuICBpZihyZXF1aXJlKCcuLyQuc3VwcG9ydC1kZXNjJykgJiYgIShTUEVDSUVTIGluIEMpKSQuc2V0RGVzYyhDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xufSx7XCIuLyRcIjo5NSxcIi4vJC5zdXBwb3J0LWRlc2NcIjoxMDcsXCIuLyQud2tzXCI6MTE1fV0sMTA1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIENvbnN0cnVjdG9yLCBuYW1lKXtcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSl0aHJvdyBUeXBlRXJyb3IobmFtZSArIFwiOiB1c2UgdGhlICduZXcnIG9wZXJhdG9yIVwiKTtcbiAgcmV0dXJuIGl0O1xufTtcbn0se31dLDEwNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vJC50by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGxcbiAgICAgIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG59LHtcIi4vJC5kZWZpbmVkXCI6NzUsXCIuLyQudG8taW50ZWdlclwiOjExMH1dLDEwNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICEhZnVuY3Rpb24oKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiAyOyB9fSkuYSA9PSAyO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59KCk7XG59LHt9XSwxMDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIGhhcyAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBoaWRlID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIFRBRyAgPSByZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpaGlkZShpdCwgVEFHLCB0YWcpO1xufTtcbn0se1wiLi8kLmhhc1wiOjgyLFwiLi8kLmhpZGVcIjo4MyxcIi4vJC53a3NcIjoxMTV9XSwxMDk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGludm9rZSAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5pbnZva2UnKVxuICAsIGh0bWwgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5odG1sJylcbiAgLCBjZWwgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZG9tLWNyZWF0ZScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBzZXRUYXNrICAgICAgICAgICAgPSBnbG9iYWwuc2V0SW1tZWRpYXRlXG4gICwgY2xlYXJUYXNrICAgICAgICAgID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlXG4gICwgTWVzc2FnZUNoYW5uZWwgICAgID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsXG4gICwgY291bnRlciAgICAgICAgICAgID0gMFxuICAsIHF1ZXVlICAgICAgICAgICAgICA9IHt9XG4gICwgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSdcbiAgLCBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbmZ1bmN0aW9uIHJ1bigpe1xuICB2YXIgaWQgPSArdGhpcztcbiAgaWYocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKXtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59XG5mdW5jdGlvbiBsaXN0bmVyKGV2ZW50KXtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZighc2V0VGFzayB8fCAhY2xlYXJUYXNrKXtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbil7XG4gICAgdmFyIGFyZ3MgPSBbXSwgaSA9IDE7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24oKXtcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCl7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmKHJlcXVpcmUoJy4vJC5jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIE1vZGVybiBicm93c2Vycywgc2tpcCBpbXBsZW1lbnRhdGlvbiBmb3IgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCwgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdG5lciwgZmFsc2UpO1xuICAvLyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZihNZXNzYWdlQ2hhbm5lbCl7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbDtcbiAgICBwb3J0ICAgID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiAgIHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07XG59LHtcIi4vJC5jb2ZcIjo3MSxcIi4vJC5jdHhcIjo3MyxcIi4vJC5kb20tY3JlYXRlXCI6NzYsXCIuLyQuZ2xvYmFsXCI6ODEsXCIuLyQuaHRtbFwiOjg0LFwiLi8kLmludm9rZVwiOjg1fV0sMTEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcbn0se31dLDExMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLyQudG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG59LHtcIi4vJC50by1pbnRlZ2VyXCI6MTEwfV0sMTEyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciBFUzVPYmplY3QgPSByZXF1aXJlKCcuLyQuZXM1LW9iamVjdCcpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHJlYWxTdHJpbmcpe1xuICByZXR1cm4gKHJlYWxTdHJpbmcgPyBPYmplY3QgOiBFUzVPYmplY3QpKGRlZmluZWQoaXQpKTtcbn07XG59LHtcIi4vJC5kZWZpbmVkXCI6NzUsXCIuLyQuZXM1LW9iamVjdFwiOjc4fV0sMTEzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xufSx7fV0sMTE0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfTtcbn0se31dLDExNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgc3RvcmUgID0gcmVxdWlyZSgnLi8kLnNoYXJlZCcpKCd3a3MnKVxuICAsIFN5bWJvbCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5TeW1ib2w7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBTeW1ib2wgJiYgU3ltYm9sW25hbWVdIHx8IChTeW1ib2wgfHwgcmVxdWlyZSgnLi8kLnVpZCcpKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xufSx7XCIuLyQuZ2xvYmFsXCI6ODEsXCIuLyQuc2hhcmVkXCI6MTAzLFwiLi8kLnVpZFwiOjExM31dLDExNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZCl7XG4gICAgcmV0dXJuIGl0W1N5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3IgfHwgJ0BAaXRlcmF0b3InXVxuICAgICAgfHwgaXRbSVRFUkFUT1JdXG4gICAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xuICB9XG59O1xufSx7XCIuLyQuY2xhc3NvZlwiOjcwLFwiLi8kLmNvcmVcIjo3MixcIi4vJC5nbG9iYWxcIjo4MSxcIi4vJC5pdGVyYXRvcnNcIjo5NCxcIi4vJC53a3NcIjoxMTV9XSwxMTc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgZ2V0ICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuY29yZScpLmdldEl0ZXJhdG9yID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG59LHtcIi4vJC5hbi1vYmplY3RcIjo2OCxcIi4vJC5jb3JlXCI6NzIsXCIuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZFwiOjExNn1dLDExODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgaGFzICAgICAgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTyAgICAgID0gT2JqZWN0KGl0KVxuICAgICwgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbiAgcmV0dXJuIChTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yIHx8ICdAQGl0ZXJhdG9yJykgaW4gT1xuICAgIHx8IElURVJBVE9SIGluIE9cbiAgICB8fCBoYXMoSXRlcmF0b3JzLCBjbGFzc29mKE8pKTtcbn07XG59LHtcIi4vJC5jbGFzc29mXCI6NzAsXCIuLyQuY29yZVwiOjcyLFwiLi8kLmdsb2JhbFwiOjgxLFwiLi8kLmhhc1wiOjgyLFwiLi8kLml0ZXJhdG9yc1wiOjk0LFwiLi8kLndrc1wiOjExNX1dLDExOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCAkZGVmICAgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vJC5pcy1hcnJheS1pdGVyJylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKVxuICAsIGdldEl0ZXJGbiAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogIXJlcXVpcmUoJy4vJC5pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLyosIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKi8pe1xuICAgIHZhciBPICAgICAgID0gdG9PYmplY3QoYXJyYXlMaWtlLCB0cnVlKVxuICAgICAgLCBDICAgICAgID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheVxuICAgICAgLCBtYXBmbiAgID0gYXJndW1lbnRzWzFdXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAsIGluZGV4ICAgPSAwXG4gICAgICAsIGl0ZXJGbiAgPSBnZXRJdGVyRm4oTylcbiAgICAgICwgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmKG1hcHBpbmcpbWFwZm4gPSBjdHgobWFwZm4sIGFyZ3VtZW50c1syXSwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpe1xuICAgICAgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4Kyspe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcihyZXN1bHQgPSBuZXcgQyhsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCkpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgICAgIHJlc3VsdFtpbmRleF0gPSBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG59LHtcIi4vJC5jdHhcIjo3MyxcIi4vJC5kZWZcIjo3NCxcIi4vJC5pcy1hcnJheS1pdGVyXCI6ODYsXCIuLyQuaXRlci1jYWxsXCI6ODksXCIuLyQuaXRlci1kZXRlY3RcIjo5MixcIi4vJC50by1sZW5ndGhcIjoxMTEsXCIuLyQudG8tb2JqZWN0XCI6MTEyLFwiLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2RcIjoxMTZ9XSwxMjA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIHNldFVuc2NvcGUgPSByZXF1aXJlKCcuLyQudW5zY29wZScpXG4gICwgc3RlcCAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyLXN0ZXAnKVxuICAsIEl0ZXJhdG9ycyAgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJylcbiAgLCB0b09iamVjdCAgID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuLyQuaXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9PYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5zZXRVbnNjb3BlKCdrZXlzJyk7XG5zZXRVbnNjb3BlKCd2YWx1ZXMnKTtcbnNldFVuc2NvcGUoJ2VudHJpZXMnKTtcbn0se1wiLi8kLml0ZXItZGVmaW5lXCI6OTEsXCIuLyQuaXRlci1zdGVwXCI6OTMsXCIuLyQuaXRlcmF0b3JzXCI6OTQsXCIuLyQudG8tb2JqZWN0XCI6MTEyLFwiLi8kLnVuc2NvcGVcIjoxMTR9XSwxMjE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuLyQuYXNzaWduJyl9KTtcbn0se1wiLi8kLmFzc2lnblwiOjY5LFwiLi8kLmRlZlwiOjc0fV0sMTIyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY29yZSAgICAgPSByZXF1aXJlKCcuLyQuY29yZScpXG4gICwgJGRlZiAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKVxuICAsIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xuJC5lYWNoLmNhbGwoKCdmcmVlemUsc2VhbCxwcmV2ZW50RXh0ZW5zaW9ucyxpc0Zyb3plbixpc1NlYWxlZCxpc0V4dGVuc2libGUsJyArXG4gICdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsZ2V0UHJvdG90eXBlT2Ysa2V5cyxnZXRPd25Qcm9wZXJ0eU5hbWVzJykuc3BsaXQoJywnKVxuLCBmdW5jdGlvbihLRVksIElEKXtcbiAgdmFyIGZuICAgICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZm9yY2VkID0gMFxuICAgICwgbWV0aG9kID0ge307XG4gIG1ldGhvZFtLRVldID0gSUQgPT0gMCA/IGZ1bmN0aW9uIGZyZWV6ZShpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IGl0O1xuICB9IDogSUQgPT0gMSA/IGZ1bmN0aW9uIHNlYWwoaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyBmbihpdCkgOiBpdDtcbiAgfSA6IElEID09IDIgPyBmdW5jdGlvbiBwcmV2ZW50RXh0ZW5zaW9ucyhpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IGl0O1xuICB9IDogSUQgPT0gMyA/IGZ1bmN0aW9uIGlzRnJvemVuKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gZm4oaXQpIDogdHJ1ZTtcbiAgfSA6IElEID09IDQgPyBmdW5jdGlvbiBpc1NlYWxlZChpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IHRydWU7XG4gIH0gOiBJRCA9PSA1ID8gZnVuY3Rpb24gaXNFeHRlbnNpYmxlKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gZm4oaXQpIDogZmFsc2U7XG4gIH0gOiBJRCA9PSA2ID8gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICAgIHJldHVybiBmbih0b09iamVjdChpdCksIGtleSk7XG4gIH0gOiBJRCA9PSA3ID8gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpe1xuICAgIHJldHVybiBmbih0b09iamVjdChpdCwgdHJ1ZSkpO1xuICB9IDogSUQgPT0gOCA/IGZ1bmN0aW9uIGtleXMoaXQpe1xuICAgIHJldHVybiBmbih0b09iamVjdChpdCkpO1xuICB9IDogcmVxdWlyZSgnLi8kLmdldC1uYW1lcycpLmdldDtcbiAgdHJ5IHtcbiAgICBmbigneicpO1xuICB9IGNhdGNoKGUpe1xuICAgIGZvcmNlZCA9IDE7XG4gIH1cbiAgJGRlZigkZGVmLlMgKyAkZGVmLkYgKiBmb3JjZWQsICdPYmplY3QnLCBtZXRob2QpO1xufSk7XG59LHtcIi4vJFwiOjk1LFwiLi8kLmNvcmVcIjo3MixcIi4vJC5kZWZcIjo3NCxcIi4vJC5nZXQtbmFtZXNcIjo4MCxcIi4vJC5pcy1vYmplY3RcIjo4NyxcIi4vJC50by1vYmplY3RcIjoxMTJ9XSwxMjM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG59LHt9XSwxMjQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIExJQlJBUlkgICAgPSByZXF1aXJlKCcuLyQubGlicmFyeScpXG4gICwgZ2xvYmFsICAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGN0eCAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBjbGFzc29mICAgID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsICRkZWYgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBpc09iamVjdCAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiAgPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpXG4gICwgc3RyaWN0TmV3ICA9IHJlcXVpcmUoJy4vJC5zdHJpY3QtbmV3JylcbiAgLCBmb3JPZiAgICAgID0gcmVxdWlyZSgnLi8kLmZvci1vZicpXG4gICwgc2V0UHJvdG8gICA9IHJlcXVpcmUoJy4vJC5zZXQtcHJvdG8nKS5zZXRcbiAgLCBzYW1lICAgICAgID0gcmVxdWlyZSgnLi8kLnNhbWUnKVxuICAsIHNwZWNpZXMgICAgPSByZXF1aXJlKCcuLyQuc3BlY2llcycpXG4gICwgU1BFQ0lFUyAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpXG4gICwgUkVDT1JEICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKSgncmVjb3JkJylcbiAgLCBQUk9NSVNFICAgID0gJ1Byb21pc2UnXG4gICwgcHJvY2VzcyAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgaXNOb2RlICAgICA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnXG4gICwgYXNhcCAgICAgICA9IHByb2Nlc3MgJiYgcHJvY2Vzcy5uZXh0VGljayB8fCByZXF1aXJlKCcuLyQudGFzaycpLnNldFxuICAsIFAgICAgICAgICAgPSBnbG9iYWxbUFJPTUlTRV1cbiAgLCBXcmFwcGVyO1xuXG5mdW5jdGlvbiB0ZXN0UmVzb2x2ZShzdWIpe1xuICB2YXIgdGVzdCA9IG5ldyBQKGZ1bmN0aW9uKCl7fSk7XG4gIGlmKHN1Yil0ZXN0LmNvbnN0cnVjdG9yID0gT2JqZWN0O1xuICByZXR1cm4gUC5yZXNvbHZlKHRlc3QpID09PSB0ZXN0O1xufVxuXG52YXIgdXNlTmF0aXZlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHdvcmtzID0gZmFsc2U7XG4gIGZ1bmN0aW9uIFAyKHgpe1xuICAgIHZhciBzZWxmID0gbmV3IFAoeCk7XG4gICAgc2V0UHJvdG8oc2VsZiwgUDIucHJvdG90eXBlKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuICB0cnkge1xuICAgIHdvcmtzID0gUCAmJiBQLnJlc29sdmUgJiYgdGVzdFJlc29sdmUoKTtcbiAgICBzZXRQcm90byhQMiwgUCk7XG4gICAgUDIucHJvdG90eXBlID0gJC5jcmVhdGUoUC5wcm90b3R5cGUsIHtjb25zdHJ1Y3Rvcjoge3ZhbHVlOiBQMn19KTtcbiAgICAvLyBhY3R1YWwgRmlyZWZveCBoYXMgYnJva2VuIHN1YmNsYXNzIHN1cHBvcnQsIHRlc3QgdGhhdFxuICAgIGlmKCEoUDIucmVzb2x2ZSg1KS50aGVuKGZ1bmN0aW9uKCl7fSkgaW5zdGFuY2VvZiBQMikpe1xuICAgICAgd29ya3MgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gYWN0dWFsIFY4IGJ1ZywgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxNjJcbiAgICBpZih3b3JrcyAmJiByZXF1aXJlKCcuLyQuc3VwcG9ydC1kZXNjJykpe1xuICAgICAgdmFyIHRoZW5hYmxlVGhlbkdvdHRlbiA9IGZhbHNlO1xuICAgICAgUC5yZXNvbHZlKCQuc2V0RGVzYyh7fSwgJ3RoZW4nLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKXsgdGhlbmFibGVUaGVuR290dGVuID0gdHJ1ZTsgfVxuICAgICAgfSkpO1xuICAgICAgd29ya3MgPSB0aGVuYWJsZVRoZW5Hb3R0ZW47XG4gICAgfVxuICB9IGNhdGNoKGUpeyB3b3JrcyA9IGZhbHNlOyB9XG4gIHJldHVybiB3b3Jrcztcbn0oKTtcblxuLy8gaGVscGVyc1xuZnVuY3Rpb24gaXNQcm9taXNlKGl0KXtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiAodXNlTmF0aXZlID8gY2xhc3NvZihpdCkgPT0gJ1Byb21pc2UnIDogUkVDT1JEIGluIGl0KTtcbn1cbmZ1bmN0aW9uIHNhbWVDb25zdHJ1Y3RvcihhLCBiKXtcbiAgLy8gbGlicmFyeSB3cmFwcGVyIHNwZWNpYWwgY2FzZVxuICBpZihMSUJSQVJZICYmIGEgPT09IFAgJiYgYiA9PT0gV3JhcHBlcilyZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIHNhbWUoYSwgYik7XG59XG5mdW5jdGlvbiBnZXRDb25zdHJ1Y3RvcihDKXtcbiAgdmFyIFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXTtcbiAgcmV0dXJuIFMgIT0gdW5kZWZpbmVkID8gUyA6IEM7XG59XG5mdW5jdGlvbiBpc1RoZW5hYmxlKGl0KXtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn1cbmZ1bmN0aW9uIG5vdGlmeShyZWNvcmQsIGlzUmVqZWN0KXtcbiAgaWYocmVjb3JkLm4pcmV0dXJuO1xuICByZWNvcmQubiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHJlY29yZC5jO1xuICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gIGFzYXAuY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gcmVjb3JkLnZcbiAgICAgICwgb2sgICAgPSByZWNvcmQucyA9PSAxXG4gICAgICAsIGkgICAgID0gMDtcbiAgICBmdW5jdGlvbiBydW4ocmVhY3Qpe1xuICAgICAgdmFyIGNiID0gb2sgPyByZWFjdC5vayA6IHJlYWN0LmZhaWxcbiAgICAgICAgLCByZXQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZihjYil7XG4gICAgICAgICAgaWYoIW9rKXJlY29yZC5oID0gdHJ1ZTtcbiAgICAgICAgICByZXQgPSBjYiA9PT0gdHJ1ZSA/IHZhbHVlIDogY2IodmFsdWUpO1xuICAgICAgICAgIGlmKHJldCA9PT0gcmVhY3QuUCl7XG4gICAgICAgICAgICByZWFjdC5yZWooVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZih0aGVuID0gaXNUaGVuYWJsZShyZXQpKXtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXQsIHJlYWN0LnJlcywgcmVhY3QucmVqKTtcbiAgICAgICAgICB9IGVsc2UgcmVhY3QucmVzKHJldCk7XG4gICAgICAgIH0gZWxzZSByZWFjdC5yZWoodmFsdWUpO1xuICAgICAgfSBjYXRjaChlcnIpe1xuICAgICAgICByZWFjdC5yZWooZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUoY2hhaW4ubGVuZ3RoID4gaSlydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgY2hhaW4ubGVuZ3RoID0gMDtcbiAgICByZWNvcmQubiA9IGZhbHNlO1xuICAgIGlmKGlzUmVqZWN0KXNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIGFzYXAuY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKGlzVW5oYW5kbGVkKHJlY29yZC5wKSl7XG4gICAgICAgICAgaWYoaXNOb2RlKXtcbiAgICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHJlY29yZC5wKTtcbiAgICAgICAgICB9IGVsc2UgaWYoZ2xvYmFsLmNvbnNvbGUgJiYgY29uc29sZS5lcnJvcil7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlY29yZC5hID0gdW5kZWZpbmVkO1xuICAgICAgfSk7XG4gICAgfSwgMSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gaXNVbmhhbmRsZWQocHJvbWlzZSl7XG4gIHZhciByZWNvcmQgPSBwcm9taXNlW1JFQ09SRF1cbiAgICAsIGNoYWluICA9IHJlY29yZC5hIHx8IHJlY29yZC5jXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZWFjdDtcbiAgaWYocmVjb3JkLmgpcmV0dXJuIGZhbHNlO1xuICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXtcbiAgICByZWFjdCA9IGNoYWluW2krK107XG4gICAgaWYocmVhY3QuZmFpbCB8fCAhaXNVbmhhbmRsZWQocmVhY3QuUCkpcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gJHJlamVjdCh2YWx1ZSl7XG4gIHZhciByZWNvcmQgPSB0aGlzO1xuICBpZihyZWNvcmQuZClyZXR1cm47XG4gIHJlY29yZC5kID0gdHJ1ZTtcbiAgcmVjb3JkID0gcmVjb3JkLnIgfHwgcmVjb3JkOyAvLyB1bndyYXBcbiAgcmVjb3JkLnYgPSB2YWx1ZTtcbiAgcmVjb3JkLnMgPSAyO1xuICByZWNvcmQuYSA9IHJlY29yZC5jLnNsaWNlKCk7XG4gIG5vdGlmeShyZWNvcmQsIHRydWUpO1xufVxuZnVuY3Rpb24gJHJlc29sdmUodmFsdWUpe1xuICB2YXIgcmVjb3JkID0gdGhpc1xuICAgICwgdGhlbjtcbiAgaWYocmVjb3JkLmQpcmV0dXJuO1xuICByZWNvcmQuZCA9IHRydWU7XG4gIHJlY29yZCA9IHJlY29yZC5yIHx8IHJlY29yZDsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKXtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIGFzYXAuY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3cmFwcGVyID0ge3I6IHJlY29yZCwgZDogZmFsc2V9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlY29yZC52ID0gdmFsdWU7XG4gICAgICByZWNvcmQucyA9IDE7XG4gICAgICBub3RpZnkocmVjb3JkLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoKGUpe1xuICAgICRyZWplY3QuY2FsbCh7cjogcmVjb3JkLCBkOiBmYWxzZX0sIGUpOyAvLyB3cmFwXG4gIH1cbn1cblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmKCF1c2VOYXRpdmUpe1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICBQID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICB2YXIgcmVjb3JkID0ge1xuICAgICAgcDogc3RyaWN0TmV3KHRoaXMsIFAsIFBST01JU0UpLCAgICAgICAgIC8vIDwtIHByb21pc2VcbiAgICAgIGM6IFtdLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBhd2FpdGluZyByZWFjdGlvbnNcbiAgICAgIGE6IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgICAgczogMCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgICBkOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gZG9uZVxuICAgICAgdjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHZhbHVlXG4gICAgICBoOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gaGFuZGxlZCByZWplY3Rpb25cbiAgICAgIG46IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBub3RpZnlcbiAgICB9O1xuICAgIHRoaXNbUkVDT1JEXSA9IHJlY29yZDtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCByZWNvcmQsIDEpLCBjdHgoJHJlamVjdCwgcmVjb3JkLCAxKSk7XG4gICAgfSBjYXRjaChlcnIpe1xuICAgICAgJHJlamVjdC5jYWxsKHJlY29yZCwgZXJyKTtcbiAgICB9XG4gIH07XG4gIHJlcXVpcmUoJy4vJC5taXgnKShQLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCl7XG4gICAgICB2YXIgUyA9IGFuT2JqZWN0KGFuT2JqZWN0KHRoaXMpLmNvbnN0cnVjdG9yKVtTUEVDSUVTXTtcbiAgICAgIHZhciByZWFjdCA9IHtcbiAgICAgICAgb2s6ICAgdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWUsXG4gICAgICAgIGZhaWw6IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgID8gb25SZWplY3RlZCAgOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIHZhciBwcm9taXNlID0gcmVhY3QuUCA9IG5ldyAoUyAhPSB1bmRlZmluZWQgPyBTIDogUCkoZnVuY3Rpb24ocmVzLCByZWope1xuICAgICAgICByZWFjdC5yZXMgPSBhRnVuY3Rpb24ocmVzKTtcbiAgICAgICAgcmVhY3QucmVqID0gYUZ1bmN0aW9uKHJlaik7XG4gICAgICB9KTtcbiAgICAgIHZhciByZWNvcmQgPSB0aGlzW1JFQ09SRF07XG4gICAgICByZWNvcmQuYy5wdXNoKHJlYWN0KTtcbiAgICAgIGlmKHJlY29yZC5hKXJlY29yZC5hLnB1c2gocmVhY3QpO1xuICAgICAgaWYocmVjb3JkLnMpbm90aWZ5KHJlY29yZCwgZmFsc2UpO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpe1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIGV4cG9ydFxuJGRlZigkZGVmLkcgKyAkZGVmLlcgKyAkZGVmLkYgKiAhdXNlTmF0aXZlLCB7UHJvbWlzZTogUH0pO1xucmVxdWlyZSgnLi8kLnRhZycpKFAsIFBST01JU0UpO1xuc3BlY2llcyhQKTtcbnNwZWNpZXMoV3JhcHBlciA9IHJlcXVpcmUoJy4vJC5jb3JlJylbUFJPTUlTRV0pO1xuXG4vLyBzdGF0aWNzXG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICF1c2VOYXRpdmUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocil7XG4gICAgcmV0dXJuIG5ldyB0aGlzKGZ1bmN0aW9uKHJlcywgcmVqKXsgcmVqKHIpOyB9KTtcbiAgfVxufSk7XG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICghdXNlTmF0aXZlIHx8IHRlc3RSZXNvbHZlKHRydWUpKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KXtcbiAgICByZXR1cm4gaXNQcm9taXNlKHgpICYmIHNhbWVDb25zdHJ1Y3Rvcih4LmNvbnN0cnVjdG9yLCB0aGlzKVxuICAgICAgPyB4IDogbmV3IHRoaXMoZnVuY3Rpb24ocmVzKXsgcmVzKHgpOyB9KTtcbiAgfVxufSk7XG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICEodXNlTmF0aXZlICYmIHJlcXVpcmUoJy4vJC5pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpe1xuICBQLmFsbChpdGVyKVsnY2F0Y2gnXShmdW5jdGlvbigpe30pO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSl7XG4gICAgdmFyIEMgICAgICA9IGdldENvbnN0cnVjdG9yKHRoaXMpXG4gICAgICAsIHZhbHVlcyA9IFtdO1xuICAgIHJldHVybiBuZXcgQyhmdW5jdGlvbihyZXMsIHJlail7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIHZhbHVlcy5wdXNoLCB2YWx1ZXMpO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IHZhbHVlcy5sZW5ndGhcbiAgICAgICAgLCByZXN1bHRzICAgPSBBcnJheShyZW1haW5pbmcpO1xuICAgICAgaWYocmVtYWluaW5nKSQuZWFjaC5jYWxsKHZhbHVlcywgZnVuY3Rpb24ocHJvbWlzZSwgaW5kZXgpe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXMocmVzdWx0cyk7XG4gICAgICAgIH0sIHJlaik7XG4gICAgICB9KTtcbiAgICAgIGVsc2UgcmVzKHJlc3VsdHMpO1xuICAgIH0pO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpe1xuICAgIHZhciBDID0gZ2V0Q29uc3RydWN0b3IodGhpcyk7XG4gICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24ocHJvbWlzZSl7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKHJlcywgcmVqKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59KTtcbn0se1wiLi8kXCI6OTUsXCIuLyQuYS1mdW5jdGlvblwiOjY3LFwiLi8kLmFuLW9iamVjdFwiOjY4LFwiLi8kLmNsYXNzb2ZcIjo3MCxcIi4vJC5jb3JlXCI6NzIsXCIuLyQuY3R4XCI6NzMsXCIuLyQuZGVmXCI6NzQsXCIuLyQuZm9yLW9mXCI6NzksXCIuLyQuZ2xvYmFsXCI6ODEsXCIuLyQuaXMtb2JqZWN0XCI6ODcsXCIuLyQuaXRlci1kZXRlY3RcIjo5MixcIi4vJC5saWJyYXJ5XCI6OTcsXCIuLyQubWl4XCI6OTgsXCIuLyQuc2FtZVwiOjEwMSxcIi4vJC5zZXQtcHJvdG9cIjoxMDIsXCIuLyQuc3BlY2llc1wiOjEwNCxcIi4vJC5zdHJpY3QtbmV3XCI6MTA1LFwiLi8kLnN1cHBvcnQtZGVzY1wiOjEwNyxcIi4vJC50YWdcIjoxMDgsXCIuLyQudGFza1wiOjEwOSxcIi4vJC51aWRcIjoxMTMsXCIuLyQud2tzXCI6MTE1fV0sMTI1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciAkYXQgID0gcmVxdWlyZSgnLi8kLnN0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuLyQuaXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTtcbn0se1wiLi8kLml0ZXItZGVmaW5lXCI6OTEsXCIuLyQuc3RyaW5nLWF0XCI6MTA2fV0sMTI2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciAkICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIFNVUFBPUlRfREVTQyAgID0gcmVxdWlyZSgnLi8kLnN1cHBvcnQtZGVzYycpXG4gICwgJGRlZiAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkcmVkZWYgICAgICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZicpXG4gICwgc2hhcmVkICAgICAgICAgPSByZXF1aXJlKCcuLyQuc2hhcmVkJylcbiAgLCBzZXRUYWcgICAgICAgICA9IHJlcXVpcmUoJy4vJC50YWcnKVxuICAsIHVpZCAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpXG4gICwgd2tzICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQud2tzJylcbiAgLCBrZXlPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5rZXlvZicpXG4gICwgJG5hbWVzICAgICAgICAgPSByZXF1aXJlKCcuLyQuZ2V0LW5hbWVzJylcbiAgLCBlbnVtS2V5cyAgICAgICA9IHJlcXVpcmUoJy4vJC5lbnVtLWtleXMnKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgdG9PYmplY3QgICAgICAgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0JylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJylcbiAgLCBnZXREZXNjICAgICAgICA9ICQuZ2V0RGVzY1xuICAsIHNldERlc2MgICAgICAgID0gJC5zZXREZXNjXG4gICwgJGNyZWF0ZSAgICAgICAgPSAkLmNyZWF0ZVxuICAsIGdldE5hbWVzICAgICAgID0gJG5hbWVzLmdldFxuICAsICRTeW1ib2wgICAgICAgID0gZ2xvYmFsLlN5bWJvbFxuICAsIHNldHRlciAgICAgICAgID0gZmFsc2VcbiAgLCBISURERU4gICAgICAgICA9IHdrcygnX2hpZGRlbicpXG4gICwgaXNFbnVtICAgICAgICAgPSAkLmlzRW51bVxuICAsIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKVxuICAsIEFsbFN5bWJvbHMgICAgID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCB1c2VOYXRpdmUgICAgICA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbidcbiAgLCBPYmplY3RQcm90byAgICA9IE9iamVjdC5wcm90b3R5cGU7XG5cbnZhciBzZXRTeW1ib2xEZXNjID0gU1VQUE9SVF9ERVNDID8gZnVuY3Rpb24oKXsgLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkXG4gIHRyeSB7XG4gICAgcmV0dXJuICRjcmVhdGUoc2V0RGVzYyh7fSwgSElEREVOLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBzZXREZXNjKHRoaXMsIEhJRERFTiwge3ZhbHVlOiBmYWxzZX0pW0hJRERFTl07XG4gICAgICB9XG4gICAgfSkpW0hJRERFTl0gfHwgc2V0RGVzYztcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gZnVuY3Rpb24oaXQsIGtleSwgRCl7XG4gICAgICB2YXIgcHJvdG9EZXNjID0gZ2V0RGVzYyhPYmplY3RQcm90bywga2V5KTtcbiAgICAgIGlmKHByb3RvRGVzYylkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgICAgIHNldERlc2MoaXQsIGtleSwgRCk7XG4gICAgICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKXNldERlc2MoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbiAgICB9O1xuICB9XG59KCkgOiBzZXREZXNjO1xuXG5mdW5jdGlvbiB3cmFwKHRhZyl7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSAkY3JlYXRlKCRTeW1ib2wucHJvdG90eXBlKTtcbiAgc3ltLl9rID0gdGFnO1xuICBTVVBQT1JUX0RFU0MgJiYgc2V0dGVyICYmIHNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHN5bTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkpe1xuICAgIGlmKCFELmVudW1lcmFibGUpe1xuICAgICAgaWYoIWhhcyhpdCwgSElEREVOKSlzZXREZXNjKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gJGNyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBzZXREZXNjKGl0LCBrZXksIEQpO1xufVxuZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCl7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9PYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKWRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZShpdCwgUCl7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyAkY3JlYXRlKGl0KSA6IGRlZmluZVByb3BlcnRpZXMoJGNyZWF0ZShpdCksIFApO1xufVxuZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KXtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkpO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldXG4gICAgPyBFIDogdHJ1ZTtcbn1cbmZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgdmFyIEQgPSBnZXREZXNjKGl0ID0gdG9PYmplY3QoaXQpLCBrZXkpO1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59XG5mdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdldE5hbWVzKHRvT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOKXJlc3VsdC5wdXNoKGtleSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ2V0TmFtZXModG9PYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkpcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZighdXNlTmF0aXZlKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG4gICAgcmV0dXJuIHdyYXAodWlkKGFyZ3VtZW50c1swXSkpO1xuICB9O1xuICAkcmVkZWYoJFN5bWJvbC5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICQuY3JlYXRlICAgICA9IGNyZWF0ZTtcbiAgJC5pc0VudW0gICAgID0gcHJvcGVydHlJc0VudW1lcmFibGU7XG4gICQuZ2V0RGVzYyAgICA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJC5zZXREZXNjICAgID0gZGVmaW5lUHJvcGVydHk7XG4gICQuc2V0RGVzY3MgICA9IGRlZmluZVByb3BlcnRpZXM7XG4gICQuZ2V0TmFtZXMgICA9ICRuYW1lcy5nZXQgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICAkLmdldFN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoU1VQUE9SVF9ERVNDICYmICFyZXF1aXJlKCcuLyQubGlicmFyeScpKXtcbiAgICAkcmVkZWYoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsIHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxufVxuXG52YXIgc3ltYm9sU3RhdGljcyA9IHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioa2V5KXtcbiAgICByZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24oKXsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSBmYWxzZTsgfVxufTtcbi8vIDE5LjQuMi4yIFN5bWJvbC5oYXNJbnN0YW5jZVxuLy8gMTkuNC4yLjMgU3ltYm9sLmlzQ29uY2F0U3ByZWFkYWJsZVxuLy8gMTkuNC4yLjQgU3ltYm9sLml0ZXJhdG9yXG4vLyAxOS40LjIuNiBTeW1ib2wubWF0Y2hcbi8vIDE5LjQuMi44IFN5bWJvbC5yZXBsYWNlXG4vLyAxOS40LjIuOSBTeW1ib2wuc2VhcmNoXG4vLyAxOS40LjIuMTAgU3ltYm9sLnNwZWNpZXNcbi8vIDE5LjQuMi4xMSBTeW1ib2wuc3BsaXRcbi8vIDE5LjQuMi4xMiBTeW1ib2wudG9QcmltaXRpdmVcbi8vIDE5LjQuMi4xMyBTeW1ib2wudG9TdHJpbmdUYWdcbi8vIDE5LjQuMi4xNCBTeW1ib2wudW5zY29wYWJsZXNcbiQuZWFjaC5jYWxsKChcbiAgICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLCcgK1xuICAgICdzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuICApLnNwbGl0KCcsJyksIGZ1bmN0aW9uKGl0KXtcbiAgICB2YXIgc3ltID0gd2tzKGl0KTtcbiAgICBzeW1ib2xTdGF0aWNzW2l0XSA9IHVzZU5hdGl2ZSA/IHN5bSA6IHdyYXAoc3ltKTtcbiAgfVxuKTtcblxuc2V0dGVyID0gdHJ1ZTtcblxuJGRlZigkZGVmLkcgKyAkZGVmLlcsIHtTeW1ib2w6ICRTeW1ib2x9KTtcblxuJGRlZigkZGVmLlMsICdTeW1ib2wnLCBzeW1ib2xTdGF0aWNzKTtcblxuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhdXNlTmF0aXZlLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6IGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiBkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiBnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTtcbn0se1wiLi8kXCI6OTUsXCIuLyQuYW4tb2JqZWN0XCI6NjgsXCIuLyQuZGVmXCI6NzQsXCIuLyQuZW51bS1rZXlzXCI6NzcsXCIuLyQuZ2V0LW5hbWVzXCI6ODAsXCIuLyQuZ2xvYmFsXCI6ODEsXCIuLyQuaGFzXCI6ODIsXCIuLyQua2V5b2ZcIjo5NixcIi4vJC5saWJyYXJ5XCI6OTcsXCIuLyQucHJvcGVydHktZGVzY1wiOjk5LFwiLi8kLnJlZGVmXCI6MTAwLFwiLi8kLnNoYXJlZFwiOjEwMyxcIi4vJC5zdXBwb3J0LWRlc2NcIjoxMDcsXCIuLyQudGFnXCI6MTA4LFwiLi8kLnRvLW9iamVjdFwiOjExMixcIi4vJC51aWRcIjoxMTMsXCIuLyQud2tzXCI6MTE1fV0sMTI3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpO1xuSXRlcmF0b3JzLk5vZGVMaXN0ID0gSXRlcmF0b3JzLkhUTUxDb2xsZWN0aW9uID0gSXRlcmF0b3JzLkFycmF5O1xufSx7XCIuLyQuaXRlcmF0b3JzXCI6OTQsXCIuL2VzNi5hcnJheS5pdGVyYXRvclwiOjEyMH1dLDEyODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG4vLyBUaGlzIG1ldGhvZCBvZiBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QgbmVlZHMgdG8gYmVcbi8vIGtlcHQgaWRlbnRpY2FsIHRvIHRoZSB3YXkgaXQgaXMgb2J0YWluZWQgaW4gcnVudGltZS5qc1xudmFyIGcgPVxuICB0eXBlb2YgZ2xvYmFsID09PSBcIm9iamVjdFwiID8gZ2xvYmFsIDpcbiAgdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiA/IHdpbmRvdyA6XG4gIHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiID8gc2VsZiA6IHRoaXM7XG5cbi8vIFVzZSBgZ2V0T3duUHJvcGVydHlOYW1lc2AgYmVjYXVzZSBub3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgY2FsbGluZ1xuLy8gYGhhc093blByb3BlcnR5YCBvbiB0aGUgZ2xvYmFsIGBzZWxmYCBvYmplY3QgaW4gYSB3b3JrZXIuIFNlZSAjMTgzLlxudmFyIGhhZFJ1bnRpbWUgPSBnLnJlZ2VuZXJhdG9yUnVudGltZSAmJlxuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhnKS5pbmRleE9mKFwicmVnZW5lcmF0b3JSdW50aW1lXCIpID49IDA7XG5cbi8vIFNhdmUgdGhlIG9sZCByZWdlbmVyYXRvclJ1bnRpbWUgaW4gY2FzZSBpdCBuZWVkcyB0byBiZSByZXN0b3JlZCBsYXRlci5cbnZhciBvbGRSdW50aW1lID0gaGFkUnVudGltZSAmJiBnLnJlZ2VuZXJhdG9yUnVudGltZTtcblxuLy8gRm9yY2UgcmVldmFsdXRhdGlvbiBvZiBydW50aW1lLmpzLlxuZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vcnVudGltZVwiKTtcblxuaWYgKGhhZFJ1bnRpbWUpIHtcbiAgLy8gUmVzdG9yZSB0aGUgb3JpZ2luYWwgcnVudGltZS5cbiAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBvbGRSdW50aW1lO1xufSBlbHNlIHtcbiAgLy8gUmVtb3ZlIHRoZSBnbG9iYWwgcHJvcGVydHkgYWRkZWQgYnkgcnVudGltZS5qcy5cbiAgZGVsZXRlIGcucmVnZW5lcmF0b3JSdW50aW1lO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IG1vZHVsZS5leHBvcnRzLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCIuL3J1bnRpbWVcIjoxMjl9XSwxMjk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCl7XG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBodHRwczovL3Jhdy5naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL21hc3Rlci9MSUNFTlNFIGZpbGUuIEFuXG4gKiBhZGRpdGlvbmFsIGdyYW50IG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW5cbiAqIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9TeW1ib2wgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfU3ltYm9sJGl0ZXJhdG9yID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX09iamVjdCRjcmVhdGUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGVcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX1Byb21pc2UgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2VcIilbXCJkZWZhdWx0XCJdO1xuXG4hKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSB0eXBlb2YgX1N5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF9TeW1ib2wkaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG5cbiAgdmFyIGluTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIjtcbiAgdmFyIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO1xuICBpZiAocnVudGltZSkge1xuICAgIGlmIChpbk1vZHVsZSkge1xuICAgICAgLy8gSWYgcmVnZW5lcmF0b3JSdW50aW1lIGlzIGRlZmluZWQgZ2xvYmFsbHkgYW5kIHdlJ3JlIGluIGEgbW9kdWxlLFxuICAgICAgLy8gbWFrZSB0aGUgZXhwb3J0cyBvYmplY3QgaWRlbnRpY2FsIHRvIHJlZ2VuZXJhdG9yUnVudGltZS5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGV2YWx1YXRpbmcgdGhlIHJlc3Qgb2YgdGhpcyBmaWxlIGlmIHRoZSBydW50aW1lIHdhc1xuICAgIC8vIGFscmVhZHkgZGVmaW5lZCBnbG9iYWxseS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgLy8gbW9kdWxlLmV4cG9ydHMgKGlmIHdlJ3JlIGluIGEgbW9kdWxlKSBvciBhIG5ldywgZW1wdHkgb2JqZWN0LlxuICBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZSA9IGluTW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgOiB7fTtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgZ2VuZXJhdG9yID0gX09iamVjdCRjcmVhdGUoKG91dGVyRm4gfHwgR2VuZXJhdG9yKS5wcm90b3R5cGUpO1xuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYgfHwgbnVsbCwgbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pKTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IF9PYmplY3QkY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgdmFsdWUgaW5zdGFuY2VvZiBBd2FpdEFyZ3VtZW50YCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC4gU29tZSBtYXkgY29uc2lkZXIgdGhlIG5hbWUgb2YgdGhpcyBtZXRob2QgdG9vXG4gIC8vIGN1dGVzeSwgYnV0IHRoZXkgYXJlIGN1cm11ZGdlb25zLlxuICBydW50aW1lLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiBuZXcgQXdhaXRBcmd1bWVudChhcmcpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIEF3YWl0QXJndW1lbnQoYXJnKSB7XG4gICAgdGhpcy5hcmcgPSBhcmc7XG4gIH1cblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIC8vIFRoaXMgaW52b2tlIGZ1bmN0aW9uIGlzIHdyaXR0ZW4gaW4gYSBzdHlsZSB0aGF0IGFzc3VtZXMgc29tZVxuICAgIC8vIGNhbGxpbmcgZnVuY3Rpb24gKG9yIFByb21pc2UpIHdpbGwgaGFuZGxlIGV4Y2VwdGlvbnMuXG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW21ldGhvZF0oYXJnKTtcbiAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEF3YWl0QXJndW1lbnQgPyBfUHJvbWlzZS5yZXNvbHZlKHZhbHVlLmFyZykudGhlbihpbnZva2VOZXh0LCBpbnZva2VUaHJvdykgOiBfUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLiBJZiB0aGUgUHJvbWlzZSBpcyByZWplY3RlZCwgaG93ZXZlciwgdGhlXG4gICAgICAgIC8vIHJlc3VsdCBmb3IgdGhpcyBpdGVyYXRpb24gd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzYW1lXG4gICAgICAgIC8vIHJlYXNvbi4gTm90ZSB0aGF0IHJlamVjdGlvbnMgb2YgeWllbGRlZCBQcm9taXNlcyBhcmUgbm90XG4gICAgICAgIC8vIHRocm93biBiYWNrIGludG8gdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgYXMgaXMgdGhlIGNhc2VcbiAgICAgICAgLy8gd2hlbiBhbiBhd2FpdGVkIFByb21pc2UgaXMgcmVqZWN0ZWQuIFRoaXMgZGlmZmVyZW5jZSBpblxuICAgICAgICAvLyBiZWhhdmlvciBiZXR3ZWVuIHlpZWxkIGFuZCBhd2FpdCBpcyBpbXBvcnRhbnQsIGJlY2F1c2UgaXRcbiAgICAgICAgLy8gYWxsb3dzIHRoZSBjb25zdW1lciB0byBkZWNpZGUgd2hhdCB0byBkbyB3aXRoIHRoZSB5aWVsZGVkXG4gICAgICAgIC8vIHJlamVjdGlvbiAoc3dhbGxvdyBpdCBhbmQgY29udGludWUsIG1hbnVhbGx5IC50aHJvdyBpdCBiYWNrXG4gICAgICAgIC8vIGludG8gdGhlIGdlbmVyYXRvciwgYWJhbmRvbiBpdGVyYXRpb24sIHdoYXRldmVyKS4gV2l0aFxuICAgICAgICAvLyBhd2FpdCwgYnkgY29udHJhc3QsIHRoZXJlIGlzIG5vIG9wcG9ydHVuaXR5IHRvIGV4YW1pbmUgdGhlXG4gICAgICAgIC8vIHJlamVjdGlvbiByZWFzb24gb3V0c2lkZSB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBzbyB0aGVcbiAgICAgICAgLy8gb25seSBvcHRpb24gaXMgdG8gdGhyb3cgaXQgZnJvbSB0aGUgYXdhaXQgZXhwcmVzc2lvbiwgYW5kXG4gICAgICAgIC8vIGxldCB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhbmRsZSB0aGUgZXhjZXB0aW9uLlxuICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy5kb21haW4pIHtcbiAgICAgIGludm9rZSA9IHByb2Nlc3MuZG9tYWluLmJpbmQoaW52b2tlKTtcbiAgICB9XG5cbiAgICB2YXIgaW52b2tlTmV4dCA9IGludm9rZS5iaW5kKGdlbmVyYXRvciwgXCJuZXh0XCIpO1xuICAgIHZhciBpbnZva2VUaHJvdyA9IGludm9rZS5iaW5kKGdlbmVyYXRvciwgXCJ0aHJvd1wiKTtcbiAgICB2YXIgaW52b2tlUmV0dXJuID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcInJldHVyblwiKTtcbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgdmFyIGVucXVldWVSZXN1bHQgPVxuICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KSA6IG5ldyBfUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICByZXNvbHZlKGludm9rZShtZXRob2QsIGFyZykpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGVucXVldWVSZXN1bHQgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnlcbiAgICAgIC8vIGxhdGVyIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgIHByZXZpb3VzUHJvbWlzZSA9IGVucXVldWVSZXN1bHRbXCJjYXRjaFwiXShmdW5jdGlvbiAoaWdub3JlZCkge30pO1xuXG4gICAgICByZXR1cm4gZW5xdWV1ZVJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICBpZiAobWV0aG9kID09PSBcInJldHVyblwiIHx8IG1ldGhvZCA9PT0gXCJ0aHJvd1wiICYmIGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gQSByZXR1cm4gb3IgdGhyb3cgKHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyB0aHJvd1xuICAgICAgICAgICAgLy8gbWV0aG9kKSBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgICAgdmFyIHJldHVybk1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdO1xuICAgICAgICAgICAgaWYgKHJldHVybk1ldGhvZCkge1xuICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gocmV0dXJuTWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgYXJnKTtcbiAgICAgICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcmV0dXJuIG1ldGhvZCB0aHJldyBhbiBleGNlcHRpb24sIGxldCB0aGF0XG4gICAgICAgICAgICAgICAgLy8gZXhjZXB0aW9uIHByZXZhaWwgb3ZlciB0aGUgb3JpZ2luYWwgcmV0dXJuIG9yIHRocm93LlxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICAgICAgLy8gQ29udGludWUgd2l0aCB0aGUgb3V0ZXIgcmV0dXJuLCBub3cgdGhhdCB0aGUgZGVsZWdhdGVcbiAgICAgICAgICAgICAgLy8gaXRlcmF0b3IgaGFzIGJlZW4gdGVybWluYXRlZC5cbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0sIGRlbGVnYXRlLml0ZXJhdG9yLCBhcmcpO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBMaWtlIHJldHVybmluZyBnZW5lcmF0b3IudGhyb3codW5jYXVnaHQpLCBidXQgd2l0aG91dCB0aGVcbiAgICAgICAgICAgIC8vIG92ZXJoZWFkIG9mIGFuIGV4dHJhIGZ1bmN0aW9uIGNhbGwuXG4gICAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRGVsZWdhdGUgZ2VuZXJhdG9yIHJhbiBhbmQgaGFuZGxlZCBpdHMgb3duIGV4Y2VwdGlvbnMgc29cbiAgICAgICAgICAvLyByZWdhcmRsZXNzIG9mIHdoYXQgdGhlIG1ldGhvZCB3YXMsIHdlIGNvbnRpbnVlIGFzIGlmIGl0IGlzXG4gICAgICAgICAgLy8gXCJuZXh0XCIgd2l0aCBhbiB1bmRlZmluZWQgYXJnLlxuICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICAgICAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcbiAgICAgICAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkWWllbGQpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2VudCA9IGFyZztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBhcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBHZW5TdGF0ZUNvbXBsZXRlZCA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICB2YXIgaW5mbyA9IHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoY29udGV4dC5kZWxlZ2F0ZSAmJiBtZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBydW50aW1lLmtleXMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgdGhpcy5zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiYgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiYgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24gZGlzcGF0Y2hFeGNlcHRpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG4gICAgICAgIHJldHVybiAhIWNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbiBhYnJ1cHQodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiYgKHR5cGUgPT09IFwiYnJlYWtcIiB8fCB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uIGNvbXBsZXRlKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8IHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24gZmluaXNoKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gX2NhdGNoKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiBkZWxlZ2F0ZVlpZWxkKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4vLyBBbW9uZyB0aGUgdmFyaW91cyB0cmlja3MgZm9yIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsXG4vLyBvYmplY3QsIHRoaXMgc2VlbXMgdG8gYmUgdGhlIG1vc3QgcmVsaWFibGUgdGVjaG5pcXVlIHRoYXQgZG9lcyBub3Rcbi8vIHVzZSBpbmRpcmVjdCBldmFsICh3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeSkuXG50eXBlb2YgZ2xvYmFsID09PSBcIm9iamVjdFwiID8gZ2xvYmFsIDogdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiID8gc2VsZiA6IHVuZGVmaW5lZCk7XG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCJfcHJvY2Vzc1wiOjEzMCxcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlXCI6NDUsXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZVwiOjQ5LFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbFwiOjUwLFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiOjUxfV0sMTMwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG59LHt9XSwxMzE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLyohXG4gKiBtdXN0YWNoZS5qcyAtIExvZ2ljLWxlc3Mge3ttdXN0YWNoZX19IHRlbXBsYXRlcyB3aXRoIEphdmFTY3JpcHRcbiAqIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanNcbiAqL1xuXG4vKmdsb2JhbCBkZWZpbmU6IGZhbHNlIE11c3RhY2hlOiB0cnVlKi9cblxuKGZ1bmN0aW9uIGRlZmluZU11c3RhY2hlIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmIHR5cGVvZiBleHBvcnRzLm5vZGVOYW1lICE9PSAnc3RyaW5nJykge1xuICAgIGZhY3RvcnkoZXhwb3J0cyk7IC8vIENvbW1vbkpTXG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KTsgLy8gQU1EXG4gIH0gZWxzZSB7XG4gICAgZ2xvYmFsLk11c3RhY2hlID0ge307XG4gICAgZmFjdG9yeShNdXN0YWNoZSk7IC8vIHNjcmlwdCwgd3NoLCBhc3BcbiAgfVxufSh0aGlzLCBmdW5jdGlvbiBtdXN0YWNoZUZhY3RvcnkgKG11c3RhY2hlKSB7XG5cbiAgdmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXlQb2x5ZmlsbCAob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uIChvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3JlIGNvcnJlY3QgdHlwZW9mIHN0cmluZyBoYW5kbGluZyBhcnJheVxuICAgKiB3aGljaCBub3JtYWxseSByZXR1cm5zIHR5cGVvZiAnb2JqZWN0J1xuICAgKi9cbiAgZnVuY3Rpb24gdHlwZVN0ciAob2JqKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkob2JqKSA/ICdhcnJheScgOiB0eXBlb2Ygb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gZXNjYXBlUmVnRXhwIChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XG4gIH1cblxuICAvKipcbiAgICogTnVsbCBzYWZlIHdheSBvZiBjaGVja2luZyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QsXG4gICAqIGluY2x1ZGluZyBpdHMgcHJvdG90eXBlLCBoYXMgYSBnaXZlbiBwcm9wZXJ0eVxuICAgKi9cbiAgZnVuY3Rpb24gaGFzUHJvcGVydHkgKG9iaiwgcHJvcE5hbWUpIHtcbiAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgKHByb3BOYW1lIGluIG9iaik7XG4gIH1cblxuICAvLyBXb3JrYXJvdW5kIGZvciBodHRwczovL2lzc3Vlcy5hcGFjaGUub3JnL2ppcmEvYnJvd3NlL0NPVUNIREItNTc3XG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMTg5XG4gIHZhciByZWdFeHBUZXN0ID0gUmVnRXhwLnByb3RvdHlwZS50ZXN0O1xuICBmdW5jdGlvbiB0ZXN0UmVnRXhwIChyZSwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHJlZ0V4cFRlc3QuY2FsbChyZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBub25TcGFjZVJlID0gL1xcUy87XG4gIGZ1bmN0aW9uIGlzV2hpdGVzcGFjZSAoc3RyaW5nKSB7XG4gICAgcmV0dXJuICF0ZXN0UmVnRXhwKG5vblNwYWNlUmUsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgZW50aXR5TWFwID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjMzk7JyxcbiAgICAnLyc6ICcmI3gyRjsnXG4gIH07XG5cbiAgZnVuY3Rpb24gZXNjYXBlSHRtbCAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1smPD5cIidcXC9dL2csIGZ1bmN0aW9uIGZyb21FbnRpdHlNYXAgKHMpIHtcbiAgICAgIHJldHVybiBlbnRpdHlNYXBbc107XG4gICAgfSk7XG4gIH1cblxuICB2YXIgd2hpdGVSZSA9IC9cXHMqLztcbiAgdmFyIHNwYWNlUmUgPSAvXFxzKy87XG4gIHZhciBlcXVhbHNSZSA9IC9cXHMqPS87XG4gIHZhciBjdXJseVJlID0gL1xccypcXH0vO1xuICB2YXIgdGFnUmUgPSAvI3xcXF58XFwvfD58XFx7fCZ8PXwhLztcblxuICAvKipcbiAgICogQnJlYWtzIHVwIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHN0cmluZyBpbnRvIGEgdHJlZSBvZiB0b2tlbnMuIElmIHRoZSBgdGFnc2BcbiAgICogYXJndW1lbnQgaXMgZ2l2ZW4gaGVyZSBpdCBtdXN0IGJlIGFuIGFycmF5IHdpdGggdHdvIHN0cmluZyB2YWx1ZXM6IHRoZVxuICAgKiBvcGVuaW5nIGFuZCBjbG9zaW5nIHRhZ3MgdXNlZCBpbiB0aGUgdGVtcGxhdGUgKGUuZy4gWyBcIjwlXCIsIFwiJT5cIiBdKS4gT2ZcbiAgICogY291cnNlLCB0aGUgZGVmYXVsdCBpcyB0byB1c2UgbXVzdGFjaGVzIChpLmUuIG11c3RhY2hlLnRhZ3MpLlxuICAgKlxuICAgKiBBIHRva2VuIGlzIGFuIGFycmF5IHdpdGggYXQgbGVhc3QgNCBlbGVtZW50cy4gVGhlIGZpcnN0IGVsZW1lbnQgaXMgdGhlXG4gICAqIG11c3RhY2hlIHN5bWJvbCB0aGF0IHdhcyB1c2VkIGluc2lkZSB0aGUgdGFnLCBlLmcuIFwiI1wiIG9yIFwiJlwiLiBJZiB0aGUgdGFnXG4gICAqIGRpZCBub3QgY29udGFpbiBhIHN5bWJvbCAoaS5lLiB7e215VmFsdWV9fSkgdGhpcyBlbGVtZW50IGlzIFwibmFtZVwiLiBGb3JcbiAgICogYWxsIHRleHQgdGhhdCBhcHBlYXJzIG91dHNpZGUgYSBzeW1ib2wgdGhpcyBlbGVtZW50IGlzIFwidGV4dFwiLlxuICAgKlxuICAgKiBUaGUgc2Vjb25kIGVsZW1lbnQgb2YgYSB0b2tlbiBpcyBpdHMgXCJ2YWx1ZVwiLiBGb3IgbXVzdGFjaGUgdGFncyB0aGlzIGlzXG4gICAqIHdoYXRldmVyIGVsc2Ugd2FzIGluc2lkZSB0aGUgdGFnIGJlc2lkZXMgdGhlIG9wZW5pbmcgc3ltYm9sLiBGb3IgdGV4dCB0b2tlbnNcbiAgICogdGhpcyBpcyB0aGUgdGV4dCBpdHNlbGYuXG4gICAqXG4gICAqIFRoZSB0aGlyZCBhbmQgZm91cnRoIGVsZW1lbnRzIG9mIHRoZSB0b2tlbiBhcmUgdGhlIHN0YXJ0IGFuZCBlbmQgaW5kaWNlcyxcbiAgICogcmVzcGVjdGl2ZWx5LCBvZiB0aGUgdG9rZW4gaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlLlxuICAgKlxuICAgKiBUb2tlbnMgdGhhdCBhcmUgdGhlIHJvb3Qgbm9kZSBvZiBhIHN1YnRyZWUgY29udGFpbiB0d28gbW9yZSBlbGVtZW50czogMSkgYW5cbiAgICogYXJyYXkgb2YgdG9rZW5zIGluIHRoZSBzdWJ0cmVlIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlIGF0XG4gICAqIHdoaWNoIHRoZSBjbG9zaW5nIHRhZyBmb3IgdGhhdCBzZWN0aW9uIGJlZ2lucy5cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlVGVtcGxhdGUgKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgaWYgKCF0ZW1wbGF0ZSlcbiAgICAgIHJldHVybiBbXTtcblxuICAgIHZhciBzZWN0aW9ucyA9IFtdOyAgICAgLy8gU3RhY2sgdG8gaG9sZCBzZWN0aW9uIHRva2Vuc1xuICAgIHZhciB0b2tlbnMgPSBbXTsgICAgICAgLy8gQnVmZmVyIHRvIGhvbGQgdGhlIHRva2Vuc1xuICAgIHZhciBzcGFjZXMgPSBbXTsgICAgICAgLy8gSW5kaWNlcyBvZiB3aGl0ZXNwYWNlIHRva2VucyBvbiB0aGUgY3VycmVudCBsaW5lXG4gICAgdmFyIGhhc1RhZyA9IGZhbHNlOyAgICAvLyBJcyB0aGVyZSBhIHt7dGFnfX0gb24gdGhlIGN1cnJlbnQgbGluZT9cbiAgICB2YXIgbm9uU3BhY2UgPSBmYWxzZTsgIC8vIElzIHRoZXJlIGEgbm9uLXNwYWNlIGNoYXIgb24gdGhlIGN1cnJlbnQgbGluZT9cblxuICAgIC8vIFN0cmlwcyBhbGwgd2hpdGVzcGFjZSB0b2tlbnMgYXJyYXkgZm9yIHRoZSBjdXJyZW50IGxpbmVcbiAgICAvLyBpZiB0aGVyZSB3YXMgYSB7eyN0YWd9fSBvbiBpdCBhbmQgb3RoZXJ3aXNlIG9ubHkgc3BhY2UuXG4gICAgZnVuY3Rpb24gc3RyaXBTcGFjZSAoKSB7XG4gICAgICBpZiAoaGFzVGFnICYmICFub25TcGFjZSkge1xuICAgICAgICB3aGlsZSAoc3BhY2VzLmxlbmd0aClcbiAgICAgICAgICBkZWxldGUgdG9rZW5zW3NwYWNlcy5wb3AoKV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcGFjZXMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaGFzVGFnID0gZmFsc2U7XG4gICAgICBub25TcGFjZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBvcGVuaW5nVGFnUmUsIGNsb3NpbmdUYWdSZSwgY2xvc2luZ0N1cmx5UmU7XG4gICAgZnVuY3Rpb24gY29tcGlsZVRhZ3MgKHRhZ3NUb0NvbXBpbGUpIHtcbiAgICAgIGlmICh0eXBlb2YgdGFnc1RvQ29tcGlsZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHRhZ3NUb0NvbXBpbGUgPSB0YWdzVG9Db21waWxlLnNwbGl0KHNwYWNlUmUsIDIpO1xuXG4gICAgICBpZiAoIWlzQXJyYXkodGFnc1RvQ29tcGlsZSkgfHwgdGFnc1RvQ29tcGlsZS5sZW5ndGggIT09IDIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0YWdzOiAnICsgdGFnc1RvQ29tcGlsZSk7XG5cbiAgICAgIG9wZW5pbmdUYWdSZSA9IG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKHRhZ3NUb0NvbXBpbGVbMF0pICsgJ1xcXFxzKicpO1xuICAgICAgY2xvc2luZ1RhZ1JlID0gbmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzFdKSk7XG4gICAgICBjbG9zaW5nQ3VybHlSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAoJ30nICsgdGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgIH1cblxuICAgIGNvbXBpbGVUYWdzKHRhZ3MgfHwgbXVzdGFjaGUudGFncyk7XG5cbiAgICB2YXIgc2Nhbm5lciA9IG5ldyBTY2FubmVyKHRlbXBsYXRlKTtcblxuICAgIHZhciBzdGFydCwgdHlwZSwgdmFsdWUsIGNociwgdG9rZW4sIG9wZW5TZWN0aW9uO1xuICAgIHdoaWxlICghc2Nhbm5lci5lb3MoKSkge1xuICAgICAgc3RhcnQgPSBzY2FubmVyLnBvcztcblxuICAgICAgLy8gTWF0Y2ggYW55IHRleHQgYmV0d2VlbiB0YWdzLlxuICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChvcGVuaW5nVGFnUmUpO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpIDwgdmFsdWVMZW5ndGg7ICsraSkge1xuICAgICAgICAgIGNociA9IHZhbHVlLmNoYXJBdChpKTtcblxuICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UoY2hyKSkge1xuICAgICAgICAgICAgc3BhY2VzLnB1c2godG9rZW5zLmxlbmd0aCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b2tlbnMucHVzaChbICd0ZXh0JywgY2hyLCBzdGFydCwgc3RhcnQgKyAxIF0pO1xuICAgICAgICAgIHN0YXJ0ICs9IDE7XG5cbiAgICAgICAgICAvLyBDaGVjayBmb3Igd2hpdGVzcGFjZSBvbiB0aGUgY3VycmVudCBsaW5lLlxuICAgICAgICAgIGlmIChjaHIgPT09ICdcXG4nKVxuICAgICAgICAgICAgc3RyaXBTcGFjZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBvcGVuaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKG9wZW5pbmdUYWdSZSkpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBoYXNUYWcgPSB0cnVlO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB0eXBlLlxuICAgICAgdHlwZSA9IHNjYW5uZXIuc2Nhbih0YWdSZSkgfHwgJ25hbWUnO1xuICAgICAgc2Nhbm5lci5zY2FuKHdoaXRlUmUpO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB2YWx1ZS5cbiAgICAgIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd7Jykge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdDdXJseVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuKGN1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgICB0eXBlID0gJyYnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgY2xvc2luZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihjbG9zaW5nVGFnUmUpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHRhZyBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgICB0b2tlbiA9IFsgdHlwZSwgdmFsdWUsIHN0YXJ0LCBzY2FubmVyLnBvcyBdO1xuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuXG4gICAgICBpZiAodHlwZSA9PT0gJyMnIHx8IHR5cGUgPT09ICdeJykge1xuICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJy8nKSB7XG4gICAgICAgIC8vIENoZWNrIHNlY3Rpb24gbmVzdGluZy5cbiAgICAgICAgb3BlblNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcblxuICAgICAgICBpZiAoIW9wZW5TZWN0aW9uKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5vcGVuZWQgc2VjdGlvbiBcIicgKyB2YWx1ZSArICdcIiBhdCAnICsgc3RhcnQpO1xuXG4gICAgICAgIGlmIChvcGVuU2VjdGlvblsxXSAhPT0gdmFsdWUpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIG9wZW5TZWN0aW9uWzFdICsgJ1wiIGF0ICcgKyBzdGFydCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICduYW1lJyB8fCB0eXBlID09PSAneycgfHwgdHlwZSA9PT0gJyYnKSB7XG4gICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIC8vIFNldCB0aGUgdGFncyBmb3IgdGhlIG5leHQgdGltZSBhcm91bmQuXG4gICAgICAgIGNvbXBpbGVUYWdzKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlcmUgYXJlIG5vIG9wZW4gc2VjdGlvbnMgd2hlbiB3ZSdyZSBkb25lLlxuICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG5cbiAgICBpZiAob3BlblNlY3Rpb24pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHNjYW5uZXIucG9zKTtcblxuICAgIHJldHVybiBuZXN0VG9rZW5zKHNxdWFzaFRva2Vucyh0b2tlbnMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21iaW5lcyB0aGUgdmFsdWVzIG9mIGNvbnNlY3V0aXZlIHRleHQgdG9rZW5zIGluIHRoZSBnaXZlbiBgdG9rZW5zYCBhcnJheVxuICAgKiB0byBhIHNpbmdsZSB0b2tlbi5cbiAgICovXG4gIGZ1bmN0aW9uIHNxdWFzaFRva2VucyAodG9rZW5zKSB7XG4gICAgdmFyIHNxdWFzaGVkVG9rZW5zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlblswXSA9PT0gJ3RleHQnICYmIGxhc3RUb2tlbiAmJiBsYXN0VG9rZW5bMF0gPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlblsxXSArPSB0b2tlblsxXTtcbiAgICAgICAgICBsYXN0VG9rZW5bM10gPSB0b2tlblszXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzcXVhc2hlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzcXVhc2hlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtcyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgaW50byBhIG5lc3RlZCB0cmVlIHN0cnVjdHVyZSB3aGVyZVxuICAgKiB0b2tlbnMgdGhhdCByZXByZXNlbnQgYSBzZWN0aW9uIGhhdmUgdHdvIGFkZGl0aW9uYWwgaXRlbXM6IDEpIGFuIGFycmF5IG9mXG4gICAqIGFsbCB0b2tlbnMgdGhhdCBhcHBlYXIgaW4gdGhhdCBzZWN0aW9uIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsXG4gICAqIHRlbXBsYXRlIHRoYXQgcmVwcmVzZW50cyB0aGUgZW5kIG9mIHRoYXQgc2VjdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIG5lc3RUb2tlbnMgKHRva2Vucykge1xuICAgIHZhciBuZXN0ZWRUb2tlbnMgPSBbXTtcbiAgICB2YXIgY29sbGVjdG9yID0gbmVzdGVkVG9rZW5zO1xuICAgIHZhciBzZWN0aW9ucyA9IFtdO1xuXG4gICAgdmFyIHRva2VuLCBzZWN0aW9uO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBzd2l0Y2ggKHRva2VuWzBdKSB7XG4gICAgICBjYXNlICcjJzpcbiAgICAgIGNhc2UgJ14nOlxuICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgICBjb2xsZWN0b3IgPSB0b2tlbls0XSA9IFtdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJy8nOlxuICAgICAgICBzZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG4gICAgICAgIHNlY3Rpb25bNV0gPSB0b2tlblsyXTtcbiAgICAgICAgY29sbGVjdG9yID0gc2VjdGlvbnMubGVuZ3RoID4gMCA/IHNlY3Rpb25zW3NlY3Rpb25zLmxlbmd0aCAtIDFdWzRdIDogbmVzdGVkVG9rZW5zO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmVzdGVkVG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgc2ltcGxlIHN0cmluZyBzY2FubmVyIHRoYXQgaXMgdXNlZCBieSB0aGUgdGVtcGxhdGUgcGFyc2VyIHRvIGZpbmRcbiAgICogdG9rZW5zIGluIHRlbXBsYXRlIHN0cmluZ3MuXG4gICAqL1xuICBmdW5jdGlvbiBTY2FubmVyIChzdHJpbmcpIHtcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcbiAgICB0aGlzLnRhaWwgPSBzdHJpbmc7XG4gICAgdGhpcy5wb3MgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB0YWlsIGlzIGVtcHR5IChlbmQgb2Ygc3RyaW5nKS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLmVvcyA9IGZ1bmN0aW9uIGVvcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFpbCA9PT0gJyc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRyaWVzIHRvIG1hdGNoIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24gYXQgdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAqIFJldHVybnMgdGhlIG1hdGNoZWQgdGV4dCBpZiBpdCBjYW4gbWF0Y2gsIHRoZSBlbXB0eSBzdHJpbmcgb3RoZXJ3aXNlLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhbiA9IGZ1bmN0aW9uIHNjYW4gKHJlKSB7XG4gICAgdmFyIG1hdGNoID0gdGhpcy50YWlsLm1hdGNoKHJlKTtcblxuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2guaW5kZXggIT09IDApXG4gICAgICByZXR1cm4gJyc7XG5cbiAgICB2YXIgc3RyaW5nID0gbWF0Y2hbMF07XG5cbiAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpO1xuICAgIHRoaXMucG9zICs9IHN0cmluZy5sZW5ndGg7XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTa2lwcyBhbGwgdGV4dCB1bnRpbCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGNhbiBiZSBtYXRjaGVkLiBSZXR1cm5zXG4gICAqIHRoZSBza2lwcGVkIHN0cmluZywgd2hpY2ggaXMgdGhlIGVudGlyZSB0YWlsIGlmIG5vIG1hdGNoIGNhbiBiZSBtYWRlLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhblVudGlsID0gZnVuY3Rpb24gc2NhblVudGlsIChyZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudGFpbC5zZWFyY2gocmUpLCBtYXRjaDtcblxuICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICBjYXNlIC0xOlxuICAgICAgbWF0Y2ggPSB0aGlzLnRhaWw7XG4gICAgICB0aGlzLnRhaWwgPSAnJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMDpcbiAgICAgIG1hdGNoID0gJyc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgbWF0Y2ggPSB0aGlzLnRhaWwuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoaW5kZXgpO1xuICAgIH1cblxuICAgIHRoaXMucG9zICs9IG1hdGNoLmxlbmd0aDtcblxuICAgIHJldHVybiBtYXRjaDtcbiAgfTtcblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHJlbmRlcmluZyBjb250ZXh0IGJ5IHdyYXBwaW5nIGEgdmlldyBvYmplY3QgYW5kXG4gICAqIG1haW50YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgY29udGV4dC5cbiAgICovXG4gIGZ1bmN0aW9uIENvbnRleHQgKHZpZXcsIHBhcmVudENvbnRleHQpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuY2FjaGUgPSB7ICcuJzogdGhpcy52aWV3IH07XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRDb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY29udGV4dCB1c2luZyB0aGUgZ2l2ZW4gdmlldyB3aXRoIHRoaXMgY29udGV4dFxuICAgKiBhcyB0aGUgcGFyZW50LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2ggKHZpZXcpIHtcbiAgICByZXR1cm4gbmV3IENvbnRleHQodmlldywgdGhpcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBnaXZlbiBuYW1lIGluIHRoaXMgY29udGV4dCwgdHJhdmVyc2luZ1xuICAgKiB1cCB0aGUgY29udGV4dCBoaWVyYXJjaHkgaWYgdGhlIHZhbHVlIGlzIGFic2VudCBpbiB0aGlzIGNvbnRleHQncyB2aWV3LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUubG9va3VwID0gZnVuY3Rpb24gbG9va3VwIChuYW1lKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcblxuICAgIHZhciB2YWx1ZTtcbiAgICBpZiAoY2FjaGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIHZhbHVlID0gY2FjaGVbbmFtZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgbmFtZXMsIGluZGV4LCBsb29rdXBIaXQgPSBmYWxzZTtcblxuICAgICAgd2hpbGUgKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignLicpID4gMCkge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3O1xuICAgICAgICAgIG5hbWVzID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFVzaW5nIHRoZSBkb3Qgbm90aW9uIHBhdGggaW4gYG5hbWVgLCB3ZSBkZXNjZW5kIHRocm91Z2ggdGhlXG4gICAgICAgICAgICogbmVzdGVkIG9iamVjdHMuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUbyBiZSBjZXJ0YWluIHRoYXQgdGhlIGxvb2t1cCBoYXMgYmVlbiBzdWNjZXNzZnVsLCB3ZSBoYXZlIHRvXG4gICAgICAgICAgICogY2hlY2sgaWYgdGhlIGxhc3Qgb2JqZWN0IGluIHRoZSBwYXRoIGFjdHVhbGx5IGhhcyB0aGUgcHJvcGVydHlcbiAgICAgICAgICAgKiB3ZSBhcmUgbG9va2luZyBmb3IuIFdlIHN0b3JlIHRoZSByZXN1bHQgaW4gYGxvb2t1cEhpdGAuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUaGlzIGlzIHNwZWNpYWxseSBuZWNlc3NhcnkgZm9yIHdoZW4gdGhlIHZhbHVlIGhhcyBiZWVuIHNldCB0b1xuICAgICAgICAgICAqIGB1bmRlZmluZWRgIGFuZCB3ZSB3YW50IHRvIGF2b2lkIGxvb2tpbmcgdXAgcGFyZW50IGNvbnRleHRzLlxuICAgICAgICAgICAqKi9cbiAgICAgICAgICB3aGlsZSAodmFsdWUgIT0gbnVsbCAmJiBpbmRleCA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBuYW1lcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eSh2YWx1ZSwgbmFtZXNbaW5kZXhdKTtcblxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtuYW1lc1tpbmRleCsrXV07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3W25hbWVdO1xuICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KGNvbnRleHQudmlldywgbmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9va3VwSGl0KVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudDtcbiAgICAgIH1cblxuICAgICAgY2FjaGVbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwodGhpcy52aWV3KTtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQSBXcml0ZXIga25vd3MgaG93IHRvIHRha2UgYSBzdHJlYW0gb2YgdG9rZW5zIGFuZCByZW5kZXIgdGhlbSB0byBhXG4gICAqIHN0cmluZywgZ2l2ZW4gYSBjb250ZXh0LiBJdCBhbHNvIG1haW50YWlucyBhIGNhY2hlIG9mIHRlbXBsYXRlcyB0b1xuICAgKiBhdm9pZCB0aGUgbmVlZCB0byBwYXJzZSB0aGUgc2FtZSB0ZW1wbGF0ZSB0d2ljZS5cbiAgICovXG4gIGZ1bmN0aW9uIFdyaXRlciAoKSB7XG4gICAgdGhpcy5jYWNoZSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBpbiB0aGlzIHdyaXRlci5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUgKCkge1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgYW5kIHJldHVybnMgdGhlIGFycmF5IG9mIHRva2Vuc1xuICAgKiB0aGF0IGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBwYXJzZS5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSAodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgIHZhciB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV07XG5cbiAgICBpZiAodG9rZW5zID09IG51bGwpXG4gICAgICB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV0gPSBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKTtcblxuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhpZ2gtbGV2ZWwgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byByZW5kZXIgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgd2l0aFxuICAgKiB0aGUgZ2l2ZW4gYHZpZXdgLlxuICAgKlxuICAgKiBUaGUgb3B0aW9uYWwgYHBhcnRpYWxzYCBhcmd1bWVudCBtYXkgYmUgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlXG4gICAqIG5hbWVzIGFuZCB0ZW1wbGF0ZXMgb2YgcGFydGlhbHMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgdGVtcGxhdGUuIEl0IG1heVxuICAgKiBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGxvYWQgcGFydGlhbCB0ZW1wbGF0ZXMgb24gdGhlIGZseVxuICAgKiB0aGF0IHRha2VzIGEgc2luZ2xlIGFyZ3VtZW50OiB0aGUgbmFtZSBvZiB0aGUgcGFydGlhbC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyICh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpIHtcbiAgICB2YXIgdG9rZW5zID0gdGhpcy5wYXJzZSh0ZW1wbGF0ZSk7XG4gICAgdmFyIGNvbnRleHQgPSAodmlldyBpbnN0YW5jZW9mIENvbnRleHQpID8gdmlldyA6IG5ldyBDb250ZXh0KHZpZXcpO1xuICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCB0ZW1wbGF0ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIExvdy1sZXZlbCBtZXRob2QgdGhhdCByZW5kZXJzIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCB1c2luZ1xuICAgKiB0aGUgZ2l2ZW4gYGNvbnRleHRgIGFuZCBgcGFydGlhbHNgLlxuICAgKlxuICAgKiBOb3RlOiBUaGUgYG9yaWdpbmFsVGVtcGxhdGVgIGlzIG9ubHkgZXZlciB1c2VkIHRvIGV4dHJhY3QgdGhlIHBvcnRpb25cbiAgICogb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgd2FzIGNvbnRhaW5lZCBpbiBhIGhpZ2hlci1vcmRlciBzZWN0aW9uLlxuICAgKiBJZiB0aGUgdGVtcGxhdGUgZG9lc24ndCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zLCB0aGlzIGFyZ3VtZW50IG1heVxuICAgKiBiZSBvbWl0dGVkLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJUb2tlbnMgPSBmdW5jdGlvbiByZW5kZXJUb2tlbnMgKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgYnVmZmVyID0gJyc7XG5cbiAgICB2YXIgdG9rZW4sIHN5bWJvbCwgdmFsdWU7XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgIHN5bWJvbCA9IHRva2VuWzBdO1xuXG4gICAgICBpZiAoc3ltYm9sID09PSAnIycpIHZhbHVlID0gdGhpcy5yZW5kZXJTZWN0aW9uKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICdeJykgdmFsdWUgPSB0aGlzLnJlbmRlckludmVydGVkKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICc+JykgdmFsdWUgPSB0aGlzLnJlbmRlclBhcnRpYWwodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJyYnKSB2YWx1ZSA9IHRoaXMudW5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnbmFtZScpIHZhbHVlID0gdGhpcy5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAndGV4dCcpIHZhbHVlID0gdGhpcy5yYXdWYWx1ZSh0b2tlbik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclNlY3Rpb24gPSBmdW5jdGlvbiByZW5kZXJTZWN0aW9uICh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byByZW5kZXIgYW4gYXJiaXRyYXJ5IHRlbXBsYXRlXG4gICAgLy8gaW4gdGhlIGN1cnJlbnQgY29udGV4dCBieSBoaWdoZXItb3JkZXIgc2VjdGlvbnMuXG4gICAgZnVuY3Rpb24gc3ViUmVuZGVyICh0ZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIHNlbGYucmVuZGVyKHRlbXBsYXRlLCBjb250ZXh0LCBwYXJ0aWFscyk7XG4gICAgfVxuXG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuXG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBmb3IgKHZhciBqID0gMCwgdmFsdWVMZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGogPCB2YWx1ZUxlbmd0aDsgKytqKSB7XG4gICAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dC5wdXNoKHZhbHVlW2pdKSwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dC5wdXNoKHZhbHVlKSwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxUZW1wbGF0ZSAhPT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMgd2l0aG91dCB0aGUgb3JpZ2luYWwgdGVtcGxhdGUnKTtcblxuICAgICAgLy8gRXh0cmFjdCB0aGUgcG9ydGlvbiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB0aGUgc2VjdGlvbiBjb250YWlucy5cbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChjb250ZXh0LnZpZXcsIG9yaWdpbmFsVGVtcGxhdGUuc2xpY2UodG9rZW5bM10sIHRva2VuWzVdKSwgc3ViUmVuZGVyKTtcblxuICAgICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJJbnZlcnRlZCA9IGZ1bmN0aW9uIHJlbmRlckludmVydGVkICh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG5cbiAgICAvLyBVc2UgSmF2YVNjcmlwdCdzIGRlZmluaXRpb24gb2YgZmFsc3kuIEluY2x1ZGUgZW1wdHkgYXJyYXlzLlxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMTg2XG4gICAgaWYgKCF2YWx1ZSB8fCAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSlcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyUGFydGlhbCA9IGZ1bmN0aW9uIHJlbmRlclBhcnRpYWwgKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscykge1xuICAgIGlmICghcGFydGlhbHMpIHJldHVybjtcblxuICAgIHZhciB2YWx1ZSA9IGlzRnVuY3Rpb24ocGFydGlhbHMpID8gcGFydGlhbHModG9rZW5bMV0pIDogcGFydGlhbHNbdG9rZW5bMV1dO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRoaXMucGFyc2UodmFsdWUpLCBjb250ZXh0LCBwYXJ0aWFscywgdmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUudW5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiB1bmVzY2FwZWRWYWx1ZSAodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiBlc2NhcGVkVmFsdWUgKHRva2VuLCBjb250ZXh0KSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIG11c3RhY2hlLmVzY2FwZSh2YWx1ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yYXdWYWx1ZSA9IGZ1bmN0aW9uIHJhd1ZhbHVlICh0b2tlbikge1xuICAgIHJldHVybiB0b2tlblsxXTtcbiAgfTtcblxuICBtdXN0YWNoZS5uYW1lID0gJ211c3RhY2hlLmpzJztcbiAgbXVzdGFjaGUudmVyc2lvbiA9ICcyLjEuMyc7XG4gIG11c3RhY2hlLnRhZ3MgPSBbICd7eycsICd9fScgXTtcblxuICAvLyBBbGwgaGlnaC1sZXZlbCBtdXN0YWNoZS4qIGZ1bmN0aW9ucyB1c2UgdGhpcyB3cml0ZXIuXG4gIHZhciBkZWZhdWx0V3JpdGVyID0gbmV3IFdyaXRlcigpO1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgaW4gdGhlIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUgKCkge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLmNsZWFyQ2FjaGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIHRlbXBsYXRlIGluIHRoZSBkZWZhdWx0IHdyaXRlciBhbmQgcmV0dXJucyB0aGVcbiAgICogYXJyYXkgb2YgdG9rZW5zIGl0IGNvbnRhaW5zLiBEb2luZyB0aGlzIGFoZWFkIG9mIHRpbWUgYXZvaWRzIHRoZSBuZWVkIHRvXG4gICAqIHBhcnNlIHRlbXBsYXRlcyBvbiB0aGUgZmx5IGFzIHRoZXkgYXJlIHJlbmRlcmVkLlxuICAgKi9cbiAgbXVzdGFjaGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSAodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5wYXJzZSh0ZW1wbGF0ZSwgdGFncyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGB0ZW1wbGF0ZWAgd2l0aCB0aGUgZ2l2ZW4gYHZpZXdgIGFuZCBgcGFydGlhbHNgIHVzaW5nIHRoZVxuICAgKiBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlciAodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgdGVtcGxhdGUhIFRlbXBsYXRlIHNob3VsZCBiZSBhIFwic3RyaW5nXCIgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdidXQgXCInICsgdHlwZVN0cih0ZW1wbGF0ZSkgKyAnXCIgd2FzIGdpdmVuIGFzIHRoZSBmaXJzdCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FyZ3VtZW50IGZvciBtdXN0YWNoZSNyZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKScpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuICB9O1xuXG4gIC8vIFRoaXMgaXMgaGVyZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCAwLjQueC4sXG4gIC8qZXNsaW50LWRpc2FibGUgKi8gLy8gZXNsaW50IHdhbnRzIGNhbWVsIGNhc2VkIGZ1bmN0aW9uIG5hbWVcbiAgbXVzdGFjaGUudG9faHRtbCA9IGZ1bmN0aW9uIHRvX2h0bWwgKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscywgc2VuZCkge1xuICAgIC8qZXNsaW50LWVuYWJsZSovXG5cbiAgICB2YXIgcmVzdWx0ID0gbXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihzZW5kKSkge1xuICAgICAgc2VuZChyZXN1bHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcblxuICAvLyBFeHBvcnQgdGhlIGVzY2FwaW5nIGZ1bmN0aW9uIHNvIHRoYXQgdGhlIHVzZXIgbWF5IG92ZXJyaWRlIGl0LlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzI0NFxuICBtdXN0YWNoZS5lc2NhcGUgPSBlc2NhcGVIdG1sO1xuXG4gIC8vIEV4cG9ydCB0aGVzZSBtYWlubHkgZm9yIHRlc3RpbmcsIGJ1dCBhbHNvIGZvciBhZHZhbmNlZCB1c2FnZS5cbiAgbXVzdGFjaGUuU2Nhbm5lciA9IFNjYW5uZXI7XG4gIG11c3RhY2hlLkNvbnRleHQgPSBDb250ZXh0O1xuICBtdXN0YWNoZS5Xcml0ZXIgPSBXcml0ZXI7XG5cbn0pKTtcblxufSx7fV0sMTMyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmIChzZWxmLmZldGNoKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBuYW1lID0gbmFtZS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge31cblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgICAgfSwgdGhpcylcblxuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICAgIHZhciBsaXN0ID0gdGhpcy5tYXBbbmFtZV1cbiAgICBpZiAoIWxpc3QpIHtcbiAgICAgIGxpc3QgPSBbXVxuICAgICAgdGhpcy5tYXBbbmFtZV0gPSBsaXN0XG4gICAgfVxuICAgIGxpc3QucHVzaCh2YWx1ZSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgdmFsdWVzID0gdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV1cbiAgICByZXR1cm4gdmFsdWVzID8gdmFsdWVzWzBdIDogbnVsbFxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSB8fCBbXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShub3JtYWxpemVOYW1lKG5hbWUpKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSA9IFtub3JtYWxpemVWYWx1ZSh2YWx1ZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLm1hcCkuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICB0aGlzLm1hcFtuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdmFsdWUsIG5hbWUsIHRoaXMpXG4gICAgICB9LCB0aGlzKVxuICAgIH0sIHRoaXMpXG4gIH1cblxuICBmdW5jdGlvbiBjb25zdW1lZChib2R5KSB7XG4gICAgaWYgKGJvZHkuYm9keVVzZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKSlcbiAgICB9XG4gICAgYm9keS5ib2R5VXNlZCA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdClcbiAgICAgIH1cbiAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNBcnJheUJ1ZmZlcihibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgICByZXR1cm4gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNUZXh0KGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gICAgcmV0dXJuIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gIH1cblxuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBibG9iOiAnRmlsZVJlYWRlcicgaW4gc2VsZiAmJiAnQmxvYicgaW4gc2VsZiAmJiAoZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgQmxvYigpO1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCksXG4gICAgZm9ybURhdGE6ICdGb3JtRGF0YScgaW4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICB0aGlzLmJvZHlVc2VkID0gZmFsc2VcblxuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYmxvYiAmJiBCbG9iLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlCbG9iID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmZvcm1EYXRhICYmIEZvcm1EYXRhLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlGb3JtRGF0YSA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoIWJvZHkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSAnJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBCb2R5SW5pdCB0eXBlJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlCbG9iKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyBibG9iJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5VGV4dF0pKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXJyYXlCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50ZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIHJldHVybiByZWplY3RlZCA/IHJlamVjdGVkIDogUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlUZXh0KVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmZvcm1EYXRhKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKGRlY29kZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIEhUVFAgbWV0aG9kcyB3aG9zZSBjYXBpdGFsaXphdGlvbiBzaG91bGQgYmUgbm9ybWFsaXplZFxuICB2YXIgbWV0aG9kcyA9IFsnREVMRVRFJywgJ0dFVCcsICdIRUFEJywgJ09QVElPTlMnLCAnUE9TVCcsICdQVVQnXVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2QpIHtcbiAgICB2YXIgdXBjYXNlZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gICAgcmV0dXJuIChtZXRob2RzLmluZGV4T2YodXBjYXNlZCkgPiAtMSkgPyB1cGNhc2VkIDogbWV0aG9kXG4gIH1cblxuICBmdW5jdGlvbiBSZXF1ZXN0KHVybCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdGhpcy51cmwgPSB1cmxcblxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8ICdvbWl0J1xuICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCAnR0VUJylcbiAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgbnVsbFxuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsXG5cbiAgICBpZiAoKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSAmJiBvcHRpb25zLmJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkob3B0aW9ucy5ib2R5KVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgYm9keS50cmltKCkuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgdmFyIHNwbGl0ID0gYnl0ZXMuc3BsaXQoJz0nKVxuICAgICAgICB2YXIgbmFtZSA9IHNwbGl0LnNoaWZ0KCkucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignPScpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIGZvcm0uYXBwZW5kKGRlY29kZVVSSUNvbXBvbmVudChuYW1lKSwgZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBmb3JtXG4gIH1cblxuICBmdW5jdGlvbiBoZWFkZXJzKHhocikge1xuICAgIHZhciBoZWFkID0gbmV3IEhlYWRlcnMoKVxuICAgIHZhciBwYWlycyA9IHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKS50cmltKCkuc3BsaXQoJ1xcbicpXG4gICAgcGFpcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgIHZhciBzcGxpdCA9IGhlYWRlci50cmltKCkuc3BsaXQoJzonKVxuICAgICAgdmFyIGtleSA9IHNwbGl0LnNoaWZ0KCkudHJpbSgpXG4gICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc6JykudHJpbSgpXG4gICAgICBoZWFkLmFwcGVuZChrZXksIHZhbHVlKVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy5faW5pdEJvZHkoYm9keUluaXQpXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy51cmwgPSBudWxsXG4gICAgdGhpcy5zdGF0dXMgPSBvcHRpb25zLnN0YXR1c1xuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcbiAgICB0aGlzLnN0YXR1c1RleHQgPSBvcHRpb25zLnN0YXR1c1RleHRcbiAgICB0aGlzLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzID8gb3B0aW9ucy5oZWFkZXJzIDogbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgc2VsZi5IZWFkZXJzID0gSGVhZGVycztcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdDtcbiAgc2VsZi5SZXNwb25zZSA9IFJlc3BvbnNlO1xuXG4gIHNlbGYuZmV0Y2ggPSBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICAgIC8vIFRPRE86IFJlcXVlc3QgY29uc3RydWN0b3Igc2hvdWxkIGFjY2VwdCBpbnB1dCwgaW5pdFxuICAgIHZhciByZXF1ZXN0XG4gICAgaWYgKFJlcXVlc3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoaW5wdXQpICYmICFpbml0KSB7XG4gICAgICByZXF1ZXN0ID0gaW5wdXRcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgICBmdW5jdGlvbiByZXNwb25zZVVSTCgpIHtcbiAgICAgICAgaWYgKCdyZXNwb25zZVVSTCcgaW4geGhyKSB7XG4gICAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVVSTFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXZvaWQgc2VjdXJpdHkgd2FybmluZ3Mgb24gZ2V0UmVzcG9uc2VIZWFkZXIgd2hlbiBub3QgYWxsb3dlZCBieSBDT1JTXG4gICAgICAgIGlmICgvXlgtUmVxdWVzdC1VUkw6L20udGVzdCh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpKSB7XG4gICAgICAgICAgcmV0dXJuIHhoci5nZXRSZXNwb25zZUhlYWRlcignWC1SZXF1ZXN0LVVSTCcpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN0YXR1cyA9ICh4aHIuc3RhdHVzID09PSAxMjIzKSA/IDIwNCA6IHhoci5zdGF0dXNcbiAgICAgICAgaWYgKHN0YXR1cyA8IDEwMCB8fCBzdGF0dXMgPiA1OTkpIHtcbiAgICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHN0YXR1czogc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMoeGhyKSxcbiAgICAgICAgICB1cmw6IHJlc3BvbnNlVVJMKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LnVybCwgdHJ1ZSlcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoJ3Jlc3BvbnNlVHlwZScgaW4geGhyICYmIHN1cHBvcnQuYmxvYikge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InXG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKVxuICAgICAgfSlcblxuICAgICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdClcbiAgICB9KVxuICB9XG4gIHNlbGYuZmV0Y2gucG9seWZpbGwgPSB0cnVlXG59KSgpO1xuXG59LHt9XX0se30sWzIwXSk7XG4iXSwiZmlsZSI6InBhdHRlcm5fbGlicmFyeS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9