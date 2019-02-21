import { clickElementWithText, getBoundingRect } from './_editor';
import { clickToolbarMenu, ToolbarMenuItem } from './_toolbar';
import { TableCssClassName as ClassName } from '../../../plugins/table/types';
import {
  pressKey,
  pressKeyup,
  KeyboardKeys,
} from '../../__helpers/page-objects/_keyboard';

export const tableSelectors = {
  contextalMenu: `.${ClassName.CONTEXTUAL_MENU_BUTTON}`,
  hoverdCell: `.ProseMirror table .${ClassName.HOVERED_CELL}`,
  firstRowControl: `.${ClassName.ROW_CONTROLS_BUTTON_WRAP}:nth-child(1) button`,
  firstColumnControl: `.${
    ClassName.COLUMN_CONTROLS_BUTTON_WRAP
  }:nth-child(1) button`,
  lastRowControl: `.${ClassName.ROW_CONTROLS_BUTTON_WRAP}:nth-child(3) button`,
  lastColumnControl: `.${
    ClassName.COLUMN_CONTROLS_BUTTON_WRAP
  }:nth-child(3) button`,
  rowControlSelector: ClassName.ROW_CONTROLS_BUTTON_WRAP,
  columnControlSelector: ClassName.COLUMN_CONTROLS_BUTTON_WRAP,
  deleteRowColumnSelector: `.${ClassName.CONTROLS_DELETE_BUTTON_WRAP} .${
    ClassName.CONTROLS_DELETE_BUTTON
  }`,
  rowControls: ClassName.ROW_CONTROLS_WRAPPER,
  columnControls: ClassName.COLUMN_CONTROLS_WRAPPER,
  insertColumnButton: `.${ClassName.CONTROLS_INSERT_COLUMN}`,
  insertRowButton: `.${ClassName.CONTROLS_INSERT_ROW}`,
  cornerButton: `.${ClassName.CONTROLS_CORNER_BUTTON}`,
  mergeCellsText: 'Merge cells',
  splitCellText: 'Split cell',
  tableOptionsText: `Table options`,
  removeRowButton: `button[title="Remove row"]`,
  removeColumnButton: `button[title="Remove column"]`,
  removeDanger: '.ProseMirror table .danger',
  removeTable: `button[aria-label="Remove"]`,
  selectedCell: `.ProseMirror table .${ClassName.SELECTED_CELL}`,
  topLeftCell: ClassName.TOP_LEFT_CELL,
  wideState: `.ProseMirror table[data-layout="wide"]`,
  fullwidthState: `.ProseMirror table[data-layout="full-width"]`,
  defaultState: `.ProseMirror table[data-layout="center"]`,
  fullwidthSelector: `div[aria-label="Full width"]`,
  wideSelector: `div[aria-label="Wide"]`,
  defaultSelector: `div[aria-label="Center"]`,
  tableTd: 'table td p',
  tableTh: 'table th p',
};
// insert table from menu
export const insertTable = async page => {
  await clickToolbarMenu(page, ToolbarMenuItem.table);
  await page.waitForSelector(tableSelectors.tableTd);
  await page.click(tableSelectors.tableTh);
};

// click into first cell on table
export const clickFirstCell = async page => {
  await page.waitForSelector(tableSelectors.topLeftCell);
  await page.click(tableSelectors.topLeftCell);
};

// table floating toolbar interactions
export const clickTableOptions = async page => {
  await clickElementWithText({
    page,
    tag: 'span',
    text: tableSelectors.tableOptionsText,
  });
};

export const clickCellOptions = async page => {
  await page.waitForSelector(tableSelectors.contextalMenu);
  await page.click(tableSelectors.contextalMenu);
};

export const selectCellOption = async (page, option) => {
  await page.waitForSelector(tableSelectors.contextalMenu);
  await page.click(tableSelectors.contextalMenu);
  await clickElementWithText({ page, tag: 'span', text: option });
};

// support for table layout
export const setTableLayoutWide = async page => {
  await page.waitForSelector(tableSelectors.wideSelector);
  await page.click(tableSelectors.wideSelector);
  await page.waitForSelector(tableSelectors.wideState);
};

export const setTableLayoutFullWidth = async page => {
  await setTableLayoutWide(page);
  await page.click(tableSelectors.fullwidthSelector);
  await page.waitForSelector(tableSelectors.fullwidthState);
};

export const resetTableLayoutDefault = async page => {
  await page.waitForSelector(tableSelectors.defaultSelector);
  await page.click(tableSelectors.defaultSelector);
  await page.waitForSelector(tableSelectors.defaultState);
};

export const setTableLayout = async (page, layout) => {
  if (layout === 'wide') {
    await setTableLayoutWide(page);
  } else if (layout === 'full-width') {
    await setTableLayoutFullWidth(page);
  }
};

