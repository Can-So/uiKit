// @flow
import {
  getExampleUrl,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const openModalBtn = "[type='button']";
const modalDialog = "[role='dialog']";

describe('Snapshot Test', () => {
  it('Select in a modal dialog example should match production example', async () => {
    const url = getExampleUrl(
      'core',
      'select',
      'select-in-modal-dialog',
      global.__BASEURL__,
    );
    const { page } = global;

    await page.goto(url);
    await page.waitForSelector(openModalBtn);
    await page.click(openModalBtn);
    await page.waitFor(modalDialog);

    const image = await takeElementScreenShot(page, modalDialog);
    //$FlowFixMe
    expect(image).toMatchProdImageSnapshot();
  });
});
