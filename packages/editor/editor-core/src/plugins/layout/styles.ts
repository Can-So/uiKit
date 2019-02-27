// @ts-ignore: unused variable
// prettier-ignore
import { css, Styles, StyledComponentClass } from 'styled-components';
import { colors, gridSize } from '@atlaskit/theme';
import {
  columnLayoutSharedStyle,
  gridMediumMaxWidth,
} from '@atlaskit/editor-common';

export const layoutStyles = css`
  .ProseMirror {
    ${columnLayoutSharedStyle} [data-layout-section] {
      position: relative;
      width: calc(100% + 26px);
      /* left-padding (12px) + layout-column-border (1px) */
      left: -13px;
      margin-top: ${gridSize() - 1}px;

      /* Inner cursor located 26px from left */
      & > * {
        padding: ${gridSize() * 1.5}px;
        flex: 1;
        min-width: 0;
        border: 1px solid transparent;
        border-radius: 5px;
      }

      & > * + * {
        margin-left: ${gridSize() - 2}px;
      }

      @media screen and (max-width: ${gridMediumMaxWidth}px) {
        & > * + * {
          margin-left: 0;
        }
      }

      /**
        * Border to show when node is selected
        * Helps visualise when 'selectNodeBackwards' selects the node for deletion
        */
      &.ProseMirror-selectednode > * {
        border-color: ${colors.B200};
      }
      /* Shows the border when cursor is inside a layout */
      &.selected > * {
        border-color: ${colors.N40};
      }
    }
  }
`;
