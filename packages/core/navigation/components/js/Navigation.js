import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import '@atlaskit/polyfills/object-assign';
import React, { PureComponent } from 'react';
import { getTheme } from '@atlaskit/theme';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import { name as packageName, version as packageVersion } from '../../version.json';
import { navigationExpandedCollapsed } from '../../utils/analytics';
import GlobalNavigation from './GlobalNavigation';
import ContainerNavigation from './ContainerNavigation';
import NavigationFixedContainer from '../styled/NavigationFixedContainer';
import NavigationGlobalNavigationWrapper from '../styled/NavigationGlobalNavigationWrapper';
import NavigationContainerNavigationWrapper from '../styled/NavigationContainerNavigationWrapper';
import Resizer from './Resizer';
import Spacer from './Spacer';
import { containerClosedWidth, containerOpenWidth, globalOpenWidth, resizeClosedBreakpoint, standardOpenWidth } from '../../shared-variables';
import { defaultContainerTheme, defaultGlobalTheme } from '../../theme/util';
import WithElectronTheme from '../../theme/with-electron-theme';

var warnIfCollapsedPropsAreInvalid = function warnIfCollapsedPropsAreInvalid(_ref) {
  var isCollapsible = _ref.isCollapsible,
      isOpen = _ref.isOpen;

  if (!isCollapsible && !isOpen) {
    // eslint-disable-next-line no-console
    console.warn("\n        Navigation is being told it cannot collapse and that it is not open.\n        When Navigation cannot collapse it must always be open.\n        Ignoring isOpen={true}\n      ");
  }
};

var defaultWidth = globalOpenWidth() + containerOpenWidth;

