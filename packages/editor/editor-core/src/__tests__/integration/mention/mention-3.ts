import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  getDocFromElement,
  insertMention,
  editable,
  typeAheadPicker,
  lozenge as mentionId,
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

// add the button click on the right toolbar
BrowserTestCase(
  'mention-3.ts: user can click ToolbarMentionPicker and see mention',
  { skip: ['ie'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
    });

    await page.waitForSelector('[aria-label="Mention"]');
    await page.click('[aria-label="Mention"]');
    await page.waitForSelector(mentionId);
    await page.click(mentionId);
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'mention-3.ts: should not insert on space if multiple exact nickname match',
  { skip: ['ie'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
    });

    await page.type(editable, '@');
    await page.waitForSelector(typeAheadPicker);
    await page.type(editable, 'gill');
    await page.isVisible('[data-mention-name=pgill]');
    await page.isVisible('[data-mention-name=jjackson]');
    await page.type(editable, ' some');
    await page.type(editable, ' text ');
    const doc = await page.$eval(editable, getDocFromElement);
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'mention-3.ts: inserted if space on single match',
  { skip: ['ie'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
    });

    await page.type(editable, '@');
    await page.waitForSelector(typeAheadPicker);
    await page.type(editable, 'Carolyn');
    // Wait until there is only one mention left in picker.
    await page.browser.waitUntil(async () => {
      const mentionsInPicker = await page.$$(
        `${typeAheadPicker} [data-mention-name]`,
      );
      return mentionsInPicker.value.length === 1;
    });
    await page.type(editable, ' text ');
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'mention-3.ts: user should not see mention inside inline code',
  // TODO: Fix unknown character on BS
  { skip: ['safari', 'ie'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
    });

    await page.type(editable, '`this is inline code ');
    await insertMention(page, 'Carolyn');
    await page.type(editable, '`');
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'mention-3.ts: user should not see mention inside a code block',
  // TODO: Fix unknown character on BS
  { skip: ['safari', 'ie'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
      allowCodeBlocks: true,
    });

    await page.type(editable, '```');
    await page.waitForSelector('pre');
    await page.type(editable, ['this is a code block ', '@Caro']);
    await page.type(editable, 'Return');
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'mention-3.ts: users with same first name should not be selected if space',
  { skip: ['ie'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
    });

    await page.type(editable, '@');
    await page.waitForSelector(typeAheadPicker);
    await page.type(editable, 'alica');
    await page.isVisible('[data-mention-name=awoods]');
    await page.isVisible('[data-mention-name=Fatima]');
    await page.type(editable, ' some');
    await page.type(editable, ' text');
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
