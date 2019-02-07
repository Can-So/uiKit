import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  callNativeBridge,
  editor,
  editable,
  skipBrowsers as skip,
  getBridgeOutput,
} from '../_utils';

BrowserTestCase(
  `links.ts: currentSelection when no selection`,
  // Safari has issues with key events
  { skip: skip.concat('safari') },
  async client => {
    const browser = new Page(client);
    await browser.goto(editor.path);
    await browser.waitForSelector(editable);

    await browser.type(editable, 'Normal Text');
    await browser.type(editable, ['ArrowLeft']);

    const currentSelection = await getBridgeOutput(
      browser,
      'linkBridge',
      'currentSelection',
    );
    expect(currentSelection).toMatchSnapshot();
  },
);

BrowserTestCase(
  `links.ts: currentSelection when cursor is on link`,
  // Safari has issues with key events
  { skip: skip.concat('safari') },
  async client => {
    const browser = new Page(client);
    await browser.goto(editor.path);
    await browser.waitForSelector(editable);

    await callNativeBridge(
      browser,
      'onLinkUpdate',
      'Atlassian',
      'https://www.atlassian.com',
    );
    await browser.type(editable, ['ArrowLeft']);

    const currentSelection = await getBridgeOutput(
      browser,
      'linkBridge',
      'currentSelection',
    );
    expect(currentSelection).toMatchSnapshot();
  },
);
