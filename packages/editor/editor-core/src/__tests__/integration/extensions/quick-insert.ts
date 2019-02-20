import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { messages } from '../../../plugins/insert-block/ui/ToolbarInsertBlock';

import {
  getDocFromElement,
  fullpage,
  editable,
  quickInsert,
} from '../_helpers';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';

BrowserTestCase(
  `quick-insert.ts: Extension: Quick Insert`,
  { skip: ['edge', 'ie', 'safari'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: 'full-page',
      allowExtension: {
        allowBreakout: true,
      },
      quickInsert: true,
    });
    await page.click(fullpage.placeholder);

    await quickInsert(page, 'Bodied extension');
    await quickInsert(page, messages.action.defaultMessage);

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
