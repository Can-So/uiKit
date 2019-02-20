import { Page } from 'puppeteer';
const selectors = {
  editor: '.ProseMirror',
};

export async function clickEditableContent(page: Page) {
  await page.waitForSelector(selectors.editor);
  await page.click(selectors.editor);
}
