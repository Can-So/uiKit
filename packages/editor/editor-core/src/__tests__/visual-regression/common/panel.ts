import {
  initFullPageEditorWithAdf,
  initCommentEditorWithAdf,
  snapshot,
  Device,
} from '../_utils';
import * as panel from './__fixtures__/panel-adf.json';

describe('Panel overflow:', () => {
  let page;
  const maxThreshold = 0.055;

  beforeAll(() => {
    // @ts-ignore
    page = global.page;
  });
  it('looks correct for laptopMDPI', async () => {
    await initFullPageEditorWithAdf(page, panel, Device.LaptopMDPI);
    await snapshot(page, maxThreshold);
  });

  it('looks correct for ipad', async () => {
    await initFullPageEditorWithAdf(page, panel, Device.iPad);
    await snapshot(page, maxThreshold);
  });

  it('looks correct for iphone', async () => {
    await initFullPageEditorWithAdf(page, panel, Device.iPhonePlus);
    await snapshot(page, maxThreshold);
  });

  it('looks correct for LaptopMDPI in comment mode', async () => {
    await initCommentEditorWithAdf(page, panel, Device.LaptopMDPI);
    await snapshot(page, maxThreshold);
  });
});
