import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getDocFromElement, editable } from '../_helpers';
import { insertEmoji, emojiItem, insertEmojiBySelect } from './_emoji-helpers';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';

BrowserTestCase(
  'emoji-2.ts: should be able to use emoji inside blockquote',
  { skip: ['ie'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page' });
    await page.type(editable, '> ');
    await page.type(editable, 'some text ');
    await insertEmoji(page, 'a');
    await page.waitForSelector(emojiItem('a'), 100);
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'emoji-2.ts: should be able to use emoji inside bulletList',
  { skip: ['ie'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page', allowLists: true });
    await page.type(editable, '* ');
    await insertEmoji(page, 'smile');
    await page.waitForSelector(emojiItem('smile'), 1000);
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'emoji-2.ts: should be able to use emoji inside orderedList',
  { skip: ['ie'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page', allowLists: true });
    await page.type(editable, '1. ');
    await insertEmoji(page, 'a');
    await page.waitForSelector(emojiItem('a'), 1000);
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

// ie keying in ; instead of : - browserstack issue
BrowserTestCase(
  'emoji-2.ts: should be able remove emoji on backspace',
  { skip: ['safari', 'ie', 'firefox', 'edge'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page', allowLists: true });
    await page.type(editable, 'this ');
    await insertEmoji(page, 'joy');
    await page.waitForSelector(emojiItem('joy'), 1000);
    await page.type(editable, ['Backspace', 'Backspace']);
    const doc = await page.$eval(editable, getDocFromElement);
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
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page' });
    // to get steps working on edge since its is slow
    await page.type(editable, '<> ');
    await page.waitForSelector(decisions, 1000);
    await page.type(editable, 'this ');
    await insertEmojiBySelect(page, 'smile');
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'emoji-2.ts: should be able to change text with emoji into decisions',
  { skip: ['ie'] },
  async client => {
    const decisions = 'li span[aria-label="Decision"]';
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page' });
    await page.type(editable, 'this ');
    await insertEmoji(page, 'smile');
    await page.click('[aria-label="Decision"]');
    await page.waitForSelector(decisions, 1000);
    await page.isExisting(decisions);
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