var Navigation =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Navigation, _PureComponent);

  function Navigation(props, context) {
    var _this;

    _classCallCheck(this, Navigation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Navigation).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "spacerRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "getSnappedWidth", function (width) {
      // |------------------------------|
      //      |           |             |
      //    closed    breakpoint       open
      //          * snap closed
      //                       * snap open
      //                                    * maintain expanded width
      var isElectronMac = _this.props.isElectronMac;
      var resizeClosedBreakpointResult = resizeClosedBreakpoint(isElectronMac); // Snap closed if width ever goes below the resizeClosedBreakpoint

      if (width < resizeClosedBreakpointResult) {
        return globalOpenWidth(isElectronMac);
      } // Snap open if in between the closed breakpoint and the standard width


      if (width > resizeClosedBreakpointResult && width < standardOpenWidth(isElectronMac)) {
        return standardOpenWidth(isElectronMac);
      } // At this point the width > standard width.
      // We allow you to have your own wider width.


      return width;
    });

    _defineProperty(_assertThisInitialized(_this), "onResize", function (resizeDelta) {
      _this.setState({
        isResizing: true,
        resizeDelta: resizeDelta
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onPropsResize", function (resizeState, trigger) {
      var _this$props = _this.props,
          createAnalyticsEvent = _this$props.createAnalyticsEvent,
          isOpen = _this$props.isOpen;

      if (trigger && resizeState.isOpen !== isOpen) {
        navigationExpandedCollapsed(createAnalyticsEvent, {
          isCollapsed: !resizeState.isOpen,
          trigger: trigger
        });
      }

      _this.props.onResize(resizeState);
    });

    _defineProperty(_assertThisInitialized(_this), "onResizeEnd", function (resizeDelta) {
      var width = _this.getRenderedWidth();

      var snappedWidth = _this.getSnappedWidth(width);

      var resizeState = {
        isOpen: snappedWidth >= standardOpenWidth(_this.props.isElectronMac),
        width: snappedWidth
      };

      _this.setState({
        resizeDelta: 0,
        isResizing: false
      }, function callOnResizeAfterSetState() {
        var resizerClicked = resizeDelta === 0;
        this.onPropsResize(resizeState, resizerClicked ? undefined : 'resizerDrag');
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getRenderedWidth", function () {
      var _this$props2 = _this.props,
          isOpen = _this$props2.isOpen,
          width = _this$props2.width,
          isCollapsible = _this$props2.isCollapsible,
          isElectronMac = _this$props2.isElectronMac;
      var baselineWidth = isOpen ? width : containerClosedWidth(isElectronMac);
      var minWidth = isCollapsible ? containerClosedWidth(isElectronMac) : standardOpenWidth(isElectronMac);
      return Math.max(minWidth, baselineWidth + _this.state.resizeDelta);
    });

    _defineProperty(_assertThisInitialized(_this), "triggerResizeButtonHandler", function (resizeState, resizerClick) {
      if (resizeState) {
        var trigger = resizerClick ? 'resizerClick' : 'chevron';

        _this.onPropsResize(resizeState, trigger);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "registerSpacerRef", function (spacerRef) {
      _this.spacerRef = spacerRef;
    });

    _defineProperty(_assertThisInitialized(_this), "onSpacerTransitionEnd", function (e) {
      if (!_this.spacerRef || e.target !== _this.spacerRef) {
        return;
      }

      _this.props.onToggleEnd();
    });

    var containerTheme = props.containerTheme,
        globalTheme = props.globalTheme; // $FlowFixMe  - theme is not found in props

    var _getTheme = getTheme(props),
        mode = _getTheme.mode;

    _this.state = {
      containerTheme: defaultContainerTheme(containerTheme, mode),
      globalTheme: defaultGlobalTheme(globalTheme, mode),
      resizeDelta: 0,
      isResizing: false,
      isTogglingIsOpen: false
    };
    warnIfCollapsedPropsAreInvalid(props);
    return _this;
  }

  _createClass(Navigation, [{
    key: "componentDidMount",
    // It is possible that Navigation.width will not be supplied by the product, which means the
    // default width will be used, which assumes a non-Electron environment. We update the width
    // for this specific case in componentDidMount.
    value: function componentDidMount() {
      if (this.props.isElectronMac && this.props.isOpen && this.props.width === defaultWidth) {
        this.onPropsResize({
          isOpen: true,
          width: globalOpenWidth(true) + containerOpenWidth
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var containerTheme = nextProps.containerTheme,
          globalTheme = nextProps.globalTheme; // TODO work out why nextProps.theme.__ATLASKIT_THEME__.mode always returns the mode
      // that was applied at time of first page load.
      // $FlowFixMe - theme is not found in props

      var _getTheme2 = getTheme(nextProps),
          mode = _getTheme2.mode;

      var isTogglingIsOpen = this.props.isOpen !== nextProps.isOpen;

      if (isTogglingIsOpen) {
        this.props.onToggleStart();
      }

      this.setState({
        containerTheme: defaultContainerTheme(containerTheme, mode),
        globalTheme: defaultGlobalTheme(globalTheme, mode),
        isTogglingIsOpen: isTogglingIsOpen
      });
      warnIfCollapsedPropsAreInvalid(nextProps);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          containerHeaderComponent = _this$props3.containerHeaderComponent,
          containerScrollRef = _this$props3.containerScrollRef,
          drawers = _this$props3.drawers,
          globalCreateIcon = _this$props3.globalCreateIcon,
          globalPrimaryActions = _this$props3.globalPrimaryActions,
          globalPrimaryIcon = _this$props3.globalPrimaryIcon,
          globalPrimaryIconAppearance = _this$props3.globalPrimaryIconAppearance,
          globalPrimaryItemHref = _this$props3.globalPrimaryItemHref,
          globalSearchIcon = _this$props3.globalSearchIcon,
          globalSecondaryActions = _this$props3.globalSecondaryActions,
          hasScrollHintTop = _this$props3.hasScrollHintTop,
          isCollapsible = _this$props3.isCollapsible,
          isElectronMac = _this$props3.isElectronMac,
          isOpen = _this$props3.isOpen,
          isResizeable = _this$props3.isResizeable,
          linkComponent = _this$props3.linkComponent,
          onCreateDrawerOpen = _this$props3.onCreateDrawerOpen,
          onResizeStart = _this$props3.onResizeStart,
          onSearchDrawerOpen = _this$props3.onSearchDrawerOpen,
          topOffset = _this$props3.topOffset;
      var _this$state = this.state,
          containerTheme = _this$state.containerTheme,
          globalTheme = _this$state.globalTheme,
          isTogglingIsOpen = _this$state.isTogglingIsOpen,
          isResizing = _this$state.isResizing; // if collapsed then:
      // 1. isOpen is ignored
      // 2. You cannot resize to a size smaller than the default open size

      var renderedWidth = this.getRenderedWidth();
      var globalOpenWidthResult = globalOpenWidth(isElectronMac);
      var containerClosedWidthResult = containerClosedWidth(isElectronMac);
      var isGlobalNavPartiallyCollapsed = isResizing && renderedWidth < globalOpenWidthResult + containerClosedWidthResult; // Cover over the global navigation when it is partially collapsed

      var containerOffsetX = isGlobalNavPartiallyCollapsed ? renderedWidth - (globalOpenWidthResult + containerClosedWidthResult) : 0; // always show global navigation if it is not collapsible

      var showGlobalNavigation = !isCollapsible || isOpen || isResizing;
      var containerWidth = showGlobalNavigation ? Math.max(renderedWidth - globalOpenWidthResult, containerClosedWidthResult) : containerClosedWidthResult;
      var isContainerCollapsed = !showGlobalNavigation || containerWidth === containerClosedWidthResult;
      var shouldAnimateContainer = isTogglingIsOpen && !isResizing; // When the navigation is not collapsible, and the width is expanded.
      // Users should be able to click the collapse button to go back to the original width

      var canCollapse = isCollapsible || containerWidth > containerOpenWidth;
      var globalNavigation = showGlobalNavigation ? React.createElement(NavigationGlobalNavigationWrapper, null, React.createElement(GlobalNavigation, {
        theme: globalTheme,
        primaryActions: globalPrimaryActions,
        createIcon: globalCreateIcon,
        linkComponent: linkComponent,
        onCreateActivate: onCreateDrawerOpen,
        onSearchActivate: onSearchDrawerOpen,
        primaryIcon: globalPrimaryIcon,
        primaryIconAppearance: globalPrimaryIconAppearance,
        primaryItemHref: globalPrimaryItemHref,
        searchIcon: globalSearchIcon,
        secondaryActions: globalSecondaryActions
      })) : null;
      var resizer = isResizeable ? React.createElement(Resizer, {
        navigationWidth: renderedWidth,
        onResize: this.onResize,
        onResizeButton: this.triggerResizeButtonHandler,
        onResizeStart: onResizeStart,
        onResizeEnd: this.onResizeEnd,
        showResizeButton: canCollapse
      }) : null;
      return React.createElement(WithElectronTheme, {
        isElectronMac: isElectronMac
      }, React.createElement("div", null, React.createElement(Spacer, {
        innerRef: this.registerSpacerRef,
        onTransitionEnd: this.onSpacerTransitionEnd,
        shouldAnimate: shouldAnimateContainer,
        width: renderedWidth
      }, React.createElement(NavigationFixedContainer, {
        topOffset: topOffset
      }, globalNavigation, React.createElement(NavigationContainerNavigationWrapper, {
        horizontalOffset: containerOffsetX
      }, React.createElement(ContainerNavigation, {
        scrollRef: containerScrollRef,
        theme: containerTheme,
        showGlobalActions: !showGlobalNavigation,
        globalCreateIcon: globalCreateIcon,
        globalPrimaryActions: globalPrimaryActions,
        globalPrimaryIcon: globalPrimaryIcon,
        globalPrimaryItemHref: globalPrimaryItemHref,
        globalSearchIcon: globalSearchIcon,
        globalSecondaryActions: globalSecondaryActions,
        hasScrollHintTop: hasScrollHintTop,
        headerComponent: containerHeaderComponent,
        linkComponent: linkComponent,
        onGlobalCreateActivate: onCreateDrawerOpen,
        onGlobalSearchActivate: onSearchDrawerOpen,
        isCollapsed: isContainerCollapsed
      }, children)), resizer)), drawers));
    }
  }]);

  return Navigation;
}(PureComponent);

_defineProperty(Navigation, "defaultProps", {
  drawers: [],
  globalPrimaryIconAppearance: 'round',
  globalSecondaryActions: [],
  isCollapsible: true,
  isOpen: true,
  isResizeable: true,
  isElectronMac: false,
  onCreateDrawerOpen: function onCreateDrawerOpen() {},
  onResize: function onResize() {},
  onResizeStart: function onResizeStart() {},
  onSearchDrawerOpen: function onSearchDrawerOpen() {},
  onToggleEnd: function onToggleEnd() {},
  onToggleStart: function onToggleStart() {},
  topOffset: 0,
  width: defaultWidth
});

export { Navigation as NavigationWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'navigationSidebar',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onResize: createAndFireEventOnAtlaskit({
    action: 'resized',
    actionSubject: 'navigationSidebar',
    attributes: {
      componentName: 'navigation',
      packageName: packageName,
      packageVersion: packageVersion
    }
  }),
  onResizeStart: createAndFireEventOnAtlaskit({
    action: 'resizeStarted',
    actionSubject: 'navigationSidebar',
    attributes: {
      componentName: 'navigation',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(Navigation));