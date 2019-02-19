// tslint:disable:variable-name

import styled from 'styled-components';

import { HTMLAttributes, ComponentClass } from 'react';
import { colors } from '@atlaskit/theme';

// z-index is set to 200 for the main container to be above the dropzone which has z-index 100
export const CenterView: ComponentClass<HTMLAttributes<{}>> = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.N700A};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  overflow: hidden;
`;
