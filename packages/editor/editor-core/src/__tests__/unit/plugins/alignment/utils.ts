import {
  doc,
  p,
  createEditor,
  alignment as alignmentMark,
} from '@atlaskit/editor-test-helpers';
import {
  AlignmentPluginState,
  pluginKey as alignmentPluginKey,
} from '../../../../plugins/alignment/pm-plugins/main';
import alignment from '../../../../plugins/alignment';
import panelPlugin from '../../../../plugins/panel';
import codeBlockPlugin from '../../../../plugins/code-block';
import tablesPlugin from '../../../../plugins/table';
import { removeBlockMarks } from '../../../../utils/mark';

describe('alignment utils', () => {
  const editor = (doc: any) =>
    createEditor<AlignmentPluginState>({
      doc,
      pluginKey: alignmentPluginKey,
      editorPlugins: [
        tablesPlugin(),
        codeBlockPlugin(),
        panelPlugin,
        alignment,
      ],
      editorProps: {
        allowTextAlignment: true,
      },
    });

  it('removes alignment', () => {
    const { editorView } = editor(
      doc(alignmentMark({ align: 'end' })(p('{<}hello{>}'))),
    );
    const { state, dispatch } = editorView;
    const tr = removeBlockMarks(state, [state.schema.marks.alignment]);
    expect(tr).toBeDefined();
    if (tr) {
      dispatch(tr);
      expect(editorView.state.doc).toEqualDocument(doc(p('hello')));
    }
    editorView.destroy();
  });
});
