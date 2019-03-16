import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import IconWrapper from './styledIconForType';
import { typesMapping } from '../../constants';

var SelectedIconForType =
/*#__PURE__*/
function (_Component) {
  _inherits(SelectedIconForType, _Component);

  function SelectedIconForType() {
    _classCallCheck(this, SelectedIconForType);

    return _possibleConstructorReturn(this, _getPrototypeOf(SelectedIconForType).apply(this, arguments));
  }

  _createClass(SelectedIconForType, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          type = _this$props.type,
          isHovered = _this$props.isHovered,
          isOpen = _this$props.isOpen;
      var _typesMapping$type = typesMapping[type],
          SelectedIcon = _typesMapping$type.icon,
          iconSize = _typesMapping$type.iconSize;
      return React.createElement(IconWrapper, {
        appearance: type,
        isHovered: isHovered,
        isOpen: isOpen
      }, React.createElement(SelectedIcon, {
        label: "Inline message icon",
        size: iconSize
      }));
    }
  }]);

  return SelectedIconForType;
}(Component);

export { SelectedIconForType as default };