import { colors } from '@atlaskit/theme';
import styled from 'styled-components';

interface InfoIconWrapperProps {
  isHovered: boolean;
}

export const InfoIconWrapper = styled.span`
  color: ${colors.B500};
  div {
    display: inline-block;
  }
  ${({ isHovered }: InfoIconWrapperProps) =>
    isHovered && `color: ${colors.B200}`};
`;
