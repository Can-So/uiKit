import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';
import { colors } from '@atlaskit/theme';
import { borderRadius, size } from '@atlaskit/media-ui';

export const IconBackground: ComponentClass<HTMLAttributes<{}>> = styled.div`
  ${borderRadius}
  ${size(24)}
  background-color: ${colors.B200};
`;
