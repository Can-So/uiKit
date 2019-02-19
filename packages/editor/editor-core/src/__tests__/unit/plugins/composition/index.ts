import {
  createEditorFactory,
  doc,
  emoji,
  mention,
  p,
  strong,
} from '@atlaskit/editor-test-helpers';
import { emoji as emojiData } from '@atlaskit/util-data-test';
import { ProviderFactory } from '@atlaskit/editor-common';
import emojiPlugin from '../../../../plugins/emoji';
import mentionsPlugin from '../../../../plugins/mentions';
import compositionPlugin from '../../../../plugins/composition';

const deleteContentBackward = (view, data: string | null = null) => {
  ['beforeinput', 'input'].forEach(eventType => {
    view.dom.dispatchEvent(
      new (window as any).InputEvent(eventType, {
        isComposing: false,
        inputType: 'deleteContentBackward',
        data,
      }),
    );
  });
};

const emojiProvider = emojiData.testData.getEmojiResourcePromise();
const providerFactory = ProviderFactory.create({ emojiProvider });

describe('composition events', () => {
  const createEditor = createEditorFactory();

  describe('deleteContentBackwards', () => {
    const editor = (doc: any) =>
      createEditor({
        doc,
        editorPlugins: [emojiPlugin, compositionPlugin, mentionsPlugin()],
        providerFactory,
      });

    it('should delete `nodeBefore` if its an emoji node.', () => {
      const { editorView } = editor(
        doc(
          p(
            emoji({ shortName: ':slight_smile:', id: '1f642', text: '🙂' })(),
            '{<>}',
          ),
        ),
      );

      deleteContentBackward(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(p('')));
    });

    it('should delete `nodeBefore` if its a mention node.', () => {
      const { editorView } = editor(
        doc(
          p(
            mention({ id: '3', text: '@Shae Accetta', accessLevel: '' })(),
            '{<>}',
          ),
        ),
      );

      deleteContentBackward(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(p('')));
    });

    it('shouldnt delete `nodeBefore` if its not a node.', () => {
      const { editorView } = editor(
        doc(
          p(
            emoji({ shortName: ':slight_smile:', id: '1f642', text: '🙂' })(),
            ' {<>}',
          ),
        ),
      );

      deleteContentBackward(editorView);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          p(
            emoji({ shortName: ':slight_smile:', id: '1f642', text: '🙂' })(),
            ' ',
          ),
        ),
      );
    });

    it('should delete `nodeAfter` if the selection only has a deletable node', () => {
      const { editorView } = editor(
        doc(
          p(
            '{<}',
            emoji({
              shortName: ':party_parrot:',
              id: '177777',
              text: ':party_parrot:',
            })(),
            '{>}',
          ),
        ),
      );

      deleteContentBackward(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(p('')));
    });

    it('should delete characters from a text node that contains marks', () => {
      const { editorView } = editor(
        doc(p(strong('The quick brown fox'), '{<>}', ' plain text')),
      );

      deleteContentBackward(editorView);
      deleteContentBackward(editorView);
      expect(editorView.state.doc).toEqualDocument(
        doc(p(strong('The quick brown f'), ' plain text')),
      );
    });
  });
});

/**
 * This is testing for the existence of a private API we currently rely on,
 * in the event it gets removed we should know about.
 */
describe('inDOMChange', () => {
  const createEditor = createEditorFactory();

  const editor = (doc: any) =>
    createEditor({
      doc,
      editorPlugins: [compositionPlugin],
      providerFactory,
    });

  it('should a composing domChange', () => {
    const { editorView } = editor(doc(p('{<>}')));

    const view: any = editorView;

    view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
    expect(view.inDOMChange).not.toBeUndefined();
    expect(view.inDOMChange.finish).toBeDefined();
    expect(view.inDOMChange.composing).toEqual(true);
  });
});
