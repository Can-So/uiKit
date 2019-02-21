import { snapshot, initFullPageEditorWithAdf, Device } from '../_utils';
import * as adf from '../common/__fixtures__/noData-adf.json';
import {
  insertRow,
  insertColumn,
  insertTable,
  tableSelectors,
} from '../../__helpers/page-objects/_table';

describe('Snapshot Test: table insert/delete', () => {
  let page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  beforeEach(async () => {
    await initFullPageEditorWithAdf(page, adf, Device.LaptopHiDPI);
    await insertTable(page);
  });

  // adding tolerance since tool tips can show from time to time
  it(`should be able insert after first row`, async () => {
    await page.hover(tableSelectors.firstRowControl);
    await page.waitForSelector(tableSelectors.hoverdCell);
    await snapshot(page, 0.01);
  });

  it(`should be able insert after last row`, async () => {
    await page.hover(tableSelectors.lastRowControl);
    await page.waitForSelector(tableSelectors.hoverdCell);
    await snapshot(page, 0.01);
  });

  it(`should be able insert after first column`, async () => {
    await page.hover(tableSelectors.firstColumnControl);
    await page.waitForSelector(tableSelectors.hoverdCell);
    await snapshot(page, 0.01);
  });

  // TODO: move this to integration tests in future
  it(`should be able to insert row`, async () => {
    await insertRow(page, 1);
    await snapshot(page, 0.01);
  });

  // TODO: move this to integration tests in future
  it(`should be able to insert column`, async () => {
    await insertColumn(page, 1);
    await snapshot(page, 0.01);
  });
});
