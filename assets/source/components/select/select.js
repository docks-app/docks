const classes = {
  root: "select",
  input: "select__input"
};

const states = {
  root: { focused: `${classes.root}--is-focused` }
};

var Select, focus_or_blur_select;

//*
// Translates the `focus`/ `blur` events on the actual `select` node into the
// appropriate addition/ removal of the focused state on the base node of the
// component. This has to be done because most of the visual styling for the
// component is placed on the container, so any adjustments to those styles on
// focus require that container to be aware of the state of its contained
// `select`.
//
// @param {Object} event - The `focus`/ `blur` event on the `select`.
// @private

focus_or_blur_select = (event) => {
  var method = event.type === "focusin" ? "add" : "remove";
  $(event.target).closest(".#{CLASSES.BASE}")[0].classList[method](states.root.focused);
};

Select = {
  init() {
    $(document).on("focus blur", `.${classes.input}`, focus_or_blur_select);
  }
};

export { classes };
export default Select;
