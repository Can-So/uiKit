import { snapshot, Appearance, initEditorWithAdf, Device } from '../_utils';
import { insertMedia } from '../../__helpers/page-objects/_media';
import { clickEditableContent } from '../../__helpers/page-objects/_editor';
import { pressKey, KeyboardKeys } from '../../__helpers/page-objects/_keyboard';

// TODO: ED-6319 Selection is broken
describe('Snapshot Test: Media', () => {
  describe('full page editor', () => {
    let page;
    beforeAll(async () => {
      // @ts-ignore
      page = global.page;

      await initEditorWithAdf(page, {
        appearance: Appearance.fullPage,
        device: Device.LaptopHiDPI,
      });

      // click into the editor
      await clickEditableContent(page);

      // insert single media item
      await insertMedia(page);
    });

    it('renders selection ring around media (via up)', async () => {
      await snapshot(page);
      await pressKey(page, KeyboardKeys.arrowUp);
      await snapshot(page);
    });

    it('renders selection ring around media (via gap cursor)', async () => {
      await pressKey(page, [KeyboardKeys.arrowLeft, KeyboardKeys.arrowLeft]);
      await snapshot(page);

      await pressKey(page, KeyboardKeys.arrowLeft);
      await snapshot(page);
    });
  });

  describe('comment editor', () => {
    let page;
    beforeEach(async () => {
      // @ts-ignore
      page = global.page;

      await initEditorWithAdf(page, {
        appearance: Appearance.comment,
        device: Device.LaptopHiDPI,
      });

      // click into the editor
      await clickEditableContent(page);

      // insert 3 media items
      await insertMedia(page, ['one.svg', 'two.svg', 'three.svg']);
    });

    it('renders selection ring around last media group item (via up)', async () => {
      await snapshot(page);

      await pressKey(page, KeyboardKeys.arrowUp);
      await snapshot(page);
    });

    it('renders selection ring around media group items', async () => {
      await snapshot(page);

      await pressKey(page, [KeyboardKeys.arrowLeft, KeyboardKeys.arrowLeft]);
      await snapshot(page);

      await pressKey(page, KeyboardKeys.arrowLeft);
      await snapshot(page);

      await pressKey(page, KeyboardKeys.arrowLeft);
      await snapshot(page);
    });
  });
});
