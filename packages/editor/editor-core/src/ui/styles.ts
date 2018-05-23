import { HTMLAttributes, ComponentClass } from 'react';
// @ts-ignore: unused variable
// prettier-ignore
import styled, { css, Styles, StyledComponentClass } from 'styled-components';
import { akColorN30 } from '@atlaskit/util-shared-styles';

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
  align-items: stretch;

  > div,
  > span {
    display: flex;
  }

  > div > div {
    display: flex;
  }
  /* see ED-4591 */
  margin-left: ${({ isSmall }: { isSmall?: boolean }) => (isSmall ? 5 : 4)}px;
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
  height: 24px;
  align-items: center;
  padding: ${(props: any) => (props.width ? 0 : '0 8px')};
`;

// Taken from the style of inline dialog components
export const dropShadow = css`
  box-shadow: 0 0 1px rgba(9, 30, 66, 0.31),
    0 4px 8px -2px rgba(9, 30, 66, 0.25);
`;
