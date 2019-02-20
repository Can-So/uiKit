import {
  initFullPageEditorWithAdf,
  snapshot,
  deviceViewPorts,
} from '../_utils';
import * as adf from '../__fixtures__/code-block-adf.json';

describe('Code breakout:', () => {
  it('looks correct', async () => {
    // @ts-ignore
    const page = global.page;
    await page.setViewport(deviceViewPorts.LaptopMDPI);
    await initFullPageEditorWithAdf(page, adf);
    await snapshot(page);
  });
});
