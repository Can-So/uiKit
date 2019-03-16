import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@findable/analytics-next';
import { name as packageName, version as packageVersion } from '../version.json';
import Field from './Field';

var Time =
/*#__PURE__*/
function (_Component) {
  _inherits(Time, _Component);

  function Time() {
    _classCallCheck(this, Time);

    return _possibleConstructorReturn(this, _getPrototypeOf(Time).apply(this, arguments));
  }

  _createClass(Time, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          href = _this$props.href,
          onClick = _this$props.onClick,
          onFocus = _this$props.onFocus,
          onMouseOver = _this$props.onMouseOver;
      return React.createElement(Field, {
        href: href,
        onClick: onClick,
        onFocus: onFocus,
        onMouseOver: onMouseOver
      }, children);
    }
  }]);

  return Time;
}(Component);

export { Time as CommentTimeWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'commentTime',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onClick: createAndFireEventOnAtlaskit({
    action: 'clicked',
    actionSubject: 'commentTime',
    attributes: {
      componentName: 'commentTime',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(Time));