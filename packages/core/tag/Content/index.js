import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, Text, linkStyles } from './styled';

var Content =
/*#__PURE__*/
function (_Component) {
  _inherits(Content, _Component);

  function Content() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Content);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Content)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getLinkComponent", function () {
      var _this$props = _this.props,
          linkComponent = _this$props.linkComponent,
          href = _this$props.href;
      if (!href) return null;
      if (linkComponent) return styled(linkComponent).withConfig({
        displayName: "Content",
        componentId: "nijpvw-0"
      })(["\n        ", ";\n      "], linkStyles);
      return Link;
    });

    return _this;
  }

  _createClass(Content, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          href = _this$props2.href,
          isFocused = _this$props2.isFocused,
          isRemovable = _this$props2.isRemovable,
          markedForRemoval = _this$props2.markedForRemoval,
          color = _this$props2.color;
      var styledProps = {
        isFocused: isFocused,
        isRemovable: isRemovable,
        markedForRemoval: markedForRemoval,
        color: color
      };
      var LinkComponent = this.getLinkComponent();
      return href && LinkComponent ? React.createElement(LinkComponent, _extends({}, styledProps, {
        href: href,
        tabIndex: "-1"
      }), children) : React.createElement(Text, styledProps, children);
    }
  }]);

  return Content;
}(Component);

export { Content as default };