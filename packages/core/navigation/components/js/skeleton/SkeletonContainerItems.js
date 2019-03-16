import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import SkeletonContainerItem from './SkeletonContainerItem';
import SkeletonNavigationItems from './styled/SkeletonNavigationItems';

var SkeletonContainerItems =
/*#__PURE__*/
function (_Component) {
  _inherits(SkeletonContainerItems, _Component);

  function SkeletonContainerItems() {
    _classCallCheck(this, SkeletonContainerItems);

    return _possibleConstructorReturn(this, _getPrototypeOf(SkeletonContainerItems).apply(this, arguments));
  }

  _createClass(SkeletonContainerItems, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isCollapsed = _this$props.isCollapsed,
          itemTextWidth = _this$props.itemTextWidth;
      return React.createElement(SkeletonNavigationItems, null, React.createElement(SkeletonContainerItem, {
        isCollapsed: isCollapsed,
        itemTextWidth: itemTextWidth
      }), React.createElement(SkeletonContainerItem, {
        isCollapsed: isCollapsed,
        itemTextWidth: itemTextWidth
      }), React.createElement(SkeletonContainerItem, {
        isCollapsed: isCollapsed,
        itemTextWidth: itemTextWidth
      }), React.createElement(SkeletonContainerItem, {
        isCollapsed: isCollapsed,
        itemTextWidth: itemTextWidth
      }), React.createElement(SkeletonContainerItem, {
        isCollapsed: isCollapsed,
        itemTextWidth: itemTextWidth
      }));
    }
  }]);

  return SkeletonContainerItems;
}(Component);

_defineProperty(SkeletonContainerItems, "defaultProps", {
  isCollapsed: false
});

export { SkeletonContainerItems as default };