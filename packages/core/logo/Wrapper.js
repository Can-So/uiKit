import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import styled, { css } from 'styled-components';
import { sizes } from './constants';
var Span = styled.span.withConfig({
  displayName: "Wrapper__Span",
  componentId: "qx583l-0"
})(["\n  color: ", ";\n  display: inline-block;\n  fill: ", ";\n  height: ", "px;\n  position: relative;\n  user-select: none;\n\n  > svg {\n    fill: inherit;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n  > canvas {\n    display: block;\n    height: 100%;\n    visibility: hidden;\n  }\n  ", ";\n"], function (p) {
  return p.iconColor;
}, function (p) {
  return p.textColor;
}, function (p) {
  return sizes[p.size];
}, function (p) {
  return (
    /* Only apply this if our stop-colors are inherit, if they aren't we don't need to set stop-color via css */
    p.iconGradientStart === 'inherit' && p.iconGradientStop === 'inherit' && css(["\n      /* Stop-color doesn't properly apply in chrome when the inherited/current color changes.\n      * We have to initially set stop-color to inherit (either via DOM attribute or an initial CSS\n      * rule) and then override it with currentColor for the color changes to be picked up.\n      */\n      stop {\n        stop-color: currentColor;\n      }\n    "])
  );
});

var Wrapper = function Wrapper(_ref) {
  var label = _ref.label,
      svg = _ref.svg,
      rest = _objectWithoutProperties(_ref, ["label", "svg"]);

  return React.createElement(Span // We want to not add the aria-label if it does not exist for consistency
  // eslint-disable-next-line
  , _extends({
    "aria-label": label ? label : undefined,
    dangerouslySetInnerHTML: {
      __html: typeof svg === 'function' ? svg(String(rest.iconGradientStart), String(rest.iconGradientStop)) : svg
    }
  }, rest));
};

export default Wrapper;