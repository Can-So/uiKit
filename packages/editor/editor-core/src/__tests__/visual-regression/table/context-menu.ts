import {
  snapshot,
  initFullPageEditorWithAdf,
  deviceViewPorts,
} from '../_utils';

import {
  clickOnCellOption,
  getSelectorForTableCell,
  clickOnCellOptions,
} from './_table-utils';
import { TableCssClassName as ClassName } from '../../../plugins/table/types';
import { insertTable } from '../_pageObjects';
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
    await page.keyboard.down('Shift');
    await page.click(lastCellSelector);
    await page.keyboard.up('Shift');
    await page.waitForSelector(
      `.ProseMirror table .${ClassName.SELECTED_CELL}`,
    );
    await clickOnCellOptions(page);
    await snapshot(page);
    await clickOnCellOption(page, 'Merge cells');
    await snapshot(page);
    await page.click(firstCellSelector);
    await clickOnCellOptions(page);
    await snapshot(page);
    await clickOnCellOption(page, 'Split cell');
    await snapshot(page);
  };
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  beforeEach(async () => {
    await page.setViewport(deviceViewPorts.LaptopHiDPI);
    await initFullPageEditorWithAdf(page, adf);
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
