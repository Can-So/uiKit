import styled, { css } from 'styled-components';
import { borderRadius, colors, themed, layers } from '@atlaskit/theme';
import { WIDTH_ENUM, gutter } from '../shared-variables';
import { flexMaxHeightIEFix, IEMaxHeightCalcPx } from '../utils/flex-max-height-ie-fix';

var boxShadow = function boxShadow(_ref) {
  var isChromeless = _ref.isChromeless;
  return isChromeless ? 'none' : "\n    0 0 0 1px ".concat(colors.N30A, ", 0 2px 1px ").concat(colors.N30A, ",\n    0 0 20px -6px ").concat(colors.N60A, "\n  ");
};

var dialogBgColor = function dialogBgColor(_ref2) {
  var isChromeless = _ref2.isChromeless;
  return isChromeless ? 'transparent' : themed({
    light: colors.N0,
    dark: colors.DN50
  });
};

var maxDimensions = "calc(100% - ".concat(gutter * 2, "px)");
var maxHeightDimensions = "calc(100% - ".concat(gutter * 2 - IEMaxHeightCalcPx, "px)");
export var dialogWidth = function dialogWidth(_ref3) {
  var widthName = _ref3.widthName,
      widthValue = _ref3.widthValue;

  if (typeof widthValue === 'number') {
    return "".concat(widthValue, "px");
  }

  return widthName ? "".concat(WIDTH_ENUM.widths[widthName], "px") : widthValue || 'auto';
};
export var dialogHeight = function dialogHeight(_ref4) {
  var heightValue = _ref4.heightValue;

  if (typeof heightValue === 'number') {
    return "".concat(heightValue, "px");
  }

  return heightValue || 'auto';
};
/**
  NOTE:
  z-index
  - temporarily added to beat @atlaskit/navigation

  absolute + top
  - rather than fixed position so popper.js children are properly positioned

  overflow-y
  - only active when popper.js children envoked below the dialog
*/

export var FillScreen = styled.div.withConfig({
  displayName: "Modal__FillScreen",
  componentId: "sc-1jmnqyd-0"
})(["\n  height: 100vh;\n  left: 0;\n  overflow-y: auto;\n  position: absolute;\n  top: ", "px;\n  width: 100%;\n  z-index: ", ";\n  -webkit-overflow-scrolling: touch;\n"], function (p) {
  return p.scrollDistance;
}, layers.modal);
export var PositionerAbsolute = styled.div.withConfig({
  displayName: "Modal__PositionerAbsolute",
  componentId: "sc-1jmnqyd-1"
})(["\n  display: flex;\n  flex-direction: column;\n  height: ", ";\n  left: 0;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: ", ";\n  position: absolute;\n  right: 0;\n  top: ", "px;\n  width: ", ";\n  z-index: ", ";\n  pointer-events: none;\n\n  @media (min-width: 320px) and (max-width: 480px) {\n    height: 100%;\n    left: 0;\n    position: fixed;\n    top: 0;\n    max-width: 100%;\n    width: 100%;\n  }\n"], maxHeightDimensions, maxDimensions, gutter, dialogWidth, layers.modal);
export var PositionerRelative = styled.div.withConfig({
  displayName: "Modal__PositionerRelative",
  componentId: "sc-1jmnqyd-2"
})(["\n  margin: ", "px auto;\n  position: relative;\n  width: ", ";\n  z-index: ", ";\n  pointer-events: none;\n\n  @media (min-width: 320px) and (max-width: 480px) {\n    height: 100%;\n    left: 0;\n    position: fixed;\n    top: 0;\n    margin: 0;\n    max-width: 100%;\n    width: 100%;\n  }\n"], gutter, dialogWidth, layers.modal);
export var Dialog = styled.div.withConfig({
  displayName: "Modal__Dialog",
  componentId: "sc-1jmnqyd-3"
})(["\n  ", " color: ", ";\n  display: flex;\n  flex-direction: column;\n  height: ", ";\n  ", ";\n  outline: 0;\n  pointer-events: auto;\n\n  @media (min-width: 320px) and (max-width: 480px) {\n    height: 100%;\n    max-height: 100%;\n    border-radius: 0;\n  }\n"], function (p) {
  return p.isChromeless ? null : css(["\n          background-color: ", ";\n          border-radius: ", "px;\n          box-shadow: ", ";\n        "], dialogBgColor, borderRadius, boxShadow);
}, colors.text, dialogHeight, flexMaxHeightIEFix);
PositionerAbsolute.displayName = 'PositionerAbsolute';
Dialog.displayName = 'Dialog';
FillScreen.displayName = 'FillScreen';
PositionerRelative.displayName = 'PositionerRelative';