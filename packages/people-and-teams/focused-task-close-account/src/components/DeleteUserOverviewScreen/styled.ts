import styled from 'styled-components';
import { typography } from '@atlaskit/theme';
import gridSizeTimes from '../../util/gridSizeTimes';

export const Screen = styled.div`
  width: 640px;
  margin-bottom: ${gridSizeTimes(2)}px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

export const Title = styled.div`
  ${typography.h700};
  margin-bottom: ${gridSizeTimes(3)}px;
  margin-top: 0;
`;

export const FirstLine = styled.div`
  margin-top: ${gridSizeTimes(3)}px;
  margin-bottom: ${gridSizeTimes(2)}px;
`;

export const SectionMessageOuter = styled.div`
  margin: ${gridSizeTimes(3)}px 0;
`;

export const MainInformationList = styled.ul`
  > li {
    margin-top: 16px;
    margin-left: 12px;
  }
`;

export const ListItems = styled.div`
  margin-left: 24px;
  margin-top: 8px;
  > * b {
    font-weight: 600;
  }
`;
