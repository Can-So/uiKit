import { getExampleUrl } from '@atlaskit/visual-regression/helper';
import { snapshot, viewportSizes } from '../_utils';

describe.skip('Snapshot Test: Media', () => {
  describe('renderer', () => {
    let page;

    beforeAll(async () => {
      // @ts-ignore
      page = global.page;
      const url = getExampleUrl(
        'editor',
        'renderer',
        'resized-media-layout',
        // @ts-ignore
        global.__BASEURL__,
      );
      await page.goto(url);
    });

    describe('resized media layout', () => {
      viewportSizes.forEach(size => {
        it(`should correctly render ${size.width}`, async () => {
          await page.setViewport(size);
          await page.waitFor(100);
          await snapshot(page, undefined, '.ak-renderer-document');
        });
      });
    });
  });
});
