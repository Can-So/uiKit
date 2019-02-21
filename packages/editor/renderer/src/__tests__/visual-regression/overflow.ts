import { goToRendererTestingExample, snapshot, mountRenderer } from './_utils';
import * as document from '../../../examples/helper/overflow.adf.json';

describe('Snapshot Test: Overflow shadows', () => {
  let page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await goToRendererTestingExample(page);
    await page.setViewport({ width: 1280, height: 1080 });
  });

  it(`should render right shadows`, async () => {
    await mountRenderer(page, {
      appearance: 'full-page',
      document,
    });
    await snapshot(page);
  });
});
