import { snapshot, initFullPageEditorWithAdf, Device } from '../_utils';
import {
  clickEditableContent,
  typeInEditor,
} from '../../__helpers/page-objects/_editor';
import {
  insertMedia,
  waitForMediaToBeLoaded,
} from '../../__helpers/page-objects/_media';

describe('Snapshot Test: Media', () => {
  let page;
  beforeEach(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, {}, Device.LaptopHiDPI);

    // click into the editor
    await clickEditableContent(page);
  });

  describe('Lists', async () => {
    it('can insert a media single inside a bullet list', async () => {
      await typeInEditor(page, '* ');

      // now we can insert media as necessary
      await insertMedia(page);
      await waitForMediaToBeLoaded(page);

      await snapshot(page);
    });

    it('can insert a media single inside a numbered list', async () => {
      // type some text
      await typeInEditor(page, '1. ');

      // now we can insert media as necessary
      await insertMedia(page);
      await waitForMediaToBeLoaded(page);

      await snapshot(page);
    });
  });
});
