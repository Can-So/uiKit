import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import * as constant from 'lodash.constant';
import * as times from 'lodash.times';

import {
  callNativeBridge,
  editor,
  editable,
  skipBrowsers as skip,
  getBridgeOutput,
} from '../_utils';

BrowserTestCase(
  'currentSelection when no selection',
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
  'currentSelection when selection',
  // Safari has issues with key events
  { skip: skip.concat('safari') },
  async client => {
    const browser = new Page(client);
    await browser.goto(editor.path);
    await browser.waitForSelector(editable);

    await browser.type(editable, 'Normal Text');

    await browser.type(editable, [
      ...times(4, constant('ArrowLeft')),
      ...times(4, constant(['Shift', 'ArrowRight'])),
    ]);

    const currentSelection = await getBridgeOutput(
      browser,
      'linkBridge',
      'currentSelection',
    );
    expect(currentSelection).toMatchSnapshot();
  },
);

BrowserTestCase(
  'currentSelection when cursor is on link',
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

BrowserTestCase(
  'currentSelection when cursor is selecting a link',
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

    await browser.type(editable, [
      ...times(9, constant('ArrowLeft')),
      ...times(9, constant(['Shift', 'ArrowRight'])),
    ]);

    const currentSelection = await getBridgeOutput(
      browser,
      'linkBridge',
      'currentSelection',
    );
    expect(currentSelection).toMatchSnapshot();
  },
);

BrowserTestCase(
  'currentSelection when cursor is selecting text and link',
  // Safari has issues with key events
  { skip: skip.concat('safari') },
  async client => {
    const browser = new Page(client);
    await browser.goto(editor.path);
    await browser.waitForSelector(editable);

    await browser.type(editable, 'This is a ');

    await callNativeBridge(
      browser,
      'onLinkUpdate',
      'link',
      'https://www.atlassian.com',
    );

    await browser.type(editable, [
      ...times(10, constant('ArrowLeft')),
      ...times(10, constant(['Shift', 'ArrowRight'])),
    ]);

    const currentSelection = await getBridgeOutput(
      browser,
      'linkBridge',
      'currentSelection',
    );
    expect(currentSelection).toMatchSnapshot();
  },
);
