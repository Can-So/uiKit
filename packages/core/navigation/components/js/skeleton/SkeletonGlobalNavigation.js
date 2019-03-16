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
import SkeletonGlobalNavigationInner from './styled/SkeletonGlobalNavigationInner';
import SkeletonNavigationContentOuter from './styled/SkeletonNavigationContentOuter';

var SkeletonGlobalNavigation =
/*#__PURE__*/
function (_Component) {
  _inherits(SkeletonGlobalNavigation, _Component);

  function SkeletonGlobalNavigation() {
    _classCallCheck(this, SkeletonGlobalNavigation);

    return _possibleConstructorReturn(this, _getPrototypeOf(SkeletonGlobalNavigation).apply(this, arguments));
  }

  _createClass(SkeletonGlobalNavigation, [{
    key: "render",
    value: function render() {
      return React.createElement(WithRootTheme, {
        provided: this.props.theme,
        isCollapsed: this.props.isCollapsed
      }, React.createElement(SkeletonGlobalNavigationInner, null, React.createElement(SkeletonNavigationContentOuter, null, React.createElement(SkeletonGlobalTopItems, null), React.createElement(SkeletonGlobalBottomItems, null))));
    }
  }]);

  return SkeletonGlobalNavigation;
}(Component);

_defineProperty(SkeletonGlobalNavigation, "defaultProps", {
  isCollapsed: false
});

export { SkeletonGlobalNavigation as default };