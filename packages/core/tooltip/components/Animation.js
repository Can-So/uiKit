import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React from 'react';
import { Transition } from 'react-transition-group';
var ENTER_DURATION = 120;
var EXIT_DURATION = 80;
var easing = 'cubic-bezier(0.23, 1, 0.32, 1)'; // easeOutQuint

var distance = 8;
var horizontalOffset = {
  left: distance,
  right: -distance,
  top: 0,
  bottom: 0
};
var verticalOffset = {
  bottom: -distance,
  top: distance,
  left: 0,
  right: 0
};

var defaultStyle = function defaultStyle(timeout) {
  return {
    transition: "transform ".concat(timeout.enter, "ms ").concat(easing, ", opacity ").concat(timeout.enter, "ms linear"),
    opacity: 0
  };
};

var transitionStyle = function transitionStyle(timeout, state, position) {
  var transitions = {
    entering: {
      transform: "translate3d(".concat(horizontalOffset[position], "px, ").concat(verticalOffset[position], "px, 0)")
    },
    entered: {
      opacity: 1
    },
    exiting: {
      opacity: 0,
      transition: "".concat(timeout.exit, "ms linear"),
      transform: "translate3d(".concat(horizontalOffset[position] / 2, "px, ").concat(verticalOffset[position] / 2, "px, 0)")
    }
  };
  return transitions[state];
};

var getStyle = function getStyle(timeout, state) {
  return function (position) {
    return _objectSpread({}, defaultStyle(timeout), transitionStyle(timeout, state, position));
  };
};

var Animation = function Animation(_ref) {
  var children = _ref.children,
      immediatelyHide = _ref.immediatelyHide,
      immediatelyShow = _ref.immediatelyShow,
      onExited = _ref.onExited,
      inProp = _ref.in;
  var timeout = {
    enter: immediatelyShow ? 1 : ENTER_DURATION,
    exit: immediatelyHide ? 1 : EXIT_DURATION
  };
  return React.createElement(Transition, {
    timeout: timeout,
    in: inProp,
    onExited: onExited,
    unmountOnExit: true,
    appear: true
  }, function (state) {
    return children(getStyle(timeout, state));
  });
};

export default Animation;