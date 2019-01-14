import styled from 'styled-components';
import { typography } from '@atlaskit/theme';
import gridSizeTimes from '../../util/gridSizeTimes';

export const Screen = styled.div`
  width: 640px;
  margin-bottom: ${gridSizeTimes(2)}px;
  > p {
    margin-top: ${gridSizeTimes(3)}px;
    margin-bottom: ${gridSizeTimes(2)}px;
  }
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

export const MainInformationList = styled.ul`
  > li {
    margin-top: ${gridSizeTimes(2)}px;
    margin-left: ${gridSizeTimes(1.5)}px;
    padding-left: ${gridSizeTimes(3)}px;
    b {
      font-weight: 600;
    }
  }
`;

export const AccessibleSitesWrapper = styled.div`
  margin-top: ${gridSizeTimes(1.5)}px;
`;
