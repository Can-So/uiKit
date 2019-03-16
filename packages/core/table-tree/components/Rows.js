import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import Items from './Items';

var Rows =
/*#__PURE__*/
function (_Component) {
  _inherits(Rows, _Component);

  function Rows() {
    _classCallCheck(this, Rows);

    return _possibleConstructorReturn(this, _getPrototypeOf(Rows).apply(this, arguments));
  }

  _createClass(Rows, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          items = _this$props.items,
          render = _this$props.render;
      return React.createElement("div", null, React.createElement(Items, {
        items: items,
        render: render
      }));
    }
  }]);

  return Rows;
}(Component);

export { Rows as default };