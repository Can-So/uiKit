import { Device, initFullPageEditorWithAdf, snapshot } from '../_utils';

import {
  clickCellOptions,
  getSelectorForTableCell,
  insertTable,
  selectCellOption,
  tableSelectors,
} from '../../__helpers/page-objects/_table';
import {
  pressKey,
  pressKeyup,
  KeyboardKeys,
} from '../../__helpers/page-objects/_keyboard';
import * as adf from '../__fixtures__/noData-adf.json';

describe('Table context menu:', () => {
  let page;
  let firstCellSelector = getSelectorForTableCell({
    row: 1,
    cell: 1,
    cellType: 'th',
  });
  let lastCellSelector = getSelectorForTableCell({ row: 3, cell: 1 });

  const tableAction = async () => {
    await page.click(firstCellSelector);
    await pressKey(page, KeyboardKeys.shift);
    await page.click(lastCellSelector);
    await pressKeyup(page, KeyboardKeys.shift);
    await page.waitForSelector(tableSelectors.selectedCell);
    await clickCellOptions(page);
    await snapshot(page, 0.04);
    await selectCellOption(page, tableSelectors.mergeCellsText);
    await snapshot(page, 0.04);
    await page.waitForSelector(firstCellSelector);
    await page.click(firstCellSelector);
    await clickCellOptions(page);
    await snapshot(page, 0.04);
    await selectCellOption(page, tableSelectors.splitCellText);
    await snapshot(page, 0.04);
  };

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  beforeEach(async () => {
    await initFullPageEditorWithAdf(page, adf, Device.LaptopHiDPI);
    await insertTable(page);
  });

  it(`should merge and split cell for row`, async () => {
    await tableAction();
  });

  it(`should merge and split cell for column`, async () => {
    firstCellSelector = getSelectorForTableCell({ row: 2, cell: 1 });
    lastCellSelector = getSelectorForTableCell({ row: 2, cell: 3 });
    await tableAction();
  });

  it(`should merge and split cell for row+col`, async () => {
    firstCellSelector = getSelectorForTableCell({ row: 2, cell: 1 });
    lastCellSelector = getSelectorForTableCell({ row: 3, cell: 2 });
    await tableAction();
  });
});
