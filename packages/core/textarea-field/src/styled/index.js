// @flow

import styled, { css } from 'styled-components';
import {
  gridSize,
  codeFontFamily,
  colors,
  fontSize,
  themed,
} from '@atlaskit/theme';
import {
  getBackgroundColor,
  getBackgroundColorFocus,
  getBackgroundColorHover,
  getBorderColor,
  getBorderColorFocus,
} from '../theme';

const borderRadius = '3px';
const borderWidth = 2;
const grid = gridSize();
const lineHeightBase = grid * 2.5;
const lineHeightCompact = grid * 2;
const heightBase = grid * 5;
const heightCompact = grid * 4;
const horizontalPadding = grid;
const innerHeight = grid * 3;
const transitionDuration = '0.2s';

const getBorderStyle = props =>
  props.appearance === 'none' ? 'none' : 'solid';

const getLineHeight = props => {
  const currentLineHeight = props.compact ? lineHeightCompact : lineHeightBase;
  return currentLineHeight / fontSize();
};

export const Wrapper = styled.div`
  flex: 1 1 100%;
`;

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
  color: ${colors.placeholderText};
`;

// Safari puts on some difficult to remove styles, mainly for disabled inputs
// but we want full control so need to override them in all cases
const overrideSafariDisabledStyles = `
  -webkit-text-fill-color: unset;
  -webkit-opacity: 1;
`;

const getBorderAndPadding = ({ paddingDisabled, compact }) => {
  const height = compact ? heightCompact : heightBase;

  const padding = paddingDisabled
    ? `0`
    : `${(height - 2 * borderWidth - innerHeight) / 2}px ${horizontalPadding -
        borderWidth}px`;

  return css`
    border-width: ${borderWidth}px;
    padding: ${padding};
  `;
};

const getDisabledColor = themed({ light: colors.N70, dark: colors.DN90 });

const getDisabledState = props =>
  props.disabled &&
  css`
    color: ${getDisabledColor(props)};
    pointer-events: none;
  `;

const getHoverState = props => {
  if (props.readOnly || props.isFocused || props.none) return null;

  return css`
    &:hover {
      background-color: ${getBackgroundColorHover(props)};
    }
  `;
};

const getMinimumRowsHeight = ({ minimumRows }) =>
  `min-height: ${20 * minimumRows}px;`;

const getResizeStyles = ({ enableResize }) => {
  if (!enableResize) {
    return `resize: none;`;
  }
  if (enableResize === 'horizontal') {
    return `resize: horizontal;`;
  }
  if (enableResize === 'vertical') {
    return `resize: vertical;`;
  }
  return null;
};

const getColor = themed({ light: colors.N900, dark: colors.DN600 });

export const TextAreaWrapper = styled.div`
  align-items: center;
  background-color: ${props =>
    props.isFocused
      ? getBackgroundColorFocus(props)
      : getBackgroundColor(props)};
  border-color: ${props =>
    props.isFocused ? getBorderColorFocus(props) : getBorderColor(props)};
  border-radius: ${borderRadius};
  border-style: ${getBorderStyle};
  box-sizing: border-box;
  color: ${getColor};
  display: flex;
  flex: 1 0 auto;
  justify-content: space-between;
  line-height: ${getLineHeight};
  max-width: 100%;
  overflow: hidden;
  transition: background-color ${transitionDuration} ease-in-out,
    border-color ${transitionDuration} ease-in-out;
  word-wrap: break-word;
  ${getBorderAndPadding} ${getHoverState} ${getDisabledState};
  ${props => props.isDisabled && `cursor:not-allowed;`}
  font-size: ${fontSize}px;
  & > textarea {
    font-family: ${p => (p.isMonospaced ? codeFontFamily() : 'inherit')};
    font-size: inherit;
    outline: none;
    min-width: 0;
    width: 100%;
    line-height: ${20 / fontSize()};
    background: transparent;
    border: 0;
    margin: 0;
    padding: 0;
    color: inherit;
    cursor: inherit;
    [disabled] {
      ${overrideSafariDisabledStyles};
    }
    ${getMinimumRowsHeight} ${getResizeStyles}
    &::-ms-clear {
      display: none;
    }
    &:invalid {
      box-shadow: none;
    }
    ${getPlaceholderStyle(getPlaceholderColor)};
  }
`;
