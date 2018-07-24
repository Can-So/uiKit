import { HTMLAttributes, ComponentClass } from 'react';
// @ts-ignore: unused variable
// prettier-ignore
import styled, { css, Styles, StyledComponentClass } from 'styled-components';
import { akColorN30, akGridSize } from '@atlaskit/util-shared-styles';

export const ButtonGroup: ComponentClass<
  HTMLAttributes<{}> & { width?: 'small' | 'large' }
> = styled.span`
  display: inline-flex;
  align-items: center;

  & > div {
    display: flex;
  }
`;

export const Separator: ComponentClass<HTMLAttributes<{}>> = styled.span`
  background: ${akColorN30};
  width: 1px;
  height: 24px;
  display: inline-block;
  margin: 0 8px;
`;

export const Wrapper: ComponentClass<
  HTMLAttributes<{}> & { isSmall?: boolean }
> = styled.span`
  display: flex;
  align-items: center;

  > div,
  > span {
    display: flex;
  }

  > div > div {
    display: flex;
  }
  margin-left: ${({ isSmall }: { isSmall?: boolean }) => (isSmall ? 4 : 0)}px;
  min-width: ${({ isSmall }: { isSmall?: boolean }) =>
    isSmall ? '40px' : 'auto'};
`;

export const ExpandIconWrapper: ComponentClass<
  HTMLAttributes<{}>
> = styled.span`
  margin-left: -8px;
`;

export const TriggerWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
`;

export const MenuWrapper: ComponentClass<HTMLAttributes<{}>> = Wrapper;

export const ButtonContent: ComponentClass<HTMLAttributes<{}>> = styled.span`
  display: flex;
  width: 80px;
  height: 32px;
  align-items: center;
  padding: ${(props: any) => (props.width ? 0 : '0 8px')};
`;

// Taken from the style of inline dialog components
export const dropShadow = css`
  box-shadow: 0 0 1px rgba(9, 30, 66, 0.31),
    0 4px 8px -2px rgba(9, 30, 66, 0.25);
`;

export const scrollbarStyles = `
  -ms-overflow-style: -ms-autohiding-scrollbar;

  &::-webkit-scrollbar {
    height: ${akGridSize};
    width: ${akGridSize};
  }

  &::-webkit-scrollbar-corner {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0);
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: ${akGridSize};
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
