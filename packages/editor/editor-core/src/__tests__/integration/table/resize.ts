import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import {
  editable,
  getDocFromElement,
  fullpage,
  resizeColumn,
} from '../_helpers';
import { tableWithRowSpan } from './__fixtures__/resize-documents';

import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

BrowserTestCase(
  'Can resize normally with a rowspan in the non last column.',
  { skip: ['ie'] },
  async client => {
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
