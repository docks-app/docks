import Sidebar from "~structures/sidebar";
import Tablist from "~components/tablist";
import ScrollContainer from "~components/scroll_container";

var InternalLink, move_to_node, on_hash_change, process_initial_hash, current_hash;

current_hash = () => {
  return window.location.hash.replace("#", "");
};

move_to_node = (node) => {
  Tablist.activate_panel_containing(node);
  ScrollContainer.for(node).scroll_to(node);
};

on_hash_change = () => {
  var hash = current_hash(),
      node;

  Sidebar.hide();
  node = document.getElementById(hash);
  if(!node) { return; }

  node.id = null;
  window.location.hash = hash;
  node.id = hash;
  move_to_node(node);
};

process_initial_hash = () => {
  var hash = current_hash(),
      node;

  if(!hash.length) { return; }

  node = document.getElementById(hash);
  if(!node) { return; }

  move_to_node(node);
};

InternalLink = {
  init() {
    $(window).on("hashchange", on_hash_change);
    setTimeout(process_initial_hash, 0);
  }
};

export default InternalLink;
