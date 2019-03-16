/* eslint-disable no-mixed-operators */
import styled, { css } from 'styled-components';
import { colors, elevation } from '@atlaskit/theme';
import { thumb, track } from './theme';
var sliderThumbSize = 16;
var sliderThumbBorderThickness = 2;
var sliderLineThickness = 4;
var transitionDuration = '0.2s';
export var overallHeight = 40;
var sliderThumbStyle = css(["\n  background: ", ";\n  border: ", "px solid transparent;\n  border-radius: 50%;\n  height: ", "px;\n  width: ", "px;\n  box-sizing: border-box;\n  ", ";\n"], thumb.default.background, sliderThumbBorderThickness, sliderThumbSize, sliderThumbSize, elevation.e200);
var sliderThumbFocusedStyle = css(["\n  border-color: ", ";\n"], colors.B200);
var sliderThumbDisabledStyle = css(["\n  cursor: not-allowed;\n  box-shadow: 0 0 1px ", ";\n"], colors.N60A);
var sliderDefaultBackground = css(["\n  background: ", ";\n"], function (props) {
  return "linear-gradient(".concat(track.default.lower, ", ").concat(track.default.lower, ") 0/ ").concat(props.valuePercent, "% 100% no-repeat ").concat(track.default.upper);
});
var sliderTrackStyle = css(["\n  background: ", ";\n  border-radius: ", "px;\n  border: 0;\n  cursor: pointer;\n  height: ", "px;\n  width: 100%;\n  ", ";\n"], colors.N30A, sliderLineThickness / 2, sliderLineThickness, sliderDefaultBackground);
var sliderTrackDisabledStyle = css(["\n  background: ", ";\n  cursor: not-allowed;\n"], function (props) {
  return "linear-gradient(".concat(track.disabled.lower, ", ").concat(track.disabled.lower, ") 0/ ").concat(props.valuePercent, "% 100% no-repeat ").concat(track.disabled.upper);
});
var sliderTrackFocusedStyle = css(["\n  background: ", ";\n"], function (props) {
  return "linear-gradient(".concat(track.hover.lower, ", ").concat(track.hover.lower, ") 0/ ").concat(props.valuePercent, "% 100% no-repeat ").concat(track.hover.upper);
});
var chromeRangeInputStyle = css(["\n  &::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    margin-top: -", "px;\n    transition: border-color ", " ease-in-out;\n    ", ";\n  }\n\n  &:focus::-webkit-slider-thumb {\n    ", ";\n  }\n\n  &:disabled::-webkit-slider-thumb {\n    ", ";\n  }\n\n  &::-webkit-slider-runnable-track {\n    transition: background-color ", " ease-in-out;\n    ", ";\n  }\n\n  &:focus::-webkit-slider-runnable-track {\n    ", ";\n  }\n\n  &:active::-webkit-slider-runnable-track,\n  &:hover::-webkit-slider-runnable-track {\n    ", ";\n  }\n\n  &:disabled::-webkit-slider-runnable-track {\n    ", ";\n  }\n"], sliderThumbSize / 2 - sliderLineThickness / 2, transitionDuration, sliderThumbStyle, sliderThumbFocusedStyle, sliderThumbDisabledStyle, transitionDuration, sliderTrackStyle, sliderDefaultBackground, sliderTrackFocusedStyle, sliderTrackDisabledStyle);
var firefoxRangeInputStyle = css(["\n  &::-moz-focus-outer {\n    border: 0;\n  }\n\n  &::-moz-range-thumb {\n    transition: border-color ", " ease-in-out;\n    ", ";\n  }\n\n  &:focus::-moz-range-thumb {\n    ", ";\n  }\n\n  &:disabled::-moz-range-thumb {\n    ", ";\n  }\n\n  &::-moz-range-track {\n    transition: background-color ", " ease-in-out;\n    ", ";\n  }\n\n  &:focus::-moz-range-track {\n    ", ";\n  }\n\n  &:active::-moz-range-track,\n  &:hover::-moz-range-track {\n    ", ";\n  }\n\n  &:disabled::-moz-range-track {\n    ", ";\n  }\n"], transitionDuration, sliderThumbStyle, sliderThumbFocusedStyle, sliderThumbDisabledStyle, transitionDuration, sliderTrackStyle, sliderDefaultBackground, sliderTrackFocusedStyle, sliderTrackDisabledStyle);
var IERangeInputStyle = css(["\n  &::-ms-thumb {\n    margin-top: 0;\n    transition: border-color ", " ease-in-out;\n    ", ";\n  }\n\n  &:focus::-ms-thumb {\n    ", ";\n  }\n\n  &:disabled::-ms-thumb {\n    ", ";\n  }\n\n  &::-ms-track {\n    background: transparent;\n    border-color: transparent;\n    color: transparent;\n    cursor: pointer;\n    height: ", "px;\n    transition: background-color ", " ease-in-out;\n    width: 100%;\n  }\n\n  &::-ms-fill-lower {\n    background: ", ";\n    border-radius: ", "px;\n    border: 0;\n  }\n\n  &::-ms-fill-upper {\n    background: ", ";\n    border-radius: ", "px;\n    border: 0;\n  }\n\n  &:active::-ms-fill-lower,\n  &:hover::-ms-fill-lower {\n    background: ", ";\n  }\n\n  &:active::-ms-fill-upper,\n  &:hover::-ms-fill-upper {\n    background: ", ";\n  }\n\n  &:disabled::-ms-fill-lower {\n    background: ", ";\n  }\n\n  &:disabled::-ms-fill-upper {\n    background: ", ";\n  }\n"], transitionDuration, sliderThumbStyle, sliderThumbFocusedStyle, sliderThumbDisabledStyle, sliderLineThickness, transitionDuration, track.default.lower, sliderLineThickness / 2, track.default.upper, sliderLineThickness / 2, track.hover.lower, track.hover.upper, track.disabled.lower, track.disabled.upper);
export var rangeInputStyle = css(["\n  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */\n  background: transparent; /* Otherwise white in Chrome */\n  height: ", "px; /* Otherwise thumb will collide with previous box element */\n  width: 100%; /* Specific width is required for Firefox. */\n\n  &:focus {\n    outline: none;\n  }\n\n  &:disabled {\n    cursor: not-allowed;\n  }\n\n  ", " ", " ", ";\n"], overallHeight, chromeRangeInputStyle, firefoxRangeInputStyle, IERangeInputStyle);
export var Input = styled.input.withConfig({
  displayName: "styled__Input",
  componentId: "sc-1rhsf2v-0"
})(["\n  ", ";\n"], rangeInputStyle);
Input.displayName = 'InputRange';