// @flow
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

/* Url to test the example */
const urlTextfields = getExampleUrl('core', 'form', 'text-fields');

/** Css selectors used for the text fields test */
const textfieldsForm = 'form[name="text-fields"]';
const textfieldsTextarea = 'textarea[name="description"]';
const textfieldsTextfield = 'input[name="firstname"]';

BrowserTestCase(
  'Pressing ctrl + enter in the text area should focus on invalid field',
  { skip: ['ie'] },
  async client => {
    const formTest = new Page(client);
    await formTest.goto(urlTextfields);
    await formTest.waitForSelector(textfieldsForm);
    await formTest.click(textfieldsTextarea);
    await formTest.keys(['Control', 'Enter']);
    expect(await formTest.hasFocus(textfieldsTextfield)).toBe(true);
    await formTest.checkConsoleErrors();
  },
);
