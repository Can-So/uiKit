import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { ItemGroup } from '@atlaskit/item';

var DropdownItemGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownItemGroup, _Component);

  function DropdownItemGroup() {
    _classCallCheck(this, DropdownItemGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(DropdownItemGroup).apply(this, arguments));
  }

  _createClass(DropdownItemGroup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          elemAfter = _this$props.elemAfter,
          title = _this$props.title;
      return React.createElement(ItemGroup, {
        elemAfter: elemAfter,
        title: title,
        role: "menu"
      }, children);
    }
  }]);

  return DropdownItemGroup;
}(Component);

export { DropdownItemGroup as default };