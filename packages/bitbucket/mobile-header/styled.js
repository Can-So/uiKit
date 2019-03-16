import styled, { css, keyframes } from 'styled-components';
import { colors, gridSize as akGridSize, layers as akLayers, themed, typography } from '@atlaskit/theme';
var gridSize = akGridSize(); // @atlaskit/navigation has a specific z-index, so we need to layer the header
// components relative to that.

var navLayer = akLayers.navigation();
var layers = {
  header: navLayer - 10,
  blanket: navLayer - 5,
  slider: navLayer + 5
};
var mobileHeaderHeight = 54;

var xPositioning = function xPositioning(_ref) {
  var side = _ref.side,
      isOpen = _ref.isOpen;
  return side === 'right' ? css(["\n        right: 0;\n        transform: translateX(", ");\n      "], isOpen ? '0' : '100vw') : css(["\n        left: 0;\n        transform: translateX(", ");\n      "], isOpen ? '0' : '-100vw');
};

export var MobileNavSlider = styled.div.withConfig({
  displayName: "styled__MobileNavSlider",
  componentId: "sc-1rrdjhr-0"
})(["\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  transition: transform 0.2s ease-out;\n  z-index: ", ";\n  ", ";\n"], layers.slider, xPositioning); // make space so content below doesn't slip beneath the header
// since the content is `position: fixed`

export var MobilePageHeader = styled.header.withConfig({
  displayName: "styled__MobilePageHeader",
  componentId: "sc-1rrdjhr-1"
})(["\n  height: ", "px;\n"], mobileHeaderHeight);
export var MobilePageHeaderContent = styled.div.withConfig({
  displayName: "styled__MobilePageHeaderContent",
  componentId: "sc-1rrdjhr-2"
})(["\n  align-items: center;\n  background-color: ", ";\n  box-sizing: border-box;\n  display: flex;\n  height: ", "px;\n  padding: ", "px;\n  position: fixed;\n  top: 0;\n  width: 100%;\n  z-index: ", ";\n"], themed({
  light: colors.N20,
  dark: colors.DN10
}), mobileHeaderHeight, gridSize, layers.header);
var opacityIn = keyframes(["\n  from { opacity: 0; }\n  to { opacity: 1; }\n"]);
var opacityOut = keyframes(["\n  from { opacity: 1; }\n  to { opacity: 0; }\n"]); // @atlaskit/blanket has a z-index *higher* than @atlaskit/navigation,
// so we can't display the AK blanket underneath the navigation.

export var FakeBlanket = styled.div.withConfig({
  displayName: "styled__FakeBlanket",
  componentId: "sc-1rrdjhr-3"
})(["\n  background: ", ";\n  bottom: 0;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  z-index: ", ";\n  animation: ", " 0.2s ease-out;\n"], colors.N100A, layers.blanket, function (p) {
  return p.isOpen ? opacityIn : opacityOut;
}); // use proper h1 and header styles but for mobile we don't want a top margin

export var PageHeading = styled.h1.withConfig({
  displayName: "styled__PageHeading",
  componentId: "sc-1rrdjhr-4"
})(["\n  flex-grow: 1;\n  margin-left: ", "px;\n  ", ";\n  && {\n    margin-top: 0;\n  }\n"], gridSize, typography.h500);