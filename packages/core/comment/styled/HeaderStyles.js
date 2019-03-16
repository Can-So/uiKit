import styled from 'styled-components';
import { colors, gridSize } from '@atlaskit/theme';
var ThemeColor = {
  Restricted: {
    text: colors.N100A
  }
};
export var BulletSpacer = styled.span.withConfig({
  displayName: "HeaderStyles__BulletSpacer",
  componentId: "sc-1x5yo10-0"
})(["\n  padding-right: ", "px;\n"], gridSize() / 2);
export var Restricted = styled.div.withConfig({
  displayName: "HeaderStyles__Restricted",
  componentId: "sc-1x5yo10-1"
})(["\n  color: ", ";\n  display: flex;\n"], ThemeColor.Restricted.text);
export var RestrictedIconWrapper = styled.span.withConfig({
  displayName: "HeaderStyles__RestrictedIconWrapper",
  componentId: "sc-1x5yo10-2"
})(["\n  margin-right: ", "px;\n"], gridSize() / 2);
RestrictedIconWrapper.displayName = 'RestrictedIconWrapper';
export var TopItem = styled.div.withConfig({
  displayName: "HeaderStyles__TopItem",
  componentId: "sc-1x5yo10-3"
})(["\n  display: inline-block;\n  margin-left: ", "px;\n\n  [dir='rtl'] & {\n    margin-left: 0;\n    margin-right: ", "px;\n  }\n\n  &:first-child {\n    margin-left: 0;\n\n    [dir='rtl'] & {\n      margin-right: 0;\n    }\n  }\n"], gridSize(), gridSize());
export var TopItemsContainer = styled.div.withConfig({
  displayName: "HeaderStyles__TopItemsContainer",
  componentId: "sc-1x5yo10-4"
})(["\n  display: flex;\n"]);