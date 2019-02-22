import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

import {
  editable,
  getDocFromElement,
  fullpage,
  insertEmoji,
  emojiItem,
  insertMention,
  lozenge,
} from '../_helpers';

BrowserTestCase(
  'emoji.ts: Insert an emoji, then a mention, move to right before the emoji and try to add text between both',
  { skip: ['ie'] },
  async (client: any) => {
    const browser = new Page(client);

    await browser.goto(fullpage.path);
    await browser.waitForSelector(editable);
    await browser.click(editable);

    await insertEmoji(browser, 'grinning');
    await browser.waitForSelector(emojiItem('grinning'));
    await insertEmoji(browser, 'grinning');
    await browser.waitForSelector(emojiItem('grinning'));
    await insertMention(browser, 'Carolyn');
    await browser.waitForSelector(lozenge);

    await browser.type(editable, [
      'ArrowLeft',
      'ArrowLeft',
      'ArrowLeft',
      'ArrowLeft',
      'ArrowLeft',
      'ArrowRight',
      'Some text',
      'ArrowRight',
      'ArrowRight',
      'Some text',
      'ArrowRight',
      'ArrowRight',
      'Some text',
    ]);

    await browser.click(editable);
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
