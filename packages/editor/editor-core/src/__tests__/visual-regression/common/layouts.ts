import {
  initFullPageEditorWithAdf,
  snapshot,
  deviceViewPorts,
} from '../_utils';
import * as pageObject from '../_pageObjects';
import * as col2 from '../__fixtures__/column2-adf.json';
import * as col3 from '../__fixtures__/column3-adf.json';

describe('Layouts:', () => {
  let page;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  describe('2 columns', () => {
    it('should correctly render layout on MDPI', async () => {
      await page.setViewport(deviceViewPorts.LaptopMDPI);
      await initFullPageEditorWithAdf(page, col2);
      await snapshot(page, 0.02);
    });

    it('should stack layout on smaller ipad', async () => {
      await page.setViewport(deviceViewPorts.iPad);
      await initFullPageEditorWithAdf(page, col2);
      await page.click(pageObject.layoutDataSection);
      await snapshot(page, 0.02);
    });

    it('should stack layout on smaller iPhone', async () => {
      await page.setViewport(deviceViewPorts.iPhonePlus);
      await initFullPageEditorWithAdf(page, col2);
      await page.click(pageObject.layoutDataSection);
      await snapshot(page, 0.02);
    });
  });

  describe('3 columns', () => {
    it('should correctly render layout', async () => {
      await page.setViewport(deviceViewPorts.LaptopMDPI);
      await initFullPageEditorWithAdf(page, col3);
      await page.click(pageObject.layoutDataSection);
      await snapshot(page, 0.02);
    });

    it('should stack layout on smaller screen sizes', async () => {
      await page.setViewport(deviceViewPorts.iPhonePlus);
      await initFullPageEditorWithAdf(page, col3);
      await page.click(pageObject.layoutDataSection);
      await snapshot(page, 0.02);
    });
  });
});
