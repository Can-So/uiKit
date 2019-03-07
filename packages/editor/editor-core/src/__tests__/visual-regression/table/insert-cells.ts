import { snapshot, initFullPageEditorWithAdf, Device } from '../_utils';
import * as adf from './__fixtures__/default-table.adf.json';
import {
  insertRow,
  insertColumn,
  tableSelectors,
  clickFirstCell,
} from '../../__helpers/page-objects/_table';
import { animationFrame } from '../../__helpers/page-objects/_editor';

describe('Snapshot Test: table insert/delete', () => {
  let page;
  const tolerance = 0.01;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  beforeEach(async () => {
    await initFullPageEditorWithAdf(page, adf, Device.LaptopHiDPI);
    await clickFirstCell(page);
  });

  afterEach(async () => {
    await snapshot(page, tolerance);
  });

  // adding tolerance since tool tips can show from time to time
  it(`should be able insert after first row`, async () => {
    await page.waitForSelector(tableSelectors.firstRowControl);
    await page.hover(tableSelectors.firstRowControl);
    await page.waitForSelector(tableSelectors.hoverdCell);
  });

  it(`should be able insert after last row`, async () => {
    await page.waitForSelector(tableSelectors.firstRowControl);
    await page.hover(tableSelectors.lastRowControl);
    await page.waitForSelector(tableSelectors.hoverdCell);
  });

  // TODO: measure how flaky this is
  it(`should be able insert after first column`, async () => {
    await page.waitForSelector(tableSelectors.removeTable);
    await animationFrame(page);
    await page.waitForSelector(tableSelectors.firstColumnControl);
    await page.hover(tableSelectors.firstColumnControl);
    await page.waitForSelector(tableSelectors.hoverdCell);
  });

  // TODO: move this to integration tests in future
  it(`should be able to insert row`, async () => {
    await insertRow(page, 1);
  });

  // TODO: move this to integration tests in future
  it(`should be able to insert column`, async () => {
    await insertColumn(page, 1);
  });
});
