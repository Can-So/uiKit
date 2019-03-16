import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import FieldTextAreaStateless from './FieldTextAreaStateless';

var FieldTextArea =
/*#__PURE__*/
function (_Component) {
  _inherits(FieldTextArea, _Component);

  function FieldTextArea() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FieldTextArea);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FieldTextArea)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "input", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: _this.props.value
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnChange", function (e) {
      _this.setState({
        value: e.target.value
      });

      if (_this.props.onChange) _this.props.onChange(e);
    });

    _defineProperty(_assertThisInitialized(_this), "focus", function () {
      _this.input.focus();
    });

    return _this;
  }

  _createClass(FieldTextArea, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(FieldTextAreaStateless, _extends({}, this.props, {
        value: this.state.value,
        onChange: this.handleOnChange,
        ref: function ref(fieldRef) {
          _this2.input = fieldRef;
        }
      }));
    }
  }]);

  return FieldTextArea;
}(Component);

_defineProperty(FieldTextArea, "defaultProps", {
  onChange: function onChange() {},
  enableResize: false
});

export { FieldTextArea as default };