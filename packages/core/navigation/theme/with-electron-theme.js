import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import memoizeOne from 'memoize-one';
import { isElectronMacKey } from './util';
var getTheme = memoizeOne(function (isElectronMac) {
  return _defineProperty({}, isElectronMacKey, isElectronMac);
});

var WithElectronTheme =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(WithElectronTheme, _PureComponent);

  function WithElectronTheme() {
    _classCallCheck(this, WithElectronTheme);

    return _possibleConstructorReturn(this, _getPrototypeOf(WithElectronTheme).apply(this, arguments));
  }

  _createClass(WithElectronTheme, [{
    key: "render",
    value: function render() {
      var theme = getTheme(this.props.isElectronMac);
      return React.createElement(ThemeProvider, {
        theme: theme
      }, this.props.children);
    }
  }]);

  return WithElectronTheme;
}(PureComponent);

_defineProperty(WithElectronTheme, "defaultProps", {
  isElectronMac: false
});

export { WithElectronTheme as default };