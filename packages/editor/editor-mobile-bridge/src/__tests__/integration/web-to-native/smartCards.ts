import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  editor,
  editable,
  getDocFromElement,
  clipboardInput,
  copyIcon,
} from '../_utils';

BrowserTestCase(
  `inline-1.ts: pasting an link converts to inline card`,
  {
    skip: ['ie', 'safari'],
  },
  async (client: any) => {
    let browser = new Page(client);

    // open up editor
    await browser.goto(editor.path);
    await browser.waitForSelector(editable);
    await browser.isVisible(clipboardInput);
    await browser.type(clipboardInput, 'https://www.atlassian.com');
    await browser.click(copyIcon);
    await browser.waitForSelector(editor.placeholder);
    await browser.click(editor.placeholder);
    await browser.waitForSelector(editable);
    await browser.type(editable, 'here is a link ');

    // // paste the link
    await browser.paste(editable);
    await browser.type(editable, ' hello ');

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
