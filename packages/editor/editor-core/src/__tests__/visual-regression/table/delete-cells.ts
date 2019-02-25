import { snapshot, initFullPageEditorWithAdf, Device } from '../_utils';
import * as adf from './__fixtures__/full-width-table.adf.json';
import {
  tableSelectors,
  clickFirstCell,
} from '../../__helpers/page-objects/_table';

describe('Delete in table:', () => {
  let page;

  const clickandSnapshot = async (page, selector) => {
    await page.click(selector);
    await page.waitForSelector(tableSelectors.tableTd);
    await snapshot(page);
  };
  describe(`Full page`, () => {
    beforeAll(async () => {
      // @ts-ignore
      page = global.page;
    });

    beforeEach(async () => {
      await initFullPageEditorWithAdf(page, adf, Device.LaptopHiDPI);
      await clickFirstCell(page);
    });

    // TODO: write table delete in integration test
    it(`remove first row buttons in full width layout mode`, async () => {
      await page.waitForSelector(tableSelectors.firstRowControl);
      await page.click(tableSelectors.firstRowControl);
      await page.hover(tableSelectors.removeRowButton);
      await page.waitForSelector(tableSelectors.removeDanger);
      await snapshot(page);
      await clickandSnapshot(page, tableSelectors.removeRowButton);
    });

    // TODO: make it faster load with full-width-adf and doing too may things
    it(`remove first column buttons in full width layout mode`, async () => {
      await page.waitForSelector(tableSelectors.firstRowControl);
      await page.click(tableSelectors.firstColumnControl);
      await snapshot(page);
      await page.hover(tableSelectors.removeColumnButton);
      await page.waitForSelector(tableSelectors.removeDanger);
      await snapshot(page);
      await clickandSnapshot(page, tableSelectors.removeColumnButton);
    });

    it(`remove last column buttons in full width layout mode`, async () => {
      await page.waitForSelector(tableSelectors.firstRowControl);
      await page.click(tableSelectors.lastColumnControl);
      await page.hover(tableSelectors.removeColumnButton);
      await page.waitForSelector(tableSelectors.removeDanger);
      await snapshot(page);
      await clickandSnapshot(page, tableSelectors.removeColumnButton);
    });

    it(`remove table button selection`, async () => {
      await page.waitForSelector(tableSelectors.removeTable);
      await page.hover(tableSelectors.removeTable);
      await page.waitForSelector(tableSelectors.removeDanger);
      await snapshot(page);
    });
  });
});
