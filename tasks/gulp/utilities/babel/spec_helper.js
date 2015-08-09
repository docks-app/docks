module.exports = function(babel) {
  var cwd = process.cwd();

  return new babel.Transformer("babel_spec_helper", {
    ImportDeclaration: function(node, parent) {
      var ref;

      if (!babel.types.isLiteral(node.source)) { return node; }

      ref = node.source.value;

      // ensure a value, make sure it's not home relative e.g. ~/foo
      if (!ref || ref !== "spec_helper") { return node; }

      node.source.value = cwd + "/spec/assets/spec_helper.js";

      return node;
    }
  });
};
