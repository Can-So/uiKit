import { initFullPageEditorWithAdf, Device, snapshot } from '../_utils';
import * as adf from './__fixtures__/columns.adf.json';
import {
  clickOnColumn,
  scrollToColumn,
} from '../../__helpers/page-objects/_columns';
import { Page } from '../../__helpers/page-objects/_types';

describe('Columns:', () => {
  let page: Page;
  beforeEach(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, adf, Device.LaptopHiDPI);
  });

  it('should show breakout', async () => {
    const columnNumber = 1;
    await clickOnColumn(page, columnNumber);

    await snapshot(page);
  });

  it('should place breakout at the start/end of the scroll', async () => {
    const columnNumber = 1;
    const offset = 100;

    await clickOnColumn(page, columnNumber);
    await scrollToColumn(page, columnNumber, offset);

    await snapshot(page);
  });
});
