import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import Icon from '@atlaskit/icon/glyph/checkbox';
import CheckboxIndeterminateIcon from '@atlaskit/icon/glyph/checkbox-indeterminate';
import { IconWrapper } from './styled/Checkbox';

var CheckboxIcon =
/*#__PURE__*/
function (_Component) {
  _inherits(CheckboxIcon, _Component);

  function CheckboxIcon() {
    _classCallCheck(this, CheckboxIcon);

    return _possibleConstructorReturn(this, _getPrototypeOf(CheckboxIcon).apply(this, arguments));
  }

  _createClass(CheckboxIcon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isChecked = _this$props.isChecked,
          isDisabled = _this$props.isDisabled,
          isInvalid = _this$props.isInvalid,
          isActive = _this$props.isActive,
          isFocused = _this$props.isFocused,
          isHovered = _this$props.isHovered,
          isIndeterminate = _this$props.isIndeterminate,
          primaryColor = _this$props.primaryColor,
          secondaryColor = _this$props.secondaryColor;
      return React.createElement(IconWrapper, {
        isChecked: isChecked,
        isDisabled: isDisabled,
        isFocused: isFocused,
        isActive: isActive,
        isHovered: isHovered,
        isInvalid: isInvalid
      }, isIndeterminate ? React.createElement(CheckboxIndeterminateIcon, {
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        isHovered: isHovered,
        isActive: isActive,
        label: ""
      }) : React.createElement(Icon, {
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        isHovered: isHovered,
        isActive: isActive,
        label: ""
      }));
    }
  }]);

  return CheckboxIcon;
}(Component);

_defineProperty(CheckboxIcon, "defaultProps", {
  primaryColor: 'inherit',
  secondaryColor: 'inherit',
  isIndeterminate: false
});

export { CheckboxIcon as default };