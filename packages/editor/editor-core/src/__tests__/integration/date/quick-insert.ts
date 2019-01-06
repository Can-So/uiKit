import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  fullpage,
  editable,
  quickInsert,
  getDocFromElement,
} from '../_helpers';

const dateLozenge = 'span[timestamp]';

BrowserTestCase(
  'quick-insert.ts: Insert date via quick insert',
  { skip: ['edge', 'ie'] },
  async client => {
    const browser = new Page(client);
    await browser.goto(fullpage.path);
    await browser.mockDate(1546261200000, 11); // 1st Jan 2019 00:00 AEST / 31st Dec 2018 13:00 UTC

    await browser.waitForSelector(editable);
    await browser.click(editable);

    // await browser.debug();
    await quickInsert(browser, 'Date');

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  "quick-insert.ts: Uses today's date in user's local timezone as initial selection",
  { skip: ['edge', 'ie'] },
  async client => {
    const browser = new Page(client);
    await browser.goto(fullpage.path);
    await browser.mockDate(1546261200000, 11); // 1st Jan 2019 00:00 AEST / 31st Dec 2018 13:00 UTC

    await browser.waitForSelector(editable);
    await browser.click(editable);
    await quickInsert(browser, 'Date');

    expect(await browser.getText(dateLozenge)).toBe('01 Jan 2019');
  },
);
