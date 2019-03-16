import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import SkeletonNavigationOuter from './styled/SkeletonNavigationOuter';
import SkeletonNavigationInner from './styled/SkeletonNavigationInner';
import SkeletonGlobalNavigation from './SkeletonGlobalNavigation';
import SkeletonContainerNavigation from './SkeletonContainerNavigation';
import SkeletonDefaultContainerHeader from './SkeletonDefaultContainerHeader';
import { HiddenWhenCollapsed } from './ToggleWhenCollapsed';
import { defaultContainerTheme, defaultGlobalTheme } from '../../../theme/util';

var SkeletonNavigation =
/*#__PURE__*/
function (_Component) {
  _inherits(SkeletonNavigation, _Component);

  function SkeletonNavigation() {
    _classCallCheck(this, SkeletonNavigation);

    return _possibleConstructorReturn(this, _getPrototypeOf(SkeletonNavigation).apply(this, arguments));
  }

  _createClass(SkeletonNavigation, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isCollapsed = _this$props.isCollapsed,
          globalTheme = _this$props.globalTheme,
          containerTheme = _this$props.containerTheme,
          containerHeaderComponent = _this$props.containerHeaderComponent;
      return React.createElement(SkeletonNavigationOuter, {
        isCollapsed: isCollapsed
      }, React.createElement(SkeletonNavigationInner, null, React.createElement(HiddenWhenCollapsed, {
        isCollapsed: isCollapsed
      }, React.createElement(SkeletonGlobalNavigation, {
        theme: defaultGlobalTheme(globalTheme)
      })), React.createElement(SkeletonContainerNavigation, {
        theme: defaultContainerTheme(containerTheme),
        isCollapsed: isCollapsed,
        containerHeaderComponent: containerHeaderComponent
      })));
    }
  }]);

  return SkeletonNavigation;
}(Component);

_defineProperty(SkeletonNavigation, "defaultProps", {
  isCollapsed: false,
  containerHeaderComponent: SkeletonDefaultContainerHeader
});

export { SkeletonNavigation as default };