import Mustache from "mustache";

var Template = {
  render(template, binding) {
    if(template.innerHTML) { template = template.innerHTML; }
    Mustache.render(template, binding);
  }
};

export default Template;
