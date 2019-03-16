import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { createAndFireEvent, withAnalyticsContext, withAnalyticsEvents } from '@findable/analytics-next';
import { name as packageName, version as packageVersion } from './version.json';
import RadioIcon from './RadioIcon';
import { RadioInputWrapper, HiddenInput } from './styled/RadioInput';
import { Label, LabelText } from './styled/Radio';

var Radio =
/*#__PURE__*/
function (_Component) {
  _inherits(Radio, _Component);

  function Radio() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Radio);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Radio)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isHovered: false,
      isFocused: false,
      isActive: false,
      isMouseDown: false
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (event) {
      _this.setState({
        // onBlur is called after onMouseDown if the checkbox was focused, however
        // in this case on blur is called immediately after, and we need to check
        // whether the mouse is down.
        isActive: _this.state.isMouseDown && _this.state.isActive,
        isFocused: false
      });

      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function (event) {
      _this.setState({
        isFocused: true
      });

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function (event) {
      _this.setState({
        isActive: false,
        isHovered: false
      });

      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (event) {
      _this.setState({
        isHovered: true
      });

      if (_this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function (event) {
      _this.setState({
        isActive: false,
        isMouseDown: false
      });

      if (_this.props.onMouseUp) {
        _this.props.onMouseUp(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function (event) {
      _this.setState({
        isActive: true,
        isMouseDown: true
      });

      if (_this.props.onMouseDown) {
        _this.props.onMouseDown(event);
      }
    });

    return _this;
  }

  _createClass(Radio, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          ariaLabel = _this$props.ariaLabel,
          isDisabled = _this$props.isDisabled,
          isRequired = _this$props.isRequired,
          isInvalid = _this$props.isInvalid,
          isChecked = _this$props.isChecked,
          label = _this$props.label,
          name = _this$props.name,
          onChange = _this$props.onChange,
          onInvalid = _this$props.onInvalid,
          value = _this$props.value,
          rest = _objectWithoutProperties(_this$props, ["ariaLabel", "isDisabled", "isRequired", "isInvalid", "isChecked", "label", "name", "onChange", "onInvalid", "value"]);

      var _this$state = this.state,
          isFocused = _this$state.isFocused,
          isHovered = _this$state.isHovered,
          isActive = _this$state.isActive;
      return React.createElement(Label, {
        isDisabled: isDisabled,
        onMouseDown: this.onMouseDown,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        onMouseUp: this.onMouseUp
      }, React.createElement(RadioInputWrapper, null, React.createElement(HiddenInput, _extends({
        "aria-label": ariaLabel,
        checked: isChecked,
        disabled: isDisabled,
        name: name,
        onChange: onChange,
        onBlur: this.onBlur,
        onInvalid: onInvalid,
        onFocus: this.onFocus,
        required: isRequired,
        type: "radio",
        value: value
      }, rest)), React.createElement(RadioIcon, {
        isActive: isActive,
        isChecked: isChecked,
        isDisabled: isDisabled,
        isFocused: isFocused,
        isHovered: isHovered,
        isInvalid: isInvalid
      })), label ? React.createElement(LabelText, null, label) : null);
    }
  }]);

  return Radio;
}(Component);

_defineProperty(Radio, "defaultProps", {
  isDisabled: false,
  isInvalid: false,
  isChecked: false
});

var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export { Radio as RadioWithoutAnalytics };
export default withAnalyticsContext({
  componentName: 'radio',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onChange: createAndFireEventOnAtlaskit({
    action: 'changed',
    actionSubject: 'radio',
    attributes: {
      componentName: 'radio',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(Radio));