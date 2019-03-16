import styled from 'styled-components';
import { colors, themed, layers } from '@atlaskit/theme';
var backgroundColor = themed({
  light: colors.N100A,
  dark: colors.DN90A
});
export var opacity = function opacity(p) {
  return p.isTinted ? 1 : 0;
};
export var pointerEvents = function pointerEvents(p) {
  return p.canClickThrough ? 'none' : 'initial';
};
export default styled.div.withConfig({
  displayName: "styled",
  componentId: "knyj0u-0"
})(["\n  background: ", ";\n  bottom: 0;\n  left: 0;\n  opacity: ", ";\n  pointer-events: ", ";\n  position: fixed;\n  right: 0;\n  top: 0;\n  transition: opacity 220ms;\n  z-index: ", ";\n"], backgroundColor, opacity, pointerEvents, layers.blanket);