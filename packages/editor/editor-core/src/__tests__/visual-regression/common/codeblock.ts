import { initFullPageEditorWithAdf, snapshot, Device } from '../_utils';
import * as adf from './__fixtures__/code-block-adf.json';
import { selectors } from '../../__helpers/page-objects/_editor';

// https://product-fabric.atlassian.net/browse/ED-6434
describe.skip('Code breakout:', () => {
  it('looks correct', async () => {
    // @ts-ignore
    const page = global.page;
    await initFullPageEditorWithAdf(page, adf, Device.LaptopMDPI);
    await page.waitForSelector(selectors.codeContent);
    await page.click(selectors.codeContent);
    await snapshot(page, 0.001);
  });
});
