import {
  getExampleUrl,
  takeScreenShot,
} from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  let page: any;
  const url = getExampleUrl(
    'elements',
    'emoji',
    'standard-emoji-picker-with-upload',
    // @ts-ignore
    global.__BASEURL__,
  );

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await page.goto(url);
    page.waitForSelector('div[data-emoji-picker-container="true"]');
  });

  it(`should render emoji picker`, async () => {
    const image = await takeScreenShot(page, url);
    // @ts-ignore
    expect(image).toMatchProdImageSnapshot({
      failureThreshold: '100',
      failureThresholdType: 'pixel',
    });
  });
});
