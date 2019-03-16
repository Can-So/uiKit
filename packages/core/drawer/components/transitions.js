import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { layers } from '@findable/theme';
import { transitionDurationMs, transitionTimingFunction } from '../constants'; // Transitions
// ------------------------------

var defaultTransitionProps = {
  appear: true,
  mountOnEnter: true,
  unmountOnExit: true
};

var TransitionHandler =
/*#__PURE__*/
function (_Component) {
  _inherits(TransitionHandler, _Component);

  function TransitionHandler() {
    _classCallCheck(this, TransitionHandler);

    return _possibleConstructorReturn(this, _getPrototypeOf(TransitionHandler).apply(this, arguments));
  }

  _createClass(TransitionHandler, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$component = _this$props.component,
          Tag = _this$props$component === void 0 ? 'div' : _this$props$component,
          inProp = _this$props.in,
          onExited = _this$props.onExited,
          defaultStyles = _this$props.defaultStyles,
          transitionStyles = _this$props.transitionStyles,
          transitionProps = _this$props.transitionProps,
          props = _objectWithoutProperties(_this$props, ["component", "in", "onExited", "defaultStyles", "transitionStyles", "transitionProps"]);

      var timeout = {
        enter: 0,
        exit: transitionDurationMs
      };
      return React.createElement(Transition, _extends({
        in: inProp,
        onExited: onExited,
        timeout: timeout
      }, transitionProps), function (state) {
        var style = _objectSpread({}, defaultStyles, transitionStyles[state]);

        return React.createElement(Tag, _extends({
          style: style
        }, props));
      });
    }
  }]);

  return TransitionHandler;
}(Component);

_defineProperty(TransitionHandler, "defaultProps", {
  component: 'div',
  transitionProps: defaultTransitionProps
});

export var Fade = function Fade(_ref) {
  var props = _extends({}, _ref);

  return React.createElement(TransitionHandler, _extends({
    defaultStyles: {
      transition: "opacity ".concat(transitionDurationMs, "ms ").concat(transitionTimingFunction),
      opacity: 0,
      position: 'fixed',
      zIndex: layers.blanket()
    },
    transitionStyles: {
      entering: {
        opacity: 0
      },
      entered: {
        opacity: 1
      }
    }
  }, props));
};
export var Slide = function Slide(_ref2) {
  var _ref2$shouldUnmountOn = _ref2.shouldUnmountOnExit,
      shouldUnmountOnExit = _ref2$shouldUnmountOn === void 0 ? true : _ref2$shouldUnmountOn,
      props = _objectWithoutProperties(_ref2, ["shouldUnmountOnExit"]);

  return React.createElement(TransitionHandler, _extends({
    defaultStyles: {
      transition: "transform ".concat(transitionDurationMs, "ms ").concat(transitionTimingFunction, ", ") + "width ".concat(transitionDurationMs, "ms ").concat(transitionTimingFunction),
      transform: 'translate3d(-100%,0,0)'
    },
    transitionStyles: {
      // Unset transform so we do not create a new stacking context for fixed-position children - NAV-159
      entered: {
        transform: null
      },
      exited: {
        transform: 'translate3d(-100%,0,0)'
      }
    },
    transitionProps: _objectSpread({}, defaultTransitionProps, {
      unmountOnExit: shouldUnmountOnExit
    })
  }, props));
};