import { initFullPageEditorWithAdf, snapshot } from '../_utils';
import * as pageObject from '../_pageObjects';

// TODO - add ADF before loading stuff
describe('z-indexes:', () => {
  let page;
  const noData = {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [],
      },
    ],
  };

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  // TODO enable after fixing selectors on tables
  it('should always position table trash icon below dropdowns from main menu', async () => {
    await initFullPageEditorWithAdf(page, noData);
    await pageObject.insertTable(page);
    await page.waitForSelector(pageObject.removeTableButton);
    await page.click(pageObject.insertBlockDropdown);
    await page.waitForSelector(pageObject.dropList);
    await snapshot(page, 0.02);
  });

  it('should always position table trash icon below emoji picker', async () => {
    await initFullPageEditorWithAdf(page, noData);
    await pageObject.insertTable(page);
    await page.waitForSelector(pageObject.removeTableButton);
    await page.click(pageObject.emojiButton);
    await page.waitForSelector(pageObject.emojiPicker);
    await snapshot(page, 0.02);
  });

  it('should always position table trash icon below mention picker', async () => {
    await initFullPageEditorWithAdf(page, noData);
    await pageObject.insertTable(page);
    await page.waitForSelector(pageObject.removeTableButton);
    await page.click(pageObject.mentionButton);
    await page.waitForSelector(pageObject.mentionQuery);
    await snapshot(page, 0.02);
  });
});
