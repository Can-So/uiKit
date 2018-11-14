import styled, { css } from 'styled-components';
import { ComponentClass, HTMLAttributes } from 'react';
import { borderRadius, colors } from '@atlaskit/theme';
import { COLOR_CARD_SIZE } from '../constants';

interface Props {
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

export const ColorCardOption: ComponentClass<
  HTMLAttributes<{}> & Props
> = styled.div`
  ${sharedColorContainerStyles};

  ${props => {
    if (props.focused) {
      return `border-color: ${colors.B75}`;
    }
  }};
`;

export const ColorCardButton: ComponentClass<
  HTMLAttributes<{}> & Props
> = styled.button`
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

export const ColorCardContent: ComponentClass<
  HTMLAttributes<{}> & { color: string }
> = styled.div`
  display: block;
  position: absolute;
  top: 1px;
  left: 1px;
  width: 24px;
  height: 24px;
  border-radius: ${borderRadius()}px;
  background: ${props => props.color};
`;
