import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';
import { akColorN30, akBorderRadius } from '@atlaskit/util-shared-styles';
import { Wrapper as WrapperDefault, padding } from '../styles';

export const Wrapper: ComponentClass<HTMLAttributes<{}>> = styled(
  WrapperDefault,
)`
  margin: 12px 0;
`;

export const Header: ComponentClass<HTMLAttributes<{}>> = styled.div`
  cursor: pointer;
  padding: ${padding / 2}px ${padding / 2}px ${padding / 4}px;
  vertical-align: middle;
`;

export const Content: ComponentClass<
  HTMLAttributes<{}> & { innerRef?: any }
> = styled.div`
  padding: ${padding}px;
  background: white;
  border: 1px solid ${akColorN30};
  border-radius: ${akBorderRadius};
`;

export const ContentWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  padding: 0 ${padding}px ${padding}px;
`;
