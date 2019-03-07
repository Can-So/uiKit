// @flow
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

const urlPopupSelect = getExampleUrl('core', 'select', 'popup-select');
// css-selectors:
const popupButton = '#examples button';
const popupSelect = '#react-select-2-input';

BrowserTestCase(
  `Popup Select should close when Escape key is pressed in IE and Edge`,
  { skip: ['safari', 'firefox', 'chrome'] }, // the issue was only occurring in IE and Edge - AK-5319
  async client => {
    const popupSelectTest = new Page(client);
    await popupSelectTest.goto(urlPopupSelect);
    await popupSelectTest.waitForSelector(popupButton);
    await popupSelectTest.click(popupButton);
    expect(await popupSelectTest.isVisible(popupSelect)).toBe(true);

    await popupSelectTest.keys(['Escape']);
    expect(await popupSelectTest.isVisible(popupSelect)).toBe(false);
    await popupSelectTest.checkConsoleErrors();
  },
);
