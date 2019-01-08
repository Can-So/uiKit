// @flow
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

const urlSelect = getExampleUrl('core', 'select');
// css-selectors:
const selectDefault = '.react-select__control';
const selectMenu = '.react-select__menu';

BrowserTestCase(
  `select.js: Single-select should display a menu once clicked and not throwing errors`,
  { skip: ['edge'] },
  async client => {
    const selectTest = new Page(client);
    await selectTest.goto(`${urlSelect}single-select`);
    await selectTest.waitForSelector(selectDefault);
    await selectTest.click(selectDefault);
    const menuIsVisible = await selectTest.isVisible(selectMenu);
    expect(menuIsVisible).toBe(true);
    await selectTest.checkConsoleErrors();
  },
);

BrowserTestCase(
  `select.js: Multi-select should display a menu once clicked and not throwing errors`,
  { skip: ['edge'] },
  async client => {
    const selectTest = new Page(client);
    await selectTest.goto(`${urlSelect}multi-select`);
    await selectTest.waitForSelector(selectDefault);
    await selectTest.click(selectDefault);
    const menuIsVisible = await selectTest.isVisible(selectMenu);
    expect(menuIsVisible).toBe(true);
    await selectTest.checkConsoleErrors();
  },
);

BrowserTestCase(
  `select.js: Radio-select should display a menu once clicked and not throwing errors`,
  { skip: ['edge'] },
  async client => {
    const selectTest = new Page(client);
    await selectTest.goto(`${urlSelect}radio-select`);
    await selectTest.waitForSelector(selectDefault);
    await selectTest.click(selectDefault);
    const menuIsVisible = await selectTest.isVisible(selectMenu);
    expect(menuIsVisible).toBe(true);
    await selectTest.checkConsoleErrors();
  },
);

BrowserTestCase(
  `select.js: Async-select should display a menu once clicked and not throwing errors`,
  { skip: ['edge'] },
  async client => {
    const selectTest = new Page(client);
    await selectTest.goto(`${urlSelect}async-select-with-callback`);
    await selectTest.waitForSelector(selectDefault);
    await selectTest.click(selectDefault);
    const menuIsVisible = await selectTest.isVisible(selectMenu);
    expect(menuIsVisible).toBe(true);
    await selectTest.checkConsoleErrors();
  },
);
