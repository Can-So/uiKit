import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import { getDocFromElement } from '../_helpers';
import {
  messageEditor,
  editable,
  insertEmoji,
  emojiItem,
  typeahead,
} from './_emoji-helpers';

// safari failure on browserstack
BrowserTestCase(
  'Emoji: user can navigate typeahead using keyboard',
  { skip: ['safari'] },
  async client => {
    const browser = await new Page(client);
    await browser.goto(messageEditor);
    await browser.waitForSelector(editable);
    await browser.type(editable, ':');
    await browser.type(editable, 'smi');
    await browser.waitForSelector(typeahead);
    await browser.type(editable, 'ArrowDown');
    await browser.type(editable, 'Return');
    await browser.waitForSelector(emojiItem('smile'));
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

// issue with safari on browserstack works on local
BrowserTestCase(
  'Emoji: should select emoji on return',
  { skip: ['safari'] },
  async client => {
    const browser = await new Page(client);
    await browser.goto(messageEditor);
    await browser.waitForSelector(editable);
    await browser.type(editable, ':');
    await browser.type(editable, 'wink');
    await browser.waitForSelector(typeahead);
    await browser.type(editable, 'Return');
    await browser.waitForSelector(emojiItem('wink'));
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase('Emoji: should render emoji inside codeblock', async client => {
  const browser = await new Page(client);
  await browser.goto(messageEditor);
  await browser.waitForSelector(editable);
  await browser.type(editable, '```');
  await browser.waitForSelector('pre');
  await browser.type(editable, ':smile:');
  const doc = await browser.$eval(editable, getDocFromElement);
  expect(doc).toMatchDocSnapshot();
});

// BUG on IE
BrowserTestCase(
  'Emoji: should render emoji inside action',
  { skip: ['ie'] },
  async client => {
    const browser = await new Page(client);
    await browser.goto(messageEditor);
    await browser.waitForSelector(editable);
    await browser.type(editable, '[] ');
    await insertEmoji(browser, 'smile');
    await browser.waitForSelector(emojiItem('smile'));
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'Emoji: should not show typeahead with text: ',
  async client => {
    const browser = await new Page(client);
    await browser.goto(messageEditor);
    await browser.waitForSelector(editable);
    await browser.type(editable, 'text: ');
    expect(await browser.isExisting(typeahead)).toBe(false);
  },
);

BrowserTestCase(
  'Emoji: ":<space>" does not show the picker',
  { skip: ['ie'] },
  async client => {
    const browser = await new Page(client);
    await browser.goto(messageEditor);
    await browser.waitForSelector(editable);
    await browser.type(editable, ': ');
    expect(await browser.isExisting(typeahead)).toBe(false);
  },
);
