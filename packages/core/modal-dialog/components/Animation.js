import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React from 'react';
import { Transition } from 'react-transition-group';
var duration = 500;
var easing = 'cubic-bezier(0.23, 1, 0.32, 1)'; // easeOutQuint

var verticalOffset = 16; // Animation
// ==============================
// Modal has two parts that need to be animated. Everything should fade in/out
// and the popup should slide up/up (sic). These animations happen at the same time.
// This component calls it's children with the styles for both animations.

export var Animation = function Animation(_ref) {
  var hasEntered = _ref.in,
      _ref$stackIndex = _ref.stackIndex,
      stackIndex = _ref$stackIndex === void 0 ? 0 : _ref$stackIndex,
      onExited = _ref.onExited,
      onEntered = _ref.onEntered,
      children = _ref.children;
  return React.createElement(Transition, {
    in: hasEntered,
    timeout: {
      enter: 0,
      exit: duration
    },
    onExited: onExited,
    onEntered: onEntered,
    appear: true
  }, function (unadjustedStatus) {
    // when we first render, we want to finish the 'entering' state render
    // then jump to the 'entered' state as quick as possible.
    var adjustedStatus = hasEntered && unadjustedStatus === 'exited' ? 'entering' : unadjustedStatus; // Fade styles

    var fadeBase = {
      transition: "opacity ".concat(duration / 2, "ms"),
      opacity: 1
    };
    var fadeTransitions = {
      entering: {
        opacity: 0
      },
      exiting: {
        opacity: 0
      }
    }; // Slide styles

    var slideBase = {
      transition: "transform ".concat(duration, "ms ").concat(easing),
      transform: "translate3d(0, ".concat(verticalOffset * 2, "px, 0)")
    };
    var slideTransitions = {
      entering: {},
      entered: {
        transform: stackIndex > 0 ? "translate3d(0, ".concat(stackIndex * (verticalOffset / 2), "px, 0)") : null
      },
      exiting: {
        transform: "translate3d(0, -".concat(verticalOffset * 2, "px, 0)")
      }
    };
    return children({
      fade: _objectSpread({}, fadeBase, fadeTransitions[adjustedStatus]),
      slide: _objectSpread({}, slideBase, slideTransitions[adjustedStatus])
    });
  });
};