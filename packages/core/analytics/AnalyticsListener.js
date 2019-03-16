import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import matchEvent from './matchEvent';
/*
The Listener component is responsible for calling its `onEvent` handler when a
child component fires an analytics event, and passing the event up the hierarchy
*/

var ContextTypes = {
  onAnalyticsEvent: PropTypes.func
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

    _defineProperty(_assertThisInitialized(_this), "onAnalyticsEvent", function (name, data, isPrivate) {
      // Call this component's onEvent method if it's a match
      var _this$props = _this.props,
          onEvent = _this$props.onEvent,
          match = _this$props.match,
          matchPrivate = _this$props.matchPrivate;

      if (matchPrivate === isPrivate && matchEvent(match, name) && typeof onEvent === 'function') {
        // send a clean data object so it can't be mutated between listeners
        var _eventData = _objectSpread({}, data);

        onEvent(name, _eventData);
      } // Pass the event up the hierarchy


      var onAnalyticsEvent = _this.context.onAnalyticsEvent;

      if (typeof onAnalyticsEvent === 'function') {
        onAnalyticsEvent(name, data, isPrivate);
      }
    });

    return _this;
  }

  _createClass(AnalyticsListener, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        onAnalyticsEvent: this.onAnalyticsEvent
      };
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children; // eslint-disable-line react/prop-types

      return React.Children.only(children);
    }
  }]);

  return AnalyticsListener;
}(Component);

_defineProperty(AnalyticsListener, "defaultProps", {
  match: '*',
  matchPrivate: false
});

_defineProperty(AnalyticsListener, "contextTypes", ContextTypes);

_defineProperty(AnalyticsListener, "childContextTypes", ContextTypes);

export default AnalyticsListener;