import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

import {
  editable,
  getDocFromElement,
  fullpage,
  quickInsert,
} from '../_helpers';
import { TableCssClassName as ClassName } from '../../../plugins/table/types';

BrowserTestCase(
  'delete-last-row.ts: Delete last table row with empty action',
  { skip: ['ie'] },
  async client => {
    const FIRST_CELL_FROM_LAST_ROW =
      'table > tbody > tr:last-child > td:first-child';
    const browser = new Page(client);

    await browser.goto(fullpage.path);
    await browser.waitForSelector(editable);
    await browser.click(editable);

    // Insert table and click on first cell
    await quickInsert(browser, 'Table');
    await browser.waitForSelector(FIRST_CELL_FROM_LAST_ROW);
    await browser.click(FIRST_CELL_FROM_LAST_ROW);

    // Add empty action on first cell from last row
    await quickInsert(browser, 'Action Item');

    // Select button wrapper from last row
    const controlSelector = `.${ClassName.ROW_CONTROLS_WRAPPER} .${
      ClassName.ROW_CONTROLS_BUTTON_WRAP
    }:last-child .${ClassName.CONTROLS_BUTTON}`;
    await browser.waitForSelector(controlSelector);
    await browser.click(controlSelector);

    // Click on delete row button
    const deleteButtonSelector = `.${ClassName.CONTROLS_DELETE_BUTTON_WRAP} .${
      ClassName.CONTROLS_DELETE_BUTTON
    }`;
    await browser.waitForSelector(deleteButtonSelector);
    await browser.click(deleteButtonSelector);

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
