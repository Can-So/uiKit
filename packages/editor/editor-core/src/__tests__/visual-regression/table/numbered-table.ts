import {
  snapshot,
  initFullPageEditorWithAdf,
  Device,
  initCommentEditorWithAdf,
} from '../_utils';
import { getSelectorForTableCell } from '../../__helpers/page-objects/_table';
import * as adf from './__fixtures__/numbered-table.adf.json';

describe.skip('Snapshot Test: numbered table', () => {
  let page: any;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  afterEach(async () => {
    await snapshot(page);
  });

  it(`looks correct at LaptopMDPI for fullpage`, async () => {
    await initFullPageEditorWithAdf(page, adf, Device.LaptopMDPI);
    await page.click(getSelectorForTableCell({ row: 1, cell: 1 }));
  });

  it(`looks correct at iPadPro for fullpage`, async () => {
    await initFullPageEditorWithAdf(page, adf, Device.iPadPro);
    await page.click(getSelectorForTableCell({ row: 1, cell: 1 }));
  });

  it(`looks correct at LaptopMDPI for comment`, async () => {
    await initCommentEditorWithAdf(page, adf, Device.LaptopMDPI);
    await page.click(getSelectorForTableCell({ row: 1, cell: 1 }));
  });
});
