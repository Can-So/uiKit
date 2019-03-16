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
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import { withNavigationUIController } from '../../../ui-controller';
import { ViewControllerSubscriber } from '../../../view-controller';
import LayoutManager from '../../presentational/LayoutManager';
import LayerInitialised from '../../presentational/LayerInitialised';
/* NOTE: experimental props use an underscore */

/* eslint-disable camelcase */

var AsyncLayoutManagerWithViewControllerBase =
/*#__PURE__*/
function (_Component) {
  _inherits(AsyncLayoutManagerWithViewControllerBase, _Component);

  function AsyncLayoutManagerWithViewControllerBase(props) {
    var _this;

    _classCallCheck(this, AsyncLayoutManagerWithViewControllerBase);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AsyncLayoutManagerWithViewControllerBase).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      hasInitialised: false,
      outgoingView: null
    });

    _defineProperty(_assertThisInitialized(_this), "onInitialised", function () {
      _this.setState({
        hasInitialised: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSkeleton", function () {
      var ContainerSkeleton = _this.props.containerSkeleton;
      return React.createElement(ContainerSkeleton, {
        type: _this.props.firstSkeletonToRender
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderContainerNavigation", function () {
      var _this$props = _this.props,
          firstSkeletonToRender = _this$props.firstSkeletonToRender,
          view = _this$props.view;
      var outgoingView = _this.state.outgoingView;

      if (view && view.type === 'container') {
        return _this.renderView(view);
      }

      if (outgoingView && outgoingView.type === 'container') {
        return _this.renderView(outgoingView);
      }

      if (!view && firstSkeletonToRender === 'container' && !_this.state.hasInitialised) {
        return _this.renderSkeleton();
      }

      return firstSkeletonToRender !== 'container' ? null : _this.renderSkeleton();
    });

    _defineProperty(_assertThisInitialized(_this), "renderGlobalNavigation", function () {
      var _this$props2 = _this.props,
          GlobalNavigation = _this$props2.globalNavigation,
          view = _this$props2.view;
      var hasInitialised = _this.state.hasInitialised;
      /* We are embedding the LayerInitialised analytics component within global navigation so that
       * the event it fires can access the analytics context within LayerManager. The component
       * cannot be rendered directly within LayerManager since it needs access to view data which
       * only exists in LayoutManagerWithViewController. */

      return React.createElement(Fragment, null, React.createElement(GlobalNavigation, null), React.createElement(LayerInitialised, {
        activeView: view,
        initialised: hasInitialised,
        onInitialised: _this.onInitialised
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderProductNavigation", function () {
      var view = _this.props.view;
      var outgoingView = _this.state.outgoingView;

      if (view && view.type === 'product') {
        return _this.renderView(view);
      } // If we're transitioning from a product view to a container view still
      // render the outgoing product view.


      if (view && view.type === 'container' && outgoingView && outgoingView.type === 'product') {
        return _this.renderView(outgoingView);
      }

      return _this.renderSkeleton();
    });

    _this.renderContainerNavigation.displayName = 'ContainerNavigationRenderer';
    _this.renderProductNavigation.displayName = 'ProductNavigationRenderer';
    return _this;
  }

  _createClass(AsyncLayoutManagerWithViewControllerBase, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var view = this.props.view;
      var prevView = prevProps.view;

      if (!view || !prevView) {
        return;
      } // If we're moving from a product to a container view or vice versa we cache
      // the previous view so that we can still render it during the transition.


      if (view.type !== prevView.type) {
        // It's totally fine to setState in componentDidUpdate as long as it's
        // wrapped in a condition:
        // https://reactjs.org/docs/react-component.html#componentdidupdate
        // eslint-disable-next-line
        this.setState({
          outgoingView: prevView
        });
      }
    }
  }, {
    key: "renderView",
    value: function renderView(view) {
      var _this$props3 = this.props,
          customComponents = _this$props3.customComponents,
          ItemsRenderer = _this$props3.itemsRenderer;
      return React.createElement(ItemsRenderer, {
        customComponents: customComponents,
        items: view.data
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          children = _this$props4.children,
          experimental_flyoutOnHover = _this$props4.experimental_flyoutOnHover,
          experimental_alternateFlyoutBehaviour = _this$props4.experimental_alternateFlyoutBehaviour,
          experimental_fullWidthFlyout = _this$props4.experimental_fullWidthFlyout,
          firstSkeletonToRender = _this$props4.firstSkeletonToRender,
          onExpandStart = _this$props4.onExpandStart,
          onExpandEnd = _this$props4.onExpandEnd,
          onCollapseStart = _this$props4.onCollapseStart,
          onCollapseEnd = _this$props4.onCollapseEnd,
          getRefs = _this$props4.getRefs,
          view = _this$props4.view,
          topOffset = _this$props4.topOffset;
      return React.createElement(NavigationAnalyticsContext, {
        data: {
          attributes: _objectSpread({
            navigationLayer: view && view.type,
            view: view && view.id
          }, view && view.analyticsAttributes)
        }
      }, React.createElement(LayoutManager, {
        globalNavigation: this.renderGlobalNavigation,
        containerNavigation: view && view.type === 'container' || !view && firstSkeletonToRender === 'container' && !this.state.hasInitialised ? this.renderContainerNavigation : null,
        experimental_flyoutOnHover: experimental_flyoutOnHover,
        experimental_alternateFlyoutBehaviour: experimental_alternateFlyoutBehaviour,
        experimental_fullWidthFlyout: experimental_fullWidthFlyout,
        productNavigation: this.renderProductNavigation,
        onExpandStart: onExpandStart,
        onExpandEnd: onExpandEnd,
        onCollapseStart: onCollapseStart,
        onCollapseEnd: onCollapseEnd,
        getRefs: getRefs,
        topOffset: topOffset
      }, children));
    }
  }]);

  return AsyncLayoutManagerWithViewControllerBase;
}(Component);

_defineProperty(AsyncLayoutManagerWithViewControllerBase, "defaultProps", {
  experimental_flyoutOnHover: false,
  experimental_alternateFlyoutBehaviour: false,
  experimental_fullWidthFlyout: false
});

var AsyncLayoutManagerWithView = function AsyncLayoutManagerWithView(props) {
  return React.createElement(ViewControllerSubscriber, null, function (_ref) {
    var activeView = _ref.state.activeView;
    return React.createElement(AsyncLayoutManagerWithViewControllerBase, _extends({
      view: activeView
    }, props));
  });
};

export default withNavigationUIController(AsyncLayoutManagerWithView);