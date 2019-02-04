import {
  doc,
  p,
  createEditorFactory,
  table,
  tr,
  td,
  th,
} from '@atlaskit/editor-test-helpers';
import {
  TablePluginState,
  PluginConfig,
} from '../../../../plugins/table/types';

import { pluginKey as tablePluginKey } from '../../../../plugins/table/pm-plugins/main';
import tablesPlugin from '../../../../plugins/table';

describe('fix tables', () => {
  const createEditor = createEditorFactory<TablePluginState>();

  const editor = (doc: any) => {
    const tableOptions = {
      allowNumberColumn: true,
      allowHeaderRow: true,
      allowHeaderColumn: true,
      permittedLayouts: 'all',
      allowColumnResizing: true,
    } as PluginConfig;
    return createEditor({
      doc,
      editorPlugins: [tablesPlugin(tableOptions)],
      editorProps: {
        allowTables: tableOptions,
      },
      pluginKey: tablePluginKey,
    });
  };

  describe('autoSize table', () => {
    it('applies colwidths to cells and sets autosize to false', () => {
      const { editorView } = editor(
        doc(
          table({ __autoSize: true })(
            tr(th()(p('{<>}1')), th()(p('2')), th()(p('3'))),
            tr(td()(p('4')), td()(p('5')), td()(p('6'))),
            tr(td()(p('7')), td()(p('8')), td()(p('9'))),
          ),
        ),
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          table({ __autoSize: false })(
            tr(
              th({ colwidth: [] })(p('1')),
              th({ colwidth: [] })(p('2')),
              th({ colwidth: [] })(p('3')),
            ),
            tr(
              td({ colwidth: [] })(p('4')),
              td({ colwidth: [] })(p('5')),
              td({ colwidth: [] })(p('6')),
            ),
            tr(
              td({ colwidth: [] })(p('7')),
              td({ colwidth: [] })(p('8')),
              td({ colwidth: [] })(p('9')),
            ),
          ),
        ),
      );
    });
  });

  describe('when document contains a table with empty rows', () => {
    it('should remove the table node', () => {
      global['fetch'] = jest.fn();

      const { editorView } = editor(doc(p('one'), table()(tr()), p('two')));

      expect(editorView.state.doc).toEqualDocument(doc(p('one'), p('two')));
      expect(global['fetch']).toHaveBeenCalled();
    });
  });
});
