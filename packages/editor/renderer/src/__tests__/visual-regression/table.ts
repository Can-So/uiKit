import {
  goToRendererTestingExample,
  snapshot,
  mountRenderer,
  animationFrame,
} from './_utils';
import { wideTableResized } from './__fixtures__/document-tables';

describe('Snapshot Test: Table scaling', () => {
  let page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await goToRendererTestingExample(page);
    await page.setViewport({ width: 1485, height: 1175 });
  });

  it(`should NOT render a right shadow`, async () => {
    await mountRenderer(page, {
      showSidebar: true,
      appearance: 'full-page',
      document: wideTableResized,
    });

    await animationFrame(page);
    await snapshot(page);
  });
});
