import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { Component } from 'react';
import PropTypes from 'prop-types';
import UIAnalyticsEvent from './UIAnalyticsEvent';
var ContextTypes = {
  getAtlaskitAnalyticsEventHandlers: PropTypes.func
};

var AnalyticsListener =
/*#__PURE__*/
function (_Component) {
  _inherits(AnalyticsListener, _Component);

  function AnalyticsListener() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AnalyticsListener);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AnalyticsListener)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getChildContext", function () {
      return {
        getAtlaskitAnalyticsEventHandlers: _this.getAnalyticsEventHandlers
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getAnalyticsEventHandlers", function () {
      var _this$props = _this.props,
          channel = _this$props.channel,
          onEvent = _this$props.onEvent;
      var getAtlaskitAnalyticsEventHandlers = _this.context.getAtlaskitAnalyticsEventHandlers;
      var parentEventHandlers = typeof getAtlaskitAnalyticsEventHandlers === 'function' && getAtlaskitAnalyticsEventHandlers() || [];

      var handler = function handler(event, eventChannel) {
        if (channel === '*' || channel === eventChannel) {
          onEvent(event, eventChannel);
        }
      };

      return [handler].concat(_toConsumableArray(parentEventHandlers));
    });

    return _this;
  }

  _createClass(AnalyticsListener, [{
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return AnalyticsListener;
}(Component);

_defineProperty(AnalyticsListener, "contextTypes", ContextTypes);

_defineProperty(AnalyticsListener, "childContextTypes", ContextTypes);

export { AnalyticsListener as default };