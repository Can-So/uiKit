import {
  getExampleUrl,
  takeScreenShot,
} from '@atlaskit/visual-regression/helper';

// add some comments
describe('Snapshot Test', () => {
  it('ButtonAppearances should match snapshot', async () => {
    const url = getExampleUrl(
      'core',
      'button',
      'ButtonAppearances',
      // @ts-ignore
      global.__BASEURL__,
    );
    // @ts-ignore
    const image = await takeScreenShot(global.page, url);
    expect(image).toMatchProdImageSnapshot();
  });
});
