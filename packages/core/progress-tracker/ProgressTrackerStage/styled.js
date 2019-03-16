import { colors, gridSize, fontSize } from '@atlaskit/theme';
import styled from 'styled-components';
import { spacing } from '../constants';
var halfGridSize = gridSize() / 2;
var progressBarHeight = gridSize();
var labelTopSpacing = gridSize() + 20; // Labels sit 20px from bottom of progress bar.

export var ProgressTrackerStageContainer = styled.div.withConfig({
  displayName: "styled__ProgressTrackerStageContainer",
  componentId: "rdxa52-0"
})(["\n  position: relative;\n  width: 100%;\n"]);
export var ProgressTrackerStageMarker = styled.div.withConfig({
  displayName: "styled__ProgressTrackerStageMarker",
  componentId: "rdxa52-1"
})(["\n  position: absolute;\n  left: 50%;\n  transform: translate(-50%, -", "px);\n  background-color: ", ";\n  height: ", "px;\n  width: ", "px;\n  border-radius: ", "px;\n\n  &.fade-appear {\n    opacity: 0.01;\n  }\n\n  &.fade-appear.fade-appear-active {\n    opacity: 1;\n    transition: opacity ", "ms\n      ", ";\n    transition-delay: ", "ms;\n  }\n\n  &.fade-enter {\n    background-color: ", ";\n  }\n\n  &.fade-enter.fade-enter-active {\n    background-color: ", ";\n    transition: background-color ", "ms\n      ", ";\n    transition-delay: ", "ms;\n  }\n"], labelTopSpacing, function (props) {
  return props.color;
}, progressBarHeight, progressBarHeight, progressBarHeight, function (props) {
  return props.transitionSpeed;
}, function (props) {
  return props.transitionEasing;
}, function (props) {
  return props.transitionDelay;
}, function (props) {
  return props.oldMarkerColor;
}, function (props) {
  return props.color;
}, function (props) {
  return props.transitionSpeed;
}, function (props) {
  return props.transitionEasing;
}, function (props) {
  return props.transitionDelay;
});
export var ProgressTrackerStageBar = styled.div.withConfig({
  displayName: "styled__ProgressTrackerStageBar",
  componentId: "rdxa52-2"
})(["\n  position: absolute;\n  left: 50%;\n  transform: translate(0, -", "px);\n  background-color: ", ";\n  height: ", "px;\n  width: calc(\n    ", "% + ", " /\n      100 * ", "px\n  ); /* account for spacing and radius of marker */\n  border-top-right-radius: ", "px;\n  border-bottom-right-radius: ", "px;\n\n  &.fade-appear {\n    width: calc(\n      ", "% +\n        ", " / 100 *\n        ", "px\n    ); /* account for spacing and radius of marker */\n  }\n\n  &.fade-appear.fade-appear-active {\n    width: calc(\n      ", "% +\n        ", " / 100 *\n        ", "px\n    ); /* account for spacing and radius of marker */\n    transition: width ", "ms\n      ", ";\n    transition-delay: ", "ms;\n  }\n\n  &.fade-enter {\n    width: calc(\n      ", "% +\n        ", " / 100 *\n        ", "px\n    ); /* account for spacing and radius of marker */\n  }\n\n  &.fade-enter.fade-enter-active {\n    width: calc(\n      ", "% +\n        ", " / 100 *\n        ", "px\n    ); /* account for spacing and radius of marker */\n    transition: width ", "ms\n      ", ";\n    transition-delay: ", "ms;\n  }\n"], labelTopSpacing, colors.B300, progressBarHeight, function (props) {
  return props.percentageComplete;
}, function (props) {
  return props.percentageComplete;
}, function (props) {
  return halfGridSize + spacing[props.theme.spacing];
}, gridSize, gridSize, function (props) {
  return props.oldPercentageComplete;
}, function (props) {
  return props.oldPercentageComplete;
}, function (props) {
  return halfGridSize + spacing[props.theme.spacing];
}, function (props) {
  return props.percentageComplete;
}, function (props) {
  return props.percentageComplete;
}, function (props) {
  return halfGridSize + spacing[props.theme.spacing];
}, function (props) {
  return props.transitionSpeed;
}, function (props) {
  return props.transitionEasing;
}, function (props) {
  return props.transitionDelay;
}, function (props) {
  return props.oldPercentageComplete;
}, function (props) {
  return props.oldPercentageComplete;
}, function (props) {
  return halfGridSize + spacing[props.theme.spacing];
}, function (props) {
  return props.percentageComplete;
}, function (props) {
  return props.percentageComplete;
}, function (props) {
  return halfGridSize + spacing[props.theme.spacing];
}, function (props) {
  return props.transitionSpeed;
}, function (props) {
  return props.transitionEasing;
}, function (props) {
  return props.transitionDelay;
});
export var ProgressTrackerStageTitle = styled.div.withConfig({
  displayName: "styled__ProgressTrackerStageTitle",
  componentId: "rdxa52-3"
})(["\n  font-weight: ", ";\n  line-height: 16px;\n  color: ", ";\n  text-align: center;\n  font-size: ", "px;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: ", "px;\n\n  &.fade-appear {\n    opacity: 0.01;\n  }\n\n  &.fade-appear.fade-appear-active {\n    opacity: 1;\n    transition: opacity ", "ms\n      cubic-bezier(0.2, 0, 0, 1);\n  }\n"], function (props) {
  return props.fontweight;
}, function (props) {
  return props.color;
}, fontSize, labelTopSpacing, function (props) {
  return props.transitionSpeed;
});