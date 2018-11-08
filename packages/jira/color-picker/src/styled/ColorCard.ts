import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';
import { borderRadius } from '@atlaskit/theme';

export const ColorCardContent: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: block;
  border-radius: ${borderRadius()}px;
  height: 24px;
  width: 24px;
  padding: 0;
  cursor: pointer;
`;
