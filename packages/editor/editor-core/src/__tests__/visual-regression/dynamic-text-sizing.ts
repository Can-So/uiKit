import { initEditor, snapshot, toggleFeature } from './_utils';

export const viewportSizes = [
  { width: 1440, height: 3000 },
  { width: 1120, height: 3000 },
  { width: 1000, height: 3000 },
  { width: 800, height: 3000 },
];

const loadExampleDocument = async browser => {
  await browser.click('.loadExampleDocument');
};

describe('Snapshot Test: Dynamic Text Sizing', () => {
  let page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initEditor(page, 'full-page-with-toolbar');
    await toggleFeature(page, 'dynamicTextSizing');
    await loadExampleDocument(page);
  });

  viewportSizes.forEach(size => {
    it(`should correctly render ${size.width}`, async () => {
      await page.setViewport(size);
      await page.waitFor(100);
      await snapshot(page);
    });
  });
});
