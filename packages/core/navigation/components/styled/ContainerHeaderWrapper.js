import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    /* centering the icon */\n    display: flex;\n    flex-basis: auto;\n    flex-direction: column;\n    justify-content: center;\n    min-height: 0;\n    padding: 0 ", "px 0 ", "px;\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import styled from 'styled-components';
import { layout, containerTitleBottomMargin, drawerContainerHeaderAnimationSpeed, gridSize, globalItemSizes } from '../../shared-variables';
import { whenCollapsed } from '../../theme/util';
var padding = {
  top: gridSize,
  right: gridSize * 2,
  bottom: gridSize,
  left: gridSize * 2
};

var minHeight = function minHeight(props) {
  if (props.isInDrawer) {
    // the header content isn't rendered in a full-width Drawer
    return 0;
  } // the height of the container icon and the margin below it


  return "".concat(padding.bottom + padding.top + globalItemSizes.medium + containerTitleBottomMargin, "px");
};

var flexBasis = function flexBasis(props) {
  if (props.isFullWidth) {
    return 0;
  } else if (props.isInDrawer) {
    return "\n      ".concat(props.iconOffset - layout.padding.top, "px\n    ");
  }

  return 'auto';
};

var ContainerHeaderWrapper = styled.div.withConfig({
  displayName: "ContainerHeaderWrapper",
  componentId: "sc-12gbk2d-0"
})(["\n  flex-basis: ", ";\n  flex-shrink: 0;\n  min-height: ", ";\n  overflow: hidden;\n  padding: 0 ", "px 0 ", "px;\n  transition: flex-basis ", ",\n    padding ", ";\n\n  ", " > *:first-child {\n    margin-bottom: ", "px;\n  }\n"], flexBasis, minHeight, padding.right, padding.left, drawerContainerHeaderAnimationSpeed, drawerContainerHeaderAnimationSpeed, whenCollapsed(_templateObject(), gridSize, gridSize), containerTitleBottomMargin);
ContainerHeaderWrapper.displayName = 'ContainerHeaderWrapper';
export default ContainerHeaderWrapper;