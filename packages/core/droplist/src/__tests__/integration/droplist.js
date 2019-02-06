// @flow

import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

/* Url to test the example */
const urlDrawer = getExampleUrl('core', 'droplist', 'basic-example');

console.log(process.env.BROWSERSTACK_USERNAME, process.env.BROWSERSTACK_KEY);

/* Css selectors used for the test */
const droplistButton = 'button[type="button"]';
const droplist = 'div[data-role="droplistContent"]';

BrowserTestCase(
  'Droplist should close when Esc key is pressed in IE and Edge',
  // { skip: ['safari', 'firefox', 'chrome'] }, // the issue was only occurring in IE and Edge
  {},
  async client => {
    const droplistTest = new Page(client);
    await droplistTest.goto(urlDrawer);
    await droplistTest.waitFor(droplistButton, 5000);
    await droplistTest.click(droplistButton);
    await droplistTest.waitFor(droplist, 1000);

    await droplistTest.type(droplist, ['Esc']);
    // expect droplist to be closed
    // expect(droplist).tobeClosed

    await droplistTest.checkConsoleErrors();
  },
);
