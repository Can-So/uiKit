import {
  createEditor,
  sendKeyToPm,
  doc,
  p,
  ul,
  li,
  code_block,
  breakout,
} from '@atlaskit/editor-test-helpers';
import codeBlockPlugin from '../../../../plugins/code-block';
import breakoutPlugin from '../../../../plugins/breakout';
import listPlugin from '../../../../plugins/lists';

describe('codeBlock - keymaps', () => {
  const editor = (doc: any) =>
    createEditor({
      doc,
      editorPlugins: [codeBlockPlugin(), breakoutPlugin, listPlugin],
    });

  describe('Enter keypress', () => {
    describe('when enter key is pressed 1 time', () => {
      it('it should not exit code block', () => {
        const { editorView } = editor(doc(code_block()('codeBlock{<>}')));

        sendKeyToPm(editorView, 'Enter');
        expect(editorView.state.doc).toEqualDocument(
          doc(code_block()('codeBlock\n')),
        );
        editorView.destroy();
      });
    });

    describe('when enter key is pressed 2 times', () => {
      it('should exit code block', () => {
        const { editorView } = editor(
          doc(breakout({ mode: 'wide' })(code_block()('codeBlock{<>}'))),
        );

        sendKeyToPm(editorView, 'Enter');
        sendKeyToPm(editorView, 'Enter');
        expect(editorView.state.doc).toEqualDocument(
          doc(breakout({ mode: 'wide' })(code_block()('codeBlock')), p('{<>}')),
        );
        editorView.destroy();
      });
    });

    describe('when there is an empty paragraph at the end of the document', () => {
      it('it should not exit code block if selection is not at the end', () => {
        const { editorView } = editor(doc(code_block()('{<>}codeBlock\n')));

        sendKeyToPm(editorView, 'Enter');
        expect(editorView.state.doc).toEqualDocument(
          doc(code_block()('\ncodeBlock\n')),
        );
        editorView.destroy();
      });

      it('it should exit code block if selection is at the end', () => {
        const { editorView } = editor(doc(code_block()('codeBlock\n{<>}')));

        sendKeyToPm(editorView, 'Enter');
        expect(editorView.state.doc).toEqualDocument(
          doc(code_block()('codeBlock'), p('{<>}')),
        );
        editorView.destroy();
      });
    });
  });

  describe('Backspace', () => {
    it('should remove the code block if the cursor is at the beginning of the code block - 1', () => {
      const { editorView } = editor(
        doc(breakout({ mode: 'wide' })(code_block()('{<>}'))),
      );

      sendKeyToPm(editorView, 'Backspace');
      expect(editorView.state.doc).toEqualDocument(doc(p()));
      editorView.destroy();
    });

    it('should remove the code block if the cursor is at the beginning of the code block - 2', () => {
      const { editorView } = editor(doc(p('Hello'), code_block()('{<>}')));

      sendKeyToPm(editorView, 'Backspace');
      expect(editorView.state.doc).toEqualDocument(doc(p('Hello')));
      editorView.destroy();
    });

    describe('when codeblock is nested inside list item', () => {
      it('should remove the code block if the cursor is at the beginning of the code block - 2', () => {
        const { editorView } = editor(doc(ul(li(code_block()('{<>}Hello')))));

        sendKeyToPm(editorView, 'Backspace');
        expect(editorView.state.doc).toEqualDocument(doc(ul(li(p('Hello')))));
        editorView.destroy();
      });
    });

    it('should remove the code block if the cursor is at the beginning of the code block - 2', () => {
      const { editorView } = editor(doc(code_block()('{<>}const x = 10;')));

      sendKeyToPm(editorView, 'Backspace');
      expect(editorView.state.doc).toEqualDocument(doc(p('const x = 10;')));
      editorView.destroy();
    });

    it('should not remove the code block if selection is not empty ', () => {
      const { editorView } = editor(doc(code_block()('const x = 1{<}0{>};')));

      sendKeyToPm(editorView, 'Backspace');
      expect(editorView.state.doc).toEqualDocument(
        doc(code_block()('const x = 1;')),
      );
      editorView.destroy();
    });
  });
});
