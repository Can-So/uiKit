import { initFullPageEditorWithAdf, clearEditor, snapshot } from './_utils';
import * as pageObject from './_pageObjects';

// TODO - add ADF before loading stuff
describe('Snapshot Test: z-indexes', () => {
  let page;
  const noData = {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'too many full page editor ',
          },
        ],
      },
    ],
  };

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, noData);
  });

  beforeEach(async () => {
    await clearEditor(page);
  });

  // TODO enable after fixing selectors on tables
  it.skip('should always position table trash icon below dropdowns from main menu', async () => {
    await pageObject.insertTable(page);
    await page.waitForSelector(pageObject.removeTablePopup);
    await page.click(pageObject.blockFormattingDropdown);
    await page.waitForSelector(pageObject.dropList);
    await page.click(pageObject.insertBlockDropdown);
    await page.waitForSelector(pageObject.dropList);
    await snapshot(page, 0.05);
  });

  it('should always position table trash icon below emoji picker', async () => {
    await pageObject.insertTable(page);
    await page.waitForSelector(pageObject.removeTablePopup);
    await page.click(pageObject.emojiButton);
    await page.waitForSelector(pageObject.emojiPicker);
    await snapshot(page, 0.05);
  });

  it('should always position table trash icon below mention picker', async () => {
    await pageObject.insertTable(page);
    await page.waitForSelector(pageObject.removeTablePopup);
    await page.click(pageObject.mentionButton);
    await page.waitForSelector(pageObject.mentionQuery);
    await snapshot(page, 0.05);
  });
});
