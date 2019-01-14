import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  getDocFromElement,
  editable,
  gotoEditor,
  LONG_WAIT_FOR,
} from '../_helpers';

import { insertEmoji, emojiItem, typeahead } from './_emoji-helpers';

BrowserTestCase(
  'emoji-1.ts:should be able to see emoji if typed the name in full',
  { skip: ['safari', 'ie'] },
  async client => {
    const browser = new Page(client);
    await gotoEditor(browser);
    await insertEmoji(browser, 'grinning');
    await browser.waitForSelector(emojiItem('grinning'));
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

// ie complains it cannot either type :) or types :0
BrowserTestCase(
  'emoji-1.ts: should convert :) to emoji',
  { skip: ['ie'] },
  async client => {
    const browser = new Page(client);
    await gotoEditor(browser);
    // type slowly go get edge working
    await browser.type(editable, '# ');
    await browser.type(editable, 'heading ');
    await browser.type(editable, ':) ');
    await browser.waitForSelector(emojiItem('slight_smile'));
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

// IE now keying in CAPs on browserstack
BrowserTestCase(
  'user should not be able to see emoji inside inline code',
  { skip: ['ie'] },
  async client => {
    const browser = new Page(client);
    await gotoEditor(browser);
    await browser.type(editable, 'type `');
    await browser.type(editable, ':a:');
    await browser.type(editable, '`');
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'emoji-1.ts: should close emoji picker on Escape',
  { skip: ['firefox', 'safari', 'ie', 'edge'] },
  async client => {
    const browser = new Page(client);
    await gotoEditor(browser);
    await browser.type(editable, 'this ');
    await browser.type(editable, ':');
    await browser.type(editable, 'smile');

    await browser.waitForSelector(typeahead, { timeout: LONG_WAIT_FOR });
    expect(await browser.isExisting(typeahead)).toBe(true);

    await browser.type(editable, 'Escape');
    expect(await browser.isExisting(typeahead)).toBe(false);

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

// Emoji pop up is hidden should fix examples to show this
// https://product-fabric.atlassian.net/browse/ED-5951
/* BrowserTestCase(
  'emoji-1.ts: should be able to click on the emoji button and select emoji',
  { skip: ['firefox', 'safari', 'ie', 'edge'] },
  async client => {
    const emojiButton = `[aria-label="${messages.emoji.defaultMessage}"]`;
    const sweatSmile = '[aria-label=":sweat_smile:"]';
    const browser = new Page(client);
    await gotoEditor(browser);
    await browser.waitForSelector(emojiButton);
    await browser.click(emojiButton);
    await browser.waitForSelector(sweatSmile);
    await browser.click(sweatSmile);
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
*/

// skipping safari since char    is stored in snapshot
// skipping firefox as it doesn't handle ArrowLeft on webdriver
// unable to navigate between emojis on IE - file issue
// Edge: ED-4908
BrowserTestCase(
  'emoji-1.ts: should be able to navigate between emojis',
  { skip: ['firefox', 'safari', 'ie', 'edge'] },
  async client => {
    const browser = new Page(client);
    await gotoEditor(browser);
    await browser.type(editable, 'this ');
    await insertEmoji(browser, 'a');
    await insertEmoji(browser, 'light_bulb_on');
    await browser.waitForSelector(emojiItem('a'));
    await browser.type(editable, ['ArrowLeft', 'ArrowLeft']);
    await browser.type(editable, ' that ');
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
