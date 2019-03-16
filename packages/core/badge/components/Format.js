export var Format = function Format(props) {
  var formatted = '';
  var _props$children = props.children,
      children = _props$children === void 0 ? 0 : _props$children,
      _props$max = props.max,
      max = _props$max === void 0 ? 0 : _props$max;

  if (children < 0) {
    children = 0;
  }

  if (max < 0) {
    max = 0;
  }

  if (max && max < children) {
    formatted = "".concat(max, "+");
  } else if (children === Infinity) {
    formatted = '∞';
  } else {
    formatted = children;
  }

  return "".concat(formatted);
};
Format.displayName = 'Ak.Badge.Format';