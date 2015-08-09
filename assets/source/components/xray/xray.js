import Template from "~utilities/template";
import Pattern from "~utilities/pattern";
import Events from "~utilities/events";
import Exploded, { events as exploded_events } from "~components/exploded";
import { Communicator } from "~components/iframe";

const classes = {
  root: "x-ray",
  details: "x-ray__details",
  list: "x-ray__list"
};

const states = {
  root: { active: "x-ray--is-active" }
};

const helpers = {
  active: "x-ray__helpers--x-ray-is-active"
};

const attrs = {
  dismiss: "data-xray-dismiss",
  present: "data-xray-present",
  template: "data-xray-template"
};

const template_names = {
  details: "details",
  list: "list"
};

var Xray,
    structure, exploded, templates, component,
    hook_up_iframe_communication, communicator,
    toggle, present, dismiss, set_component, set_details;

hook_up_iframe_communication = () => {
  var registered;

  communicator = Communicator();
  registered = communicator.register.from_node(structure.root);

  if(!registered) { return; }

  communicator.on(Events.types.markup_request, (event) => {
    exploded.set_markup(event.markup);
  });
};

set_component = (component_name) => {
  component = Pattern.find(component_name, { search_all: true });
  structure.heading.innerHTML = component.title ? component.title : `<code class='type--code'>${component_name}</code>`;
  structure.list.innerHTML = Template.render(templates.list, {
    components: [component_name].concat(component.subcomponent || [])
  });
  set_details(component);
};

set_details = (symbol, other_content = {}) => {
  var options = Object.assign(other_content, symbol);
  structure.details.innerHTML = Template.render(templates.details, options);
};

present = () => {
  communicator.trigger(Events.types.markup_request);
  structure.root.classList.add(states.root.active);
  document.body.classList.add(helpers.active);
};

dismiss = () => {
  exploded.set_markup();
  structure.root.classList.remove(states.root.active);
  document.body.classList.remove(helpers.active);
};

toggle = () => {
  return (structure.root.classList.contains(states.root.active) ? dismiss() : present());
};

Xray = {
  toggle,
  present,
  dismiss,

  init() {
    var root = document.querySelector(`.${classes.root}`);
    if(!root) { return; }

    exploded = Exploded.within(root)[0];

    structure = {
      root,
      heading: root.querySelector(".type-heading"),
      details: root.querySelector(`.${classes.details}`),
      list: root.querySelector(`.${classes.list}`)
    };

    templates = {
      details: root.querySelector(`[${attrs.template}='${template_names.details}']`),
      list: root.querySelector(`[${attrs.template}='${template_names.list}']`)
    };

    hook_up_iframe_communication();

    exploded.on(exploded_events.pane_selected, (event) => {
      component = Pattern.find(event.component, { search_all: true });
      if(component) { set_details(component, { tagname: event.node.tagName }); }
    });

    $(root)
      .on("click", `[${attrs.dismiss}]`, dismiss)
      .on("click", "[href^='#']", (event) => {
        event.preventDefault();
        exploded.select_component(event.target.textContent);
      });

    $(document).on("click", `[${attrs.present}]`, (event) => {
      set_component(event.getAttribute(attrs.present));
    });
  }
};

export default Xray;
