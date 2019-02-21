import {
  initFullPageEditorWithAdf,
  initCommentEditorWithAdf,
  snapshot,
  Device,
} from '../_utils';
import * as panel from './__fixtures__/panel-adf.json';

describe('Panel overflow:', () => {
  let page;
  beforeAll(() => {
    // @ts-ignore
    page = global.page;
  });
  it('looks correct for laptopMDPI', async () => {
    await initFullPageEditorWithAdf(page, panel, Device.LaptopMDPI);
    await snapshot(page, 0.02);
  });

  it('looks correct for ipad', async () => {
    await initFullPageEditorWithAdf(page, panel, Device.iPad);
    await snapshot(page, 0.04);
  });

  it('looks correct for iphone', async () => {
    await initFullPageEditorWithAdf(page, panel, Device.iPhonePlus);
    await snapshot(page, 0.04);
  });

  it('looks correct for LaptopMDPI in comment mode', async () => {
    await initCommentEditorWithAdf(page, panel, Device.LaptopMDPI);
    await snapshot(page, 0.02);
  });
});
