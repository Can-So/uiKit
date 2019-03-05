import { initFullPageEditorWithAdf, snapshot, Device } from '../_utils';
import * as gapcursor from './__fixtures__/gap-cursor-adf.json';
import { selectors } from '../../__helpers/page-objects/_editor';
import { pressKey, KeyboardKeys } from '../../__helpers/page-objects/_keyboard';

describe('Gap cursor:', () => {
  let page;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, gapcursor, Device.LaptopMDPI);
  });

  afterEach(async () => {
    const threshold = 0.005;
    await snapshot(page, threshold);
  });

  it('should render gap cursor for code when ArrowRight', async () => {
    await page.click(selectors.codeContent);
    await pressKey(page, KeyboardKeys.arrowRight);
    await page.waitForSelector(selectors.gapCursor);
  });

  it(' should render gap cursor on panel when ArrowLeft', async () => {
    await page.click(selectors.panelContent);
    await pressKey(page, KeyboardKeys.arrowLeft);
    await page.waitForSelector(selectors.gapCursor);
  });

  it(' should render gap cursor on table on ArrowUp', async () => {
    await page.click(selectors.panelContent);
    await pressKey(page, KeyboardKeys.arrowLeft);
    await pressKey(page, KeyboardKeys.arrowUp);
    await page.waitForSelector(selectors.gapCursor);
  });

  it(' should render gap cursor on table on ArrowDown', async () => {
    await page.click(selectors.codeContent);
    await pressKey(page, KeyboardKeys.arrowRight);
    await pressKey(page, KeyboardKeys.arrowDown);
    await page.waitForSelector(selectors.gapCursor);
  });
});
