import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import ContainerHeaderWrapper from '../styled/ContainerHeaderWrapper';
import { globalItemSizes } from '../../shared-variables';

var ContainerHeader =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ContainerHeader, _PureComponent);

  function ContainerHeader() {
    _classCallCheck(this, ContainerHeader);

    return _possibleConstructorReturn(this, _getPrototypeOf(ContainerHeader).apply(this, arguments));
  }

  _createClass(ContainerHeader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          iconOffset = _this$props.iconOffset,
          isFullWidth = _this$props.isFullWidth,
          isInDrawer = _this$props.isInDrawer;
      return React.createElement(ContainerHeaderWrapper, {
        isInDrawer: isInDrawer,
        iconOffset: iconOffset,
        isFullWidth: isFullWidth
      }, this.props.children);
    }
  }]);

  return ContainerHeader;
}(PureComponent);

_defineProperty(ContainerHeader, "defaultProps", {
  iconOffset: globalItemSizes.medium,
  isInDrawer: false
});

export { ContainerHeader as default };