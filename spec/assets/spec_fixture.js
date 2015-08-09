var Fixture;

Fixture = {
  node: null,

  prepare() {
    var node;

    this.clean();

    node = document.createElement("div");
    node.id = "Fixture";
    node.style.visibility = "hidden";
    document.body.appendChild(node);

    this.node = node;
  },

  clean() {
    var parent;

    if(!this.node) { return; }
    parent = this.node.parentNode;
    if(parent) { parent.removeChild(this.node); }
  },

  load(content) {
    this.node.innerHTML = content;
    return this.node;
  }
};

export default Fixture;
