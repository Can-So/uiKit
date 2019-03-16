import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@findable/analytics-next';
import baseItem, { withItemClick, withItemFocus } from '@findable/item';
import { name as packageName, version as packageVersion } from '../../version.json';
import NavigationItemAction from '../styled/NavigationItemAction';
import NavigationItemAfter from '../styled/NavigationItemAfter';
import NavigationItemCaption from '../styled/NavigationItemCaption';
import NavigationItemIcon from '../styled/NavigationItemIcon';
import NavigationItemTextAfter from '../styled/NavigationItemTextAfter';
import NavigationItemAfterWrapper from '../styled/NavigationItemAfterWrapper';
import { isInOverflowDropdown } from '../../theme/util';
var Item = withItemClick(withItemFocus(baseItem));

var NavigationItem =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(NavigationItem, _PureComponent);

  function NavigationItem() {
    _classCallCheck(this, NavigationItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(NavigationItem).apply(this, arguments));
  }

  _createClass(NavigationItem, [{
    key: "render",
    value: function render() {
      var icon = this.props.icon ? React.createElement(NavigationItemIcon, null, this.props.icon) : null;
      var dropIcon = this.props.dropIcon && this.props.isDropdownTrigger ? React.createElement(NavigationItemIcon, {
        isDropdownTrigger: true
      }, this.props.dropIcon) : null;
      var textAfter = this.props.textAfter ? React.createElement(NavigationItemTextAfter, null, this.props.textAfter) : null;
      var action = this.props.action ? React.createElement(NavigationItemAction, null, this.props.action) : null;
      var after = this.props.textAfter ? React.createElement(NavigationItemAfter, {
        shouldTakeSpace: this.props.action || this.props.textAfter,
        isDropdownTrigger: this.props.isDropdownTrigger
      }, textAfter) : null; // There are various 'after' elements which are all optional. If any of them are present we
      // render those inside a shared wrapper.

      var allAfter = after || dropIcon || action ? React.createElement(NavigationItemAfterWrapper, null, after, dropIcon, action) : null;
      var wrappedCaption = this.props.caption ? React.createElement(NavigationItemCaption, null, this.props.caption) : null;
      var interactiveWrapperProps = {
        onClick: this.props.onClick,
        onKeyDown: this.props.onKeyDown,
        onMouseEnter: this.props.onMouseEnter,
        onMouseLeave: this.props.onMouseLeave,
        href: this.props.href,
        linkComponent: this.props.linkComponent
      }; // Theme prop is provided via withTheme(...) and is not public API

      /* eslint-disable react/prop-types */
      // $FlowFixMe

      var role = isInOverflowDropdown(this.props.theme) ? 'menuitem' : null;
      /* eslint-enable react/prop-types */

      return React.createElement(Item, _extends({
        elemBefore: icon,
        elemAfter: allAfter,
        description: this.props.subText,
        isSelected: this.props.isSelected,
        isDragging: this.props.isDragging,
        isDropdown: this.props.isDropdownTrigger,
        isCompact: this.props.isCompact,
        dnd: this.props.dnd,
        autoFocus: this.props.autoFocus,
        target: this.props.target,
        role: role
      }, interactiveWrapperProps), this.props.text, wrappedCaption);
    }
  }]);

  return NavigationItem;
}(PureComponent);

_defineProperty(NavigationItem, "defaultProps", {
  isSelected: false,
  isDropdownTrigger: false,
  autoFocus: false
});

export var NavigationItemWithoutAnalytics = withTheme(NavigationItem);
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'navigationItem',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onClick: createAndFireEventOnAtlaskit({
    action: 'clicked',
    actionSubject: 'navigationItem',
    attributes: {
      componentName: 'navigationItem',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(NavigationItemWithoutAnalytics));