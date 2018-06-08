import { browser } from '@atlaskit/editor-common';
import {
  akColorN40A,
  akColorB100,
  akColorB300,
  akColorB75,
  akColorN20,
  akColorN50,
  akColorR50,
  akColorR300,
  akColorR75,
} from '@atlaskit/util-shared-styles';
import {
  tableSharedStyle,
  tableMarginTop,
  tableMarginBottom,
  akEditorTableNumberColumnWidth,
} from '@atlaskit/editor-common';
import { scrollbarStyles } from '../../../ui/styles';

export const tableToolbarColor = akColorN20;
export const tableBorderColor = akColorN50;
export const tableFloatingControlsColor = akColorN20;
export const tableCellSelectedColor = akColorB75;
export const tableToolbarSelectedColor = akColorB100;
export const tableBorderSelectedColor = akColorB300;
export const tableCellDeleteColor = akColorR50;
export const tableBorderDeleteColor = akColorR300;
export const tableToolbarDeleteColor = akColorR75;

export const tableToolbarSize = 12;
export const tableBorderRadiusSize = 3;
export const tableInsertColumnButtonSize = 20;
export const tableDeleteColumnButtonSize = 16;

const isIE11 = browser.ie_version === 11;

export const tableStyles = `
  .ProseMirror{
    .table-container table ${tableSharedStyle}

    .table-container table {
      td, th {
        position: relative;
      }

      .selectedCell, .hoveredCell {
        position: relative;
        border: 1px solid ${tableBorderSelectedColor};
      }
      /* Give selected cells a blue overlay */
      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: "";
        left: 0; right: 0; top: 0; bottom: 0;
        background: ${tableCellSelectedColor};
        opacity: 0.3;
        pointer-events: none;
      }
      .selectedCell.danger, .hoveredCell.danger {
        border: 1px solid ${tableBorderDeleteColor};
      }
      .selectedCell.danger:after {
        background: ${tableCellDeleteColor};
      }
    }
    .table-column-controls-wrapper,
    .table-row-controls-wrapper {
      position: absolute;
      top: ${(isIE11 ? 0 : tableMarginTop) - tableToolbarSize + 1}px;
    }
    .table-column-controls-wrapper {
      left: 0;
    }
    .table-row-controls-wrapper {
      left: -${tableToolbarSize - 1}px;
    }
    .table-container {
      position: relative;
      margin: 0 auto;
      box-sizing: border-box;
    }
    .table-container table[data-number-column='true'] td:first-child {
      background-color: ${tableFloatingControlsColor};
      width: ${akEditorTableNumberColumnWidth}px;
      text-align: center;
    }
    .table-container[data-layout='full-width'],
    .table-container[data-layout='wide'] {
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .table-wrapper {
      padding-right: ${tableInsertColumnButtonSize / 2}px;
      margin-right: -${tableInsertColumnButtonSize / 2}px;
      /* fixes gap cursor height */
      overflow: ${isIE11 ? 'none' : 'auto'};
      position: relative;
    }
    .table-decoration {
      position: relative;
      left: -1px;
    }
  }

  /* =============== TABLE COLUMN RESIZING ================== */
  .ProseMirror.table-resizing {
    .table-shadow {
      pointer-events: none;
      display: none;
      position: absolute;
      top: ${tableMarginTop - tableToolbarSize + 1}px;
      bottom: ${tableMarginBottom}px;
      width: 0;
    }
    .with-controls .table-shadow {
      display: ${isIE11 ? 'none' : 'block'};
    }
    .table-shadow.-left {
      left: 0;
      background: linear-gradient(
        to left,
        rgba(99, 114, 130, 0) 0,
        ${akColorN40A} 100%
      );
    }
    .table-shadow.-right {
      background: linear-gradient(
        to right,
        rgba(99, 114, 130, 0) 0,
        ${akColorN40A} 100%
      );
    }
    .table-wrapper {
      overflow-x: ${isIE11 ? 'none' : 'auto'};
      ${!isIE11 ? scrollbarStyles : ''}
    }
    .column-resize-handle {
      background-color: ${tableBorderSelectedColor};
      position: absolute;
      bottom: 0;
      top: -1px;
      right: -2px;
      width: 2px;
      height: calc(100% + 2px);
      pointer-events: none;
      z-index: 20;
    }
    .with-controls .column-resize-handle {
      top: -${tableToolbarSize}px;
      height: calc(100% + ${tableToolbarSize}px);
    }
  }

  .ProseMirror.resize-cursor {
    cursor: col-resize;
  }
`;

export const tableFullPageEditorStyles = `
  .ProseMirror .table-container table {
    .selectedCell.danger, .hoveredCell.danger {
      border: 1px solid ${tableBorderDeleteColor};
      background: ${tableCellDeleteColor};
    }
    .selectedCell.danger:after {
      background: ${tableCellDeleteColor};
    }
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
`;

export const tableCommentEditorStyles = `
  .ProseMirror .table-container table {
    margin-left: 0;
    margin-right: 0;

    ${scrollbarStyles};
  }
`;
