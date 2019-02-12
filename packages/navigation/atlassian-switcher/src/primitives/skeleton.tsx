import * as React from 'react';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

const SkeletonWrapper = styled.div`
  margin-top: 10px;
`;

const LineWrapper = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
`;

const IconSkeleton = styled.div`
  background-color: ${colors.N20};
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border-radius: 8px;
`;

const LineSkeleton = styled.div`
  background-color: ${colors.N20};
  display: inline-block;
  width: 98px;
  height: 10px;
  border-radius: 3px;
`;

export default () => (
  <SkeletonWrapper>
    <LineWrapper>
      <LineSkeleton />
    </LineWrapper>
    <LineWrapper>
      <IconSkeleton />
      <LineSkeleton />
    </LineWrapper>
    <LineWrapper>
      <IconSkeleton />
      <LineSkeleton />
    </LineWrapper>
    <LineWrapper>
      <IconSkeleton />
      <LineSkeleton />
    </LineWrapper>
  </SkeletonWrapper>
);
