import { getExampleUrl } from '@atlaskit/visual-regression/helper';

export const DEFAULT_WIDTH = 800;
export const DEFAULT_HEIGHT = 600;

const adfInputSelector = '#adf-input';
const importAdfBtnSelector = '#import-adf';

export const loadFullPageEditorWithAdf = async (page: any, adf: any) => {
  const url = getExampleUrl(
    'editor',
    'editor-core',
    'full-page-with-adf-import',
  );

  await page.goto(url);

  await page.evaluate(
    (adfInputSelector: string, adf: object) => {
      (document as any).querySelector(adfInputSelector).value = JSON.stringify(
        adf,
      );
    },
    adfInputSelector,
    adf,
  );
  await page.click(importAdfBtnSelector);
};

export const snapshot = async (
  page: any,
  tolerance?: number,
  selector = '.akEditor',
) => {
  const editor = await page.$(selector);

  // Try to take a screenshot of only the editor.
  // Otherwise take the whole page.
  let image;
  if (editor) {
    image = await editor.screenshot();
  } else {
    image = await page.screenshot();
  }

  if (tolerance !== undefined) {
    // @ts-ignore
    expect(image).toMatchProdImageSnapshot({
      failureThreshold: `${tolerance}`,
      failureThresholdType: 'percent',
    });
  } else {
    // @ts-ignore
    expect(image).toMatchProdImageSnapshot();
  }
};
