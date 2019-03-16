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
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import { ThemeProvider } from 'styled-components';
import CheckboxIcon from './CheckboxIcon';
import { name as packageName, version as packageVersion } from './version.json';
import { HiddenCheckbox, Label, LabelText, CheckboxWrapper, RequiredIndicator } from './styled/Checkbox';
var emptyTheme = {};

var Checkbox =
/*#__PURE__*/
function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Checkbox)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isActive: false,
      isFocused: false,
      isHovered: false,
      isMouseDown: false,
      isChecked: _this.props.isChecked !== undefined ? _this.props.isChecked : _this.props.defaultChecked
    });

    _defineProperty(_assertThisInitialized(_this), "checkbox", void 0);

    _defineProperty(_assertThisInitialized(_this), "actionKeys", [' ']);

    _defineProperty(_assertThisInitialized(_this), "getProp", function (key) {
      return key in _this.props ? _this.props[key] : _this.state[key];
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      if (_this.props.isDisabled) return null;
      event.persist();

      if (event.target.checked !== undefined) {
        _this.setState({
          isChecked: event.target.checked
        });
      }

      if (_this.props.onChange) {
        _this.props.onChange(event);
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "blur", function () {
      if (_this.checkbox && _this.checkbox.blur) _this.checkbox.blur();
    });

    _defineProperty(_assertThisInitialized(_this), "focus", function () {
      if (_this.checkbox && _this.checkbox.focus) _this.checkbox.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      return _this.setState({
        // onBlur is called after onMouseDown if the checkbox was focused, however
        // in this case on blur is called immediately after, and we need to check
        // whether the mouse is down.
        isActive: _this.state.isMouseDown && _this.state.isActive,
        isFocused: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      return _this.setState({
        isFocused: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
      return _this.setState({
        isActive: false,
        isHovered: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function () {
      return _this.setState({
        isHovered: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function () {
      return _this.setState({
        isActive: false,
        isMouseDown: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function () {
      return _this.setState({
        isActive: true,
        isMouseDown: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      if (_this.actionKeys.includes(event.key)) {
        _this.setState({
          isActive: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (event) {
      if (_this.actionKeys.includes(event.key)) {
        _this.setState({
          isActive: false
        });
      }
    });

    return _this;
  }

  _createClass(Checkbox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var isIndeterminate = this.props.isIndeterminate; // there is no HTML attribute for indeterminate, and thus no prop equivalent.
      // it must be set via the ref.

      if (this.checkbox) {
        this.checkbox.indeterminate = !!isIndeterminate;

        if (this.props.inputRef) {
          this.props.inputRef(this.checkbox);
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var isIndeterminate = this.props.isIndeterminate;

      if (prevProps.isIndeterminate !== isIndeterminate && this.checkbox) {
        this.checkbox.indeterminate = !!isIndeterminate;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          isDisabled = _this$props.isDisabled,
          isInvalid = _this$props.isInvalid,
          isIndeterminate = _this$props.isIndeterminate,
          label = _this$props.label,
          name = _this$props.name,
          value = _this$props.value,
          onChange = _this$props.onChange,
          isRequired = _this$props.isRequired,
          defaultChecked = _this$props.defaultChecked,
          rest = _objectWithoutProperties(_this$props, ["isDisabled", "isInvalid", "isIndeterminate", "label", "name", "value", "onChange", "isRequired", "defaultChecked"]);

      var isChecked = this.getProp('isChecked');
      var _this$state = this.state,
          isFocused = _this$state.isFocused,
          isActive = _this$state.isActive,
          isHovered = _this$state.isHovered;
      return React.createElement(ThemeProvider, {
        theme: emptyTheme
      }, React.createElement(Label, {
        isDisabled: isDisabled,
        onMouseDown: this.onMouseDown,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        onMouseUp: this.onMouseUp
      }, React.createElement(CheckboxWrapper, null, React.createElement(HiddenCheckbox, _extends({
        disabled: isDisabled,
        checked: isChecked,
        onChange: this.onChange,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        onKeyUp: this.onKeyUp,
        onKeyDown: this.onKeyDown,
        type: "checkbox",
        value: value,
        name: name,
        innerRef: function innerRef(r) {
          return _this2.checkbox = r;
        } // eslint-disable-line
        ,
        required: isRequired
      }, rest)), React.createElement(CheckboxIcon, {
        isChecked: isChecked,
        isDisabled: isDisabled,
        isFocused: isFocused,
        isActive: isActive,
        isHovered: isHovered,
        isInvalid: isInvalid,
        isIndeterminate: isIndeterminate,
        primaryColor: "inherit",
        secondaryColor: "inherit",
        label: ""
      })), React.createElement(LabelText, null, label, isRequired && React.createElement(RequiredIndicator, {
        "aria-hidden": "true"
      }, "*"))));
    }
  }]);

  return Checkbox;
}(Component);

_defineProperty(Checkbox, "defaultProps", {
  isDisabled: false,
  isInvalid: false,
  defaultChecked: false,
  isIndeterminate: false
});

export { Checkbox as CheckboxWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'checkbox',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onChange: createAndFireEventOnAtlaskit({
    action: 'changed',
    actionSubject: 'checkbox',
    attributes: {
      componentName: 'checkbox',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(Checkbox));