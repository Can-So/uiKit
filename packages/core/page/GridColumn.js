import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

var _class, _temp;

import React, { Component } from 'react';
import { ThemeProvider, withTheme } from 'styled-components';
import { defaultGridColumns } from './internal/vars';
import GridColumn from './internal/GridColumnElement';
var defaultSpacing = 'cosy';
export default withTheme((_temp = _class =
/*#__PURE__*/
function (_Component) {
  _inherits(AkGridColumn, _Component);

  function AkGridColumn() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AkGridColumn);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AkGridColumn)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getTheme", function (props) {
      return {
        columns: props.theme && props.theme.columns ? props.theme.columns : defaultGridColumns,
        spacing: props.theme && props.theme.spacing ? props.theme.spacing : defaultSpacing,
        isNestedGrid: false
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getNestedTheme", function (props) {
      return {
        columns: props.medium,
        spacing: props.theme && props.theme.spacing ? props.theme.spacing : defaultSpacing,
        isNestedGrid: true
      };
    });

    return _this;
  }

  _createClass(AkGridColumn, [{
    key: "render",
    value: function render() {
      return React.createElement(ThemeProvider, {
        theme: this.getTheme(this.props)
      }, React.createElement(GridColumn, {
        medium: this.props.medium
      }, React.createElement(ThemeProvider, {
        theme: this.getNestedTheme(this.props)
      }, React.createElement("div", null, this.props.children))));
    }
  }]);

  return AkGridColumn;
}(Component), _defineProperty(_class, "defaultProps", {
  medium: 0
}), _temp));