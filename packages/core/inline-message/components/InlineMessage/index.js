import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import Button from '@atlaskit/button';
import InlineDialog from '@atlaskit/inline-dialog';
import IconForType from '../IconForType';
import { Root, ButtonContents, Text, Title } from './styledInlineMessage';

var InlineMessage =
/*#__PURE__*/
function (_Component) {
  _inherits(InlineMessage, _Component);

  function InlineMessage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InlineMessage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InlineMessage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: false,
      isHovered: false
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function () {
      _this.setState({
        isHovered: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
      _this.setState({
        isHovered: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleDialog", function () {
      _this.setState({
        isOpen: !_this.state.isOpen
      });
    });

    return _this;
  }

  _createClass(InlineMessage, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          placement = _this$props.placement,
          secondaryText = _this$props.secondaryText,
          title = _this$props.title,
          type = _this$props.type;
      var _this$state = this.state,
          isHovered = _this$state.isHovered,
          isOpen = _this$state.isOpen;
      return React.createElement(Root, {
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        appearance: type
      }, React.createElement(InlineDialog, {
        onClose: function onClose() {
          _this2.setState({
            isOpen: false
          });
        },
        content: children,
        isOpen: isOpen,
        placement: placement
      }, React.createElement(Button, {
        appearance: "subtle-link",
        onClick: this.toggleDialog,
        spacing: "none"
      }, React.createElement(ButtonContents, {
        isHovered: isHovered
      }, React.createElement(IconForType, {
        type: type,
        isHovered: isHovered,
        isOpen: isOpen
      }), title ? React.createElement(Title, {
        isHovered: isHovered
      }, title) : null, secondaryText ? React.createElement(Text, {
        isHovered: isHovered
      }, secondaryText) : null))));
    }
  }]);

  return InlineMessage;
}(Component);

_defineProperty(InlineMessage, "defaultProps", {
  children: null,
  placement: 'bottom-start',
  secondaryText: '',
  title: '',
  type: 'connectivity'
});

export { InlineMessage as default };