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

const DEFAULT_LOZANGE_PROPS = {
  appearance: 'inprogress',
  isBold: true,
};

export const TryLozenge = ({ children, ...props }: AkLozengeProps) => (
  <OuterLozengeContainer>
    <Lozenge {...DEFAULT_LOZANGE_PROPS} {...props}>
      <InnerLozengeContainer>{children}</InnerLozengeContainer>
    </Lozenge>
  </OuterLozengeContainer>
);
