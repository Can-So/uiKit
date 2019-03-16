import { css as _css } from "emotion";
import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component, Fragment } from 'react';
import { NavigationAnalyticsContext } from '@findable/analytics-namespaced-context';
import { colors } from '@findable/theme';
import { name as packageName, version as packageVersion } from '../../../version.json';
import { Shadow } from '../../../common/primitives';
import { light, ThemeProvider } from '../../../theme';
import ContentNavigation from '../ContentNavigation';
import PageContent from '../PageContent';
import ResizeTransition, { isTransitioning } from '../ResizeTransition';
import ResizeControl from './ResizeControl';
import { LayoutContainer, NavigationContainer } from './primitives';
import { ContainerNavigationMask, ContentNavigationWrapper } from '../ContentNavigation/primitives';
import { CONTENT_NAV_WIDTH_COLLAPSED, CONTENT_NAV_WIDTH_FLYOUT, GLOBAL_NAV_WIDTH, FLYOUT_DELAY, ALTERNATE_FLYOUT_DELAY } from '../../../common/constants';
import RenderBlocker from '../../common/RenderBlocker';
import { LayoutEventListener } from './LayoutEvent';

function defaultTooltipContent(isCollapsed) {
  return isCollapsed ? {
    text: 'Expand',
    char: '['
  } : {
    text: 'Collapse',
    char: '['
  };
}
/* NOTE: experimental props use an underscore */


