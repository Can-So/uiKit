import { initFullPageEditorWithAdf, snapshot, Device } from '../_utils';
import { selectors } from '../../__helpers/page-objects/_editor';
import * as col2 from './__fixtures__/column2-adf.json';
import * as col3 from './__fixtures__/column3-adf.json';

describe('Layouts:', () => {
  let page;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  afterEach(async () => {
    await snapshot(page, 0.02);
  });

  describe('2 columns', () => {
    it('should correctly render layout on MDPI', async () => {
      await initFullPageEditorWithAdf(page, col2, Device.LaptopMDPI);
    });

    it('should stack layout on smaller ipad', async () => {
      await initFullPageEditorWithAdf(page, col2, Device.iPad);
      await page.click(selectors.layoutDataSection);
    });

    it('should stack layout on smaller iPhone', async () => {
      await initFullPageEditorWithAdf(page, col2, Device.iPhonePlus);
      await page.click(selectors.layoutDataSection);
    });
  });

  describe('3 columns', () => {
    it('should correctly render layout', async () => {
      await initFullPageEditorWithAdf(page, col3, Device.LaptopMDPI);
      await page.click(selectors.layoutDataSection);
    });

    it('should stack layout on smaller screen sizes', async () => {
      await initFullPageEditorWithAdf(page, col3, Device.iPhonePlus);
      await page.click(selectors.layoutDataSection);
    });
  });
});
