// @flow
import {
  getExampleUrl,
  takeScreenShot,
} from '@atlaskit/visual-regression/helper';

// TODO - identify threshold or do not set cursor
describe('Snapshot Test', () => {
  it('Textfield basic should match production example', async () => {
    const url = getExampleUrl('core', 'textfield', 'basic', global.__BASEURL__);
    const image = await takeScreenShot(global.page, url);
    //$FlowFixMe
    expect(image).toMatchProdImageSnapshot();
  });
});
