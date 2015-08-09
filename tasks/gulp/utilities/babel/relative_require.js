// source: http://stackoverflow.com/questions/31068698/importing-node-modules-from-root-directory-using-es6-and-babel-node

module.exports = function(babel) {
  var cwd = process.cwd();

  return new babel.Transformer("babel_relative_require", {
    ImportDeclaration: function(node, parent) {
      var ref;

      if (!babel.types.isLiteral(node.source)) { return node; }

      ref = node.source.value;

      // ensure a value, make sure it's not home relative e.g. ~/foo
      if (!ref || ref[0] !== "~" || ref[1] === "/") { return node; }

      node.source.value = cwd + "/assets/source/" + node.source.value.slice(1);

      return node;
    }
  });
};
