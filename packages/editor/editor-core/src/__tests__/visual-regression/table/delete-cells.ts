import { snapshot, initFullPageEditorWithAdf, Device } from '../_utils';
import * as adf from './__fixtures__/full-width-table.adf.json';
import {
  tableSelectors,
  clickFirstCell,
} from '../../__helpers/page-objects/_table';

import { animationFrame } from '../../__helpers/page-objects/_editor';

describe('Delete in table:', () => {
  let page;

  describe(`Full page`, () => {
    const threshold = 0.01;
    beforeAll(async () => {
      // @ts-ignore
      page = global.page;
    });

    beforeEach(async () => {
      await initFullPageEditorWithAdf(page, adf, Device.LaptopHiDPI);
      await clickFirstCell(page);
      await animationFrame(page);
    });

    afterEach(async () => {
      await snapshot(page, threshold);
    });

    it('should show danger when hovers on remove for row', async () => {
      await page.waitForSelector(tableSelectors.firstRowControl);
      await page.click(tableSelectors.firstRowControl);
      await page.waitForSelector(tableSelectors.removeRowButton);
      await page.hover(tableSelectors.removeRowButton);
      await page.waitForSelector(tableSelectors.removeDanger);
    });

    it(`should show danger when hovers on remove for column`, async () => {
      await page.waitForSelector(tableSelectors.firstColumnControl);
      await page.click(tableSelectors.firstColumnControl);
      await page.waitForSelector(tableSelectors.removeColumnButton);
      await page.hover(tableSelectors.removeColumnButton);
      await page.waitForSelector(tableSelectors.removeDanger);
    });

    it(`should show danger when hovers to remove table`, async () => {
      await page.waitForSelector(tableSelectors.removeTable);
      await page.hover(tableSelectors.removeTable);
      await page.waitForSelector(tableSelectors.removeDanger);
    });
  });
});
