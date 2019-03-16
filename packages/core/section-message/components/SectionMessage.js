import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import Button from '@findable/button';
import { baseAppearanceObj } from '../theme';
import { Container, Title, Description, Actions, Action, IconWrapper } from './styled';

var SectionMessage =
/*#__PURE__*/
function (_Component) {
  _inherits(SectionMessage, _Component);

  function SectionMessage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SectionMessage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SectionMessage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderAction", function (action, linkComponent) {
      var href = action.href,
          key = action.key,
          onClick = action.onClick,
          text = action.text;
      return React.createElement(Action, {
        key: key
      }, onClick || href ? React.createElement(Button, {
        appearance: "link",
        spacing: "none",
        onClick: onClick,
        href: href,
        component: linkComponent
      }, text) : text);
    });

    return _this;
  }

  _createClass(SectionMessage, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          title = _this$props.title,
          actions = _this$props.actions,
          appearance = _this$props.appearance,
          icon = _this$props.icon,
          linkComponent = _this$props.linkComponent;
      var appearanceObj = baseAppearanceObj[appearance] || baseAppearanceObj.info;
      var Icon = icon || appearanceObj.Icon;
      return React.createElement(Container, {
        backgroundColor: appearanceObj.backgroundColor
      }, React.createElement(IconWrapper, null, React.createElement(Icon, {
        primaryColor: appearanceObj.primaryIconColor,
        secondaryColor: appearanceObj.backgroundColor
      })), React.createElement("div", null, title ? React.createElement(Title, null, title) : null, children ? React.createElement(Description, null, children) : null, actions && actions.length ? React.createElement(Actions, null, actions.map(function (action) {
        return _this2.renderAction(action, linkComponent);
      })) : null));
    }
  }]);

  return SectionMessage;
}(Component);

_defineProperty(SectionMessage, "defaultProps", {
  appearance: 'info'
});

export { SectionMessage as default };