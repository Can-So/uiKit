import {
  initEditor,
  insertMedia,
  setupMediaMocksProviders,
  editable,
  rerenderEditor,
  setFeature,
} from '../_utils';
import { TestPageConfig, resizeWithSnapshots } from './_utils';
import { viewportSizes as dynamicTextViewportSizes } from '../dynamic-text-sizing';

const editorConfigs: Array<TestPageConfig> = [
  // all sizes where dynamic text sizing is enabled
  ...dynamicTextViewportSizes.map(viewport => ({
    viewport,
    dynamicTextSizing: true,
  })),

  // and a fixed size where we have no dynamic text sizing
  {
    viewport: { width: 1440, height: 3000 },
    dynamicTextSizing: false,
  },
];

describe('Snapshot Test: Media', () => {
  describe('comment editor', () => {
    let page;

    beforeAll(async () => {
      // @ts-ignore
      page = global.page;
      await initEditor(page, 'comment');
      await setFeature(page, 'imageResizing', true);
      await setupMediaMocksProviders(page);
    });

    // run the suite of tests for each viewport/prop combination
    editorConfigs.forEach(config => {
      const {
        dynamicTextSizing,
        viewport: { width, height },
      } = config;

      describe(`at ${width}x${height} ${
        dynamicTextSizing ? 'with' : 'without'
      } dynamic text sizing`, async () => {
        let editorWidth;

        beforeAll(async () => {
          // setup the editor/viewport config
          await page.setViewport({ width, height });
          await setFeature(page, 'dynamicTextSizing', dynamicTextSizing);
        });

        beforeEach(async () => {
          // clear the editor after each test
          await rerenderEditor(page);
          editorWidth = await page.$eval(editable, el => el.clientWidth);
        });

        describe('center layout', () => {
          [2, 6, 10].forEach(cols => {
            it(`can make an image ${cols} columns wide`, async () => {
              await insertMedia(page);
              await page.click('.media-single');
              await page.waitForSelector('.mediaSingle-resize-handle-right');

              // images resize inwards towards the middle
              await resizeWithSnapshots(
                page,
                -((editorWidth / 2) * ((12 - cols) / 12)),
              );
            });
          });
        });

        describe('lists', () => {
          [2, 6, 10, 12].forEach(cols => {
            it(`can make an image in a list ${cols} columns wide`, async () => {
              await page.click(editable);
              await page.type(editable, '* ');

              await insertMedia(page);
              await page.click('.media-single');

              await page.waitForSelector('.mediaSingle-resize-handle-right');
              await resizeWithSnapshots(
                page,
                -((editorWidth / 12) * (12 - cols)),
              );
            });
          });
        });
      });
    });
  });
});
