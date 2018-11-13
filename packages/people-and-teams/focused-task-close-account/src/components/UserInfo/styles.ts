import styled from 'styled-components';
import { typography, fontSize, colors } from '@atlaskit/theme';

import gridSizeTimes from '../../util/gridSizeTimes';

const baseHeading = (size, lineHeight) => `
  font-size: ${size / fontSize()}em;
  font-style: inherit;
  line-height: ${lineHeight / size};
`;

export const UserInfoOuter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${gridSizeTimes(2)}px;
`;

export const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 8px;
  margin-bottom: ;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${gridSizeTimes(0.5)}px;
`;

export const UserName = styled.span`
  ${typography.h500};
  margin-top: 0;
`;

export const UserEmail = styled.span`
  ${baseHeading(11, 16)} color: ${colors.subtleHeading};
  font-weight: 300;
  margin-top: ${gridSizeTimes(0.5)}px;
`;
