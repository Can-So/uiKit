import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { WithRootTheme } from '../../../theme/util';
import SkeletonGlobalTopItems from './SkeletonGlobalTopItems';
import SkeletonGlobalBottomItems from './SkeletonGlobalBottomItems';
import SkeletonContainerItems from './SkeletonContainerItems';
import { ShownWhenCollapsed } from './ToggleWhenCollapsed';
import SkeletonContainerNavigationInner from './styled/SkeletonContainerNavigationInner';
import SkeletonNavigationContentOuter from './styled/SkeletonNavigationContentOuter';
import SkeletonContainerHeaderWrapper from './styled/SkeletonContainerHeaderWrapper';

var SkeletonContainerNavigation =
/*#__PURE__*/
function (_Component) {
  _inherits(SkeletonContainerNavigation, _Component);

  function SkeletonContainerNavigation() {
    _classCallCheck(this, SkeletonContainerNavigation);

    return _possibleConstructorReturn(this, _getPrototypeOf(SkeletonContainerNavigation).apply(this, arguments));
  }

  _createClass(SkeletonContainerNavigation, [{
    key: "render",
    value: function render() {
      var ContainerHeaderComponent = this.props.containerHeaderComponent;
      var _this$props = this.props,
          theme = _this$props.theme,
          isCollapsed = _this$props.isCollapsed;
      return React.createElement(WithRootTheme, {
        provided: theme,
        isCollapsed: isCollapsed
      }, React.createElement(SkeletonContainerNavigationInner, {
        isCollapsed: isCollapsed
      }, React.createElement(SkeletonNavigationContentOuter, null, React.createElement("div", null, React.createElement(ShownWhenCollapsed, {
        isCollapsed: isCollapsed
      }, React.createElement(SkeletonGlobalTopItems, null)), React.createElement(SkeletonContainerHeaderWrapper, null, React.createElement(ContainerHeaderComponent, {
        isCollapsed: isCollapsed
      })), React.createElement(SkeletonContainerItems, {
        isCollapsed: isCollapsed
      })), React.createElement(ShownWhenCollapsed, {
        isCollapsed: isCollapsed
      }, React.createElement(SkeletonGlobalBottomItems, null)))));
    }
  }]);

  return SkeletonContainerNavigation;
}(Component);

_defineProperty(SkeletonContainerNavigation, "defaultProps", {
  isCollapsed: false
});

export { SkeletonContainerNavigation as default };