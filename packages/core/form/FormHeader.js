import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import FormHeaderWrapper, { FormHeaderTitle, FormHeaderDescription, FormHeaderContent } from './styled/FormHeader';

var FormHeader =
/*#__PURE__*/
function (_Component) {
  _inherits(FormHeader, _Component);

  function FormHeader() {
    _classCallCheck(this, FormHeader);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormHeader).apply(this, arguments));
  }

  _createClass(FormHeader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          description = _this$props.description,
          children = _this$props.children;
      return React.createElement(FormHeaderWrapper, null, title && React.createElement(FormHeaderTitle, null, title), description && React.createElement(FormHeaderDescription, null, description), React.createElement(FormHeaderContent, null, children));
    }
  }]);

  return FormHeader;
}(Component);

export { FormHeader as default };