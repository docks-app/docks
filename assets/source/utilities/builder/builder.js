import Cache from "~utilities/dom_cache";

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

add_retrieval_methods = (Factory, options = {}) => {
  if(!Factory.for) {
    Factory.for = (node) => {
      return Cache($(node).closest(options.selector)[0]).get(options.name);
    };
  }

  if(!Factory.within) {
    Factory.within = (node) => {
      var results = [], api,
          nodes = Array.from(node.querySelectorAll(options.selector));

      for(node of nodes) {
        api = Factory.for(node);
        if(api) { results.push(api); }
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

  build(Factory, options = {}) {
    var node, nodes, api;

    nodes = options.selector ?
      document.querySelectorAll(options.selector) :
      document.getElementsByClassName(options.name);

    options.selector = options.selector || `.${options.name}`;

    if(options.cache) {
      add_retrieval_methods(Factory, options);
    }

    for(node of Array.from(nodes)) {
      if(options.filter && !options.filter(node)) { continue; }

      api = Factory(node);
      if(options.cache) { Cache(node).set(options.name, api); }
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

  build_and_cache(Factory, options = {}) {
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

  initialize_once(Factory, options = {}) {
    return () => {
      options.filter = (node) => { return !Factory.for(node); };
      Builder.build_and_cache(Factory, options);
    };
  }
};

export default Builder;
