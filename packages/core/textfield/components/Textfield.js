import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import GlobalTheme from '@atlaskit/theme';
import React, { Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import { name as packageName, version as packageVersion } from '../version.json';
import Input from './Input';
import { Theme } from '../theme';

var Textfield =
/*#__PURE__*/
function (_Component) {
  _inherits(Textfield, _Component);

  function Textfield() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Textfield);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Textfield)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isFocused: false,
      isHovered: false
    });

    _defineProperty(_assertThisInitialized(_this), "input", void 0);

    _defineProperty(_assertThisInitialized(_this), "handleOnFocus", function (e) {
      _this.setState({
        isFocused: true
      });

      if (_this.props.onFocus) {
        _this.props.onFocus(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnBlur", function (e) {
      _this.setState({
        isFocused: false
      });

      if (_this.props.onBlur) {
        _this.props.onBlur(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function () {
      _this.setState({
        isHovered: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
      _this.setState({
        isHovered: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setInputRef", function (input) {
      _this.input = input;

      if (_this.props.forwardedRef) {
        _this.props.forwardedRef(input);
      }
    });

    return _this;
  }

  _createClass(Textfield, [{
    key: "focus",
    value: function focus() {
      if (this.input) {
        this.input.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          isFocused = _this$state.isFocused,
          isHovered = _this$state.isHovered;

      var _this$props = this.props,
          appearance = _this$props.appearance,
          createAnalyticsEvent = _this$props.createAnalyticsEvent,
          forwardedRef = _this$props.forwardedRef,
          isCompact = _this$props.isCompact,
          isDisabled = _this$props.isDisabled,
          isInvalid = _this$props.isInvalid,
          isMonospaced = _this$props.isMonospaced,
          theme = _this$props.theme,
          width = _this$props.width,
          rest = _objectWithoutProperties(_this$props, ["appearance", "createAnalyticsEvent", "forwardedRef", "isCompact", "isDisabled", "isInvalid", "isMonospaced", "theme", "width"]);

      return React.createElement(Theme.Provider, {
        value: theme
      }, React.createElement(GlobalTheme.Consumer, null, function (_ref) {
        var mode = _ref.mode;
        return React.createElement(Theme.Consumer, {
          appearance: appearance,
          mode: mode,
          width: width,
          isDisabled: isDisabled,
          isCompact: isCompact,
          isMonospaced: isMonospaced,
          isFocused: isFocused,
          isHovered: isHovered,
          isInvalid: isInvalid
        }, function (tokens) {
          return React.createElement(Input, _extends({}, rest, {
            theme: tokens,
            isFocused: isFocused,
            isHovered: isHovered,
            onMouseEnter: _this2.onMouseEnter,
            onMouseLeave: _this2.onMouseLeave,
            forwardedRef: forwardedRef,
            onFocus: _this2.handleOnFocus,
            onBlur: _this2.handleOnBlur
          }));
        });
      }));
    }
  }]);

  return Textfield;
}(Component); // $ExpectError - flow 0.67 doesn't know about forwardRef


_defineProperty(Textfield, "defaultProps", {
  appearance: 'standard',
  isCompact: false,
  isMonospaced: false,
  isInvalid: false
});

var ForwardRefTextfield = React.forwardRef(function (props, ref) {
  return React.createElement(Textfield, _extends({}, props, {
    forwardedRef: ref
  }));
});
export { ForwardRefTextfield as TextFieldWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'textField',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onBlur: createAndFireEventOnAtlaskit({
    action: 'blurred',
    actionSubject: 'textField',
    attributes: {
      componentName: 'textField',
      packageName: packageName,
      packageVersion: packageVersion
    }
  }),
  onFocus: createAndFireEventOnAtlaskit({
    action: 'focused',
    actionSubject: 'textField',
    attributes: {
      componentName: 'textField',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(ForwardRefTextfield));