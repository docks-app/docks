var Pattern, pattern, result_types, find_variation;

pattern = window.pattern;
delete window.pattern;

result_types = ["style", "script"];

find_variation = (component, symbol) => {
  var variation;

  for(variation of (component.state || []).concat(component.variant || [])) {
    if(symbol.include(variation.name)) { return variation; }
  }
};

Pattern = {
  find(symbol, options = {}) {
    var result_type, result, variation, subcomponent;

    if(!pattern) { return false; }

    symbol = symbol.split(/\s+/);

    for(result_type of result_types) {
      for(result of pattern[result_type]) {
        if(symbol.include(result.name)) { return result; }

        if(options.search_variations || options.search_all) {
          variation = find_variation(result, symbol);
          if(variation) { return variation; }
        }

        if(options.search_subcomponents || options.search_all) {
          for(subcomponent of (result.subcomponent || [])) {
            if(symbol.include(subcomponent.name)) { return subcomponent; }

            variation = find_variation(result, symbol);
            if(variation) { return variation; }
          }
        }
      }
    }

    return false;
  },

  __pattern__: pattern
};

export default Pattern;
