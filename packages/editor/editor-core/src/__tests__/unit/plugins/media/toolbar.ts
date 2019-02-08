import { floatingToolbar } from '../../../../plugins/media/toolbar';
import { IntlProvider } from 'react-intl';
import {
  createEditorFactory,
  doc,
  p,
  randomId,
  mediaSingle,
  media,
  bodiedExtension,
  layoutSection,
  layoutColumn,
} from '@atlaskit/editor-test-helpers';

import commonMessages from '../../../../messages';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import { FloatingToolbarButton } from '../../../../plugins/floating-toolbar/types';
import { setNodeSelection } from '../../../../utils';
import { Command } from '../../../../types';

describe('media', () => {
  const createEditor = createEditorFactory();

  const testCollectionName = `media-plugin-mock-collection-${randomId()}`;
  const temporaryFileId = `temporary:${randomId()}`;

  const editor = (doc: any) =>
    createEditor({
      doc,
      editorProps: {
        media: { allowMediaSingle: true },
        allowExtension: true,
        allowLayouts: true,
      },
    });

  const temporaryMedia = media({
    id: temporaryFileId,
    __key: temporaryFileId,
    type: 'file',
    collection: testCollectionName,
    __fileMimeType: 'image/png',
    width: 100,
    height: 100,
  })();

  const temporaryMediaSingle = mediaSingle({ layout: 'center' })(
    temporaryMedia,
  );

  const docWithMediaSingle = doc(temporaryMediaSingle);

  describe('toolbar', () => {
    const intlProvider = new IntlProvider({ locale: 'en' });
    const { intl } = intlProvider.getChildContext();

    const removeTitle = intl.formatMessage(commonMessages.remove);

    it('has a remove button', () => {
      const { editorView } = editor(docWithMediaSingle);

      const toolbar = floatingToolbar(editorView.state, intl);
      expect(toolbar).toBeDefined();
      const removeButton = toolbar!.items.find(
        item => item.type === 'button' && item.title === removeTitle,
      );

      expect(removeButton).toBeDefined();
      expect(removeButton).toMatchObject({
        appearance: 'danger',
        icon: RemoveIcon,
      });
    });

    it('should render alignment, wrapping and breakout buttons in full page without resizing enabled', () => {
      const { editorView } = editor(docWithMediaSingle);

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        undefined,
        'full-page',
      );
      expect(toolbar).toBeDefined();
      expect(toolbar!.items.length).toEqual(11);
    });

    it('should only render alignment and wrapping buttons in full page when resizing is enabled', () => {
      const { editorView } = editor(docWithMediaSingle);

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        true,
        'full-page',
      );
      expect(toolbar).toBeDefined();
      expect(toolbar!.items.length).toEqual(8);
    });

    it('should not render any layout buttons when in comment', () => {
      const { editorView } = editor(docWithMediaSingle);

      const toolbar = floatingToolbar(editorView.state, intl, true, 'comment');
      expect(toolbar).toBeDefined();
      expect(toolbar!.items.length).toEqual(1);
    });

    it('should not render any layout buttons when inside a macro', () => {
      const { editorView } = editor(
        doc(
          bodiedExtension({
            extensionKey: 'extensionKey',
            extensionType: 'bodiedExtension',
          })(temporaryMediaSingle),
        ),
      );

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        true,
        'full-page',
      );
      expect(toolbar).toBeDefined();
      expect(toolbar!.items.length).toEqual(1);
    });

    it('should not render any layout buttons when inside columns', () => {
      const { editorView } = editor(
        doc(
          layoutSection(
            layoutColumn({ width: 50 })(p('')),
            layoutColumn({ width: 50 })(temporaryMediaSingle),
          ),
        ),
      );

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        true,
        'full-page',
      );
      expect(toolbar).toBeDefined();
      expect(toolbar!.items.length).toEqual(1);
    });

    it('deletes a media single', () => {
      const { editorView } = editor(docWithMediaSingle);
      setNodeSelection(editorView, 0);

      const toolbar = floatingToolbar(editorView.state, intl);
      const removeButton = toolbar!.items.find(
        item => item.type === 'button' && item.title === removeTitle,
      ) as FloatingToolbarButton<Command>;

      removeButton.onClick(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(doc(p()));
    });

    it('aligns a media single to the left', () => {
      const { editorView } = editor(docWithMediaSingle);
      setNodeSelection(editorView, 0);

      const alignLeftTitle = intl.formatMessage(commonMessages.alignImageLeft);

      const toolbar = floatingToolbar(
        editorView.state,
        intl,
        true,
        'full-page',
      );
      const button = toolbar!.items.find(
        item => item.type === 'button' && item.title === alignLeftTitle,
      ) as FloatingToolbarButton<Command>;

      button.onClick(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(mediaSingle({ layout: 'align-start' })(temporaryMedia)),
      );
    });
  });
});
