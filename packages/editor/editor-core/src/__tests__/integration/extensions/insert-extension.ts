import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  getDocFromElement,
  fullpage,
  editable,
  insertBlockMenuItem,
  forEach,
} from '../_helpers';

import { messages } from '../../../plugins/insert-block/ui/ToolbarInsertBlock';

BrowserTestCase(
  `insert-extension.ts: Extension: Insert Inline/Block extension`,
  { skip: ['ie'] },
  async (client: any) => {
    const page = new Page(client);
    await page.goto(fullpage.path);
    await page.waitForSelector(fullpage.placeholder);
    await page.click(fullpage.placeholder);

    await page.click(`[aria-label="${messages.table.defaultMessage}"]`);
    await page.waitForSelector('table td p');

    await forEach(['Inline', 'Block'], async extensionType => {
      await insertBlockMenuItem(page, `${extensionType} macro (EH)`);
    });

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
