import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import Button from '../styled/Button';
import ItemWrapper from '../styled/BreadcrumbsItem';
import Separator from '../styled/Separator';

var EllipsisItem =
/*#__PURE__*/
function (_Component) {
  _inherits(EllipsisItem, _Component);

  function EllipsisItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EllipsisItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EllipsisItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    return _this;
  }

  _createClass(EllipsisItem, [{
    key: "render",
    value: function render() {
      return React.createElement(ItemWrapper, null, React.createElement(Button, {
        appearance: "subtle-link",
        spacing: "none",
        onClick: this.props.onClick
      }, "\u2026"), this.props.hasSeparator ? React.createElement(Separator, null, "/") : null);
    }
  }]);

  return EllipsisItem;
}(Component);
/* eslint-enable react/prefer-stateless-function */


_defineProperty(EllipsisItem, "defaultProps", {
  hasSeparator: false,
  onClick: function onClick() {}
});

export { EllipsisItem as default };