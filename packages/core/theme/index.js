import { css } from 'styled-components';
import * as colors from './colors';
import * as elevation from './elevation';
import * as typography from './typography';
import * as math from './utils/math';
import getTheme from './utils/getTheme';
import themed from './utils/themed';
import AtlaskitThemeProvider from './components/AtlaskitThemeProvider';
export { colors, elevation, typography, math, getTheme, themed, AtlaskitThemeProvider };
export { default as Appearance } from './components/Appearance'; // backwards-compatible export with old Atlaskit case

export var AtlasKitThemeProvider = AtlaskitThemeProvider;
/*
  These theme values are expressed as functions so that if we decide to make
  them dependent on props in the future, it wouldn't require a significant
  refactor everywhere they are being used.
*/

export var borderRadius = function borderRadius() {
  return 3;
};
export var gridSize = function gridSize() {
  return 8;
};
export var fontSize = function fontSize() {
  return 14;
};
export var fontSizeSmall = function fontSizeSmall() {
  return 11;
};
export var fontFamily = function fontFamily() {
  return "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
};
export var codeFontFamily = function codeFontFamily() {
  return "'SFMono-Medium', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo, Consolas, Courier, monospace";
};
export var focusRing = function focusRing() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : colors.B100;
  var outlineWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : gridSize() / 4;
  return "\n  &:focus {\n    outline: none;\n    box-shadow: 0px 0px 0px ".concat(outlineWidth, "px ").concat(color, ";\n  }\n");
};
export var noFocusRing = function noFocusRing() {
  return "\n  box-shadow: none;\n";
};
export var layers = {
  card: function card() {
    return 100;
  },
  dialog: function dialog() {
    return 200;
  },
  navigation: function navigation() {
    return 300;
  },
  layer: function layer() {
    return 400;
  },
  blanket: function blanket() {
    return 500;
  },
  modal: function modal() {
    return 510;
  },
  flag: function flag() {
    return 600;
  },
  spotlight: function spotlight() {
    return 700;
  },
  tooltip: function tooltip() {
    return 800;
  }
};
export var assistive = function assistive() {
  return css(["\n  border: 0 !important;\n  clip: rect(1px, 1px, 1px, 1px) !important;\n  height: 1px !important;\n  overflow: hidden !important;\n  padding: 0 !important;\n  position: absolute !important;\n  width: 1px !important;\n  white-space: nowrap !important;\n"]);
}; // New API

export * from './components/Reset';
export { default } from './components/Theme';
export * from './hoc';
export * from './utils/createTheme';