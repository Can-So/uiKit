import { initFullPageEditorWithAdf, snapshot } from '../_utils';
import * as adf from './__fixtures__/noData-adf.json';

describe('Placeholder', () => {
  let page;

  beforeAll(() => {
    // @ts-ignore
    page = global.page;
  });

  it('wraps long placeholder onto new line', async () => {
    await initFullPageEditorWithAdf(page, adf);
    await snapshot(page, 0.01);
  });
});
