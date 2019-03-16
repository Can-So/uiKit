import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
import Drawer from '../Drawer';
import { drawerIconOffset } from '../../../shared-variables';

/*
NOTE: All drawers mirror each other in design, with the only difference
being the offset.
*/
var CreateDrawer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(CreateDrawer, _PureComponent);

  function CreateDrawer() {
    _classCallCheck(this, CreateDrawer);

    return _possibleConstructorReturn(this, _getPrototypeOf(CreateDrawer).apply(this, arguments));
  }

  _createClass(CreateDrawer, [{
    key: "render",
    value: function render() {
      return React.createElement(Drawer, _extends({
        iconOffset: drawerIconOffset,
        width: this.props.isFullWidth ? 'full' : 'narrow'
      }, this.props));
    }
  }]);

  return CreateDrawer;
}(PureComponent);

export { CreateDrawer as default };