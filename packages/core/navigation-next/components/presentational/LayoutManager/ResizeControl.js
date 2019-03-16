import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { css as _css7 } from "emotion";
import { css as _css6 } from "emotion";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { css as _css5 } from "emotion";
import { css as _css4 } from "emotion";
import { css as _css3 } from "emotion";
import { css as _css2 } from "emotion";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/extends";
import { css as _css } from "emotion";
import React, { PureComponent, Fragment } from 'react';
import raf from 'raf-schd';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { colors } from '@atlaskit/theme';
import ChevronLeft from '@atlaskit/icon/glyph/chevron-left';
import ChevronRight from '@atlaskit/icon/glyph/chevron-right';
import MenuExpandIcon from '@atlaskit/icon/glyph/menu-expand';
import Tooltip from '@atlaskit/tooltip';
import { navigationExpandedCollapsed } from '../../../common/analytics';
import { GLOBAL_NAV_WIDTH, CONTENT_NAV_WIDTH, CONTENT_NAV_WIDTH_COLLAPSED, GLOBAL_NAV_COLLAPSE_THRESHOLD } from '../../../common/constants';
import { Shadow } from '../../../common/primitives';
import PropertyToggle from './PropertyToggle';
var HANDLE_OFFSET = 4;
var INNER_WIDTH = 20;
var OUTER_WIDTH = INNER_WIDTH + HANDLE_OFFSET;
var HANDLE_WIDTH = 2;

var shouldResetGrabArea = function shouldResetGrabArea(width) {
  return width >= GLOBAL_NAV_COLLAPSE_THRESHOLD && width < CONTENT_NAV_WIDTH;
};

var _ref = {
  position: 'relative',
  width: OUTER_WIDTH
};

var Outer = function Outer(props) {
  return React.createElement("div", _extends({
    className: _css(_ref)
  }, props));
};

var _ref3 = {
  cursor: 'ew-resize',
  height: '100%',
  left: -HANDLE_OFFSET,
  position: 'relative',
  width: OUTER_WIDTH
};
export var GrabArea = function GrabArea(_ref2) {
  var showHandle = _ref2.showHandle,
      isBold = _ref2.isBold,
      props = _objectWithoutProperties(_ref2, ["showHandle", "isBold"]);

  return React.createElement("div", _extends({
    className: _css2(_ref3)
  }, props), React.createElement("div", {
    className: _css3({
      backgroundColor: isBold ? colors.B200 : colors.B100,
      opacity: showHandle ? 1 : 0,
      height: '100%',
      left: HANDLE_OFFSET - HANDLE_WIDTH / 2,
      // the handle should "straddle" the dividing line
      position: 'absolute',
      transition: 'opacity 200ms',
      width: HANDLE_WIDTH
    })
  }));
};
var largeHitArea = {
  left: -8,
  right: -12,
  bottom: -8,
  top: -8
};
var smallHitArea = {
  left: -4,
  right: -4,
  bottom: -4,
  top: -4
};

var Button = function Button(_ref4) {
  var children = _ref4.children,
      hasHighlight = _ref4.hasHighlight,
      innerRef = _ref4.innerRef,
      isVisible = _ref4.isVisible,
      hitAreaSize = _ref4.hitAreaSize,
      props = _objectWithoutProperties(_ref4, ["children", "hasHighlight", "innerRef", "isVisible", "hitAreaSize"]);

  return React.createElement("button", _extends({
    type: "button",
    ref: innerRef,
    className: _css4({
      background: 0,
      backgroundColor: 'white',
      border: 0,
      borderRadius: '50%',
      boxShadow: "0 0 0 1px ".concat(colors.N30A, ", 0 2px 4px 1px ").concat(colors.N30A),
      color: hasHighlight ? colors.B100 : colors.N200,
      cursor: 'pointer',
      height: 24,
      opacity: isVisible ? 1 : 0,
      outline: 0,
      padding: 0,
      position: 'absolute',
      top: 32,
      transition: "\n        background-color 100ms linear,\n        color 100ms linear,\n        opacity 300ms cubic-bezier(0.2, 0, 0, 1),\n        transform 300ms cubic-bezier(0.2, 0, 0, 1)\n      ",
      transform: "translate(-50%)",
      width: 24,
      ':hover': {
        backgroundColor: colors.B100,
        color: 'white'
      },
      ':active': {
        backgroundColor: colors.B200,
        color: 'white'
      }
    })
  }, props), React.createElement("div", {
    // increase hit-area
    className: _css5(_objectSpread({
      position: 'absolute'
    }, hitAreaSize === 'small' ? smallHitArea : largeHitArea))
  }), children);
}; // tinker with the DOM directly by setting style properties, updates the grab bar position by changing padding-left and width.


