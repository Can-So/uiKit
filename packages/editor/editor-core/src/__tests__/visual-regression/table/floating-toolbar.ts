import { snapshot, initFullPageEditorWithAdf } from '../_utils';
import { insertTable } from '../_pageObjects';
import * as adf from '../__fixtures__/noData-adf.json';
import {
  clickOnCellOption,
  clickTableOptions,
  clickOnCellOptions,
  getSelectorForTableCell,
} from './_table-utils';

describe('Table floating toolbar:', () => {
  let page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, adf);
    await insertTable(page);
  });

  it('display options', async () => {
    // Remove default header row styling
    await clickTableOptions(page);
    await snapshot(page);
    // Add header row and column options
  });

  it('display cell options', async () => {
    // Remove default header row styling
    await getSelectorForTableCell({ row: 2, cell: 2 });
    await clickOnCellOptions(page);
    await snapshot(page);
    // Add header row and column options
  });

  it('display cell background', async () => {
    await getSelectorForTableCell({ row: 2, cell: 2 });
    await clickOnCellOption(page, 'Cell background');
    await snapshot(page);
  });
});
