import { initEditor, snapshot } from './_utils';

// https://product-fabric.atlassian.net/browse/ED-6435
describe.skip('Snapshot Test: Mobile Dark Editor', () => {
  let page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initEditor(page, 'dark-full-page-with-content');
  });

  it('should correctly render dark mode in mobile editor', async () => {
    await snapshot(page, 0.2);
  });
});
