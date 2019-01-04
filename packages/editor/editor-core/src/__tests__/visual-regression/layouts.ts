import {
  initEditor,
  snapshot,
  insertBlockMenuItem,
  clearEditor,
} from './_utils';
import { messages } from '../../plugins/insert-block/ui/ToolbarInsertBlock/index';
import { messages as toolbarMessages } from '../../plugins/layout/toolbar';

const firstColumn = '[data-layout-section] [data-layout-column]:nth-child(1)';
const secondColumn = '[data-layout-section] [data-layout-column]:nth-child(2)';
const thirdColumn = '[data-layout-section] [data-layout-column]:nth-child(3)';

const threeColumnsLayout = `div[aria-label="Columns floating controls"] [aria-label="${
  toolbarMessages.threeColumns.defaultMessage
}"]`;

describe('Snapshot Test: Layouts', () => {
  let page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initEditor(page, 'full-page');
  });

  beforeEach(async () => {
    await clearEditor(page);
  });

  describe('2 columns', () => {
    it('should correctly render layout', async () => {
      await page.setViewport({ width: 1100, height: 500 });
      await insertBlockMenuItem(page, messages.columns.defaultMessage);
      await page.waitForSelector(firstColumn);
      await page.click(firstColumn);
      await page.keyboard.type('Column 1');
      await page.click(secondColumn);
      await page.keyboard.type('Column 2');
      await snapshot(page);
    });

    it('should stack layout on smaller screen sizes', async () => {
      await page.setViewport({ width: 600, height: 500 });
      await insertBlockMenuItem(page, messages.columns.defaultMessage);
      await page.waitForSelector(firstColumn);
      await page.click(firstColumn);
      await page.keyboard.type('Column 1');
      await page.click(secondColumn);
      await page.keyboard.type('Column 2');
      await snapshot(page);
    });
  });

  describe('3 columns', () => {
    it('should correctly render layout', async () => {
      await page.setViewport({ width: 1100, height: 500 });
      await insertBlockMenuItem(page, messages.columns.defaultMessage);
      await page.waitForSelector(threeColumnsLayout);
      await page.click(threeColumnsLayout);
      await page.waitForSelector(firstColumn);
      await page.click(firstColumn);
      await page.keyboard.type('Column 1');
      await page.click(secondColumn);
      await page.keyboard.type('Column 2');
      await page.click(thirdColumn);
      await page.keyboard.type('Column 3');
      await snapshot(page);
    });

    it('should stack layout on smaller screen sizes', async () => {
      await page.setViewport({ width: 600, height: 500 });
      await insertBlockMenuItem(page, messages.columns.defaultMessage);
      await page.waitForSelector(threeColumnsLayout);
      await page.click(threeColumnsLayout);
      await page.waitForSelector(firstColumn);
      await page.click(firstColumn);
      await page.keyboard.type('Column 1');
      await page.click(secondColumn);
      await page.keyboard.type('Column 2');
      await page.click(thirdColumn);
      await page.keyboard.type('Column 3');
      await snapshot(page);
    });
  });
});
