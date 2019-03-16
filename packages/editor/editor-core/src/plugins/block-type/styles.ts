// @ts-ignore: unused variable
import { css, Styles, StyledComponentClass } from 'styled-components';
import {
  blockquoteSharedStyles,
  headingsSharedStyles,
} from '@findable/editor-common';

export const blocktypeStyles = css`
  .ProseMirror {
    ${blockquoteSharedStyles};
    ${headingsSharedStyles};
  }
`;
