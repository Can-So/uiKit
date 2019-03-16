import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import RadioIcon from '@atlaskit/icon/glyph/radio';
import { HiddenInput, IconWrapper, Label, Wrapper } from './styled/Radio';

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
      mouseIsDown: false
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      return _this.setState({
        // onBlur is called after onMouseDown if the checkbox was focused, however
        // in this case on blur is called immediately after, and we need to check
        // whether the mouse is down.
        isActive: _this.state.mouseIsDown && _this.state.isActive,
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
        mouseIsDown: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function () {
      return _this.setState({
        isActive: true,
        mouseIsDown: true
      });
    });

    return _this;
  }

  _createClass(Radio, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          isDisabled = _this$props.isDisabled,
          isRequired = _this$props.isRequired,
          isSelected = _this$props.isSelected,
          name = _this$props.name,
          onChange = _this$props.onChange,
          value = _this$props.value;
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
      }, React.createElement(HiddenInput, {
        checked: isSelected,
        disabled: isDisabled,
        name: name,
        onChange: onChange,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        required: isRequired,
        type: "radio",
        value: value
      }), React.createElement(Wrapper, null, React.createElement(IconWrapper, {
        isSelected: isSelected,
        isDisabled: isDisabled,
        isFocused: isFocused,
        isActive: isActive,
        isHovered: isHovered
      }, React.createElement(RadioIcon, {
        primaryColor: "inherit",
        secondaryColor: "inherit",
        isHovered: this.state.isHovered,
        isActive: this.state.isActive,
        label: ""
      })), React.createElement("span", null, children)));
    }
  }]);

  return Radio;
}(Component);

_defineProperty(Radio, "defaultProps", {
  isDisabled: false,
  isSelected: false
});

export { Radio as default };