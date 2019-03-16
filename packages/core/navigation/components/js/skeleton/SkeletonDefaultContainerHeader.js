import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { Skeleton as SkeletonAvatar } from '@atlaskit/avatar';
import { HiddenWhenCollapsed } from './ToggleWhenCollapsed';
import SkeletonContainerHeaderText from './styled/SkeletonContainerHeaderText';
import SkeletonDefaultContainerHeaderInner from './styled/SkeletonDefaultContainerHeaderInner';

var SkeletonDefaultContainerHeader =
/*#__PURE__*/
function (_Component) {
  _inherits(SkeletonDefaultContainerHeader, _Component);

  function SkeletonDefaultContainerHeader() {
    _classCallCheck(this, SkeletonDefaultContainerHeader);

    return _possibleConstructorReturn(this, _getPrototypeOf(SkeletonDefaultContainerHeader).apply(this, arguments));
  }

  _createClass(SkeletonDefaultContainerHeader, [{
    key: "render",
    value: function render() {
      return React.createElement(SkeletonDefaultContainerHeaderInner, {
        isAvatarHidden: this.props.isAvatarHidden
      }, !this.props.isAvatarHidden && React.createElement(SkeletonAvatar, {
        appearance: "square",
        size: "large",
        weight: "strong"
      }), React.createElement(HiddenWhenCollapsed, {
        isCollapsed: this.props.isCollapsed
      }, React.createElement(SkeletonContainerHeaderText, {
        isAvatarHidden: this.props.isAvatarHidden
      })));
    }
  }]);

  return SkeletonDefaultContainerHeader;
}(Component);

_defineProperty(SkeletonDefaultContainerHeader, "defaultProps", {
  isCollapsed: false,
  isAvatarHidden: false
});

export { SkeletonDefaultContainerHeader as default };