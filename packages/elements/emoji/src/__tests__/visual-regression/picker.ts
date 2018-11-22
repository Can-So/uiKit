import {
  getExampleUrl,
  takeScreenShot,
} from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  let page;
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
  });

  it(`should render emoji picker`, async () => {
    const image = await takeScreenShot(page, url);
    // @ts-ignore
    expect(image).toMatchProdImageSnapshot();
  });
});
