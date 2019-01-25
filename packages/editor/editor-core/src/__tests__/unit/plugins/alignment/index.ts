import {
  doc,
  p,
  createEditorFactory,
  h1,
  panel,
  code_block,
  alignment as alignmentMark,
  table,
  td,
  tr,
  ul,
  li,
} from '@atlaskit/editor-test-helpers';
import {
  AlignmentPluginState,
  pluginKey as alignmentPluginKey,
} from '../../../../plugins/alignment/pm-plugins/main';
import { changeAlignment } from '../../../../plugins/alignment/commands/index';
import alignment from '../../../../plugins/alignment';
import panelPlugin from '../../../../plugins/panel';
import codeBlockPlugin from '../../../../plugins/code-block';
import tablesPlugin from '../../../../plugins/table';
import { insertBlockType } from '../../../../plugins/block-type/commands';
import listPlugin from '../../../../plugins/lists';
import { toggleBulletList } from '../../../../plugins/lists/commands';

describe('alignment', () => {
  const createEditor = createEditorFactory<AlignmentPluginState>();
  const editor = (doc: any) =>
    createEditor({
      doc,
      pluginKey: alignmentPluginKey,
      editorPlugins: [
        listPlugin,
        tablesPlugin(),
        codeBlockPlugin(),
        panelPlugin,
        alignment,
      ],
      editorProps: {
        allowTextAlignment: true,
        allowPanel: true,
        allowCodeBlocks: true,
        allowTables: true,
        allowLists: true,
      },
    });

  describe('applies alignment', () => {
    it('should be able to add alignment to a top level paragraph', () => {
      const { editorView } = editor(doc(p('hello{<>}')));
      const { dispatch, state } = editorView;
      changeAlignment('end')(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(alignmentMark({ align: 'end' })(p('hello{<>}'))),
      );
    });

    it('applies alignment only to the current paragraph', () => {
      const { editorView } = editor(doc(p('hello{<>}'), p('world')));
      const { dispatch, state } = editorView;
      changeAlignment('end')(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(alignmentMark({ align: 'end' })(p('hello{<>}')), p('world')),
      );
    });

    it('should be able to add alignment to a top level heading', () => {
      const { editorView } = editor(doc(h1('hello{<>}')));
      const { dispatch, state } = editorView;
      changeAlignment('end')(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(alignmentMark({ align: 'end' })(h1('hello{<>}'))),
      );
    });

    it('applies alignment to multiple paragraphs', () => {
      const { editorView } = editor(
        doc(p('{<}hello'), panel()(p('hello')), p('world{>}')),
      );
      const { dispatch, state } = editorView;
      changeAlignment('end')(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          alignmentMark({ align: 'end' })(p('{<}hello')),
          panel()(p('hello')),
          alignmentMark({ align: 'end' })(p('world{>}')),
        ),
      );
    });
  });

  describe('Does not apply inside special block nodes', () => {
    it('Does not apply to paragraph inside a panel', () => {
      const { editorView } = editor(doc(panel()(p('hello{<>}'))));
      const { dispatch, state } = editorView;
      changeAlignment('end')(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(panel()(p('hello{<>}'))),
      );
    });

    it('Does not apply to paragraph inside a codeblock', () => {
      const { editorView } = editor(doc(code_block()('hello{<>}')));
      const { dispatch, state } = editorView;
      changeAlignment('end')(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(code_block()('hello{<>}')),
      );
    });

    it('Removes alignment when panel is added to the selection', () => {
      const { editorView } = editor(
        doc(alignmentMark({ align: 'end' })(p('hello{<>}'))),
      );
      const { dispatch, state } = editorView;
      insertBlockType('panel')(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(panel()(p('hello{<>}'))),
      );
    });

    it('Removes alignment when the text is toggled to a list', () => {
      const { editorView } = editor(
        doc(alignmentMark({ align: 'end' })(p('{<>}hello'))),
      );
      toggleBulletList(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(ul(li(p('hello')))));
    });
  });

  describe('Adds alignment to top level paragraphs inside tables', () => {
    it('Does not apply to paragraph inside a table', () => {
      const { editorView } = editor(
        doc(p('text'), table()(tr(td({})(p('hello')), td({})(p('world{<>}'))))),
      );
      const { dispatch, state } = editorView;
      changeAlignment('end')(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          p('text'),
          table()(
            tr(
              td({})(p('hello')),
              td({})(alignmentMark({ align: 'end' })(p('world{<>}'))),
            ),
          ),
        ),
      );
    });
  });
});
