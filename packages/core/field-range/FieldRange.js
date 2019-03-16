import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { Input } from './styled';

var Slider =
/*#__PURE__*/
function (_Component) {
  _inherits(Slider, _Component);

  // eslint-disable-next-line
  function Slider(props) {
    var _this;

    _classCallCheck(this, Slider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slider).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "inputElement", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "getPercentValue", function (value, min, max) {
      var percent = '0';

      if (min < max && value > min) {
        percent = ((value - min) / (max - min) * 100).toFixed(2);
      }

      return percent;
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (e) {
      // Event.target is typed as an EventTarget but we need to access properties on it which are
      // specific to HTMLInputElement. Due limitations of the HTML spec flow doesn't know that an
      // EventTarget can have these properties, so we cast it to Element through Object. This is
      // the safest thing we can do in this situation.
      var target = e.target;
      var value = parseFloat(target.value);
      var _this$props = _this.props,
          max = _this$props.max,
          onChange = _this$props.onChange,
          min = _this$props.min;

      var valuePercent = _this.getPercentValue(value, min, max);

      _this.setState({
        value: value,
        valuePercent: valuePercent
      });

      if (onChange) {
        onChange(value);
      }
    });

    _this.inputElement = null;
    _this.state = {
      value: props.value,
      valuePercent: _this.getPercentValue(props.value, props.min, props.max)
    };
    return _this;
  }

  _createClass(Slider, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(_ref) {
      var nextValue = _ref.value,
          min = _ref.min,
          max = _ref.max;
      var currentValue = this.props.value;

      if (currentValue !== nextValue) {
        var valuePercent = this.getPercentValue(nextValue, min, max);
        this.setState({
          value: nextValue,
          valuePercent: valuePercent
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          min = _this$props2.min,
          max = _this$props2.max,
          step = _this$props2.step,
          disabled = _this$props2.disabled;
      var _this$state = this.state,
          value = _this$state.value,
          valuePercent = _this$state.valuePercent;
      return React.createElement(Input, {
        type: "range",
        value: value.toString(),
        min: min,
        max: max,
        step: step,
        onChange: this.handleChange,
        disabled: disabled,
        valuePercent: valuePercent
      });
    }
  }]);

  return Slider;
}(Component);

_defineProperty(Slider, "defaultProps", {
  disabled: false,
  value: 0,
  min: 0,
  max: 100,
  step: 0.1,
  onChange: function onChange() {}
});

export { Slider as default };