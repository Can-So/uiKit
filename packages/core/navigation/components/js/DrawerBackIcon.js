import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import DrawerBackIconInner from '../styled/DrawerBackIconInner';
import DrawerBackIconOuter from '../styled/DrawerBackIconOuter';

var DrawerBackIcon =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DrawerBackIcon, _PureComponent);

  function DrawerBackIcon() {
    _classCallCheck(this, DrawerBackIcon);

    return _possibleConstructorReturn(this, _getPrototypeOf(DrawerBackIcon).apply(this, arguments));
  }

  _createClass(DrawerBackIcon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          isVisible = _this$props.isVisible;
      return React.createElement(DrawerBackIconOuter, null, React.createElement(DrawerBackIconInner, {
        isVisible: isVisible
      }, children));
    }
  }]);

  return DrawerBackIcon;
}(PureComponent);

_defineProperty(DrawerBackIcon, "defaultProps", {
  isVisible: false
});

export { DrawerBackIcon as default };