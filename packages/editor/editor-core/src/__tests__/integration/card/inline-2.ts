import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  getDocFromElement,
  fullpage,
  editable,
  clipboardHelper,
  copyAsPlaintextButton,
  clipboardInput,
} from '../_helpers';

// behaviour is OS specific:
// windows moves to next paragraph up
// osx moves to top of document
const moveUp = (page: any, selector: string) => {
  let keys;
  if (page.browser.desiredCapabilities.os === 'Windows') {
    keys = ['Control', 'ArrowUp'];
  } else {
    keys = ['Command', 'ArrowUp'];
  }
  return page.browser.addValue(selector, keys);
};

BrowserTestCase(
  `inline-2.ts: pasting an link then typing still converts to inline card`,
  {
    skip: ['ie', 'safari'],
  },
  async (client: any) => {
    let browser = new Page(client);

    // copy stuff to clipboard
    await browser.goto(clipboardHelper);
    await browser.isVisible(clipboardInput);
    await browser.type(clipboardInput, 'https://www.atlassian.com');
    await browser.click(copyAsPlaintextButton);

    // open up editor
    await browser.goto(fullpage.path);
    await browser.waitForSelector(fullpage.placeholder);
    await browser.click(fullpage.placeholder);
    await browser.waitForSelector(editable);

    // type some text into the paragraph first
    await browser.type(editable, 'hello have a link ');

    // paste the link
    await browser.paste(editable);

    // type some text around it
    await browser.type(editable, 'more typing');
    await moveUp(browser, editable);
    await browser.type(editable, 'more typing ');

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
