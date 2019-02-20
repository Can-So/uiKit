import {
  snapshot,
  initFullPageEditorWithAdf,
  deviceViewPorts,
  initCommentEditorWithAdf,
} from '../_utils';
import { getSelectorForTableCell } from './_table-utils';
import * as adf from './__fixtures__/numbered-table.adf.json';

describe('Snapshot Test: numbered table', () => {
  let page;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  it(`looks correct at LaptopMDPI for fullpage`, async () => {
    await page.setViewport(deviceViewPorts.LaptopMDPI);
    await initFullPageEditorWithAdf(page, adf);
    await page.click(getSelectorForTableCell({ row: 1, cell: 1 }));
    await snapshot(page);
  });

  it(`looks correct at iPadPro for fullpage`, async () => {
    await page.setViewport(deviceViewPorts.iPadPro);
    await initFullPageEditorWithAdf(page, adf);
    await page.click(getSelectorForTableCell({ row: 1, cell: 1 }));
    await snapshot(page);
  });

  it(`looks correct at LaptopMDPI for comment`, async () => {
    await page.setViewport(deviceViewPorts.LaptopMDPI);
    await initCommentEditorWithAdf(page, adf);
    await page.click(getSelectorForTableCell({ row: 1, cell: 1 }));
    await snapshot(page);
  });
});
