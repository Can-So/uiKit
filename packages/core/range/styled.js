/* eslint-disable no-mixed-operators */
import styled, { css } from 'styled-components';
import { elevation } from '@atlaskit/theme';
var sliderThumbSize = 16;
var sliderThumbBorderThickness = 2;
var sliderLineThickness = 4;
var transitionDuration = '0.2s';
export var overallHeight = 40;

var getBackgroundGradient = function getBackgroundGradient(_ref, percent) {
  var lower = _ref.lower,
      upper = _ref.upper;
  return css(["\n    background: linear-gradient(", ", ", ") 0 / ", "% 100%\n      no-repeat ", ";\n    [dir='rtl'] & {\n      background-position: right;\n    }\n  "], lower, lower, percent, upper);
};

var sliderThumbStyle = css(["\n  background: ", ";\n  border: ", "px solid transparent;\n  border-radius: 50%;\n  height: ", "px;\n  width: ", "px;\n  box-sizing: border-box;\n  ", ";\n"], function (_ref2) {
  var thumb = _ref2.thumb;
  return thumb.default.background;
}, sliderThumbBorderThickness, sliderThumbSize, sliderThumbSize, elevation.e200);
var sliderThumbFocusedStyle = css(["\n  border-color: ", ";\n"], function (_ref3) {
  var thumb = _ref3.thumb;
  return thumb.focus.border;
});
var sliderThumbDisabledStyle = css(["\n  cursor: not-allowed;\n  box-shadow: 0 0 1px ", ";\n"], function (_ref4) {
  var thumb = _ref4.thumb;
  return thumb.disabled.boxShadow;
});

var sliderDefaultBackground = function sliderDefaultBackground(props) {
  return getBackgroundGradient(props.track.default, props.valuePercent);
};

var sliderTrackStyle = css(["\n  background: ", ";\n  border-radius: ", "px;\n  border: 0;\n  cursor: pointer;\n  height: ", "px;\n  width: 100%;\n  ", ";\n"], function (_ref5) {
  var track = _ref5.track;
  return track.background;
}, sliderLineThickness / 2, sliderLineThickness, sliderDefaultBackground);
var sliderTrackDisabledStyle = css(["\n  ", "\n  cursor: not-allowed;\n"], function (props) {
  return getBackgroundGradient(props.track.disabled, props.valuePercent);
});

var sliderTrackFocusedStyle = function sliderTrackFocusedStyle(props) {
  return getBackgroundGradient(props.track.hover, props.valuePercent);
};

var chromeRangeInputStyle = css(["\n  &::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    margin-top: -", "px;\n    transition: border-color ", " ease-in-out;\n    ", ";\n  }\n\n  &:focus::-webkit-slider-thumb {\n    ", ";\n  }\n\n  &:disabled::-webkit-slider-thumb {\n    ", ";\n  }\n\n  &::-webkit-slider-runnable-track {\n    transition: background-color ", " ease-in-out;\n    ", ";\n  }\n\n  &:focus::-webkit-slider-runnable-track {\n    ", ";\n  }\n\n  &:active::-webkit-slider-runnable-track,\n  &:hover::-webkit-slider-runnable-track {\n    ", ";\n  }\n\n  &:disabled::-webkit-slider-runnable-track {\n    ", ";\n  }\n"], sliderThumbSize / 2 - sliderLineThickness / 2, transitionDuration, sliderThumbStyle, sliderThumbFocusedStyle, sliderThumbDisabledStyle, transitionDuration, sliderTrackStyle, sliderDefaultBackground, sliderTrackFocusedStyle, sliderTrackDisabledStyle);
var firefoxRangeInputStyle = css(["\n  &::-moz-focus-outer {\n    border: 0;\n  }\n\n  &::-moz-range-thumb {\n    transition: border-color ", " ease-in-out;\n    ", ";\n  }\n\n  &:focus::-moz-range-thumb {\n    ", ";\n  }\n\n  &:disabled::-moz-range-thumb {\n    ", ";\n  }\n\n  &::-moz-range-track {\n    transition: background-color ", " ease-in-out;\n    ", ";\n  }\n\n  &:focus::-moz-range-track {\n    ", ";\n  }\n\n  &:active::-moz-range-track,\n  &:hover::-moz-range-track {\n    ", ";\n  }\n\n  &:disabled::-moz-range-track {\n    ", ";\n  }\n"], transitionDuration, sliderThumbStyle, sliderThumbFocusedStyle, sliderThumbDisabledStyle, transitionDuration, sliderTrackStyle, sliderDefaultBackground, sliderTrackFocusedStyle, sliderTrackDisabledStyle);
var IERangeInputStyle = css(["\n  &::-ms-thumb {\n    margin-top: 0;\n    transition: border-color ", " ease-in-out;\n    ", ";\n  }\n\n  &:focus::-ms-thumb {\n    ", ";\n  }\n\n  &:disabled::-ms-thumb {\n    ", ";\n  }\n\n  &::-ms-track {\n    background: transparent;\n    border-color: transparent;\n    color: transparent;\n    cursor: pointer;\n    height: ", "px;\n    transition: background-color ", " ease-in-out;\n    width: 100%;\n  }\n\n  &::-ms-fill-lower {\n    background: ", ";\n    border-radius: ", "px;\n    border: 0;\n  }\n\n  &::-ms-fill-upper {\n    background: ", ";\n    border-radius: ", "px;\n    border: 0;\n  }\n\n  &:active::-ms-fill-lower,\n  &:hover::-ms-fill-lower {\n    background: ", ";\n  }\n\n  &:active::-ms-fill-upper,\n  &:hover::-ms-fill-upper {\n    background: ", ";\n  }\n\n  &:disabled::-ms-fill-lower {\n    background: ", ";\n  }\n\n  &:disabled::-ms-fill-upper {\n    background: ", ";\n  }\n"], transitionDuration, sliderThumbStyle, sliderThumbFocusedStyle, sliderThumbDisabledStyle, sliderLineThickness, transitionDuration, function (_ref6) {
  var track = _ref6.track;
  return track.default.lower;
}, sliderLineThickness / 2, function (_ref7) {
  var track = _ref7.track;
  return track.default.upper;
}, sliderLineThickness / 2, function (_ref8) {
  var track = _ref8.track;
  return track.hover.lower;
}, function (_ref9) {
  var track = _ref9.track;
  return track.hover.upper;
}, function (_ref10) {
  var track = _ref10.track;
  return track.disabled.lower;
}, function (_ref11) {
  var track = _ref11.track;
  return track.disabled.upper;
});
export var rangeInputStyle = css(["\n  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */\n  background: transparent; /* Otherwise white in Chrome */\n  height: ", "px; /* Otherwise thumb will collide with previous box element */\n  padding: 0; /* IE11 includes padding, this normalises it */\n  width: 100%; /* Specific width is required for Firefox. */\n\n  &:focus {\n    outline: none;\n  }\n\n  &:disabled {\n    cursor: not-allowed;\n  }\n\n  ", " ", " ", ";\n  background-position: right;\n"], overallHeight, chromeRangeInputStyle, firefoxRangeInputStyle, IERangeInputStyle);
export var Input = styled.input.withConfig({
  displayName: "styled__Input",
  componentId: "sc-1iquyl1-0"
})(["\n  ", ";\n"], rangeInputStyle);
Input.displayName = 'InputRange';