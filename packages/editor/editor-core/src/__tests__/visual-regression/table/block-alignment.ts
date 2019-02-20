import {
  snapshot,
  initFullPageEditorWithAdf,
  deviceViewPorts,
} from '../_utils';
import * as adf from './__fixtures__/table-with-blocks.adf.json';
import { setTableLayout, getSelectorForTableCell } from './_table-utils';

describe('Table with block looks correct for:', () => {
  let page;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  it('default layout ', async () => {
    await page.setViewport(deviceViewPorts.LaptopMDPI);
    await initFullPageEditorWithAdf(page, adf);
    await page.click(getSelectorForTableCell({ row: 4, cell: 1 }));
    await snapshot(page);
  });

  it('wide layout ', async () => {
    await page.setViewport(deviceViewPorts.LaptopMDPI);
    await initFullPageEditorWithAdf(page, adf);
    await page.click(getSelectorForTableCell({ row: 4, cell: 1 }));
    await setTableLayout(page, 'wide');
    await snapshot(page);
  });

  it('full-width layout ', async () => {
    await page.setViewport(deviceViewPorts.LaptopHiDPI);
    await initFullPageEditorWithAdf(page, adf);
    await page.click(getSelectorForTableCell({ row: 4, cell: 1 }));
    await setTableLayout(page, 'full-width');
    await snapshot(page);
  });
});
