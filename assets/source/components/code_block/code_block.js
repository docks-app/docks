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

import ScrollContainer from "../scroll_container";
import Events from "../../utilities/events";
import UIEvents from "../../utilities/ui_events";
import Range from "../../utilities/text_range";
import Builder from "../../utilities/builder";
import { Communicator } from "../iframe";
import { classes as select_classes } from "../select";
import { indent, clean, highlight } from "../../utilities/markup";
import { force_repaint as repaint } from "../../utilities/painting";

const classes = {
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

const variants = {
  root: { with_demo: `${classes.root}--with-demo` }
};

const states = {
  root: { hidden: `${classes.root}--is-hidden` }
};

const attrs = {
  language: "data-code-block-language",
  cached_max_height: "data-cached-max-height"
};

var CodeBlock, CodeCaches,
    clean_and_highlight_code, update_helper, toggle_code_block_visibility,
    select_code, hide, show, cache_content_height, hook_up_iframe_communication,
    attach_event_listeners;

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

clean_and_highlight_code = (code, options = {}) => {
  var { language_code } = options;

  code = clean(code, options);
  if(!language_code || language_code === "html") { code = indent(code); }
  return highlight(code, options);
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

update_helper = (code, change, cache) => {
  var add, helper_param, constant, helper_matcher, regex,
      constants_for_param, index, replace_value, set_by,
      constant_replacer, boolean_replacer;

  add = !!change.add;

  constant_replacer = (match, param_portion, constant_portion) => {
    cache[helper_param] = cache[helper_param] || [constant_portion];

    if(change.method === "add") {
      cache[helper_param].push(constant);
      return `${param_portion}${constant}`;

    } else {
      constants_for_param = cache[helper_param];
      if(!constants_for_param) { return match; }

      index = constants_for_param.indexOf(constant);
      if(index >= 0) { constants_for_param.splice(index, 1); }

      replace_value = constants_for_param[constants_for_param.length - 1];
      return `${param_portion}${replace_value}`;
    }
  };

  boolean_replacer = (match, param_portion) => {
    return `${param_portion}${add ? "true" : "false"}`;
  };

  if(!change.set_by) { return code; }

  for(set_by of change.set_by) {
    constant = set_by.constant || "";
    helper_param = set_by.setter;
    helper_matcher = `:?\"?${helper_param.replace(":", "").replace("?", "\\?")}\"?:?\\s*(?:=>\\s*)?`;

    if(constant) {
      // If a value was actually declared for the set_by, find the current constant
      // and replace it as needed
      // key: VALUE, :key => VALUE, "key" => VALUE, :"key" => VALUE

      regex = new RegExp(`(${helper_matcher})([a-zA-Z\\-_:]*)`);
      code = code.replace(regex, constant_replacer);

    } else {
      // No constant declared, assume it is true/ false
      regex = new RegExp(`(${helper_matcher})(true|false)`);
      code = code.replace(regex, boolean_replacer);
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

toggle_code_block_visibility = (event) => {
  var code_block = CodeBlock.for(event.target);
  if(!code_block) { return; }
  code_block.toggle();
};

//*
// Handles a focus on the code area of a code block by selecting all of the
// text within the code block.
//
// @private
// @param {Object} event - The `focusin` event on the code.

select_code = () => {
  Range(this).select_all();
};

$(document).on("click", `.${classes.toggler}`, toggle_code_block_visibility);
$(document).on("click", `.${classes.code}`, select_code);

//*
// Hides a code block.
//
// @param {Object} self - The internal details of a [`CodeBlock`](@link).
// @param {Object} options ({}) - The options for how the code block should be
// hidden. Currently, only the `without_transition` (which hides automatically
// rather than scaling the height of the code block) option is supported.
//
// @private

hide = (self, options = {}) => {
  var { node, toggler, content } = self,
      { without_transition } = options,
      scroll_container;

  ScrollContainer.init();
  scroll_container = ScrollContainer.for(node);
  if(scroll_container) { scroll_container.maintain_current_height(); }

  node.classList.add(states.root.hidden);
  if(toggler) { toggler.querySelector("span").textContent = "Show"; }

  content.style.transition = "none";

  if(!without_transition) {
    content.style.height = `${Math.min(content.scrollHeight, parseInt(content.getAttribute(attrs.cached_max_height), 10))}px`;
    repaint(content);
    content.style.transition = null;
  }

  repaint(content);
  content.style.height = "0px";

  if(without_transition) {
    repaint(content);
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

show = async function(self) {
  var { node, toggler, content } = self;

  node.classList.remove(states.root.hidden);
  self.is_hidden = false;
  if(toggler) { toggler.querySelector("span").textContent = "Hide"; }

  await UIEvents.transition(content, function() {
    content.style.height = `${Math.min(content.scrollHeight, parseInt(content.getAttribute(attrs.cached_max_height), 10))}px`;
  });

  content.style.height = null;
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

cache_content_height = (self) => {
  var { node, content } = self,
      max_height, header, header_height, max_code_height, code_container;

  max_height = parseInt(window.getComputedStyle(content).maxHeight, 10);

  content.setAttribute(attrs.cached_max_height, max_height);

  header = node.querySelector(`.${classes.header}`);
  header_height = (header ? header.offsetHeight : 0);
  max_code_height = `${max_height - header_height}px`;

  for(code_container of Array.from(node.querySelectorAll(`.${classes.code_container}`))) {
    code_container.style.maxHeight = max_code_height;
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

hook_up_iframe_communication = (self) => {
  var communicator = Communicator(),
      registered = communicator.register.from_node(self.node),
      handle_markup_change, handle_class_change;

  if(!registered) { return false; }

  handle_markup_change = (event) => {
    if(!event.html || !self.code_caches.markup) { return; }
    self.code_caches.markup.code = event.html;
  };

  handle_class_change = (event) => {
    if(!self.code_caches.helper) { return; }
    if(event.details.add === undefined) { event.details.add = event.add; }
    self.code_caches.helper.update(event.details);
  };

  communicator.on(Events.types.markup_request, handle_markup_change);
  communicator.on(Events.types.markup_change, handle_markup_change);
  communicator.on(Events.types.class_change, handle_class_change);

  communicator.trigger(Events.types.markup_request);
  return communicator;
};

attach_event_listeners = (self) => {
  var select = self.node.querySelector(`.${select_classes.root}`);

  if(select && self.communicator) {
    select.addEventListener("change", function(event) {
      self.communicator.trigger(Events.types.markup_request, {
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

CodeCaches = (() => {
  const languages = {
    markup: ["html"],
    helper: ["erb", "haml", "slim"]
  };

  var CodeCache;

  CodeCache = (node, options = {}) => {
    var language = node.getAttribute(attrs.language) || "html",
        dom_code = node.querySelector("code"),
        code = dom_code.innerHTML,
        helper_cache = null, code_cache;

    code_cache = {
      language: language,
      highlight() { this.code = code; },
      get code() { return code; },
      set code(new_code) {
        code = new_code;
        dom_code.innerHTML = clean_and_highlight_code(new_code, {
          language_code: language,
          collapse_newlines: options.generated_from_helper
        });
      }
    };

    code_cache.highlight();

    if(languages.helper.includes(language)) {
      helper_cache = {};

      Object.defineProperty(code_cache, "update", {
        value: function(change) {
          this.code = update_helper(this.code, change, helper_cache);
        }
      });
    }

    return code_cache;
  };

  return (node) => {
    var code_nodes, code_caches, api, index;

    code_nodes = Array.from(node.querySelectorAll(`.${classes.code}`));
    code_caches = code_nodes.map((code_node) => {
      return CodeCache(code_node, { generated_from_helper: code_nodes.length > 1 });
    });

    api = {
      get markup() {
        return code_caches.filter((code_cache) => languages.markup.includes(code_cache.language))[0];
      },

      get helper() {
        return code_caches.filter((code_cache) => languages.helper.includes(code_cache.language))[0];
      },

      length: code_caches.length
    };

    for(index = 0; index < code_caches.length; index++) {
      Object.defineProperty(api, index, { value: code_caches[index] });
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

CodeBlock = (node) => {
  var self, api, toggle;

  self = {
    node: node,
    is_hidden: node.classList.contains(states.root.hidden),
    toggler: node.querySelector(`.${classes.toggler}`),
    content: node.querySelector(`.${classes.content}`),
    code_caches: CodeCaches(node)
  };

  self.communicator = hook_up_iframe_communication(self);

  attach_event_listeners(self);

  if(self.is_hidden) { hide(self, { without_transition: true }); }
  if(self.toggler) { cache_content_height(self); }

  //*
  // Toggles the code block.
  //
  // @method

  toggle = () => { return (self.is_hidden ? show(self) : hide(self)); };
  api = { toggle };

  return api;
};

CodeBlock.init = Builder.initialize_once(CodeBlock, { name: classes.root, cache: true });

export { classes, states, variants, attrs };
export default CodeBlock;
