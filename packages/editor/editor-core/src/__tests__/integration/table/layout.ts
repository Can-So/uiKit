import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import {
  editable,
  getDocFromElement,
  fullpage,
  forEach,
  changeSelectedNodeLayout,
  animationFrame,
  toggleBreakout,
} from '../_helpers';

import {
  defaultTableInOverflow,
  defaultTableResizedTable,
  nestedTables,
} from './__fixtures__/layout-documents';

import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

import { TableCssClassName } from '../../../plugins/table/types';

import messages from '../../../messages';

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
  'Maintains the wide layout size without overflow with dynamic text sizing',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(defaultTableResizedTable),
      allowTables: {
        advanced: true,
      },
      allowDynamicTextSizing: true,
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

BrowserTestCase(
  'Scales down column sizes when bodied extension parent layout changes',
  { skip: ['ie', 'edge', 'firefox', 'safari'] },
  async client => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(nestedTables),
      allowTables: {
        advanced: true,
      },
      allowExtension: {
        allowBreakout: true,
      },
      allowLayouts: {
        allowBreakout: true,
      },
      allowBreakout: true,
    });

    await page.waitForSelector('.extension-container p');
    await page.click('.extension-container p');
    await changeSelectedNodeLayout(
      page,
      messages.layoutFixedWidth.defaultMessage,
    );

    await animationFrame(page);

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'Scales down column sizes when parent layout changes breakout',
  { skip: ['ie', 'edge', 'firefox', 'safari'] },
  async client => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(nestedTables),
      allowTables: {
        advanced: true,
      },
      allowExtension: {
        allowBreakout: true,
      },
      allowLayouts: {
        allowBreakout: true,
      },
      allowBreakout: true,
    });

    await page.waitForSelector('div[data-layout-section]');
    await page.click('div[data-layout-section]');
    await toggleBreakout(page, 2);

    await animationFrame(page);

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
