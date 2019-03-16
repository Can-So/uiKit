import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import AnalyticsContext from './AnalyticsContext';
export default function withAnalyticsContext() {
  var defaultData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (WrappedComponent) {
    // $FlowFixMe - flow 0.67 doesn't know about forwardRef
    var WithAnalyticsContext = React.forwardRef(function (props, ref) {
      var _props$analyticsConte = props.analyticsContext,
          analyticsContext = _props$analyticsConte === void 0 ? {} : _props$analyticsConte,
          others = _objectWithoutProperties(props, ["analyticsContext"]);

      var data = _objectSpread({}, defaultData, analyticsContext);

      return React.createElement(AnalyticsContext, {
        data: data
      }, React.createElement(WrappedComponent, _extends({}, others, {
        ref: ref
      })));
    });
    WithAnalyticsContext.displayName = "WithAnalyticsContext(".concat(WrappedComponent.displayName || WrappedComponent.name, ")");
    return WithAnalyticsContext;
  };
}