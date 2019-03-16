import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import Header from './Header';
import { HeadersContainer } from '../styled';

var Headers =
/*#__PURE__*/
function (_Component) {
  _inherits(Headers, _Component);

  function Headers() {
    _classCallCheck(this, Headers);

    return _possibleConstructorReturn(this, _getPrototypeOf(Headers).apply(this, arguments));
  }

  _createClass(Headers, [{
    key: "render",
    value: function render() {
      return React.createElement(HeadersContainer, {
        role: 'row'
      }, React.Children.map(this.props.children, function (header, index) {
        return React.cloneElement(header, {
          key: index,
          columnIndex: index
        });
      }));
    }
  }]);

  return Headers;
}(Component);

export { Headers as default };