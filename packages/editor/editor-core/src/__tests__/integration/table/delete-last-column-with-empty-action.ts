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
  'delete-last-column-with-empty-action.ts: Delete last table column with empty action',
  { skip: ['ie', 'edge'] },
  async client => {
    const LAST_HEADER_FROM_FIRST_ROW =
      'table > tbody > tr:first-child > th:last-child';
    const browser = new Page(client);

    await browser.goto(fullpage.path);
    await browser.waitForSelector(editable);
    await browser.click(editable);

    // Insert table and click on last cell of first row
    await quickInsert(browser, 'Table');
    await browser.waitForSelector(LAST_HEADER_FROM_FIRST_ROW);
    await browser.click(LAST_HEADER_FROM_FIRST_ROW);

    // Add empty action on first cell from last row
    await quickInsert(browser, 'Action item');

    // Select button wrapper from last column
    const controlSelector = `.${ClassName.COLUMN_CONTROLS_WRAPPER} .${
      ClassName.COLUMN_CONTROLS_BUTTON_WRAP
    }:last-child .${ClassName.CONTROLS_BUTTON}`;
    await browser.waitForSelector(controlSelector);
    await browser.click(controlSelector);

    // Click on delete row button
    const deleteButtonSelector = `.${ClassName.CONTROLS_DELETE_BUTTON_WRAP} .${
      ClassName.CONTROLS_DELETE_BUTTON
    }`;
    await browser.waitForVisible(deleteButtonSelector);
    await browser.click(deleteButtonSelector);

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