function updateResizeAreaPosition(elements, width) {
  elements.forEach(function (_ref5) {
    var property = _ref5.property,
        ref = _ref5.ref;
    var newValue = "".concat(width, "px");
    var oldValue = ref.style.getPropertyValue(property); // avoid thrashing

    if (oldValue === newValue) return; // direct attribute manipulation

    ref.style.setProperty(property, newValue);
  });
} // helper for tooltip content keyboard shortcut highlight


var _ref7 = {
  alignItems: 'baseline',
  display: 'flex',
  lineHeight: 1.3,
  paddingBottom: 1,
  paddingTop: 1
};

function makeTooltipNode(_ref6) {
  var text = _ref6.text,
      char = _ref6.char;
  return React.createElement("div", {
    className: _css6(_ref7)
  }, React.createElement("span", null, text), React.createElement("div", {
    className: _css7({
      backgroundColor: colors.N400,
      borderRadius: 2,
      lineHeight: 1.2,
      marginLeft: 4,
      padding: '1px 8px'
    })
  }, char));
}

/* NOTE: experimental props use an underscore */
var ResizeControl =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ResizeControl, _PureComponent);

  function ResizeControl() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ResizeControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ResizeControl)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "invalidDragAttempted", false);

    _defineProperty(_assertThisInitialized(_this), "lastWidth", void 0);

    _defineProperty(_assertThisInitialized(_this), "wrapper", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      delta: 0,
      didDragOpen: false,
      isDragging: false,
      initialWidth: 0,
      initialX: 0,
      mouseIsDown: false,
      mouseIsOverGrabArea: false,
      showGrabArea: true,
      width: _this.props.navigation.state.productNavWidth
    });

    _defineProperty(_assertThisInitialized(_this), "onResizerChevronClick", function () {
      var trigger = _this.props.flyoutIsOpen ? 'chevronHover' : 'chevron';

      _this.toggleCollapse(trigger);
    });

    _defineProperty(_assertThisInitialized(_this), "mouseEnterGrabArea", function () {
      _this.setState({
        mouseIsOverGrabArea: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "mouseLeaveGrabArea", function () {
      _this.setState({
        mouseIsOverGrabArea: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleCollapse", function (trigger) {
      var _this$props = _this.props,
          navigation = _this$props.navigation,
          createAnalyticsEvent = _this$props.createAnalyticsEvent;
      var newCollapsedState = !navigation.state.isCollapsed;
      navigation.toggleCollapse();
      navigationExpandedCollapsed(createAnalyticsEvent, {
        trigger: trigger,
        isCollapsed: newCollapsedState
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleResizeStart", function (event) {
      var initialX = event.pageX;

      _this.setState({
        initialX: initialX,
        mouseIsDown: true
      }); // attach handlers (handleResizeStart is a bound to onMouseDown)


      window.addEventListener('mousemove', _this.handleResize);
      window.addEventListener('mouseup', _this.handleResizeEnd);
    });

    _defineProperty(_assertThisInitialized(_this), "initializeDrag", function (event) {
      var navigation = _this.props.navigation;
      var delta = event.pageX - _this.state.initialX;
      var isCollapsed = navigation.state.isCollapsed; // only initialize when drag intention is "expand"

      if (isCollapsed && delta <= 0) {
        _this.invalidDragAttempted = true;
        return;
      }

      var initialWidth = navigation.state.productNavWidth;
      var didDragOpen = false; // NOTE
      // if the product nav is collapsed and the consumer starts dragging it open
      // we must expand it and drag should start from 0.

      if (isCollapsed) {
        initialWidth = CONTENT_NAV_WIDTH_COLLAPSED;
        didDragOpen = true;
        navigation.manualResizeStart({
          productNavWidth: CONTENT_NAV_WIDTH_COLLAPSED,
          isCollapsed: false
        });
      } else {
        navigation.manualResizeStart(navigation.state);
      }

      _this.setState({
        didDragOpen: didDragOpen,
        initialWidth: initialWidth,
        isDragging: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleResize", raf(function (event) {
      var mutationRefs = _this.props.mutationRefs;
      var _this$state = _this.state,
          initialX = _this$state.initialX,
          initialWidth = _this$state.initialWidth,
          isDragging = _this$state.isDragging,
          mouseIsDown = _this$state.mouseIsDown; // on occasion a mouse move event occurs before the event listeners
      // have a chance to detach

      if (!mouseIsDown) return; // initialize dragging

      if (!isDragging) {
        _this.initializeDrag(event);

        return;
      } // allow the product nav to be 75% of the available page width


      var maxWidth = Math.round(window.innerWidth / 4 * 3);
      var minWidth = CONTENT_NAV_WIDTH_COLLAPSED;
      var adjustedMax = maxWidth - initialWidth - GLOBAL_NAV_WIDTH;
      var adjustedMin = minWidth - initialWidth;
      var delta = Math.max(Math.min(event.pageX - initialX, adjustedMax), adjustedMin);
      var width = initialWidth + delta; // apply updated styles to the applicable DOM nodes

      updateResizeAreaPosition(mutationRefs, width); // NOTE: hijack the maual resize and force collapse, cancels mouse events

      if (event.screenX < window.screenX) {
        _this.setState({
          width: CONTENT_NAV_WIDTH_COLLAPSED
        });

        _this.handleResizeEnd();
      } else {
        // maintain internal width, applied to navigation state on resize end
        _this.setState({
          delta: delta,
          width: width
        });
      }
    }));

    _defineProperty(_assertThisInitialized(_this), "handleResizeEnd", function () {
      var _this$props2 = _this.props,
          navigation = _this$props2.navigation,
          createAnalyticsEvent = _this$props2.createAnalyticsEvent;
      var _this$state2 = _this.state,
          delta = _this$state2.delta,
          didDragOpen = _this$state2.didDragOpen,
          isDragging = _this$state2.isDragging,
          currentWidth = _this$state2.width;
      var expandThreshold = 24;
      var resizerClicked = !isDragging && !_this.invalidDragAttempted;
      var publishWidth = currentWidth;
      var shouldCollapse = false; // check if the intention was just a click, and toggle

      if (resizerClicked) {
        publishWidth = Math.max(CONTENT_NAV_WIDTH, currentWidth);

        _this.toggleCollapse('resizerClick');
      } // prevent the user from creating an unusable width


      if (publishWidth < CONTENT_NAV_WIDTH) {
        publishWidth = CONTENT_NAV_WIDTH;

        if (didDragOpen && delta > expandThreshold) {
          shouldCollapse = false;
        } else if (currentWidth < GLOBAL_NAV_COLLAPSE_THRESHOLD) {
          shouldCollapse = true;
        }
      } else {
        shouldCollapse = navigation.state.isCollapsed;
      }

      if (!resizerClicked && (didDragOpen && !shouldCollapse || !didDragOpen && shouldCollapse)) {
        navigationExpandedCollapsed(createAnalyticsEvent, {
          trigger: 'resizerDrag',
          isCollapsed: shouldCollapse
        });
      } // reset everything


      _this.invalidDragAttempted = false;

      _this.setState({
        didDragOpen: false,
        isDragging: false,
        mouseIsDown: false,
        width: publishWidth
      }); // publish the new width, once resizing completes


      navigation.manualResizeEnd({
        productNavWidth: publishWidth,
        isCollapsed: shouldCollapse
      });

      if (shouldResetGrabArea(currentWidth)) {
        updateResizeAreaPosition(_this.props.mutationRefs, CONTENT_NAV_WIDTH);
      } // cleanup


      window.removeEventListener('mousemove', _this.handleResize);
      window.removeEventListener('mouseup', _this.handleResizeEnd);
    });

    return _this;
  }

  _createClass(ResizeControl, [{
    key: "render",
    value: function render() {
      var _this$state3 = this.state,
          didDragOpen = _this$state3.didDragOpen,
          isDragging = _this$state3.isDragging,
          mouseIsDown = _this$state3.mouseIsDown,
          mouseIsOverGrabArea = _this$state3.mouseIsOverGrabArea,
          showGrabArea = _this$state3.showGrabArea;
      var _this$props3 = this.props,
          children = _this$props3.children,
          collapseToggleTooltipContent = _this$props3.collapseToggleTooltipContent,
          expandCollapseAffordanceRef = _this$props3.expandCollapseAffordanceRef,
          flyoutIsOpen = _this$props3.flyoutIsOpen,
          isResizeDisabled = _this$props3.isDisabled,
          isGrabAreaDisabled = _this$props3.isGrabAreaDisabled,
          mouseIsOverNavigation = _this$props3.mouseIsOverNavigation,
          onMouseOverButtonBuffer = _this$props3.onMouseOverButtonBuffer,
          navigation = _this$props3.navigation;
      var isCollapsed = navigation.state.isCollapsed; // the button shouldn't "flip" until the drag is complete

      var ButtonIcon = ChevronLeft;
      if (isCollapsed || didDragOpen && isDragging) ButtonIcon = MenuExpandIcon;
      if (isCollapsed && flyoutIsOpen) ButtonIcon = ChevronRight;
      var button = React.createElement(Button, {
        onClick: this.onResizerChevronClick,
        hitAreaSize: onMouseOverButtonBuffer ? 'large' : 'small' // maintain styles when user is dragging
        ,
        isVisible: isCollapsed || mouseIsDown || mouseIsOverNavigation,
        hasHighlight: mouseIsDown || mouseIsOverGrabArea,
        innerRef: expandCollapseAffordanceRef
      }, React.createElement(ButtonIcon, null));
      var shadowDirection = flyoutIsOpen ? 'to right' : 'to left';
      return React.createElement(Fragment, null, children(this.state), React.createElement(Outer, null, React.createElement(Shadow, {
        direction: shadowDirection,
        isBold: mouseIsDown
      }), !isResizeDisabled && React.createElement(Fragment, null, !isGrabAreaDisabled && showGrabArea && React.createElement(GrabArea, {
        isBold: mouseIsDown,
        showHandle: mouseIsDown || mouseIsOverGrabArea,
        onMouseEnter: this.mouseEnterGrabArea,
        onMouseLeave: this.mouseLeaveGrabArea,
        onMouseDown: this.handleResizeStart
      }), React.createElement("div", {
        onMouseOver: !flyoutIsOpen ? onMouseOverButtonBuffer : null
      }, collapseToggleTooltipContent ? React.createElement(Tooltip, {
        content: makeTooltipNode(collapseToggleTooltipContent(isCollapsed)),
        delay: 600,
        hideTooltipOnClick: true,
        position: "right"
      }, button) : button))), React.createElement(PropertyToggle, {
        isActive: isDragging,
        styles: {
          cursor: 'ew-resize'
        }
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var EXPERIMENTAL_FLYOUT_ON_HOVER = props.experimental_flyoutOnHover,
          flyoutIsOpen = props.flyoutIsOpen,
          navigation = props.navigation;
      var isCollapsed = navigation.state.isCollapsed; // resolve "hover locking" issue with resize grab area

      if (EXPERIMENTAL_FLYOUT_ON_HOVER) {
        var showGrabArea = !isCollapsed && !flyoutIsOpen;
        var mouseIsOverGrabArea = showGrabArea ? state.mouseIsOverGrabArea : false;
        return {
          mouseIsOverGrabArea: mouseIsOverGrabArea,
          showGrabArea: showGrabArea
        };
      }

      return null;
    }
  }]);

  return ResizeControl;
}(PureComponent);

_defineProperty(ResizeControl, "defaultProps", {
  isGrabAreaDisabled: false
});

export { ResizeControl as ResizeControlBase };
export default withAnalyticsEvents()(ResizeControl);