import {
  doc,
  createEditorFactory,
  p,
  sendKeyToPm,
  status,
} from '@atlaskit/editor-test-helpers';
import {
  setSelectionAndPickerAt,
  validateSelection,
  getStatusesInDocument,
} from './plugin';

describe('status - keymaps', () => {
  const createEditor = createEditorFactory();

  const editorFactory = (doc: any) =>
    createEditor({
      editorProps: {
        allowStatus: true,
      },
      doc,
    });

  describe('Consume Enter/Tab keys in status node', () => {
    it('When status node is selected and enter key is pressed then the node should not move', () => {
      const { editorView } = editorFactory(
        doc(
          p('boo something'),
          p(
            'Status: {<>}',
            status({
              text: 'Hello',
              color: 'blue',
              localId: '040fe0df-dd11-45ab-bc0c-8220c814f716',
            }),
            'WW',
          ),
        ),
      );
      const cursorPos = editorView.state.tr.selection.from;
      let state = setSelectionAndPickerAt(cursorPos)(editorView);
      validateSelection(cursorPos, 'Hello', 'blue')(state);
      let nodes = getStatusesInDocument(state, 1);
      const pos = nodes[0].pos;

      sendKeyToPm(editorView, 'Enter'); // Tab key uses the same solution but somehow sending Tab key event does not seem to work

      nodes = getStatusesInDocument(editorView.state, 1);
      expect(nodes[0].pos).toBe(pos);
    });
  });
});
