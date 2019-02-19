import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  editable,
  getDocFromElement,
  fullpage,
  quickInsert,
  linkToolbar,
} from '../_helpers';

BrowserTestCase(
  'quick-insert.ts: Insert hyperlink via quick insert',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async client => {
    const browser = new Page(client);

    await browser.goto(fullpage.path);
    await browser.waitForSelector(editable);
    await browser.click(editable);
    await quickInsert(browser, 'Hyperlink');

    await browser.waitForSelector(linkToolbar);
    await browser.type(linkToolbar, ['atlassian.com', 'Return']);
    await browser.waitForSelector('a');

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
