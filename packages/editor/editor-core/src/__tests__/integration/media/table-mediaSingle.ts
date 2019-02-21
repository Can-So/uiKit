import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  editable,
  getDocFromElement,
  insertMedia,
  fullpage,
} from '../_helpers';
import { messages as insertBlockMessages } from '../../../plugins/insert-block/ui/ToolbarInsertBlock';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

// FIXME: not entirely sure why firefox is flakey on browserstack
BrowserTestCase(
  'table-mediaSingle.ts: Can insert media single into table',
  { skip: ['edge', 'ie', 'safari', 'firefox'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
      allowTables: {
        advanced: true,
      },
      media: {
        allowMediaSingle: true,
        allowMediaGroup: true,
      },
    });
    await page.click(
      `[aria-label="${insertBlockMessages.table.defaultMessage}"]`,
    );

    // second cell
    await page.type(editable, 'Down arrow');

    // now we can insert media as necessary
    await insertMedia(page);

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
