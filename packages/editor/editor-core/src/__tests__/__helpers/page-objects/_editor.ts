import { Page } from './_types';
const selectors = {
  editor: '.ProseMirror',
};

export async function clickEditableContent(page: Page) {
  await page.waitForSelector(selectors.editor);
  await page.click(selectors.editor);
}
