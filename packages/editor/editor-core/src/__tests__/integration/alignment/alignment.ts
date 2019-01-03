import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  getDocFromElement,
  fullpage,
  editable,
  insertBlockMenuItem,
  fullpageDisabled,
} from '../_helpers';
import { messages } from '../../../plugins/block-type/types';

const alignButton = 'button[aria-label="Text alignment"]';
const alignRightButton = 'span[aria-label="Align right"]';
const headingButton = 'button[aria-label="Font style"]';
const headingh1 = 'div[role="group"] h1';

BrowserTestCase(
  'alignment: should be able to add alignment to paragraphs',
  { skip: [] },
  async client => {
    const page = new Page(client);
    await page.goto(fullpage.path);
    await page.waitForSelector(fullpage.placeholder);
    await page.click(fullpage.placeholder);
    await page.waitForSelector(editable);

    await page.type(editable, 'hello');
    await page.waitFor(alignButton);
    await page.click(alignButton);
    await page.waitForSelector(alignRightButton);
    await page.click(alignRightButton);
    expect(await page.$eval(editable, getDocFromElement)).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'alignment: should be able to add alignment to headings',
  { skip: [] },
  async client => {
    const page = new Page(client);
    await page.goto(fullpage.path);
    await page.waitForSelector(fullpage.placeholder);
    await page.click(fullpage.placeholder);
    await page.waitForSelector(editable);

    await page.type(editable, 'hello');
    await page.waitFor(headingButton);
    await page.click(headingButton);
    await page.waitFor(headingh1);
    await page.click(headingh1);
    await page.waitFor(alignButton);
    await page.click(alignButton);
    await page.waitForSelector(alignRightButton);
    await page.click(alignRightButton);
    expect(await page.$eval(editable, getDocFromElement)).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'alignment: disabled when inside special nodes',
  { skip: [] },
  async client => {
    const page = new Page(client);
    await page.goto(fullpage.path);
    await page.waitForSelector(fullpage.placeholder);
    await page.click(fullpage.placeholder);
    await page.waitForSelector(editable);
    await insertBlockMenuItem(page, messages.codeblock.defaultMessage);
    await page.waitFor(alignButton);
    const isEnabled = await page.isEnabled(alignButton);
    expect(isEnabled).toBe(false);
  },
);

BrowserTestCase(
  'alignment: disabled when editor is disabled',
  { skip: [] },
  async client => {
    const page = new Page(client);
    await page.goto(fullpageDisabled.path);
    await page.waitForSelector(fullpageDisabled.placeholder);
    await page.waitForSelector(editable);
    await page.waitFor(alignButton);
    const isEnabled = await page.isEnabled(alignButton);
    expect(isEnabled).toBe(false);
  },
);
