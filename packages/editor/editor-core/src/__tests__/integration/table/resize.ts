import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { tableNewColumnMinWidth } from '@atlaskit/editor-common';
import {
  editable,
  getDocFromElement,
  fullpage,
  resizeColumn,
  insertBlockMenuItem,
} from '../_helpers';

import { insertColumn } from '../../__helpers/page-objects/_table';

import {
  tableWithRowSpan,
  tableWithRowSpanAndColSpan,
  twoColFullWidthTableWithContent,
  tableWithDynamicLayoutSizing,
} from './__fixtures__/resize-documents';
import { tableWithMinWidthColumnsDocument } from './__fixtures__/table-with-min-width-columns-document';

import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

import { TableCssClassName } from '../../../plugins/table/types';

BrowserTestCase(
  'Can resize normally with a rowspan in the non last column.',
  { skip: ['ie'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(tableWithRowSpan),
      allowTables: {
        advanced: true,
      },
    });

    await resizeColumn(page, { cellHandlePos: 2, resizeWidth: 50 });

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'Can resize normally with a rowspan and colspan',
  { skip: ['ie'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(tableWithRowSpanAndColSpan),
      allowTables: {
        advanced: true,
      },
    });

    await resizeColumn(page, { cellHandlePos: 22, resizeWidth: -50 });

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'Can resize normally on a full width table with content',
  { skip: ['ie', 'edge', 'firefox', 'safari'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(twoColFullWidthTableWithContent),
      allowTables: {
        advanced: true,
      },
    });

    await resizeColumn(page, { cellHandlePos: 2, resizeWidth: -100 });

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'Breakout content resizes the column',
  // Firefox clicks the wrong cell with the TOP_LEFT_CELL
  // Needs some digging.
  { skip: ['ie', 'firefox'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(tableWithRowSpan),
      allowTables: {
        advanced: true,
      },
      allowExtension: true,
    });

    await page.click(TableCssClassName.TOP_LEFT_CELL);
    await insertBlockMenuItem(page, 'Block macro (EH)');

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  `Created column should be set to ${tableNewColumnMinWidth}px`,
  { skip: ['ie', 'safari'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(tableWithMinWidthColumnsDocument),
      allowTables: {
        advanced: true,
      },
    });

    await insertColumn(page, 1);

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  "Can't resize the last column of a table with dynamic sizing enabled.",
  { skip: ['ie'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(tableWithDynamicLayoutSizing),
      allowTables: {
        advanced: true,
      },
      allowDynamicTextSizing: true,
    });

    await resizeColumn(page, { cellHandlePos: 10, resizeWidth: -100 });

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
