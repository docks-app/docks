var App, component, components = [];

App = {
  register(a_component) {
    components.push(a_component);
  },

  init() {
    for(component of components) {
      if(component.init) { component.init(); }
    }
  }
};

export default App;
