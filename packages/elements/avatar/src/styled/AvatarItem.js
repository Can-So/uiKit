// @flow
import styled, { css } from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';

const activeBackgroundColor = themed({
  light: colors.B50,
  dark: colors.DN40,
});
const hoverBackgroundColor = themed({
  light: colors.N30,
  dark: colors.DN50,
});
const focusBorderColor = themed({
  light: colors.B200,
  dark: colors.B75,
});

// $FlowFixMe - add types for arguments
export function getBackgroundColor({
  backgroundColor,
  href,
  isActive,
  isHover,
  isSelected,
  onClick,
}) {
  const isInteractive = href || onClick;

  let themedBackgroundColor = backgroundColor || colors.background;

  // Interaction: Hover
  if (isInteractive && (isHover || isSelected)) {
    themedBackgroundColor = hoverBackgroundColor;
  }

  // Interaction: Active
  if (isInteractive && isActive) {
    themedBackgroundColor = activeBackgroundColor;
  }

  return themedBackgroundColor;
}

// $FlowFixMe - add types for arguments
export function getStyles({ href, isActive, isDisabled, isFocus, onClick }) {
  const isInteractive = href || onClick;

  let borderColor = 'transparent';
  let cursor = 'auto';
  let opacity = 1;
  let outline = 'none';
  let pointerEvents = 'auto';

  // Interaction: Focus
  if (isInteractive && isFocus && !isActive) {
    outline = 'none';
    borderColor = focusBorderColor;
  }

  // Disabled
  if (isDisabled) {
    cursor = 'not-allowed';
    opacity = 0.75;
    pointerEvents = 'none';
  }

  // Interactive
  if (isInteractive) {
    cursor = 'pointer';
  }
  return css`
    align-items: center;
    background-color: ${getBackgroundColor};
    border-radius: ${borderRadius}px;
    border: 2px solid ${borderColor};
    box-sizing: content-box;
    color: inherit;
    cursor: ${cursor};
    display: flex;
    font-size: inherit;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    opacity: ${opacity};
    outline: ${outline};
    margin: 0;
    padding: ${math.divide(gridSize, 2)}px;
    pointer-events: ${pointerEvents};
    text-align: left;
    text-decoration: none;
    width: 100%;
  `;
}

const truncateText = p =>
  p.truncate &&
  css`
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;
const truncateTextFlexParent = p =>
  p.truncate &&
  css`
    max-width: 100%;
    min-width: 0;
  `;

export const Content = styled.div`
  ${truncateTextFlexParent} flex: 1 1 100%;
  line-height: 1.4;
  padding-left: ${gridSize}px;
`;
export const PrimaryText = styled.div`
  ${truncateText} color: ${colors.text};
`;
export const SecondaryText = styled.div`
  ${truncateText} color: ${colors.subtleText};
  font-size: 0.85em;
`;
