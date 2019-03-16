import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _typeof from "@babel/runtime/helpers/typeof";
export default (function (_ref) {
  var children = _ref.children,
      props = _ref.props,
      theme = _ref.theme;
  var appearance = _typeof(props) === 'object' ? 'default' : props;
  var merged = _typeof(props) === 'object' ? _objectSpread({}, props) : {};
  Object.keys(theme).forEach(function (key) {
    if (!(key in merged)) {
      merged[key] = theme[key]({
        appearance: appearance
      });
    }
  });
  return children(merged);
});