import { initFullPageEditorWithAdf, snapshot } from '../_utils';
import {
  clickToolbarMenu,
  ToolbarMenuItem,
} from '../../__helpers/page-objects/_toolbar';
import { selectors } from '../../__helpers/page-objects/_editor';
import { tableSelectors } from '../../__helpers/page-objects/_table';
import { insertTable } from '../../__helpers/page-objects/_table';

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
    await insertTable(page);
    await page.waitForSelector(tableSelectors.removeTable);
    await clickToolbarMenu(page, ToolbarMenuItem.insertBlock);
    await page.waitForSelector(selectors.dropList);
    await snapshot(page, 0.02);
  });

  it('should always position table trash icon below emoji picker', async () => {
    await initFullPageEditorWithAdf(page, noData);
    await insertTable(page);
    await page.waitForSelector(tableSelectors.removeTable);
    await clickToolbarMenu(page, ToolbarMenuItem.emoji);
    await page.waitForSelector(selectors.emojiPicker);
    await snapshot(page, 0.02);
  });

  it('should always position table trash icon below mention picker', async () => {
    await initFullPageEditorWithAdf(page, noData);
    await insertTable(page);
    await page.waitForSelector(tableSelectors.removeTable);
    await clickToolbarMenu(page, ToolbarMenuItem.mention);
    await page.waitForSelector(selectors.mentionQuery);
    await snapshot(page, 0.02);
  });
});
