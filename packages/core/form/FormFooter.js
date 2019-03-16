import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { FormFooterWrapper } from './styled/FormFooter';

var FormFooter =
/*#__PURE__*/
function (_Component) {
  _inherits(FormFooter, _Component);

  function FormFooter() {
    _classCallCheck(this, FormFooter);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormFooter).apply(this, arguments));
  }

  _createClass(FormFooter, [{
    key: "render",
    value: function render() {
      return React.createElement(FormFooterWrapper, null, this.props.children);
    }
  }]);

  return FormFooter;
}(Component);

export { FormFooter as default };