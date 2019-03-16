import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@findable/analytics-next';
import { name as packageName, version as packageVersion } from '../version.json';
import EditedStyles from '../styled/EditedStyles';

var Edited =
/*#__PURE__*/
function (_Component) {
  _inherits(Edited, _Component);

  function Edited() {
    _classCallCheck(this, Edited);

    return _possibleConstructorReturn(this, _getPrototypeOf(Edited).apply(this, arguments));
  }

  _createClass(Edited, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          onFocus = _this$props.onFocus,
          onMouseOver = _this$props.onMouseOver;
      return React.createElement(EditedStyles, {
        onFocus: onFocus,
        onMouseOver: onMouseOver
      }, children);
    }
  }]);

  return Edited;
}(Component);

export { Edited as CommentEditedWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'commentEdited',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onClick: createAndFireEventOnAtlaskit({
    action: 'clicked',
    actionSubject: 'commentEdited',
    attributes: {
      componentName: 'commentEdited',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(Edited));