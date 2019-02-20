import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import {
  editable,
  getDocFromElement,
  fullpage,
  quickInsert,
} from '../_helpers';
import { messages as insertBlockMessages } from '../../../plugins/insert-block/ui/ToolbarInsertBlock';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';
import { selectors } from './_utils';

BrowserTestCase(
  'inside-table.ts: Insert panel into table, add text, change panel type',
  { skip: ['edge', 'ie'] },
  async client => {
    const insertTableMenu = `[aria-label="${
      insertBlockMessages.table.defaultMessage
    }"]`;
    const tableControls = '[aria-label="Table floating controls"]';

    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
      allowPanel: true,
      allowTables: {
        advanced: true,
      },
    });

    await page.click(editable);
    await page.click(insertTableMenu);
    await page.waitForSelector(tableControls);

    await quickInsert(page, 'Panel');
    await page.waitForSelector(selectors.PANEL_EDITOR_CONTAINER);

    // type some text
    await page.type(editable, 'this text should be in the panel');

    // click on Error label
    const selector = `[aria-label="Error"]`;
    await page.click(selector);

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
    expect(await page.isExisting(tableControls)).toBe(false);
    expect(await page.isVisible(tableControls)).toBe(false);
  },
);
