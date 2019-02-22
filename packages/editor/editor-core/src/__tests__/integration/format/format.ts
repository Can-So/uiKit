import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getDocFromElement } from '../_helpers';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';

const editorSelector = '.ProseMirror';

BrowserTestCase(
  'format.ts: user should be able to create link using markdown',
  { skip: ['edge', 'ie'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page' });
    await page.type(editorSelector, '[link](https://hello.com) ');

    await page.waitForSelector('a');
    const doc = await page.$eval(editorSelector, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'format.ts: user should be able to format bold and italics with markdown',
  { skip: ['edge', 'ie'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page' });
    await page.type(editorSelector, '__bold__ ');
    await page.type(editorSelector, '_italics_ ');
    await page.type(editorSelector, '**starbold** ');
    await page.type(editorSelector, '*italicsstar* ');

    await page.waitForSelector('strong');
    const doc = await page.$eval(editorSelector, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'format.ts: user should be able to write inline code',
  { skip: ['edge', 'ie'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, { appearance: 'full-page' });
    await page.type(editorSelector, '`');
    await page.type(editorSelector, 'this');
    await page.type(editorSelector, '`');

    await page.waitForSelector('span.code');
    const doc = await page.$eval(editorSelector, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
