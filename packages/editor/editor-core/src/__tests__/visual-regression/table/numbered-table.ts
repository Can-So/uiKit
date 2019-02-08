import {
  snapshot,
  initFullPageEditorWithAdf,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
} from '../_utils';
import * as adf from './__fixtures__/numbered-table.adf.json';

describe.skip('Snapshot Test: numbered table', () => {
  let page;

  const viewports = [
    { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT },
    { width: 600, height: 600 },
  ];

  beforeEach(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, adf);
  });

  viewports.forEach(dimensions => {
    it(`looks correct at ${dimensions.width}x${
      dimensions.height
    }`, async () => {
      await page.setViewport(dimensions);
      await snapshot(page);
    });
  });
});
