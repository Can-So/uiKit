import { initEditorWithAdf, Appearance } from '../../_utils';
import {
  getEditorWidth,
  typeInEditor,
  disableTransition,
} from '../../../__helpers/page-objects/_editor';
import {
  insertMedia,
  resizeMediaInPositionWithSnapshot,
  clickMediaInPosition,
  changeMediaLayout,
  MediaLayout,
  MediaResizeSide,
  TestPageConfig,
  isLayoutAvailable,
} from '../../../__helpers/page-objects/_media';

export function createResizeFullPageForConfig(config: TestPageConfig) {
  describe('Snapshot Test: Media', () => {
    describe('full page editor', () => {
      let page;

      beforeAll(async () => {
        // @ts-ignore
        page = global.page;
      });

      // run the suite of tests for each viewport/prop combination
      const {
        dynamicTextSizing,
        viewport: { width, height },
      } = config;

      describe(`at ${width}x${height} ${
        dynamicTextSizing ? 'with' : 'without'
      } dynamic text sizing`, async () => {
        let editorWidth;

        beforeEach(async () => {
          // setup the editor
          await initEditorWithAdf(page, {
            appearance: Appearance.fullPage,
            viewport: { width, height },
            editorProps: {
              allowDynamicTextSizing: dynamicTextSizing,
            },
          });

          await disableTransition(page, '.gridLine');

          editorWidth = await getEditorWidth(page);
        });

        if (isLayoutAvailable(MediaLayout.wide, width)) {
          it('can make an image wide', async () => {
            // `insertMedia` etc are in each test so we don't load up
            // the mediapicker for tests that don't end up running in beforeEach
            await insertMedia(page);
            await resizeMediaInPositionWithSnapshot(page, 0, 300);
          });
        }

        if (isLayoutAvailable(MediaLayout.fullWidth, width)) {
          it('can make an image full-width', async () => {
            await insertMedia(page);
            await resizeMediaInPositionWithSnapshot(page, 0, 600);
          });
        }

        describe('center layout', () => {
          [2, 6, 10].forEach(cols => {
            it(`can make an image ${cols} columns wide`, async () => {
              const distance = -((editorWidth / 2) * ((12 - cols) / 12));

              await insertMedia(page);

              await resizeMediaInPositionWithSnapshot(page, 0, distance);
            });
          });
        });

        describe('wrap-left layout', () => {
          [2, 6, 10].forEach(cols => {
            it(`can make an wrap-left image ${cols} columns wide`, async () => {
              const distance = -((editorWidth / 12) * (12 - cols));

              await insertMedia(page);
              await clickMediaInPosition(page, 0);
              await changeMediaLayout(page, MediaLayout.wrapLeft);

              await resizeMediaInPositionWithSnapshot(page, 0, distance);
            });
          });
        });

        describe('wrap-right layout', () => {
          [2, 6, 10].forEach(cols => {
            it(`can make an wrap-right image ${cols} columns wide`, async () => {
              const distance = (editorWidth / 12) * (12 - cols);
              await insertMedia(page);
              await clickMediaInPosition(page, 0);
              await changeMediaLayout(page, MediaLayout.wrapRight);

              await resizeMediaInPositionWithSnapshot(
                page,
                0,
                distance,
                MediaResizeSide.left,
              );
            });
          });
        });

        describe('lists', () => {
          [2, 6, 10].forEach(cols => {
            it(`can make an image in a list ${cols} columns wide`, async () => {
              const distance = -((editorWidth / 12) * (12 - cols));

              await typeInEditor(page, '* ');
              await insertMedia(page);

              await resizeMediaInPositionWithSnapshot(page, 0, distance);
            });
          });
        });
      });
    });
  });
}
