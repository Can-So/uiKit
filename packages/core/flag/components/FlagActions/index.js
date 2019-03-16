import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import uuid from 'uuid/v1';
import { ThemeProvider } from 'styled-components';
import Container, { Action, StyledButton } from './styledFlagActions';
import { getFlagTheme } from '../../theme';
import { DEFAULT_APPEARANCE } from '../Flag';

var FlagActions =
/*#__PURE__*/
function (_Component) {
  _inherits(FlagActions, _Component);

  function FlagActions() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FlagActions);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FlagActions)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "getButtonFocusRingColor", function () {
      return 'focusRingColor';
    });

    _defineProperty(_assertThisInitialized(_this), "getButtonTheme", function () {
      return 'buttonTheme';
    });

    _defineProperty(_assertThisInitialized(_this), "getButtonAppearance", function (b) {
      return b ? 'default' : 'subtle-link';
    });

    _defineProperty(_assertThisInitialized(_this), "getButtonSpacing", function (b) {
      return b ? 'compact' : 'none';
    });

    _defineProperty(_assertThisInitialized(_this), "getUniqueId", function (prefix) {
      return "".concat(prefix, "-").concat(uuid());
    });

    return _this;
  }

  _createClass(FlagActions, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          actions = _this$props.actions,
          appearance = _this$props.appearance,
          linkComponent = _this$props.linkComponent;
      var isBold = appearance !== DEFAULT_APPEARANCE;
      if (!actions.length) return null;
      var items = actions.map(function (action, index) {
        return React.createElement(Action, {
          key: _this2.getUniqueId('flag-action'),
          hasDivider: !!index,
          useMidDot: !isBold
        }, React.createElement(StyledButton, {
          onClick: action.onClick,
          href: action.href,
          target: action.target // This is verymuch a hack
          // This should be tidied up when the appearance prop of flag is aligned
          // with other appearance props.
          ,
          appearance: appearance === 'normal' ? 'link' : appearance,
          component: linkComponent,
          spacing: "compact"
        }, action.content));
      });
      return React.createElement(ThemeProvider, {
        theme: getFlagTheme
      }, React.createElement(Container, null, items));
    }
  }]);

  return FlagActions;
}(Component);

_defineProperty(FlagActions, "defaultProps", {
  appearance: DEFAULT_APPEARANCE,
  actions: []
});

export { FlagActions as default };