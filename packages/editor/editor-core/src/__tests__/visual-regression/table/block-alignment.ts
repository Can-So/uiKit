import {
  Device,
  snapshot,
  initFullPageEditorWithAdf,
  initCommentEditorWithAdf,
} from '../_utils';
import * as adf from './__fixtures__/table-with-blocks.adf.json';
import {
  setTableLayout,
  getSelectorForTableCell,
} from '../../__helpers/page-objects/_table';

describe('Table with block looks correct for fullpage:', () => {
  let page;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  afterEach(async () => {
    await snapshot(page, 0.01);
  });

  it('default layout ', async () => {
    await initFullPageEditorWithAdf(page, adf, Device.LaptopMDPI);
    await page.click(getSelectorForTableCell({ row: 4, cell: 1 }));
  });

  it('wide layout ', async () => {
    await initFullPageEditorWithAdf(page, adf, Device.LaptopMDPI);
    await page.click(getSelectorForTableCell({ row: 4, cell: 1 }));
    await setTableLayout(page, 'wide');
  });

  it('full-width layout ', async () => {
    await initFullPageEditorWithAdf(page, adf, Device.LaptopHiDPI);
    await page.click(getSelectorForTableCell({ row: 4, cell: 1 }));
    await setTableLayout(page, 'full-width');
  });
});

describe('Table with block looks correct for comment:', () => {
  let page;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  afterEach(async () => {
    await snapshot(page, 0.01);
  });

  it('default layout ', async () => {
    await initCommentEditorWithAdf(page, adf, Device.LaptopMDPI);
    await page.click(getSelectorForTableCell({ row: 4, cell: 1 }));
  });
});
