import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import { getDocFromElement } from '../_helpers';
import {
  message,
  editable,
  typeAheadPicker,
  insertMention,
  lozenge,
} from '../_helpers';

/*
 * Safari does not understand webdriver keyboard actions so a
 * number of tests have been skipped until move to snapshots.
 *
 * The remaining skipped tests for IE11/Edge are bugs that should be fixed for those browsers.
 */

// Follow up with browserstack as to why @ is keyed in as 2 on ie
BrowserTestCase(
  'mention-2.ts: user should see picker if they type "@"',
  { skip: ['ie'] },
  async client => {
    const browser = new Page(client);
    await browser.goto(message.path);
    await browser.waitForSelector(editable);
    await browser.type(editable, '@');
    await browser.waitForSelector(typeAheadPicker);
    expect(await browser.isExisting(typeAheadPicker)).toBe(true);
  },
);

BrowserTestCase(
  'mention-2.ts: text@ should not invoke picker',
  { skip: ['ie'] },
  async client => {
    const browser = new Page(client);
    await browser.goto(message.path);
    await browser.waitForSelector(editable);
    await browser.type(editable, 'test@');
    expect(await browser.isExisting(typeAheadPicker)).toBe(false);
  },
);

BrowserTestCase(
  'mention-2.ts: user should be able remove mention on backspace',
  { skip: ['safari', 'ie'] },
  async client => {
    const browser = new Page(client);
    await browser.goto(message.path);
    await browser.waitForSelector(editable);
    await insertMention(browser, 'Carolyn');
    await insertMention(browser, 'Summer');
    await insertMention(browser, 'Amber');
    await browser.type(editable, ['Backspace', 'Backspace']);
    await browser.waitForSelector(lozenge);
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'mention-2.ts: @ <space> should not invoke picker',
  { skip: ['ie'] },
  async client => {
    const browser = new Page(client);
    await browser.goto(message.path);
    await browser.waitForSelector(editable);
    await browser.type(editable, '@ Carolyn');
    expect(await browser.isExisting(typeAheadPicker)).toBe(false);
  },
);

BrowserTestCase(
  'mention-2.ts: user should see space after node',
  { skip: ['safari', 'ie'] },
  async client => {
    const browser = new Page(client);
    await browser.waitForSelector(editable);
    await browser.goto(message.path);
    await insertMention(browser, 'Summer');
    await browser.waitForSelector('span=@Summer');
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'mention-2.ts: escape closes picker',
  { skip: ['safari', 'ie'] },
  async client => {
    const browser = new Page(client);
    await browser.goto(message.path);
    await browser.waitForSelector(editable);
    await browser.type(editable, '@');
    await browser.waitForSelector(typeAheadPicker);
    await browser.type(editable, 'Escape');
    expect(await browser.isExisting(typeAheadPicker)).toBe(false);
  },
);
