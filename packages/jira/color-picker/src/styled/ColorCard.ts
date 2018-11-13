import styled, { css } from 'styled-components';
import { RefObject } from 'react';
import { borderRadius, colors } from '@atlaskit/theme';

interface Props {
  innerRef: RefObject<HTMLButtonElement>;
  color: string;
  type?: string;
  focused?: boolean;
}

const colorCardCss = css`
  display: inline-block;
  box-sizing: border-box;
  border-radius: ${borderRadius()}px;
  height: 26px;
  width: 26px;
  padding: 0;
  border: 2px solid transparent;
  cursor: pointer;
  outline: none;
  background: ${(props: Props) => props.color};
  transition: border-color 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);

  &:focus {
    border-color: ${colors.B100};
  }

  ${(props: Props) => props.focused && `border-color: ${colors.B100};`};
`;

export const ColorCardOption = styled.option`
  ${colorCardCss};
`;

export const ColorCardButton = styled.button`
  ${colorCardCss};
`;
