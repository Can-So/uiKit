import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import { itemThemeNamespace } from '@findable/item';
import memoizeOne from 'memoize-one';
import createItemTheme from './map-navigation-theme-to-item-theme';
import { rootKey } from './util';

var WithRootTheme =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(WithRootTheme, _PureComponent);

  function WithRootTheme() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, WithRootTheme);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithRootTheme)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getWithOuterTheme", memoizeOne(function (provided, isCollapsed) {
      return function () {
        var _objectSpread2;

        var outerTheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var theme = {
          isCollapsed: isCollapsed || false,
          provided: provided
        };
        return _objectSpread({}, outerTheme, (_objectSpread2 = {}, _defineProperty(_objectSpread2, rootKey, theme), _defineProperty(_objectSpread2, itemThemeNamespace, createItemTheme(provided)), _objectSpread2));
      };
    }));

    return _this;
  }

  _createClass(WithRootTheme, [{
    key: "render",
    value: function render() {
      var withOuterTheme = this.getWithOuterTheme(this.props.provided, this.props.isCollapsed);
      return React.createElement(ThemeProvider, {
        theme: withOuterTheme
      }, this.props.children);
    }
  }]);

  return WithRootTheme;
}(PureComponent);

_defineProperty(WithRootTheme, "defaultProps", {
  isCollapsed: false
});

export { WithRootTheme as default };