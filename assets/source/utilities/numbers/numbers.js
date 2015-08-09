var Matrix, between;

between = (point, min, max, options = {}) => {
  var min_condition = options.include_min ? (point >= min) : (point > min),
      max_condition = options.include_max ? (point <= max) : (point < max);
  return min_condition && max_condition;
};

Matrix = (...args) => {
  var MatrixClass = window.WebKitCSSMatrix || window.MSCSSMatrix || window.CSSMatrix;
  return new MatrixClass(...args);
};

export { Matrix, between };
