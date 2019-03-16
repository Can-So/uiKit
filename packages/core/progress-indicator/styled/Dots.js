import styled, { css } from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
var colorMap = {
  default: themed({
    light: colors.N50,
    dark: colors.DN70
  }),
  help: themed({
    light: colors.P75,
    dark: colors.DN70
  }),
  inverted: themed({
    light: 'rgba(255, 255, 255, 0.4)',
    dark: colors.DN300A
  }),
  primary: themed({
    light: colors.B75,
    dark: colors.DN70
  })
};
var selectedColorMap = {
  default: themed({
    light: colors.N900,
    dark: colors.DN600
  }),
  help: themed({
    light: colors.P400,
    dark: colors.P300
  }),
  inverted: themed({
    light: colors.N0,
    dark: colors.DN30
  }),
  primary: themed({
    light: colors.B400,
    dark: colors.B100
  })
};
var outlineColorMap = {
  default: themed({
    light: colors.B75,
    dark: colors.B200
  }),
  help: themed({
    light: colors.P75,
    dark: colors.P75
  }),
  inverted: themed({
    light: colors.B200,
    dark: colors.B75
  }),
  primary: themed({
    light: colors.B75,
    dark: colors.B75
  })
};
var sizes = {
  small: 4,
  default: 8,
  large: 12
};
var spacingDivision = {
  comfortable: 2,
  cozy: 4,
  compact: 8
};

var getDimensions = function getDimensions(_ref) {
  var gutter = _ref.gutter,
      size = _ref.size;
  var val = sizes[size];
  var margin = val / spacingDivision[gutter];
  var hitslop = val + margin * 2;
  return css(["\n    height: ", "px;\n    margin-left: ", "px;\n    margin-right: ", "px;\n    position: relative;\n    width: ", "px;\n\n    &::before {\n      content: '';\n      display: block;\n      height: ", "px;\n      left: -", "px;\n      position: absolute;\n      top: -", "px;\n      width: ", "px;\n    }\n  "], val, margin, margin, val, hitslop, margin, margin, hitslop);
};

var getColor = function getColor(_ref2) {
  var appearance = _ref2.appearance,
      selected = _ref2.selected;
  return selected ? selectedColorMap[appearance] : colorMap[appearance];
};

var commonRules = css(["\n  ", " background-color: ", ";\n  border-radius: 50%;\n"], getDimensions, getColor);
export var Container = styled.div.withConfig({
  displayName: "Dots__Container",
  componentId: "sc-1x5g4vn-0"
})(["\n  display: flex;\n  justify-content: center;\n"]);
export var IndicatorButton = styled.button.withConfig({
  displayName: "Dots__IndicatorButton",
  componentId: "sc-1x5g4vn-1"
})(["\n  ", " border: 0;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n\n  ", ";\n"], commonRules, function (p) {
  return p.selected ? css(["\n          &:focus {\n            box-shadow: 0 0 0 2px ", ";\n          }\n        "], outlineColorMap[p.appearance]) : null;
});
export var IndicatorDiv = styled.div.withConfig({
  displayName: "Dots__IndicatorDiv",
  componentId: "sc-1x5g4vn-2"
})(["\n  ", ";\n"], commonRules);