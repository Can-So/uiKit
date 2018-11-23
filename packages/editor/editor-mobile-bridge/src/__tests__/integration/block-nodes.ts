import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  callNativeBridgeFn,
  editor,
  editable,
  getDocFromElement,
  clearEditor,
} from './_utils';

[
  'onActionInsert',
  'onDecisionInsert',
  'onBlockQuoteInsert',
  'onCodeBlockInsert',
  'onPanelInsert',
  'onTableInsert',
].forEach((fn, i) => {
  BrowserTestCase(
    `block-nodes.ts: Calls ${fn} and results in valid ADF`,
    // FIXME Ideally these would be mobile browsers
    // Safari & Chrome should suffice for now.
    { skip: ['ie', 'firefox', 'edge'] },
    async client => {
      const browser = new Page(client);

      if (i === 0) {
        await browser.goto(editor.path);
      } else {
        await clearEditor(browser);
      }

      await browser.waitForSelector(`${editable} > p`);
      await callNativeBridgeFn(browser, fn);

      const doc = await browser.$eval(editable, getDocFromElement);
      expect(doc).toMatchDocSnapshot();
    },
  );
});
