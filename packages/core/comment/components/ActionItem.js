import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import { name as packageName, version as packageVersion } from '../version.json';

var ActionItem =
/*#__PURE__*/
function (_Component) {
  _inherits(ActionItem, _Component);

  function ActionItem() {
    _classCallCheck(this, ActionItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(ActionItem).apply(this, arguments));
  }

  _createClass(ActionItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          onClick = _this$props.onClick,
          onFocus = _this$props.onFocus,
          onMouseOver = _this$props.onMouseOver;
      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return React.createElement("span", {
        onClick: onClick,
        onFocus: onFocus,
        onMouseOver: onMouseOver
      }, React.createElement(Button, {
        appearance: "subtle-link",
        spacing: "none",
        type: "button"
      }, children));
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
  }]);

  return ActionItem;
}(Component);

export { ActionItem as CommentActionWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'commentAction',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onClick: createAndFireEventOnAtlaskit({
    action: 'clicked',
    actionSubject: 'commentAction',
    attributes: {
      componentName: 'commentAction',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(ActionItem));