import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { editable, quickInsert, getDocFromElement } from '../_helpers';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

const dateLozenge = 'span[timestamp]';

// ED-6506 - Unskip 'chrome' & 'safari' once date mocking is resolved
BrowserTestCase(
  'quick-insert.ts: Insert date via quick insert',
  { skip: ['firefox', 'edge', 'ie', 'chrome', 'safari'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    await page.mockDate(1546261200000, 11); // 1st Jan 2019 00:00 AEST / 31st Dec 2018 13:00 UTC

    await mountEditor(page, {
      appearance: 'full-page',
      allowDate: true,
    });

    await page.click(editable);

    // await browser.debug();
    await quickInsert(page, 'Date');

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

// ED-6506 - Unskip 'chrome' & 'safari' once date mocking is resolved
BrowserTestCase(
  "quick-insert.ts: Uses today's date in user's local timezone as initial selection",
  { skip: ['firefox', 'edge', 'ie', 'chrome', 'safari'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    await page.mockDate(1546261200000, 11); // 1st Jan 2019 00:00 AEST / 31st Dec 2018 13:00 UTC

    await mountEditor(page, {
      appearance: 'full-page',
      allowDate: true,
    });

    await page.click(editable);
    await quickInsert(page, 'Date');

    expect(await page.getText(dateLozenge)).toBe('01 Jan 2019');
  },
);
