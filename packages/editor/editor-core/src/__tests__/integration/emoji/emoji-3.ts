import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getDocFromElement, editable } from '../_helpers';
import {
  insertEmoji,
  emojiItem,
  typeahead,
  highlightEmojiInTypeahead,
} from './_emoji-helpers';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';

// safari failure on browserstack
BrowserTestCase(
  'emoji-3.ts: user can navigate typeahead using keyboard',
  { skip: ['safari', 'ie', 'firefox', 'edge'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page' });
    await page.type(editable, ':');
    await page.type(editable, 'smi');
    await page.waitForSelector(typeahead);
    await page.type(editable, 'ArrowDown');

    // The typeahead may re-order our results.
    // Go down 5 items til we find our desired emoji
    await highlightEmojiInTypeahead(page, 'smile');

    await page.type(editable, 'Return');
    await page.waitForSelector(emojiItem('smile'), 1000);
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

// issue with safari on browserstack works on local
BrowserTestCase(
  'emoji-3.ts: should select emoji on return',
  { skip: ['safari', 'ie', 'firefox', 'edge'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page' });
    await page.type(editable, ':');
    await page.type(editable, 'wink');
    await page.waitForSelector(typeahead);

    // The typeahead may re-order our results.
    // Grab the currently selected emoji, to reference in render.
    await highlightEmojiInTypeahead(page, 'wink');

    await page.type(editable, 'Return');
    await page.waitForSelector(emojiItem('wink'), 1000);
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'emoji-3.ts: should render emoji inside codeblock',
  { skip: ['safari', 'ie', 'firefox', 'edge'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page', allowCodeBlocks: true });
    await page.type(editable, '```');
    await page.waitForSelector('pre', 1000);
    await page.type(editable, ':smile:');
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

// BUG on IE
BrowserTestCase(
  'emoji-3.ts: should render emoji inside action',
  { skip: ['safari', 'ie', 'firefox', 'edge'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page' });
    await page.type(editable, '[] ');
    await insertEmoji(page, 'smile');
    await page.waitForSelector(emojiItem('smile'), 1000);
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'emoji-3.ts: should not show typeahead with text: ',
  { skip: ['ie'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page' });
    await page.type(editable, 'text: ');
    expect(await page.isExisting(typeahead)).toBe(false);
  },
);

BrowserTestCase(
  'emoji-3.ts: ":<space>" does not show the picker',
  { skip: ['ie'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page' });
    await page.type(editable, ': ');
    expect(await page.isExisting(typeahead)).toBe(false);
  },
);
