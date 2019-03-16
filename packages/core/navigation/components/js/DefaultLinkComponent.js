import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';

var DefaultLinkComponent =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DefaultLinkComponent, _PureComponent);

  function DefaultLinkComponent() {
    _classCallCheck(this, DefaultLinkComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(DefaultLinkComponent).apply(this, arguments));
  }

  _createClass(DefaultLinkComponent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          href = _this$props.href,
          onClick = _this$props.onClick,
          onMouseDown = _this$props.onMouseDown,
          onMouseEnter = _this$props.onMouseEnter,
          onMouseLeave = _this$props.onMouseLeave,
          tabIndex = _this$props.tabIndex,
          appearance = _this$props.appearance,
          isSelected = _this$props.isSelected,
          otherProps = _objectWithoutProperties(_this$props, ["children", "className", "href", "onClick", "onMouseDown", "onMouseEnter", "onMouseLeave", "tabIndex", "appearance", "isSelected"]);

      return href ? React.createElement("a", _extends({
        className: className,
        href: href,
        onClick: onClick,
        onMouseDown: onMouseDown,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        tabIndex: tabIndex
      }, otherProps), children) : children;
    }
  }]);

  return DefaultLinkComponent;
}(PureComponent);

export { DefaultLinkComponent as default };