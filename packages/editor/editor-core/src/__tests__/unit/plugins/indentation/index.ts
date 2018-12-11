import {
  doc,
  p,
  createEditor,
  h1,
  blockquote,
  indentation,
  sendKeyToPm,
} from '@atlaskit/editor-test-helpers';

import * as indentationCommands from '../../../../plugins/indentation/commands';

const { indent, outdent } = indentationCommands;

describe('indentation', () => {
  const editor = (doc: any) =>
    createEditor({
      doc,
      editorProps: {
        allowTextAlignment: true,
        allowIndentation: true,
      },
    });

  describe('indent', () => {
    it('indents a top level paragraph', () => {
      const { editorView } = editor(doc(p('hello{<>}')));
      const { dispatch, state } = editorView;
      indent(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(indentation({ level: 1 })(p('hello'))),
      );
      editorView.destroy();
    });

    it('indents only the current paragraph', () => {
      const { editorView } = editor(doc(p('hello{<>}'), p('world')));
      const { dispatch, state } = editorView;
      indent(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(indentation({ level: 1 })(p('hello')), p('world')),
      );

      editorView.destroy();
    });

    it('indents a top level heading', () => {
      const { editorView } = editor(doc(h1('hello{<>}')));
      const { dispatch, state } = editorView;
      indent(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(indentation({ level: 1 })(h1('hello'))),
      );
      editorView.destroy();
    });

    it('indents multiple blocks', () => {
      const { editorView } = editor(
        doc(p('{<}hello'), blockquote(p('hello')), p('world{>}')),
      );
      const { dispatch, state } = editorView;
      indent(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          indentation({ level: 1 })(p('hello')),
          blockquote(p('hello')),
          indentation({ level: 1 })(p('world')),
        ),
      );
      editorView.destroy();
    });

    it('should not indent more than 6 levels', () => {
      const { editorView } = editor(
        doc(indentation({ level: 6 })(p('hello{<>}'))),
      );
      const { dispatch, state } = editorView;
      indent(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(indentation({ level: 6 })(p('hello'))),
      );
      editorView.destroy();
    });
  });

  describe('outdent', () => {
    it('outdents a top level paragraph', () => {
      const { editorView } = editor(
        doc(indentation({ level: 3 })(p('hello{<>}'))),
      );
      const { dispatch, state } = editorView;
      outdent(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(indentation({ level: 2 })(p('hello'))),
      );
      editorView.destroy();
    });

    it('outdents only the current paragraph', () => {
      const { editorView } = editor(
        doc(indentation({ level: 3 })(p('hello{<>}')), p('world')),
      );
      const { dispatch, state } = editorView;
      outdent(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(indentation({ level: 2 })(p('hello')), p('world')),
      );

      editorView.destroy();
    });

    it('outdents a top level heading', () => {
      const { editorView } = editor(
        doc(indentation({ level: 3 })(h1('hello{<>}'))),
      );
      const { dispatch, state } = editorView;
      outdent(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(indentation({ level: 2 })(h1('hello'))),
      );
      editorView.destroy();
    });

    it('outdents multiple blocks', () => {
      const { editorView } = editor(
        doc(
          indentation({ level: 2 })(p('{<}hello')),
          blockquote(p('hello')),
          indentation({ level: 3 })(p('world{>}')),
        ),
      );
      const { dispatch, state } = editorView;
      outdent(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          indentation({ level: 1 })(p('hello')),
          blockquote(p('hello')),
          indentation({ level: 2 })(p('world')),
        ),
      );
      editorView.destroy();
    });

    it('should remove the marks when is at level 1', () => {
      const { editorView } = editor(
        doc(indentation({ level: 1 })(p('hello{<>}'))),
      );
      const { dispatch, state } = editorView;
      outdent(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(doc(p('hello')));
      editorView.destroy();
    });
  });

  describe('keymap', () => {
    it('calls indent command on Tab', () => {
      const indentMock = jest.fn();
      jest.spyOn(indentationCommands, 'indent').mockImplementation(indentMock);
      const { editorView } = editor(doc(p('{<>}')));

      expect(indentMock).toHaveBeenCalledTimes(0);
      sendKeyToPm(editorView, 'Tab');
      expect(indentMock).toHaveBeenCalledTimes(1);

      editorView.destroy();
    });

    it('calls outdent command on Shift + Tab', () => {
      const outdentMock = jest.fn();
      jest
        .spyOn(indentationCommands, 'outdent')
        .mockImplementation(outdentMock);
      const { editorView } = editor(doc(p('{<>}')));

      expect(outdentMock).toHaveBeenCalledTimes(0);
      sendKeyToPm(editorView, 'Shift-Tab');
      expect(outdentMock).toHaveBeenCalledTimes(1);

      editorView.destroy();
    });

    it('calls outdent command on Backspace at the start of node', () => {
      const outdentMock = jest.fn();
      jest
        .spyOn(indentationCommands, 'outdent')
        .mockImplementation(outdentMock);
      const { editorView } = editor(doc(p('{<>}hello')));

      expect(outdentMock).toHaveBeenCalledTimes(0);
      sendKeyToPm(editorView, 'Backspace');
      expect(outdentMock).toHaveBeenCalledTimes(1);

      editorView.destroy();
    });

    it('should not call outdent command on Backspace if not at the start of node', () => {
      const outdentMock = jest.fn();
      jest
        .spyOn(indentationCommands, 'outdent')
        .mockImplementation(outdentMock);
      const { editorView } = editor(doc(p('h{<>}ello')));

      expect(outdentMock).toHaveBeenCalledTimes(0);
      sendKeyToPm(editorView, 'Backspace');
      expect(outdentMock).toHaveBeenCalledTimes(0);

      editorView.destroy();
    });
  });
});
