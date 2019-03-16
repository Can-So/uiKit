import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Gateway, GatewayRegistry } from './gateway';
import Portal from './Portal';
import withContextFromProps from './withContextFromProps';
export default function withRenderTarget(_ref, WrappedComponent) {
  var _class, _temp;

  var target = _ref.target,
      withTransitionGroup = _ref.withTransitionGroup;
  // Access the analytics context types so we can provide them across portal boundaries
  // until we can support React 16 where it can be provided natively
  var analyticsContextTypes = {
    // Old analytics keys
    onAnalyticsEvent: PropTypes.func,
    getParentAnalyticsData: PropTypes.func,
    // New analytics-next keys,
    getAtlaskitAnalyticsContext: PropTypes.func,
    getAtlaskitAnalyticsEventHandlers: PropTypes.func
  }; // These context types have been copied from jira-frontend to temporarily fix context issues for jira-frontend with other
  // layer-manager rendered components like flag - AK-4281

  var jiraContextTypes = {
    // For react-redux
    store: PropTypes.object,
    // For react-intl
    intl: PropTypes.object,
    // For common/analytics/analytics-provider
    triggerAnalytics: PropTypes.func,
    // For portfolio/common/view-awesome/validation/form/connect-to-form
    internalFormContext: PropTypes.object,
    // For board-v2/column/column-create/column-create-form
    validateColumn: PropTypes.func,
    // For board-v2/column/column-header/column-header
    createColumnMenu: PropTypes.func,
    // For board-v2/column/draggable-column/draggable-column
    getScrollTop: PropTypes.func,
    // For board/view/components/done-issues-button/done-issues-button
    configuration: PropTypes.object,
    // For board/view/components/drag-handle/drag-handle
    getDraggableOriginCenterPos: PropTypes.func,
    // For board/view/components/drag-handle/drag-handle
    getDraggableTranslatedCenterPos: PropTypes.func,
    // For common/components/profilecard/profilecard-view
    akProfileClient: PropTypes.object,
    // For common/components/profilecard/profilecard-view
    cloudId: PropTypes.string,
    // For common/engagement/with-engagement
    subscribeEngagementState: PropTypes.func,
    // For navigation/view/navigation-group-item/index
    perfMetricsStart: PropTypes.func,
    // For navigation/view/onboarding/components/onboarding-manager
    spotlightRegistry: PropTypes.object,
    // For navigation/view/project-header/index
    slideRight: PropTypes.func,
    // For portfolio/common/view/components/tree-table/view/details/index
    consumerStore: PropTypes.object,
    // For portfolio/page-plan/view-awesome/main/planning/schedule/schedule/lane/bar/index-dumb
    onBarSelected: PropTypes.func
  };

  var portalledContextTypes = _objectSpread({}, analyticsContextTypes, jiraContextTypes);

  var ContextProvider = withContextFromProps(portalledContextTypes, null); // eslint-disable-next-line react/prefer-stateless-function

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(_class, _Component);

    function _class() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_class)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "gatewayOrPortalChildRef", void 0);

      _defineProperty(_assertThisInitialized(_this), "getWrappedComponentRef", function (ref) {
        _this.gatewayOrPortalChildRef = ref;
      });

      return _this;
    }

    _createClass(_class, [{
      key: "render",
      value: function render() {
        var _this$context = this.context,
            gatewayRegistry = _this$context.gatewayRegistry,
            portalledContext = _objectWithoutProperties(_this$context, ["gatewayRegistry"]);

        var GatewayOrPortal = gatewayRegistry ? Gateway : Portal;
        return React.createElement(GatewayOrPortal, {
          id: process.env.NODE_ENV === 'test' ? 'gateway-or-portal' : '',
          into: target,
          withTransitionGroup: withTransitionGroup,
          shouldBlockRender: this.context.blockChildGatewayRender
        }, React.createElement(ContextProvider, portalledContext, React.createElement(WrappedComponent, _extends({
          ref: this.getWrappedComponentRef
        }, this.props))));
      }
    }]);

    return _class;
  }(Component), _defineProperty(_class, "contextTypes", _objectSpread({
    gatewayRegistry: PropTypes.instanceOf(GatewayRegistry),
    blockChildGatewayRender: PropTypes.bool
  }, analyticsContextTypes, jiraContextTypes)), _temp;
}