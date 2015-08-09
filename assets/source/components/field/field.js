const classes = {
  root: "field",
  input: "field__input",
  label: "label"
};

const states = {
  root: { focused: `${classes.root}--is-focused` },
  label: { focused: `${classes.label}--is-focused` }
};

var Field = {
  init() {
    $(document).on("focusin focusout", `.${classes.input}`, (event) => {
      var method = event.type === "focusin" ? "add" : "remove",
          label = document.querySelector(`[for=${event.target.id}]`);

      event.target.parentNode.classList[method](states.root.focused);
      label.classList[method](states.label.focused);
    });
  }
};

export default Field;
