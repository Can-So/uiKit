import {
  getExampleUrl,
  takeScreenShot,
} from '@atlaskit/visual-regression/helper';
const puppeteer = require('puppeteer');

describe('Snapshot Test', () => {
  it('ButtonAppearances should match production example', async () => {
    const browser = await puppeteer.launch({
      // run test in headless mode
      headless: true,
      executablePath: process.env.CHROME_BIN || null,
      slowMo: 100,
      args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    });
    const url = getExampleUrl(
      'core',
      'button',
      'ButtonAppearances',
      // @ts-ignore
      global.__BASEURL__,
    );
    // @ts-ignore
    const image = await takeScreenShot(browser, url);
    expect(image).toMatchProdImageSnapshot();
  });
});
