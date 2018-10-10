import styled, { css } from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';
import { colors, borderRadius } from '@atlaskit/theme';

export const BackgroundWrapper: ComponentClass<
  HTMLAttributes<{}> & { maxWidth: number }
> = styled.div`
  height: 2px;
  background-color: ${colors.N20};
  border: transparent;
  border-radius: ${borderRadius()}px;
  ${({ maxWidth }: { maxWidth: number }) =>
    css`
      max-width: ${maxWidth}px;
    `};
`;

export const ProgressLoaderWrapper: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  flex-grow: 1;
`;

export const Container: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  align-items: center;
`;

export const LoaderStyle: ComponentClass<
  HTMLAttributes<{}> & {
    width?: number;
    progress: number;
    maxWidth?: number;
    showCancel?: boolean;
  }
> = styled.div`
  background-color: ${colors.B400};
  height: 2px;
  border: transparent;
  border-radius: ${borderRadius()}px;

  /** 
   * This value was found to be ideal 
   * http://cubic-bezier.com/#.52,.27,0,1.03
   **/
  transition: 1s all cubic-bezier(0.52, 0.27, 0, 1.03);

  ${({
    progress,
    maxWidth,
    showCancel,
  }: {
    progress: number;
    maxWidth: number;
    showCancel: boolean;
  }) =>
    css`
      width: ${progress * maxWidth}px;
    `};
`;
