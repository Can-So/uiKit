import {
  snapshot,
  initFullPageEditorWithAdf,
  deviceViewPorts,
} from '../_utils';
import * as adf from './__fixtures__/table-with-blocks.adf.json';

describe('Table with block:', () => {
  let page;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  it('default layout ', async () => {
    // @ts-ignore
    const page = global.page;
    await page.setViewport(deviceViewPorts.LaptopMDPI);
    await initFullPageEditorWithAdf(page, adf);
    await snapshot(page);
  });

  it('default layout ', async () => {
    // @ts-ignore
    const page = global.page;
    await page.setViewport(deviceViewPorts.LaptopMDPI);
    await initFullPageEditorWithAdf(page, adf);
    await snapshot(page);
  });
});
