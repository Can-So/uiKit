import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  getDocFromElement,
  editable,
  insertMention,
  typeAheadPicker,
  lozenge,
  fullpage,
} from '../_helpers';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';

/*
 * Safari does not understand webdriver keyboard actions so a
 * number of tests have been skipped until move to snapshots.
 *
 * The remaining skipped tests for IE11/Edge are bugs that should be fixed for those browsers.
 */

BrowserTestCase(
  'mention-1.ts: user can see mention inside blockquote',
  { skip: ['safari', 'ie'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
      allowTables: {
        advanced: true,
      },
    });

    await page.type(editable, '> ');
    await page.type(editable, 'blockquote ');
    await insertMention(page, 'Carolyn');
    await page.waitForSelector(lozenge);
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'mention-1.ts: user can see mention inside bulletList',
  { skip: ['safari', 'ie'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
      allowLists: true,
    });

    await page.type(editable, '* ');
    await page.waitForSelector('ul');
    await page.type(editable, 'this ');
    await insertMention(page, 'Carolyn');
    await page.waitForSelector(lozenge);
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'mention-1.ts: user can see mention inside orderedList',
  { skip: ['safari', 'ie'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
      allowLists: true,
    });

    await page.type(editable, '1. ');
    await page.waitForSelector('ol');
    await page.type(editable, 'list ');
    await insertMention(page, 'Carolyn');
    await page.waitForSelector(lozenge);
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'mention-1.ts: user can see mention inside decision',
  { skip: ['ie', 'safari'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
    });

    await page.type(editable, '<> ');
    await insertMention(page, 'Carolyn');
    await page.waitForSelector(lozenge);
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'mention-1.ts: user can see mention inside action',
  { skip: ['ie', 'safari'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
    });

    await page.type(editable, '[] ');
    await insertMention(page, 'Carolyn');
    await page.waitForSelector(lozenge);
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'mention-1.ts: user can navigate picker using keyboard',
  { skip: ['ie', 'safari'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
    });

    await page.type(editable, '@');
    await page.waitForSelector(typeAheadPicker);
    await page.type(editable, 'ArrowDown');
    await page.type(editable, 'Enter');
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
