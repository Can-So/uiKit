import { goToRendererTestingExample, mountRenderer, snapshot } from './_utils';
import { layoutWithDefaultBreakoutMark } from './__fixtures__/document-with-layout-default-breakout';

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

describe('Layouts', () => {
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

describe('Snapshot Test: Breakout Layouts', () => {
  let page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await goToRendererTestingExample(page);
  });

  it(`should correctly render two column layout with a default breakout mark`, async () => {
    await page.setViewport({ width: 1120, height: 700 });
    await page.waitFor(100);
    mountRenderer(page, {
      document: layoutWithDefaultBreakoutMark,
      appearance: 'full-page',
    });
    await page.waitFor(100);

    // @ts-ignore
    await snapshot(page, '0.02');
  });
});
