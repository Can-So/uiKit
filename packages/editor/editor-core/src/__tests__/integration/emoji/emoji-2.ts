import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  getDocFromElement,
  editable,
  gotoEditor,
  insertBlockMenuItem,
} from '../_helpers';
import { insertEmoji, emojiItem, insertEmojiBySelect } from './_emoji-helpers';

BrowserTestCase(
  'emoji-2.ts: should be able to use emoji inside blockquote',
  { skip: ['ie'] },
  async client => {
    const browser = new Page(client);
    await gotoEditor(browser);
    await browser.type(editable, '> ');
    await browser.type(editable, 'some text ');
    await insertEmoji(browser, 'a');
    await browser.waitForSelector(emojiItem('a'));
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'emoji-2.ts: should be able to use emoji inside bulletList',
  { skip: ['ie'] },
  async client => {
    const browser = new Page(client);
    await gotoEditor(browser);
    await browser.type(editable, '* ');
    await insertEmoji(browser, 'smile');
    await browser.waitForSelector(emojiItem('smile'));
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'emoji-2.ts: should be able to use emoji inside orderedList',
  { skip: ['ie'] },
  async client => {
    const browser = new Page(client);
    await gotoEditor(browser);
    await browser.type(editable, '1. ');
    await insertEmoji(browser, 'a');
    await browser.waitForSelector(emojiItem('a'));
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

// ie keying in ; instead of : - browserstack issue
BrowserTestCase(
  'emoji-2.ts: should be able remove emoji on backspace',
  { skip: ['safari', 'ie', 'firefox', 'edge'] },
  async client => {
    const browser = new Page(client);
    await gotoEditor(browser);
    await browser.type(editable, 'this ');
    await insertEmoji(browser, 'joy');
    await browser.waitForSelector(emojiItem('joy'));
    await browser.type(editable, ['Backspace', 'Backspace']);
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

// Safari does not understand webdriver click
// IE has a bug opening picker inside task/decisions
BrowserTestCase(
  'emoji-2.ts: should be able to select emoji by clicking inside decisions',
  { skip: ['safari', 'ie'] },
  async client => {
    const decisions = 'span[aria-label="Decision"]';
    const browser = new Page(client);
    await gotoEditor(browser);
    // to get steps working on edge since its is slow
    await browser.type(editable, '<> ');
    await browser.waitForSelector(decisions);
    await browser.type(editable, 'this ');
    await insertEmojiBySelect(browser, 'smile');
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'emoji-2.ts: should be able to change text with emoji into decisions',
  { skip: ['ie'] },
  async client => {
    const decisions = 'li span[aria-label="Decision"]';
    const browser = new Page(client);
    await gotoEditor(browser);
    await browser.type(editable, 'this ');
    await insertEmoji(browser, 'smile');
    await insertBlockMenuItem(browser, 'Decision');
    await browser.waitForSelector(decisions);
    await browser.isExisting(decisions);
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
