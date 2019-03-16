import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { Skeleton as SkeletonIcon } from '@findable/icon';
import { HiddenWhenCollapsed } from './ToggleWhenCollapsed';
import SkeletonContainerItemWrapper from './styled/SkeletonContainerItemWrapper';
import SkeletonContainerItemText from './styled/SkeletonContainerItemText';
import SkeletonIconWrapper from './styled/SkeletonIconWrapper';

var SkeletonContainerItem =
/*#__PURE__*/
function (_Component) {
  _inherits(SkeletonContainerItem, _Component);

  function SkeletonContainerItem() {
    _classCallCheck(this, SkeletonContainerItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(SkeletonContainerItem).apply(this, arguments));
  }

  _createClass(SkeletonContainerItem, [{
    key: "render",
    value: function render() {
      return React.createElement(SkeletonContainerItemWrapper, null, React.createElement(SkeletonIconWrapper, null, React.createElement(SkeletonIcon, null)), React.createElement(HiddenWhenCollapsed, {
        isCollapsed: this.props.isCollapsed
      }, React.createElement(SkeletonContainerItemText, {
        textWidth: this.props.itemTextWidth
      })));
    }
  }]);

  return SkeletonContainerItem;
}(Component);

_defineProperty(SkeletonContainerItem, "defaultProps", {
  isCollapsed: false
});

export { SkeletonContainerItem as default };