import styled, { css } from 'styled-components';
import { borderRadius, colors } from '@atlaskit/theme';
import { COLOR_CARD_SIZE } from '../constants';

interface ColorCardProps {
  focused?: boolean;
}

const buttonFocusedBorder = `border-color: ${colors.B100};`;

const sharedColorContainerStyles = css`
  display: inline-block;
  position: relative;
  width: ${COLOR_CARD_SIZE}px;
  height: ${COLOR_CARD_SIZE}px;
  border: 2px solid transparent;
  box-sizing: border-box;
  border-radius: ${borderRadius() * 2}px;
  transition: border-color 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);
  border-color: transparent;
  padding: 0;
  cursor: pointer;
  outline: none;
`;

export const ColorCardOption = styled.div<ColorCardProps>`
  ${sharedColorContainerStyles};

  ${props => {
    if (props.focused) {
      return `border-color: ${colors.B75}`;
    }
  }};
`;

export const ColorCardButton = styled.button<ColorCardProps>`
  ${sharedColorContainerStyles};

  &:focus {
    ${buttonFocusedBorder};
  }

  ${props => {
    if (props.focused) {
      return buttonFocusedBorder;
    }
  }};
`;

interface ColorCardContentProps {
  color: string;
}

export const ColorCardContent = styled.div<ColorCardContentProps>`
  position: absolute;
  top: 1px;
  left: 1px;
  width: 24px;
  height: 24px;
  border-radius: ${borderRadius()}px;
  background: ${props => props.color};
`;
