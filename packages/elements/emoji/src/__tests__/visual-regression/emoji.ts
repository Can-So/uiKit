import {
  getExampleUrl,
  takeScreenShot,
} from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  let page: any;
  const url = getExampleUrl(
    'elements',
    'emoji',
    'simple-emoji',
    // @ts-ignore
    global.__BASEURL__,
  );

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await page.goto(url);
  });

  it(`should render emoji`, async () => {
    const image = await takeScreenShot(page, url);
    // @ts-ignore
    expect(image).toMatchProdImageSnapshot();
  });
});
