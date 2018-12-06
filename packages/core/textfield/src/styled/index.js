// @flow

import styled, { css } from 'styled-components';
import { codeFontFamily, gridSize, fontSize } from '@atlaskit/theme';

const borderRadius = '3px';
const borderWidth = 2;
const grid = gridSize();
const lineHeight = grid * 2.5;
const horizontalPadding = grid;
const transitionDuration = '0.2s';
const verticalPaddingCompact = grid / 2;
const verticalPaddingBase = grid;

const getPadding = ({ isCompact }) => {
  const verticalPadding = isCompact
    ? verticalPaddingCompact
    : verticalPaddingBase;
  return css`
    padding: ${verticalPadding}px ${horizontalPadding - borderWidth}px;
  `;
};

const getLineHeight = () => {
  return lineHeight / fontSize();
};

const getDisabledState = props =>
  props.isDisabled &&
  css`
    color: ${props.disabledRules.textColor};
    pointer-events: none;
  `;

const getHoverState = props => {
  if (props.isReadOnly || props.isFocused || props.none) return null;
  let backgroundColorHover = props.backgroundColorHover;
  if (props.isDisabled) {
    backgroundColorHover = props.disabledRules.backgroundColorHover;
  }
  if (props.isInvalid) {
    backgroundColorHover = props.invalidRules.backgroundColorHover;
  }

  return css`
    &:hover {
      background-color: ${backgroundColorHover};
    }
  `;
};

const getBorderStyle = ({ appearance }) =>
  appearance === 'none' ? 'none' : 'solid';

const getPlaceholderColor = ({
  isDisabled,
  placeholderTextColor,
  disabledRules,
}) => {
  if (isDisabled) return disabledRules.textColor;
  return placeholderTextColor;
};

// can't group these placeholder styles into one block because browsers drop
// entire style blocks when any single selector fails to parse
const getPlaceholderStyle = () => css`
  &::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: ${getPlaceholderColor};
  }
  &::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: ${getPlaceholderColor};
    opacity: 1;
  }
  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${getPlaceholderColor};
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${getPlaceholderColor};
  }
`;

// Safari puts on some difficult to remove styles, mainly for disabled inputs
// but we want full control so need to override them in all cases
const overrideSafariDisabledStyles = `
  -webkit-text-fill-color: unset;
  -webkit-opacity: 1;
`;

const getMaxWidth = ({ width }) => {
  if (!width) return `100%`;
  switch (width) {
    case 'xsmall':
      return '80px';
    case 'small':
      return '160px';
    case 'medium':
      return '240px';
    case 'large':
      return '320px';
    case 'xlarge':
      return '480px';
    default:
      return `${width}px`;
  }
};

export const Wrapper = styled.div`
  flex: 1 1 100%;
  max-width: ${getMaxWidth};
`;

const getBackgroundColor = ({
  isFocused,
  isDisabled,
  isInvalid,
  disabledRules,
  invalidRules,
  ...p
}) => {
  let backgroundColor = isFocused ? p.backgroundColorFocus : p.backgroundColor;
  if (isDisabled) {
    backgroundColor = isFocused
      ? disabledRules.backgroundColorFocus
      : disabledRules.backgroundColor;
  } else if (isInvalid) {
    backgroundColor = isFocused
      ? invalidRules.backgroundColorFocus
      : invalidRules.backgroundColor;
  }
  return backgroundColor;
};

const getBorderColor = ({
  isFocused,
  isDisabled,
  isInvalid,
  disabledRules,
  invalidRules,
  ...p
}) => {
  let borderColor = isFocused ? p.borderColorFocus : p.borderColor;
  if (isDisabled) {
    borderColor = isFocused
      ? disabledRules.borderColorFocus
      : disabledRules.borderColor;
  } else if (isInvalid) {
    borderColor = isFocused
      ? invalidRules.borderColorFocus
      : invalidRules.borderColor;
  }
  return borderColor;
};

export const InputWrapper = styled.div`
  align-items: center;
  background-color: ${getBackgroundColor};
  border-color: ${getBorderColor};
  border-radius: ${borderRadius};
  border-width: ${borderWidth}px;
  border-style: ${getBorderStyle};
  box-sizing: border-box;
  color: ${p => p.textColor};
  display: flex;
  flex: 1 0 auto;
  font-size: ${fontSize}px;
  justify-content: space-between;
  max-width: 100%;
  overflow: hidden;
  transition: background-color ${transitionDuration} ease-in-out,
    border-color ${transitionDuration} ease-in-out;
  word-wrap: break-word;
  vertical-align: top;
  ${p => p.isDisabled && `cursor: not-allowed;`}
  ${getPadding} ${getHoverState} ${getDisabledState};

  & > input {
    background: transparent;
    border: 0;
    padding: 0;
    box-sizing: border-box;
    color: inherit;
    cursor: inherit;
    font-family: ${p => (p.isMonospaced ? codeFontFamily() : 'inherit')};
    font-size: ${fontSize}px;
    min-width: 0;
    outline: none;
    width: 100%;
    line-height: ${getLineHeight};

    &[disabled] {
      ${overrideSafariDisabledStyles};
    }

    &::-ms-clear {
      display: none;
    }

    &:invalid {
      box-shadow: none;
    }
    ${getPlaceholderStyle};
  }
`;
