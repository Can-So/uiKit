// @flow
import {
  getExampleUrl,
  takeScreenShot,
} from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  // You can't use other example as they create dynamic content and will fail the test
  it('Empty view example should match production example', async () => {
    const url = getExampleUrl(
      'core',
      'dynamic-table',
      'empty-view-with-body',
      global.__BASEURL__,
    );
    const image = await takeScreenShot(global.page, url);
    //$FlowFixMe
    expect(image).toMatchProdImageSnapshot();
  });
});
