import { IntlProvider } from 'react-intl';
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import { editable, getDocFromElement, fullpage } from '../_helpers';
import { documentWithMergedRows } from './__fixtures__/merged-rows-document';
import { documentWithMergedColumns } from './__fixtures__/merged-columns-document';
import { TableCssClassName as ClassName } from '../../../plugins/table/types';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';
import messages from '../../../plugins/table/ui/messages';

BrowserTestCase(
  'Should delete merged rows from contextual menu',
  { skip: ['ie'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    const intlProvider = new IntlProvider({ locale: 'en' });
    const { intl } = intlProvider.getChildContext();

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(documentWithMergedRows),
      allowTables: {
        advanced: true,
      },
    });

    const controlSelector = `tbody tr:last-child td:last-child`;
    await page.waitForSelector(controlSelector);
    await page.click(controlSelector);

    const contextMenuTriggerSelector = `.${ClassName.CONTEXTUAL_MENU_BUTTON}`;
    await page.waitForSelector(contextMenuTriggerSelector);
    await page.click(contextMenuTriggerSelector);

    const message = await intl.formatMessage(messages.removeRows, {
      0: 2,
    });
    const contextMenuItemSelector = `span=${message}`;
    await page.waitForSelector(contextMenuItemSelector);
    await page.click(contextMenuItemSelector);

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'Should delete merged columns from contextual menu',
  { skip: ['ie'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    const intlProvider = new IntlProvider({ locale: 'en' });
    const { intl } = intlProvider.getChildContext();

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(documentWithMergedColumns),
      allowTables: {
        advanced: true,
      },
    });

    const controlSelector = `tbody > tr th + th`;
    await page.waitForSelector(controlSelector);
    await page.click(controlSelector);

    const contextMenuTriggerSelector = `.${ClassName.CONTEXTUAL_MENU_BUTTON}`;
    await page.waitForSelector(contextMenuTriggerSelector);
    await page.click(contextMenuTriggerSelector);

    const message = await intl.formatMessage(messages.removeColumns, {
      0: 2,
    });
    const contextMenuItemSelector = `span=${message}`;
    await page.waitForSelector(contextMenuItemSelector);
    await page.click(contextMenuItemSelector);

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
