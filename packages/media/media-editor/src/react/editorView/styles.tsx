import styled, { ThemedOuterStyledProps } from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';
import { akColorN700A } from '@atlaskit/util-shared-styles';

// z-index is set to 200 for the main container to be above the dropzone which has z-index 100
export const EditorContainer: ComponentClass<
  HTMLAttributes<{}> & ThemedOuterStyledProps<{}, {}>
> = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${akColorN700A};
  z-index: 200;
  overflow: hidden;
`;
