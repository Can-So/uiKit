import {
  createEditor,
  doc,
  ol,
  li,
  p,
  hardBreak,
  date,
  code_block,
  sendKeyToPm,
} from '@atlaskit/editor-test-helpers';
import {
  enterKeyCommand,
  backspaceKeyCommand,
} from '../../../../plugins/lists/commands';
import { GapCursorSelection } from '../../../../plugins/gap-cursor';

describe('enterKeyCommand', () => {
  it('should not outdent a list when list item has visible content', () => {
    const timestamp = Date.now();
    const { editorView } = createEditor({
      doc: doc(
        ol(li(p('text')), li(p('{<>}', hardBreak(), date({ timestamp })))),
      ),
      editorProps: { allowLists: true, allowDate: true },
    });
    enterKeyCommand(editorView.state, editorView.dispatch);
    expect(editorView.state.doc).toEqualDocument(
      doc(
        ol(
          li(p('text')),
          li(p('')),
          li(p('', hardBreak(), date({ timestamp }))),
        ),
      ),
    );
  });
});

describe('backspaceKeyCommand', () => {
  describe('when cursor is inside nested node', () => {
    it('should not outdent a list', () => {
      const { editorView } = createEditor({
        doc: doc(ol(li(code_block()('{<>}text')))),
        editorProps: { allowLists: true, allowCodeBlocks: true },
      });

      backspaceKeyCommand(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).toEqualDocument(
        doc(ol(li(code_block()('text')))),
      );
    });
  });

  describe('when GapCursor is inside a listItem and before the nested codeBlock', () => {
    it('should outdent a list', () => {
      const { editorView } = createEditor({
        doc: doc(ol(li(code_block()('{<>}text')))),
        editorProps: {
          allowLists: true,
          allowCodeBlocks: true,
        },
      });

      // enable gap cursor
      sendKeyToPm(editorView, 'ArrowLeft');
      expect(editorView.state.selection instanceof GapCursorSelection).toBe(
        true,
      );

      backspaceKeyCommand(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).toEqualDocument(doc(code_block()('text')));
    });
  });

  describe('when GapCursor is before a codeBlock and after a list', () => {
    it('should join codeBlock with the list', () => {
      const { editorView } = createEditor({
        doc: doc(ol(li(p('text'))), code_block()('{<>}code')),
        editorProps: {
          allowLists: true,
          allowCodeBlocks: true,
        },
      });

      // enable gap cursor
      sendKeyToPm(editorView, 'ArrowLeft');
      expect(editorView.state.selection instanceof GapCursorSelection).toBe(
        true,
      );

      backspaceKeyCommand(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).toEqualDocument(
        doc(ol(li(p('text')), li(code_block()('code')))),
      );
    });
  });
});
