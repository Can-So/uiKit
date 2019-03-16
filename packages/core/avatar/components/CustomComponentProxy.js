import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';

/**
 * Styling a avatar is complicated and there are a number of properties which
 * inform its appearance. We want to be able to style any arbitrary component
 * like a Link, but we don't want to pass all of these appearance-related props
 * through to the component or underlying DOM node. This component acts as a
 * layer which catches the appearance-related properties so that they can be
 * used by styled-components, then passes the rest of the props on to the custom
 * component.
 */
var CustomComponentProxy =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomComponentProxy, _Component);

  function CustomComponentProxy() {
    _classCallCheck(this, CustomComponentProxy);

    return _possibleConstructorReturn(this, _getPrototypeOf(CustomComponentProxy).apply(this, arguments));
  }

  _createClass(CustomComponentProxy, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          appearance = _this$props.appearance,
          avatar = _this$props.avatar,
          borderColor = _this$props.borderColor,
          ProxiedComponent = _this$props.component,
          enableTooltip = _this$props.enableTooltip,
          groupAppearance = _this$props.groupAppearance,
          innerRef = _this$props.innerRef,
          isActive = _this$props.isActive,
          isDisabled = _this$props.isDisabled,
          isFocus = _this$props.isFocus,
          isHover = _this$props.isHover,
          isSelected = _this$props.isSelected,
          primaryText = _this$props.primaryText,
          secondaryText = _this$props.secondaryText,
          stackIndex = _this$props.stackIndex,
          rest = _objectWithoutProperties(_this$props, ["appearance", "avatar", "borderColor", "component", "enableTooltip", "groupAppearance", "innerRef", "isActive", "isDisabled", "isFocus", "isHover", "isSelected", "primaryText", "secondaryText", "stackIndex"]);

      return ProxiedComponent ? React.createElement(ProxiedComponent, rest) : null;
    }
  }]);

  return CustomComponentProxy;
}(Component);

export { CustomComponentProxy as default };