// @flow

/* Currently, this test will check if the new navigation example renders into different browsers.*/
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import * as assert from 'assert';

/* Url to test the example */
const exampleURL = getExampleUrl(
  'core',
  'navigation-next',
  'composed-navigation',
);

/* Css selectors used for the tests */
const getByKey = key => `[data-webdriver-test-key="${key}"]`;

function checkConsoleErrors(instance) {
  if (!instance.log('browser').value) return;

  instance.log('browser').value.forEach(val => {
    assert.notEqual(
      val.level,
      'SEVERE',
      `Console errors :${val.message} when view the form`,
    );
  });
}

BrowserTestCase(
  '🌏 Global navigation should render without errors',
  async client => {
    const page = new Page(client);
    const globalNav = getByKey('global-navigation');
    await page.goto(exampleURL);

    expect(await page.isVisible(`${globalNav} [aria-label="Jira"]`)).toBe(true);
    expect(await page.isVisible(`${globalNav} [aria-label="Search"]`)).toBe(
      true,
    );
    expect(await page.isVisible(`${globalNav} [aria-label="Add"]`)).toBe(true);
    expect(await page.isVisible(`${globalNav} [aria-label="Help"]`)).toBe(true);

    checkConsoleErrors(page);
  },
);
BrowserTestCase(
  '📦 Product navigation should render without errors',
  async client => {
    const page = new Page(client);
    await page.goto(exampleURL);

    expect(await page.isVisible(getByKey('product-header'))).toBe(true);
    expect(await page.isVisible(getByKey('product-item-dashboards'))).toBe(
      true,
    );
    expect(await page.isVisible(getByKey('product-item-projects'))).toBe(true);
    expect(await page.isVisible(getByKey('product-item-issues'))).toBe(true);

    checkConsoleErrors(page);
  },
);
BrowserTestCase(
  '🎁 Container navigation should render without errors',
  async client => {
    const page = new Page(client);
    await page.goto(exampleURL);

    expect(await page.isVisible(getByKey('container-header'))).toBe(true);
    expect(await page.isVisible(getByKey('container-item-backlog'))).toBe(true);
    expect(await page.isVisible(getByKey('container-item-sprints'))).toBe(true);
    expect(await page.isVisible(getByKey('container-item-reports'))).toBe(true);

    checkConsoleErrors(page);
  },
);
