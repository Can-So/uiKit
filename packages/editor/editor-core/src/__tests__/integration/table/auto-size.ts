import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { sleep } from '@atlaskit/editor-test-helpers';

import { editable, getDocFromElement, fullpage } from '../_helpers';

import {
  autoSizeToDefaultLayout,
  autoSizeToWideLayout,
  autoSizeToFullWidthLayout,
} from './__fixtures__/auto-size-documents';

import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

async function loadAndRetrieveDocument(
  page,
  document,
  expectedLayout = 'default',
) {
  await page.browser.windowHandleMaximize();

  await mountEditor(page, {
    appearance: fullpage.appearance,
    defaultValue: JSON.stringify(document),
    allowPanel: true,
    allowTables: {
      advanced: true,
    },
  });

  await page.waitForSelector(`table[data-layout="${expectedLayout}"]`);
  await sleep(500);

  const doc = await page.$eval(editable, getDocFromElement);
  return doc;
}

BrowserTestCase(
  'Doesnt scale past default',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    const doc = await loadAndRetrieveDocument(page, autoSizeToDefaultLayout);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'Scales to wide',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    const doc = await loadAndRetrieveDocument(
      page,
      autoSizeToWideLayout,
      'wide',
    );
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'Scales to full-width',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async (client: any) => {
    const page = await goToEditorTestingExample(client);
    const doc = await loadAndRetrieveDocument(
      page,
      autoSizeToFullWidthLayout,
      'full-width',
    );
    expect(doc).toMatchDocSnapshot();
  },
);
