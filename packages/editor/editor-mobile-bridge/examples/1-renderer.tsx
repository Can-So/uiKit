import * as React from 'react';
import styled from 'styled-components';
import Renderer from './../src/renderer/mobile-renderer-element';

export const Wrapper: any = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`;

Wrapper.displayName = 'Wrapper';

export default function Example() {
  return (
    <Wrapper>
      <Renderer />
    </Wrapper>
  );
}
