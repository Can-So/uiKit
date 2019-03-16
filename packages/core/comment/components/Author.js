import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import { name as packageName, version as packageVersion } from '../version.json';
import Field from './Field';

var Author =
/*#__PURE__*/
function (_Component) {
  _inherits(Author, _Component);

  function Author() {
    _classCallCheck(this, Author);

    return _possibleConstructorReturn(this, _getPrototypeOf(Author).apply(this, arguments));
  }

  _createClass(Author, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          href = _this$props.href,
          onClick = _this$props.onClick,
          onFocus = _this$props.onFocus,
          onMouseOver = _this$props.onMouseOver;
      return React.createElement(Field, {
        hasAuthor: true,
        href: href,
        onClick: onClick,
        onFocus: onFocus,
        onMouseOver: onMouseOver
      }, children);
    }
  }]);

  return Author;
}(Component);

export { Author as CommentAuthorWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'commentAuthor',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onClick: createAndFireEventOnAtlaskit({
    action: 'clicked',
    actionSubject: 'commentAuthor',
    attributes: {
      componentName: 'commentAuthor',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(Author));