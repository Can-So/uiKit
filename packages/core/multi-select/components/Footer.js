import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
import { Item } from '@atlaskit/droplist';
import FooterDiv from '../styled/Footer';

var Footer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Footer, _PureComponent);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Footer).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          appearance = _this$props.appearance,
          children = _this$props.children,
          elemBefore = _this$props.elemBefore,
          isFocused = _this$props.isFocused,
          onClick = _this$props.onClick,
          shouldHideSeparator = _this$props.shouldHideSeparator;
      return React.createElement(FooterDiv, {
        onClick: onClick,
        shouldHideSeparator: shouldHideSeparator
      }, React.createElement(Item, {
        appearance: appearance,
        elemBefore: elemBefore,
        isFocused: isFocused,
        type: "option"
      }, children));
    }
  }]);

  return Footer;
}(PureComponent);

export { Footer as default };