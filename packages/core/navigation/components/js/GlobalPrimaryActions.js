import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
import GlobalItem from './GlobalItem';
import DrawerTrigger from './DrawerTrigger';
import GlobalPrimaryActionsList from './GlobalPrimaryActionsList';
import GlobalPrimaryActionsInner from '../styled/GlobalPrimaryActionsInner';
import GlobalPrimaryActionsPrimaryItem from '../styled/GlobalPrimaryActionsPrimaryItem';
import GlobalPrimaryActionsItemsWrapper from '../styled/GlobalPrimaryActionsItemsWrapper';

var GlobalPrimaryActions =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GlobalPrimaryActions, _PureComponent);

  function GlobalPrimaryActions() {
    _classCallCheck(this, GlobalPrimaryActions);

    return _possibleConstructorReturn(this, _getPrototypeOf(GlobalPrimaryActions).apply(this, arguments));
  }

  _createClass(GlobalPrimaryActions, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          actions = _this$props.actions,
          createIcon = _this$props.createIcon,
          linkComponent = _this$props.linkComponent,
          onCreateActivate = _this$props.onCreateActivate,
          onSearchActivate = _this$props.onSearchActivate,
          primaryIcon = _this$props.primaryIcon,
          primaryIconAppearance = _this$props.primaryIconAppearance,
          primaryItemHref = _this$props.primaryItemHref,
          searchIcon = _this$props.searchIcon;
      return React.createElement(GlobalPrimaryActionsInner, null, primaryIcon ? React.createElement(GlobalPrimaryActionsPrimaryItem, null, React.createElement(GlobalItem, {
        id: "productLogo",
        href: primaryItemHref,
        linkComponent: linkComponent,
        size: "medium",
        appearance: primaryIconAppearance
      }, primaryIcon)) : null, React.createElement(GlobalPrimaryActionsItemsWrapper, null, actions ? React.createElement(GlobalPrimaryActionsList, {
        actions: actions
      }) : React.createElement("div", null, searchIcon ? React.createElement(DrawerTrigger, {
        onActivate: onSearchActivate
      }, searchIcon) : null, createIcon ? React.createElement(DrawerTrigger, {
        onActivate: onCreateActivate
      }, createIcon) : null)));
    }
  }]);

  return GlobalPrimaryActions;
}(PureComponent);

export { GlobalPrimaryActions as default };