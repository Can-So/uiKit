import { goToRendererTestingExample, mountRenderer, snapshot } from './_utils';

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
    // @ts-ignore
    page = global.page;
    await goToRendererTestingExample(page);
  });

  [{ width: 1120, height: 500 }, { width: 800, height: 500 }].forEach(size => {
    it(`should correctly render two column layout when page width is ${
      size.width
    }`, async () => {
      await page.setViewport(size);
      await page.waitFor(100);
      mountRenderer(page, {
        document: twoColumnLayout,
        appearance: 'full-page',
      });
      await snapshot(page);
    });
  });
});
