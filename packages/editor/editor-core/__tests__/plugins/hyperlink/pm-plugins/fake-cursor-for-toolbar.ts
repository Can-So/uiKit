import fakeCursorForToolbarPlugin from '../../../../src/plugins/hyperlink/pm-plugins/fake-cursor-for-toolbar';
import {
  doc,
  p,
  createEditor,
  defaultSchema,
  insertText,
  a,
} from '@atlaskit/editor-test-helpers';
import { DecorationSet, Decoration } from 'prosemirror-view';
import { PluginSpec, EditorState } from 'prosemirror-state';
import { showLinkToolbar } from '../../../../src/plugins/hyperlink/commands';

const init = (fakeCursorForToolbarPlugin.spec as PluginSpec).state!.init;
const getDecorations = (state: EditorState) =>
  (fakeCursorForToolbarPlugin.spec as PluginSpec).props!.decorations!(
    state,
  ) as DecorationSet;

describe('hyperlink', () => {
  const editor = (doc: any) => {
    return createEditor({
      doc,
    });
  };

  describe('fake-cursor-for-toolbar plugin', () => {
    it('should render no decorations initially', () => {
      const pluginState = init(
        {},
        EditorState.create({ schema: defaultSchema }),
      );
      expect(pluginState).toBe(DecorationSet.empty);
    });

    it('should render no decorations when hyperlink plugin is not showing insert link toolbar', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, 'text', sel);
      expect(getDecorations(editorView.state)).toBe(DecorationSet.empty);
    });

    it('should render no decorations when cursor inside a link', () => {
      const { editorView } = editor(
        doc(p(a({ href: 'google.com' })('li{<>}nk'))),
      );
      expect(getDecorations(editorView.state)).toBe(DecorationSet.empty);
    });

    it('should render cursor decoration when hyperlink plugin has a cursor selection ', () => {
      const { editorView } = editor(doc(p('{<>}')));
      showLinkToolbar()(editorView.state, editorView.dispatch);

      const decorations = getDecorations(editorView.state);
      expect(decorations.find()).toEqual([
        Decoration.widget(1, expect.any(HTMLElement)),
      ]);
    });

    it('should update cursor decoration when document changed', () => {
      const { editorView } = editor(doc(p('{<>}')));
      showLinkToolbar()(editorView.state, editorView.dispatch);
      const oldDecorations = getDecorations(editorView.state);

      const documentChangeTr = editorView.state.tr.insertText('text', 1);
      // Don't use dispatch to mimic collab provider
      editorView.updateState(editorView.state.apply(documentChangeTr));
      const newDecorations = getDecorations(editorView.state);

      expect(newDecorations).toEqual(
        oldDecorations.map(documentChangeTr.mapping, documentChangeTr.doc),
      );
      // Ensure we're not creating a new DOM element for this change
      expect((newDecorations.find()[0] as any).type.toDOM).toBe(
        (oldDecorations.find()[0] as any).type.toDOM,
      );
    });

    it('should render selection decoration when hyperlink plugin has a cursor selection ', () => {
      const { editorView } = editor(doc(p('{<}text{>}')));
      showLinkToolbar()(editorView.state, editorView.dispatch);

      const decorations = getDecorations(editorView.state);
      expect(decorations.find()).toEqual([
        Decoration.inline(1, 5, { class: 'ProseMirror-fake-text-selection' }),
      ]);
    });
  });
});
