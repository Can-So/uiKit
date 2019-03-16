import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { itemThemeNamespace } from '@atlaskit/item';
import { gridSize, math, colors } from '@atlaskit/theme';
var dropdownPadding = {
  bottom: 1,
  left: math.multiply(gridSize, 1.5),
  right: math.multiply(gridSize, 1.5),
  top: 1
}; // Override specific parts of droplist's item theme

var avatarItemTheme = {
  borderRadius: '0px',
  default: {
    background: colors.backgroundOnLayer,
    text: colors.N900
  },
  active: {
    text: colors.N900,
    background: colors.backgroundActive
  },
  padding: {
    default: dropdownPadding,
    compact: dropdownPadding
  }
};
export default _defineProperty({}, itemThemeNamespace, avatarItemTheme);