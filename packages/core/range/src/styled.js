// @flow
/* eslint-disable no-mixed-operators */
import styled, { css } from 'styled-components';
import { elevation } from '@atlaskit/theme';

const sliderThumbSize = 16;
const sliderThumbBorderThickness = 2;
const sliderLineThickness = 4;
const transitionDuration = '0.2s';
export const overallHeight = 40;

const getBackgroundGradient = ({ lower, upper }, percent) =>
  css`
    background: linear-gradient(${lower}, ${lower}) 0 / ${percent}% 100%
      no-repeat ${upper};
    [dir='rtl'] & {
      background-position: right;
    }
  `;

const sliderThumbStyle = css`
  background: ${({ thumb }) => thumb.default.background};
  border: ${sliderThumbBorderThickness}px solid transparent;
  border-radius: 50%;
  height: ${sliderThumbSize}px;
  width: ${sliderThumbSize}px;
  box-sizing: border-box;
  ${elevation.e200};
`;

const sliderThumbFocusedStyle = css`
  border-color: ${({ thumb }) => thumb.focus.border};
`;

const sliderThumbDisabledStyle = css`
  cursor: not-allowed;
  box-shadow: 0 0 1px ${({ thumb }) => thumb.disabled.boxShadow};
`;

const sliderDefaultBackground = props =>
  getBackgroundGradient(props.track.default, props.valuePercent);

const sliderTrackStyle = css`
  background: ${({ track }) => track.background};
  border-radius: ${sliderLineThickness / 2}px;
  border: 0;
  cursor: pointer;
  height: ${sliderLineThickness}px;
  width: 100%;
  ${sliderDefaultBackground};
`;

const sliderTrackDisabledStyle = css`
  ${props =>
    getBackgroundGradient(
      props.track.disabled,
      props.valuePercent,
    )}
  cursor: not-allowed;
`;

const sliderTrackFocusedStyle = props =>
  getBackgroundGradient(props.track.hover, props.valuePercent);

const chromeRangeInputStyle = css`
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    margin-top: -${sliderThumbSize / 2 - sliderLineThickness / 2}px;
    transition: border-color ${transitionDuration} ease-in-out;
    ${sliderThumbStyle};
  }

  &:focus::-webkit-slider-thumb {
    ${sliderThumbFocusedStyle};
  }

  &:disabled::-webkit-slider-thumb {
    ${sliderThumbDisabledStyle};
  }

  &::-webkit-slider-runnable-track {
    transition: background-color ${transitionDuration} ease-in-out;
    ${sliderTrackStyle};
  }

  &:focus::-webkit-slider-runnable-track {
    ${sliderDefaultBackground};
  }

  &:active::-webkit-slider-runnable-track,
  &:hover::-webkit-slider-runnable-track {
    ${sliderTrackFocusedStyle};
  }

  &:disabled::-webkit-slider-runnable-track {
    ${sliderTrackDisabledStyle};
  }
`;

const firefoxRangeInputStyle = css`
  &::-moz-focus-outer {
    border: 0;
  }

  &::-moz-range-thumb {
    transition: border-color ${transitionDuration} ease-in-out;
    ${sliderThumbStyle};
  }

  &:focus::-moz-range-thumb {
    ${sliderThumbFocusedStyle};
  }

  &:disabled::-moz-range-thumb {
    ${sliderThumbDisabledStyle};
  }

  &::-moz-range-track {
    transition: background-color ${transitionDuration} ease-in-out;
    ${sliderTrackStyle};
  }

  &:focus::-moz-range-track {
    ${sliderDefaultBackground};
  }

  &:active::-moz-range-track,
  &:hover::-moz-range-track {
    ${sliderTrackFocusedStyle};
  }

  &:disabled::-moz-range-track {
    ${sliderTrackDisabledStyle};
  }
`;

const IERangeInputStyle = css`
  &::-ms-thumb {
    margin-top: 0;
    transition: border-color ${transitionDuration} ease-in-out;
    ${sliderThumbStyle};
  }

  &:focus::-ms-thumb {
    ${sliderThumbFocusedStyle};
  }

  &:disabled::-ms-thumb {
    ${sliderThumbDisabledStyle};
  }

  &::-ms-track {
    background: transparent;
    border-color: transparent;
    color: transparent;
    cursor: pointer;
    height: ${sliderLineThickness}px;
    transition: background-color ${transitionDuration} ease-in-out;
    width: 100%;
  }

  &::-ms-fill-lower {
    background: ${({ track }) => track.default.lower};
    border-radius: ${sliderLineThickness / 2}px;
    border: 0;
  }

  &::-ms-fill-upper {
    background: ${({ track }) => track.default.upper};
    border-radius: ${sliderLineThickness / 2}px;
    border: 0;
  }

  &:active::-ms-fill-lower,
  &:hover::-ms-fill-lower {
    background: ${({ track }) => track.hover.lower};
  }

  &:active::-ms-fill-upper,
  &:hover::-ms-fill-upper {
    background: ${({ track }) => track.hover.upper};
  }

  &:disabled::-ms-fill-lower {
    background: ${({ track }) => track.disabled.lower};
  }

  &:disabled::-ms-fill-upper {
    background: ${({ track }) => track.disabled.upper};
  }
`;

export const rangeInputStyle = css`
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  background: transparent; /* Otherwise white in Chrome */
  height: ${overallHeight}px; /* Otherwise thumb will collide with previous box element */
  width: 100%; /* Specific width is required for Firefox. */

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${chromeRangeInputStyle} ${firefoxRangeInputStyle} ${IERangeInputStyle};
  background-position: right;
`;

export const Input = styled.input`
  ${rangeInputStyle};
`;

Input.displayName = 'InputRange';
