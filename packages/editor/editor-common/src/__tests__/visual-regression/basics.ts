import { loadFullPageEditorWithAdf, snapshot } from './_utils';
import * as adf from './adf/basic-content.adf.json';

describe('Snapshot Test: Basic Content', () => {
  it('looks correct', async () => {
    // @ts-ignore
    const page = global.page;
    await loadFullPageEditorWithAdf(page, adf);
    await page.setViewport({ width: 1000, height: 1000 });
    await snapshot(page);
  });
});
