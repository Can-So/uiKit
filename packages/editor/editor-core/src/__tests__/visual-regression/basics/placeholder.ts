import { initEditor, snapshot } from '../_utils';

describe('Snapshot Test: Placeholder', () => {
  let page;

  beforeEach(() => {
    // @ts-ignore
    page = global.page;
  });

  it('wraps long placeholder onto new line', async () => {
    await initEditor(page, 'full-page');
    await snapshot(page);
  });
});
