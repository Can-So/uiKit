import _extends from "@babel/runtime/helpers/extends";
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
import UIAnalyticsEvent from './UIAnalyticsEvent';

// This component is used to grab the analytics functions off context.
// It uses legacy context, but provides an API similar to 16.3 context.
// This makes it easier to use with the forward ref API.
var AnalyticsContextConsumer =
/*#__PURE__*/
function (_Component) {
  _inherits(AnalyticsContextConsumer, _Component);

  function AnalyticsContextConsumer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AnalyticsContextConsumer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AnalyticsContextConsumer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "createAnalyticsEvent", function (payload) {
      var _this$context = _this.context,
          getAtlaskitAnalyticsEventHandlers = _this$context.getAtlaskitAnalyticsEventHandlers,
          getAtlaskitAnalyticsContext = _this$context.getAtlaskitAnalyticsContext;
      var context = typeof getAtlaskitAnalyticsContext === 'function' && getAtlaskitAnalyticsContext() || [];
      var handlers = typeof getAtlaskitAnalyticsEventHandlers === 'function' && getAtlaskitAnalyticsEventHandlers() || [];
      return new UIAnalyticsEvent({
        context: context,
        handlers: handlers,
        payload: payload
      });
    });

    return _this;
  }

  _createClass(AnalyticsContextConsumer, [{
    key: "render",
    value: function render() {
      return this.props.children(this.createAnalyticsEvent);
    }
  }]);

  return AnalyticsContextConsumer;
}(Component); // patch the callback so it provides analytics information.


_defineProperty(AnalyticsContextConsumer, "contextTypes", {
  getAtlaskitAnalyticsEventHandlers: PropTypes.func,
  getAtlaskitAnalyticsContext: PropTypes.func
});

var modifyCallbackProp = function modifyCallbackProp(propName, eventMapEntry, props, createAnalyticsEvent) {
  return function () {
    var event = typeof eventMapEntry === 'function' ? eventMapEntry(createAnalyticsEvent, props) : createAnalyticsEvent(eventMapEntry);
    var providedCallback = props[propName];

    if (providedCallback) {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      providedCallback.apply(void 0, args.concat([event]));
    }
  };
};

// helper that provides an easy way to map an object's values
// ({ string: A }, (string, A) => B) => { string: B }
var vmap = function vmap(obj, fn) {
  return Object.keys(obj).reduce(function (curr, k) {
    return _objectSpread({}, curr, _defineProperty({}, k, fn(k, obj[k])));
  }, {});
};
/* This must use $Supertype to work with multiple HOCs - https://github.com/facebook/flow/issues/6057#issuecomment-414157781
 * We also cannot alias this as a generic of withAnalyticsEvents itself as
 * that causes issues with multiple HOCs - https://github.com/facebook/flow/issues/6587
 */


export default function withAnalyticsEvents() {
  var createEventMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (WrappedComponent) {
    // $FlowFixMe - flow 0.67 doesn't know about forwardRef
    var WithAnalyticsEvents = React.forwardRef(function (props, ref) {
      return React.createElement(AnalyticsContextConsumer, null, function (createAnalyticsEvent) {
        var modifiedProps = vmap(createEventMap, function (propName, entry) {
          return modifyCallbackProp(propName, entry, props, createAnalyticsEvent);
        });
        return React.createElement(WrappedComponent, _extends({}, props, modifiedProps, {
          createAnalyticsEvent: createAnalyticsEvent,
          ref: ref
        }));
      });
    });
    WithAnalyticsEvents.displayName = "WithAnalyticsEvents(".concat(WrappedComponent.displayName || WrappedComponent.name, ")");
    return WithAnalyticsEvents;
  };
}
export var withAnalyticsForSumTypeProps = withAnalyticsEvents;