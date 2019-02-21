import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import {
  editable,
  getDocFromElement,
  fullpage,
  quickInsert,
} from '../_helpers';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';
import { selectors } from './_utils';

BrowserTestCase(
  'insert-link.ts: Insert link in panel by typing Markdown',
  { skip: ['edge', 'ie'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
      allowPanel: true,
    });

    await page.click(fullpage.placeholder);

    await quickInsert(page, 'Panel');
    await page.waitForSelector(selectors.PANEL_EDITOR_CONTAINER);

    await page.type(editable, '[Atlassian](https://www.atlassian.com/)');

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
