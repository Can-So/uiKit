import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

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

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadAndRetrieveDocument(page, document) {
  await page.browser.windowHandleMaximize();

  await mountEditor(page, {
    appearance: fullpage.appearance,
    defaultValue: JSON.stringify(document),
    allowPanel: true,
    allowTables: {
      advanced: true,
    },
  });

  await sleep(1000);

  const doc = await page.$eval(editable, getDocFromElement);
  return doc;
}

BrowserTestCase(
  'auto-size.ts: Doesnt scale past default',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    const doc = await loadAndRetrieveDocument(page, autoSizeToDefaultLayout);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'auto-size.ts: Scales to wide',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    const doc = await loadAndRetrieveDocument(page, autoSizeToWideLayout);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'auto-size.ts: Scales to full-width',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async client => {
    const page = await goToEditorTestingExample(client);
    const doc = await loadAndRetrieveDocument(page, autoSizeToFullWidthLayout);
    expect(doc).toMatchDocSnapshot();
  },
);
