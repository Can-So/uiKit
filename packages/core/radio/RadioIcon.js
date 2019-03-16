import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import Icon from '@atlaskit/icon/glyph/radio';
import { IconWrapper } from './styled/Radio';

var RadioIcon =
/*#__PURE__*/
function (_Component) {
  _inherits(RadioIcon, _Component);

  function RadioIcon() {
    _classCallCheck(this, RadioIcon);

    return _possibleConstructorReturn(this, _getPrototypeOf(RadioIcon).apply(this, arguments));
  }

  _createClass(RadioIcon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isActive = _this$props.isActive,
          isChecked = _this$props.isChecked,
          isDisabled = _this$props.isDisabled,
          isFocused = _this$props.isFocused,
          isHovered = _this$props.isHovered,
          isInvalid = _this$props.isInvalid;
      return React.createElement(IconWrapper, {
        isActive: isActive,
        isChecked: isChecked,
        isDisabled: isDisabled,
        isFocused: isFocused,
        isHovered: isHovered,
        isInvalid: isInvalid
      }, React.createElement(Icon, {
        isActive: isActive,
        isHovered: isHovered,
        label: "",
        primaryColor: "inherit",
        secondaryColor: "inherit"
      }));
    }
  }]);

  return RadioIcon;
}(Component);

export { RadioIcon as default };