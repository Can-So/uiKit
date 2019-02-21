import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import { editable, getDocFromElement, fullpage, forEach } from '../_helpers';

import {
  defaultTableInOverflow,
  defaultTableResizedTable,
} from './__fixtures__/layout-documents';

import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

import { TableCssClassName } from '../../../plugins/table/types';

BrowserTestCase(
  'Remains in overflow on table scale to wide',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    await page.browser.windowHandleMaximize();

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(defaultTableInOverflow),
      allowTables: {
        advanced: true,
      },
    });

    await page.waitForSelector(TableCssClassName.TOP_LEFT_CELL);
    await page.click(TableCssClassName.TOP_LEFT_CELL);

    // Change layout to wide
    await page.waitForSelector(`.${TableCssClassName.LAYOUT_BUTTON}`);
    await page.click(`.${TableCssClassName.LAYOUT_BUTTON}`);

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'Remains in overflow on table scale to full width',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    await page.browser.windowHandleMaximize();

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(defaultTableInOverflow),
      allowTables: {
        advanced: true,
      },
    });

    await page.waitForSelector(TableCssClassName.TOP_LEFT_CELL);
    await page.click(TableCssClassName.TOP_LEFT_CELL);

    // Toggle layout twice.
    await forEach([0, 1], async _ => {
      await page.waitForSelector(`.${TableCssClassName.LAYOUT_BUTTON}`);
      await page.click(`.${TableCssClassName.LAYOUT_BUTTON}`);
    });

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'Maintains the wide layout size without overflow',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    await page.browser.windowHandleMaximize();

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(defaultTableResizedTable),
      allowTables: {
        advanced: true,
      },
    });

    await page.waitForSelector(TableCssClassName.TOP_LEFT_CELL);
    await page.click(TableCssClassName.TOP_LEFT_CELL);

    await page.waitForSelector(`.${TableCssClassName.LAYOUT_BUTTON}`);
    await page.click(`.${TableCssClassName.LAYOUT_BUTTON}`);

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'Maintains the full-width layout size without overflow',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    await page.browser.windowHandleMaximize();

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(defaultTableResizedTable),
      allowTables: {
        advanced: true,
      },
    });

    await page.waitForSelector(TableCssClassName.TOP_LEFT_CELL);
    await page.click(TableCssClassName.TOP_LEFT_CELL);

    await forEach([0, 1], async _ => {
      await page.waitForSelector(`.${TableCssClassName.LAYOUT_BUTTON}`);
      await page.click(`.${TableCssClassName.LAYOUT_BUTTON}`);
    });

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'Maintains the default layout size without overflow when toggling through layouts',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    await page.browser.windowHandleMaximize();

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(defaultTableResizedTable),
      allowTables: {
        advanced: true,
      },
    });

    await page.waitForSelector(TableCssClassName.TOP_LEFT_CELL);
    await page.click(TableCssClassName.TOP_LEFT_CELL);

    await forEach([0, 1, 2], async _ => {
      await page.waitForSelector(`.${TableCssClassName.LAYOUT_BUTTON}`);
      await page.click(`.${TableCssClassName.LAYOUT_BUTTON}`);
    });

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
