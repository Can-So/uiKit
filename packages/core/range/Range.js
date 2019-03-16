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
import { Input } from './styled';
import { Theme } from './theme';

var getPercentValue = function getPercentValue(value, min, max) {
  var percent = '0';

  if (min < max && value > min) {
    percent = ((value - min) / (max - min) * 100).toFixed(2);
  }

  return percent;
};

var Slider =
/*#__PURE__*/
function (_Component) {
  _inherits(Slider, _Component);

  function Slider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Slider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Slider)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
    });

    _defineProperty(_assertThisInitialized(_this), "range", void 0);

    _defineProperty(_assertThisInitialized(_this), "getValue", function () {
      return _this.props.value !== undefined ? _this.props.value : _this.state.value;
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (e) {
      // Event.target is typed as an EventTarget but we need to access properties on it which are
      // specific to HTMLInputElement. Due limitations of the HTML spec flow doesn't know that an
      // EventTarget can have these properties, so we cast it to Element through Object. This is
      // the safest thing we can do in this situation.
      var target = e.target;
      var value = parseFloat(target.value);
      var onChange = _this.props.onChange;

      _this.setState({
        value: value
      });

      if (onChange) {
        onChange(value);
      }
    });

    return _this;
  }

  _createClass(Slider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.range) {
        if (this.props.inputRef) {
          this.props.inputRef(this.range);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          isDisabled = _this$props.isDisabled,
          defaultValue = _this$props.defaultValue,
          theme = _this$props.theme,
          rest = _objectWithoutProperties(_this$props, ["isDisabled", "defaultValue", "theme"]);

      var _this$props2 = this.props,
          min = _this$props2.min,
          max = _this$props2.max;
      var value = this.getValue();
      return React.createElement(Theme.Provider, {
        value: theme
      }, React.createElement(Theme.Consumer, null, function (computedTheme) {
        return React.createElement(Input, _extends({}, computedTheme, {
          type: "range",
          value: value,
          onChange: _this2.handleChange,
          disabled: isDisabled,
          valuePercent: getPercentValue(value, min, max),
          innerRef: function innerRef(r) {
            _this2.range = r;
          }
        }, rest));
      }));
    }
  }]);

  return Slider;
}(Component);

_defineProperty(Slider, "defaultProps", {
  isDisabled: false,
  defaultValue: 50,
  min: 0,
  max: 100,
  step: 1,
  onChange: function onChange() {}
});

export { Slider as default };