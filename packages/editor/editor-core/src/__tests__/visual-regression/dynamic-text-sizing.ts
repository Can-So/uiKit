import {
  initEditor,
  snapshot,
  toggleFeature,
  dynamicTextViewportSizes,
} from './_utils';

const loadExampleDocument = async browser => {
  await browser.click('.loadExampleDocument');
};

describe.skip('Snapshot Test: Dynamic Text Sizing', () => {
  let page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initEditor(page, 'full-page-with-toolbar');
    await toggleFeature(page, 'dynamicTextSizing');
    await loadExampleDocument(page);
  });

  dynamicTextViewportSizes.forEach(size => {
    it(`should correctly render ${size.width}`, async () => {
      await page.setViewport(size);
      await page.waitFor(100);
      await snapshot(page);
    });
  });
});
