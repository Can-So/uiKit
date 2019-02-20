import { Page as PuppeteerPage } from 'puppeteer';
import SeleniumPage from '@atlaskit/webdriver-runner/wd-wrapper';

export type Page = PuppeteerPage | typeof SeleniumPage;
