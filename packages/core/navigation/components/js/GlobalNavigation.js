import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { WithRootTheme } from '../../theme/util';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import GlobalSecondaryActions from './GlobalSecondaryActions';
import GlobalNavigationInner from '../styled/GlobalNavigationInner';
import GlobalNavigationPrimaryContainer from '../styled/GlobalNavigationPrimaryContainer';
import GlobalNavigationSecondaryContainer from '../styled/GlobalNavigationSecondaryContainer';
import { global } from '../../theme/presets';

var GlobalNavigation =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GlobalNavigation, _PureComponent);

  function GlobalNavigation() {
    _classCallCheck(this, GlobalNavigation);

    return _possibleConstructorReturn(this, _getPrototypeOf(GlobalNavigation).apply(this, arguments));
  }

  _createClass(GlobalNavigation, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          createIcon = _this$props.createIcon,
          linkComponent = _this$props.linkComponent,
          onCreateActivate = _this$props.onCreateActivate,
          onSearchActivate = _this$props.onSearchActivate,
          primaryActions = _this$props.primaryActions,
          primaryIcon = _this$props.primaryIcon,
          primaryIconAppearance = _this$props.primaryIconAppearance,
          primaryItemHref = _this$props.primaryItemHref,
          searchIcon = _this$props.searchIcon,
          secondaryActions = _this$props.secondaryActions,
          theme = _this$props.theme;
      return React.createElement(WithRootTheme, {
        provided: theme
      }, React.createElement(GlobalNavigationInner, null, React.createElement(GlobalNavigationPrimaryContainer, null, React.createElement(GlobalPrimaryActions, {
        actions: primaryActions,
        createIcon: createIcon,
        linkComponent: linkComponent,
        onCreateActivate: onCreateActivate,
        onSearchActivate: onSearchActivate,
        primaryIcon: primaryIcon,
        primaryIconAppearance: primaryIconAppearance,
        primaryItemHref: primaryItemHref,
        searchIcon: searchIcon
      })), React.createElement(GlobalNavigationSecondaryContainer, null, secondaryActions.length ? React.createElement(GlobalSecondaryActions, {
        actions: secondaryActions
      }) : null)));
    }
  }]);

  return GlobalNavigation;
}(PureComponent);

_defineProperty(GlobalNavigation, "defaultProps", {
  primaryIconAppearance: 'round',
  secondaryActions: [],
  theme: global
});

export { GlobalNavigation as default };