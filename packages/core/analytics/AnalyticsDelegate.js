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
/*
Listens to public and private events and delegates to an analytics
stack in a different React root.
*/

var ContextTypes = {
  onAnalyticsEvent: PropTypes.func
};

var AnalyticsDelegate =
/*#__PURE__*/
function (_Component) {
  _inherits(AnalyticsDelegate, _Component);

  function AnalyticsDelegate() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AnalyticsDelegate);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AnalyticsDelegate)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onAnalyticsEvent", function (name, data, isPrivate) {
      var delegateAnalyticsEvent = _this.props.delegateAnalyticsEvent; // send a clean data object so it can't be mutated between listeners

      var eventData = _objectSpread({}, data);

      if (delegateAnalyticsEvent) {
        delegateAnalyticsEvent(name, eventData, isPrivate);
      } // Pass the event up the hierarchy


      var onAnalyticsEvent = _this.context.onAnalyticsEvent;

      if (typeof onAnalyticsEvent === 'function') {
        onAnalyticsEvent(name, data, isPrivate);
      }
    });

    return _this;
  }

  _createClass(AnalyticsDelegate, [{
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

  return AnalyticsDelegate;
}(Component);

_defineProperty(AnalyticsDelegate, "contextTypes", ContextTypes);

_defineProperty(AnalyticsDelegate, "childContextTypes", ContextTypes);

export default AnalyticsDelegate;