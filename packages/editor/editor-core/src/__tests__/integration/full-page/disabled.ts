import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

import { fullpageDisabled } from '../_helpers';

BrowserTestCase(
  "disabled.ts: Shouldn't be able to type in the disabled editor",
  { skip: ['edge', 'ie', 'firefox', 'safari'] },
  async (client: any) => {
    const browser = new Page(client);
    await browser.goto(fullpageDisabled.path);
    await browser.waitForSelector(fullpageDisabled.placeholder);

    expect.assertions(1);
    return expect(
      browser.click(fullpageDisabled.placeholder),
    ).rejects.toThrowError('unknown error: Element is not clickable at point');
  },
);

BrowserTestCase(
  "disabled.ts: Shouldn't be able to type in a panel",
  { skip: ['edge', 'ie', 'firefox', 'safari'] },
  async (client: any) => {
    const browser = new Page(client);
    await browser.goto(fullpageDisabled.path);
    await browser.waitForSelector(fullpageDisabled.placeholder);

    expect.assertions(1);
    return expect(
      browser.click('.ak-editor-panel__content'),
    ).rejects.toThrowError('unknown error: Element is not clickable at point');
  },
);

BrowserTestCase(
  "disabled.ts: Shouldn't be able to type in a table",
  { skip: ['edge', 'ie', 'firefox', 'safari'] },
  async (client: any) => {
    const browser = new Page(client);
    await browser.goto(fullpageDisabled.path);
    await browser.waitForSelector(fullpageDisabled.placeholder);

    expect.assertions(1);
    return expect(
      browser.click('.pm-table-cell-nodeview-content-dom'),
    ).rejects.toThrowError('unknown error: Element is not clickable at point');
  },
);
