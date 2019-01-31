import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';
import { messages } from '../../../plugins/insert-block/ui/ToolbarInsertBlock';

const editorSelector = '.ProseMirror';
const insertMenu = `[aria-label="${messages.insertMenu.defaultMessage}"]`;
const dateMenu = `span=${messages.date.defaultMessage}`;
const calendar = '[aria-label="calendar"]';
const dateView = `span.dateView-content-wrap`;

// https://product-fabric.atlassian.net/browse/ED-4531
BrowserTestCase(
  'calendar.ts: user should be able to open calendar',
  { skip: ['edge', 'ie', 'safari'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page', allowDate: true });
    await page.click(editorSelector);
    await page.click(insertMenu);
    await page.click(dateMenu);
    await page.waitForSelector(calendar);
    expect(await page.isExisting(calendar)).toBe(true);
    await page.click(editorSelector);
    expect(await page.isExisting(calendar)).toBe(false);
  },
);

// https://product-fabric.atlassian.net/browse/ED-5033
BrowserTestCase(
  'calendar.ts: clicking date when calendar is open should close it',
  { skip: ['edge', 'ie', 'safari'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page', allowDate: true });
    await page.click(editorSelector);
    await page.click(insertMenu);
    await page.click(dateMenu);
    await page.waitForSelector(calendar);
    expect(await page.isExisting(calendar)).toBe(true);
    await page.waitForSelector(dateView);
    await page.click(dateView);
    // wait for element to disappear
    await page.waitFor(calendar, '5000', true);
    expect(await page.isExisting(calendar)).toBe(false);
  },
);

BrowserTestCase(
  'calendar.ts: clicking on another date should open its date picker',
  { skip: ['edge', 'ie', 'safari'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page', allowDate: true });
    await page.click(editorSelector);
    await page.click(insertMenu);
    await page.click(dateMenu);
    expect(await page.isExisting(calendar)).toBe(true);

    await page.type(editorSelector, ['ArrowRight', 'ArrowRight']);
    await page.click(insertMenu);
    await page.click(dateMenu);
    expect(await page.isExisting(calendar)).toBe(true);

    await page.waitForSelector(dateView);
    await page.click(dateView);
    expect(await page.isExisting(calendar)).toBe(true);
  },
);
