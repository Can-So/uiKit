import styled, { css } from 'styled-components';
import { borderRadius, colors, themed, layers } from '@atlaskit/theme';
var backgroundColor = themed({
  light: colors.N800,
  dark: colors.DN0
});
var textColor = themed({
  light: colors.N0,
  dark: colors.DN600
});

var truncate = function truncate(p) {
  return p.truncate ? css(["\n        max-width: 420px;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      "]) : '';
};

export var TooltipPrimitive = styled.div.withConfig({
  displayName: "styled__TooltipPrimitive",
  componentId: "fadon5-0"
})(["\n  z-index: ", ";\n  pointer-events: none;\n  position: fixed;\n"], layers.tooltip);
export var Tooltip = styled(TooltipPrimitive).withConfig({
  displayName: "styled__Tooltip",
  componentId: "fadon5-1"
})(["\n  background-color: ", ";\n  border-radius: ", "px;\n  box-sizing: border-box;\n  color: ", ";\n  font-size: 12px;\n  left: 0;\n  line-height: 1.3;\n  max-width: 240px;\n  padding: 2px 6px;\n  top: 0;\n  /* Edge does not support overflow-wrap */\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  ", ";\n"], backgroundColor, borderRadius, textColor, truncate); // The inline-block here is needed to keep the tooltip appearing in the correct position
// when nested inside a wider parent (see position: relative example).

export var Target = styled.div.withConfig({
  displayName: "styled__Target",
  componentId: "fadon5-2"
})(["\n  display: inline-block;\n"]);