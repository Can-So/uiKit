import styled from 'styled-components';
import { RefObject, ComponentClass, HTMLAttributes } from 'react';
import { borderRadius, colors } from '@atlaskit/theme';
import { COLOR_CARD_SIZE } from '../constants';

interface Props {
  innerRef: RefObject<HTMLButtonElement>;
  type?: string;
  focused?: boolean;
}

const focusedBorder = `border-color: ${colors.B100};`;

export const ColorCardContainer: ComponentClass<HTMLAttributes<{}> & Props> & {
  withComponent: (tag: string) => typeof ColorCardContainer;
} = styled.div`
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

  &:focus {
    ${focusedBorder};
  }

  ${props => {
    if (props.focused) {
      return focusedBorder;
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

export const ColorCardOption = ColorCardContainer;

export const ColorCardButton = ColorCardContainer.withComponent('button');
