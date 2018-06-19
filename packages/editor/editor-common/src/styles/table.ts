// @ts-ignore: unused variable
// prettier-ignore
import { css, Styles, StyledComponentClass } from 'styled-components';

import { TableLayout } from '../schema';
import {
  akEditorTableBorder,
  akEditorTableToolbar,
  akEditorWideLayoutWidth,
  akEditorTableNumberColumnWidth,
} from './';

export const tableMarginTop = 32;
export const tableMarginBottom = 20;
export const tableMarginSides = 8;

const CONTROLLER_PADDING = 64;

const tableSharedStyle = css`
  .table-container {
    position: relative;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .table-container[data-number-column='true'] {
    padding-left: ${akEditorTableNumberColumnWidth + 1}px;
  }
  .table-container[data-layout='full-width'],
  .table-container[data-layout='wide'] {
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .table-container table {
    border-collapse: collapse;
    margin: ${tableMarginTop}px ${tableMarginSides}px ${tableMarginBottom}px;
    border: 1px solid ${akEditorTableBorder};
    table-layout: fixed;

    &[data-autosize='true'] {
      table-layout: auto;
    }

    & {
      * {
        box-sizing: border-box;
      }

      tbody {
        border-bottom: none;
      }
      th td {
        background-color: white;
        font-weight: normal;
      }
      th,
      td {
        min-width: 128px;
        height: 3em;
        vertical-align: top;
        border: 1px solid ${akEditorTableBorder};
        border-right-width: 0;
        border-bottom-width: 0;
        padding: 10px;
        /* https://stackoverflow.com/questions/7517127/borders-not-shown-in-firefox-with-border-collapse-on-table-position-relative-o */
        background-clip: padding-box;

        th p:not(:first-of-type),
        td p:not(:first-of-type) {
          margin-top: 12px;
        }
      }
      th {
        background-color: ${akEditorTableToolbar};
        font-weight: bold;
        text-align: left;
      }
    }
  }
`;

export const calcTableWidth = (
  layout: TableLayout,
  containerWidth: number,
  addControllerPadding: boolean = true,
): string => {
  switch (layout) {
    case 'full-width':
      return containerWidth
        ? `${containerWidth -
            (addControllerPadding ? CONTROLLER_PADDING : 0)}px`
        : '100%';
    case 'wide':
      const targetWidth =
        containerWidth - (addControllerPadding ? CONTROLLER_PADDING : 0);
      return targetWidth < akEditorWideLayoutWidth
        ? `${targetWidth}px`
        : `${akEditorWideLayoutWidth}px`;
    default:
      return 'inherit';
  }
};

export { tableSharedStyle };
