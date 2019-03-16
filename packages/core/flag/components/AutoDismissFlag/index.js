import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import Flag from '../Flag';
export var AUTO_DISMISS_SECONDS = 8;

var AutoDismissFlag =
/*#__PURE__*/
function (_Component) {
  _inherits(AutoDismissFlag, _Component);

  function AutoDismissFlag() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AutoDismissFlag);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AutoDismissFlag)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "autoDismissTimer", void 0);

    _defineProperty(_assertThisInitialized(_this), "startAutoDismissTimer", function () {
      if (!_this.isAutoDismissAllowed()) {
        return;
      }

      _this.stopAutoDismissTimer();

      _this.autoDismissTimer = setTimeout(_this.handleAutoDismissTimerEnd, AUTO_DISMISS_SECONDS * 1000);
    });

    _defineProperty(_assertThisInitialized(_this), "stopAutoDismissTimer", function () {
      if (_this.autoDismissTimer) {
        clearTimeout(_this.autoDismissTimer);
        _this.autoDismissTimer = null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "dismissFlag", function () {
      if (_this.isAutoDismissAllowed() && _this.props.onDismissed) {
        _this.props.onDismissed(_this.props.id);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleAutoDismissTimerEnd", function () {
      _this.dismissFlag();
    });

    _defineProperty(_assertThisInitialized(_this), "handleInteractionStart", function () {
      _this.stopAutoDismissTimer();
    });

    _defineProperty(_assertThisInitialized(_this), "isAutoDismissAllowed", function () {
      return _this.props.isDismissAllowed && _this.props.onDismissed;
    });

    _defineProperty(_assertThisInitialized(_this), "handleInteractionEnd", function () {
      _this.startAutoDismissTimer();
    });

    return _this;
  }

  _createClass(AutoDismissFlag, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.startAutoDismissTimer();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopAutoDismissTimer();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.isDismissAllowed && !prevProps.isDismissAllowed) {
        this.startAutoDismissTimer();
      } else if (!this.props.isDismissAllowed && prevProps.isDismissAllowed) {
        this.stopAutoDismissTimer();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(Flag, _extends({
        onMouseOver: this.handleInteractionStart,
        onFocus: this.handleInteractionStart,
        onMouseOut: this.handleInteractionEnd,
        onBlur: this.handleInteractionEnd
      }, this.props));
    }
  }]);

  return AutoDismissFlag;
}(Component);

export { AutoDismissFlag as default };