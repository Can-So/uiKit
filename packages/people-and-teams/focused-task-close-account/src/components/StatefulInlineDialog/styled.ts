import { colors } from '@atlaskit/theme';
import styled from 'styled-components';

export const InfoIconWrapper = styled.span`
  color: ${colors.B500};
  div {
    display: inline-block;
  }
  ${({ isHovered }) => isHovered && `color: ${colors.B200}`};
`;
