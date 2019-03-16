import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { ItemGroup } from '@atlaskit/item';
import NavigationItemGroupTitle from '../styled/NavigationItemGroupTitle';
import NavigationItemGroupSeparator from '../styled/NavigationItemGroupSeparator';
import NavigationItemGroupHeader from '../styled/NavigationItemGroupHeader';
import NavigationItemGroupAction from '../styled/NavigationItemGroupAction';

var NavigationItemGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(NavigationItemGroup, _Component);

  function NavigationItemGroup() {
    _classCallCheck(this, NavigationItemGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(NavigationItemGroup).apply(this, arguments));
  }

  _createClass(NavigationItemGroup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          action = _this$props.action,
          isCompact = _this$props.isCompact,
          hasSeparator = _this$props.hasSeparator,
          children = _this$props.children,
          innerRef = _this$props.innerRef;
      var wrappedTitle = title ? React.createElement(NavigationItemGroupTitle, null, title) : null;
      var wrappedAction = action ? React.createElement(NavigationItemGroupAction, null, action) : null;
      var separator = hasSeparator ? React.createElement(NavigationItemGroupSeparator, null) : null;
      var header = title || action ? React.createElement(NavigationItemGroupHeader, null, wrappedTitle) : null;
      var groupHeading = separator || header ? React.createElement("div", null, separator, header) : null;
      return React.createElement(ItemGroup, {
        title: groupHeading,
        elemAfter: wrappedAction,
        isCompact: isCompact,
        innerRef: innerRef
      }, children);
    }
  }]);

  return NavigationItemGroup;
}(Component);

_defineProperty(NavigationItemGroup, "defaultProps", {
  isCompact: false,
  hasSeparator: false
});

export { NavigationItemGroup as default };