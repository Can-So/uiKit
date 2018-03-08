/* tslint:disable variable-name */
// StyledComponentClass and React types are imported to prevent a typescript error caused by inferred types sourced
// from external modules - https://github.com/styled-components/styled-components/issues/1063#issuecomment-320344957
// @ts-ignore: unused variable
// prettier-ignore
import styled, { StyledComponentClass } from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, IframeHTMLAttributes } from 'react';

export interface IFrameProps {
  isLoading: boolean;
}

export const Iframe = styled.iframe`
  border: none;
  border-radius: 3px;

  ${({ isLoading }: IFrameProps) => {
    if (isLoading) {
      return `
        visibility: hidden;
        overflow: hidden;
        width: 480px;
        height: 360px;
      `;
    } else {
      return '';
    }
  }};
`;
