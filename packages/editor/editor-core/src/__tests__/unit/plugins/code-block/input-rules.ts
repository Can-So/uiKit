import {
  createEditor,
  insertText,
  doc,
  li,
  p,
  ul,
  code_block,
  panel,
  hardBreak,
} from '@atlaskit/editor-test-helpers';
import codeBlockPlugin from '../../../../plugins/code-block';
import listPlugin from '../../../../plugins/lists';
import panelPlugin from '../../../../plugins/panel';

describe('inputrules', () => {
  const editor = (doc: any) =>
    createEditor({
      doc,
      editorPlugins: [codeBlockPlugin(), listPlugin, panelPlugin],
      editorProps: {
        allowPanel: true,
        textFormatting: {
          disableCode: true,
        },
      },
    });

  describe('codeblock rule', () => {
    describe('when node is not convertable to code block', () => {
      it('should not convert "```" to a code block\t', () => {
        const { editorView, sel } = editor(doc(panel()(p('{<>}hello'))));

        insertText(editorView, '```', sel);

        expect(editorView.state.doc).toEqualDocument(
          doc(panel()(p('```hello'))),
        );
        editorView.destroy();
      });
    });

    describe('when cursor is inside lists', () => {
      it('should convert "```" to a code block\t', () => {
        const { editorView, sel } = editor(doc(ul(li(p('{<>}hello')))));

        insertText(editorView, '```', sel);

        expect(editorView.state.doc).toEqualDocument(
          doc(ul(li(code_block()('hello')))),
        );
        editorView.destroy();
      });

      describe('when cursor is in a new line created with shift+enter', () => {
        it('should convert "```" to a code block\t', () => {
          const { editorView, sel } = editor(
            doc(ul(li(p('text', hardBreak(), '{<>}hello')))),
          );

          insertText(editorView, '```', sel);

          expect(editorView.state.doc).toEqualDocument(
            doc(ul(li(p('text'), code_block()('hello')))),
          );
          editorView.destroy();
        });
      });
    });

    describe('when node is convertable to code block', () => {
      describe('when converted node has no content', () => {
        it('should convert "```" to a code block\t', () => {
          const { editorView, sel } = editor(doc(p('{<>}')));

          insertText(editorView, '```', sel);

          expect(editorView.state.doc).toEqualDocument(doc(code_block({})()));
          editorView.destroy();
        });
      });
    });
  });
});
