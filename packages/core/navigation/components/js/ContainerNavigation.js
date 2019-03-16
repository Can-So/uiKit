import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { WithRootTheme } from '../../theme/util';
import ContainerHeader from './ContainerHeader';
import ContainerNavigationChildren from './ContainerNavigationChildren';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import GlobalSecondaryActions from './GlobalSecondaryActions';
import Reveal from './Reveal';
import ContainerNavigationInner from '../styled/ContainerNavigationInner';
import GlobalNavigationSecondaryContainer from '../styled/GlobalNavigationSecondaryContainer';
import { globalPrimaryActions as globalPrimaryActionsSizes, globalSecondaryActions as globalSecondaryActionsSizes } from '../../shared-variables';
import { container } from '../../theme/presets';

var ContainerNavigation =
/*#__PURE__*/
function (_Component) {
  _inherits(ContainerNavigation, _Component);

  function ContainerNavigation(props, context) {
    var _this;

    _classCallCheck(this, ContainerNavigation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContainerNavigation).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _this.state = {
      isInitiallyRendered: false
    };
    return _this;
  }

  _createClass(ContainerNavigation, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      // After any update we are going to start animating.
      // Not doing this in componentDidMount to prevent an
      // unneeded second render on mount.
      if (!this.state.isInitiallyRendered) {
        this.setState({
          isInitiallyRendered: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          scrollRef = _this$props.scrollRef,
          showGlobalActions = _this$props.showGlobalActions,
          globalPrimaryActions = _this$props.globalPrimaryActions,
          globalSecondaryActions = _this$props.globalSecondaryActions,
          children = _this$props.children,
          globalCreateIcon = _this$props.globalCreateIcon,
          globalPrimaryIcon = _this$props.globalPrimaryIcon,
          globalPrimaryItemHref = _this$props.globalPrimaryItemHref,
          globalSearchIcon = _this$props.globalSearchIcon,
          hasScrollHintTop = _this$props.hasScrollHintTop,
          headerComponent = _this$props.headerComponent,
          linkComponent = _this$props.linkComponent,
          onGlobalCreateActivate = _this$props.onGlobalCreateActivate,
          onGlobalSearchActivate = _this$props.onGlobalSearchActivate,
          isCollapsed = _this$props.isCollapsed,
          theme = _this$props.theme; // Only animating the revealing of GlobalPrimaryActions and GlobalSecondaryActions
      // after the first render. Before that it is rendered without animation.

      var isInitiallyRendered = this.state.isInitiallyRendered;
      return React.createElement(WithRootTheme, {
        provided: theme,
        isCollapsed: isCollapsed
      }, React.createElement(ContainerNavigationInner, null, React.createElement(Reveal, {
        shouldAnimate: isInitiallyRendered,
        isOpen: showGlobalActions,
        openHeight: globalPrimaryActionsSizes.height(globalPrimaryActions ? React.Children.count(globalPrimaryActions) : 2).outer
      }, React.createElement(GlobalPrimaryActions, {
        actions: globalPrimaryActions,
        createIcon: globalCreateIcon,
        linkComponent: linkComponent,
        onCreateActivate: onGlobalCreateActivate,
        onSearchActivate: onGlobalSearchActivate,
        primaryIcon: globalPrimaryIcon,
        primaryItemHref: globalPrimaryItemHref,
        searchIcon: globalSearchIcon
      })), React.createElement(ContainerHeader, null, headerComponent ? headerComponent({
        isCollapsed: isCollapsed
      }) : undefined), React.createElement(ContainerNavigationChildren, {
        hasScrollHintTop: hasScrollHintTop,
        scrollRef: scrollRef
      }, children), React.createElement(GlobalNavigationSecondaryContainer, null, React.createElement(Reveal, {
        shouldAnimate: isInitiallyRendered,
        isOpen: showGlobalActions,
        openHeight: globalSecondaryActionsSizes.height(React.Children.count(globalSecondaryActions)).outer
      }, showGlobalActions && globalSecondaryActions.length ? React.createElement(GlobalSecondaryActions, {
        actions: globalSecondaryActions
      }) : null))));
    }
  }]);

  return ContainerNavigation;
}(Component);

_defineProperty(ContainerNavigation, "defaultProps", {
  showGlobalActions: false,
  globalSecondaryActions: [],
  isCollapsed: false,
  linkComponent: DefaultLinkComponent,
  theme: container
});

export { ContainerNavigation as default };