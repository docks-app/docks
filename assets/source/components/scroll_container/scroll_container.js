import Builder from "~utilities/builder";

const classes = {
  root: "scroll-container"
};

var ScrollContainer;

ScrollContainer = (node) => {
  var force_height = (height) => { node.style.minHeight = `${height}px`; };

  return {
    maintain_current_height() { force_height(node.offsetHeight); },
    restore_height() { node.style.minHeight = null; },

    scroll_to(contained_node) {
      node.parentNode.scrollTop = contained_node.getBoundingClientRect().top - node.getBoundingClientRect().top;
    }
  };
};

ScrollContainer.init = Builder.initialize_once(ScrollContainer, { name: classes.root, cache: true });

export default ScrollContainer;
