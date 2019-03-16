import _typeof from "@babel/runtime/helpers/typeof";
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
/* The Decorator component extends analytics event data for any events fired by
its descendents, then passes the event up the hierarchy */

var ContextTypes = {
  onAnalyticsEvent: PropTypes.func,
  getParentAnalyticsData: PropTypes.func
};

var AnalyticsDecorator =
/*#__PURE__*/
function (_Component) {
  _inherits(AnalyticsDecorator, _Component);

  function AnalyticsDecorator() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AnalyticsDecorator);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AnalyticsDecorator)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getDecoratedAnalyticsData", function (name, srcData, isPrivate) {
      // Decorate the event data if this decorator matches the event name
      var _this$props = _this.props,
          data = _this$props.data,
          getData = _this$props.getData,
          match = _this$props.match,
          matchPrivate = _this$props.matchPrivate;

      var decoratedData = _objectSpread({}, srcData);

      if (matchPrivate === isPrivate && matchEvent(match, name)) {
        if (_typeof(data) === 'object') {
          Object.assign(decoratedData, data);
        }

        if (typeof getData === 'function') {
          Object.assign(decoratedData, getData(name, decoratedData));
        }
      }

      return decoratedData;
    });

    _defineProperty(_assertThisInitialized(_this), "onAnalyticsEvent", function (name, srcData, isPrivate) {
      // Check there is a listener to pass the event to, otherwise there's no need
      // to do any of this work
      var onAnalyticsEvent = _this.context.onAnalyticsEvent;
      if (typeof onAnalyticsEvent !== 'function') return;

      var decoratedData = _this.getDecoratedAnalyticsData(name, srcData, isPrivate); // Pass the decorated event data to the next listener up the hierarchy


      onAnalyticsEvent(name, decoratedData, isPrivate);
    });

    _defineProperty(_assertThisInitialized(_this), "getParentAnalyticsData", function (name, isPrivate) {
      var parentData = _this.getDecoratedAnalyticsData(name, {}, isPrivate); // Get any analytics data from any decorators up the hierarchy


      var getParentAnalyticsData = _this.context.getParentAnalyticsData;

      if (typeof getParentAnalyticsData === 'function') {
        Object.assign(parentData, getParentAnalyticsData(name, isPrivate));
      }

      return parentData;
    });

    return _this;
  }

  _createClass(AnalyticsDecorator, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        onAnalyticsEvent: this.onAnalyticsEvent,
        getParentAnalyticsData: this.getParentAnalyticsData
      };
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children; // eslint-disable-line react/prop-types

      return React.Children.only(children);
    }
  }]);

  return AnalyticsDecorator;
}(Component);

_defineProperty(AnalyticsDecorator, "defaultProps", {
  match: '*',
  matchPrivate: false
});

_defineProperty(AnalyticsDecorator, "contextTypes", ContextTypes);

_defineProperty(AnalyticsDecorator, "childContextTypes", ContextTypes);

export default AnalyticsDecorator;