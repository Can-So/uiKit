import {
  initFullPageEditorWithAdf,
  snapshot,
  dynamicTextViewportSizes,
} from './_utils';
import * as dynamicTextExample from './__fixtures__/dynamic-text-adf.json';

describe('Snapshot Test: Dynamic Text Sizing', () => {
  let page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, dynamicTextExample);
  });

  dynamicTextViewportSizes.forEach(size => {
    it(`should correctly render ${size.width}`, async () => {
      await page.setViewport(size);
      await page.waitFor(100);
      await snapshot(page);
    });
  });
});
