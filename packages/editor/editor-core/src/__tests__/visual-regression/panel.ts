import { initFullPageEditorWithAdf, initCommentEditorWithAdf, snapshot, deviceViewPorts } from './_utils';
import * as panel from './__fixtures__/panel-adf.json';

describe('Panel overflow:', () => {
  let page;
  beforeAll(() => {
    // @ts-ignore
    page = global.page;
  })
  it('looks correct for laptopMDPI', async () => {
    await page.setViewport(deviceViewPorts.LaptopMDPI);
    await initFullPageEditorWithAdf(page, panel);
    await snapshot(page);
  });

  it('looks correct for ipad', async () => {
    await page.setViewport(deviceViewPorts.iPad);
    await initFullPageEditorWithAdf(page, panel);
    await snapshot(page);
  });

  it('looks correct for iphone', async () => {
    await page.setViewport(deviceViewPorts.iPhonePlus);
    await initFullPageEditorWithAdf(page, panel);
    await snapshot(page);
  });

  it('looks correct for LaptopMDPI in comment mode', async () => {
    await page.setViewport(deviceViewPorts.LaptopMDPI);
    await initCommentEditorWithAdf(page, panel);
    await snapshot(page);
  });

});
