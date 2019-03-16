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
import FieldBaseStateless from './FieldBaseStateless';
var ON_BLUR_KEY = 'onBlurKey';
var ON_CONTENT_BLUR_KEY = 'onContentBlurKey';

function waitForRender(cb) {
  // Execute the callback after any upcoming render calls in the execution queue
  setTimeout(cb, 0);
}

var FieldBase =
/*#__PURE__*/
function (_Component) {
  _inherits(FieldBase, _Component);

  function FieldBase() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FieldBase);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FieldBase)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isFocused: _this.props.defaultIsFocused,
      isDialogFocused: false,
      shouldIgnoreNextDialogBlur: false
    });

    _defineProperty(_assertThisInitialized(_this), "timers", void 0);

    _defineProperty(_assertThisInitialized(_this), "onFocus", function (e) {
      _this.setState({
        isFocused: true
      });

      _this.props.onFocus(e); // Escape from a possible race-condition when blur and focus happen one by one
      // (otherwise the dialog might be left closed)


      _this.cancelSchedule(ON_BLUR_KEY);
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (e) {
      // Because the blur event fires before the focus event, we want to make sure that we don't
      // render and close the dialog before we can check if the dialog is focused.
      _this.reschedule(ON_BLUR_KEY, function () {
        _this.setState({
          isFocused: false
        });

        _this.props.onBlur(e);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onContentFocus", function () {
      if (_this.state.isDialogFocused) {
        // If we are tabbing between two elements in the warning dialog, we need to prevent the
        // dialog from closing.
        _this.setState({
          shouldIgnoreNextDialogBlur: true
        });
      } else {
        _this.setState({
          isDialogFocused: true
        });
      } // Escape from a possible race-condition when blur and focus happen one by one
      // (otherwise the dialog might be left closed)


      _this.cancelSchedule(ON_CONTENT_BLUR_KEY);
    });

    _defineProperty(_assertThisInitialized(_this), "onContentBlur", function () {
      waitForRender(function () {
        if (_this.state.shouldIgnoreNextDialogBlur) {
          // Ignore the blur event if we are still focused in the dialog.
          _this.setState({
            shouldIgnoreNextDialogBlur: false
          });
        } else {
          _this.setState({
            isDialogFocused: false
          });
        }
      });
    });

    return _this;
  }

  _createClass(FieldBase, [{
    key: "cancelSchedule",
    value: function cancelSchedule(key) {
      this.timers = this.timers || {};

      if (this.timers[key]) {
        clearTimeout(this.timers[key]);
        delete this.timers[key];
      }
    }
  }, {
    key: "reschedule",
    value: function reschedule(key, callback) {
      var _this2 = this;

      // Use reschedule (not just schedule) to avoid race conditions when multiple blur events
      // happen one by one.
      this.timers = this.timers || {};
      this.cancelSchedule(key);
      this.timers[key] = setTimeout(function () {
        callback();

        _this2.cancelSchedule(key);
      }, 0);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cancelSchedule(ON_BLUR_KEY);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          defaultIsFocused = _this$props.defaultIsFocused,
          props = _objectWithoutProperties(_this$props, ["defaultIsFocused"]);

      var _this$state = this.state,
          isFocused = _this$state.isFocused,
          isDialogFocused = _this$state.isDialogFocused;
      return React.createElement(FieldBaseStateless, _extends({}, props, {
        isDialogOpen: isFocused || isDialogFocused,
        isFocused: isFocused,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        onDialogFocus: this.onContentFocus,
        onDialogBlur: this.onContentBlur
      }));
    }
  }]);

  return FieldBase;
}(Component);

_defineProperty(FieldBase, "defaultProps", {
  defaultIsFocused: false,
  onFocus: function onFocus() {},
  onBlur: function onBlur() {}
});

export { FieldBase as default };