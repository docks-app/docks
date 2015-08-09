var TextRange, select_all;

TextRange = (target) => {
  return {
    select_all() { select_all(target); }
  };
};

export default TextRange;

select_all = (() => {
  if(window.getSelection) {
    return (target) => {
      var selection, range;

      selection = window.getSelection();
      selection.removeAllRanges();

      range = document.createRange();
      range.selectNodeContents(target);
      selection.addRange(range);
    };
  } else {
    return (target) => {
      var range = document.body.createTextRange();
      range.moveToElementText(target);
      range.select();
    };
  }
})();
