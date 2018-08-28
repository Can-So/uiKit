import { removeOldProdSnapshots } from '@atlaskit/visual-regression/helper';

import { imageSnapshotFolder, initEditor } from '../_utils';
import {
  setupMediaMocksProviders,
  insertMedia,
  editable,
} from '../../integration/_helpers';

const snapshot = async page => {
  const image = await page.screenshot();
  // @ts-ignore
  expect(image).toMatchProdImageSnapshot();
};

describe('Snapshot Test: Media', () => {
  beforeAll(async () => {
    removeOldProdSnapshots(imageSnapshotFolder);
  });

  describe('full page editor', () => {
    let page;
    beforeAll(async () => {
      // @ts-ignore
      page = global.page;

      await page.setViewport({ width: 1920, height: 1080 });
      await initEditor(page, 'full-page-with-toolbar');
      await setupMediaMocksProviders(page);

      // click into the editor
      await page.waitForSelector(editable);
      await page.click(editable);

      // insert single media item
      await insertMedia(page);
    });

    it('renders selection ring around media (via up)', async () => {
      await snapshot(page);
      await page.keyboard.down('ArrowUp');
      await snapshot(page);
    });

    it('renders selection ring around media (via gap cursor)', async () => {
      await page.keyboard.down('ArrowLeft');
      await page.keyboard.down('ArrowLeft');
      await snapshot(page);

      await page.keyboard.down('ArrowLeft');
      await snapshot(page);
    });
  });

  describe('comment editor', () => {
    let page;
    beforeEach(async () => {
      // @ts-ignore
      page = global.page;

      // half height to cut off JSON output which changes depending on media ID
      await page.setViewport({ width: 1920, height: 540 });
      await initEditor(page, 'comment');
      await setupMediaMocksProviders(page);

      // click into the editor
      await page.waitForSelector(editable);
      await page.click(editable);

      // insert 3 media items
      await insertMedia(page, [0, 1, 2]);
    });

    it('renders selection ring around last media group item (via up)', async () => {
      await snapshot(page);

      await page.keyboard.down('ArrowUp');
      await snapshot(page);
    });

    it('renders selection ring around media group items', async () => {
      await snapshot(page);

      await page.keyboard.down('ArrowLeft');
      await page.keyboard.down('ArrowLeft');
      await snapshot(page);

      await page.keyboard.down('ArrowLeft');
      await snapshot(page);

      await page.keyboard.down('ArrowLeft');
      await snapshot(page);
    });
  });
});
