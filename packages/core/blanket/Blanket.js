import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import { name as packageName, version as packageVersion } from './version.json';
import Div from './styled';

var Blanket =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Blanket, _PureComponent);

  function Blanket() {
    _classCallCheck(this, Blanket);

    return _possibleConstructorReturn(this, _getPrototypeOf(Blanket).apply(this, arguments));
  }

  _createClass(Blanket, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          canClickThrough = _this$props.canClickThrough,
          isTinted = _this$props.isTinted,
          onBlanketClicked = _this$props.onBlanketClicked;
      var onClick = canClickThrough ? null : onBlanketClicked;
      var containerProps = {
        canClickThrough: canClickThrough,
        isTinted: isTinted,
        onClick: onClick
      };
      return React.createElement(Div, containerProps);
    }
  }]);

  return Blanket;
}(PureComponent);

_defineProperty(Blanket, "defaultProps", {
  canClickThrough: false,
  isTinted: false,
  onBlanketClicked: function onBlanketClicked() {}
});

export { Blanket as BlanketWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'blanket',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onBlanketClicked: createAndFireEventOnAtlaskit({
    action: 'clicked',
    actionSubject: 'blanket',
    attributes: {
      componentName: 'blanket',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(Blanket));