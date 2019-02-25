import { Device, initFullPageEditorWithAdf, snapshot } from '../_utils';

import {
  clickCellOptions,
  getSelectorForTableCell,
  selectCellOption,
  tableSelectors,
  clickFirstCell,
} from '../../__helpers/page-objects/_table';
import {
  pressKey,
  pressKeyup,
  KeyboardKeys,
} from '../../__helpers/page-objects/_keyboard';
import * as adf from './__fixtures__/default-table.adf.json';

describe('Table context menu:', () => {
  let page;

  const tableMergeAndSplitCells = async (firstCell, lastCell) => {
    await page.click(firstCell);
    await pressKey(page, KeyboardKeys.shift);
    await page.click(lastCell);
    await pressKeyup(page, KeyboardKeys.shift);
    await page.waitForSelector(tableSelectors.selectedCell);
    await clickCellOptions(page);
    await snapshot(page, 0.04);
    await selectCellOption(page, tableSelectors.mergeCellsText);
    await snapshot(page, 0.04);
    await page.waitForSelector(firstCell);
    await page.click(firstCell);
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
    await clickFirstCell(page);
  });

  it(`should merge and split cell for row`, async () => {
    const firstCell = getSelectorForTableCell({
      row: 1,
      cell: 1,
      cellType: 'th',
    });
    let lastCell = getSelectorForTableCell({ row: 3, cell: 1 });
    await tableMergeAndSplitCells(firstCell, lastCell);
  });

  it(`should merge and split cell for column`, async () => {
    const firstCell = getSelectorForTableCell({ row: 2, cell: 1 });
    const lastCell = getSelectorForTableCell({ row: 2, cell: 3 });
    await tableMergeAndSplitCells(firstCell, lastCell);
  });

  it(`should merge and split cell for row+col`, async () => {
    const firstCell = getSelectorForTableCell({ row: 2, cell: 1 });
    const lastCell = getSelectorForTableCell({ row: 3, cell: 2 });
    await tableMergeAndSplitCells(firstCell, lastCell);
  });
});
