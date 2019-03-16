import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React, { Component } from 'react';
import { canUseDOM } from 'exenv';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import Blanket from '@atlaskit/blanket';
import { name as packageName, version as packageVersion } from '../version.json';
import { WIDTH_ENUM } from '../shared-variables';
import { PositionerAbsolute, PositionerRelative, Dialog, FillScreen as StyledFillScreen } from '../styled/Modal';
import { Animation } from './Animation';
import Content from './Content';
import FocusLock from './FocusLock';
export var Positioner = function Positioner(_ref) {
  var scrollBehavior = _ref.scrollBehavior,
      props = _objectWithoutProperties(_ref, ["scrollBehavior"]);

  var PositionComponent = scrollBehavior === 'inside' ? PositionerAbsolute : PositionerRelative;
  return React.createElement(PositionComponent, props);
};

function getScrollDistance() {
  return window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body && document.body.scrollTop || 0;
}

var Modal =
/*#__PURE__*/
function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Modal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      dialogNode: null,
      scrollDistance: canUseDOM ? getScrollDistance() : 0,
      isExiting: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleWindowScroll", function () {
      if (getScrollDistance() !== _this.state.scrollDistance) {
        window.scrollTo(window.pageXOffset, _this.state.scrollDistance);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleOverlayClick", function (e) {
      if (_this.props.shouldCloseOnOverlayClick) {
        _this.props.onClose(e);
      }
    });

    return _this;
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var scrollDistance = getScrollDistance();

      if (getScrollDistance() !== this.state.scrollDistance) {
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
          scrollDistance: scrollDistance
        });
      }

      window.addEventListener('scroll', this.handleWindowScroll);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.handleWindowScroll);
    }
    /* Prevent window from being scrolled programatically so that the modal is positioned correctly
     * and to prevent scrollIntoView from scrolling the window.
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          actions = _this$props.actions,
          appearance = _this$props.appearance,
          autoFocus = _this$props.autoFocus,
          body = _this$props.body,
          children = _this$props.children,
          components = _this$props.components,
          footer = _this$props.footer,
          header = _this$props.header,
          height = _this$props.height,
          isChromeless = _this$props.isChromeless,
          isHeadingMultiline = _this$props.isHeadingMultiline,
          isOpen = _this$props.isOpen,
          onClose = _this$props.onClose,
          onCloseComplete = _this$props.onCloseComplete,
          onOpenComplete = _this$props.onOpenComplete,
          onStackChange = _this$props.onStackChange,
          shouldCloseOnEscapePress = _this$props.shouldCloseOnEscapePress,
          stackIndex = _this$props.stackIndex,
          heading = _this$props.heading,
          width = _this$props.width,
          scrollBehavior = _this$props.scrollBehavior;
      var scrollDistance = this.state.scrollDistance;
      var isBackground = stackIndex != null && stackIndex > 0; // If a custom width (number or percentage) is supplied, set inline style
      // otherwise allow styled component to consume as named prop

      var widthName = WIDTH_ENUM.values.includes(width) ? width : null;
      var widthValue = widthName ? null : width;
      return React.createElement(Animation, {
        in: isOpen,
        onExited: onCloseComplete,
        onEntered: onOpenComplete,
        stackIndex: stackIndex
      }, function (_ref2) {
        var fade = _ref2.fade,
            slide = _ref2.slide;
        return React.createElement(StyledFillScreen, {
          style: fade,
          "aria-hidden": isBackground,
          scrollDistance: scrollDistance
        }, React.createElement(FocusLock, {
          isEnabled: stackIndex === 0 && isOpen,
          autoFocus: autoFocus
        }, React.createElement(Blanket, {
          isTinted: true,
          onBlanketClicked: _this2.handleOverlayClick
        }), React.createElement(Positioner, {
          style: slide,
          scrollBehavior: scrollBehavior,
          widthName: widthName,
          widthValue: widthValue
        }, React.createElement(Dialog, {
          heightValue: height,
          isChromeless: isChromeless,
          role: "dialog",
          tabIndex: "-1"
        }, React.createElement(Content, {
          actions: actions,
          appearance: appearance,
          components: components,
          footer: footer,
          heading: heading,
          isHeadingMultiline: isHeadingMultiline,
          header: header,
          onClose: onClose,
          shouldScroll: scrollBehavior === 'inside',
          shouldCloseOnEscapePress: shouldCloseOnEscapePress,
          onStackChange: onStackChange,
          isChromeless: isChromeless,
          stackIndex: stackIndex,
          body: body
        }, children)))));
      });
    }
  }]);

  return Modal;
}(Component);

_defineProperty(Modal, "defaultProps", {
  autoFocus: true,
  scrollBehavior: 'inside',
  shouldCloseOnEscapePress: true,
  shouldCloseOnOverlayClick: true,
  isChromeless: false,
  isOpen: true,
  stackIndex: 0,
  width: 'medium',
  isHeadingMultiline: true
});

var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export var ModalDialogWithoutAnalytics = Modal;
export default withAnalyticsContext({
  componentName: 'modalDialog',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onClose: createAndFireEventOnAtlaskit({
    action: 'closed',
    actionSubject: 'modalDialog',
    attributes: {
      componentName: 'modalDialog',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(Modal));