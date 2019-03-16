import { BrowserTestCase } from '@findable/webdriver-runner/runner';
import Page from '@findable/webdriver-runner/wd-wrapper';
import {
  callNativeBridge,
  editor,
  editable,
  getDocFromElement,
  navigateOrClear,
  skipBrowsers as skip,
} from '../_utils';

['action', 'decision', 'blockquote', 'codeblock', 'panel', 'table'].forEach(
  (node, i) => {
    BrowserTestCase(
      `block-nodes.ts: Inserts ${node} and results in valid ADF`,
      { skip },
      async (client: any) => {
        const browser = new Page(client);

        await navigateOrClear(browser, editor.path);
        await browser.waitForSelector(`${editable} > p`);
        await callNativeBridge(browser, 'insertBlockType', node);

        const doc = await browser.$eval(editable, getDocFromElement);
        expect(doc).toMatchDocSnapshot();
      },
    );
  },
);
