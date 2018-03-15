import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import { getDocFromElement } from '../_helpers';
import {
  messageEditor,
  editable,
  picker,
  insertMention,
  lozenge,
} from './_mention-helpers';

/*
 * Safari does not understand webdriver keyboard actions so a
 * number of tests have been skipped until move to snapshots.
 *
 * The remaining skipped tests for IE11/Edge are bugs that should be fixed for those browsers.
*/

BrowserTestCase(
  'Mention: user should see picker if they type "@"',
  async client => {
    const browser = await new Page(client);
    await browser.goto(messageEditor);
    await browser.waitForSelector(editable);
    await browser.type(editable, '@');
    await browser.waitForSelector(picker);
    expect(await browser.isExisting('[data-mention-query="true"]')).toBe(true);
    expect(await browser.isExisting(picker)).toBe(true);
  },
);

BrowserTestCase('Mention: text@ should not invoke picker', async client => {
  const browser = await new Page(client);
  await browser.goto(messageEditor);
  await browser.waitForSelector(editable);
  await browser.type(editable, 'test@');
  expect(await browser.isExisting(picker)).toBe(false);
});

BrowserTestCase(
  'Mention: user should be able remove mention on backspace',
  { skip: ['safari'] },
  async client => {
    const browser = await new Page(client);
    await browser.goto(messageEditor);
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
  'Mention: @ <space> should not invoke picker',
  { skip: ['ie'] },
  async client => {
    const browser = await new Page(client);
    await browser.goto(messageEditor);
    await browser.waitForSelector(editable);
    await browser.type(editable, '@ Carolyn');
    expect(await browser.isExisting(picker)).toBe(false);
  },
);

// TODO: Unskip when FS-1697 util-data-test migration has completed
// BrowserTestCase(
//   'Mention: insert on space if unique exact nickname match, with multiple results',
//   { skip: ['ie', 'edge'] },
//   async client => {
//     const browser = await new Page(client);
//     await browser.goto(messageEditor);
//     await browser.waitForSelector(editable);
//     await browser.type(editable, '@');
//     await browser.waitForSelector(picker);
//     await browser.type(editable, 'penelope');
//     await browser.isVisible('[data-mention-name=pgill]');
//     await browser.isVisible('[data-mention-name=plim]');
//     await browser.type(editable, ' some');
//     await browser.type(editable, ' text');
//     expect(await browser.isExisting('span=@penelope')).toBe(true);
//   },
// );

BrowserTestCase(
  'Mention: user should see space after node',
  { skip: ['safari'] },
  async client => {
    const browser = await new Page(client);
    await browser.waitForSelector(editable);
    await browser.goto(messageEditor);
    await insertMention(browser, 'Summer');
    await browser.waitForSelector('span=@Summer');
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'Mention: escape closes picker',
  { skip: ['safari'] },
  async client => {
    const browser = await new Page(client);
    await browser.goto(messageEditor);
    await browser.waitForSelector(editable);
    await browser.type(editable, '@');
    await browser.waitForSelector(picker);
    await browser.type(editable, 'Escape');
    expect(await browser.isExisting(picker)).toBe(false);
  },
);
