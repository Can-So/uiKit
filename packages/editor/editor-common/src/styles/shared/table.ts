import { css } from 'styled-components';
import { TableLayout } from '@atlaskit/adf-schema';
import { fontSize, themed } from '@atlaskit/theme';
import {
  akEditorTableBorder,
  akEditorTableBorderDark,
  akEditorTableToolbar,
  akEditorTableToolbarDark,
  akEditorWideLayoutWidth,
  akEditorTableNumberColumnWidth,
  akEditorFullWidthLayoutWidth,
  akEditorBreakoutPadding,
} from '../consts';
import { PanelSharedCssClassName } from './panel';

export const tableMarginTop = 24;
export const tableMarginBottom = 16;
export const tableMarginSides = 8;
export const tableCellMinWidth = 48;
export const tableNewColumnMinWidth = 140;
export const tableCellBorderWidth = 1;

const clPrefix = 'pm-table-';

export const TableSharedCssClassName = {
  TABLE_CONTAINER: `${clPrefix}container`,
  TABLE_NODE_WRAPPER: `${clPrefix}wrapper`,
  TABLE_LEFT_SHADOW: `${clPrefix}with-left-shadow`,
  TABLE_RIGHT_SHADOW: `${clPrefix}with-right-shadow`,
  TABLE_CELL_NODEVIEW_CONTENT_DOM: `${clPrefix}cell-nodeview-content-dom`,
};

const tableSharedStyle = css`
  .${TableSharedCssClassName.TABLE_CONTAINER} {
    position: relative;
    margin: 0 auto ${tableMarginBottom}px;
    box-sizing: border-box;

    /**
     * Fix block top alignment inside table cells.
     */
    .code-block,
    .${PanelSharedCssClassName.PANEL_CONTAINER},
    .taskItemView-content-wrap > div,
    .decisionItemView-content-wrap > div {
      margin-top: 0;
    }
  }
  .${TableSharedCssClassName.TABLE_CONTAINER}[data-number-column='true'] {
    padding-left: ${akEditorTableNumberColumnWidth - 1}px;
  }
  /* avoid applying styles to nested tables (possible via extensions) */
  .${TableSharedCssClassName.TABLE_CONTAINER} > table,
  .${TableSharedCssClassName.TABLE_NODE_WRAPPER} > table {
    border-collapse: collapse;
    margin: ${tableMarginTop}px ${tableMarginSides}px 0;
    border: ${tableCellBorderWidth}px solid ${themed({
  light: akEditorTableBorder,
  dark: akEditorTableBorderDark,
})};
    table-layout: fixed;
    font-size: ${fontSize()}px;
    width: 100%;

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
        min-width: ${tableCellMinWidth}px;
        height: 3em;
        vertical-align: top;
        border: 1px solid ${themed({
          light: akEditorTableBorder,
          dark: akEditorTableBorderDark,
        })};
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
        background-color: ${themed({
          light: akEditorTableToolbar,
          dark: akEditorTableToolbarDark,
        })};
        text-align: left;
        & *:not(strong) {
          font-weight: normal;
        }
        & .${TableSharedCssClassName.TABLE_CELL_NODEVIEW_CONTENT_DOM} > p {
          font-weight: bold;
        }
      }
    }
  }
`;

export const calcTableWidth = (
  layout: TableLayout,
  containerWidth?: number,
  addControllerPadding: boolean = true,
): string => {
  switch (layout) {
    case 'full-width':
      return containerWidth
        ? `${Math.min(
            containerWidth -
              (addControllerPadding ? akEditorBreakoutPadding : 0),
            akEditorFullWidthLayoutWidth,
          )}px`
        : `${akEditorFullWidthLayoutWidth}px`;
    case 'wide':
      if (containerWidth) {
        return `${Math.min(
          containerWidth - (addControllerPadding ? akEditorBreakoutPadding : 0),
          akEditorWideLayoutWidth,
        )}px`;
      }

      return `${akEditorWideLayoutWidth}px`;
    default:
      return 'inherit';
  }
};

export { tableSharedStyle };