var LayoutManager =
/*#__PURE__*/
function (_Component) {
  _inherits(LayoutManager, _Component);

  function LayoutManager() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LayoutManager);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LayoutManager)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      flyoutIsOpen: false,
      mouseIsOverNavigation: false,
      itemIsDragging: false
    });

    _defineProperty(_assertThisInitialized(_this), "productNavRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "pageRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "containerRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "flyoutMouseOverTimeout", void 0);

    _defineProperty(_assertThisInitialized(_this), "nodeRefs", {
      expandCollapseAffordance: React.createRef()
    });

    _defineProperty(_assertThisInitialized(_this), "getContainerRef", function (ref) {
      _this.containerRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getNavRef", function (ref) {
      _this.productNavRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getPageRef", function (ref) {
      _this.pageRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "mouseOutFlyoutArea", function (_ref) {
      var currentTarget = _ref.currentTarget,
          relatedTarget = _ref.relatedTarget;
      if (currentTarget.contains(relatedTarget)) return;
      clearTimeout(_this.flyoutMouseOverTimeout);

      _this.setState({
        flyoutIsOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "mouseOverFlyoutArea", function (_ref2) {
      var currentTarget = _ref2.currentTarget,
          target = _ref2.target;
      if (!currentTarget.contains(target)) return;
      var EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR = _this.props.experimental_alternateFlyoutBehaviour;
      var delay = EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR ? ALTERNATE_FLYOUT_DELAY : FLYOUT_DELAY;
      clearTimeout(_this.flyoutMouseOverTimeout);
      _this.flyoutMouseOverTimeout = setTimeout(function () {
        _this.setState({
          flyoutIsOpen: true
        });
      }, delay);
    });

    _defineProperty(_assertThisInitialized(_this), "closeFlyout", function (e) {
      e.stopPropagation();
      clearTimeout(_this.flyoutMouseOverTimeout);

      if (_this.state.flyoutIsOpen) {
        _this.setState({
          flyoutIsOpen: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "mouseEnter", function () {
      _this.setState({
        mouseIsOverNavigation: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "mouseLeave", function () {
      clearTimeout(_this.flyoutMouseOverTimeout);

      _this.setState({
        mouseIsOverNavigation: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onItemDragStart", function () {
      _this.setState({
        itemIsDragging: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onItemDragEnd", function () {
      _this.setState({
        itemIsDragging: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderGlobalNavigation", function () {
      var _this$props = _this.props,
          containerNavigation = _this$props.containerNavigation,
          datasets = _this$props.datasets,
          GlobalNavigation = _this$props.globalNavigation,
          topOffset = _this$props.topOffset,
          EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR = _this$props.experimental_alternateFlyoutBehaviour;
      var dataset = datasets ? datasets.globalNavigation : {};
      return React.createElement("div", _extends({}, dataset, {
        onMouseOver: EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR ? _this.closeFlyout : null
      }), React.createElement(ThemeProvider, {
        theme: function theme(_theme) {
          return _objectSpread({
            topOffset: topOffset,
            mode: light
          }, _theme);
        }
      }, React.createElement(Fragment, null, React.createElement(Shadow, {
        isBold: !!containerNavigation,
        isOverDarkBg: true,
        style: {
          marginLeft: GLOBAL_NAV_WIDTH
        }
      }), React.createElement(GlobalNavigation, null))));
    });

    _defineProperty(_assertThisInitialized(_this), "renderContentNavigation", function (args) {
      var transitionState = args.transitionState,
          transitionStyle = args.transitionStyle;
      var _this$props2 = _this.props,
          containerNavigation = _this$props2.containerNavigation,
          datasets = _this$props2.datasets,
          EXPERIMENTAL_FLYOUT_ON_HOVER = _this$props2.experimental_flyoutOnHover,
          navigationUIController = _this$props2.navigationUIController,
          productNavigation = _this$props2.productNavigation;
      var _navigationUIControll = navigationUIController.state,
          isCollapsed = _navigationUIControll.isCollapsed,
          isResizing = _navigationUIControll.isResizing;
      var isVisible = transitionState !== 'exited';
      var shouldDisableInteraction = isResizing || isTransitioning(transitionState);
      var dataset = datasets ? datasets.contextualNavigation : {};
      return React.createElement(ContentNavigationWrapper, _extends({
        key: "product-nav-wrapper",
        innerRef: _this.getNavRef,
        disableInteraction: shouldDisableInteraction,
        style: transitionStyle
      }, dataset), React.createElement(ContentNavigation, {
        container: containerNavigation,
        isVisible: isVisible,
        key: "product-nav",
        product: productNavigation
      }), isCollapsed && !EXPERIMENTAL_FLYOUT_ON_HOVER ? React.createElement("div", {
        "aria-label": "Click to expand the navigation",
        role: "button",
        onClick: navigationUIController.expand,
        className: _css({
          cursor: 'pointer',
          height: '100%',
          outline: 0,
          position: 'absolute',
          transition: 'background-color 100ms',
          width: CONTENT_NAV_WIDTH_COLLAPSED,
          ':hover': {
            backgroundColor: containerNavigation ? colors.N30 : 'rgba(255, 255, 255, 0.08)'
          },
          ':active': {
            backgroundColor: colors.N40A
          }
        }),
        tabIndex: "0"
      }) : null);
    });

    _defineProperty(_assertThisInitialized(_this), "renderNavigation", function () {
      var _this$props3 = _this.props,
          datasets = _this$props3.datasets,
          navigationUIController = _this$props3.navigationUIController,
          EXPERIMENTAL_FLYOUT_ON_HOVER = _this$props3.experimental_flyoutOnHover,
          EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR = _this$props3.experimental_alternateFlyoutBehaviour,
          EXPERIMENTAL_FULL_WIDTH_FLYOUT = _this$props3.experimental_fullWidthFlyout,
          collapseToggleTooltipContent = _this$props3.collapseToggleTooltipContent,
          topOffset = _this$props3.topOffset;
      var _this$state = _this.state,
          flyoutIsOpen = _this$state.flyoutIsOpen,
          mouseIsOverNavigation = _this$state.mouseIsOverNavigation,
          itemIsDragging = _this$state.itemIsDragging;
      var _navigationUIControll2 = navigationUIController.state,
          isCollapsed = _navigationUIControll2.isCollapsed,
          isResizeDisabled = _navigationUIControll2.isResizeDisabled,
          isResizing = _navigationUIControll2.isResizing,
          productNavWidth = _navigationUIControll2.productNavWidth;
      var flyoutWidth = EXPERIMENTAL_FULL_WIDTH_FLYOUT ? productNavWidth : CONTENT_NAV_WIDTH_FLYOUT;
      var dataset = datasets ? datasets.navigation : {};
      return React.createElement(LayoutEventListener, {
        onItemDragStart: _this.onItemDragStart,
        onItemDragEnd: _this.onItemDragEnd
      }, React.createElement(NavigationAnalyticsContext, {
        data: {
          attributes: {
            isExpanded: !isCollapsed,
            flyoutOnHoverEnabled: EXPERIMENTAL_FLYOUT_ON_HOVER,
            alternateFlyoutBehaviourEnabled: EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR,
            fullWidthFlyoutEnabled: EXPERIMENTAL_FULL_WIDTH_FLYOUT
          },
          componentName: 'navigation',
          packageName: packageName,
          packageVersion: packageVersion
        }
      }, React.createElement(ResizeTransition, {
        from: [CONTENT_NAV_WIDTH_COLLAPSED],
        in: !isCollapsed || flyoutIsOpen,
        properties: ['width'],
        to: [flyoutIsOpen ? flyoutWidth : productNavWidth],
        userIsDragging: isResizing // only apply listeners to the NAV resize transition
        ,
        productNavWidth: productNavWidth
      }, function (_ref3) {
        var transitionStyle = _ref3.transitionStyle,
            transitionState = _ref3.transitionState;
        var onMouseOut = isCollapsed && EXPERIMENTAL_FLYOUT_ON_HOVER && flyoutIsOpen ? _this.mouseOutFlyoutArea : null;
        var onMouseOver = isCollapsed && EXPERIMENTAL_FLYOUT_ON_HOVER && !flyoutIsOpen ? _this.mouseOverFlyoutArea : null;
        return React.createElement(NavigationContainer, _extends({}, dataset, {
          topOffset: topOffset,
          innerRef: _this.getContainerRef,
          onMouseEnter: _this.mouseEnter,
          onMouseOver: EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR ? onMouseOver : null,
          onMouseOut: onMouseOut,
          onMouseLeave: _this.mouseLeave
        }), React.createElement(ResizeControl, {
          collapseToggleTooltipContent: collapseToggleTooltipContent,
          expandCollapseAffordanceRef: _this.nodeRefs.expandCollapseAffordance // eslint-disable-next-line camelcase
          ,
          experimental_flyoutOnHover: EXPERIMENTAL_FLYOUT_ON_HOVER,
          isDisabled: isResizeDisabled,
          flyoutIsOpen: flyoutIsOpen,
          isGrabAreaDisabled: itemIsDragging,
          mouseIsOverNavigation: mouseIsOverNavigation,
          onMouseOverButtonBuffer: EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR ? _this.closeFlyout : null,
          mutationRefs: [{
            ref: _this.pageRef,
            property: 'padding-left'
          }, {
            ref: _this.productNavRef,
            property: 'width'
          }],
          navigation: navigationUIController
        }, function (_ref4) {
          var isDragging = _ref4.isDragging,
              width = _ref4.width;
          return React.createElement(ContainerNavigationMask, {
            disableInteraction: itemIsDragging,
            onMouseOver: EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR ? null : onMouseOver
          }, React.createElement(RenderBlocker, {
            blockOnChange: true,
            itemIsDragging: itemIsDragging
          }, _this.renderGlobalNavigation(), _this.renderContentNavigation({
            isDragging: isDragging,
            transitionState: transitionState,
            transitionStyle: transitionStyle,
            width: width
          })));
        }));
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "renderPageContent", function () {
      var _this$props4 = _this.props,
          navigationUIController = _this$props4.navigationUIController,
          onExpandStart = _this$props4.onExpandStart,
          onExpandEnd = _this$props4.onExpandEnd,
          onCollapseStart = _this$props4.onCollapseStart,
          onCollapseEnd = _this$props4.onCollapseEnd,
          children = _this$props4.children;
      var flyoutIsOpen = _this.state.flyoutIsOpen;
      var _navigationUIControll3 = navigationUIController.state,
          isResizing = _navigationUIControll3.isResizing,
          isCollapsed = _navigationUIControll3.isCollapsed,
          productNavWidth = _navigationUIControll3.productNavWidth;
      return React.createElement(PageContent, {
        flyoutIsOpen: flyoutIsOpen,
        innerRef: _this.getPageRef,
        isResizing: isResizing,
        isCollapsed: isCollapsed,
        productNavWidth: productNavWidth,
        onExpandStart: onExpandStart,
        onExpandEnd: onExpandEnd,
        onCollapseStart: onCollapseStart,
        onCollapseEnd: onCollapseEnd
      }, children);
    });

    return _this;
  }

  _createClass(LayoutManager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.publishRefs();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.publishRefs();
    }
  }, {
    key: "publishRefs",
    value: function publishRefs() {
      var getRefs = this.props.getRefs;

      if (typeof getRefs === 'function') {
        getRefs(this.nodeRefs);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var topOffset = this.props.topOffset;
      return React.createElement(LayoutContainer, {
        topOffset: topOffset
      }, this.renderNavigation(), this.renderPageContent());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      // kill the flyout when the user commits to expanding navigation
      if (!props.navigationUIController.state.isCollapsed && state.flyoutIsOpen) {
        return {
          flyoutIsOpen: false
        };
      }

      return null;
    }
  }]);

  return LayoutManager;
}(Component);

_defineProperty(LayoutManager, "defaultProps", {
  collapseToggleTooltipContent: defaultTooltipContent,
  datasets: {
    contextualNavigation: {
      'data-test-id': 'ContextualNavigation'
    },
    globalNavigation: {
      'data-test-id': 'GlobalNavigation'
    },
    navigation: {
      'data-test-id': 'Navigation'
    }
  },
  topOffset: 0,
  // eslint-disable-next-line camelcase
  experimental_flyoutOnHover: false,
  experimental_alternateFlyoutBehaviour: false,
  experimental_fullWidthFlyout: false
});

export { LayoutManager as default };