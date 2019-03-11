import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  getBridgeOutput,
  editor,
  editable,
  clipboardHelper,
  copyAsPlaintextButton,
  clipboardInput,
  getDocFromElement,
} from '../_utils';
import { sleep } from '@atlaskit/editor-test-helpers';

BrowserTestCase(
  `inline-1.ts: pasting an link converts to inline card`,
  {
    skip: ['ie', 'safari'],
  },
  async (client: any) => {
    let browser = new Page(client);

    // copy stuff to clipboard
    await browser.goto(clipboardHelper);
    await browser.isVisible(clipboardInput);
    await browser.type(
      clipboardInput,
      ' https://atlaskit.atlassian.com/examples/editor/editor-core/full-page ',
    );
    await browser.click(copyAsPlaintextButton);

    // open up editor
    await browser.goto(editor.path);
    await browser.waitForSelector(editor.placeholder);
    await browser.click(editor.placeholder);
    await browser.waitForSelector(editable);

    // type some text into the paragraph first
    await browser.type(editable, 'hello have a link ');

    // // paste the link
    await browser.paste(editable);
    await sleep(4000);

    const doc = await browser.$eval(editable, getDocFromElement);
    console.log('doc is ', JSON.stringify(doc));
    // expect(doc).toMatchDocSnapshot();
  },
);
