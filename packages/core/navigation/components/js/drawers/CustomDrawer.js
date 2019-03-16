import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import Drawer from '../Drawer';
import { drawerIconOffset } from '../../../shared-variables';

/*
NOTE: All drawers mirror each other in design, with the only difference
being the offset.
*/
var CustomDrawer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(CustomDrawer, _PureComponent);

  function CustomDrawer() {
    _classCallCheck(this, CustomDrawer);

    return _possibleConstructorReturn(this, _getPrototypeOf(CustomDrawer).apply(this, arguments));
  }

  _createClass(CustomDrawer, [{
    key: "render",
    value: function render() {
      return React.createElement(Drawer, _extends({
        iconOffset: drawerIconOffset
      }, this.props));
    }
  }]);

  return CustomDrawer;
}(PureComponent);

_defineProperty(CustomDrawer, "defaultProps", {
  width: 'wide'
});

export { CustomDrawer as default };