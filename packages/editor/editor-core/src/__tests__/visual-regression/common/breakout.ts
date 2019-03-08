import { initFullPageEditorWithAdf, Device, snapshot } from '../_utils';
import { KeyboardKeys } from '../../__helpers/page-objects/_keyboard';
import * as adf from './__fixtures__/columns.adf.json';

describe.skip('Snapshot Test: Popup', () => {
  it('placement: start,end is correct on scroll', async () => {
    // @ts-ignore
    const page = global.page;
    await initFullPageEditorWithAdf(page, adf, Device.LaptopHiDPI);
    await page.click('div[data-layout-column] > p');
    await snapshot(page);
    for (let _i of Array.from({ length: 40 })) {
      await page.keyboard.press(KeyboardKeys.arrowDown);
    }
    await page.click('div[data-layout-column] > p');
    await snapshot(page);
  });
});
