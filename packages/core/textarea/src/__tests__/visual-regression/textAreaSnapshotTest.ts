import {
  getExampleUrl,
  takeScreenShot,
} from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('Textfield basic should match production example', async () => {
    const url = getExampleUrl(
      'core',
      'textarea',
      'basic',
      // @ts-ignore
      global.__BASEURL__,
    );
    // @ts-ignore
    const image = await takeScreenShot(global.page, url);
    expect(image).toMatchProdImageSnapshot();
  });
});
