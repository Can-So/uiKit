// @flow

import styled, { css } from 'styled-components';
import { codeFontFamily, fontSize } from '@atlaskit/theme';

const getBorderStyle = props =>
  props.appearance === 'none' ? 'none' : 'solid';

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

const getBorderAndPadding = ({
  borderWidth,
  baseHeight,
  horizontalPadding,
  innerHeight,
}) => {
  const padding = `${(baseHeight - 2 * borderWidth - innerHeight) /
    2}px ${horizontalPadding - borderWidth}px`;

  return css`
    border-width: ${borderWidth}px;
    padding: ${padding};
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

const getMinimumRowsHeight = ({ minimumRows }) => {
  return `min-height: ${20 * minimumRows}px;`;
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
  return `resize: none`;
};

const getHeight = ({ resize, height }) => {
  if (resize !== 'smart' || height === undefined) return null;
  return `
    height: ${height}px;
  `;
};

export const TextAreaWrapper = styled.div`
  flex: 1 1 100%;
  position: relative;
  background-color: ${props =>
    props.isFocused ? props.backgroundColorFocus : props.backgroundColor}
  border-color: ${props =>
    props.isFocused ? props.borderColorFocus : props.borderColor};
  border-radius: ${props => props.borderRadius};
  border-style: ${getBorderStyle};
  box-sizing: border-box;;
  line-height: ${props => props.lineHeight};
  overflow: hidden;
  transition: ${props =>
    `background-color ${props.transitionDuration} ease-in-out,
    border-color ${props.transitionDuration} ease-in-out;`}
  word-wrap: break-word;
  ${getBorderAndPadding}
  ${getHoverState}
  ${getDisabledState};
  ${props => props.isDisabled && `cursor:not-allowed;`}
  padding-right: 0;
  font-size: ${fontSize}px;
  max-width: 100%;
  ${getResizeStyles}
  & > textarea, & > div {
    display:block;
    padding-right: 6px;
    resize: none;
    background: transparent
    padding: 0;
    margin: 0;
    border: 0;
    box-sizing: border-box;
    color: ${props => props.textColor};
    cursor: inherit;
    font-family: ${props =>
      props.isMonospaced ? codeFontFamily() : 'inherit'};
    font-size: inherit;
    line-height: ${props => props.lineHeight};
    min-width: 0;
    outline: none;
    max-width: 100%;
    width: 100%;
    ${getPlaceholderStyle(getPlaceholderColor)};
    ${getMinimumRowsHeight}
    ${getHeight}

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
