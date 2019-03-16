import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import Container from './styledContainer';
import Content from './styledContent';
import { Theme } from '../theme';

var Lozenge =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Lozenge, _PureComponent);

  function Lozenge() {
    _classCallCheck(this, Lozenge);

    return _possibleConstructorReturn(this, _getPrototypeOf(Lozenge).apply(this, arguments));
  }

  _createClass(Lozenge, [{
    key: "render",
    value: function render() {
      var props = this.props;
      return React.createElement(Theme.Provider, {
        value: props.theme
      }, React.createElement(Theme.Consumer, props, function (tokens) {
        return React.createElement(Container, tokens, React.createElement(Content, tokens, props.children));
      }));
    }
  }]);

  return Lozenge;
}(PureComponent);

_defineProperty(Lozenge, "defaultProps", {
  isBold: false,
  appearance: 'default',
  maxWidth: 200
});

export { Lozenge as default };