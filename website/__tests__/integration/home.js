// @flow
// eslint-disable-next-line
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  startDevServer,
  stopDevServer,
} from '@atlaskit/webdriver-runner/utils/webpack';
// eslint-disable-next-line
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import * as assert from 'assert';

const urlHome = 'https://atlaskit.atlassian.com/';

const app = '#app';
const atlaskitLayer = '[spacing="cosy"]';
const atlaskitLogo = '[alt="Atlaskit logo"]';
const atlaskitTitle = 'h1';

BrowserTestCase(
  `The website home page should be displayed without errors`,
  async client => {
    const homeTest = await new Page(client);
    await homeTest.goto(urlHome);
    await homeTest.waitForSelector(app);
    const title = await homeTest.getText(atlaskitTitle);
    const logo = await homeTest.isVisible(atlaskitLogo);
    const pageIsVisible = await homeTest.isVisible(atlaskitLayer);
    // eslint-disable-next-line
    expect(logo).toBe(true);
    expect(title).toBe('Atlaskit');
    expect(pageIsVisible).toBe(true);
    if (homeTest.log('browser').value) {
      homeTest.log('browser').value.forEach(val => {
        assert.notEqual(
          val.level,
          'SEVERE',
          `Console errors :${val.message} when navigating to the home page`,
        );
      });
    }
  },
);
