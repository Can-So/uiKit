import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

import {
  editable,
  getDocFromElement,
  fullpage,
  quickInsert,
} from '../_helpers';

BrowserTestCase(
  'status.ts: Insert status into panel, move cursor to right before status, and add text',
  { skip: ['ie'] },
  async (client: any) => {
    const browser = new Page(client);

    await browser.goto(fullpage.path);
    await browser.waitForSelector(editable);
    await browser.click(editable);

    await quickInsert(browser, 'Panel');

    await quickInsert(browser, 'Status');

    await browser.waitForSelector(`[aria-label="Popup"] input`);
    await browser.type(`[aria-label="Popup"] input`, 'DONE');
    await browser.click(editable);
    await browser.type(editable, [
      'Backspace',
      'ArrowLeft',
      'ArrowLeft',
      'Some text',
    ]);

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'status.ts: Insert status into panel, move cursor to right before panel, move right, and add text',
  { skip: ['ie'] },
  async (client: any) => {
    const browser = new Page(client);

    await browser.goto(fullpage.path);
    await browser.waitForSelector(editable);
    await browser.click(editable);

    await quickInsert(browser, 'Panel');

    await quickInsert(browser, 'Status');

    await browser.waitForSelector(`[aria-label="Popup"] input`);
    await browser.type(`[aria-label="Popup"] input`, 'DONE');
    await browser.click(editable);
    await browser.type(editable, [
      'Backspace',
      'ArrowLeft',
      'ArrowLeft',
      'ArrowLeft',
      'ArrowRight',
      'Some text',
    ]);

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
