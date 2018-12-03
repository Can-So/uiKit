import { getExampleUrl } from '@atlaskit/visual-regression/helper';
import { renderDocument, snapshot } from './_utils';

const twoColumnLayout = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'layoutSection',
      content: [
        {
          type: 'layoutColumn',
          attrs: {
            width: 50,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Column 1',
                },
              ],
            },
          ],
        },
        {
          type: 'layoutColumn',
          attrs: {
            width: 50,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Column 2',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

describe('Snapshot Test: Layouts', () => {
  let page;
  beforeAll(async () => {
    const url = getExampleUrl(
      'editor',
      'renderer',
      'full-page',
      // @ts-ignore
      global.__BASEURL__,
    );
    // @ts-ignore
    page = global.page;
    await page.goto(url);
  });

  [{ width: 1120, height: 500 }, { width: 800, height: 500 }].forEach(size => {
    it(`should correctly render two column layout when page width is ${
      size.width
    }`, async () => {
      await page.setViewport(size);
      await page.waitFor(100);
      await renderDocument(page, twoColumnLayout);
      await snapshot(page);
    });
  });
});
