import styled from 'styled-components';
import { RefObject, ComponentClass, HTMLAttributes } from 'react';
import { borderRadius, colors } from '@atlaskit/theme';

interface Props {
  innerRef: RefObject<HTMLButtonElement>;
  color: string;
  type?: string;
  focused?: boolean;
  tabIndex?: number;
}

const focusedBorder = `border-color: ${colors.B100};`;

export const ColorCardContent: ComponentClass<HTMLAttributes<{}> & Props> & {
  withComponent: (tag: string) => typeof ColorCardContent;
} = styled.div`
  display: inline-block;
  position: relative;
  width: 26px;
  height: 26px;
  box-sizing: border-box;
  border-radius: ${borderRadius()}px;
  padding: 0;
  border: 2px solid transparent;
  cursor: pointer;
  outline: none;
  background: ${props => props.color};
  transition: border-color 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);

  &:focus {
    ${focusedBorder};
  }

  ${props => {
    if (props.focused) {
      return focusedBorder;
    }
  }};
`;

export const ColorCardOption = ColorCardContent;

export const ColorCardButton = ColorCardContent.withComponent('button');
