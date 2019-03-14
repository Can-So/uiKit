import {
  getExampleUrl,
  takeScreenShot,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

describe('TextArea', () => {
  let page: any;
  let url: string;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    url = getExampleUrl(
      'core',
      'textarea',
      'basic',
      // @ts-ignore
      global.__BASEURL__,
    );
  });

  it('basic example should match production', async () => {
    // @ts-ignore
    const image = await takeScreenShot(page, url);
    expect(image).toMatchProdImageSnapshot();
  });

  it('should become blue and white onFocus', async () => {
    await page.waitForSelector('button');
    await page.click('button');

    /**
     * This is required because the CSS transition in the styled component
     * is set to 0.2s, meaning the blue glow will only be fully displayed
     * after 0.2s. 500ms chosen to allow for some leeway in browser behaviour.
     */
    await page.waitFor(500);

    const image = await takeElementScreenShot(page, 'div#smart');
    // @ts-ignore
    expect(image).toMatchProdImageSnapshot();
  });
});
