import styled, { css, keyframes } from 'styled-components';
import { colors, layers } from '@atlaskit/theme'; // NOTE:
// Pulse color "rgb(101, 84, 192)" derived from "colors.P300"

var baseShadow = "0 0 0 2px ".concat(colors.P300);
var easing = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';
var pulseKeframes = keyframes(["\n  0%, 33% { box-shadow: ", ", 0 0 0 rgba(101, 84, 192, 1) }\n  66%, 100% { box-shadow: ", ", 0 0 0 10px rgba(101, 84, 192, 0.01) }\n"], baseShadow, baseShadow);
var animation = css(["\n  animation: ", " 3000ms ", " infinite;\n"], pulseKeframes, easing);

var animationWithCheck = function animationWithCheck(_ref) {
  var pulse = _ref.pulse;
  return pulse ? animation : null;
};

var backgroundColor = function backgroundColor(p) {
  return p.bgColor ? "\n        background-color: ".concat(p.bgColor, ";\n      ") : null;
};

var borderRadius = function borderRadius(p) {
  return p.radius ? "\n        border-radius: ".concat(p.radius, "px;\n      ") : null;
}; // IE11 and Edge: z-index needed because fixed position calculates z-index relative
// to body insteadof nearest stacking context (Portal in our case).


export var Div = styled.div.withConfig({
  displayName: "Target__Div",
  componentId: "sc-19d3d2b-0"
})(["\n  z-index: ", ";\n  ", " ", ";\n"], layers.spotlight() + 1, backgroundColor, borderRadius); // fixed position holds the target in place if overflow/scroll is necessary

export var TargetInner = styled(Div).withConfig({
  displayName: "Target__TargetInner",
  componentId: "sc-19d3d2b-1"
})(["\n  ", " position: absolute;\n"], animationWithCheck);
export var TargetOverlay = styled.div.withConfig({
  displayName: "Target__TargetOverlay",
  componentId: "sc-19d3d2b-2"
})(["\n  cursor: ", ";\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n"], function (p) {
  return p.onClick ? 'pointer' : 'auto';
}); // exported for consumer

export var Pulse = styled(Div).withConfig({
  displayName: "Target__Pulse",
  componentId: "sc-19d3d2b-3"
})(["\n  position: absolute;\n  ", ";\n"], animation);