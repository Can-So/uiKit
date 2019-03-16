import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { LabelWrapper, RequiredIndicator, LabelInner } from '../styled/Label';

var Label =
/*#__PURE__*/
function (_Component) {
  _inherits(Label, _Component);

  function Label() {
    _classCallCheck(this, Label);

    return _possibleConstructorReturn(this, _getPrototypeOf(Label).apply(this, arguments));
  }

  _createClass(Label, [{
    key: "render",

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    value: function render() {
      var _this$props = this.props,
          appearance = _this$props.appearance,
          children = _this$props.children,
          htmlFor = _this$props.htmlFor,
          isFirstChild = _this$props.isFirstChild,
          isLabelHidden = _this$props.isLabelHidden,
          isDisabled = _this$props.isDisabled,
          isRequired = _this$props.isRequired,
          label = _this$props.label,
          onClick = _this$props.onClick;
      return React.createElement(LabelWrapper, {
        htmlFor: htmlFor
      }, React.createElement(LabelInner, {
        isHidden: isLabelHidden,
        inlineEdit: appearance === 'inline-edit',
        firstChild: isFirstChild,
        isDisabled: isDisabled
      }, React.createElement("span", {
        onClick: onClick
      }, label), isRequired ? React.createElement(RequiredIndicator, {
        role: "presentation"
      }, "*") : null), children);
    }
  }]);

  return Label;
}(Component);

_defineProperty(Label, "defaultProps", {
  appearance: 'default'
});

export { Label as default };