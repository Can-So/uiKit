import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React from 'react';
import { Transition } from 'react-transition-group';
var duration = 100;
export var Fade = function Fade(_ref) {
  var hasEntered = _ref.in,
      children = _ref.children,
      onExited = _ref.onExited;
  return React.createElement(Transition, {
    in: hasEntered,
    timeout: duration,
    onExited: onExited,
    unmountOnExit: true,
    appear: true
  }, function (status) {
    var base = {
      transition: "opacity ".concat(duration, "ms"),
      opacity: 0
    };
    var anim = {
      entered: {
        opacity: 1
      },
      exiting: {
        opacity: 0
      }
    };

    var style = _objectSpread({}, base, anim[status]);

    return children(style);
  });
};