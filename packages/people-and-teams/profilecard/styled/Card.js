import styled from 'styled-components';
import { borderRadius, gridSize, math, fontSizeSmall } from '@atlaskit/theme';
import { headerBgColor, headerBgColorDisabledUser, headerTextColorInactive, headerTextColor, appLabelBgColor, appLabelTextColor, labelTextColor, labelIconColor } from '../styled/constants';

var getFullNameMargin = function getFullNameMargin(props) {
  return props.noMeta ? "".concat(gridSize() * 4.5, "px 0 ").concat(gridSize() * 1.5, "px 0") : "".concat(gridSize() * 1.5, "px 0 0 0");
};

export var ProfileImage = styled.div.withConfig({
  displayName: "Card__ProfileImage",
  componentId: "gwoajk-0"
})(["\n  position: absolute;\n  top: ", "px;\n  left: ", "px;\n"], math.multiply(gridSize, 3), math.multiply(gridSize, 3));
export var ActionsFlexSpacer = styled.div.withConfig({
  displayName: "Card__ActionsFlexSpacer",
  componentId: "gwoajk-1"
})(["\n  flex: 1 0 auto;\n"]);
export var ActionButtonGroup = styled.div.withConfig({
  displayName: "Card__ActionButtonGroup",
  componentId: "gwoajk-2"
})(["\n  user-select: none;\n  margin: ", "px 0 0 0;\n  text-align: right;\n\n  button {\n    margin-left: ", "px;\n\n    &:first-child {\n      margin-left: 0;\n    }\n  }\n"], math.multiply(gridSize, 2), gridSize);
export var CardContent = styled.div.withConfig({
  displayName: "Card__CardContent",
  componentId: "gwoajk-3"
})(["\n  display: flex;\n  flex-direction: column;\n  min-height: ", "px;\n"], math.multiply(gridSize, 17));
export var DetailsGroup = styled.div.withConfig({
  displayName: "Card__DetailsGroup",
  componentId: "gwoajk-4"
})(["\n  display: flex;\n  flex-direction: column;\n  margin-left: ", "px;\n  width: ", "px;\n"], math.multiply(gridSize, 14.5), math.multiply(gridSize, 24.5));
export var DisabledInfo = styled.div.withConfig({
  displayName: "Card__DisabledInfo",
  componentId: "gwoajk-5"
})(["\n  font-size: ", "px;\n  color: ", ";\n  margin: ", "px 0 0 0;\n  line-height: ", "px;\n"], fontSizeSmall, labelTextColor, math.multiply(gridSize, 1.5), math.multiply(gridSize, 2));
export var FullNameLabel = styled.span.withConfig({
  displayName: "Card__FullNameLabel",
  componentId: "gwoajk-6"
})(["\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n\n  font-size: 18px;\n  color: ", ";\n  margin: ", ";\n  line-height: ", "em;\n"], function (props) {
  return props.isDisabledAccount ? headerTextColorInactive : headerTextColor;
}, function (props) {
  return getFullNameMargin(props);
}, math.divide(function () {
  return 24;
}, 18));
export var LozengeWrapper = styled.div.withConfig({
  displayName: "Card__LozengeWrapper",
  componentId: "gwoajk-7"
})(["\n  margin-top: ", "px;\n  text-transform: uppercase;\n  display: block;\n"], math.multiply(gridSize, 2));
export var JobTitleLabel = styled.span.withConfig({
  displayName: "Card__JobTitleLabel",
  componentId: "gwoajk-8"
})(["\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n\n  font-size: 14px;\n  color: ", ";\n  margin: 0 0 ", "px 0;\n  line-height: ", "em;\n"], headerTextColor, math.multiply(gridSize, 1.5), math.divide(function () {
  return 24;
}, 14));
export var AppTitleLabel = styled.span.withConfig({
  displayName: "Card__AppTitleLabel",
  componentId: "gwoajk-9"
})(["\n  background: ", ";\n  color: ", ";\n  border-radius: ", ";\n  padding: 0 6px;\n  width: fit-content;\n  font-weight: bold;\n  text-transform: uppercase;\n\n  font-size: 12px;\n  margin: 4px 0 ", "px 0;\n  line-height: ", "em;\n"], appLabelBgColor, appLabelTextColor, borderRadius(), math.multiply(gridSize, 1.5), math.divide(function () {
  return 24;
}, 14));
export var SpinnerContainer = styled.div.withConfig({
  displayName: "Card__SpinnerContainer",
  componentId: "gwoajk-10"
})(["\n  align-items: center;\n  display: flex;\n  height: ", "px;\n  justify-content: center;\n  position: relative;\n"], math.multiply(gridSize, 12));
export var CardContainer = styled.div.withConfig({
  displayName: "Card__CardContainer",
  componentId: "gwoajk-11"
})(["\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  background-image: linear-gradient(\n    to bottom,\n    ", "\n      0%,\n    ", "\n      100%\n  );\n  background-repeat: no-repeat;\n  background-size: 100% ", "px;\n  box-sizing: content-box;\n  padding: ", "px;\n"], function (props) {
  return props.isDisabledUser ? headerBgColorDisabledUser : headerBgColor;
}, function (props) {
  return props.isDisabledUser ? headerBgColorDisabledUser : headerBgColor;
}, math.multiply(gridSize, 12), math.multiply(gridSize, 3));
export var DetailsLabel = styled.div.withConfig({
  displayName: "Card__DetailsLabel",
  componentId: "gwoajk-12"
})(["\n  display: flex;\n  align-items: center;\n  line-height: ", "px;\n  font-size: ", "px;\n  margin: ", "px 0 0 0;\n  white-space: nowrap;\n\n  & + & {\n    margin-top: ", "px;\n  }\n"], math.multiply(gridSize, 3), math.multiply(gridSize, 1.5), math.multiply(gridSize, 2), math.multiply(gridSize, 0.25));
export var DetailsLabelIcon = styled.div.withConfig({
  displayName: "Card__DetailsLabelIcon",
  componentId: "gwoajk-13"
})(["\n  display: flex;\n  flex-shrink: 0;\n  color: ", ";\n  width: ", "px;\n  height: ", "px;\n  padding: ", "px;\n  vertical-align: top;\n\n  svg {\n    width: 100%;\n    height: 100%;\n  }\n"], labelIconColor, math.multiply(gridSize, 2), math.multiply(gridSize, 2), math.multiply(gridSize, 0.5));
export var DetailsLabelText = styled.span.withConfig({
  displayName: "Card__DetailsLabelText",
  componentId: "gwoajk-14"
})(["\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: ", ";\n  padding-left: ", "px;\n"], labelTextColor, math.multiply(gridSize, 0.5));