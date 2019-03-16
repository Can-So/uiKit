import _objectSpread from "@babel/runtime/helpers/objectSpread";
export function omit(obj) {
  var newObj = _objectSpread({}, obj);

  for (var _len = arguments.length, keysToOmit = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keysToOmit[_key - 1] = arguments[_key];
  }

  for (var _i = 0; _i < keysToOmit.length; _i++) {
    var key = keysToOmit[_i];
    delete newObj[key];
  }

  return newObj;
}
export function getDisplayName(prefix, Component) {
  var componentName = Component.displayName || Component.name;
  return componentName ? "".concat(prefix, "(").concat(componentName, ")") : prefix;
}