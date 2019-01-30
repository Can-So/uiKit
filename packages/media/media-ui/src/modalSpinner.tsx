import * as React from 'react';

import { layers, colors } from '@atlaskit/theme';
import Spinner from '@atlaskit/spinner';
import styled from 'styled-components';

export const darkBlanketColor = colors.N700A;
export const lightBlanketColor = 'rgba(255, 255, 255, 0.53)';
const overlayZindex = layers.modal() + 10;

export const Blanket = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: ${overlayZindex};
`;
Blanket.displayName = 'Blanket';

export const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
SpinnerWrapper.displayName = 'SpinnerWrapper';

interface Props {
  mode: 'dark' | 'light';
}

export default ({ mode }: Props) => (
  <Blanket
    style={{
      backgroundColor: mode === 'dark' ? darkBlanketColor : lightBlanketColor,
    }}
  >
    <SpinnerWrapper>
      <Spinner size="large" invertColor={mode === 'dark'} />
    </SpinnerWrapper>
  </Blanket>
);
