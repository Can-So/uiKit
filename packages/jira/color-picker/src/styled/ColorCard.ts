import styled from 'styled-components';
import { ButtonHTMLAttributes, ComponentClass, RefObject } from 'react';
import { borderRadius } from '@atlaskit/theme';

export const ColorCardContent: ComponentClass<
  ButtonHTMLAttributes<{}> & {
    innerRef: RefObject<HTMLButtonElement>;
    focused?: boolean;
  }
> = styled.button`
  display: block;
  border-radius: ${borderRadius()}px;
  height: 24px;
  width: 24px;
  padding: 0;
  cursor: pointer;
  border-width: 0;
  outline: none;
  transition: box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);

  &:focus {
    box-shadow: 0 0 0 2px rgba(38, 132, 255, 0.6);
  }
`;
