import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  callNativeBridge,
  editor,
  editable,
  getDocFromElement,
  skipBrowsers as skip,
} from '../_utils';

BrowserTestCase(`links.ts: Create new link`, { skip }, async client => {
  const browser = new Page(client);

  await browser.goto(editor.path);
  await browser.waitForSelector(editable);

  await callNativeBridge(
    browser,
    'onLinkUpdate',
    'Atlassian',
    'https://www.atlassian.com',
  );

  const doc = await browser.$eval(editable, getDocFromElement);
  expect(doc).toMatchDocSnapshot();
});

BrowserTestCase(
  `links.ts: Replace text with link`,
  // Safari has issues with key events
  { skip: skip.concat('safari') },
  async client => {
    const browser = new Page(client);

    await browser.goto(editor.path);
    await browser.waitForSelector(editable);

    await browser.type(editable, 'This will become a link');
    await browser.type(editable, ['ArrowLeft', 'ArrowLeft']);

    await callNativeBridge(
      browser,
      'onLinkUpdate',
      'Atlassian',
      'https://www.atlassian.com',
    );

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
