import {
  snapshot,
  initFullPageEditorWithAdf,
  initCommentEditorWithAdf,
} from '../_utils';
import * as adf from '../__fixtures__/noData-adf.json';
import {
  clickTableOptions,
  clickCellOptions,
  getSelectorForTableCell,
  insertTable,
  selectCellOption,
} from '../../__helpers/page-objects/_table';

describe('Table floating toolbar:fullpage', () => {
  let page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, adf);
    await insertTable(page);
  });

  it('display options', async () => {
    await clickTableOptions(page);
    await snapshot(page);
  });

  it('display cell options', async () => {
    await getSelectorForTableCell({ row: 2, cell: 2 });
    await clickCellOptions(page);
    await snapshot(page);
  });

  it('display cell background', async () => {
    await getSelectorForTableCell({ row: 2, cell: 2 });
    await selectCellOption(page, 'Cell background');
    await snapshot(page);
  });
});

describe('Table floating toolbar:comment', () => {
  let page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initCommentEditorWithAdf(page, adf);
    await insertTable(page);
  });

  it('display options', async () => {
    await clickTableOptions(page);
    await snapshot(page);
  });

  it('display cell options', async () => {
    await getSelectorForTableCell({ row: 2, cell: 2 });
    await clickCellOptions(page);
    await snapshot(page);
  });

  it('display cell background', async () => {
    await getSelectorForTableCell({ row: 2, cell: 2 });
    await selectCellOption(page, 'Cell background');
    await snapshot(page);
  });
});
