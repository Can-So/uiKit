import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import Items from './Items';
import toItemId from '../utils/toItemId';

var Item =
/*#__PURE__*/
function (_Component) {
  _inherits(Item, _Component);

  function Item() {
    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, _getPrototypeOf(Item).apply(this, arguments));
  }

  _createClass(Item, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          depth = _this$props.depth,
          data = _this$props.data,
          render = _this$props.render;
      var renderedRow = render(data);

      if (!renderedRow) {
        return null;
      }

      var _renderedRow$props = renderedRow.props,
          itemId = _renderedRow$props.itemId,
          items = _renderedRow$props.items;
      return React.cloneElement(renderedRow, {
        depth: depth,
        data: data,
        renderChildren: function renderChildren() {
          return React.createElement("div", {
            id: toItemId(itemId)
          }, React.createElement(Items, {
            parentData: data,
            depth: depth,
            items: items,
            render: render
          }));
        }
      });
    }
  }]);

  return Item;
}(Component);

_defineProperty(Item, "defaultProps", {
  depth: 0
});

export { Item as default };