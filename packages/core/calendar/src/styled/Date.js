// @flow

/* eslint no-confusing-arrow: 0 */

import styled, { css } from 'styled-components';
import { colors, themed } from '@atlaskit/theme';

const getTransparent = themed({ light: 'transparent', dark: 'transparent' });
const selectedBackground = themed({ light: colors.N500, dark: colors.N0 });
const prevSelectedBackground = themed({ light: colors.B75, dark: colors.B75 });

const textDisabled = themed({ light: colors.N40, dark: colors.N40 });
const textHoverSelected = themed({ light: colors.N600, dark: colors.N600 });
const textPreviouslySelected = themed({
  light: colors.N600,
  dark: colors.N600,
});
const textSelected = themed({ light: colors.N0, dark: colors.N700 });
const textSibling = themed({ light: colors.N80, dark: colors.N80 });

const hoverPreviouslySelectedBackground = themed({
  light: colors.B75,
  dark: colors.B75,
});
const isActiveBackground = themed({ light: colors.B75, dark: colors.B75 });
const hoverBackground = themed({ light: colors.N30A, dark: colors.N900 });

const getBackgroundColorSelectedAfter = themed({
  light: colors.N700,
  dark: colors.N700,
});

const getBackgroundColorsAfter = props =>
  props.selected
    ? getBackgroundColorSelectedAfter(props)
    : colors.primary(props);

const getBorderColorFocused = themed({ light: colors.B100, dark: colors.B75 });

const getBorderColors = props =>
  props.focused ? getBorderColorFocused(props) : getTransparent(props);

function getBackgroundColor(props) {
  if (props.selected) return selectedBackground(props);
  if (props.previouslySelected) return prevSelectedBackground(props);
  return getTransparent(props);
}

function getColor(props) {
  if (props.disabled) return textDisabled(props);
  if (props.selected) return textSelected(props);
  if (props.previouslySelected) return textPreviouslySelected(props);
  if (props.isToday) return colors.primary(props);
  if (props.sibling) return textSibling(props);
  return colors.text(props);
}

const getCursor = ({ disabled }) => (disabled ? 'not-allowed' : 'pointer');

function getHoverBackgroundColor(props) {
  if (props.disabled) return getTransparent(props);
  if (props.previouslySelected) return hoverPreviouslySelectedBackground(props);
  if (props.isActive) return isActiveBackground(props);
  return hoverBackground(props);
}

const getHoverColor = props => {
  if (props.disabled) return textDisabled(props);
  if (props.selected || props.previouslySelected || props.isActive)
    return textHoverSelected(props);
  return colors.text(props);
};

export const DateDiv = styled.div`
  background-color: ${getBackgroundColor};
  border: 2px solid ${getBorderColors};
  border-radius: 4px;
  color: ${getColor};
  cursor: ${getCursor};
  font-size: 12px;
  padding: 4px 9px;
  position: relative;
  text-align: center;

  ${props =>
    props.isToday
      ? css`
          font-weight: bold;
          &::after {
            background-color: ${getBackgroundColorsAfter(props)};
            bottom: 1px;
            content: '';
            display: block;
            height: 1px;
            left: 2px;
            position: absolute;
            right: 2px;
          }
        `
      : ''} &:hover {
    background-color: ${getHoverBackgroundColor};
    color: ${getHoverColor};
  }
`;

export const DateTd = styled.td`
  border: 0;
  padding: 0;
  text-align: center;
`;
