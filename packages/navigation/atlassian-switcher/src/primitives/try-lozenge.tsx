import * as React from 'react';
import styled from 'styled-components';
import Lozenge from '@atlaskit/lozenge';
import { gridSize } from '@atlaskit/theme';

export const OuterLozengeContainer = styled.span`
  display: inline-block;
  margin-left: ${gridSize()}px;
`;

export const InnerLozengeContainer = styled.span`
  padding-left: ${gridSize()}px;
  padding-right: ${gridSize()}px;
`;

interface AkLozengeProps {
  children: React.ReactNode;
}

export default ({ children, ...props }: AkLozengeProps) => (
  <OuterLozengeContainer>
    <Lozenge appearance="inprogress" isBold {...props}>
      <InnerLozengeContainer>{children}</InnerLozengeContainer>
    </Lozenge>
  </OuterLozengeContainer>
);