export const insertRow = async (page, atIndex: number) => {
  const buttonWrapSelector = ClassName.ROW_CONTROLS_BUTTON_WRAP;
  const insertSelector = ClassName.CONTROLS_INSERT_ROW;
  await insertRowOrColumn(page, buttonWrapSelector, insertSelector, atIndex);
};

export const insertColumn = async (page, atIndex: number) => {
  const buttonWrapSelector = ClassName.COLUMN_CONTROLS_BUTTON_WRAP;
  const insertSelector = ClassName.CONTROLS_INSERT_COLUMN;
  await insertRowOrColumn(page, buttonWrapSelector, insertSelector, atIndex);
};

export const insertRowOrColumn = async (
  page,
  buttonWrapSelector,
  insertSelector,
  atIndex: number,
) => {
  await clickFirstCell(page);
  const buttonSelector = `.${buttonWrapSelector}:nth-child(${atIndex}) .${insertSelector}`;
  await page.hover(buttonSelector);
  await page.waitForSelector(buttonSelector);
  await page.click(buttonSelector);
};

export const deleteRow = async (page, atIndex) => {
  const typeWrapperSelector = ClassName.ROW_CONTROLS_WRAPPER;
  await deleteRowOrColumn(page, typeWrapperSelector, atIndex);
};

export const deleteColumn = async (page, atIndex) => {
  const typeWrapperSelector = ClassName.COLUMN_CONTROLS_WRAPPER;
  await deleteRowOrColumn(page, typeWrapperSelector, atIndex);
};

export const deleteRowOrColumn = async (page, typeWrapperSelector, atIndex) => {
  const controlSelector = `.${typeWrapperSelector} .${
    ClassName.CONTROLS_BUTTON
  }:nth-child(${atIndex})`;
  const deleteButtonSelector = `.${ClassName.CONTROLS_DELETE_BUTTON_WRAP} .${
    ClassName.CONTROLS_DELETE_BUTTON
  }`;
  await clickFirstCell(page);
  await page.click(controlSelector);
  await page.hover(deleteButtonSelector);
  await page.waitForSelector(deleteButtonSelector);
  await page.click(deleteButtonSelector);
};

export const deleteTableCell = async (page, typeWrapperSelector, atIndex) => {
  const controlSelector = `.${typeWrapperSelector} ${
    ClassName.CONTROLS_BUTTON
  }:nth-child(${atIndex})`;

  await page.waitForSelector(controlSelector);
  await page.click(controlSelector);
  await page.hover(tableSelectors.deleteRowColumnSelector);
  await page.waitForSelector(tableSelectors.deleteRowColumnSelector);
  await page.click(tableSelectors.deleteRowColumnSelector);
};

type CellSelectorOpts = {
  row: number;
  cell?: number;
  cellType?: 'td' | 'th';
};

export const getSelectorForTableCell = ({
  row,
  cell,
  cellType = 'td',
}: CellSelectorOpts) => {
  const rowSelector = `table tr:nth-child(${row})`;
  if (!cell) {
    return rowSelector;
  }

  return `${rowSelector} > ${cellType}:nth-child(${cell})`;
};

export const splitCells = async (page, selector) => {
  await page.click(selector);
  await clickCellOptions(page);
  await selectCellOption(page, tableSelectors.splitCellText);
};

export const mergeCells = async (page, firstCell, lastCell) => {
  await page.click(firstCell);
  await pressKey(page, KeyboardKeys.shift);
  await page.click(lastCell);
  await pressKeyup(page, KeyboardKeys.shift);
  await page.waitForSelector(tableSelectors.selectedCell);
  await clickCellOptions(page);
  await selectCellOption(page, tableSelectors.mergeCellsText);
};

export const getSelectorForTableControl = (type, atIndex?: number) => {
  let selector = `.pm-table-${type}-controls__button-wrap`;
  if (atIndex) {
    selector += `:nth-child(${atIndex})`;
  }

  return selector;
};

type ResizeColumnOpts = {
  colIdx: number;
  amount: number;
  // Useful if a row has a colspan and you need resize a col it spans over.
  row?: number;
};

export const resizeColumn = async (
  page,
  { colIdx, amount, row = 1 }: ResizeColumnOpts,
) => {
  let cell = await getBoundingRect(
    page,
    getSelectorForTableCell({ row, cell: colIdx }),
  );

  const columnEndPosition = cell.left + cell.width;

  // Move to the right edge of the cell.
  await page.mouse.move(columnEndPosition, cell.top);

  // Resize
  await page.mouse.down();
  await page.mouse.move(columnEndPosition + amount, cell.top);
  await page.mouse.up();
};
