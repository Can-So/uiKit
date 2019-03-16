import styled from 'styled-components';
import { colors, layers, themed } from '@atlaskit/theme'; // NOTE:
// we can't use @atlaskit/blanket
// because it has to sit on top of other layered elements (i.e. Modal).

var backgroundColor = themed({
  light: colors.N100A,
  dark: colors.DN90A
}); // IE11 and Edge: z-index needed because fixed position calculates z-index relative
// to body insteadof nearest stacking context (Portal in our case).

export default styled.div.withConfig({
  displayName: "Blanket",
  componentId: "sc-1dkw473-0"
})(["\n  background: ", ";\n  bottom: 0;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  transition: opacity 220ms;\n  z-index: ", ";\n"], function (p) {
  return p.isTinted ? backgroundColor : 'transparent';
}, layers.spotlight);