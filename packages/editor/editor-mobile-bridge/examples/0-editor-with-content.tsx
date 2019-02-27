import * as React from 'react';
import styled from 'styled-components';
import Editor from './../src/editor/mobile-editor-element';
import { exampleDocument } from '../../editor-core/example-helpers/example-document';

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
      <Editor defaultValue={exampleDocument} />
    </Wrapper>
  );
}
