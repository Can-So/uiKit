export var ShownWhenCollapsed = function ShownWhenCollapsed(_ref) {
  var _ref$isCollapsed = _ref.isCollapsed,
      isCollapsed = _ref$isCollapsed === void 0 ? false : _ref$isCollapsed,
      children = _ref.children;
  return isCollapsed ? children : null;
};
export var HiddenWhenCollapsed = function HiddenWhenCollapsed(_ref2) {
  var _ref2$isCollapsed = _ref2.isCollapsed,
      isCollapsed = _ref2$isCollapsed === void 0 ? false : _ref2$isCollapsed,
      children = _ref2.children;
  return isCollapsed ? null : children;
};