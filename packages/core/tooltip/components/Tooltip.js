import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

/* eslint-disable react/require-default-props */
import React, { Children, Component, Fragment } from 'react';
import NodeResolver from 'react-node-resolver';
import flushable from 'flushable';
import { Popper } from '@atlaskit/popper';
import Portal from '@atlaskit/portal';
import { layers } from '@atlaskit/theme';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import { name as packageName, version as packageVersion } from '../version.json';
import { Tooltip as StyledTooltip } from '../styled';
import Animation from './Animation';
import { hoveredPayload, unhoveredPayload } from './utils/analytics-payloads';
var SCROLL_OPTIONS = {
  capture: true,
  passive: true
};

function getMousePosition(mouseCoordinates) {
  var safeMouse = mouseCoordinates || {
    top: 0,
    left: 0
  };

  var getBoundingClientRect = function getBoundingClientRect() {
    return {
      top: safeMouse.top,
      left: safeMouse.left,
      bottom: safeMouse.top,
      right: safeMouse.left,
      width: 0,
      height: 0
    };
  };

  return {
    getBoundingClientRect: getBoundingClientRect,
    clientWidth: 0,
    clientHeight: 0
  };
}

var pendingHide;

var showTooltip = function showTooltip(fn, defaultDelay) {
  var isHidePending = pendingHide && pendingHide.pending();

  if (isHidePending) {
    pendingHide.flush();
  }

  var pendingShow = flushable(function () {
    return fn(isHidePending);
  }, isHidePending ? 0 : defaultDelay);
  return pendingShow.cancel;
};

var hideTooltip = function hideTooltip(fn, defaultDelay) {
  pendingHide = flushable(function (flushed) {
    return fn(flushed);
  }, defaultDelay);
  return pendingHide.cancel;
};

var Tooltip =
/*#__PURE__*/
function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tooltip)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "wrapperRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "targetRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "fakeMouseElement", void 0);

    _defineProperty(_assertThisInitialized(_this), "cancelPendingSetState", function () {});

    _defineProperty(_assertThisInitialized(_this), "state", {
      immediatelyHide: false,
      immediatelyShow: false,
      isVisible: false,
      renderTooltip: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleWindowScroll", function () {
      if (_this.state.isVisible) {
        _this.cancelPendingSetState();

        _this.setState({
          isVisible: false,
          immediatelyHide: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseClick", function () {
      if (_this.props.hideTooltipOnClick) {
        _this.cancelPendingSetState();

        _this.setState({
          isVisible: false,
          immediatelyHide: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseDown", function () {
      if (_this.props.hideTooltipOnMouseDown) {
        _this.cancelPendingSetState();

        _this.setState({
          isVisible: false,
          immediatelyHide: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseOver", function (e) {
      if (e.target === _this.wrapperRef) return; // In the case where a tooltip is newly rendered but immediately becomes hovered,
      // we need to set the coordinates in the mouseOver event.

      if (!_this.fakeMouseElement) _this.fakeMouseElement = getMousePosition({
        left: e.clientX,
        top: e.clientY
      });

      _this.cancelPendingSetState();

      if (Boolean(_this.props.content) && !_this.state.isVisible) {
        _this.cancelPendingSetState = showTooltip(function (immediatelyShow) {
          _this.setState({
            isVisible: true,
            renderTooltip: true,
            immediatelyShow: immediatelyShow
          });
        }, _this.props.delay);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function (e) {
      if (e.target === _this.wrapperRef) return;

      _this.cancelPendingSetState();

      if (_this.state.isVisible) {
        _this.cancelPendingSetState = hideTooltip(function (immediatelyHide) {
          _this.setState({
            isVisible: false,
            immediatelyHide: immediatelyHide
          });
        }, _this.props.delay);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseMove", function (event) {
      if (!_this.state.renderTooltip) {
        _this.fakeMouseElement = getMousePosition({
          left: event.clientX,
          top: event.clientY
        });
      }
    });

    return _this;
  }

  _createClass(Tooltip, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cancelPendingSetState();
      this.removeScrollListener();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (!prevState.isVisible && this.state.isVisible) {
        if (this.props.onShow) this.props.onShow();
        window.addEventListener('scroll', this.handleWindowScroll, SCROLL_OPTIONS);
      } else if (prevState.isVisible && !this.state.isVisible) {
        if (this.props.onHide) this.props.onHide();
        this.removeScrollListener();
      }
    }
  }, {
    key: "removeScrollListener",
    value: function removeScrollListener() {
      window.removeEventListener('scroll', this.handleWindowScroll, SCROLL_OPTIONS);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          content = _this$props.content,
          position = _this$props.position,
          mousePosition = _this$props.mousePosition,
          truncate = _this$props.truncate,
          TooltipContainer = _this$props.component,
          TargetContainer = _this$props.tag;
      var _this$state = this.state,
          isVisible = _this$state.isVisible,
          renderTooltip = _this$state.renderTooltip,
          immediatelyShow = _this$state.immediatelyShow,
          immediatelyHide = _this$state.immediatelyHide;
      return React.createElement(Fragment, null, React.createElement(TargetContainer, {
        onClick: this.handleMouseClick,
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseLeave,
        onMouseMove: this.handleMouseMove,
        onMouseDown: this.handleMouseDown,
        ref: function ref(wrapperRef) {
          _this2.wrapperRef = wrapperRef;
        }
      }, React.createElement(NodeResolver, {
        innerRef: function innerRef(targetRef) {
          _this2.targetRef = targetRef;
        }
      }, Children.only(children))), renderTooltip && this.targetRef && this.fakeMouseElement ? React.createElement(Portal, {
        zIndex: layers.tooltip()
      }, React.createElement(Popper, {
        referenceElement: // https://github.com/FezVrasta/react-popper#usage-without-a-reference-htmlelement
        // We are using a popper technique to pass in a faked element when we use mouse.
        // This is fine.
        // $FlowFixMe
        position === 'mouse' ? this.fakeMouseElement : this.targetRef,
        placement: position === 'mouse' ? mousePosition : position
      }, function (_ref) {
        var ref = _ref.ref,
            style = _ref.style,
            placement = _ref.placement;
        return React.createElement(Animation, {
          immediatelyShow: immediatelyShow,
          immediatelyHide: immediatelyHide,
          onExited: function onExited() {
            return _this2.setState({
              renderTooltip: false
            });
          },
          in: isVisible
        }, function (getAnimationStyles) {
          return React.createElement(TooltipContainer, {
            innerRef: ref,
            style: _objectSpread({}, getAnimationStyles(placement), style),
            truncate: truncate
          }, content);
        });
      })) : null);
    }
  }]);

  return Tooltip;
}(Component);

_defineProperty(Tooltip, "defaultProps", {
  component: StyledTooltip,
  delay: 300,
  mousePosition: 'bottom',
  position: 'bottom',
  tag: 'div'
});

export { Tooltip as TooltipWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'tooltip',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onHide: unhoveredPayload,
  onShow: createAndFireEventOnAtlaskit(_objectSpread({}, hoveredPayload))
})(Tooltip));