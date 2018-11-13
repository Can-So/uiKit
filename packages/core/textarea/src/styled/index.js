// @flow

import styled, { css } from 'styled-components';
import { codeFontFamily, fontSize, gridSize } from '@atlaskit/theme';

const grid = gridSize();
const borderRadius = '3px';
const borderWidth = 2;
const lineHeightBase = grid * 2.5;
const lineHeightCompact = grid * 2;
const getLineHeight = ({ isCompact }) =>
  isCompact ? lineHeightBase : lineHeightCompact;
const getVerticalPadding = ({ isCompact }) => (isCompact ? 2 : 6);
const horizontalPadding = grid;
const transitionDuration = '0.2s';

const getBorderStyle = props =>
  props.appearance === 'none' ? 'none;' : 'solid;';

const getPlaceholderStyle = style => css`
  &::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    ${style};
  }
  &::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    ${style} opacity: 1;
  }
  &::-ms-input-placeholder {
    /* Microsoft Edge */
    ${style};
  }
  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    ${style} opacity: 1;
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    ${style};
  }
`;

const getPlaceholderColor = css`
  color: ${props => props.placeholderTextColor};
`;

// Safari puts on some difficult to remove styles, mainly for disabled inputs
// but we want full control so need to override them in all cases
const overrideSafariDisabledStyles = `
  -webkit-text-fill-color: unset;
  -webkit-opacity: 1;
`;

const getBorderAndPadding = () => {
  return css`
    border-width: ${borderWidth}px;
    padding: ${getVerticalPadding}px ${horizontalPadding - borderWidth}px;
  `;
};

const getDisabledState = props =>
  props.disabled &&
  css`
    color: ${props.disabledTextColor};
    pointer-events: none;
  `;

const getHoverState = props => {
  if (props.readOnly || props.isFocused || props.none) return null;

  return css`
    &:hover {
      background-color: ${props.backgroundColorHover};
    }
  `;
};

const getMinimumRowsHeight = ({ minimumRows, isCompact }) => {
  const lineHeight = getLineHeight({ isCompact });
  return `min-height: ${lineHeight * minimumRows}px;`;
};

const getResizeStyles = ({ resize }) => {
  if (resize === 'auto') {
    return `resize: auto;`;
  }
  if (resize === 'horizontal') {
    return `resize: horizontal;`;
  }
  if (resize === 'vertical') {
    return `resize: vertical;`;
  }
  return `resize: none;`;
};

export const TextAreaWrapper = styled.div`
  flex: 1 1 100%;
  position: relative;
  background-color: ${props =>
    props.isFocused ? props.backgroundColorFocus : props.backgroundColor};
  border-color: ${props =>
    props.isFocused ? props.borderColorFocus : props.borderColor};
  border-radius: ${borderRadius};
  border-style: ${getBorderStyle};
  box-sizing: border-box;
  line-height: ${getLineHeight};
  overflow: hidden;
  transition: background-color ${transitionDuration} ease-in-out,
    border-color ${transitionDuration} ease-in-out;
  word-wrap: break-word;
  ${getBorderAndPadding}
  ${getHoverState}
  ${getDisabledState}
  ${props => props.isDisabled && `cursor: not-allowed;`}
  padding-right: 0;
  font-size: ${fontSize}px;
  max-width: 100%;
  ${getResizeStyles}
  & textarea {
    display:block;
    padding-right: 6px;
    resize: none;
    background: transparent;
    padding: 0;
    margin: 0;
    border: 0;
    box-sizing: border-box;
    color: ${props => props.textColor};
    cursor: inherit;
    font-family: ${props =>
      props.isMonospaced ? codeFontFamily() : 'inherit'};
    font-size: inherit;
    line-height: ${({ isCompact }) =>
      getLineHeight({ isCompact }) / fontSize()};
    min-width: 0;
    outline: none;
    max-width: 100%;
    width: 100%;
    ${getPlaceholderStyle(getPlaceholderColor)};
    ${getMinimumRowsHeight}

    [disabled] {
      ${overrideSafariDisabledStyles};
    }
    &::-ms-clear {
      display: none;
    }

    &:invalid {
      box-shadow: none;
    }
  }
`;
