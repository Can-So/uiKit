import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import FormSectionWrapper, { FormSectionTitle, FormSectionDescription } from './styled/FormSection';

var FormSection =
/*#__PURE__*/
function (_Component) {
  _inherits(FormSection, _Component);

  function FormSection() {
    _classCallCheck(this, FormSection);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormSection).apply(this, arguments));
  }

  _createClass(FormSection, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          description = _this$props.description,
          children = _this$props.children;
      return React.createElement(FormSectionWrapper, null, title && React.createElement(FormSectionTitle, null, title), description && React.createElement(FormSectionDescription, null, description), children);
    }
  }]);

  return FormSection;
}(Component);

export { FormSection as default };