import { snapshot, initFullPageEditorWithAdf } from '../_utils';
import * as adf from './__fixtures__/default-table.adf.json';
import {
  clickFirstCell,
  clickTableOptions,
  clickCellOptions,
  getSelectorForTableCell,
  selectCellOption,
} from '../../__helpers/page-objects/_table';

// Unskip in ED-6470
describe.skip('Table floating toolbar:fullpage', () => {
  let page: any;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, adf);
    await clickFirstCell(page);
  });

  afterEach(async () => {
    await snapshot(page);
  });

  it('display options', async () => {
    await clickTableOptions(page);
  });

  it('display cell options', async () => {
    await getSelectorForTableCell({ row: 2, cell: 2 });
    await clickCellOptions(page);
  });

  it('display cell background', async () => {
    await getSelectorForTableCell({ row: 2, cell: 2 });
    await selectCellOption(page, 'Cell background');
  });
});
