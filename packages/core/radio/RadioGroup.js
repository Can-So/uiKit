import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component, Fragment } from 'react';
import Radio from './Radio';

var RadioGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(RadioGroup, _Component);

  function RadioGroup(props) {
    var _this;

    _classCallCheck(this, RadioGroup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RadioGroup).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getProp", function (key) {
      return _this.props[key] ? _this.props[key] : _this.state[key];
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      _this.setState({
        value: event.currentTarget.value
      });

      if (typeof _this.props.onChange === 'function') {
        _this.props.onChange(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "buildOptions", function () {
      var _this$props = _this.props,
          options = _this$props.options,
          isDisabled = _this$props.isDisabled,
          isRequired = _this$props.isRequired,
          onInvalid = _this$props.onInvalid;

      var value = _this.getProp('value');

      if (!options.length) return null;
      return options.map(function (option, index) {
        var optionProps = _objectSpread({}, option);

        if (typeof isDisabled !== 'undefined') {
          optionProps.isDisabled = isDisabled;
        }

        if (value !== null && option.value === value) {
          optionProps.isChecked = true;
        }

        return React.createElement(Radio, _extends({}, optionProps, {
          key: index,
          onChange: _this.onChange,
          onInvalid: onInvalid,
          isRequired: isRequired
        }));
      });
    });

    _this.state = {
      value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
    };
    return _this;
  }

  _createClass(RadioGroup, [{
    key: "render",
    value: function render() {
      var options = this.buildOptions();
      return React.createElement(Fragment, null, options);
    }
  }]);

  return RadioGroup;
}(Component);

_defineProperty(RadioGroup, "defaultProps", {
  onChange: function onChange() {},
  options: []
});

export { RadioGroup as default };