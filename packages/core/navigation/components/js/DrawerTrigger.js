import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import GlobalItem from './GlobalItem';
import DrawerTriggerInner from '../styled/DrawerTriggerInner';

var DrawerTrigger =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DrawerTrigger, _PureComponent);

  function DrawerTrigger() {
    _classCallCheck(this, DrawerTrigger);

    return _possibleConstructorReturn(this, _getPrototypeOf(DrawerTrigger).apply(this, arguments));
  }

  _createClass(DrawerTrigger, [{
    key: "render",
    value: function render() {
      if (this.props.children == null) return null;
      return React.createElement(DrawerTriggerInner, null, React.createElement(GlobalItem, {
        role: "button",
        "aria-haspopup": "true",
        onClick: this.props.onActivate,
        onMouseDown: function onMouseDown(e) {
          return e.preventDefault();
        },
        size: "medium"
      }, this.props.children));
    }
  }]);

  return DrawerTrigger;
}(PureComponent);

_defineProperty(DrawerTrigger, "defaultProps", {
  onActivate: function onActivate() {}
});

export { DrawerTrigger as default };