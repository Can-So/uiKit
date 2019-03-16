import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
The withAnalytics HOC wraps a component and provides the `fireAnalyticsEvent`
and `firePrivateAnalyticsEvent` methods to it as props. It contains the logic
for how to fire events, including handling the analyticsId and analyticsData
props. The `map` argument may be an object or a function that returns an object.
The properties of the `map` object/result can be strings (the name of the event
that will be fired) or functions (which are responsible for firing the event).
You can specify a default `analyticsId` and `analyticsData` with the `defaultProps`
param. Please be aware that specifying a default `analyticsId` will cause public
events to always fire for your component unless it has been set to a falsy by
the component consumer.
*/
var withAnalytics = function withAnalytics(WrappedComponent) {
  var _class, _temp;

  var map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaultProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var withDelegation = arguments.length > 3 ? arguments[3] : undefined;
  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(WithAnalytics, _Component);

    function WithAnalytics() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, WithAnalytics);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithAnalytics)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "props", void 0);

      _defineProperty(_assertThisInitialized(_this), "evaluatedMap", {});

      _defineProperty(_assertThisInitialized(_this), "delegateAnalyticsEvent", function (analyticsId, data, isPrivate) {
        var onAnalyticsEvent = _this.context.onAnalyticsEvent;
        if (!onAnalyticsEvent) return;
        onAnalyticsEvent(analyticsId, data, isPrivate);
      });

      _defineProperty(_assertThisInitialized(_this), "fireAnalyticsEvent", function (name, data) {
        var _this$props = _this.props,
            analyticsData = _this$props.analyticsData,
            analyticsId = _this$props.analyticsId;
        var onAnalyticsEvent = _this.context.onAnalyticsEvent;
        if (!analyticsId || !onAnalyticsEvent) return;

        var eventData = _objectSpread({}, analyticsData, data);

        onAnalyticsEvent("".concat(analyticsId, ".").concat(name), eventData, false);
      });

      _defineProperty(_assertThisInitialized(_this), "privateAnalyticsEvent", function (name, data) {
        var onAnalyticsEvent = _this.context.onAnalyticsEvent;
        if (!onAnalyticsEvent) return;
        onAnalyticsEvent("".concat(name), data, true);
      });

      _defineProperty(_assertThisInitialized(_this), "getParentAnalyticsData", function (name) {
        var getParentAnalyticsData = _this.context.getParentAnalyticsData;
        var parentData = {};

        if (typeof getParentAnalyticsData === 'function' && _this.props.analyticsId) {
          var analyticsId = _this.props.analyticsId;
          parentData = getParentAnalyticsData("".concat(analyticsId, ".").concat(name), false);
        }

        return parentData;
      });

      return _this;
    }

    _createClass(WithAnalytics, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        this.evaluatedMap = typeof map === 'function' ? map(this.fireAnalyticsEvent) : map;
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        /* eslint-disable no-unused-vars */
        var _this$props2 = this.props,
            analyticsId = _this$props2.analyticsId,
            analyticsData = _this$props2.analyticsData,
            componentProps = _objectWithoutProperties(_this$props2, ["analyticsId", "analyticsData"]);
        /* eslint-enable no-unused-vars */


        Object.keys(this.evaluatedMap).forEach(function (prop) {
          var handler = _this2.evaluatedMap[prop]; // may be eventName or a function

          var originalProp = componentProps[prop];

          componentProps[prop] = function () {
            if (typeof handler === 'function') {
              handler.apply(void 0, arguments);
            } else {
              _this2.fireAnalyticsEvent(handler);
            }

            if (typeof originalProp === 'function') originalProp.apply(void 0, arguments);
          };
        });
        return React.createElement(WrappedComponent, _extends({
          fireAnalyticsEvent: this.fireAnalyticsEvent,
          firePrivateAnalyticsEvent: this.privateAnalyticsEvent,
          getParentAnalyticsData: this.getParentAnalyticsData,
          delegateAnalyticsEvent: withDelegation ? this.delegateAnalyticsEvent : undefined,
          analyticsId: analyticsId,
          ref: this.props.innerRef
        }, componentProps));
      }
    }]);

    return WithAnalytics;
  }(Component), _defineProperty(_class, "displayName", "WithAnalytics(".concat(WrappedComponent.displayName || WrappedComponent.name, ")")), _defineProperty(_class, "contextTypes", {
    onAnalyticsEvent: PropTypes.func,
    getParentAnalyticsData: PropTypes.func
  }), _defineProperty(_class, "defaultProps", {
    analyticsId: defaultProps.analyticsId,
    analyticsData: defaultProps.analyticsData
  }), _temp;
};

export default withAnalytics;