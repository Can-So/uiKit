import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import textContent from 'react-addons-text-content';
import { GroupTitle, GroupTitleText, GroupTitleAfter } from '../styled/ItemGroup';

var ItemGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(ItemGroup, _Component);

  function ItemGroup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ItemGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ItemGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "headingAfterElement", void 0);

    return _this;
  }

  _createClass(ItemGroup, [{
    key: "render",
    // eslint-disable-line react/sort-comp
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          elemAfter = _this$props.elemAfter,
          isCompact = _this$props.isCompact,
          title = _this$props.title,
          label = _this$props.label,
          innerRef = _this$props.innerRef,
          role = _this$props.role;

      var ariaLabel = function () {
        if (label) {
          return textContent(label);
        }

        if (title) {
          return textContent(title);
        }

        return '';
      }();

      return React.createElement("div", {
        "aria-label": ariaLabel,
        role: role,
        ref: innerRef
      }, title ? React.createElement(GroupTitle, {
        "aria-hidden": "true",
        isCompact: isCompact
      }, React.createElement(GroupTitleText, null, title), elemAfter ? React.createElement(GroupTitleAfter, {
        innerRef: function innerRef(r) {
          _this2.headingAfterElement = r;
        }
      }, elemAfter) : null) : null, children);
    }
  }]);

  return ItemGroup;
}(Component);

_defineProperty(ItemGroup, "defaultProps", {
  role: 'group'
});

export { ItemGroup as default };